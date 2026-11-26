/**
 * FAQPage JSON-LD built from the same items a page renders as its visible FAQ
 * (service pages: `services.<slug>.faq`; articles: `BlogPostLocale.faq`), so
 * the schema text always matches what readers see. Shared by
 * scripts/prerender.ts and SchemaOrg.tsx. Returns null when there is no FAQ.
 * Takes the page URL as an argument (no src/config.ts import).
 */
export function buildFaqPageSchema(
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
