/**
 * Validates repo-native SEO artifact JSON and prints counts.
 * Does not call Search Console APIs (no secrets in repo).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

function loadJson<T>(relativePath: string): T {
  const path = join(process.cwd(), relativePath);
  const raw = readFileSync(path, "utf-8");
  return JSON.parse(raw) as T;
}

function main() {
  const audit = loadJson<{ issues: unknown[] }>("seo/audit-issues.json");
  const urls = loadJson<{ templates: unknown[] }>("seo/representative-urls.json");

  if (!Array.isArray(audit.issues)) throw new Error("audit-issues.json: missing issues array");
  if (!Array.isArray(urls.templates)) throw new Error("representative-urls.json: missing templates array");

  console.log(`✓ seo/audit-issues.json — ${audit.issues.length} issues`);
  console.log(`✓ seo/representative-urls.json — ${urls.templates.length} template rows`);
  console.log("SEO artifact verification passed.");
}

main();
