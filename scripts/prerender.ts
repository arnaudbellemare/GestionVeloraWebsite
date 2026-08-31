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

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "fs";
import { join } from "path";

// ---------------------------------------------------------------------------
// Import app data sources directly — same source of truth as the React app
// ---------------------------------------------------------------------------
import { blogPosts, type RichParagraph } from "../src/data/blog.js";
import { COMPARISON_PAGES } from "../src/data/comparisons.js";
import { isPriorityLocationSlug } from "../src/data/locationPriority.js";
import { isRetiredLocationSlug } from "../src/data/locationRoutePolicy.js";
import { fr as frRaw } from "../src/i18n/fr.js";
import { en as enRaw } from "../src/i18n/en.js";
import { CITIES, LOCATION_SERVICES, LOCATION_FEATURES } from "../src/data/locations.js";
import {
  TRUST_PAGES,
  getTrustPageLocale,
  type TrustBlock,
  type TrustPageId,
} from "../src/data/trust-pages.js";
import {
  CALCULATOR_PATHS,
  REFERENCE_PATHS,
  CALCULATOR_PAGE,
  REFERENCE_PAGE,
  REFERENCE_FIGURES,
  FIGURES_VERIFIED,
} from "../src/data/plex-calculator.js";
import { RADAR_FAQ, RADAR_META, RADAR_METRIC_DEFS, RADAR_PATHS } from "../src/data/plex-radar.js";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const DIST = join(process.cwd(), "dist");
const SITE_URL = "https://www.gestionvelora.com";
const ORG_ID = `${SITE_URL}/#organization`;
const AUTHOR_NAME = "Arnaud Bellemare";
const HOMEPAGE_DATE_MODIFIED = "2026-08-30";
const DEFAULT_SITEMAP_LAST_MODIFIED = "2026-08-20";
const SITEMAP_LAST_MODIFIED_BY_PATH = new Map<string, string>([
  ["/", HOMEPAGE_DATE_MODIFIED],
  ["/en/", HOMEPAGE_DATE_MODIFIED],
  ["/terms", HOMEPAGE_DATE_MODIFIED],
  ["/en/terms", HOMEPAGE_DATE_MODIFIED],
  ["/calculateur-rendement-plex-montreal", "2026-08-24"],
  ["/en/montreal-plex-investment-calculator", "2026-08-24"],
  ["/blog/augmentation-loyer-montreal-regles-calcul-tal", "2026-08-24"],
  ["/en/blog/augmentation-loyer-montreal-regles-calcul-tal", "2026-08-24"],
]);
/** Keep in sync with ARTICLE_AUTHOR_SAME_AS in src/config.ts. */
const AUTHOR_SAME_AS = ["https://ca.linkedin.com/in/gestion-velora-48684b399"] as const;
const HOMEPAGE_CITATIONS = [
  {
    url: "https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research/housing-data/data-tables/rental-market/rental-market-report-data-tables",
    fr: "SCHL — données du Rapport sur le marché locatif",
    en: "CMHC — Rental Market Report data",
  },
  {
    url: "https://www.legisquebec.gouv.qc.ca/fr/document/lc/CCQ-1991",
    fr: "LégisQuébec — Code civil du Québec et copropriété divise",
    en: "LégisQuébec — Civil Code of Québec and divided co-ownership",
  },
  {
    url: "https://montreal.ca/sujets/hebergement-touristique-court-terme",
    fr: "Ville de Montréal — hébergement touristique de courte durée",
    en: "City of Montreal — short-term tourist accommodation",
  },
  {
    url: "https://www.citq.qc.ca/",
    fr: "CITQ — enregistrement des établissements d’hébergement touristique",
    en: "CITQ — tourist accommodation registration",
  },
] as const;
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_TWITTER_IMAGE = `${SITE_URL}/twitter-card.png`;
const HOMEPAGE_IMAGE_PATHS = [
  "/logo-80.webp",
  "/hero-video-poster-mobile.webp?v=6",
  "/images/portfolio/le-beaumont-display.webp",
  "/images/portfolio/syndicat-enticy-display.webp",
  "/images/portfolio/loft-saint-paul-display.webp",
  "/images/airbnb-service.webp",
  "/images/portfolio/syndicat-enticy-thumb.webp",
  "/images/portfolio/le-beaumont-thumb.webp",
  "/hero-gestion-velora-1200.webp",
] as const;
const DEFAULT_KEYWORDS = {
  fr: "gestion immobilière Montréal, gestion copropriété, syndicat de copropriété, gestion locative, gestion Airbnb",
  en: "property management Montreal, condo board management, rental management, Airbnb management, Gestion Velora",
} as const;

function findBuiltAsset(prefix: string): string | undefined {
  const name = readdirSync(join(DIST, "assets")).find(
    (file) => file.startsWith(prefix) && file.endsWith(".js"),
  );
  return name ? `/assets/${name}` : undefined;
}

// Dynamic service-route modules are otherwise discovered only after the entry bundle executes.
// Surface the LCP-critical route and its direct dependencies in the initial HTML instead.
const SERVICE_MODULE_PRELOADS = [
  "ServicePage-",
  "Breadcrumbs-",
  "ScrollReveal-",
].map(findBuiltAsset).filter((href): href is string => Boolean(href));

/** Absolute URLs for OG / Twitter / JSON-LD — must match `src/data/services.ts` (one image per slug). */
const SERVICE_IMAGES: Record<string, string> = {
  "syndicat-copropriete": `${SITE_URL}/images/portfolio/syndicat-enticy.webp`,
  airbnb: `${SITE_URL}/images/airbnb-service.webp`,
  location: `${SITE_URL}/hero-gestion-velora-1200.webp`,
  "gestion-condo": `${SITE_URL}/images/portfolio/le-beaumont.webp`,
  "gestion-copropriete": `${SITE_URL}/images/portfolio/syndicat-enticy.webp`,
};

/** Smaller first-viewport sources for mobile service pages. */
const SERVICE_MOBILE_IMAGES: Record<string, string> = {
  "syndicat-copropriete": `${SITE_URL}/images/portfolio/syndicat-enticy-card.webp`,
  airbnb: `${SITE_URL}/images/airbnb-service.webp`,
  location: `${SITE_URL}/hero-gestion-velora-800.webp`,
  "gestion-condo": `${SITE_URL}/images/portfolio/le-beaumont-card.webp`,
  "gestion-copropriete": `${SITE_URL}/images/portfolio/syndicat-enticy-card.webp`,
};

/** `/location/{service}-{city}` OG images — keyed by `LocationService.slug` (not `serviceSlug`). */
const LOCATION_LANDING_OG_IMAGES: Record<string, string> = {
  "syndicat-copropriete": SERVICE_IMAGES["syndicat-copropriete"],
  "gestion-locative": SERVICE_IMAGES.location,
  "gestion-airbnb": SERVICE_IMAGES.airbnb,
  "conformite-loi-16": `${SITE_URL}/images/portfolio/le-beaumont.webp`,
  "gestion-immobiliere-commerciale": `${SITE_URL}/hero-gestion-velora-1200.webp`,
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

/** Shown in <noscript> when real content lives inside #root (avoids duplicate full <main> in HTML). */
function buildJsFallbackNoscript(locale: "fr" | "en"): string {
  if (locale === "fr") {
    return `<noscript><p lang="fr-CA">Activez JavaScript pour la version interactive. Le contenu principal de cette page est déjà affiché ci-dessous.</p></noscript>`;
  }
  return `<noscript><p lang="en-CA">Enable JavaScript for the interactive experience. This page's main content is already shown below.</p></noscript>`;
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

function absoluteSiteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

function buildMetaDescription(excerpt: string, brief?: string): string {
  if (excerpt.length >= 120) return excerpt;
  const source = `${excerpt} ${brief ?? ""}`.replace(/\s+/g, " ").trim();
  if (source.length <= 160) return source;
  const cut = source.slice(0, 157);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 120 ? lastSpace : 157)}…`;
}

function buildKeywords(locale: "fr" | "en", parts: string[] = []): string {
  const normalized = parts
    .map((part) => part.replace(/[—–:|]/g, " ").replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .slice(0, 4);
  return Array.from(
    new Set([...normalized, ...DEFAULT_KEYWORDS[locale].split(",").map((part) => part.trim())])
  ).join(", ");
}

// ---------------------------------------------------------------------------
// Helper: crawlable site navigation
//
// The prerenderer hand-builds each page's <main>; it does not render the React
// HeaderSection/FooterSection. That left the delivered HTML with no links to the
// /compare and /locations hubs or to the trust pages (/about, /sources,
// /methodology, /trust-proof, /editorial-policy) — they were published and in the
// sitemap but unreachable to a crawler that does not execute JS. This block is
// injected inside #root after <main>, so crawlers and AI engines see the full site
// graph while React replaces it on mount (no visible duplicate nav for users).
// ---------------------------------------------------------------------------
const NAV_LABELS = {
  fr: {
    aria: "Plan du site",
    services: "Services",
    servicesHub: "Tous les services de gestion immobilière",
    syndicat: "Gestion de syndicat de copropriété",
    copropriete: "Gestion de copropriété",
    condo: "Gestion de condo",
    location: "Gestion locative longue durée",
    airbnb: "Gestion Airbnb et location court terme",
    explore: "Explorer",
    compare: "Comparatifs de gestion immobilière",
    locations: "Villes et quartiers desservis",
    tarifs: "Tarifs de gestion immobilière",
    blog: "Blogue — gestion immobilière au Québec",
    calculator: "Calculateur de rendement plex Montréal",
    radar: "Immeubles à revenus à vendre à Montréal",
    trust: "À propos et transparence",
    about: "À propos de Gestion Velora",
    sources: "Sources et références",
    methodology: "Méthodologie éditoriale",
    trustProof: "Preuves et vérifications",
    editorial: "Politique éditoriale",
    privacy: "Politique de confidentialité",
    terms: "Conditions d’utilisation",
    contact: "Contact et demande de proposition",
  },
  en: {
    aria: "Site map",
    services: "Services",
    servicesHub: "All property management services",
    syndicat: "Condo syndicate management",
    copropriete: "Co-ownership management",
    condo: "Condo management",
    location: "Long-term rental management",
    airbnb: "Airbnb and short-term rental management",
    explore: "Explore",
    compare: "Property management comparisons",
    locations: "Cities and neighbourhoods served",
    tarifs: "Property management pricing",
    blog: "Blog — property management in Quebec",
    calculator: "Montreal plex investment calculator",
    radar: "Montreal income properties for sale",
    trust: "About and transparency",
    about: "About Gestion Velora",
    sources: "Sources and references",
    methodology: "Editorial methodology",
    trustProof: "Proof and verifications",
    editorial: "Editorial policy",
    privacy: "Privacy policy",
    terms: "Terms of use",
    contact: "Contact and request a proposal",
  },
} as const;

function buildSiteNavHtml(locale: "fr" | "en"): string {
  const t = NAV_LABELS[locale];
  const p = locale === "en" ? "/en" : "";
  const calculatorPath =
    locale === "en" ? "/en/montreal-plex-investment-calculator" : "/calculateur-rendement-plex-montreal";
  const group = (items: Array<[string, string]>) =>
    items.map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`).join("");

  return [
    `<nav class="gv-site-nav gv-prerender-only" aria-label="${escapeHtml(t.aria)}">`,
    `<ul>`,
    group([
      [`${p}/services`, t.servicesHub],
      [`${p}/services/syndicat-copropriete`, t.syndicat],
      [`${p}/services/gestion-copropriete`, t.copropriete],
      [`${p}/services/gestion-condo`, t.condo],
      [`${p}/services/location`, t.location],
      [`${p}/services/airbnb`, t.airbnb],
    ]),
    group([
      [`${p}/compare`, t.compare],
      [`${p}/locations`, t.locations],
      [`${p}/tarifs`, t.tarifs],
      [`${p}/blog`, t.blog],
      [calculatorPath, t.calculator],
      [locale === "en" ? "/en/montreal-income-properties-for-sale" : "/immeubles-a-revenus-a-vendre-montreal", t.radar],
    ]),
    group([
      [`${p}/about`, t.about],
      [`${p}/sources`, t.sources],
      [`${p}/methodology`, t.methodology],
      [`${p}/trust-proof`, t.trustProof],
      [`${p}/editorial-policy`, t.editorial],
      [`${p}/privacy`, t.privacy],
      [`${p}/terms`, t.terms],
      [`${p}/#contact-form`, t.contact],
    ]),
    `</ul>`,
    `</nav>`,
  ].join("");
}

// ---------------------------------------------------------------------------
// Helper: section-level citation anchors
//
// AI engines cite specific sections when headings expose stable ids. Audit showed
// 0% of H2/H3 carried an id. Slugify any heading that lacks one, keeping existing
// ids untouched so in-page links (#faq, #sources, #outil) keep working.
// ---------------------------------------------------------------------------
function slugifyHeading(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/&[a-z]+;/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function addHeadingAnchors(html: string): string {
  const used = new Set<string>();
  for (const match of html.matchAll(/<(h[23])\s+id="([^"]+)"/g)) used.add(match[2]);

  return html.replace(/<(h[23])(\s[^>]*)?>([\s\S]*?)<\/\1>/g, (full, tag, attrs = "", inner) => {
    if (attrs && /\sid=/.test(attrs)) return full;
    const base = slugifyHeading(inner);
    if (!base) return full;
    let id = base;
    let n = 2;
    while (used.has(id)) id = `${base}-${n++}`;
    used.add(id);
    return `<${tag} id="${id}"${attrs}>${inner}</${tag}>`;
  });
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
    /** First-viewport image to preload on this route. Omit when the page has no image LCP. */
    lcpImage?: string;
    /** Route chunks required to render the first viewport. */
    modulePreloads?: string[];
    keywords?: string;
    ampHtmlHref?: string;
    hreflangFr: string;
    hreflangEn: string;
    hreflangDefault: string;
    robots?: string;
    /** Page-specific JSON-LD schemas to inject. Accepts a single object or array. */
    pageSchemas: object | object[] | null;
    /** Locale of this page; used to strip the French static SEO block on EN pages. */
    locale: "fr" | "en";
    /** Page-specific noscript HTML. When provided (without prerenderMainInner), replaces the homepage noscript block entirely. */
    noscriptBody?: string;
    /** Full <main>...</main> inserted inside #root before React mounts (crawlable without relying on <noscript>). */
    prerenderMainInner?: string;
  }
): string {
  let html = template;

  // The Vite template contains homepage-specific responsive poster preloads. Carrying those
  // onto every prerendered route wastes bandwidth and delays the real LCP image on service pages.
  if (opts.canonical !== `${SITE_URL}/` && opts.canonical !== `${SITE_URL}/en/`) {
    html = html.replace(/\s*<link\s+data-gv-home-hero[^>]*>/g, "");
    // The homepage's fixed first-paint poster is useful on home, but on every other route it
    // downloads three irrelevant hero candidates and covers the route until React mounts.
    html = html.replace(
      /\s*<div id="gv-first-paint"[\s\S]*?(?=\s*<div id="root")/,
      "\n",
    );
    html = html.replace('<body style="background:#000000">', "<body>");
  }
  if (opts.lcpImage) {
    html = html.replace(
      "</head>",
      `  <link rel="preload" as="image" href="${opts.lcpImage}" fetchpriority="high" />\n</head>`,
    );
  }
  if (opts.modulePreloads?.length) {
    const hints = opts.modulePreloads
      .map((href) => `<link rel="modulepreload" crossorigin href="${href}">`)
      .join("\n");
    html = html.replace("</head>", `  ${hints}\n</head>`);
  }

  // 1. lang attribute on <html>
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${opts.lang}"`);

  // 2. <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(opts.title)}</title>`);

  // 3. <meta name="description">
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeHtml(opts.description)}"`
  );

  html = html.replace(/\s*<meta name="keywords" content="[^"]*"\s*\/?>/g, "");
  const keywords = opts.keywords ?? DEFAULT_KEYWORDS[opts.locale];
  html = html.replace(
    /(<meta name="description" content="[^"]*" \/>)/,
    `$1\n    <meta name="keywords" content="${escapeHtml(keywords)}" />`
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

  html = html.replace(/\s*<link rel="amphtml" href="[^"]*"\s*\/?>/g, "");
  if (opts.ampHtmlHref) {
    html = html.replace("</head>", `  <link rel="amphtml" href="${opts.ampHtmlHref}" />\n</head>`);
  }

  html = html.replace(/\s*<meta name="robots" content="[^"]*"\s*\/?>/g, "");
  if (opts.robots) {
    html = html.replace("</head>", `  <meta name="robots" content="${opts.robots}" />\n</head>`);
  }

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

  // 15a. Crawlable body copy inside #root (replaced on first React render).
  // Headings gain citation anchors and the site nav follows <main>, so the full
  // internal link graph is visible to non-JS crawlers.
  if (opts.prerenderMainInner) {
    const mainWithAnchors = addHeadingAnchors(opts.prerenderMainInner);
    // The index.html cloak hides `#root > main` (and `.gv-prerender-only`) once JS
    // boots. A body that isn't wrapped in <main> escapes that selector and paints
    // as raw unstyled text until React replaces it, so wrap any bare fragment here.
    const mainBlock = /^\s*<main[\s>]/.test(mainWithAnchors)
      ? mainWithAnchors
      : `<main lang="${opts.locale === "en" ? "en-CA" : "fr-CA"}">${mainWithAnchors}</main>`;
    const innerBlock = `\n    ${mainBlock}\n    ${buildSiteNavHtml(opts.locale)}\n    `;
    if (html.includes('id="root" data-gv-boot=')) {
      html = html.replace(
        /<div id="root" data-gv-boot="[^"]*"(?: style="[^"]*")?>\s*<\/div>/,
        `<div id="root" data-gv-boot="ready">${innerBlock}</div>`
      );
    } else {
      html = html.replace(
        /<div id="root"><\/div>/,
        `<div id="root" data-gv-boot="ready">${innerBlock}</div>`
      );
    }
  }

  // 15b. Replace the homepage noscript SEO block: either JS-only hint when main is in #root,
  // page-specific noscript (homepage-scale), or generic EN stub.
  if (opts.prerenderMainInner) {
    html = html.replace(
      /<noscript>\s*<main[^>]*>[\s\S]*?<\/main>\s*<\/noscript>/,
      buildJsFallbackNoscript(opts.locale)
    );
  } else if (opts.noscriptBody) {
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
    const pageSchema =
      schemas.length === 1
        ? schemas[0]
        : {
            "@context": "https://schema.org",
            "@graph": schemas.map((schema) => {
              const { "@context": _ctx, ...rest } = schema as Record<string, unknown>;
              return rest;
            }),
          };
    const schemaTags = `  <script id="schema-org-page" type="application/ld+json">\n  ${JSON.stringify(pageSchema, null, 2)}\n  </script>\n`;
    html = html.replace("</head>", `${schemaTags}</head>`);
  }

  // 17. Keep WebSite potentialAction URLs aligned per locale.
  // This ensures prerendered EN pages point to EN discovery/contact paths.
  const baseForLocale = opts.locale === "en" ? `${SITE_URL}/en` : SITE_URL;
  html = html.replace(
    /"target": "https:\/\/www\.gestionvelora\.com\/blog\?query=\{search_term_string\}"/,
    `"target": "${baseForLocale}/blog?query={search_term_string}"`
  );
  html = html.replace(
    /"urlTemplate": "https:\/\/www\.gestionvelora\.com\/#contact-form"/,
    `"urlTemplate": "${baseForLocale}/#contact-form"`
  );
  html = html.replace(
    /"urlTemplate": "https:\/\/www\.gestionvelora\.com\/services"/,
    `"urlTemplate": "${baseForLocale}/services"`
  );

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
  const s = (t.services as Record<
    string,
    {
      title: string;
      description: string;
      metaTitle?: string;
      metaDescription?: string;
      subtitle?: string;
      offerings?: { title: string; items: string[]; detailItems?: string[] }[];
    }
  >)[slug];
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

/** FAQPage JSON-LD for the homepage FAQ block (canonical URL + #faq; must match visible copy). */
function buildHomepageFaqPageSchema(locale: "fr" | "en") {
  const canonical = locale === "fr" ? `${SITE_URL}/` : `${SITE_URL}/en/`;
  const items = getFaqItems(locale);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    url: canonical,
    inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: `${SITE_URL}/about`,
      sameAs: [...AUTHOR_SAME_AS],
      worksFor: { "@id": ORG_ID },
    },
    dateModified: HOMEPAGE_DATE_MODIFIED,
    citation: HOMEPAGE_CITATIONS.map((source) => ({
      "@type": "CreativeWork",
      name: source[locale],
      url: source.url,
    })),
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
      // /about is the actual bio page; the site root said nothing about the author.
      url: `${SITE_URL}/about`,
      jobTitle: "Founder, Gestion Velora",
      worksFor: { "@id": ORG_ID },
      ...(AUTHOR_SAME_AS.length ? { sameAs: AUTHOR_SAME_AS } : {}),
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

function localizePath(path: string, locale: "fr" | "en"): string {
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("mailto:")) {
    return path;
  }
  if (locale === "en" && path.startsWith("/") && !path.startsWith("/en/")) {
    return `/en${path}`;
  }
  return path;
}

function richToAmpHtml(para: RichParagraph, locale: "fr" | "en"): string {
  if (typeof para === "string") return escapeHtml(para);
  return para
    .map((seg) => {
      if (typeof seg === "string") return escapeHtml(seg);
      const href = localizePath(seg.to, locale);
      const external = href.startsWith("http://") || href.startsWith("https://");
      const rel = external ? ' rel="noopener noreferrer"' : "";
      return `<a href="${escapeHtml(href)}"${rel}>${escapeHtml(seg.text)}</a>`;
    })
    .join("");
}

function schemaToJsonLd(schema: object | object[] | null): string {
  if (!schema) return "";
  const schemas = Array.isArray(schema) ? schema : [schema];
  const pageSchema =
    schemas.length === 1
      ? schemas[0]
      : {
          "@context": "https://schema.org",
          "@graph": schemas.map((item) => {
            const { "@context": _ctx, ...rest } = item as Record<string, unknown>;
            return rest;
          }),
        };
  return JSON.stringify(pageSchema, null, 2).replace(/</g, "\\u003c");
}

function buildAmpBlogHtml(locale: "fr" | "en", slug: string): string {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return "";
  const loc = post[locale];
  const isEn = locale === "en";
  const lang = isEn ? "en-CA" : "fr-CA";
  const base = isEn ? `${SITE_URL}/en` : SITE_URL;
  const canonical = `${base}/blog/${slug}`;
  const ampPath = isEn ? `/en/amp/blog/${slug}` : `/amp/blog/${slug}`;
  const ampUrl = `${SITE_URL}${ampPath}`;
  const title = buildTitle(loc.metaTitle ?? loc.title);
  const schema = buildArticleSchema(locale, slug, base);
  const bc = getBreadcrumbLabels(locale);
  const schemaJson = schemaToJsonLd(
    schema
      ? [
          schema,
          buildBreadcrumbSchema([
            { name: bc.home, url: SITE_URL + "/" },
            { name: bc.insights, url: `${base}/blog` },
            { name: loc.title },
          ]),
        ]
      : null
  );
  const servicesIntro = isEn
    ? "Managing a building in Montreal? Our services:"
    : "Vous gérez un immeuble à Montréal ? Nos services :";
  const services = ["syndicat-copropriete", "airbnb", "location", "gestion-condo", "gestion-copropriete"]
    .map((serviceSlug) => {
      const svc = getService(locale, serviceSlug);
      return `<a href="${localizePath(`/services/${serviceSlug}`, locale)}">${escapeHtml(svc.title)}</a>`;
    })
    .join(" <span aria-hidden=\"true\">·</span> ");
  const sections = loc.sections
    .map((section, sectionIndex) => {
      const paras = section.paragraphs
        .map((p) => `      <p>${richToAmpHtml(p, locale)}</p>`)
        .join("\n");
      const contactBlock =
        sectionIndex === 1
          ? `\n      <aside class="callout">\n        <p>${escapeHtml(isEn ? enRaw.blog.contactQuestion : frRaw.blog.contactQuestion)}</p>\n        <a class="button" href="${isEn ? "/en/#contact-form" : "/#contact-form"}">${escapeHtml(
              isEn ? enRaw.blog.contactUs : frRaw.blog.contactUs
            )}</a>\n      </aside>`
          : "";
      return `    <section>\n      <h2>${escapeHtml(section.heading)}</h2>\n${paras}${contactBlock}\n    </section>`;
    })
    .join("\n");
  const related = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map((p) => {
      const r = p[locale];
      return `        <li><a href="${localizePath(`/blog/${p.slug}`, locale)}">${escapeHtml(r.title)}</a><span>${escapeHtml(r.date)}</span></li>`;
    })
    .join("\n");
  const relatedTitle = isEn ? enRaw.blog.relatedPostsTitle : frRaw.blog.relatedPostsTitle;
  const authorLabel = isEn ? "Written by" : "Écrit par";
  const authorRole = isEn ? "Founder, Gestion Velora" : "Fondateur, Gestion Velora";
  const authorBio = isEn
    ? "Property management professional specializing in condo boards, long-term rentals, and short-term rentals in Greater Montreal."
    : "Professionnel de la gestion immobilière spécialisé en syndicats de copropriété, location longue durée et Airbnb dans le Grand Montréal.";
  const ctaText = isEn ? enRaw.blog.planifyCall : frRaw.blog.planifyCall;

  return `<!doctype html>
<html amp lang="${lang}">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)}</title>
  <link rel="canonical" href="${canonical}">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta name="description" content="${escapeHtml(loc.excerpt)}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(loc.excerpt)}">
  <meta property="og:url" content="${ampUrl}">
  <meta property="og:image" content="${escapeHtml(post.image)}">
  <meta property="og:locale" content="${isEn ? "en_CA" : "fr_CA"}">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <style amp-custom>
    :root{color-scheme:light;--ink:#171412;--muted:#655f5a;--line:#e8e0d8;--paper:#fffaf5;--accent:#d33b6a}
    *{box-sizing:border-box}
    body{margin:0;background:var(--paper);color:var(--ink);font-family:Arial,Helvetica,sans-serif;line-height:1.68}
    a{color:var(--accent);text-decoration:none}
    a:hover{text-decoration:underline}
    .wrap{max-width:760px;margin:0 auto;padding:32px 20px 64px}
    .crumbs,.meta,.eyebrow{font-size:13px;color:var(--muted)}
    .crumbs{margin-bottom:28px}
    h1{font-size:42px;line-height:1.08;margin:14px 0 18px;letter-spacing:0}
    h2{font-size:26px;line-height:1.22;margin:46px 0 14px;letter-spacing:0}
    p{font-size:18px;margin:0 0 18px}
    .excerpt{font-size:22px;color:var(--muted)}
    .brief,.callout{border:1px solid var(--line);background:#fff;padding:20px;border-radius:8px;margin:24px 0}
    .brief p,.callout p{margin-bottom:0}
    .services{font-size:15px;margin:28px 0;color:var(--muted)}
    .hero{margin:34px 0 44px;border-radius:8px;overflow:hidden;background:#eee}
    .button{display:inline-block;margin-top:12px;background:var(--accent);color:white;padding:11px 16px;border-radius:999px;font-weight:700}
    .author,.related,.final{border-top:1px solid var(--line);margin-top:46px;padding-top:28px}
    .author strong{display:block}
    .related ul{padding-left:18px}
    .related li{margin:0 0 14px}
    .related span{display:block;color:var(--muted);font-size:13px}
    @media(max-width:560px){.wrap{padding:24px 18px 52px}h1{font-size:34px}.excerpt{font-size:20px}p{font-size:17px}}
  </style>
  ${schemaJson ? `<script type="application/ld+json">\n${schemaJson}\n  </script>` : ""}
</head>
<body>
  <article class="wrap">
    <nav class="crumbs"><a href="${isEn ? "/en/" : "/"}">${escapeHtml(bc.home)}</a> / <a href="${localizePath("/blog", locale)}">${escapeHtml(bc.insights)}</a></nav>
    <p class="meta">${escapeHtml(loc.category)} · ${escapeHtml(loc.date)}</p>
    <h1>${escapeHtml(loc.title)}</h1>
    <p class="excerpt">${escapeHtml(loc.excerpt)}</p>
    <aside class="brief">
      <p class="eyebrow">${escapeHtml(isEn ? enRaw.blog.briefLabel : frRaw.blog.briefLabel)}</p>
      <p>${escapeHtml(loc.brief)}</p>
    </aside>
    <p class="services">${escapeHtml(servicesIntro)} ${services}</p>
    <div class="hero">
      <amp-img src="${escapeHtml(post.image)}" width="1200" height="800" layout="responsive" alt="${escapeHtml(loc.title)}"></amp-img>
    </div>
${sections}
    <section class="author">
      <p class="eyebrow">${escapeHtml(authorLabel)}</p>
      <p><strong>${escapeHtml(AUTHOR_NAME)}</strong>${escapeHtml(authorRole)}</p>
      <p>${escapeHtml(authorBio)}</p>
      <p><a href="${isEn ? "/en/about" : "/about"}">${escapeHtml(isEn ? "View author profile" : "Voir le profil auteur")}</a></p>
    </section>
    <section class="related">
      <h2>${escapeHtml(relatedTitle)}</h2>
      <ul>
${related}
      </ul>
    </section>
    <section class="final">
      <p>${escapeHtml(isEn ? enRaw.blog.contactQuestion : frRaw.blog.contactQuestion)}</p>
      <a class="button" href="${isEn ? "/en/#contact-form" : "/#contact-form"}">${escapeHtml(ctaText)}</a>
    </section>
  </article>
</body>
</html>`;
}

function buildLocationMainHtml(
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

  const localLead =
    locale === "fr"
      ? city.localLeadFr
        ? `<p>${escapeHtml(city.localLeadFr)}</p>`
        : ""
      : city.localLeadEn
        ? `<p>${escapeHtml(city.localLeadEn)}</p>`
        : "";

  return `<main lang="${lang}">
  <h1>${escapeHtml(h1)}</h1>
  <p>${escapeHtml(desc)}</p>
${localLead}
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
</main>`;
}

function buildBlogMainHtml(locale: "fr" | "en", slug: string): string {
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

  // Visible byline: the AMP variant already carries one, but the standard prerender
  // shipped none, so an AI engine reading this page saw no named author behind
  // legal/financial guidance (YMYL). Mirrors the AMP author block.
  const isEn = locale === "en";
  const byLabel = isEn ? "Written by" : "Écrit par";
  const byRole = isEn ? "Founder, Gestion Velora" : "Fondateur, Gestion Velora";
  const profileHref = isEn ? "/en/about" : "/about";
  const profileLabel = isEn ? "View author profile" : "Voir le profil auteur";
  const byline = `  <p class="byline">${escapeHtml(byLabel)} <a rel="author" href="${profileHref}"><strong>${escapeHtml(AUTHOR_NAME)}</strong></a> — ${escapeHtml(byRole)}. <a href="${profileHref}">${escapeHtml(profileLabel)}</a></p>`;

  return `<main lang="${lang}">
  <h1>${escapeHtml(loc.title)}</h1>
${byline}
  <figure>
    <img src="${escapeHtml(absoluteSiteUrl(post.image))}" alt="${escapeHtml(loc.title)}" width="1200" height="900" loading="eager" />
  </figure>
  <p>${escapeHtml(loc.brief)}</p>
${sectionHtml}
</main>`;
}

function buildHomepageMainHtml(locale: "fr" | "en"): string {
  const lang = locale === "fr" ? "fr-CA" : "en-CA";
  const t = locale === "fr" ? frRaw : enRaw;
  const h1 =
    locale === "fr"
      ? "Gestion immobilière Montréal | Gestion Velora"
      : "Gestion Velora — Property Management Montreal (Condo, Rental, Airbnb)";
  const lead =
    locale === "fr"
      ? "Réponse directe : Gestion Velora est une firme de gestion immobilière qui prend en charge l’administration, le suivi financier, l’entretien et les communications pour les syndicats de copropriété, les propriétaires locatifs et les hôtes Airbnb du Grand Montréal."
      : "Direct answer: Gestion Velora is a property management firm handling administration, financial follow-up, maintenance, and communications for condo boards, residential landlords, and Airbnb hosts across Greater Montreal.";
  const svcTitle = locale === "fr"
    ? "Quels services de gestion immobilière offrons-nous à Montréal ?"
    : "Which property management services do we provide in Montreal?";
  const svcLis =
    locale === "fr"
      ? [
          "Syndicat de copropriété : administration, budget, fonds de prévoyance et parties communes.",
          "Location longue durée : locataires, baux, perception des loyers et suivi d'entretien.",
          "Location courte durée (Airbnb) : réservations, tarification, voyageurs et conformité municipale.",
        ]
      : [
          "Condo boards: administration, budgeting, reserve funds, and common elements.",
          "Long-term rentals: tenants, leases, rent collection, and maintenance follow-up.",
          "Short-term stays (Airbnb): bookings, pricing, guest operations, and municipal compliance.",
        ];
  const faqTitle = t.faq.title as string;
  const faqSub = t.faq.subtitle as string;
  const items = t.faqItems as { question: string; answer: string }[];
  const insightsTitle = locale === "fr" ? "Articles recents" : "Recent insights";
  const sourcesTitle = locale === "fr"
    ? "Quelles sources appuient nos informations ?"
    : "Which sources support our information?";
  const sourcesIntro = locale === "fr"
    ? "Nos repères réglementaires et de marché renvoient à des organismes publics; les résultats opérationnels affichés proviennent du tableau de bord interne de Gestion Velora."
    : "Our regulatory and market benchmarks point to public bodies; displayed operating results come from Gestion Velora’s internal dashboard.";
  const citationLis = HOMEPAGE_CITATIONS.map(
    (source) => `    <li><cite><a href="${source.url}" rel="noopener external">${escapeHtml(source[locale])}</a></cite></li>`,
  ).join("\n");
  const byline = locale === "fr"
    ? `Écrit et vérifié par <a rel="author" href="/about"><strong>${AUTHOR_NAME}</strong></a>, fondateur de Gestion Velora et membre du RGCQ. Mis à jour le <time datetime="${HOMEPAGE_DATE_MODIFIED}">30 août 2026</time>.`
    : `Written and reviewed by <a rel="author" href="/en/about"><strong>${AUTHOR_NAME}</strong></a>, founder of Gestion Velora and RGCQ member. Updated <time datetime="${HOMEPAGE_DATE_MODIFIED}">August 30, 2026</time>.`;
  const trustTitle = locale === "fr"
    ? "Comment vérifier notre expertise ou nous contacter ?"
    : "How can you verify our expertise or contact us?";
  const trustCopy = locale === "fr"
    ? `Consultez <a href="/about">le profil du fondateur</a>, <a href="/sources">nos sources et références</a>, <a href="/privacy">notre politique de confidentialité</a> et <a href="/terms">nos conditions d’utilisation</a>, ou <a href="/#contact-form">contactez l’équipe</a>.`
    : `Review <a href="/en/about">the founder profile</a>, <a href="/en/sources">our sources and references</a>, <a href="/en/privacy">our privacy policy</a>, and <a href="/en/terms">our terms of use</a>, or <a href="/en/#contact-form">contact the team</a>.`;
  const insightLinks = blogPosts
    .slice(0, 4)
    .map((post) => {
      const loc = post[locale];
      const href = locale === "fr" ? `/blog/${post.slug}` : `/en/blog/${post.slug}`;
      return `    <li><a href="${href}">${escapeHtml(loc.title)}</a> — ${escapeHtml(loc.excerpt)}</li>`;
    })
    .join("\n");
  const faqBlocks = items
    .map(
      (item) => `  <div>
    <h3>${escapeHtml(item.question)}</h3>
    <p>${escapeHtml(item.answer)}</p>
  </div>`
    )
    .join("\n");
  const svcUl = svcLis.map((line) => `    <li>${escapeHtml(line)}</li>`).join("\n");
  return `<main lang="${lang}">
  <h1>${escapeHtml(h1)}</h1>
  <p class="byline">${byline}</p>
  <p>${escapeHtml(lead)}</p>
  <h2>${escapeHtml(svcTitle)}</h2>
  <ul>
${svcUl}
  </ul>
  <section id="articles-recents">
  <h2>${escapeHtml(insightsTitle)}</h2>
  <ul>
${insightLinks}
  </ul>
  </section>
  <section id="sources-page-accueil">
  <h2>${escapeHtml(sourcesTitle)}</h2>
  <p>${escapeHtml(sourcesIntro)}</p>
  <ul>
${citationLis}
  </ul>
  </section>
  <section id="faq">
  <h2>${escapeHtml(faqTitle)}</h2>
  <p>${escapeHtml(faqSub)}</p>
${faqBlocks}
  </section>
  <section id="confiance-et-contact">
  <h2>${escapeHtml(trustTitle)}</h2>
  <p>${trustCopy}</p>
  </section>
</main>`;
}

function buildServicesHubMainHtml(locale: "fr" | "en"): string {
  const lang = locale === "fr" ? "fr-CA" : "en-CA";
  const serviceSlugs = ["syndicat-copropriete", "airbnb", "location", "gestion-condo", "gestion-copropriete"];
  const serviceLinks = serviceSlugs
    .map((slug) => {
      const svc = getService(locale, slug);
      const href = locale === "fr" ? `/services/${slug}` : `/en/services/${slug}`;
      return `    <li><a href="${href}">${escapeHtml(svc.title)}</a> — ${escapeHtml(svc.description)}</li>`;
    })
    .join("\n");
  if (locale === "fr") {
    return `<main lang="${lang}">
  <h1>Services de gestion immobilière à Montréal</h1>
  <p>Gestion Velora propose des services structurés pour les syndicats de copropriété, les propriétaires locatifs, les hôtes Airbnb et les immeubles qui nécessitent une gouvernance plus serrée. Chaque mandat combine coordination terrain, suivi administratif, reporting financier et communication transparente avec les parties prenantes.</p>
  <p>Notre objectif est de réduire les urgences non planifiées, clarifier les responsabilités et donner aux propriétaires une vue mensuelle sur les décisions, les risques et les coûts. Les services peuvent être utilisés séparément ou combinés selon le portefeuille immobilier.</p>
  <h2>Nos services specialises</h2>
  <ul>
${serviceLinks}
  </ul>
  <h2>Ce que chaque mandat inclut</h2>
  <p>Les mandats Gestion Velora couvrent la priorisation des demandes, la coordination fournisseurs, les communications clés, la surveillance des échéances et la production de rapports clairs. Pour les copropriétés, l'accent porte sur la gouvernance et la conformité. Pour les locations, l'accent porte sur l'occupation, les revenus et l'expérience résident.</p>
  <h2>Outil gratuit pour investisseurs</h2>
  <p>Avant de confier la gestion, évaluez l'immeuble : le <a href="${CALCULATOR_PATHS.fr}">calculateur de rendement pour plex et multilogement</a> applique les règles du Québec : droits de mutation de Montréal, mise de fonds SCHL, plafond du TAL et valeur économique bancaire. Gratuit, sans inscription.</p>
</main>`;
  }
  return `<main lang="${lang}">
  <h1>Property management services in Montreal</h1>
  <p>Gestion Velora provides structured property management services for condo boards, residential landlords, Airbnb hosts, and buildings that need tighter operating governance. Each mandate combines field coordination, administrative follow-up, financial reporting, and clear stakeholder communication.</p>
  <p>The goal is to reduce unplanned emergencies, clarify ownership of tasks, and give property owners a monthly view of decisions, risks, and costs. Services can be used separately or combined across a broader portfolio.</p>
  <h2>Our service lines</h2>
  <ul>
${serviceLinks}
  </ul>
  <h2>What each mandate includes</h2>
  <p>Gestion Velora mandates cover request triage, vendor coordination, key communications, deadline monitoring, and clear reporting. For condo boards, the emphasis is governance and compliance. For rentals, the emphasis is occupancy, revenue continuity, and resident experience.</p>
  <h2>Free tool for investors</h2>
  <p>Before handing over management, underwrite the building: the <a href="${CALCULATOR_PATHS.en}">plex and multifamily investment calculator</a> applies Quebec's rules: Montreal welcome tax, CMHC down payment caps, the TAL rent ceiling and the bank's economic value. Free, no sign-up.</p>
</main>`;
}

function buildBlogIndexMainHtml(locale: "fr" | "en"): string {
  const lang = locale === "fr" ? "fr-CA" : "en-CA";
  const topPosts = blogPosts.slice(0, 6);
  if (locale === "fr") {
    const links = topPosts
      .map((post) => `    <li><a href="/blog/${post.slug}">${escapeHtml(post.fr.title)}</a></li>`)
      .join("\n");
    return `<main lang="${lang}">
  <h1>Blog – Gestion immobilière Montréal</h1>
  <p>Actualités, conseils pratiques et analyses sur la gestion immobilière à Montréal : copropriétés, Airbnb, locations, réglementation et rentabilité.</p>
  <h2>Articles recents</h2>
  <ul>
${links}
  </ul>
</main>`;
  }
  const links = topPosts
    .map((post) => `    <li><a href="/en/blog/${post.slug}">${escapeHtml(post.en.title)}</a></li>`)
    .join("\n");
  return `<main lang="${lang}">
  <h1>Montreal property management blog</h1>
  <p>Advice and updates on condo management, long-term rentals, preventive maintenance, and Airbnb regulation in Montreal.</p>
  <h2>Recent articles</h2>
  <ul>
${links}
  </ul>
</main>`;
}

function buildComparisonMainHtml(locale: "fr" | "en", page: (typeof COMPARISON_PAGES)[0]): string {
  const lang = locale === "fr" ? "fr-CA" : "en-CA";
  const h1 = locale === "fr" ? page.h1Fr : page.h1En;
  const hero = locale === "fr" ? page.heroFr : page.heroEn;
  const desc = locale === "fr" ? page.descriptionFr : page.descriptionEn;
  const primaryColumn = locale === "fr" ? page.primaryColumnFr : page.primaryColumnEn;
  const alternativeColumn = locale === "fr" ? page.alternativeColumnFr : page.alternativeColumnEn;
  const bestFor = locale === "fr" ? page.bestForFr : page.bestForEn;
  const notBestFor = locale === "fr" ? page.notBestForFr : page.notBestForEn;
  const whereAlternativeWins = locale === "fr" ? page.whereAlternativeWinsFr : page.whereAlternativeWinsEn;
  const bestForHtml = bestFor.map((pt) => `    <li>${escapeHtml(pt)}</li>`).join("\n");
  const notBestForHtml = notBestFor.map((pt) => `    <li>${escapeHtml(pt)}</li>`).join("\n");
  const alternativeWinsHtml = whereAlternativeWins.map((pt) => `    <li>${escapeHtml(pt)}</li>`).join("\n");
  const sectionsHtml = page.sections
    .slice(0, 3)
    .map((s) => {
      const h = locale === "fr" ? s.headingFr : s.headingEn;
      const b = locale === "fr" ? s.bodyFr : s.bodyEn;
      const points = locale === "fr" ? s.pointsFr : s.pointsEn;
      const lis = points.slice(0, 5).map((pt) => `    <li>${escapeHtml(pt)}</li>`).join("\n");
      return `  <h2>${escapeHtml(h)}</h2>\n  <p>${escapeHtml(b)}</p>\n  <ul>\n${lis}\n  </ul>`;
    })
    .join("\n");
  const featureRowsHtml = page.featureRows
    .map((row) => {
      const label = locale === "fr" ? row.labelFr : row.labelEn;
      const velora = locale === "fr" ? row.veloraFr : row.veloraEn;
      const alternative = locale === "fr" ? row.alternativeFr : row.alternativeEn;
      return `      <tr>
        <th>${escapeHtml(label)}</th>
        <td>${row.veloraPositive ? "✅" : "❌"} ${escapeHtml(velora)}</td>
        <td>${row.alternativePositive ? "✅" : "❌"} ${escapeHtml(alternative)}</td>
      </tr>`;
    })
    .join("\n");
  const pricingRowsHtml = page.pricingRows
    .map((row) => {
      const item = locale === "fr" ? row.itemFr : row.itemEn;
      const velora = locale === "fr" ? row.veloraFr : row.veloraEn;
      const alternative = locale === "fr" ? row.alternativeFr : row.alternativeEn;
      const note = locale === "fr" ? row.noteFr : row.noteEn;
      return `  <h3>${escapeHtml(item)}</h3>
  <p><strong>${escapeHtml(primaryColumn)}:</strong> ${escapeHtml(velora)}</p>
  <p><strong>${escapeHtml(alternativeColumn)}:</strong> ${escapeHtml(alternative)}</p>
  <p>${escapeHtml(note)}</p>`;
    })
    .join("\n");
  const storyTitle = locale === "fr" ? page.switchingStory.titleFr : page.switchingStory.titleEn;
  const storyContext = locale === "fr" ? page.switchingStory.contextFr : page.switchingStory.contextEn;
  const storyActions = locale === "fr" ? page.switchingStory.actionsFr : page.switchingStory.actionsEn;
  const storyOutcome = locale === "fr" ? page.switchingStory.outcomeFr : page.switchingStory.outcomeEn;
  const storyDisclosure = locale === "fr" ? page.switchingStory.disclosureFr : page.switchingStory.disclosureEn;
  const storyActionsHtml = storyActions.map((pt) => `    <li>${escapeHtml(pt)}</li>`).join("\n");
  const alternativesHtml = page.alternatives
    ? `<h2>${locale === "fr" ? "Alternatives en gestion immobilière à Montréal" : "Montreal property management alternatives"}</h2>
  <ol>
${page.alternatives
  .map((alt) => {
    const best = locale === "fr" ? alt.bestForFr : alt.bestForEn;
    const notBest = locale === "fr" ? alt.notBestForFr : alt.notBestForEn;
    const strengths = locale === "fr" ? alt.strengthsFr : alt.strengthsEn;
    const cautions = locale === "fr" ? alt.cautionsFr : alt.cautionsEn;
    return `    <li>
      <h3>${escapeHtml(alt.name)}</h3>
      <p><strong>${locale === "fr" ? "Meilleur pour" : "Best for"}:</strong> ${escapeHtml(best)}</p>
      <p><strong>${locale === "fr" ? "Moins adapté pour" : "Not best for"}:</strong> ${escapeHtml(notBest)}</p>
      <p><strong>${locale === "fr" ? "Forces" : "Strengths"}:</strong> ${strengths.map(escapeHtml).join("; ")}</p>
      <p><strong>${locale === "fr" ? "À vérifier" : "Check first"}:</strong> ${cautions.map(escapeHtml).join("; ")}</p>
    </li>`;
  })
  .join("\n")}
  </ol>`
    : "";
  const faqsHtml = page.faqs
    .map((faq) => {
      const q = locale === "fr" ? faq.questionFr : faq.questionEn;
      const a = locale === "fr" ? faq.answerFr : faq.answerEn;
      return `  <h3>${escapeHtml(q)}</h3>\n  <p>${escapeHtml(a)}</p>`;
    })
    .join("\n");
  const linksHtml = page.internalLinks
    .map((link) => {
      const href = locale === "fr" ? link.to : `/en${link.to === "/" ? "" : link.to}`;
      const label = locale === "fr" ? link.labelFr : link.labelEn;
      return `    <li><a href="${href}">${escapeHtml(label)}</a></li>`;
    })
    .join("\n");
  return `<main lang="${lang}">
  <h1>${escapeHtml(h1)}</h1>
  <p>${escapeHtml(hero)}</p>
  <p>${escapeHtml(desc)}</p>
  <h2>${locale === "fr" ? "Meilleur pour" : "Best for"}</h2>
  <ul>
${bestForHtml}
  </ul>
  <h2>${locale === "fr" ? "Moins adapté pour" : "Not best for"}</h2>
  <ul>
${notBestForHtml}
  </ul>
  <h2>${locale === "fr" ? "Là où l'autre option gagne" : "Where the other option wins"}</h2>
  <ul>
${alternativeWinsHtml}
  </ul>
${sectionsHtml}
  <h2>${locale === "fr" ? "Tableau comparatif des fonctionnalités" : "Feature comparison table"}</h2>
  <table>
    <thead>
      <tr><th>${locale === "fr" ? "Critère" : "Decision factor"}</th><th>${escapeHtml(primaryColumn)}</th><th>${escapeHtml(alternativeColumn)}</th></tr>
    </thead>
    <tbody>
${featureRowsHtml}
    </tbody>
  </table>
  <h2>${locale === "fr" ? "Comparaison des prix" : "Pricing comparison"}</h2>
${pricingRowsHtml}
${alternativesHtml}
  <h2>${locale === "fr" ? "Histoire de bascule" : "Switching story"}</h2>
  <h3>${escapeHtml(storyTitle)}</h3>
  <p>${escapeHtml(storyContext)}</p>
  <ul>
${storyActionsHtml}
  </ul>
  <p>${escapeHtml(storyOutcome)}</p>
  <p>${escapeHtml(storyDisclosure)}</p>
  <h2>FAQ</h2>
${faqsHtml}
  <h2>${locale === "fr" ? "Pages internes utiles" : "Helpful internal links"}</h2>
  <ul>
${linksHtml}
  </ul>
</main>`;
}

function buildCompareIndexMainHtml(locale: "fr" | "en"): string {
  const lang = locale === "fr" ? "fr-CA" : "en-CA";
  const links = COMPARISON_PAGES.map((page) => {
    const href = locale === "fr" ? `/compare/${page.slug}` : `/en/compare/${page.slug}`;
    const title = locale === "fr" ? page.h1Fr : page.h1En;
    const desc = locale === "fr" ? page.descriptionFr : page.descriptionEn;
    return `    <li><a href="${href}">${escapeHtml(title)}</a> — ${escapeHtml(desc)}</li>`;
  }).join("\n");
  if (locale === "fr") {
    return `<main lang="${lang}">
  <h1>Guides comparatifs en gestion immobilière</h1>
  <p>Ces guides aident les copropriétaires, conseils d'administration et propriétaires locatifs à choisir entre plusieurs modes de gestion. Chaque comparaison présente les coûts, les risques, la charge opérationnelle, la qualité de service et les situations où une solution devient plus pertinente qu'une autre.</p>
  <p>Inclut maintenant une page alternatives en gestion immobilière à Montréal avec Gestion Velora et quatre concurrents réels décrits honnêtement.</p>
  <h2>Comparatifs disponibles</h2>
  <ul>
${links}
  </ul>
</main>`;
  }
  return `<main lang="${lang}">
  <h1>Property management comparison guides</h1>
  <p>These guides help condo owners, boards, and landlords compare different management models. Each comparison explains cost, risk, operating workload, service quality, and the situations where one option becomes more relevant than another.</p>
  <p>Includes a Montreal property management alternatives page with Gestion Velora and four real competitors described fairly.</p>
  <h2>Available comparisons</h2>
  <ul>
${links}
  </ul>
</main>`;
}

function buildServiceDetailMainHtml(locale: "fr" | "en", slug: string): string {
  const svc = getService(locale, slug);
  const lang = locale === "fr" ? "fr-CA" : "en-CA";
  const offeringHtml = (svc.offerings ?? [])
    .slice(0, 4)
    .map((offering) => {
      const items = [...(offering.detailItems ?? []), ...(offering.items ?? [])].slice(0, 6);
      const lis = items.map((item) => `    <li>${escapeHtml(item)}</li>`).join("\n");
      return `  <h2>${escapeHtml(offering.title)}</h2>\n  <ul>\n${lis}\n  </ul>`;
    })
    .join("\n");
  const serviceLinks =
    locale === "fr"
      ? `<p>Pour comparer ce mandat avec les autres options, consultez aussi <a href="/services">tous les services</a>, <a href="/tarifs">les tarifs</a> et <a href="/blog">les articles de gestion immobilière</a>.</p>`
      : `<p>To compare this mandate with other options, see <a href="/en/services">all services</a>, <a href="/en/tarifs">pricing</a>, and <a href="/en/blog">property management articles</a>.</p>`;
  const h1 = svc.subtitle || svc.title;
  return `<main lang="${lang}">
  <h1>${escapeHtml(h1)}</h1>
  ${svc.subtitle && svc.subtitle !== svc.title ? `<p>${escapeHtml(svc.title)}</p>` : ""}
  <p>${escapeHtml(svc.description)}</p>
${offeringHtml}
${serviceLinks}
</main>`;
}

function buildLocationsIndexMainHtml(locale: "fr" | "en"): string {
  const lang = locale === "fr" ? "fr-CA" : "en-CA";
  const priority = LOCATION_SERVICES.flatMap((service) =>
    CITIES.map((city) => ({ service, city, slug: `${service.slug}-${city.slug}` }))
  ).filter((entry) => isPriorityLocationSlug(entry.slug));
  // Every priority slug gets a link. The copy below promises this hub leaves no
  // isolated pages, so a fixed cap here would silently orphan whatever sits
  // past it whenever PRIORITY_LOCATION_ROUTE_LIMIT grows.
  const links = priority.map(({ service, city, slug }) => {
    const href = locale === "fr" ? `/location/${slug}` : `/en/location/${slug}`;
    const label = locale === "fr"
      ? `${service.nameFr} à ${city.nameFr}`
      : `${service.nameEn} in ${city.nameEn}`;
    return `    <li><a href="${href}">${escapeHtml(label)}</a></li>`;
  }).join("\n");
  if (locale === "fr") {
    return `<main lang="${lang}">
  <h1>Gestion immobilière par ville dans le Grand Montréal</h1>
  <p>Gestion Velora dessert les copropriétés, propriétaires locatifs et hôtes Airbnb dans les principaux secteurs du Grand Montréal. Les pages locales regroupent les services prioritaires par ville afin de clarifier le type de mandat offert et les enjeux opérationnels propres au secteur.</p>
  <p>Chaque page locale relie une ville à un besoin concret : administration de syndicat, gestion locative, gestion Airbnb, conformité Loi 16 ou gestion commerciale. Les pages les plus importantes sont indexées dans le sitemap et reliées depuis ce hub pour éviter les pages isolées.</p>
  <h2>Pages locales prioritaires</h2>
  <ul>
${links}
  </ul>
</main>`;
  }
  return `<main lang="${lang}">
  <h1>Property management by city in Greater Montreal</h1>
  <p>Gestion Velora serves condo boards, landlords, and Airbnb hosts across key Greater Montreal areas. Local pages connect each city with the most relevant service mandate and explain the operating context for that area.</p>
  <p>Each local page links a city to a concrete need: condo board administration, rental management, Airbnb operations, Bill 16 compliance, or commercial property management. Priority pages are included in the sitemap and linked from this hub to avoid isolated URLs.</p>
  <h2>Priority local pages</h2>
  <ul>
${links}
  </ul>
</main>`;
}

function buildPrivacyMainHtml(locale: "fr" | "en"): string {
  const lang = locale === "fr" ? "fr-CA" : "en-CA";
  if (locale === "fr") {
    return `<main lang="${lang}">
  <h1>Politique de confidentialité</h1>
  <p>Gestion Velora recueille uniquement les renseignements nécessaires pour répondre aux demandes de gestion immobilière, préparer une soumission, planifier un appel ou assurer le suivi d'une relation client. Les renseignements peuvent inclure le nom, l'adresse courriel, le numéro de téléphone, le type d'immeuble, la ville et les détails fournis volontairement dans un formulaire.</p>
  <p>Les données ne sont pas vendues. Elles sont utilisées pour communiquer avec la personne qui a fait la demande, évaluer le mandat potentiel, améliorer les opérations internes et respecter les obligations applicables. Les outils techniques du site peuvent aussi générer des données d'analyse agrégées pour comprendre la performance des pages.</p>
  <h2>Vos choix</h2>
  <p>Vous pouvez demander l'accès, la correction ou la suppression de vos renseignements en communiquant avec Gestion Velora. Les demandes sont traitées selon le contexte opérationnel et les obligations de conservation applicables.</p>
</main>`;
  }
  return `<main lang="${lang}">
  <h1>Privacy policy</h1>
  <p>Gestion Velora collects only the information needed to respond to property management inquiries, prepare a quote, schedule a call, or maintain a client relationship. Information may include name, email address, phone number, property type, city, and details voluntarily provided through a form.</p>
  <p>Data is not sold. It is used to communicate with the person who submitted the request, evaluate a potential mandate, improve internal operations, and comply with applicable obligations. Technical tools on the site may also generate aggregated analytics data to understand page performance.</p>
  <h2>Your choices</h2>
  <p>You may request access, correction, or deletion of your information by contacting Gestion Velora. Requests are handled according to the operating context and applicable retention requirements.</p>
</main>`;
}

function buildTermsMainHtml(locale: "fr" | "en"): string {
  const lang = locale === "fr" ? "fr-CA" : "en-CA";
  if (locale === "fr") {
    return `<main lang="${lang}">
  <h1>Conditions d’utilisation</h1>
  <p>Dernière mise à jour : <time datetime="${HOMEPAGE_DATE_MODIFIED}">30 août 2026</time>.</p>
  <p>Ces conditions encadrent l’utilisation du site de Gestion Velora. Les services de gestion immobilière font l’objet d’une proposition et d’un contrat distincts.</p>
  <h2>Utilisation du site</h2>
  <p>Le site peut être consulté à des fins d’information et pour communiquer avec Gestion Velora. Toute utilisation frauduleuse, abusive ou perturbant son fonctionnement est interdite.</p>
  <h2>Information générale</h2>
  <p>Le contenu ne remplace pas un avis juridique, comptable, fiscal ou technique adapté à une situation particulière. Les décisions immobilières doivent être validées auprès des sources officielles et de professionnels qualifiés.</p>
  <h2>Propriété intellectuelle et liens externes</h2>
  <p>Les textes, visuels et marques appartiennent à Gestion Velora ou sont utilisés avec autorisation. Les organismes externes liés depuis le site contrôlent leurs propres contenus et politiques.</p>
  <h2>Contact</h2>
  <p>Pour toute question, écrivez à <a href="mailto:info@gestionvelora.com">info@gestionvelora.com</a>.</p>
</main>`;
  }
  return `<main lang="${lang}">
  <h1>Terms of use</h1>
  <p>Last updated: <time datetime="${HOMEPAGE_DATE_MODIFIED}">August 30, 2026</time>.</p>
  <p>These terms govern use of the Gestion Velora website. Property management services are covered by a separate proposal and written agreement.</p>
  <h2>Website use</h2>
  <p>The website may be used for information and to contact Gestion Velora. Fraudulent, abusive, or disruptive use is prohibited.</p>
  <h2>General information</h2>
  <p>The content is not a substitute for legal, accounting, tax, or technical advice tailored to a particular situation. Property decisions should be validated against official sources and with qualified professionals.</p>
  <h2>Intellectual property and external links</h2>
  <p>Text, visuals, and marks belong to Gestion Velora or are used with permission. External organizations linked from the website control their own content and policies.</p>
  <h2>Contact</h2>
  <p>For questions, email <a href="mailto:info@gestionvelora.com">info@gestionvelora.com</a>.</p>
</main>`;
}

function buildTarifsMainHtml(locale: "fr" | "en"): string {
  const lang = locale === "fr" ? "fr-CA" : "en-CA";
  if (locale === "fr") {
    return `<main lang="${lang}">
  <h1>Tarifs de gestion immobilière à Montréal</h1>
  <p>Tarifs transparents pour la gestion de syndicat de copropriété, la gestion locative et Airbnb à Montréal. Syndicat : en général 33 $ à 36 $ / unité / mois, jusqu'à 40 $ avec intégrations applicatives. Location : honoraires sur la base d'un mois de loyer. Sans frais cachés.</p>
  <h2>Ce qui influence le tarif syndicat</h2>
  <ul>
    <li>Nombre d'unités et ampleur des parties communes.</li>
    <li>Portail copropriétaires, intégrations comptables ou outils d'analyse.</li>
    <li>Profondeur du mandat (AGA, fonds de prévoyance, projets majeurs).</li>
  </ul>
  <h2>Location longue durée</h2>
  <p>Honoraires structurés autour d'un mois de loyer, selon portefeuille et services inclus.</p>
  <h2>Airbnb et courte durée</h2>
  <p>Forfait ou pourcentage des revenus bruts selon la charge opérationnelle et le calendrier de réservations.</p>
</main>`;
  }
  return `<main lang="${lang}">
  <h1>Property management fees in Montreal</h1>
  <p>Transparent pricing for condo board, rental, and Airbnb management in Montreal. Condo boards: typically $33–$36/unit/month, up to $40 with app integrations. Rentals: fee structured as one month's rent. No hidden fees.</p>
  <h2>What drives condo board pricing</h2>
  <ul>
    <li>Unit count and scope of common elements.</li>
    <li>Owner portal, accounting integrations, or reporting depth.</li>
    <li>Mandate breadth (AGMs, reserve studies, major projects).</li>
  </ul>
  <h2>Long-term rentals</h2>
  <p>Fees anchored to one month's rent depending on portfolio size and included services.</p>
  <h2>Airbnb and short-term</h2>
  <p>Flat fee or gross-revenue share based on operational load and booking calendar.</p>
</main>`;
}

function trustBlocksToPrerenderHtml(blocks: TrustBlock[], maxBlocks: number): string {
  const parts: string[] = [];
  let n = 0;
  for (const b of blocks) {
    if (n >= maxBlocks) break;
    if (b.kind === "p") {
      parts.push(`  <p>${escapeHtml(b.text.slice(0, 700))}</p>`);
      n++;
    } else if (b.kind === "ul") {
      const lis = b.items
        .slice(0, 8)
        .map((item) => `    <li>${escapeHtml(item.slice(0, 320))}</li>`)
        .join("\n");
      parts.push(`  <ul>\n${lis}\n  </ul>`);
      n++;
    } else if (b.kind === "linkList") {
      const lis = b.items
        .slice(0, 10)
        .map((it) => {
          const suf = it.suffix ? escapeHtml(it.suffix) : "";
          return `    <li><a href="${escapeHtml(it.href)}">${escapeHtml(it.label)}</a>${suf}</li>`;
        })
        .join("\n");
      parts.push(`  <ul>\n${lis}\n  </ul>`);
      n++;
    }
  }
  return parts.join("\n");
}

function buildTrustDocumentMainHtml(locale: "fr" | "en", id: TrustPageId): string {
  const page = getTrustPageLocale(id, locale);
  const lang = locale === "fr" ? "fr-CA" : "en-CA";
  const sectionHtml = page.sections
    .slice(0, 4)
    .map((sec) => {
      const inner = trustBlocksToPrerenderHtml(sec.blocks, 2);
      return `  <h2>${escapeHtml(sec.heading)}</h2>\n${inner}`;
    })
    .join("\n");
  return `<main lang="${lang}">
  <h1>${escapeHtml(page.title)}</h1>
  <p>${escapeHtml(page.metaDescription)}</p>
${sectionHtml}
</main>`;
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
    "conformite-loi-16":
      locale === "fr"
        ? [
            {
              q: `Que comprend la mise en conformité Loi 16 à ${cityName} ?`,
              a: `La conformité Loi 16 pour les syndicats de copropriété à ${cityName} comprend le carnet d'entretien de l'immeuble, l'étude du fonds de prévoyance, le registre de copropriété et l'attestation lors de vente d'unité. Gestion Velora structure ces obligations pour chaque syndicat afin de respecter les échéances réglementaires prévues jusqu'en 2027.`,
            },
            {
              q: `Quand les syndicats de ${cityName} doivent-ils être conformes à la Loi 16 ?`,
              a: `La Loi 16 est entrée en vigueur le 14 août 2025 avec des délais de transition de 1 à 3 ans selon les obligations. Les syndicats à ${cityName} doivent être pleinement conformes d'ici 2027 au plus tard. Gestion Velora planifie le calendrier de conformité de chaque mandat dès la signature.`,
            },
            {
              q: `Que se passe-t-il si un syndicat à ${cityName} n'est pas conforme à la Loi 16 ?`,
              a: `Le non-respect de la Loi 16 expose les administrateurs de syndicat à des poursuites civiles et peut bloquer les transactions immobilières dans l'immeuble. À ${cityName}, Gestion Velora accompagne les syndicats en retard de conformité pour régulariser leur situation et éviter toute exposition légale.`,
            },
          ]
        : [
            {
              q: `What does Bill 16 compliance in ${cityName} include?`,
              a: `Bill 16 compliance for condo boards in ${cityName} covers the building maintenance logbook, reserve fund study, condo register, and unit sale attestation. Gestion Velora structures these obligations for each mandate to meet all regulatory deadlines through 2027.`,
            },
            {
              q: `When must condo boards in ${cityName} be fully compliant with Bill 16?`,
              a: `Bill 16 came into force on August 14, 2025, with transition periods of 1 to 3 years depending on the obligation. Condo boards in ${cityName} must be fully compliant by 2027 at the latest. Gestion Velora builds a compliance calendar into every mandate from signing.`,
            },
            {
              q: `What happens if a condo board in ${cityName} is not compliant with Bill 16?`,
              a: `Non-compliance with Bill 16 exposes condo board administrators to civil liability and can block real estate transactions in the building. In ${cityName}, Gestion Velora helps boards in a compliance backlog to regularize their situation quickly and avoid legal exposure.`,
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
      if (isRetiredLocationSlug(slug)) continue;
      const isPriorityLocation = isPriorityLocationSlug(slug);
      const frPath = `/location/${slug}`;
      const enPath = `/en/location/${slug}`;
      const svcImage =
        LOCATION_LANDING_OG_IMAGES[svc.slug] ??
        SERVICE_IMAGES[svc.serviceSlug] ??
        DEFAULT_OG_IMAGE;
      const frBc = getBreadcrumbLabels("fr");
      const enBc = getBreadcrumbLabels("en");

      out.push({
        path: frPath,
        locale: "fr",
        frPath,
        enPath,
        title: buildTitle(fillLoc(svc.titleTmplFr, city, "fr")),
        description: fillLoc(svc.metaDescFr ?? svc.descFr, city, "fr"),
        ogImage: svcImage,
        twitterImage: svcImage,
        robots: isPriorityLocation ? undefined : "noindex, follow",
        includeInSitemap: isPriorityLocation,
        prerenderMainInner: buildLocationMainHtml("fr", svc, city),
        pageSchemas: isPriorityLocation
          ? [
              buildLocationServiceSchema("fr", svc, city, SITE_URL),
              buildBreadcrumbSchema([
                { name: frBc.home, url: `${SITE_URL}/` },
                { name: frBc.services, url: `${SITE_URL}/services` },
                { name: fillLoc(svc.h1Fr, city, "fr") },
              ]),
              buildLocationFaqSchema("fr", svc, city),
            ]
          : null,
      });
      out.push({
        path: enPath,
        locale: "en",
        frPath,
        enPath,
        title: buildTitle(fillLoc(svc.titleTmplEn, city, "en")),
        description: fillLoc(svc.metaDescEn ?? svc.descEn, city, "en"),
        ogImage: svcImage,
        twitterImage: svcImage,
        robots: isPriorityLocation ? undefined : "noindex, follow",
        includeInSitemap: isPriorityLocation,
        prerenderMainInner: buildLocationMainHtml("en", svc, city),
        pageSchemas: isPriorityLocation
          ? [
              buildLocationServiceSchema("en", svc, city, `${SITE_URL}/en`),
              buildBreadcrumbSchema([
                { name: enBc.home, url: `${SITE_URL}/` },
                { name: enBc.services, url: `${SITE_URL}/en/services` },
                { name: fillLoc(svc.h1En, city, "en") },
              ]),
              buildLocationFaqSchema("en", svc, city),
            ]
          : null,
      });
    }
  }
  return out;
}


// ---------------------------------------------------------------------------
// Route definitions
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Plex calculator & buyer guide
// ---------------------------------------------------------------------------

function buildPlexCalculatorMainHtml(loc: "fr" | "en"): string {
  const p = CALCULATOR_PAGE[loc];
  const sections = p.sections
    .map(
      (s) =>
        `<section><h2 id="${s.id}">${escapeHtml(s.heading)}</h2>${s.body
          .map((b) => `<p>${escapeHtml(b)}</p>`)
          .join("")}</section>`,
    )
    .join("");
  const faq = p.faq
    .map((f) => `<div><h3 id="${f.id}">${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p></div>`)
    .join("");
  const figures = REFERENCE_FIGURES.map(
    (f) =>
      `<li><strong>${escapeHtml(f.label[loc])}:</strong> ${escapeHtml(f.value[loc])}, <a href="${f.sourceUrl}" rel="noopener">${escapeHtml(f.source)}</a></li>`,
  ).join("");
  const guideHref = REFERENCE_PATHS[loc];

  return [
    `<h1>${escapeHtml(p.title)}</h1>`,
    `<p>${escapeHtml(p.intro)}</p>`,
    `<p>${escapeHtml(p.summary)}</p>`,
    // Mirrors the client-side heading so the prerendered outline does not jump
    // h1 → h3 either.
    `<h2 id="outil">${loc === "fr" ? "L'outil de calcul" : "The calculator"}</h2>`,
    sections,
    `<section><h2 id="faq">${loc === "fr" ? "Questions fréquentes" : "Frequently asked questions"}</h2>${faq}</section>`,
    `<section><h2 id="sources">${loc === "fr" ? "Chiffres de référence" : "Reference figures"}</h2><ul>${figures}</ul></section>`,
    `<p><a href="${guideHref}">${loc === "fr" ? "Guide de l'acheteur de plex à Montréal" : "Montreal plex buyer's guide"}</a></p>`,
  ].join("");
}

function buildPlexRadarMainHtml(loc: "fr" | "en"): string {
  const en = loc === "en";
  const title = en
    ? "Montreal income properties for sale, analyzed daily"
    : "Immeubles à revenus à vendre à Montréal, analysés chaque jour";
  const intro = en
    ? "Plex Radar reviews newly published duplexes, triplexes, fourplexes and fiveplexes using reported income, Quebec financing, explicit operating-expense assumptions and data quality."
    : "Plex Radar analyse les duplex, triplex, quadruplex et quintuplex récemment publiés selon les revenus rapportés, le financement québécois, des hypothèses de dépenses explicites et la qualité des données.";
  const method = en
    ? "Each listing separates reported facts from estimates. Visitors can remove estimated insurance, repairs, management, replacement reserves, snow, exterior care or owner-paid utilities to test a scenario without changing the published baseline."
    : "Chaque fiche distingue les faits rapportés des estimations. On peut retirer l’assurance, les réparations, la gestion, la réserve de remplacement, le déneigement, l’entretien extérieur ou les services publics estimés pour tester un scénario sans modifier le résultat publié.";
  const defs = RADAR_METRIC_DEFS[loc];
  const metricsDl = (Object.keys(defs) as Array<keyof typeof defs>)
    .map((key) => `<dt>${escapeHtml(defs[key].term)}</dt><dd>${escapeHtml(defs[key].def)}</dd>`)
    .join("");
  const faq = RADAR_FAQ[loc]
    .map((f) => `<div><h3 id="${f.id}">${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p></div>`)
    .join("");
  const calcHref = CALCULATOR_PATHS[loc];
  const guideHref = REFERENCE_PATHS[loc];
  return `<main lang="${en ? "en-CA" : "fr-CA"}"><article><p>${en ? "Daily investor tool · Montreal" : "Outil investisseur quotidien · Montréal"}</p><h1>${escapeHtml(title)}</h1><p>${escapeHtml(intro)}</p>` +
    `<section><h2>${en ? "Transparent deal screening" : "Présélection transparente des occasions"}</h2><p>${escapeHtml(method)}</p></section>` +
    `<section><h2>${en ? "Published investment metrics" : "Métriques de rendement publiées"}</h2><p>${en
      ? "Every underwritten listing publishes the same set of metrics, computed from reported income, Quebec financing assumptions and explicit operating-expense rules:"
      : "Chaque immeuble analysé publie le même ensemble de métriques, calculées à partir des revenus rapportés, d’hypothèses de financement québécoises et de règles de dépenses explicites :"}</p><dl>${metricsDl}</dl></section>` +
    `<section><h2>${en ? "Frequently asked questions" : "Questions fréquentes"}</h2>${faq}</section>` +
    `<section><h2>${en ? "Open a listing in the full calculator" : "Ouvrir une fiche dans le calculateur complet"}</h2><p>${en ? "Every property can prefill Gestion Velora’s full Quebec plex investment calculator for a deeper analysis." : "Chaque immeuble peut préremplir le calculateur complet de rendement plex de Gestion Velora pour une analyse approfondie."}</p>` +
    `<p><a href="${calcHref}">${en ? "Montreal plex investment calculator" : "Calculateur de rendement plex à Montréal"}</a> · <a href="${guideHref}">${en ? "Montreal plex buyer's guide" : "Guide de l'acheteur de plex à Montréal"}</a></p></section></article></main>`;
}

function buildPlexGuideMainHtml(loc: "fr" | "en"): string {
  const p = REFERENCE_PAGE[loc];
  const figures = REFERENCE_FIGURES.map(
    (f) =>
      `<section><h2 id="${f.id}">${escapeHtml(f.label[loc])}</h2><p>${escapeHtml(f.value[loc])}</p>` +
      `<p>${loc === "fr" ? "Source" : "Source"}: <a href="${f.sourceUrl}" rel="noopener">${escapeHtml(f.source)}</a></p></section>`,
  ).join("");

  return [
    `<h1>${escapeHtml(p.title)}</h1>`,
    `<p>${escapeHtml(p.intro)}</p>`,
    `<p>${escapeHtml(p.figuresNote)}</p>`,
    figures,
    `<p><a href="${CALCULATOR_PATHS[loc]}">${loc === "fr" ? "Ouvrir le calculateur de rendement" : "Open the investment calculator"}</a></p>`,
  ].join("");
}

function buildPlexCalculatorSchemas(loc: "fr" | "en"): object[] {
  const p = CALCULATOR_PAGE[loc];
  const url = `${SITE_URL}${CALCULATOR_PATHS[loc]}`;
  return [
    {
      "@type": "WebApplication",
      "@id": `${url}#app`,
      name: p.metaTitle,
      url,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: loc === "en" ? "en-CA" : "fr-CA",
      description: p.metaDescription,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: p.sections.map((s) => s.heading),
      publisher: { "@id": ORG_ID },
      areaServed: { "@type": "AdministrativeArea", name: "Montréal, Québec, Canada" },
      dateModified: `${FIGURES_VERIFIED}-01`,
      about: (loc === "en"
        ? [
            "Montreal transfer duties (welcome tax)",
            "CMHC multi-unit financing limits",
            "Quebec rental board (TAL) rent-setting framework",
            "Capital cost allowance (CCA) recapture at resale",
          ]
        : [
            "Droits de mutation de Montréal (taxe de bienvenue)",
            "Plafonds de financement SCHL pour immeubles à logements",
            "Cadre de fixation de loyer du TAL",
            "Récupération de la déduction pour amortissement (DPA) à la revente",
          ]
      ).map((name) => ({ "@type": "Thing", name })),
      citation: REFERENCE_FIGURES.map((f) => ({
        "@type": "CreativeWork",
        name: f.source,
        url: f.sourceUrl,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: p.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}

function buildPlexGuideSchemas(loc: "fr" | "en"): object[] {
  const p = REFERENCE_PAGE[loc];
  const url = `${SITE_URL}${REFERENCE_PATHS[loc]}`;
  return [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: p.metaTitle,
      description: p.metaDescription,
      url,
      inLanguage: loc === "en" ? "en-CA" : "fr-CA",
      author: {
        "@type": "Person",
        name: AUTHOR_NAME,
        url: `${SITE_URL}/about`,
        jobTitle: "Founder, Gestion Velora",
        worksFor: { "@id": ORG_ID },
      },
      publisher: { "@id": ORG_ID },
      dateModified: `${FIGURES_VERIFIED}-01`,
      citation: REFERENCE_FIGURES.map((f) => ({
        "@type": "CreativeWork",
        name: f.source,
        url: f.sourceUrl,
      })),
    },
  ];
}

interface RouteConfig {
  path: string;
  locale: "fr" | "en";
  frPath: string;
  enPath: string;
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  twitterImage?: string;
  lcpImage?: string;
  modulePreloads?: string[];
  ampPath?: string;
  robots?: string;
  includeInSitemap?: boolean;
  /** Images that belong to this page and should be discoverable through the image sitemap extension. */
  sitemapImages?: readonly string[];
  pageSchemas: object | object[] | null;
  /** Page-specific noscript HTML to replace the homepage noscript block (homepage only; prefer prerenderMainInner elsewhere). */
  noscriptBody?: string;
  /** Crawlable <main> placed inside #root before React renders. */
  prerenderMainInner?: string;
}


function buildTrustDocumentRoutes(): RouteConfig[] {
  const ids = ["about", "editorial-policy", "sources", "methodology", "trust-proof"] as const;
  const out: RouteConfig[] = [];
  for (const id of ids) {
    const fr = TRUST_PAGES[id].fr;
    const en = TRUST_PAGES[id].en;
    const frPath = `/${id}`;
    const enPath = `/en/${id}`;
    out.push({
      path: frPath,
      locale: "fr",
      frPath,
      enPath,
      title: fr.metaTitle,
      description: fr.metaDescription,
      pageSchemas: null,
      prerenderMainInner: buildTrustDocumentMainHtml("fr", id),
    });
    out.push({
      path: enPath,
      locale: "en",
      frPath,
      enPath,
      title: en.metaTitle,
      description: en.metaDescription,
      pageSchemas: null,
      prerenderMainInner: buildTrustDocumentMainHtml("en", id),
    });
  }
  return out;
}


function buildRoutes(): RouteConfig[] {
  const routes: RouteConfig[] = [];

  // --- Homepage ---
  const frHomeTitle = "Gestion immobilière Montréal | Gestion Velora";
  const frHomeDesc =
    "Gestion immobilière à Montréal pour copropriétés, locations longue durée et Airbnb. Rapports clairs, soutien 24/7 et entretien proactif.";
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
    sitemapImages: HOMEPAGE_IMAGE_PATHS,
    pageSchemas: buildHomepageFaqPageSchema("fr"),
    prerenderMainInner: buildHomepageMainHtml("fr"),
  });
  routes.push({
    path: "/en/",
    locale: "en",
    frPath: "/",
    enPath: "/en/",
    title: enHomeTitle,
    description: enHomeDesc,
    sitemapImages: HOMEPAGE_IMAGE_PATHS,
    pageSchemas: buildHomepageFaqPageSchema("en"),
    prerenderMainInner: buildHomepageMainHtml("en"),
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
    prerenderMainInner: buildServicesHubMainHtml("fr"),
    pageSchemas: buildServicesHubSchema("fr", SITE_URL),
  });
  routes.push({
    path: "/en/services",
    locale: "en",
    frPath: "/services",
    enPath: "/en/services",
    title: enHubMeta.title,
    description: enHubMeta.description,
    prerenderMainInner: buildServicesHubMainHtml("en"),
    pageSchemas: buildServicesHubSchema("en", `${SITE_URL}/en`),
  });

  // --- Service detail pages ---
  for (const slug of ["syndicat-copropriete", "airbnb", "location", "gestion-condo", "gestion-copropriete"] as const) {
    const frSvc = getService("fr", slug);
    const enSvc = getService("en", slug);
    const img = SERVICE_IMAGES[slug];
    const mobileImg = SERVICE_MOBILE_IMAGES[slug];

    const frBc = getBreadcrumbLabels("fr");
    const enBc = getBreadcrumbLabels("en");

    routes.push({
      path: `/services/${slug}`,
      locale: "fr",
      frPath: `/services/${slug}`,
      enPath: `/en/services/${slug}`,
      title: frSvc.metaTitle ?? buildTitle(frSvc.title),
      description: frSvc.metaDescription ?? frSvc.description,
      ogImage: img,
      twitterImage: img,
      lcpImage: new URL(mobileImg).pathname,
      modulePreloads: SERVICE_MODULE_PRELOADS,
      prerenderMainInner: buildServiceDetailMainHtml("fr", slug),
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
      title: enSvc.metaTitle ?? buildTitle(enSvc.title),
      description: enSvc.metaDescription ?? enSvc.description,
      ogImage: img,
      twitterImage: img,
      lcpImage: new URL(mobileImg).pathname,
      modulePreloads: SERVICE_MODULE_PRELOADS,
      prerenderMainInner: buildServiceDetailMainHtml("en", slug),
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
    prerenderMainInner: buildCompareIndexMainHtml("fr"),
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
    prerenderMainInner: buildCompareIndexMainHtml("en"),
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
      keywords: buildKeywords("fr", [page.h1Fr, page.titleFr, ...page.whereAlternativeWinsFr]),
      prerenderMainInner: buildComparisonMainHtml("fr", page),
      pageSchemas: null,
    });
    routes.push({
      path: `/en/compare/${page.slug}`,
      locale: "en",
      frPath: `/compare/${page.slug}`,
      enPath: `/en/compare/${page.slug}`,
      title: buildTitle(page.titleEn),
      description: page.descriptionEn,
      keywords: buildKeywords("en", [page.h1En, page.titleEn, ...page.whereAlternativeWinsEn]),
      prerenderMainInner: buildComparisonMainHtml("en", page),
      pageSchemas: null,
    });
  }

  // --- Location hubs ---
  // --- Plex calculator & buyer guide ---
  // The tool itself is JavaScript, so the prerendered <main> carries the prose
  // that actually gets indexed and quoted: the summary, the explanatory
  // sections, every FAQ answer, and the sourced figures with anchors.
  for (const loc of ["fr", "en"] as const) {
    const calc = CALCULATOR_PAGE[loc];
    routes.push({
      path: CALCULATOR_PATHS[loc],
      locale: loc,
      frPath: CALCULATOR_PATHS.fr,
      enPath: CALCULATOR_PATHS.en,
      title: `${calc.metaTitle} | Gestion Velora`,
      description: calc.metaDescription,
      keywords: calc.keywords,
      prerenderMainInner: buildPlexCalculatorMainHtml(loc),
      pageSchemas: buildPlexCalculatorSchemas(loc),
    });

    const guide = REFERENCE_PAGE[loc];
    routes.push({
      path: REFERENCE_PATHS[loc],
      locale: loc,
      frPath: REFERENCE_PATHS.fr,
      enPath: REFERENCE_PATHS.en,
      title: `${guide.metaTitle} | Gestion Velora`,
      description: guide.metaDescription,
      keywords: guide.keywords,
      prerenderMainInner: buildPlexGuideMainHtml(loc),
      pageSchemas: buildPlexGuideSchemas(loc),
    });

    const radar = RADAR_META[loc];
    routes.push({
      path: RADAR_PATHS[loc],
      locale: loc,
      frPath: RADAR_PATHS.fr,
      enPath: RADAR_PATHS.en,
      title: buildTitle(radar.title),
      description: radar.description,
      keywords: loc === "en"
        ? "Montreal income properties for sale, duplex for sale Montreal, triplex for sale Montreal, real estate investment Montreal"
        : "immeubles à revenus à vendre Montréal, duplex à vendre Montréal, triplex à vendre Montréal, investissement immobilier Montréal",
      prerenderMainInner: buildPlexRadarMainHtml(loc),
      pageSchemas: [{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Plex Radar",
        alternateName: loc === "en"
          ? "Montreal income properties for sale"
          : "Immeubles à revenus à vendre à Montréal",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        url: `${SITE_URL}${RADAR_PATHS[loc]}`,
        description: radar.description,
        inLanguage: loc === "en" ? "en-CA" : "fr-CA",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
        publisher: { "@id": ORG_ID },
        areaServed: { "@type": "AdministrativeArea", name: "Québec, Canada" },
        audience: { "@type": "Audience", audienceType: "Quebec plex investors" },
        featureList: loc === "en" ? [
          "Daily income-property screening", "Cap rate", "Cash-on-cash return", "DSCR",
          "Gross rent multiplier", "Monthly cash flow", "Editable operating-expense scenarios",
          "Prefill the full Quebec plex investment calculator",
        ] : [
          "Présélection quotidienne d’immeubles à revenus", "Taux de capitalisation", "Rendement comptant",
          "DSCR", "Multiplicateur de revenu brut", "Flux de trésorerie mensuel",
          "Scénarios de dépenses d’exploitation modifiables", "Préremplissage du calculateur de rendement plex",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${SITE_URL}${RADAR_PATHS[loc]}#faq`,
        mainEntity: RADAR_FAQ[loc].map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }],
    });
  }

  routes.push({
    path: "/locations",
    locale: "fr",
    frPath: "/locations",
    enPath: "/en/locations",
    title: "Pages locales gestion immobiliere | Gestion Velora",
    description:
      "Pages locales de gestion immobiliere par ville du Grand Montreal: copropriete, location et Airbnb.",
    prerenderMainInner: buildLocationsIndexMainHtml("fr"),
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
    prerenderMainInner: buildLocationsIndexMainHtml("en"),
    pageSchemas: null,
  });

  // --- Blog index ---
  const frBlogTitle = "Blog gestion immobilière Montréal | Conseils & actualités";
  const frBlogDesc =
    "Conseils sur la gestion immobilière à Montréal : copropriété, Airbnb, location, réglementation, entretien et rentabilité.";
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
    prerenderMainInner: buildBlogIndexMainHtml("fr"),
    pageSchemas: buildBlogIndexSchema("fr", SITE_URL),
  });
  routes.push({
    path: "/en/blog",
    locale: "en",
    frPath: "/blog",
    enPath: "/en/blog",
    title: enBlogTitle,
    description: enBlogDesc,
    prerenderMainInner: buildBlogIndexMainHtml("en"),
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
      description: buildMetaDescription(post.fr.excerpt, post.fr.brief),
      keywords: buildKeywords("fr", [post.fr.metaTitle ?? post.fr.title, post.fr.category, post.fr.sections[0]?.heading ?? ""]),
      ogImage: img,
      twitterImage: img,
      ampPath: `/amp/blog/${slug}`,
      prerenderMainInner: buildBlogMainHtml("fr", slug),
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
      description: buildMetaDescription(post.en.excerpt, post.en.brief),
      keywords: buildKeywords("en", [post.en.metaTitle ?? post.en.title, post.en.category, post.en.sections[0]?.heading ?? ""]),
      ogImage: img,
      twitterImage: img,
      ampPath: `/en/amp/blog/${slug}`,
      prerenderMainInner: buildBlogMainHtml("en", slug),
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
    prerenderMainInner: buildPrivacyMainHtml("fr"),
    pageSchemas: null,
  });
  routes.push({
    path: "/en/privacy",
    locale: "en",
    frPath: "/privacy",
    enPath: "/en/privacy",
    title: "Privacy Policy | Gestion Velora",
    description: enHomeDesc,
    prerenderMainInner: buildPrivacyMainHtml("en"),
    pageSchemas: null,
  });

  // --- Terms of use ---
  routes.push({
    path: "/terms",
    locale: "fr",
    frPath: "/terms",
    enPath: "/en/terms",
    title: "Conditions d’utilisation | Gestion Velora",
    description:
      "Conditions encadrant l’utilisation du site Gestion Velora et de ses informations générales en gestion immobilière.",
    prerenderMainInner: buildTermsMainHtml("fr"),
    pageSchemas: null,
  });
  routes.push({
    path: "/en/terms",
    locale: "en",
    frPath: "/terms",
    enPath: "/en/terms",
    title: "Terms of Use | Gestion Velora",
    description:
      "Terms governing use of the Gestion Velora website and its general property management information.",
    prerenderMainInner: buildTermsMainHtml("en"),
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
      "Tarifs de gestion immobilière à Montréal : copropriété, location et Airbnb. Prix clairs, soumission gratuite et aucun frais caché.",
    pageSchemas: null,
    prerenderMainInner: buildTarifsMainHtml("fr"),
  });
  routes.push({
    path: "/en/tarifs",
    locale: "en",
    frPath: "/tarifs",
    enPath: "/en/tarifs",
    title: "Property Management Fees Montreal | Gestion Velora",
    description:
      "Property management fees in Montreal for condo boards, rentals, and Airbnb. Clear pricing, free proposal, and no hidden fees.",
    pageSchemas: null,
    prerenderMainInner: buildTarifsMainHtml("en"),
  });

  // --- Location pages (generated from CITIES × LOCATION_SERVICES × 2 languages) ---
  routes.push(...buildLocationRoutes());

  routes.push(...buildTrustDocumentRoutes());

  return routes;
}

// ---------------------------------------------------------------------------
// Sitemap generator — runs after every build so the file never goes stale
// ---------------------------------------------------------------------------
function buildSitemap(routes: RouteConfig[]): void {
  function priority(path: string): string {
    const trustPaths = new Set(
      (["/about", "/editorial-policy", "/sources", "/methodology", "/trust-proof"] as const).flatMap((fr) => [fr, `/en${fr}`])
    );
    if (trustPaths.has(path)) return "0.5";
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
    if (path.includes("income-properties-for-sale") || path.includes("immeubles-a-revenus-a-vendre")) return "daily";
    if (path === "/" || path === "/en/") return "weekly";
    if (path.startsWith("/location/") || path.startsWith("/en/location/")) return "monthly";
    return "monthly";
  }

  const seen = new Set<string>();
  const entries: string[] = [];

  for (const route of routes) {
    if (route.includeInSitemap === false) continue;
    if (seen.has(route.path)) continue;
    seen.add(route.path);

    const loc = `${SITE_URL}${route.path}`;
    const frHref = `${SITE_URL}${route.frPath}`;
    const enHref = `${SITE_URL}${route.enPath}`;
    const imageEntries = (route.sitemapImages ?? [])
      .map((path) => `    <image:image><image:loc>${escapeHtml(absoluteSiteUrl(path))}</image:loc></image:image>\n`)
      .join("");

    entries.push(
      `  <url>\n` +
      `    <loc>${loc}</loc>\n` +
      `    <xhtml:link rel="alternate" hreflang="fr-CA" href="${frHref}" />\n` +
      `    <xhtml:link rel="alternate" hreflang="en-CA" href="${enHref}" />\n` +
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${frHref}" />\n` +
      imageEntries +
      `    <lastmod>${SITEMAP_LAST_MODIFIED_BY_PATH.get(route.path) ?? DEFAULT_SITEMAP_LAST_MODIFIED}</lastmod>\n` +
      `    <changefreq>${changefreq(route.path)}</changefreq>\n` +
      `    <priority>${priority(route.path)}</priority>\n` +
      `  </url>`
    );
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
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
      keywords: route.keywords,
      canonical,
      ogLocale: isEn ? "en_CA" : "fr_CA",
      ogLocaleAlt: isEn ? "fr_CA" : "en_CA",
      ogImage: route.ogImage ?? DEFAULT_OG_IMAGE,
      twitterImage: route.twitterImage ?? DEFAULT_TWITTER_IMAGE,
      lcpImage: route.lcpImage,
      modulePreloads: route.modulePreloads,
      ampHtmlHref: route.ampPath ? `${SITE_URL}${route.ampPath}` : undefined,
      robots: route.robots,
      hreflangFr: frCanonical,
      hreflangEn: enCanonical,
      hreflangDefault: frCanonical,
      pageSchemas: route.pageSchemas,
      locale: route.locale,
      noscriptBody: route.noscriptBody,
      prerenderMainInner: route.prerenderMainInner,
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
    keywords: rootRoute.keywords,
    canonical: `${SITE_URL}/`,
    ogLocale: "fr_CA",
    ogLocaleAlt: "en_CA",
    ogImage: DEFAULT_OG_IMAGE,
    twitterImage: DEFAULT_TWITTER_IMAGE,
    robots: rootRoute.robots,
    hreflangFr: `${SITE_URL}/`,
    hreflangEn: `${SITE_URL}/en/`,
    hreflangDefault: `${SITE_URL}/`,
    pageSchemas: rootRoute.pageSchemas,
    locale: "fr",
    prerenderMainInner: rootRoute.prerenderMainInner,
  });
  writeFileSync(join(DIST, "index.html"), rootHtml, "utf-8");
  console.log("  ✓ / (dist/index.html updated)");

  for (const post of blogPosts) {
    writeRoute(`/amp/blog/${post.slug}`, buildAmpBlogHtml("fr", post.slug));
    writeRoute(`/en/amp/blog/${post.slug}`, buildAmpBlogHtml("en", post.slug));
    count += 2;
  }

  // Auto-generate sitemap from all routes so it never goes stale
  buildSitemap(routes);

  console.log(`\n✅ Prerendered ${count} routes.\n`);
}

main().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
