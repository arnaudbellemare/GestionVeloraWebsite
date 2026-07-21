/**
 * Writes `location-slugs.generated.json` for Edge middleware allowlist.
 * Run via npm run build (first step).
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { LOCATION_SLUGS } from "../src/data/locations";
import { isRetiredLocationSlug } from "../src/data/locationRoutePolicy";

const out = join(process.cwd(), "location-slugs.generated.json");
const allowed = LOCATION_SLUGS.filter((slug) => !isRetiredLocationSlug(slug));
writeFileSync(out, JSON.stringify(allowed, null, 0) + "\n", "utf-8");
console.log(`Wrote ${allowed.length} location page slugs → ${out}`);
