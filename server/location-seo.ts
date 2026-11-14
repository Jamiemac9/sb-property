import { getServiceArea } from "../shared/service-areas";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] || character);

export function renderLocationSeoHtml(template: string, pathname: string) {
  const match = pathname.match(/^\/areas\/([a-z-]+)\/?$/);
  if (!match) return template;

  const area = getServiceArea(match[1]);
  if (!area) return template;

  const title = `Property Clearance ${area.name} | Waste Removal & House Clearance`;
  const description = `Licensed property clearance in ${area.name}, ${area.county}. House, garden and commercial waste removal with free quotes. Call +44 7708 152348.`;
  const canonical = `https://www.propertyclearancesb.com/areas/${area.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Property Clearance in ${area.name}`,
    serviceType: "Property clearance and waste removal",
    url: canonical,
    provider: {
      "@type": "LocalBusiness",
      name: "SB Property Clearance",
      telephone: "+447708152348",
      url: "https://www.propertyclearancesb.com",
    },
    areaServed: {
      "@type": "City",
      name: area.name,
      containedInPlace: { "@type": "AdministrativeArea", name: area.county },
    },
  };

  const seoHead = `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="${canonical}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${canonical}">
    <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`;

  const crawlableBody = `
    <main data-server-rendered-location style="max-width:960px;margin:40px auto;padding:24px;font-family:Arial,sans-serif">
      <h1>Property Clearance in ${escapeHtml(area.name)}</h1>
      <p>${escapeHtml(area.intro)}</p>
      <h2>Clearance and waste removal across ${escapeHtml(area.name)}</h2>
      <p>${escapeHtml(area.localDetail)}</p>
      <p>Services include house clearance, garden clearance, furniture removal, licensed waste removal, commercial clearance, cleaning and home removals.</p>
      <h2>Areas covered</h2>
      <p>${escapeHtml(area.nearby.join(", "))} and ${escapeHtml(area.postcodeAreas.join(", "))} postcode districts.</p>
      <h2>Verified customer feedback</h2>
      <p>Rated 10/10 from 40 Checkatrade reviews. Call +44 7708 152348 for a free quote.</p>
    </main>`;

  return template
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta name="description"[^>]*>/i, "")
    .replace("</head>", `${seoHead}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${crawlableBody}</div>`);
}
