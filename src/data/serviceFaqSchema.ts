/**
 * FAQPage JSON-LD for a service page, built from the same `services.<slug>.faq`
 * items ServicePage renders, so the schema text always matches the visible FAQ.
 * Shared by scripts/prerender.ts and SchemaOrg.tsx. Returns null when the page
 * has no FAQ. Takes the page URL as an argument (no src/config.ts import).
 */
export function buildServiceFaqSchema(
  faq: ReadonlyArray<{ q: string; a: string }>,
  pageUrl: string,
  locale: "fr" | "en",
): object | null {
  if (!faq.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
