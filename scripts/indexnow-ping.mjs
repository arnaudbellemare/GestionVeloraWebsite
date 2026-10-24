/**
 * Notifies IndexNow-enabled engines (Bing, Yandex, Naver, Seznam, Yep) of changed URLs.
 * Submissions to the shared endpoint are forwarded to every participating engine.
 * Google does not support IndexNow; the sitemap still covers it.
 *
 * Protocol: https://www.indexnow.org/documentation
 *   - key file: public/<key>.txt at the site root, 8–128 chars [a-zA-Z0-9-]
 *   - POST https://api.indexnow.org/indexnow  {host, key, keyLocation, urlList}  (≤ 10,000 URLs)
 *   - 200 received · 202 received, key validation pending · 403 key file not found
 *     422 URLs not on host · 429 rate limited (wait 10 minutes)
 *
 * Usage (dry run prints the payload, nothing is sent):
 *   node scripts/indexnow-ping.mjs --since 2026-10-01          # URLs whose sitemap <lastmod> >= date
 *   node scripts/indexnow-ping.mjs --urls /blog/x,/en/blog/x    # explicit paths or absolute URLs
 *   node scripts/indexnow-ping.mjs --all                        # whole sitemap (only after a site-wide change)
 * Add --submit to actually send. Key is read from public/<key>.txt, or INDEXNOW_KEY env.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SITE_URL = "https://www.gestionvelora.com";
const HOST = new URL(SITE_URL).host;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS = 10_000;
const KEY_PATTERN = /^[a-zA-Z0-9-]{8,128}$/;

const root = process.cwd();
const publicDir = join(root, "public");

function parseArgs(argv) {
  const opts = { since: null, urls: [], all: false, submit: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--since") opts.since = argv[++i];
    else if (arg === "--urls") opts.urls = (argv[++i] ?? "").split(",").map((s) => s.trim()).filter(Boolean);
    else if (arg === "--all") opts.all = true;
    else if (arg === "--submit") opts.submit = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return opts;
}

/** Finds the single IndexNow key file in public/ (a .txt whose name equals its content). */
export function findKey() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY;
  const candidates = readdirSync(publicDir).filter((name) => {
    if (!name.endsWith(".txt") || name === "robots.txt" || name === "llms.txt") return false;
    const stem = name.slice(0, -4);
    if (!KEY_PATTERN.test(stem)) return false;
    return readFileSync(join(publicDir, name), "utf-8").trim() === stem;
  });
  if (candidates.length !== 1) {
    throw new Error(
      `Expected exactly one IndexNow key file in public/ (found ${candidates.length}). ` +
        "Create it with: KEY=$(openssl rand -hex 16); printf '%s' \"$KEY\" > public/$KEY.txt"
    );
  }
  return candidates[0].slice(0, -4);
}

/** Reads public/sitemap.xml into [{loc, lastmod}]. */
export function readSitemap() {
  const xml = readFileSync(join(publicDir, "sitemap.xml"), "utf-8");
  const entries = [];
  for (const block of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = block[1].match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    const lastmod = block[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim() ?? null;
    if (loc) entries.push({ loc, lastmod });
  }
  return entries;
}

function toAbsolute(pathOrUrl) {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export function selectUrls(opts, sitemap) {
  let urls;
  if (opts.urls.length) urls = opts.urls.map(toAbsolute);
  else if (opts.all) urls = sitemap.map((e) => e.loc);
  else if (opts.since) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(opts.since)) throw new Error("--since expects YYYY-MM-DD");
    urls = sitemap.filter((e) => e.lastmod && e.lastmod.slice(0, 10) >= opts.since).map((e) => e.loc);
  } else {
    throw new Error("Pass --since YYYY-MM-DD, --urls a,b,c or --all");
  }
  const offHost = urls.filter((u) => new URL(u).host !== HOST);
  if (offHost.length) throw new Error(`URLs not on ${HOST}: ${offHost.join(", ")}`);
  const unique = [...new Set(urls)];
  if (unique.length > MAX_URLS) throw new Error(`${unique.length} URLs exceeds the ${MAX_URLS} per-request limit`);
  return unique;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const key = findKey();
  const urlList = selectUrls(opts, readSitemap());
  if (!urlList.length) {
    console.log("No URLs selected; nothing to submit.");
    return;
  }
  const payload = { host: HOST, key, keyLocation: `${SITE_URL}/${key}.txt`, urlList };
  console.log(`${urlList.length} URL(s) selected for IndexNow (${opts.submit ? "submitting" : "dry run"}):`);
  for (const u of urlList) console.log(`  ${u}`);
  if (!opts.submit) {
    console.log("\nDry run. Re-run with --submit to send.");
    return;
  }
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const body = (await res.text()).trim();
  const meaning =
    { 200: "received", 202: "received, key validation pending", 400: "bad request", 403: "key file not found or invalid", 422: "URLs not on host", 429: "rate limited, wait 10 minutes" }[res.status] ??
    "unexpected";
  console.log(`\nIndexNow ${res.status} (${meaning})${body ? `: ${body}` : ""}`);
  if (res.status >= 400) process.exitCode = 1;
}

const invokedDirectly = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (invokedDirectly) {
  main().catch((err) => {
    console.error(err.message);
    process.exitCode = 1;
  });
}
