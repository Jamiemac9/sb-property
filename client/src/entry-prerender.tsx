// Build-time only. scripts/prerender.mjs bundles this file for Node and calls
// render() for each public route, so crawlers get real HTML (H1, copy,
// canonical) instead of an empty <div id="root">. Not loaded in the browser.
import { Writable } from "node:stream";
import type { ComponentType } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "wouter";
import { setSEOCollector, type SEOProps } from "@/hooks/use-seo";
import Home from "@/pages/home";
import Quotes from "@/pages/quotes";
import Privacy from "@/pages/privacy";
import HouseClearance from "@/pages/services/house-clearance";
import GardenClearance from "@/pages/services/garden-clearance";
import WasteRemoval from "@/pages/services/waste-removal";
import CommercialWork from "@/pages/services/commercial-work";
import CleaningServices from "@/pages/services/cleaning-services";
import HomeRemovals from "@/pages/services/home-removals";

// Keep in step with the <Route> list in App.tsx. Area pages are rendered by
// server/location-seo.ts instead.
export const routes: Record<string, ComponentType> = {
  "/": Home,
  "/quotes": Quotes,
  "/privacy": Privacy,
  "/services/house-clearance": HouseClearance,
  "/services/garden-clearance": GardenClearance,
  "/services/waste-removal": WasteRemoval,
  "/services/commercial-work": CommercialWork,
  "/services/cleaning-services": CleaningServices,
  "/services/home-removals": HomeRemovals,
};

export async function render(pathname: string): Promise<{ html: string; seo: SEOProps | null }> {
  const Page = routes[pathname];
  if (!Page) throw new Error(`No prerender route for ${pathname}`);

  let seo: SEOProps | null = null;
  setSEOCollector((props) => {
    seo = props;
  });

  const queryClient = new QueryClient();

  try {
    const html = await new Promise<string>((resolve, reject) => {
      let output = "";
      const sink = new Writable({
        write(chunk, _encoding, callback) {
          output += chunk.toString();
          callback();
        },
      });
      sink.on("finish", () => resolve(output));

      const stream = renderToPipeableStream(
        <QueryClientProvider client={queryClient}>
          <Router ssrPath={pathname}>
            <Page />
          </Router>
        </QueryClientProvider>,
        {
          // Wait for lazy sections (location, chatbot) so their copy is included.
          onAllReady() {
            stream.pipe(sink);
          },
          onShellError: reject,
          onError(error) {
            reject(error);
          },
        },
      );
    });

    return { html, seo };
  } finally {
    setSEOCollector(null);
  }
}
