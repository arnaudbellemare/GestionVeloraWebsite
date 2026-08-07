#!/usr/bin/env node
/**
 * verify-crawler-identity.mjs — prove whether a crawler hitting the site is genuine.
 *
 * A User-Agent header is self-reported text. Anyone can send
 * `facebookexternalhit/1.1` from a VPS. The only trustworthy signal is the
 * source IP, checked two ways:
 *
 *   1. ASN membership   — is the IP inside a prefix the platform announces?
 *                         (Meta = AS32934. Meta publishes no rDNS convention,
 *                         so this is the only method available for Meta.)
 *   2. Forward-confirmed reverse DNS (FCrDNS) — IP -> hostname -> back to the
 *                         same IP, with the hostname under an official domain.
 *                         Used by Google/Bing. Spoofers control neither leg.
 *
 * Usage:
 *   node scripts/verify-crawler-identity.mjs 57.141.3.18 66.220.149.12
 *   node scripts/verify-crawler-identity.mjs --file access.log
 *   node scripts/verify-crawler-identity.mjs --refresh 57.141.3.18
 *
 * --file accepts any text; every IPv4/IPv6 found is checked (deduped). Pipe
 * Vercel/Cloudflare logs straight in.
 */

import dns from "node:dns/promises";
import { execFile } from "node:child_process";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { promisify } from "node:util";
import path from "node:path";

const execFileAsync = promisify(execFile);
const CACHE_DIR = path.join(process.cwd(), "node_modules", ".cache", "crawler-verify");

/** Platforms that publish an ASN but no reverse-DNS convention. */
const ASN_OWNERS = [
  { asn: "AS32934", owner: "Meta / Facebook", agents: [/^meta-/i, /facebookexternalhit/i, /facebookbot/i, /WhatsApp/i] },
];

/** Platforms verifiable by forward-confirmed reverse DNS. */
const RDNS_OWNERS = [
  { owner: "Google",    agents: [/googlebot/i, /google-extended/i, /apis-google/i], suffixes: [".googlebot.com", ".google.com", ".googleusercontent.com"] },
  { owner: "Bing",      agents: [/bingbot/i, /msnbot/i],                            suffixes: [".search.msn.com"] },
  { owner: "OpenAI",    agents: [/gptbot/i, /oai-searchbot/i, /chatgpt-user/i],     suffixes: [".openai.com"] },
  { owner: "Anthropic", agents: [/claudebot/i, /claude-searchbot/i, /anthropic/i],  suffixes: [".anthropic.com"] },
];

const IP_RE =
  /\b(?:\d{1,3}\.){3}\d{1,3}\b|\b(?:[0-9a-f]{1,4}:){2,7}[0-9a-f]{1,4}\b/gi;

// ---------- CIDR matching ----------

function ipv4ToBig(ip) {
  const p = ip.split(".");
  if (p.length !== 4) return null;
  let n = 0n;
  for (const o of p) {
    const v = Number(o);
    if (!Number.isInteger(v) || v < 0 || v > 255) return null;
    n = (n << 8n) | BigInt(v);
  }
  return n;
}

function ipv6ToBig(ip) {
  const [head, tail] = ip.split("::");
  const h = head ? head.split(":").filter(Boolean) : [];
  const t = tail !== undefined ? (tail ? tail.split(":").filter(Boolean) : []) : null;
  let groups;
  if (t === null) {
    if (h.length !== 8) return null;
    groups = h;
  } else {
    const fill = 8 - h.length - t.length;
    if (fill < 0) return null;
    groups = [...h, ...Array(fill).fill("0"), ...t];
  }
  let n = 0n;
  for (const g of groups) {
    if (!/^[0-9a-f]{1,4}$/i.test(g)) return null;
    n = (n << 16n) | BigInt(parseInt(g, 16));
  }
  return n;
}

function parseIp(ip) {
  if (ip.includes(":")) {
    const n = ipv6ToBig(ip);
    return n === null ? null : { n, bits: 128 };
  }
  const n = ipv4ToBig(ip);
  return n === null ? null : { n, bits: 32 };
}

function inCidr(ipInfo, cidr) {
  const [base, lenRaw] = cidr.split("/");
  const b = parseIp(base);
  if (!b || b.bits !== ipInfo.bits) return false;
  const len = Number(lenRaw);
  if (!Number.isInteger(len) || len < 0 || len > b.bits) return false;
  const shift = BigInt(b.bits - len);
  return ipInfo.n >> shift === b.n >> shift;
}

// ---------- ASN prefix fetch ----------

async function fetchAsnPrefixes(asn, refresh) {
  const cacheFile = path.join(CACHE_DIR, `${asn}.json`);
  if (!refresh) {
    try {
      const raw = JSON.parse(await readFile(cacheFile, "utf8"));
      // 7-day TTL; routing changes are infrequent but not never.
      if (Date.now() - raw.fetchedAt < 7 * 864e5 && raw.prefixes?.length) return raw.prefixes;
    } catch {
      /* cold cache */
    }
  }

  const prefixes = new Set();
  for (const flag of ["-i origin", "-i origin -T route6"]) {
    try {
      const { stdout } = await execFileAsync(
        "whois",
        ["-h", "whois.radb.net", "--", `${flag} ${asn}`],
        { maxBuffer: 32 * 1024 * 1024, timeout: 60_000 }
      );
      for (const line of stdout.split("\n")) {
        const m = line.match(/^route6?:\s*(\S+)/);
        if (m) prefixes.add(m[1]);
      }
    } catch (e) {
      console.error(`  ! whois ${asn} (${flag}) failed: ${e.shortMessage ?? e.message}`);
    }
  }

  const list = [...prefixes];
  if (list.length) {
    await mkdir(CACHE_DIR, { recursive: true });
    await writeFile(cacheFile, JSON.stringify({ fetchedAt: Date.now(), prefixes: list }));
  }
  return list;
}

// ---------- verification ----------

async function verifyRdns(ip, suffixes) {
  let hostnames;
  try {
    hostnames = await dns.reverse(ip);
  } catch {
    return { ok: false, detail: "no PTR record" };
  }
  for (const host of hostnames) {
    const h = host.toLowerCase().replace(/\.$/, "");
    if (!suffixes.some((s) => h.endsWith(s))) continue;
    // Forward-confirm: the hostname must resolve back to this exact IP.
    try {
      const back = await dns.resolve(h, ip.includes(":") ? "AAAA" : "A");
      if (back.includes(ip)) return { ok: true, detail: h };
      return { ok: false, detail: `${h} does not resolve back to ${ip}` };
    } catch {
      return { ok: false, detail: `${h} did not resolve` };
    }
  }
  return { ok: false, detail: `PTR ${hostnames.join(", ")} not on an official domain` };
}

/**
 * Platforms that publish no verification mechanism at all — no ASN commitment,
 * no reverse-DNS convention. Their traffic can never be proven genuine, which
 * is exactly why these User-Agents are the most attractive to impersonate:
 * many sites whitelist them so link previews work.
 */
const UNVERIFIABLE_AGENTS = [
  { owner: "X / Twitter", re: /Twitterbot/i },
  { owner: "Discord", re: /Discordbot/i },
  { owner: "Slack", re: /Slackbot/i },
  { owner: "Telegram", re: /TelegramBot/i },
];

/** Read `CRAWLER {json}` lines emitted by middleware.ts, else bare IPs. */
function parseRecords(text) {
  const records = new Map(); // ip -> Set<ua>
  let structured = 0;

  for (const line of text.split("\n")) {
    const i = line.indexOf("CRAWLER {");
    if (i === -1) continue;
    try {
      const { ip, ua } = JSON.parse(line.slice(i + "CRAWLER ".length));
      if (!ip || !parseIp(ip)) continue;
      if (!records.has(ip)) records.set(ip, new Set());
      records.get(ip).add(ua ?? "");
      structured++;
    } catch {
      /* truncated line */
    }
  }

  if (!structured) {
    for (const ip of new Set(text.match(IP_RE) ?? [])) {
      if (parseIp(ip)) records.set(ip, new Set());
    }
  }
  return { records, structured };
}

async function main() {
  const argv = process.argv.slice(2);
  const refresh = argv.includes("--refresh");
  const fileIdx = argv.indexOf("--file");
  let records;

  if (fileIdx !== -1 && argv[fileIdx + 1]) {
    const parsed = parseRecords(await readFile(argv[fileIdx + 1], "utf8"));
    records = parsed.records;
    console.log(
      parsed.structured
        ? `Parsed ${parsed.structured} CRAWLER log lines -> ${records.size} unique IPs\n`
        : `No CRAWLER lines found; fell back to raw IP extraction -> ${records.size} IPs\n`
    );
  } else {
    records = new Map(argv.filter((a) => !a.startsWith("--") && parseIp(a)).map((ip) => [ip, new Set()]));
  }

  if (!records.size) {
    console.error("No IPs given.\n  node scripts/verify-crawler-identity.mjs <ip...>\n  node scripts/verify-crawler-identity.mjs --file access.log");
    process.exit(1);
  }

  console.log("Loading announced prefixes...");
  const asnMap = new Map();
  for (const o of ASN_OWNERS) {
    const p = await fetchAsnPrefixes(o.asn, refresh);
    asnMap.set(o.asn, p);
    console.log(`  ${o.owner} (${o.asn}): ${p.length} prefixes`);
  }
  console.log(`\nChecking ${records.size} unique IP(s)\n`);

  const tally = { genuine: 0, spoofed: 0, unverifiable: 0, unknown: 0 };

  for (const [ip, uaSet] of records) {
    const info = parseIp(ip);
    if (!info) continue;
    const uas = [...uaSet].filter(Boolean);
    const uaText = uas.join(" | ");

    // Who does the IP actually belong to?
    let actual = null;
    for (const o of ASN_OWNERS) {
      if (asnMap.get(o.asn).some((c) => inCidr(info, c))) {
        actual = { owner: o.owner, how: `IP inside ${o.asn} announced prefix` };
        break;
      }
    }
    if (!actual) {
      for (const o of RDNS_OWNERS) {
        const r = await verifyRdns(ip, o.suffixes);
        if (r.ok) { actual = { owner: o.owner, how: `FCrDNS ${r.detail}` }; break; }
      }
    }

    // Who does the User-Agent claim to be?
    const claimedAsn = ASN_OWNERS.find((o) => o.agents.some((re) => re.test(uaText)));
    const claimedRdns = RDNS_OWNERS.find((o) => o.agents.some((re) => re.test(uaText)));
    const claimedUnver = UNVERIFIABLE_AGENTS.find((o) => o.re.test(uaText));
    const claimed = claimedAsn?.owner ?? claimedRdns?.owner ?? claimedUnver?.owner ?? null;

    let label, note;
    if (claimed && actual && claimed === actual.owner) {
      label = "GENUINE"; note = actual.how; tally.genuine++;
    } else if (claimed && (claimedAsn || claimedRdns) && !actual) {
      let ptr = "no PTR";
      try { ptr = (await dns.reverse(ip)).join(", "); } catch { /* none */ }
      label = "SPOOFED"; note = `claims ${claimed}, but IP is not theirs (rDNS: ${ptr})`; tally.spoofed++;
    } else if (claimed && actual && claimed !== actual.owner) {
      label = "SPOOFED"; note = `claims ${claimed}, IP belongs to ${actual.owner}`; tally.spoofed++;
    } else if (claimedUnver) {
      let ptr = "no PTR";
      try { ptr = (await dns.reverse(ip)).join(", "); } catch { /* none */ }
      label = "UNVERIFIABLE"; note = `${claimed} publishes no way to verify (rDNS: ${ptr})`; tally.unverifiable++;
    } else if (actual) {
      label = "GENUINE"; note = actual.how; tally.genuine++;
    } else {
      let ptr = "no PTR";
      try { ptr = (await dns.reverse(ip)).join(", "); } catch { /* none */ }
      label = "UNKNOWN"; note = `not a verifiable major crawler (rDNS: ${ptr})`; tally.unknown++;
    }

    const mark = { GENUINE: "OK   ", SPOOFED: "FAKE ", UNVERIFIABLE: "?    ", UNKNOWN: "?    " }[label];
    console.log(`${mark}${ip.padEnd(40)} ${label}`);
    if (uas.length) console.log(`      UA:   ${uas.map((u) => u.slice(0, 90)).join("\n            ")}`);
    console.log(`      ${note}`);
  }

  console.log(
    `\n--- ${tally.genuine} genuine | ${tally.spoofed} SPOOFED | ${tally.unverifiable} unverifiable | ${tally.unknown} unknown ---`
  );
  if (tally.spoofed) console.log("SPOOFED = the UA lied about who it is. Rate-limit or block those IPs.");
  if (tally.unverifiable) console.log("UNVERIFIABLE = platform publishes no proof mechanism; judge by behaviour, not UA.");
}

main().catch((e) => { console.error(e); process.exit(1); });
