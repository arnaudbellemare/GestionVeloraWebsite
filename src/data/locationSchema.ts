import type { ResolvedLocation } from "./locations";

/**
 * JSON-LD for an indexable /location page: the service offered in that city and
 * a breadcrumb matching the visible one (Home > service). Used by both the
 * prerender script and LocationPage so the served HTML and the hydrated page
 * carry the same schema. No FAQPage: these pages show no FAQ. Takes the site
 * URL as an argument because src/config.ts needs Vite's import.meta.env.
 */
export function buildLocationPageSchema(
  loc: ResolvedLocation,
  locale: "fr" | "en",
  siteUrl: string,
  homeLabel: string,
) {
  const isEn = locale === "en";
  const base = isEn ? `${siteUrl}/en` : siteUrl;
  const url = `${base}/location/${loc.pageSlugFr}`;
  const serviceName = isEn ? loc.service.nameEn : loc.service.nameFr;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: isEn ? loc.h1En : loc.h1Fr,
        description: isEn ? loc.descEn : loc.descFr,
        serviceType: serviceName,
        url,
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: { "@type": "City", name: isEn ? loc.city.nameEn : loc.city.nameFr },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: homeLabel, item: `${base}/` },
          { "@type": "ListItem", position: 2, name: serviceName },
        ],
      },
    ],
  };
}
