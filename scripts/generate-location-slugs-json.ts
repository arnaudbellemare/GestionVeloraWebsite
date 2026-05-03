/**
 * Writes `location-slugs.generated.json` for Edge middleware allowlist.
 * Run via npm run build (first step).
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { LOCATION_SLUGS } from "../src/data/locations";

const out = join(process.cwd(), "location-slugs.generated.json");
writeFileSync(out, JSON.stringify(LOCATION_SLUGS, null, 0) + "\n", "utf-8");
console.log(`Wrote ${LOCATION_SLUGS.length} location page slugs → ${out}`);
