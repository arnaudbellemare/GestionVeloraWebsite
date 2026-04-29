#!/usr/bin/env tsx
/**
 * scripts/prerender.ts
 *
 * Static prerendering for AI crawlers and non-JS environments.
 *
 * Generates dist/{route}/index.html for every known route, with:
 *   - Correct <title> and <meta name="description">
 *   - Correct <link rel="canonical"> and hreflang
 *   - Correct <html lang="...">
 *   - Correct <meta property="og:*"> and <meta name="twitter:*">
 *   - Page-specific JSON-LD schemas (BreadcrumbList, FAQPage, Service, Article, ItemList)
 *
 * Run after vite build: npm run build calls "tsc -b && vite build && tsx scripts/prerender.ts"
 *
 * Vercel serves exact file matches before applying catch-all rewrites,
 * so dist/services/airbnb/index.html is served directly for /services/airbnb.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// ---------------------------------------------------------------------------
// Import app data sources directly — same source of truth as the React app
// ---------------------------------------------------------------------------
import { blogPosts, type RichParagraph } from "../src/data/blog.js";
import { COMPARISON_PAGES } from "../src/data/comparisons.js";
import { fr as frRaw } from "../src/i18n/fr.js";
import { en as enRaw } from "../src/i18n/en.js";
import { CITIES, LOCATION_SERVICES, LOCATION_FEATURES } from "../src/data/locations.js";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const DIST = join(process.cwd(), "dist");
const SITE_URL = "https://www.gestionvelora.com";
const ORG_ID = `${SITE_URL}/#organization`;
const AUTHOR_NAME = "Arnaud Bellemare";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_TWITTER_IMAGE = `${SITE_URL}/twitter-card.png`;

const SERVICE_IMAGES: Record<string, string> = {
  "syndicat-copropriete":
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=85",
  airbnb: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&q=85",
  location: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=85",
};

// ---------------------------------------------------------------------------
// Helper: escape for safe JSON-LD embedding
// ---------------------------------------------------------------------------
function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---------------------------------------------------------------------------
// Helper: build a meta <title> that stays under 75 characters.
// Adds " | Gestion Velora" suffix only if the result fits within the limit.
// Falls back to bare title (truncated to 75 chars) when too long.
// ---------------------------------------------------------------------------
const TITLE_SUFFIX = " | Gestion Velora";
const TITLE_MAX = 70;

function buildTitle(headline: string): string {
  const withSuffix = `${headline}${TITLE_SUFFIX}`;
  if (withSuffix.length <= TITLE_MAX) return withSuffix;
  if (headline.length <= TITLE_MAX) return headline;
  // Truncate at last space before limit, append ellipsis
  const cut = headline.slice(0, TITLE_MAX - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut) + "…";
}

// ---------------------------------------------------------------------------
// Helper: inject content into the HTML template
// ---------------------------------------------------------------------------
function buildHtml(
  template: string,
  opts: {
    lang: string;
    title: string;
    description: string;
    canonical: string;
    ogLocale: string;
    ogLocaleAlt: string;
    ogImage: string;
    twitterImage: string;
    hreflangFr: string;
    hreflangEn: string;
    hreflangDefault: string;
    /** Page-specific JSON-LD schemas to inject. Accepts a single object or array. */
    pageSchemas: object | object[] | null;
    /** Locale of this page; used to strip the French static SEO block on EN pages. */
    locale: "fr" | "en";
    /** Page-specific noscript HTML. When provided, replaces the homepage noscript block entirely. */
    noscriptBody?: string;
  }
): string {
  let html = template;

  // 1. lang attribute on <html>
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${opts.lang}"`);

  // 2. <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(opts.title)}</title>`);

  // 3. <meta name="description">
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeHtml(opts.description)}"`
  );

  // 4. <link rel="canonical">
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${opts.canonical}"`
  );

  // 5. og:url
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${opts.canonical}"`
  );

  // 6. og:title
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escapeHtml(opts.title)}"`
  );

  // 7. og:description
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeHtml(opts.description)}"`
  );

  // 8. og:image
  html = html.replace(
    /<meta property="og:image" content="[^"]*"/,
    `<meta property="og:image" content="${opts.ogImage}"`
  );

  // 9. og:locale
  html = html.replace(
    /<meta property="og:locale" content="[^"]*"/,
    `<meta property="og:locale" content="${opts.ogLocale}"`
  );

  // 10. og:locale:alternate
  html = html.replace(
    /<meta property="og:locale:alternate" content="[^"]*"/,
    `<meta property="og:locale:alternate" content="${opts.ogLocaleAlt}"`
  );

  // 11. twitter:title
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${escapeHtml(opts.title)}"`
  );

  // 12. twitter:description
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${escapeHtml(opts.description)}"`
  );

  // 13. twitter:url
  html = html.replace(
    /<meta name="twitter:url" content="[^"]*"/,
    `<meta name="twitter:url" content="${opts.canonical}"`
  );

  // 14. twitter:image (separate from og:image — homepage uses twitter-card.png)
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*"/,
    `<meta name="twitter:image" content="${opts.twitterImage}"`
  );

  // 15. hreflang links (replace all three at once via a block match)
  const hreflangBlock = [
    `    <link rel="alternate" hreflang="fr-CA" href="${opts.hreflangFr}" />`,
    `    <link rel="alternate" hreflang="en-CA" href="${opts.hreflangEn}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${opts.hreflangDefault}" />`,
  ].join("\n");
  html = html.replace(
    /<link rel="alternate" hreflang="fr-CA"[^>]*>\s*<link rel="alternate" hreflang="en-CA"[^>]*>\s*<link rel="alternate" hreflang="x-default"[^>]*>/,
    hreflangBlock
  );

  // 15b. Replace the noscript SEO block with page-specific content (preferred)
  // or fall back to generic EN replacement to avoid hreflang language mismatch.
  if (opts.noscriptBody) {
    html = html.replace(
      /<noscript>\s*<main[^>]*>[\s\S]*?<\/main>\s*<\/noscript>/,
      opts.noscriptBody
    );
  } else if (opts.locale === "en") {
    html = html.replace(
      /<noscript>\s*<main>[\s\S]*?<\/main>\s*<\/noscript>/,
      '<noscript><main lang="en-CA"><h1>Property management Montreal — Gestion Velora</h1><p>Gestion Velora is a Montreal property management firm specializing in condo board administration, long-term rental management, and short-term rental (Airbnb) operations across Greater Montreal.</p></main></noscript>'
    );
  }

  // 16. Inject page-specific JSON-LD schemas (right before </head>)
  if (opts.pageSchemas) {
    const schemas = Array.isArray(opts.pageSchemas) ? opts.pageSchemas : [opts.pageSchemas];
    const schemaTags = schemas
      .map(
        (schema) =>
          `  <script type="application/ld+json">\n  ${JSON.stringify(schema, null, 2)}\n  </script>\n`
      )
      .join("");
    html = html.replace("</head>", `${schemaTags}</head>`);
  }

  return html;
}

// ---------------------------------------------------------------------------
// Helper: write file, creating parent directories as needed
// ---------------------------------------------------------------------------
function writeRoute(routePath: string, html: string) {
  // routePath is like "/services/airbnb" → dist/services/airbnb/index.html
  // routePath "/" → dist/index.html (already exists, handled separately)
  if (routePath === "/") return;

  const clean = routePath.replace(/\/$/, ""); // strip trailing slash
  const dir = join(DIST, clean);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const outPath = join(dir, "index.html");
  writeFileSync(outPath, html, "utf-8");
  console.log(`  ✓ ${routePath}`);
}

// ---------------------------------------------------------------------------
// Data helpers
// ---------------------------------------------------------------------------
function getService(locale: "fr" | "en", slug: string) {
  const t = locale === "fr" ? frRaw : enRaw;
  const s = (t.services as Record<string, { title: string; description: string }>)[slug];
  return s;
}

function getServicesHubMeta(locale: "fr" | "en") {
  const t = locale === "fr" ? frRaw : enRaw;
  return {
    title: t.servicesHub.metaTitle,
    description: t.servicesHub.metaDescription,
  };
}

function getFaqItems(locale: "fr" | "en") {
  const t = locale === "fr" ? frRaw : enRaw;
  return t.faqItems as { question: string; answer: string }[];
}

function getBreadcrumbLabels(locale: "fr" | "en") {
  const t = locale === "fr" ? frRaw : enRaw;
  return t.breadcrumb as { home: string; services: string; insights: string };
}

// ---------------------------------------------------------------------------
// Schema builders
// ---------------------------------------------------------------------------

function buildFaqSchema(locale: "fr" | "en") {
  const items = getFaqItems(locale);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function buildBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

function buildServicesHubSchema(locale: "fr" | "en", base: string) {
  const t = locale === "fr" ? frRaw : enRaw;
  const slugs = ["syndicat-copropriete", "airbnb", "location"] as const;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.servicesHub.schemaName,
    description: t.servicesHub.metaDescription,
    itemListElement: slugs.map((slug, i) => {
      const svc = getService(locale, slug);
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: svc.title,
          description: svc.description,
          url: `${base}/services/${slug}`,
        },
      };
    }),
  };
}

function buildServiceSchema(locale: "fr" | "en", slug: string, base: string) {
  const svc = getService(locale, slug);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.title,
    description: svc.description,
    provider: { "@id": ORG_ID },
    url: `${base}/services/${slug}`,
    image: SERVICE_IMAGES[slug],
  };
}

function buildBlogIndexSchema(locale: "fr" | "en", base: string) {
  const name =
    locale === "fr"
      ? "Conseils et articles sur la gestion immobilière à Montréal"
      : "Montreal Property Management Insights";
  const description =
    locale === "fr"
      ? "Articles pratiques sur la gestion immobilière à Montréal : conformité copropriété, maintenance préventive, optimisation du NOI, réglementation Airbnb."
      : "Practical articles on property management in Montreal: condo compliance, preventive maintenance, NOI optimization, Airbnb regulation.";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    itemListElement: blogPosts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Article",
        name: post[locale].title,
        url: `${base}/blog/${post.slug}`,
        datePublished: post.datePublished,
        image: post.image,
      },
    })),
  };
}

function buildArticleSchema(locale: "fr" | "en", slug: string, base: string) {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return null;
  const loc = post[locale];
  const articleUrl = `${base}/blog/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: loc.title,
    description: loc.excerpt,
    image: post.image,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Gestion Velora",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png?v=10` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };
}

function fillLoc(template: string, city: typeof CITIES[0], locale: "fr" | "en"): string {
  const name = locale === "fr" ? city.nameFr : city.nameEn;
  return template.replace(/{city}/g, name).replace(/{cityEn}/g, city.nameEn);
}

// ---------------------------------------------------------------------------
// Noscript content builders (static text for non-JS crawlers)
// ---------------------------------------------------------------------------

function richToText(para: RichParagraph): string {
  if (typeof para === "string") return para;
  return para.map((seg) => (typeof seg === "string" ? seg : seg.text)).join("");
}

function buildLocationNoscript(
  locale: "fr" | "en",
  svc: typeof LOCATION_SERVICES[0],
  city: typeof CITIES[0]
): string {
  const lang = locale === "fr" ? "fr-CA" : "en-CA";
  const h1 = fillLoc(locale === "fr" ? svc.h1Fr : svc.h1En, city, locale);
  const desc = fillLoc(locale === "fr" ? svc.descFr : svc.descEn, city, locale);
  const cityName = locale === "fr" ? city.nameFr : city.nameEn;

  const inclTitle =
    locale === "fr"
      ? `${svc.nameFr} à ${city.nameFr} : ce qui est inclus`
      : `${svc.nameEn} in ${cityName}: what's included`;
  const inclDesc =
    locale === "fr"
      ? `Gestion Velora accompagne les propriétaires et syndicats de toute la région de ${city.nameFr} (${city.region}). Chaque mandat est géré avec la même rigueur : rapports transparents, réactivité 24/7 et conformité réglementaire complète.`
      : `Gestion Velora serves property owners and condo boards across ${cityName} and the ${city.region} area. Every mandate is handled with the same rigor: transparent reports, 24/7 responsiveness, and full regulatory compliance.`;

  const features = LOCATION_FEATURES[svc.slug];
  const featureList = locale === "fr" ? features?.fr : features?.en;
  const featureLis = featureList?.map((f) => `    <li>${escapeHtml(f)}</li>`).join("\n") ?? "";

  const whyTitle =
    locale === "fr"
      ? `Pourquoi choisir Gestion Velora à ${city.nameFr} ?`
      : `Why choose Gestion Velora in ${cityName}?`;
  const whySub =
    locale === "fr"
      ? "Une équipe locale, des processus transparents et un bilan éprouvé dans tout le Grand Montréal."
      : "A local team, transparent processes, and a proven track record across the Greater Montreal area.";
  const cards =
    locale === "fr"
      ? [
          { title: "Réactivité 24/7", body: "Les urgences n'attendent pas. Notre équipe est joignable en tout temps." },
          { title: "Rapports transparents", body: "Rapports financiers mensuels, suivi des travaux et procès-verbaux, toujours accessibles." },
          { title: "Expertise locale", body: `Connaissance approfondie du marché immobilier de ${city.nameFr} et des règlements locaux.` },
        ]
      : [
          { title: "24/7 responsiveness", body: "Emergencies don't wait. Our team is reachable around the clock for urgent situations." },
          { title: "Transparent reporting", body: "Monthly financial reports, maintenance logs, and meeting minutes, always accessible." },
          { title: "Local expertise", body: `Deep knowledge of ${cityName}'s real estate market, regulations, and building stock.` },
        ];
  const cardPs = cards
    .map((c) => `  <p><strong>${escapeHtml(c.title)}</strong>: ${escapeHtml(c.body)}</p>`)
    .join("\n");

  const readyTitle =
    locale === "fr"
      ? `Prêt à confier votre bien à un gestionnaire à ${city.nameFr} ?`
      : `Ready to work with a property manager in ${cityName}?`;
  const readyBody =
    locale === "fr"
      ? "Contactez-nous pour une soumission gratuite. Nous répondons sous un jour ouvrable."
      : "Contact us for a free quote. We respond within one business day.";

  return `<noscript><main lang="${lang}">
  <h1>${escapeHtml(h1)}</h1>
  <p>${escapeHtml(desc)}</p>
  <h2>${escapeHtml(inclTitle)}</h2>
  <p>${escapeHtml(inclDesc)}</p>
  <ul>
${featureLis}
  </ul>
  <h2>${escapeHtml(whyTitle)}</h2>
  <p>${escapeHtml(whySub)}</p>
${cardPs}
  <h2>${escapeHtml(readyTitle)}</h2>
  <p>${escapeHtml(readyBody)}</p>
</main></noscript>`;
}

function buildBlogNoscript(locale: "fr" | "en", slug: string): string {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return "";
  const loc = post[locale];
  const lang = locale === "fr" ? "fr-CA" : "en-CA";

  const sectionHtml = loc.sections
    .slice(0, 4)
    .map((section) => {
      const firstPara = section.paragraphs[0] ? richToText(section.paragraphs[0]).slice(0, 600) : "";
      return `  <h2>${escapeHtml(section.heading)}</h2>\n  <p>${escapeHtml(firstPara)}</p>`;
    })
    .join("\n");

  return `<noscript><main lang="${lang}">
  <h1>${escapeHtml(loc.title)}</h1>
  <p>${escapeHtml(loc.brief)}</p>
${sectionHtml}
</main></noscript>`;
}

function buildServicesHubNoscript(locale: "fr" | "en"): string {
  const lang = locale === "fr" ? "fr-CA" : "en-CA";
  if (locale === "fr") {
    return `<noscript><main lang="${lang}">
  <h1>Services de gestion immobilière à Montréal</h1>
  <p>Gestion Velora propose trois services distincts a Montreal : syndicat de copropriete, gestion Airbnb et gestion locative longue duree.</p>
  <h2>Nos services specialises</h2>
  <ul>
    <li>Syndicat de copropriete : gouvernance, budget, fonds de prevoyance et conformite.</li>
    <li>Gestion Airbnb : operations quotidiennes, tarification et experience voyageurs.</li>
    <li>Gestion locative : selection des locataires, loyers, maintenance et suivis TAL.</li>
  </ul>
</main></noscript>`;
  }
  return `<noscript><main lang="${lang}">
  <h1>Property management services in Montreal</h1>
  <p>Gestion Velora provides three focused services in Montreal: condo board management, Airbnb operations, and long-term rental management.</p>
  <h2>Our service lines</h2>
  <ul>
    <li>Condo boards: governance, budgeting, reserve fund, and compliance.</li>
    <li>Airbnb: daily operations, pricing strategy, and guest experience.</li>
    <li>Long-term rentals: tenant screening, rent collection, and maintenance workflows.</li>
  </ul>
</main></noscript>`;
}

function buildBlogIndexNoscript(locale: "fr" | "en"): string {
  const lang = locale === "fr" ? "fr-CA" : "en-CA";
  const topPosts = blogPosts.slice(0, 6);
  if (locale === "fr") {
    const links = topPosts
      .map((post) => `    <li><a href="/blog/${post.slug}">${escapeHtml(post.fr.title)}</a></li>`)
      .join("\n");
    return `<noscript><main lang="${lang}">
  <h1>Blog – Gestion immobilière Montréal</h1>
  <p>Actualités, conseils pratiques et analyses sur la gestion immobilière à Montréal : copropriétés, Airbnb, locations, réglementation et rentabilité.</p>
  <h2>Articles recents</h2>
  <ul>
${links}
  </ul>
</main></noscript>`;
  }
  const links = topPosts
    .map((post) => `    <li><a href="/en/blog/${post.slug}">${escapeHtml(post.en.title)}</a></li>`)
    .join("\n");
  return `<noscript><main lang="${lang}">
  <h1>Montreal property management blog</h1>
  <p>Advice and updates on condo management, long-term rentals, preventive maintenance, and Airbnb regulation in Montreal.</p>
  <h2>Recent articles</h2>
  <ul>
${links}
  </ul>
</main></noscript>`;
}

function buildLocationServiceSchema(
  locale: "fr" | "en",
  svc: typeof LOCATION_SERVICES[0],
  city: typeof CITIES[0],
  base: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: fillLoc(locale === "fr" ? svc.h1Fr : svc.h1En, city, locale),
    description: fillLoc(locale === "fr" ? svc.descFr : svc.descEn, city, locale),
    provider: { "@id": ORG_ID },
    url: `${base}/location/${svc.slug}-${city.slug}`,
    areaServed: { "@type": "City", name: locale === "fr" ? city.nameFr : city.nameEn },
  };
}

function buildLocationFaqSchema(
  locale: "fr" | "en",
  svc: typeof LOCATION_SERVICES[0],
  city: typeof CITIES[0]
): object {
  const cityName = locale === "fr" ? city.nameFr : city.nameEn;

  const qaMap: Record<string, { q: string; a: string }[]> = {
    "gestion-airbnb":
      locale === "fr"
        ? [
            {
              q: `Faut-il un permis pour faire Airbnb à ${cityName} ?`,
              a: `Au Québec, la location courte durée requiert un classement de Tourisme Québec. Des règles de zonage municipales s'appliquent également dans la grande région de Montréal. Gestion Velora gère la conformité réglementaire complète pour tous ses mandats de location courte durée à ${cityName}.`,
            },
            {
              q: `Que comprend la gestion Airbnb à ${cityName} ?`,
              a: `Gestion Velora prend en charge les annonces, les réservations, l'accueil des voyageurs, la coordination du ménage, la tarification dynamique et la conformité réglementaire pour vos locations courte durée à ${cityName}.`,
            },
            {
              q: `Quel est le tarif de gestion Airbnb à ${cityName} ?`,
              a: `Les honoraires de gestion Airbnb de Gestion Velora sont calculés en pourcentage des revenus générés. Contactez-nous pour un devis personnalisé selon le type de propriété et la fréquence d'occupation à ${cityName}.`,
            },
          ]
        : [
            {
              q: `Do I need a permit for Airbnb in ${cityName}?`,
              a: `In Quebec, short-term rentals require a Tourisme Québec classification certificate. Municipal zoning rules apply in the Greater Montreal area. Gestion Velora manages full regulatory compliance for all short-term rental mandates in ${cityName}.`,
            },
            {
              q: `What does Airbnb management in ${cityName} include?`,
              a: `Gestion Velora handles listings, bookings, guest check-in, cleaning coordination, dynamic pricing, and regulatory compliance for short-term rentals in ${cityName}.`,
            },
            {
              q: `How much does Airbnb management cost in ${cityName}?`,
              a: `Gestion Velora's Airbnb management fees are calculated as a percentage of generated revenue. Contact us for a personalized quote based on your property type and occupancy frequency in ${cityName}.`,
            },
          ],
    "syndicat-copropriete":
      locale === "fr"
        ? [
            {
              q: `Quelles sont les obligations du syndicat de copropriété à ${cityName} ?`,
              a: `Un syndicat de copropriété à ${cityName} doit tenir une assemblée générale annuelle, gérer un fonds de prévoyance conforme à la Loi 141, entretenir les parties communes et respecter les obligations de la Loi sur la copropriété (RLRQ c. C-6.1). Gestion Velora structure ces cycles de conformité pour chaque mandat.`,
            },
            {
              q: `Que comprend la gestion d'un syndicat de copropriété à ${cityName} ?`,
              a: `La gestion de syndicat par Gestion Velora comprend l'administration et la convocation des assemblées, la gestion du fonds de prévoyance, le suivi des travaux majeurs, les rapports financiers trimestriels et la communication 24/7 avec les copropriétaires à ${cityName}.`,
            },
            {
              q: `Pourquoi faire appel à un gestionnaire de copropriété à ${cityName} ?`,
              a: `Un gestionnaire professionnel réduit les risques de non-conformité réglementaire, structure les cycles de maintenance préventive, et libère les administrateurs bénévoles des tâches opérationnelles courantes. À ${cityName}, Gestion Velora assure transparence et réactivité à chaque mandat.`,
            },
          ]
        : [
            {
              q: `What are condo board obligations in ${cityName}?`,
              a: `A condo board in ${cityName} must hold an annual general meeting, maintain a reserve fund compliant with Bill 16, maintain common areas, and follow Quebec's Condo Act (C-6.1). Gestion Velora structures all compliance cycles for each mandate.`,
            },
            {
              q: `What does condo board management in ${cityName} include?`,
              a: `Gestion Velora's condo management includes AGM coordination, reserve fund management, major work oversight, quarterly financial reports, and 24/7 owner communication for condo boards in ${cityName}.`,
            },
            {
              q: `Why hire a condo manager in ${cityName}?`,
              a: `A professional manager reduces regulatory non-compliance risk, structures preventive maintenance cycles, and frees volunteer administrators from day-to-day operations. In ${cityName}, Gestion Velora delivers transparency and responsiveness on every mandate.`,
            },
          ],
    "gestion-locative":
      locale === "fr"
        ? [
            {
              q: `Que comprend la gestion locative à ${cityName} ?`,
              a: `La gestion locative de Gestion Velora à ${cityName} comprend la sélection rigoureuse des locataires, la rédaction des baux, la collecte des loyers, la coordination de l'entretien, et les rapports financiers mensuels pour chaque immeuble.`,
            },
            {
              q: `Comment réduire le roulement locatif à ${cityName} ?`,
              a: `Le roulement locatif se réduit par une communication prévisible, des délais de réponse clairs aux demandes d'entretien, et un état des lieux rigoureux à l'entrée et à la sortie. Gestion Velora applique ces standards sur chaque mandat locatif à ${cityName}.`,
            },
            {
              q: `Quel est le tarif de gestion locative à ${cityName} ?`,
              a: `Les honoraires de gestion locative varient selon le nombre d'unités, leur type et les services requis. Contactez Gestion Velora pour un devis personnalisé adapté à votre immeuble à ${cityName}.`,
            },
          ]
        : [
            {
              q: `What does rental management in ${cityName} include?`,
              a: `Gestion Velora's rental management in ${cityName} covers rigorous tenant screening, lease drafting, rent collection, maintenance coordination, and monthly financial reports for each building.`,
            },
            {
              q: `How do you reduce tenant turnover in ${cityName}?`,
              a: `Tenant turnover is reduced through predictable communication, clear maintenance response timelines, and rigorous move-in and move-out inspections. Gestion Velora applies these standards on every rental mandate in ${cityName}.`,
            },
            {
              q: `What is the cost of rental management in ${cityName}?`,
              a: `Rental management fees vary by number of units, property type, and required services. Contact Gestion Velora for a personalized quote tailored to your building in ${cityName}.`,
            },
          ],
    "gestion-immobiliere-commerciale":
      locale === "fr"
        ? [
            {
              q: `Que comprend la gestion immobilière commerciale à ${cityName} ?`,
              a: `Gestion Velora gère les baux commerciaux, les relations avec les locataires commerciaux, l'entretien préventif des espaces et l'optimisation du rendement pour les propriétaires d'immeubles commerciaux à ${cityName}.`,
            },
            {
              q: `Comment optimiser le rendement d'un immeuble commercial à ${cityName} ?`,
              a: `L'optimisation passe par un suivi mensuel du NOI, des baux bien structurés, la maîtrise des charges communes et une maintenance préventive rigoureuse. Gestion Velora accompagne les propriétaires commerciaux à ${cityName} avec des rapports transparents et une réactivité 24/7.`,
            },
          ]
        : [
            {
              q: `What does commercial property management in ${cityName} include?`,
              a: `Gestion Velora manages commercial leases, tenant relations, preventive maintenance, and yield optimization for commercial property owners in ${cityName}.`,
            },
            {
              q: `How do you maximize commercial property returns in ${cityName}?`,
              a: `Optimization involves monthly NOI tracking, well-structured leases, controlled common charges, and rigorous preventive maintenance. Gestion Velora supports commercial owners in ${cityName} with transparent reporting and 24/7 responsiveness.`,
            },
          ],
  };

  const items = qaMap[svc.slug] ?? [];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

function buildLocationRoutes(): RouteConfig[] {
  const out: RouteConfig[] = [];
  for (const svc of LOCATION_SERVICES) {
    for (const city of CITIES) {
      const slug = `${svc.slug}-${city.slug}`;
      const frPath = `/location/${slug}`;
      const enPath = `/en/location/${slug}`;
      const svcImage = SERVICE_IMAGES[svc.serviceSlug] ?? DEFAULT_OG_IMAGE;
      const frBc = getBreadcrumbLabels("fr");
      const enBc = getBreadcrumbLabels("en");

      out.push({
        path: frPath,
        locale: "fr",
        frPath,
        enPath,
        title: buildTitle(fillLoc(svc.titleTmplFr, city, "fr")),
        description: fillLoc(svc.descFr, city, "fr"),
        ogImage: svcImage,
        twitterImage: svcImage,
        noscriptBody: buildLocationNoscript("fr", svc, city),
        pageSchemas: [
          buildLocationServiceSchema("fr", svc, city, SITE_URL),
          buildBreadcrumbSchema([
            { name: frBc.home, url: `${SITE_URL}/` },
            { name: frBc.services, url: `${SITE_URL}/services` },
            { name: fillLoc(svc.h1Fr, city, "fr") },
          ]),
          buildLocationFaqSchema("fr", svc, city),
        ],
      });
      out.push({
        path: enPath,
        locale: "en",
        frPath,
        enPath,
        title: buildTitle(fillLoc(svc.titleTmplEn, city, "en")),
        description: fillLoc(svc.descEn, city, "en"),
        ogImage: svcImage,
        twitterImage: svcImage,
        noscriptBody: buildLocationNoscript("en", svc, city),
        pageSchemas: [
          buildLocationServiceSchema("en", svc, city, `${SITE_URL}/en`),
          buildBreadcrumbSchema([
            { name: enBc.home, url: `${SITE_URL}/` },
            { name: enBc.services, url: `${SITE_URL}/en/services` },
            { name: fillLoc(svc.h1En, city, "en") },
          ]),
          buildLocationFaqSchema("en", svc, city),
        ],
      });
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Route definitions
// ---------------------------------------------------------------------------
interface RouteConfig {
  path: string;
  locale: "fr" | "en";
  frPath: string;
  enPath: string;
  title: string;
  description: string;
  ogImage?: string;
  twitterImage?: string;
  pageSchemas: object | object[] | null;
  /** Page-specific noscript HTML to replace the homepage noscript block. */
  noscriptBody?: string;
}

function buildRoutes(): RouteConfig[] {
  const routes: RouteConfig[] = [];

  // --- Homepage ---
  const frHomeTitle = "Gestion immobilière Montréal | Gestion Velora";
  const frHomeDesc =
    "Gestion Velora : gestion complète de copropriétés, locations longue durée et Airbnb à Montréal. Transparence totale, rapports mensuels et tranquillité garantie pour les propriétaires.";
  const enHomeTitle = "Gestion Velora — Property Management Montreal (Condo, Rental, Airbnb)";
  const enHomeDesc =
    "Montreal property operations for condo boards, short-term rentals, and long-term rentals. Transparent reporting, 24/7 support, and proactive maintenance.";

  routes.push({
    path: "/",
    locale: "fr",
    frPath: "/",
    enPath: "/en/",
    title: frHomeTitle,
    description: frHomeDesc,
    // Homepage FAQPage is injected at runtime by SchemaOrg.tsx (single source of truth).
    pageSchemas: null,
    // homepage uses dedicated twitter-card, not og-image
  });
  routes.push({
    path: "/en/",
    locale: "en",
    frPath: "/",
    enPath: "/en/",
    title: enHomeTitle,
    description: enHomeDesc,
    // Homepage FAQPage is injected at runtime by SchemaOrg.tsx (single source of truth).
    pageSchemas: null,
  });

  // --- Services hub ---
  const frHubMeta = getServicesHubMeta("fr");
  const enHubMeta = getServicesHubMeta("en");

  routes.push({
    path: "/services",
    locale: "fr",
    frPath: "/services",
    enPath: "/en/services",
    title: frHubMeta.title,
    description: frHubMeta.description,
    noscriptBody: buildServicesHubNoscript("fr"),
    pageSchemas: buildServicesHubSchema("fr", SITE_URL),
  });
  routes.push({
    path: "/en/services",
    locale: "en",
    frPath: "/services",
    enPath: "/en/services",
    title: enHubMeta.title,
    description: enHubMeta.description,
    noscriptBody: buildServicesHubNoscript("en"),
    pageSchemas: buildServicesHubSchema("en", `${SITE_URL}/en`),
  });

  // --- Service detail pages ---
  for (const slug of ["syndicat-copropriete", "airbnb", "location", "gestion-condo", "gestion-copropriete"] as const) {
    const frSvc = getService("fr", slug);
    const enSvc = getService("en", slug);
    const img = SERVICE_IMAGES[slug];

    const frBc = getBreadcrumbLabels("fr");
    const enBc = getBreadcrumbLabels("en");

    routes.push({
      path: `/services/${slug}`,
      locale: "fr",
      frPath: `/services/${slug}`,
      enPath: `/en/services/${slug}`,
      title: buildTitle(frSvc.title),
      description: frSvc.description,
      ogImage: img,
      twitterImage: img,
      pageSchemas: [
        buildServiceSchema("fr", slug, SITE_URL),
        buildBreadcrumbSchema([
          { name: frBc.home, url: SITE_URL + "/" },
          { name: frBc.services, url: `${SITE_URL}/services` },
          { name: frSvc.title },
        ]),
      ],
    });
    routes.push({
      path: `/en/services/${slug}`,
      locale: "en",
      frPath: `/services/${slug}`,
      enPath: `/en/services/${slug}`,
      title: buildTitle(enSvc.title),
      description: enSvc.description,
      ogImage: img,
      twitterImage: img,
      pageSchemas: [
        buildServiceSchema("en", slug, `${SITE_URL}/en`),
        buildBreadcrumbSchema([
          { name: enBc.home, url: SITE_URL + "/" },
          { name: enBc.services, url: `${SITE_URL}/en/services` },
          { name: enSvc.title },
        ]),
      ],
    });
  }

  // --- Comparison hub ---
  routes.push({
    path: "/compare",
    locale: "fr",
    frPath: "/compare",
    enPath: "/en/compare",
    title: "Guides comparatifs en gestion immobiliere | Gestion Velora",
    description:
      "Comparatifs clairs entre les principaux modeles de gestion immobiliere a Montreal: autogestion, gestion professionnelle, location courte et longue duree.",
    pageSchemas: null,
  });
  routes.push({
    path: "/en/compare",
    locale: "en",
    frPath: "/compare",
    enPath: "/en/compare",
    title: "Property Management Comparison Guides | Gestion Velora",
    description:
      "Side-by-side comparisons of key property management models in Montreal for condo boards, landlords, and investors.",
    pageSchemas: null,
  });

  // --- Comparison detail pages ---
  for (const page of COMPARISON_PAGES) {
    routes.push({
      path: `/compare/${page.slug}`,
      locale: "fr",
      frPath: `/compare/${page.slug}`,
      enPath: `/en/compare/${page.slug}`,
      title: buildTitle(page.titleFr),
      description: page.descriptionFr,
      pageSchemas: null,
    });
    routes.push({
      path: `/en/compare/${page.slug}`,
      locale: "en",
      frPath: `/compare/${page.slug}`,
      enPath: `/en/compare/${page.slug}`,
      title: buildTitle(page.titleEn),
      description: page.descriptionEn,
      pageSchemas: null,
    });
  }

  // --- Location hubs ---
  routes.push({
    path: "/locations",
    locale: "fr",
    frPath: "/locations",
    enPath: "/en/locations",
    title: "Pages locales gestion immobiliere | Gestion Velora",
    description:
      "Pages locales de gestion immobiliere par ville du Grand Montreal: copropriete, location et Airbnb.",
    pageSchemas: null,
  });
  routes.push({
    path: "/en/locations",
    locale: "en",
    frPath: "/locations",
    enPath: "/en/locations",
    title: "City Property Management Pages | Gestion Velora",
    description:
      "Local property management pages by city across Greater Montreal for condo boards, rentals, and Airbnb operations.",
    pageSchemas: null,
  });

  // --- Blog index ---
  const frBlogTitle = "Blog gestion immobilière Montréal | Conseils & actualités";
  const frBlogDesc =
    "Actualités, conseils pratiques et analyses sur la gestion immobilière à Montréal : copropriétés, Airbnb, locations, réglementation et rentabilité. Par l’équipe Gestion Velora.";
  const enBlogTitle = "Montreal Property Management Blog — Advice & News | Gestion Velora";
  const enBlogDesc =
    "Practical articles on property management in Montreal: condo compliance, preventive maintenance, NOI optimization, Airbnb regulation.";

  routes.push({
    path: "/blog",
    locale: "fr",
    frPath: "/blog",
    enPath: "/en/blog",
    title: frBlogTitle,
    description: frBlogDesc,
    noscriptBody: buildBlogIndexNoscript("fr"),
    pageSchemas: buildBlogIndexSchema("fr", SITE_URL),
  });
  routes.push({
    path: "/en/blog",
    locale: "en",
    frPath: "/blog",
    enPath: "/en/blog",
    title: enBlogTitle,
    description: enBlogDesc,
    noscriptBody: buildBlogIndexNoscript("en"),
    pageSchemas: buildBlogIndexSchema("en", `${SITE_URL}/en`),
  });

  // --- Blog posts ---
  for (const post of blogPosts) {
    const slug = post.slug;
    const img = post.image;

    const frBc = getBreadcrumbLabels("fr");
    const enBc = getBreadcrumbLabels("en");

    const frArticle = buildArticleSchema("fr", slug, SITE_URL);
    const enArticle = buildArticleSchema("en", slug, `${SITE_URL}/en`);

    routes.push({
      path: `/blog/${slug}`,
      locale: "fr",
      frPath: `/blog/${slug}`,
      enPath: `/en/blog/${slug}`,
      title: buildTitle(post.fr.metaTitle ?? post.fr.title),
      description: post.fr.excerpt,
      ogImage: img,
      twitterImage: img,
      noscriptBody: buildBlogNoscript("fr", slug),
      pageSchemas: frArticle
        ? [
            frArticle,
            buildBreadcrumbSchema([
              { name: frBc.home, url: SITE_URL + "/" },
              { name: frBc.insights, url: `${SITE_URL}/blog` },
              { name: post.fr.title },
            ]),
          ]
        : null,
    });
    routes.push({
      path: `/en/blog/${slug}`,
      locale: "en",
      frPath: `/blog/${slug}`,
      enPath: `/en/blog/${slug}`,
      title: buildTitle(post.en.metaTitle ?? post.en.title),
      description: post.en.excerpt,
      ogImage: img,
      twitterImage: img,
      noscriptBody: buildBlogNoscript("en", slug),
      pageSchemas: enArticle
        ? [
            enArticle,
            buildBreadcrumbSchema([
              { name: enBc.home, url: SITE_URL + "/" },
              { name: enBc.insights, url: `${SITE_URL}/en/blog` },
              { name: post.en.title },
            ]),
          ]
        : null,
    });
  }

  // --- Privacy ---
  routes.push({
    path: "/privacy",
    locale: "fr",
    frPath: "/privacy",
    enPath: "/en/privacy",
    title: "Politique de confidentialité | Gestion Velora",
    description: frHomeDesc,
    pageSchemas: null,
  });
  routes.push({
    path: "/en/privacy",
    locale: "en",
    frPath: "/privacy",
    enPath: "/en/privacy",
    title: "Privacy Policy | Gestion Velora",
    description: enHomeDesc,
    pageSchemas: null,
  });

  // --- Tarifs ---
  routes.push({
    path: "/tarifs",
    locale: "fr",
    frPath: "/tarifs",
    enPath: "/en/tarifs",
    title: "Tarifs de gestion immobilière à Montréal | Gestion Velora",
    description:
      "Tarifs transparents pour la gestion de syndicat de copropriété, gestion locative et Airbnb à Montréal. À partir de 40 $/unité/mois. Sans frais cachés.",
    pageSchemas: null,
  });
  routes.push({
    path: "/en/tarifs",
    locale: "en",
    frPath: "/tarifs",
    enPath: "/en/tarifs",
    title: "Property Management Fees Montreal | Gestion Velora",
    description:
      "Transparent pricing for condo board management, rental management, and Airbnb management in Montreal. Starting at $40/unit/month. No hidden fees.",
    pageSchemas: null,
  });

  // --- FAQ ---
  routes.push({
    path: "/faq",
    locale: "fr",
    frPath: "/faq",
    enPath: "/en/faq",
    title: "FAQ gestion immobilière Montréal | Gestion Velora",
    description:
      "Réponses aux questions fréquentes sur la gestion de condo, syndicat de copropriété, location et Airbnb à Montréal.",
    pageSchemas: buildFaqSchema("fr"),
  });
  routes.push({
    path: "/en/faq",
    locale: "en",
    frPath: "/faq",
    enPath: "/en/faq",
    title: "Property Management FAQ Montreal | Gestion Velora",
    description:
      "Answers to the most common questions about condo management, condo boards, rental, and Airbnb in Montreal.",
    pageSchemas: buildFaqSchema("en"),
  });

  // --- Location pages (35 cities × 4 services × 2 languages = 280 routes) ---
  routes.push(...buildLocationRoutes());

  return routes;
}

// ---------------------------------------------------------------------------
// Sitemap generator — runs after every build so the file never goes stale
// ---------------------------------------------------------------------------
function buildSitemap(routes: RouteConfig[]): void {
  const today = new Date().toISOString().slice(0, 10);

  function priority(path: string): string {
    if (path === "/" || path === "/en/") return "1.0";
    if (path.startsWith("/services") || path.startsWith("/en/services")) return "0.9";
    if (path.startsWith("/compare/") || path.startsWith("/en/compare/")) return "0.8";
    if (path === "/compare" || path === "/en/compare") return "0.8";
    if (path === "/locations" || path === "/en/locations") return "0.8";
    if (path.startsWith("/location/") || path.startsWith("/en/location/")) return "0.8";
    if (path.startsWith("/blog/") || path.startsWith("/en/blog/")) return "0.7";
    return "0.6";
  }

  function changefreq(path: string): string {
    if (path === "/" || path === "/en/") return "weekly";
    if (path.startsWith("/location/") || path.startsWith("/en/location/")) return "monthly";
    return "monthly";
  }

  const seen = new Set<string>();
  const entries: string[] = [];

  for (const route of routes) {
    if (seen.has(route.path)) continue;
    seen.add(route.path);

    const loc = `${SITE_URL}${route.path}`;
    const frHref = `${SITE_URL}${route.frPath}`;
    const enHref = `${SITE_URL}${route.enPath}`;

    entries.push(
      `  <url>\n` +
      `    <loc>${loc}</loc>\n` +
      `    <xhtml:link rel="alternate" hreflang="fr-CA" href="${frHref}" />\n` +
      `    <xhtml:link rel="alternate" hreflang="en-CA" href="${enHref}" />\n` +
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${frHref}" />\n` +
      `    <lastmod>${today}</lastmod>\n` +
      `    <changefreq>${changefreq(route.path)}</changefreq>\n` +
      `    <priority>${priority(route.path)}</priority>\n` +
      `  </url>`
    );
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    entries.join("\n") + "\n" +
    `</urlset>\n`;

  const distPath = join(DIST, "sitemap.xml");
  const publicPath = join(process.cwd(), "public", "sitemap.xml");
  writeFileSync(distPath, xml, "utf-8");
  writeFileSync(publicPath, xml, "utf-8");
  console.log(`  ✓ sitemap.xml — ${entries.length} URLs written`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("\n🔧 Prerendering static HTML for AI crawlers…\n");

  const template = readFileSync(join(DIST, "index.html"), "utf-8");
  const routes = buildRoutes();

  let count = 0;
  for (const route of routes) {
    const isEn = route.locale === "en";
    const lang = isEn ? "en-CA" : "fr-CA";
    const canonical = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
    const frCanonical = `${SITE_URL}${route.frPath}`;
    const enCanonical = `${SITE_URL}${route.enPath}`;

    const html = buildHtml(template, {
      lang,
      title: route.title,
      description: route.description,
      canonical,
      ogLocale: isEn ? "en_CA" : "fr_CA",
      ogLocaleAlt: isEn ? "fr_CA" : "en_CA",
      ogImage: route.ogImage ?? DEFAULT_OG_IMAGE,
      twitterImage: route.twitterImage ?? DEFAULT_TWITTER_IMAGE,
      hreflangFr: frCanonical,
      hreflangEn: enCanonical,
      hreflangDefault: frCanonical,
      pageSchemas: route.pageSchemas,
      locale: route.locale,
      noscriptBody: route.noscriptBody,
    });

    writeRoute(route.path, html);
    count++;
  }

  // Special: update dist/index.html itself (root / route)
  const rootRoute = routes.find((r) => r.path === "/")!;
  const rootHtml = buildHtml(template, {
    lang: "fr-CA",
    title: rootRoute.title,
    description: rootRoute.description,
    canonical: `${SITE_URL}/`,
    ogLocale: "fr_CA",
    ogLocaleAlt: "en_CA",
    ogImage: DEFAULT_OG_IMAGE,
    twitterImage: DEFAULT_TWITTER_IMAGE,
    hreflangFr: `${SITE_URL}/`,
    hreflangEn: `${SITE_URL}/en/`,
    hreflangDefault: `${SITE_URL}/`,
    pageSchemas: rootRoute.pageSchemas,
    locale: "fr",
  });
  writeFileSync(join(DIST, "index.html"), rootHtml, "utf-8");
  console.log("  ✓ / (dist/index.html updated)");

  // Auto-generate sitemap from all routes so it never goes stale
  buildSitemap(routes);

  console.log(`\n✅ Prerendered ${count} routes.\n`);
}

main().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
