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
import { blogPosts } from "../src/data/blog.js";
import { fr as frRaw } from "../src/i18n/fr.js";
import { en as enRaw } from "../src/i18n/en.js";
import { CITIES, LOCATION_SERVICES } from "../src/data/locations.js";

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
  const inLang = locale === "fr" ? "fr-CA" : "en-CA";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.servicesHub.schemaName,
    description: t.servicesHub.metaDescription,
    inLanguage: inLang,
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
  const inLang = locale === "fr" ? "fr-CA" : "en-CA";
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
    inLanguage: inLang,
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
        title: `${fillLoc(svc.h1Fr, city, "fr")} | Gestion Velora`,
        description: fillLoc(svc.descFr, city, "fr"),
        ogImage: svcImage,
        twitterImage: svcImage,
        pageSchemas: [
          buildLocationServiceSchema("fr", svc, city, SITE_URL),
          buildBreadcrumbSchema([
            { name: frBc.home, url: `${SITE_URL}/` },
            { name: frBc.services, url: `${SITE_URL}/services` },
            { name: fillLoc(svc.h1Fr, city, "fr") },
          ]),
        ],
      });
      out.push({
        path: enPath,
        locale: "en",
        frPath,
        enPath,
        title: `${fillLoc(svc.h1En, city, "en")} | Gestion Velora`,
        description: fillLoc(svc.descEn, city, "en"),
        ogImage: svcImage,
        twitterImage: svcImage,
        pageSchemas: [
          buildLocationServiceSchema("en", svc, city, `${SITE_URL}/en`),
          buildBreadcrumbSchema([
            { name: enBc.home, url: `${SITE_URL}/` },
            { name: enBc.services, url: `${SITE_URL}/en/services` },
            { name: fillLoc(svc.h1En, city, "en") },
          ]),
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
}

function buildRoutes(): RouteConfig[] {
  const routes: RouteConfig[] = [];

  // --- Homepage ---
  const frHomeTitle = "Gestion immobilière Montréal | Gestion Velora";
  const frHomeDesc =
    "Gestion Velora offre syndicat de copropriété, gestion Airbnb et location longue durée à Montréal. Administration complète, maintenance proactive et rapports transparents.";
  const enHomeTitle = "Property Management Montreal | Gestion Velora";
  const enHomeDesc =
    "Leading property management in Montreal: condo boards, Airbnb management, and long-term rental management. 98% occupancy, 24/7 support, full transparency.";

  routes.push({
    path: "/",
    locale: "fr",
    frPath: "/",
    enPath: "/en/",
    title: frHomeTitle,
    description: frHomeDesc,
    pageSchemas: buildFaqSchema("fr"),
    // homepage uses dedicated twitter-card, not og-image
  });
  routes.push({
    path: "/en/",
    locale: "en",
    frPath: "/",
    enPath: "/en/",
    title: enHomeTitle,
    description: enHomeDesc,
    pageSchemas: buildFaqSchema("en"),
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
    pageSchemas: buildServicesHubSchema("fr", SITE_URL),
  });
  routes.push({
    path: "/en/services",
    locale: "en",
    frPath: "/services",
    enPath: "/en/services",
    title: enHubMeta.title,
    description: enHubMeta.description,
    pageSchemas: buildServicesHubSchema("en", `${SITE_URL}/en`),
  });

  // --- Service detail pages ---
  for (const slug of ["syndicat-copropriete", "airbnb", "location"] as const) {
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
      title: `${frSvc.title} | Gestion Velora`,
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
      title: `${enSvc.title} | Gestion Velora`,
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

  // --- Blog index ---
  const frBlogTitle = "Conseils gestion immobilière Montréal | Gestion Velora";
  const frBlogDesc =
    "Articles pratiques sur la gestion immobilière à Montréal : conformité copropriété, maintenance préventive, optimisation du NOI, réglementation Airbnb.";
  const enBlogTitle = "Montreal Property Management Insights | Gestion Velora";
  const enBlogDesc =
    "Practical articles on property management in Montreal: condo compliance, preventive maintenance, NOI optimization, Airbnb regulation.";

  routes.push({
    path: "/blog",
    locale: "fr",
    frPath: "/blog",
    enPath: "/en/blog",
    title: frBlogTitle,
    description: frBlogDesc,
    pageSchemas: buildBlogIndexSchema("fr", SITE_URL),
  });
  routes.push({
    path: "/en/blog",
    locale: "en",
    frPath: "/blog",
    enPath: "/en/blog",
    title: enBlogTitle,
    description: enBlogDesc,
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
      title: `${post.fr.title} | Gestion Velora`,
      description: post.fr.excerpt,
      ogImage: img,
      twitterImage: img,
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
      title: `${post.en.title} | Gestion Velora`,
      description: post.en.excerpt,
      ogImage: img,
      twitterImage: img,
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

  // --- Location pages (35 cities × 4 services × 2 languages = 280 routes) ---
  routes.push(...buildLocationRoutes());

  return routes;
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
  });
  writeFileSync(join(DIST, "index.html"), rootHtml, "utf-8");
  console.log("  ✓ / (dist/index.html updated)");

  console.log(`\n✅ Prerendered ${count} routes.\n`);
}

main().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
