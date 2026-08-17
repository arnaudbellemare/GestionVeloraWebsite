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
 *   node scripts/fetch-crawler-logs.mjs --hostname www.gestionvelora.com
 */

import { list, get } from "@vercel/blob";
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";

function parseArgs(argv) {
  const out = {
    date: null,
    output: "crawler-drained.log",
    hostname: null,
    projectId: null,
    concurrency: 16,
  };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--date") out.date = argv[++i];
    else if (argv[i] === "--out") out.output = argv[++i];
    else if (argv[i] === "--hostname") out.hostname = argv[++i]?.toLowerCase();
    else if (argv[i] === "--project-id") out.projectId = argv[++i];
    else if (argv[i] === "--concurrency") {
      const value = Number(argv[++i]);
      if (!Number.isInteger(value) || value < 1 || value > 32) {
        throw new Error("--concurrency must be an integer from 1 to 32");
      }
      out.concurrency = value;
    }
  }
  return out;
}

function normalizedHostname(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  return value.trim().toLowerCase().replace(/\.$/, "").replace(/:\d+$/, "");
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
  const { date, output, hostname, projectId, concurrency } = parseArgs(process.argv.slice(2));

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

  const chunks = new Array(blobs.length);
  let bytes = 0;
  let cursorIndex = 0;

  async function fetchWorker() {
    while (true) {
      const index = cursorIndex++;
      if (index >= blobs.length) return;
      const b = blobs[index];

      // Private blobs return 403 from a bare URL fetch by design — the read
      // has to go through get(), which authorises with the store token.
      const r = await get(b.pathname, { token, access: "private" });
      if (r.statusCode !== 200 || !r.stream) {
        console.error(`  ! skip ${b.pathname}: status ${r.statusCode}`);
        chunks[index] = "";
        continue;
      }
      const text = await new Response(r.stream).text();
      chunks[index] = text.endsWith("\n") ? text : text + "\n";
      bytes += b.size;
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, blobs.length) }, fetchWorker));

  const allLines = chunks.join("").split("\n").filter(Boolean);
  const records = [];
  const ips = new Set();
  const uas = new Map();
  const hosts = new Map();
  let legacyWithoutHost = 0;
  for (const l of allLines) {
    try {
      const r = JSON.parse(l);
      const recordHost = normalizedHostname(r.hostname);
      if (hostname && recordHost !== normalizedHostname(hostname)) continue;
      if (projectId && r.projectId !== projectId) continue;

      records.push(l);
      if (r.ip) ips.add(r.ip);
      const key = (r.ua || "?").slice(0, 60);
      uas.set(key, (uas.get(key) ?? 0) + 1);
      if (recordHost) hosts.set(recordHost, (hosts.get(recordHost) ?? 0) + 1);
      else legacyWithoutHost++;
    } catch {
      /* skip */
    }
  }

  const combined = records.length ? records.join("\n") + "\n" : "";
  await writeFile(output, combined, "utf8");

  console.log(`${blobs.length} batch object(s), ${bytes} bytes -> ${output}`);
  console.log(`${records.length} matching crawler records, ${ips.size} unique IPs`);
  if (hostname || projectId) {
    console.log(`Filter: hostname=${hostname ?? "*"}, projectId=${projectId ?? "*"}`);
  }
  console.log("");
  for (const [ua, n] of [...uas.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15)) {
    console.log(`  ${String(n).padStart(5)}  ${ua}`);
  }
  if (hosts.size) {
    console.log("\nBy hostname:");
    for (const [host, n] of [...hosts.entries()].sort((a, b) => b[1] - a[1])) {
      console.log(`  ${String(n).padStart(5)}  ${host}`);
    }
  }
  if (legacyWithoutHost) {
    console.log(`\n  ${legacyWithoutHost} legacy record(s) have no hostname and cannot be site-attributed.`);
  }
  console.log(`\nNext: node scripts/verify-crawler-identity.mjs --file ${output}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
