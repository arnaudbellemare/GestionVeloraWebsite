#!/usr/bin/env node
/**
 * Report genuine Meta/Facebook crawler traffic by hostname.
 *
 * The User-Agent is only a claim. A request counts as verified Meta traffic
 * when its source IP is inside a route announced by Meta's AS32934. Records
 * are deduplicated by Vercel requestId when available, with a narrow timestamp
 * fallback for legacy records.
 *
 * Usage:
 *   node scripts/report-meta-crawlers.mjs
 *   node scripts/report-meta-crawlers.mjs --hostname www.gestionvelora.com
 *   node scripts/report-meta-crawlers.mjs --file crawler-drained.log --json
 */

import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const CACHE_DIR = path.join(process.cwd(), "node_modules", ".cache", "crawler-verify");
const META_ASN = "AS32934";
const META_UA_RE =
  /(meta-externalagent|meta-externalfetcher|meta-webindexer|facebookexternalhit|facebookbot)/i;

function parseArgs(argv) {
  const args = {
    file: "crawler-drained.log",
    hostname: null,
    refresh: false,
    json: false,
  };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--file") args.file = argv[++i];
    else if (argv[i] === "--hostname") args.hostname = normalizeHostname(argv[++i]);
    else if (argv[i] === "--refresh") args.refresh = true;
    else if (argv[i] === "--json") args.json = true;
  }
  return args;
}

function normalizeHostname(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  const raw = value.trim();
  try {
    const parsed = new URL(raw.includes("://") ? raw : `https://${raw}`);
    return parsed.hostname.toLowerCase().replace(/\.$/, "") || null;
  } catch {
    return raw.toLowerCase().replace(/\.$/, "").replace(/:\d+$/, "") || null;
  }
}

function ipv4ToBig(ip) {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let value = 0n;
  for (const part of parts) {
    const octet = Number(part);
    if (!Number.isInteger(octet) || octet < 0 || octet > 255) return null;
    value = (value << 8n) | BigInt(octet);
  }
  return { value, bits: 32 };
}

function ipv6ToBig(ip) {
  const [head, tail] = ip.split("::");
  const left = head ? head.split(":").filter(Boolean) : [];
  const right = tail === undefined ? null : (tail ? tail.split(":").filter(Boolean) : []);
  const fill = right === null ? 0 : 8 - left.length - right.length;
  if (fill < 0) return null;
  const groups = right === null
    ? left
    : [...left, ...Array(fill).fill("0"), ...right];
  if (groups.length !== 8) return null;

  let value = 0n;
  for (const group of groups) {
    if (!/^[0-9a-f]{1,4}$/i.test(group)) return null;
    value = (value << 16n) | BigInt(`0x${group}`);
  }
  return { value, bits: 128 };
}

function parseIp(ip) {
  if (typeof ip !== "string") return null;
  return ip.includes(":") ? ipv6ToBig(ip) : ipv4ToBig(ip);
}

function inCidr(ipInfo, cidr) {
  const [baseIp, lengthText] = cidr.split("/");
  const base = parseIp(baseIp);
  const length = Number(lengthText);
  if (
    !ipInfo ||
    !base ||
    ipInfo.bits !== base.bits ||
    !Number.isInteger(length) ||
    length < 0 ||
    length > base.bits
  ) {
    return false;
  }
  const shift = BigInt(base.bits - length);
  return ipInfo.value >> shift === base.value >> shift;
}

async function fetchMetaPrefixes(refresh) {
  const cacheFile = path.join(CACHE_DIR, `${META_ASN}.json`);
  if (!refresh) {
    try {
      const cached = JSON.parse(await readFile(cacheFile, "utf8"));
      if (Date.now() - cached.fetchedAt < 7 * 864e5 && cached.prefixes?.length) {
        return cached.prefixes;
      }
    } catch {
      /* cold cache */
    }
  }

  const prefixes = new Set();
  for (const query of [`-i origin ${META_ASN}`, `-i origin -T route6 ${META_ASN}`]) {
    const { stdout } = await execFileAsync(
      "whois",
      ["-h", "whois.radb.net", "--", query],
      { maxBuffer: 32 * 1024 * 1024, timeout: 60_000 },
    );
    for (const line of stdout.split("\n")) {
      const match = line.match(/^route6?:\s*(\S+)/i);
      if (match) prefixes.add(match[1]);
    }
  }

  const list = [...prefixes];
  if (!list.length) throw new Error(`No announced prefixes returned for ${META_ASN}`);
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(cacheFile, JSON.stringify({ fetchedAt: Date.now(), prefixes: list }));
  return list;
}

function parseRecords(text) {
  const records = [];
  for (const line of text.split("\n")) {
    if (!line.trim()) continue;
    try {
      const record = JSON.parse(line);
      if (record && typeof record === "object" && META_UA_RE.test(record.ua ?? "")) {
        records.push({ ...record, hostname: normalizeHostname(record.hostname) });
      }
    } catch {
      /* Ignore malformed archive lines rather than losing the whole report. */
    }
  }
  return records;
}

function deduplicate(records) {
  const sorted = [...records].sort((a, b) => Date.parse(a.ts) - Date.parse(b.ts));
  const requestIds = new Set();
  const lastLegacyHit = new Map();
  const output = [];

  for (const record of sorted) {
    if (record.requestId) {
      const key = `${record.projectId ?? "?"}:${record.requestId}`;
      if (requestIds.has(key)) continue;
      requestIds.add(key);
      output.push(record);
      continue;
    }

    const key = [record.ip, record.ua, record.hostname, record.path].join("\u0000");
    const timestamp = Date.parse(record.ts);
    const previous = lastLegacyHit.get(key);
    if (Number.isFinite(timestamp) && previous !== undefined && timestamp - previous <= 2_000) {
      continue;
    }
    if (Number.isFinite(timestamp)) lastLegacyHit.set(key, timestamp);
    output.push(record);
  }
  return output;
}

function family(ua = "") {
  if (/facebookexternalhit/i.test(ua)) return "facebookexternalhit";
  if (/facebookbot/i.test(ua)) return "FacebookBot";
  if (/meta-externalagent/i.test(ua)) return "meta-externalagent";
  if (/meta-externalfetcher/i.test(ua)) return "meta-externalfetcher";
  if (/meta-webindexer/i.test(ua)) return "meta-webindexer";
  return "other-meta";
}

function increment(map, key) {
  map.set(key, (map.get(key) ?? 0) + 1);
}

function groupByHostname(records) {
  const groups = new Map();
  for (const record of records) {
    const hostname = record.hostname ?? "(legacy: unknown hostname)";
    if (!groups.has(hostname)) {
      groups.set(hostname, {
        hostname,
        hits: 0,
        ips: new Set(),
        projectIds: new Set(),
        deploymentIds: new Set(),
        families: new Map(),
        statuses: new Map(),
      });
    }
    const group = groups.get(hostname);
    group.hits++;
    if (record.ip) group.ips.add(record.ip);
    if (record.projectId) group.projectIds.add(record.projectId);
    if (record.deploymentId) group.deploymentIds.add(record.deploymentId);
    increment(group.families, family(record.ua));
    increment(group.statuses, String(record.status ?? "unknown"));
  }
  return [...groups.values()].sort((a, b) => b.hits - a.hits);
}

function serialiseGroup(group) {
  return {
    hostname: group.hostname,
    hits: group.hits,
    uniqueIps: group.ips.size,
    projectIds: [...group.projectIds],
    deploymentIds: [...group.deploymentIds],
    families: Object.fromEntries([...group.families.entries()].sort((a, b) => b[1] - a[1])),
    statuses: Object.fromEntries([...group.statuses.entries()].sort((a, b) => b[1] - a[1])),
  };
}

function topPaths(records, limit = 15) {
  const counts = new Map();
  for (const record of records) increment(counts, record.path || "/");
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const records = parseRecords(await readFile(args.file, "utf8"));
  const prefixes = await fetchMetaPrefixes(args.refresh);
  const genuineRaw = records.filter((record) => {
    const ip = parseIp(record.ip);
    return ip && prefixes.some((cidr) => inCidr(ip, cidr));
  });
  const rejected = records.length - genuineRaw.length;
  const genuine = deduplicate(genuineRaw);
  const groups = groupByHostname(genuine);
  const selected = args.hostname
    ? genuine.filter((record) => record.hostname === args.hostname)
    : genuine;
  const timestamps = selected.map((record) => Date.parse(record.ts)).filter(Number.isFinite);
  const legacyCount = genuine.filter((record) => !record.hostname).length;

  const result = {
    source: args.file,
    selectedHostname: args.hostname,
    claimedMetaRecords: records.length,
    verifiedRawRecords: genuineRaw.length,
    verifiedDeduplicatedHits: genuine.length,
    rejectedOrSpoofedRecords: rejected,
    legacyWithoutHostname: legacyCount,
    selectedHits: selected.length,
    selectedDateRange: timestamps.length
      ? [new Date(Math.min(...timestamps)).toISOString(), new Date(Math.max(...timestamps)).toISOString()]
      : [],
    groups: groups.map(serialiseGroup),
    selectedTopPaths: topPaths(selected),
  };

  if (args.json) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  console.log("Verified Meta/Facebook crawler traffic");
  console.log(`Source: ${args.file}`);
  console.log(`Claimed records: ${records.length}`);
  console.log(`Verified AS32934 records: ${genuineRaw.length}`);
  console.log(`Verified deduplicated hits: ${genuine.length}`);
  console.log(`Rejected/spoofed records: ${rejected}`);
  if (legacyCount) {
    console.log(`Legacy hits without hostname: ${legacyCount} (cannot be site-attributed)`);
  }

  console.log("\nBy hostname:");
  for (const group of groups) {
    console.log(
      `  ${String(group.hits).padStart(6)}  ${group.hostname}` +
      `  (${group.ips.size} IPs, ${group.projectIds.size} projects, ${group.deploymentIds.size} deployments)`,
    );
  }

  if (args.hostname) {
    console.log(`\n${args.hostname}: ${selected.length} verified hit(s)`);
    for (const [pathname, count] of topPaths(selected)) {
      console.log(`  ${String(count).padStart(6)}  ${pathname}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
