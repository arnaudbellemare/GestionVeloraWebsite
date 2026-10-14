/**
 * Validates repo-native SEO artifacts and prints counts.
 * Does not call Search Console APIs (no secrets in repo).
 *
 * Checks:
 *   - seo/*.json artifact shape
 *   - every blog post and comparison page has ISO dates with dateModified >= datePublished
 *   - the AI discovery files live in public/ only (no stale root copies)
 *   - exactly one IndexNow key file exists in public/ and matches the protocol format
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { blogPosts } from "../src/data/blog.js";
import { COMPARISON_PAGES } from "../src/data/comparisons.js";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const INDEXNOW_KEY = /^[a-zA-Z0-9-]{8,128}$/;

function loadJson<T>(relativePath: string): T {
  const path = join(process.cwd(), relativePath);
  const raw = readFileSync(path, "utf-8");
  return JSON.parse(raw) as T;
}

function checkDates(label: string, items: { slug: string; datePublished: string; dateModified: string }[]) {
  const problems: string[] = [];
  for (const item of items) {
    if (!ISO_DATE.test(item.datePublished)) problems.push(`${item.slug}: datePublished "${item.datePublished}" is not YYYY-MM-DD`);
    if (!ISO_DATE.test(item.dateModified)) problems.push(`${item.slug}: dateModified "${item.dateModified}" is not YYYY-MM-DD`);
    if (item.dateModified < item.datePublished) {
      problems.push(`${item.slug}: dateModified ${item.dateModified} is earlier than datePublished ${item.datePublished}`);
    }
  }
  if (problems.length) throw new Error(`${label} dates:\n  ${problems.join("\n  ")}`);
  console.log(`✓ ${label} — ${items.length} entries, dateModified >= datePublished`);
}

function checkAiDiscoveryFiles() {
  for (const required of ["public/llms.txt", "public/llms-full.md", "public/robots.txt"]) {
    if (!existsSync(join(process.cwd(), required))) throw new Error(`${required} is missing`);
  }
  for (const stale of ["llms.txt", "llms-full.txt"]) {
    if (existsSync(join(process.cwd(), stale))) {
      throw new Error(`${stale} exists at the repo root but is never deployed; edit public/${stale.replace(".txt", stale === "llms-full.txt" ? ".md" : ".txt")} instead`);
    }
  }
  console.log("✓ AI discovery files — public/ is the single source");
}

function checkIndexNowKey() {
  const publicDir = join(process.cwd(), "public");
  const keys = readdirSync(publicDir).filter((name) => {
    if (!name.endsWith(".txt") || name === "robots.txt" || name === "llms.txt") return false;
    const stem = name.slice(0, -4);
    return INDEXNOW_KEY.test(stem) && readFileSync(join(publicDir, name), "utf-8").trim() === stem;
  });
  if (keys.length !== 1) throw new Error(`Expected exactly one IndexNow key file in public/, found ${keys.length}`);
  console.log(`✓ IndexNow key file — public/${keys[0]}`);
}

function main() {
  const audit = loadJson<{ issues: unknown[] }>("seo/audit-issues.json");
  const urls = loadJson<{ templates: unknown[] }>("seo/representative-urls.json");

  if (!Array.isArray(audit.issues)) throw new Error("audit-issues.json: missing issues array");
  if (!Array.isArray(urls.templates)) throw new Error("representative-urls.json: missing templates array");

  console.log(`✓ seo/audit-issues.json — ${audit.issues.length} issues`);
  console.log(`✓ seo/representative-urls.json — ${urls.templates.length} template rows`);

  checkDates("Blog posts", blogPosts);
  checkDates("Comparison pages", COMPARISON_PAGES);
  checkAiDiscoveryFiles();
  checkIndexNowKey();

  console.log("SEO artifact verification passed.");
}

main();
