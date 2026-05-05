#!/usr/bin/env tsx
/**
 * scripts/generate-sitemap.ts
 *
 * Standalone sitemap generator — runs without a full vite build.
 * Imports data directly from src/ and writes public/sitemap.xml.
 *
 * Usage: tsx scripts/generate-sitemap.ts
 */

import { writeFileSync } from "fs";
import { join } from "path";

import { blogPosts } from "../src/data/blog.js";
import { COMPARISON_PAGES } from "../src/data/comparisons.js";
import { CITIES, LOCATION_SERVICES } from "../src/data/locations.js";

const SITE_URL = "https://www.gestionvelora.com";
const SERVICE_SLUGS = ["syndicat-copropriete", "airbnb", "location", "gestion-condo", "gestion-copropriete"];

interface RouteEntry {
  path: string;
  frPath: string;
  enPath: string;
}

function buildAllRoutes(): RouteEntry[] {
  const routes: RouteEntry[] = [];

  // Static pages
  const staticPairs: [string, string][] = [
    ["/", "/en/"],
    ["/services", "/en/services"],
    ["/compare", "/en/compare"],
    ["/locations", "/en/locations"],
    ["/blog", "/en/blog"],
    ["/faq", "/en/faq"],
    ["/tarifs", "/en/tarifs"],
    ["/privacy", "/en/privacy"],
  ];
  for (const [fr, en] of staticPairs) {
    routes.push({ path: fr, frPath: fr, enPath: en });
    routes.push({ path: en, frPath: fr, enPath: en });
  }

  // Service detail pages
  for (const slug of SERVICE_SLUGS) {
    routes.push({ path: `/services/${slug}`, frPath: `/services/${slug}`, enPath: `/en/services/${slug}` });
    routes.push({ path: `/en/services/${slug}`, frPath: `/services/${slug}`, enPath: `/en/services/${slug}` });
  }

  // Comparison detail pages
  for (const page of COMPARISON_PAGES) {
    routes.push({ path: `/compare/${page.slug}`, frPath: `/compare/${page.slug}`, enPath: `/en/compare/${page.slug}` });
    routes.push({ path: `/en/compare/${page.slug}`, frPath: `/compare/${page.slug}`, enPath: `/en/compare/${page.slug}` });
  }

  // Blog posts
  for (const post of blogPosts) {
    routes.push({ path: `/blog/${post.slug}`, frPath: `/blog/${post.slug}`, enPath: `/en/blog/${post.slug}` });
    routes.push({ path: `/en/blog/${post.slug}`, frPath: `/blog/${post.slug}`, enPath: `/en/blog/${post.slug}` });
  }

  // Location pages (CITIES × LOCATION_SERVICES × 2 languages)
  for (const svc of LOCATION_SERVICES) {
    for (const city of CITIES) {
      const slug = `${svc.slug}-${city.slug}`;
      const frPath = `/location/${slug}`;
      const enPath = `/en/location/${slug}`;
      routes.push({ path: frPath, frPath, enPath });
      routes.push({ path: enPath, frPath, enPath });
    }
  }

  return routes;
}

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

function main() {
  const today = new Date().toISOString().slice(0, 10);
  const routes = buildAllRoutes();
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
    entries.join("\n") +
    "\n" +
    `</urlset>\n`;

  const publicPath = join(process.cwd(), "public", "sitemap.xml");
  writeFileSync(publicPath, xml, "utf-8");
  console.log(`✅ sitemap.xml — ${entries.length} URLs written to public/sitemap.xml`);
}

main();
