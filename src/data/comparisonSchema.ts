import { ARTICLE_AUTHOR_BIO, ARTICLE_AUTHOR_NAME, ARTICLE_AUTHOR_SAME_AS } from "./author";
import type { ComparisonPageData } from "./comparisons";

/**
 * JSON-LD for one comparison page: Article (with author, dates and the
 * research-sheet sources as `citation`), FAQPage, and BreadcrumbList.
 * Shared by the React SchemaOrg component and the prerender script so both
 * emit the same graph. Takes `siteUrl` as an argument because the prerender
 * script runs under tsx and cannot import `src/config.ts` (import.meta.env).
 */
export function buildComparisonSchemas(
  page: ComparisonPageData,
  locale: "fr" | "en",
  siteUrl: string,
  labels: { home: string; hub: string },
): object[] {
  const isEn = locale === "en";
  const base = isEn ? `${siteUrl}/en` : siteUrl;
  const url = `${base}/compare/${page.slug}`;
  const orgId = `${siteUrl}/#organization`;
  const inLanguage = isEn ? "en-CA" : "fr-CA";
  const absolute = (href: string) => (/^https?:/.test(href) ? href : `${base}${href}`);

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      headline: isEn ? page.titleEn : page.titleFr,
      description: isEn ? page.descriptionEn : page.descriptionFr,
      inLanguage,
      url,
      datePublished: page.datePublished,
      dateModified: page.dateModified,
      author: {
        "@type": "Person",
        name: ARTICLE_AUTHOR_NAME,
        description: ARTICLE_AUTHOR_BIO[locale],
        url: `${siteUrl}/about`,
        jobTitle: isEn ? "Founder, Gestion Velora" : "Fondateur, Gestion Velora",
        worksFor: { "@id": orgId },
        ...(ARTICLE_AUTHOR_SAME_AS.length ? { sameAs: [...ARTICLE_AUTHOR_SAME_AS] } : {}),
      },
      publisher: {
        "@type": "Organization",
        "@id": orgId,
        name: "Gestion Velora",
        url: siteUrl,
        logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png?v=10` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      citation: page.sources.map((source) => ({
        "@type": "CreativeWork",
        name: isEn ? source.nameEn : source.nameFr,
        url: absolute(source.url),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      url,
      inLanguage,
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: isEn ? faq.questionEn : faq.questionFr,
        acceptedAnswer: { "@type": "Answer", text: isEn ? faq.answerEn : faq.answerFr },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: labels.home, item: `${base}/` },
        { "@type": "ListItem", position: 2, name: labels.hub, item: `${base}/compare` },
        { "@type": "ListItem", position: 3, name: isEn ? page.titleEn : page.titleFr },
      ],
    },
  ];
}
