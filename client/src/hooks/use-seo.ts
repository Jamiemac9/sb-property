import { useEffect } from "react";

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: object;
}

// Build-time prerendering (scripts/prerender.mjs) registers a collector so the
// static HTML for each route gets the same title, description, canonical and
// schema that the page sets in the browser. It is never set in the browser.
let seoCollector: ((props: SEOProps) => void) | null = null;

export function setSEOCollector(collector: ((props: SEOProps) => void) | null) {
  seoCollector = collector;
}

export function useSEO({ title, description, canonical, schema }: SEOProps) {
  if (seoCollector) seoCollector({ title, description, canonical, schema });

  useEffect(() => {
    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    let metaOgTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
    if (!metaOgTitle) {
      metaOgTitle = document.createElement("meta");
      metaOgTitle.setAttribute("property", "og:title");
      document.head.appendChild(metaOgTitle);
    }
    metaOgTitle.content = title;

    let metaOgDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
    if (!metaOgDesc) {
      metaOgDesc = document.createElement("meta");
      metaOgDesc.setAttribute("property", "og:description");
      document.head.appendChild(metaOgDesc);
    }
    metaOgDesc.content = description;

    let metaTwitterTitle = document.querySelector('meta[property="twitter:title"]') as HTMLMetaElement | null;
    if (!metaTwitterTitle) {
      metaTwitterTitle = document.createElement("meta");
      metaTwitterTitle.setAttribute("property", "twitter:title");
      document.head.appendChild(metaTwitterTitle);
    }
    metaTwitterTitle.content = title;

    let metaTwitterDesc = document.querySelector('meta[property="twitter:description"]') as HTMLMetaElement | null;
    if (!metaTwitterDesc) {
      metaTwitterDesc = document.createElement("meta");
      metaTwitterDesc.setAttribute("property", "twitter:description");
      document.head.appendChild(metaTwitterDesc);
    }
    metaTwitterDesc.content = description;

    const canonicalHref = canonical || window.location.href.split("?")[0];
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.rel = "canonical";
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = canonicalHref;

    for (const property of ["og:url", "twitter:url"]) {
      const urlTag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (urlTag) urlTag.content = canonicalHref;
    }

    if (schema) {
      const existingScript = document.querySelector('script[data-page-schema="true"]');
      if (existingScript) existingScript.remove();
      const scriptTag = document.createElement("script");
      scriptTag.type = "application/ld+json";
      scriptTag.setAttribute("data-page-schema", "true");
      scriptTag.textContent = JSON.stringify(schema);
      document.head.appendChild(scriptTag);
    }

    return () => {
      const pageSchema = document.querySelector('script[data-page-schema="true"]');
      if (pageSchema) pageSchema.remove();
    };
  }, [title, description, canonical, schema]);
}
