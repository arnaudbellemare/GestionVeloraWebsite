#!/usr/bin/env tsx
/**
 * Build-output SEO checks based on Google Search Central guidance.
 *
 * Run after `npm run build`, because these checks validate the actual HTML that
 * crawlers receive from `dist/`.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const SITE_URL = "https://www.gestionvelora.com";
const DIST = join(process.cwd(), "dist");
const PUBLIC = join(process.cwd(), "public");

type Issue = {
  severity: "error" | "warn";
  file: string;
  message: string;
};

const issues: Issue[] = [];

function add(severity: Issue["severity"], file: string, message: string) {
  issues.push({ severity, file, message });
}

function read(path: string) {
  return readFileSync(path, "utf-8");
}

function walkIndexHtml(dir: string, out: string[] = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkIndexHtml(path, out);
    } else if (entry.isFile() && entry.name === "index.html") {
      out.push(path);
    }
  }
  return out;
}

function relPath(path: string) {
  return relative(process.cwd(), path);
}

function routePathForIndex(path: string) {
  const dir = relative(DIST, path).replace(/\/index\.html$/, "");
  return dir === "index.html" || dir === "" ? "/" : `/${dir}`;
}

function matchOne(html: string, pattern: RegExp) {
  return html.match(pattern)?.[1]?.trim();
}

function matchAll(html: string, pattern: RegExp) {
  return [...html.matchAll(pattern)].map((m) => m[1]?.trim() ?? "");
}

function isAmpRoute(routePath: string) {
  return routePath.startsWith("/amp/blog/") || routePath.startsWith("/en/amp/blog/");
}

function isVideoRoute(routePath: string) {
  return routePath.startsWith("/video/") || routePath.startsWith("/en/video/");
}

function isNoindex(html: string) {
  return /<meta\s+name="robots"\s+content="[^"]*\bnoindex\b/i.test(html);
}

function validateJsonLd(path: string, html: string) {
  const blocks = matchAll(html, /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
  for (const [index, block] of blocks.entries()) {
    try {
      JSON.parse(block);
    } catch (error) {
      add("error", path, `JSON-LD block ${index + 1} is not valid JSON: ${(error as Error).message}`);
    }
  }
}

function validateStandardPage(path: string, routePath: string, html: string, sitemapLocs: Set<string>) {
  const title = matchOne(html, /<title>([\s\S]*?)<\/title>/i);
  const description = matchOne(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonical = matchOne(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const lang = matchOne(html, /<html\s+lang="([^"]*)"/i);
  const hreflangFr = matchOne(html, /<link\s+rel="alternate"\s+hreflang="fr-CA"\s+href="([^"]*)"/i);
  const hreflangEn = matchOne(html, /<link\s+rel="alternate"\s+hreflang="en-CA"\s+href="([^"]*)"/i);
  const hreflangDefault = matchOne(html, /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="([^"]*)"/i);

  if (!title) add("error", path, "Missing <title>.");
  if (!description) add("error", path, "Missing meta description.");
  if (!canonical) add("error", path, "Missing canonical link.");
  if (!lang) add("error", path, "Missing <html lang>.");
  if (!hreflangFr || !hreflangEn || !hreflangDefault) {
    add("error", path, "Missing complete fr-CA/en-CA/x-default hreflang cluster.");
  }

  if (canonical && !canonical.startsWith(SITE_URL)) {
    add("error", path, `Canonical must use production HTTPS origin: ${canonical}`);
  }
  if (canonical?.includes("#")) {
    add("error", path, `Canonical must not include a URL fragment: ${canonical}`);
  }

  const indexed = !isNoindex(html);
  if (indexed && title && title.length > 70) {
    add("warn", path, `Title is ${title.length} characters; keep it concise for snippets.`);
  }
  if (indexed && description && (description.length < 50 || description.length > 170)) {
    add("warn", path, `Meta description is ${description.length} characters; keep it unique and useful.`);
  }

  if (indexed && canonical && !sitemapLocs.has(canonical) && !isVideoRoute(routePath)) {
    add("warn", path, `Indexable canonical is not in sitemap.xml: ${canonical}`);
  }

  const ampHref = matchOne(html, /<link\s+rel="amphtml"\s+href="([^"]*)"/i);
  const isBlogPost = routePath.startsWith("/blog/") || routePath.startsWith("/en/blog/");
  if (isBlogPost && !ampHref) {
    add("error", path, "Blog article is missing rel=\"amphtml\".");
  }
  if (!isBlogPost && ampHref) {
    add("error", path, "Only blog articles should declare an AMP alternate.");
  }
}

function validateAmpPage(path: string, routePath: string, html: string) {
  const canonical = matchOne(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const runtime = /<script\s+async\s+src="https:\/\/cdn\.ampproject\.org\/v0\.js"><\/script>/i.test(html);

  if (!/<html\s+amp\s+lang="[^"]+"/i.test(html)) add("error", path, "AMP page must use <html amp lang=\"...\">.");
  if (!runtime) add("error", path, "AMP page is missing the AMP runtime script.");
  if (!/<style\s+amp-boilerplate>/i.test(html)) add("error", path, "AMP page is missing AMP boilerplate.");
  if (!/<style\s+amp-custom>/i.test(html)) add("error", path, "AMP page is missing amp-custom CSS.");
  if (!canonical) add("error", path, "AMP page must canonicalize to the non-AMP article.");
  if (canonical?.includes("/amp/")) add("error", path, `AMP canonical must point to non-AMP URL: ${canonical}`);
  if (/<img[\s>]/i.test(html)) add("error", path, "AMP page must use amp-img instead of img.");
  if (/\son[a-z]+\s*=/i.test(html)) add("error", path, "AMP page must not use inline event handlers.");

  const scripts = [...html.matchAll(/<script\b([^>]*)>/gi)].map((m) => m[1]);
  for (const attrs of scripts) {
    const okRuntime = /async\s+src="https:\/\/cdn\.ampproject\.org\/v0\.js"/i.test(attrs);
    const okJsonLd = /type="application\/ld\+json"/i.test(attrs);
    if (!okRuntime && !okJsonLd) add("error", path, `AMP page has a non-AMP script tag: <script${attrs}>`);
  }

  const expectedCanonical = routePath.startsWith("/en/amp/blog/")
    ? `${SITE_URL}/en/blog/${routePath.split("/").pop()}`
    : `${SITE_URL}/blog/${routePath.split("/").pop()}`;
  if (canonical && canonical !== expectedCanonical) {
    add("error", path, `AMP canonical mismatch. Expected ${expectedCanonical}, got ${canonical}`);
  }
}

function validateImages(path: string, html: string) {
  const imageTags = [...html.matchAll(/<img\b([^>]*)>/gi)];
  for (const tag of imageTags) {
    const attrs = tag[1];
    if (!/\bsrc="/i.test(attrs)) add("error", path, "Image is missing a crawlable src attribute.");
    if (!/\balt="/i.test(attrs)) add("warn", path, "Image is missing alt text.");
  }
}

function validateSitemap() {
  const sitemapPath = join(DIST, "sitemap.xml");
  if (!existsSync(sitemapPath)) {
    add("error", "dist/sitemap.xml", "Missing generated sitemap.");
    return new Set<string>();
  }

  const xml = read(sitemapPath);
  const locs = matchAll(xml, /<loc>([^<]+)<\/loc>/g);
  const locSet = new Set(locs);

  if (locs.length !== locSet.size) add("error", relPath(sitemapPath), "Sitemap contains duplicate <loc> URLs.");
  for (const loc of locs) {
    if (!loc.startsWith(SITE_URL)) add("error", relPath(sitemapPath), `Sitemap URL must use production origin: ${loc}`);
    if (loc.includes("/amp/")) add("error", relPath(sitemapPath), `AMP duplicate should not be in sitemap: ${loc}`);
  }

  const publicSitemapPath = join(PUBLIC, "sitemap.xml");
  if (existsSync(publicSitemapPath)) {
    const publicXml = read(publicSitemapPath);
    const publicLocs = matchAll(publicXml, /<loc>([^<]+)<\/loc>/g);
    if (publicLocs.length !== locs.length) {
      add("warn", relPath(publicSitemapPath), `Public sitemap has ${publicLocs.length} URLs but dist has ${locs.length}.`);
    }
  }

  return locSet;
}

function validateRobots() {
  const path = join(PUBLIC, "robots.txt");
  if (!existsSync(path)) {
    add("error", "public/robots.txt", "Missing robots.txt.");
    return;
  }
  const robots = read(path);
  if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
    add("error", relPath(path), "robots.txt must point to the production sitemap.");
  }
  if (/Disallow:\s*\/$/im.test(robots)) {
    add("error", relPath(path), "robots.txt blocks the entire site.");
  }
}

function main() {
  if (!existsSync(DIST)) {
    throw new Error("dist/ does not exist. Run `npm run build` before this verifier.");
  }

  validateRobots();
  const sitemapLocs = validateSitemap();
  const pages = walkIndexHtml(DIST);

  for (const filePath of pages) {
    const path = relPath(filePath);
    const routePath = routePathForIndex(filePath);
    const html = read(filePath);

    validateJsonLd(path, html);
    validateImages(path, html);

    if (isAmpRoute(routePath)) {
      validateAmpPage(path, routePath, html);
    } else {
      validateStandardPage(path, routePath, html, sitemapLocs);
    }
  }

  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warn");

  const printableIssues = [
    ...errors,
    ...warnings.slice(0, 40),
  ];
  for (const issue of printableIssues) {
    const marker = issue.severity === "error" ? "✗" : "!";
    console.log(`${marker} ${issue.file}: ${issue.message}`);
  }
  if (warnings.length > 40) {
    console.log(`! ${warnings.length - 40} additional warnings omitted from console output.`);
  }

  console.log(
    `Google Search compliance checks: ${pages.length} HTML pages, ${errors.length} errors, ${warnings.length} warnings.`
  );

  if (errors.length) process.exit(1);
}

main();
