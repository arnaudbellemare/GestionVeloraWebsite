/**
 * Appends 301 redirects for removed location URL suffixes to vercel.json.
 * Run after editing REMOVED_CITY_SLUGS to match src/data/locations.ts.
 *
 * Usage: node scripts/generate-vercel-location-redirects.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/** Must match cities removed from CITIES in src/data/locations.ts */
const REMOVED_CITY_SLUGS = [
  "quebec",
  "levis",
  "sherbrooke",
  "trois-rivieres",
  "gatineau",
  "drummondville",
  "granby",
  "mont-tremblant",
  "bromont",
  "candiac",
  "la-prairie",
  "saint-constant",
  "delson",
  "lorraine",
  "rosemere",
  "bois-des-filion",
  "charlemagne",
  "lassomption",
  "carignan",
  "chambly",
  "beloeil",
];

const root = process.cwd();
const vercelPath = join(root, "vercel.json");
const cfg = JSON.parse(readFileSync(vercelPath, "utf-8"));

const redirects = [];
for (const city of REMOVED_CITY_SLUGS) {
  redirects.push({
    source: `/location/(.*)-${city}`,
    destination: "/locations",
    permanent: true,
  });
  redirects.push({
    source: `/en/location/(.*)-${city}`,
    destination: "/en/locations",
    permanent: true,
  });
}

cfg.redirects = redirects;
writeFileSync(vercelPath, JSON.stringify(cfg, null, 2) + "\n", "utf-8");
console.log(`Updated vercel.json with ${redirects.length} location redirects (${REMOVED_CITY_SLUGS.length} removed cities).`);
