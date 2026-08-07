#!/usr/bin/env node
/**
 * fetch-crawler-logs.mjs — pull drained crawler records out of Vercel Blob.
 *
 * The log drain (api/log-drain.ts) writes one immutable NDJSON object per
 * delivered batch under `crawler/<YYYY-MM-DD>/`. This concatenates them into a
 * single local file that scripts/verify-crawler-identity.mjs can read.
 *
 * The store is private, so a token is required — reads are not possible from a
 * URL alone. Supply it either way:
 *   vercel env pull .env.local && node scripts/fetch-crawler-logs.mjs
 *   BLOB_READ_WRITE_TOKEN=... node scripts/fetch-crawler-logs.mjs
 *
 * Usage:
 *   node scripts/fetch-crawler-logs.mjs                  # every day on record
 *   node scripts/fetch-crawler-logs.mjs --date 2026-08-07
 *   node scripts/fetch-crawler-logs.mjs --out crawler.log
 */

import { list, head } from "@vercel/blob";
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";

function parseArgs(argv) {
  const out = { date: null, output: "crawler-drained.log" };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--date") out.date = argv[++i];
    else if (argv[i] === "--out") out.output = argv[++i];
  }
  return out;
}

/** Load BLOB_READ_WRITE_TOKEN from the environment or a local dotenv file. */
async function resolveToken() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  for (const f of [".env.local", ".env.production.local", ".env"]) {
    try {
      const text = await readFile(path.join(process.cwd(), f), "utf8");
      const m = text.match(/^BLOB_READ_WRITE_TOKEN=(.*)$/m);
      if (m) return m[1].trim().replace(/^["']|["']$/g, "");
    } catch {
      /* file absent */
    }
  }
  return null;
}

async function main() {
  const { date, output } = parseArgs(process.argv.slice(2));

  const token = await resolveToken();
  if (!token) {
    console.error(
      "No BLOB_READ_WRITE_TOKEN found.\n" +
        "  vercel env pull .env.local\n" +
        "  BLOB_READ_WRITE_TOKEN=... node scripts/fetch-crawler-logs.mjs"
    );
    process.exit(1);
  }

  const prefix = date ? `crawler/${date}/` : "crawler/";
  const blobs = [];
  let cursor;
  do {
    const page = await list({ prefix, cursor, limit: 1000, token });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  if (!blobs.length) {
    console.log(`No crawler batches under "${prefix}".`);
    console.log("Either the drain has delivered nothing yet, or no bots have hit the site.");
    return;
  }

  // Batch objects are immutable, so pathname order is stable and chronological
  // enough (the day prefix orders days; within a day, order does not matter).
  blobs.sort((a, b) => a.pathname.localeCompare(b.pathname));

  let combined = "";
  let bytes = 0;
  for (const b of blobs) {
    // Private blobs are not fetchable from the URL alone; head() gives a
    // token-authorised download URL.
    const meta = await head(b.url, { token });
    const res = await fetch(meta.downloadUrl ?? b.downloadUrl ?? b.url);
    if (!res.ok) {
      console.error(`  ! skip ${b.pathname}: HTTP ${res.status}`);
      continue;
    }
    const text = await res.text();
    combined += text.endsWith("\n") ? text : text + "\n";
    bytes += b.size;
  }

  await writeFile(output, combined, "utf8");

  const lines = combined.split("\n").filter(Boolean);
  const ips = new Set();
  const uas = new Map();
  for (const l of lines) {
    try {
      const r = JSON.parse(l);
      if (r.ip) ips.add(r.ip);
      const key = (r.ua || "?").slice(0, 60);
      uas.set(key, (uas.get(key) ?? 0) + 1);
    } catch {
      /* skip */
    }
  }

  console.log(`${blobs.length} batch object(s), ${bytes} bytes -> ${output}`);
  console.log(`${lines.length} crawler records, ${ips.size} unique IPs\n`);
  for (const [ua, n] of [...uas.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15)) {
    console.log(`  ${String(n).padStart(5)}  ${ua}`);
  }
  console.log(`\nNext: node scripts/verify-crawler-identity.mjs --file ${output}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
