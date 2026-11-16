// Build step: prerender each public SPA route to static HTML.
//
// Runs after `vite build`. Bundles client/src/entry-prerender.tsx for Node,
// renders every route in it, and writes one flat file per route to
// dist/prerendered/ (for example dist/prerendered/services/house-clearance.html)
// plus dist/prerendered/routes.json. server/vite.ts serves each file at its
// exact route. Flat files outside dist/public avoid the static-folder trap
// where /x 301s to /x/ and falls back to the homepage shell.
//
// The build fails if any page lacks exactly one <h1> or a self-referencing
// canonical on https://propertyclearancesb.com.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { build } from "vite";

const SITE_URL = "https://propertyclearancesb.com";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "dist", "public");
const ssrDir = path.join(root, "dist", "prerender-ssr");
const outDir = path.join(root, "dist", "prerendered");

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[c]);

const canonicalFor = (route) => (route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`);

async function main() {
  const templatePath = path.join(publicDir, "index.html");
  if (!fs.existsSync(templatePath)) throw new Error(`Missing ${templatePath}; run vite build first`);
  const template = fs.readFileSync(templatePath, "utf-8");

  await build({
    configFile: path.join(root, "vite.config.ts"),
    logLevel: "warn",
    ssr: { noExternal: true },
    build: {
      ssr: path.join(root, "client", "src", "entry-prerender.tsx"),
      outDir: ssrDir,
      emptyOutDir: true,
      copyPublicDir: false,
      rollupOptions: { output: { entryFileNames: "entry-prerender.mjs" } },
    },
  });

  const entry = await import(pathToFileURL(path.join(ssrDir, "entry-prerender.mjs")).href);

  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const manifest = {};
  const problems = [];

  for (const route of Object.keys(entry.routes)) {
    const { html, seo } = await entry.render(route);
    if (!seo) throw new Error(`${route}: page did not call useSEO`);

    const canonical = canonicalFor(route);
    if (seo.canonical && seo.canonical !== canonical) {
      problems.push(`${route}: useSEO canonical ${seo.canonical} is not ${canonical}`);
    }

    const title = escapeHtml(seo.title);
    const description = escapeHtml(seo.description);
    const schema = seo.schema
      ? `\n    <script type="application/ld+json" data-page-schema="true">${JSON.stringify(seo.schema).replace(/</g, "\\u003c")}</script>`
      : "";

    let page = template
      .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
      .replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${description}">`)
      .replace(/<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${canonical}">`)
      .replace(/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${title}">`)
      .replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${description}">`)
      .replace(/<meta property="twitter:url"[^>]*>/i, `<meta property="twitter:url" content="${canonical}">`)
      .replace(/<meta property="twitter:title"[^>]*>/i, `<meta property="twitter:title" content="${title}">`)
      .replace(/<meta property="twitter:description"[^>]*>/i, `<meta property="twitter:description" content="${description}">`)
      .replace("</head>", `    <link rel="canonical" href="${canonical}">${schema}\n  </head>`);

    if (!page.includes('<div id="root"></div>')) throw new Error("index.html has no empty #root to fill");
    page = page.replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);

    const h1Count = (page.match(/<h1[\s>]/gi) || []).length;
    const canonicals = page.match(/<link rel="canonical" href="([^"]+)"/gi) || [];
    if (h1Count !== 1) problems.push(`${route}: ${h1Count} <h1> elements`);
    if (canonicals.length !== 1 || !canonicals[0].includes(`"${canonical}"`)) {
      problems.push(`${route}: canonical tags ${JSON.stringify(canonicals)}`);
    }
    if (page.includes("sbpropertyclearance.com")) problems.push(`${route}: still references sbpropertyclearance.com`);

    const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
    fs.mkdirSync(path.dirname(path.join(outDir, file)), { recursive: true });
    fs.writeFileSync(path.join(outDir, file), page);
    manifest[route] = file;
    console.log(`prerendered ${route} -> dist/prerendered/${file} (h1: ${h1Count}, canonical: ${canonical})`);
  }

  fs.writeFileSync(path.join(outDir, "routes.json"), JSON.stringify(manifest, null, 2));
  fs.rmSync(ssrDir, { recursive: true, force: true });

  if (problems.length) {
    throw new Error(`Prerender checks failed:\n  ${problems.join("\n  ")}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
