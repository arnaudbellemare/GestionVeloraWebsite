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
 *   - Correct <meta property="og:*">
 *   - Page-specific JSON-LD schema (<script type="application/ld+json">)
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
    lang: string; // "fr-CA" | "en-CA"
    title: string;
    description: string;
    canonical: string;
    ogLocale: string; // "fr_CA" | "en_CA"
    ogLocaleAlt: string;
    ogImage: string;
    hreflangFr: string;
    hreflangEn: string;
    hreflangDefault: string;
    /** Page-specific JSON-LD to inject (or null) */
    pageSchema: object | null;
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

  // 14. twitter:image
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*"/,
    `<meta name="twitter:image" content="${opts.ogImage}"`
  );

  // 15. hreflang links (replace all three at once via a block match)
  const hreflangBlock = [
    `    <link rel="alternate" hreflang="fr-CA" href="${opts.hreflangFr}" />`,
    `    <link rel="alternate" hreflang="en-CA" href="${opts.hreflangEn}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${opts.hreflangDefault}" />`,
  ].join("\n");
  html = html.replace(
    /<link rel="alternate" hreflang="fr-CA"[^/]*\/>\s*<link rel="alternate" hreflang="en-CA"[^/]*\/>\s*<link rel="alternate" hreflang="x-default"[^/]*\/>/,
    hreflangBlock
  );

  // 16. Inject page-specific JSON-LD (right before </head>)
  if (opts.pageSchema) {
    const schemaTag = `  <script type="application/ld+json">\n  ${JSON.stringify(
      opts.pageSchema,
      null,
      2
    )}\n  </script>\n`;
    html = html.replace("</head>", `${schemaTag}</head>`);
  }

  return html;
}

// ---------------------------------------------------------------------------
// Helper: write file, creating parent directories as needed
// ---------------------------------------------------------------------------
function writeRoute(routePath: string, html: string) {
  // routePath is like "/services/airbnb" → dist/services/airbnb/index.html
  // routePath "/" → dist/index.html (already exists, skip)
  // routePath "/en/" → dist/en/index.html
  if (routePath === "/") return; // root is already dist/index.html

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
type I18n = typeof frRaw;

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

// ---------------------------------------------------------------------------
// Route definitions
// ---------------------------------------------------------------------------
interface RouteConfig {
  path: string; // URL path (e.g., "/services/airbnb")
  locale: "fr" | "en";
  frPath: string; // canonical FR path
  enPath: string; // canonical EN path
  title: string;
  description: string;
  ogImage?: string;
  schema: object | null;
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

  // FR homepage already is dist/index.html — we still push it so the schema is injected there
  routes.push({
    path: "/",
    locale: "fr",
    frPath: "/",
    enPath: "/en/",
    title: frHomeTitle,
    description: frHomeDesc,
    schema: buildFaqSchema("fr"),
  });
  routes.push({
    path: "/en/",
    locale: "en",
    frPath: "/",
    enPath: "/en/",
    title: enHomeTitle,
    description: enHomeDesc,
    schema: buildFaqSchema("en"),
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
    schema: buildServicesHubSchema("fr", SITE_URL),
  });
  routes.push({
    path: "/en/services",
    locale: "en",
    frPath: "/services",
    enPath: "/en/services",
    title: enHubMeta.title,
    description: enHubMeta.description,
    schema: buildServicesHubSchema("en", `${SITE_URL}/en`),
  });

  // --- Service detail pages ---
  for (const slug of ["syndicat-copropriete", "airbnb", "location"] as const) {
    const frSvc = getService("fr", slug);
    const enSvc = getService("en", slug);
    const img = SERVICE_IMAGES[slug];

    routes.push({
      path: `/services/${slug}`,
      locale: "fr",
      frPath: `/services/${slug}`,
      enPath: `/en/services/${slug}`,
      title: `${frSvc.title} | Gestion Velora`,
      description: frSvc.description,
      ogImage: img,
      schema: buildServiceSchema("fr", slug, SITE_URL),
    });
    routes.push({
      path: `/en/services/${slug}`,
      locale: "en",
      frPath: `/services/${slug}`,
      enPath: `/en/services/${slug}`,
      title: `${enSvc.title} | Gestion Velora`,
      description: enSvc.description,
      ogImage: img,
      schema: buildServiceSchema("en", slug, `${SITE_URL}/en`),
    });
  }

  // --- Blog index ---
  routes.push({
    path: "/blog",
    locale: "fr",
    frPath: "/blog",
    enPath: "/en/blog",
    title: "Conseils gestion immobilière Montréal | Gestion Velora",
    description:
      "Articles pratiques sur la gestion immobilière à Montréal : conformité copropriété, maintenance préventive, optimisation du NOI, réglementation Airbnb.",
    schema: null,
  });
  routes.push({
    path: "/en/blog",
    locale: "en",
    frPath: "/blog",
    enPath: "/en/blog",
    title: "Montreal Property Management Insights | Gestion Velora",
    description:
      "Practical articles on property management in Montreal: condo compliance, preventive maintenance, NOI optimization, Airbnb regulation.",
    schema: null,
  });

  // --- Blog posts ---
  for (const post of blogPosts) {
    const slug = post.slug;
    const img = post.image;

    routes.push({
      path: `/blog/${slug}`,
      locale: "fr",
      frPath: `/blog/${slug}`,
      enPath: `/en/blog/${slug}`,
      title: `${post.fr.title} | Gestion Velora`,
      description: post.fr.excerpt,
      ogImage: img,
      schema: buildArticleSchema("fr", slug, SITE_URL),
    });
    routes.push({
      path: `/en/blog/${slug}`,
      locale: "en",
      frPath: `/blog/${slug}`,
      enPath: `/en/blog/${slug}`,
      title: `${post.en.title} | Gestion Velora`,
      description: post.en.excerpt,
      ogImage: img,
      schema: buildArticleSchema("en", slug, `${SITE_URL}/en`),
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
    schema: null,
  });
  routes.push({
    path: "/en/privacy",
    locale: "en",
    frPath: "/privacy",
    enPath: "/en/privacy",
    title: "Privacy Policy | Gestion Velora",
    description: enHomeDesc,
    schema: null,
  });

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
      hreflangFr: frCanonical,
      hreflangEn: enCanonical,
      hreflangDefault: frCanonical, // FR as x-default
      pageSchema: route.schema,
    });

    writeRoute(route.path, html);
    count++;
  }

  // Special: update dist/index.html itself (root /  route)
  const rootRoute = routes.find((r) => r.path === "/")!;
  const rootHtml = buildHtml(template, {
    lang: "fr-CA",
    title: rootRoute.title,
    description: rootRoute.description,
    canonical: `${SITE_URL}/`,
    ogLocale: "fr_CA",
    ogLocaleAlt: "en_CA",
    ogImage: DEFAULT_OG_IMAGE,
    hreflangFr: `${SITE_URL}/`,
    hreflangEn: `${SITE_URL}/en/`,
    hreflangDefault: `${SITE_URL}/`,
    pageSchema: rootRoute.schema,
  });
  writeFileSync(join(DIST, "index.html"), rootHtml, "utf-8");
  console.log("  ✓ / (dist/index.html updated)");

  console.log(`\n✅ Prerendered ${count} routes.\n`);
}

main().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
