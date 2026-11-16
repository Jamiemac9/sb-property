import { useEffect } from "react";

const SITE_ORIGIN = "https://www.propertyclearancesb.com";

// Hostnames that have ever served this site and must never appear in emitted
// markup. Matched on hostname only, so email addresses (sbpropertyclearance@
// gmail.com, info@sbpropertyclearance.co.uk) and third-party profile URLs
// (checkatrade.com/trades/sbpropertyclearance) are left alone.
const LEGACY_HOSTS = new Set([
  "propertyclearancesb.com",
  "sbpropertyclearance.com",
  "www.sbpropertyclearance.com",
]);

// Rewrites an absolute URL on a legacy host onto SITE_ORIGIN, keeping path,
// query and fragment. Anything that is not a parseable absolute http(s) URL,
// or is on any other host, is returned untouched.
function toSiteOrigin(value: string): string {
  if (!/^https?:\/\//i.test(value)) return value;
  try {
    const url = new URL(value);
    if (!LEGACY_HOSTS.has(url.hostname.toLowerCase())) return value;
    return SITE_ORIGIN + url.pathname + url.search + url.hash;
  } catch {
    return value;
  }
}

// Walks a schema object and normalises every URL string inside it. This is the
// schema equivalent of the canonical rule below: a page can pass a legacy
// domain and the emitted JSON-LD still comes out on one origin, so no page -
// including one copied from an existing template - can reintroduce the split.
function normalizeSchemaUrls(input: unknown): unknown {
  if (typeof input === "string") return toSiteOrigin(input);
  if (Array.isArray(input)) return input.map(normalizeSchemaUrls);
  if (input && typeof input === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(input as Record<string, unknown>)) {
      out[key] = normalizeSchemaUrls(val);
    }
    return out;
  }
  return input;
}

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: object;
}

export function useSEO({ title, description, canonical, schema }: SEOProps) {
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

    // Canonical always resolves to the live, indexed origin. Search Console shows
    // www.propertyclearancesb.com is the domain Google indexes; pages may still pass a
    // legacy sbpropertyclearance.com URL, so only the path from it is used.
    let canonicalPath = window.location.pathname;
    if (canonical) {
      try {
        canonicalPath = new URL(canonical, SITE_ORIGIN).pathname;
      } catch {
        canonicalPath = window.location.pathname;
      }
    }
    const canonicalHref =
      SITE_ORIGIN + (canonicalPath === "/" ? "/" : canonicalPath.replace(/\/$/, ""));
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.rel = "canonical";
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = canonicalHref;

    if (schema) {
      const existingScript = document.querySelector('script[data-page-schema="true"]');
      if (existingScript) existingScript.remove();
      const scriptTag = document.createElement("script");
      scriptTag.type = "application/ld+json";
      scriptTag.setAttribute("data-page-schema", "true");
      scriptTag.textContent = JSON.stringify(normalizeSchemaUrls(schema)).replace(/</g, "\\u003c");
      document.head.appendChild(scriptTag);
    }

    return () => {
      const pageSchema = document.querySelector('script[data-page-schema="true"]');
      if (pageSchema) pageSchema.remove();
    };
  }, [title, description, canonical, schema]);
}
