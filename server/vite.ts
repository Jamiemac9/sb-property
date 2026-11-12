import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import { renderLocationSeoHtml } from "./location-seo";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = renderLocationSeoHtml(template, req.originalUrl.split("?")[0]);
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({
        "Content-Type": "text/html",
        "Cache-Control": "no-store",
      }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Prerendered public pages (built by scripts/prerender.mjs). Each route is
  // served from a flat .html file with its own title, canonical, H1 and copy,
  // so crawlers do not get the empty SPA shell. Registered before
  // express.static so "/" gets the prerendered homepage, not the bare shell.
  const prerenderedPath = path.resolve(import.meta.dirname, "prerendered");
  const prerenderedManifest = path.join(prerenderedPath, "routes.json");
  if (fs.existsSync(prerenderedManifest)) {
    const prerenderedRoutes: Record<string, string> = JSON.parse(
      fs.readFileSync(prerenderedManifest, "utf-8"),
    );
    for (const [route, file] of Object.entries(prerenderedRoutes)) {
      const filePath = path.join(prerenderedPath, file);
      app.get(route, (_req, res) => {
        res.set({
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-cache",
        }).sendFile(filePath);
      });
    }
  } else {
    console.warn("No prerendered pages found; serving the SPA shell for all routes");
  }

  app.use(express.static(distPath, {
    setHeaders(res, filePath) {
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache");
      } else if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else if (/\.(?:avif|webp|png|jpe?g|gif|svg)$/i.test(filePath)) {
        res.setHeader("Cache-Control", "public, max-age=2592000");
      }
    },
  }));

  // fall through to index.html if the file doesn't exist
  app.use("*", async (req, res, next) => {
    try {
      const indexPath = path.resolve(distPath, "index.html");
      const template = await fs.promises.readFile(indexPath, "utf-8");
      const page = renderLocationSeoHtml(template, req.originalUrl.split("?")[0]);
      res.status(200).set({
        "Content-Type": "text/html",
        "Cache-Control": "no-cache",
      }).send(page);
    } catch (error) {
      next(error);
    }
  });
}
