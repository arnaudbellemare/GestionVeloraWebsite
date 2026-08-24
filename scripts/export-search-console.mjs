#!/usr/bin/env node

import { createSign } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const SITE_URL = process.env.GSC_SITE_URL || "sc-domain:gestionvelora.com";
const OUTPUT_ROOT = resolve(process.env.GSC_OUTPUT_DIR || ".search-data");
const API_ROOT = "https://www.googleapis.com/webmasters/v3";
const INSPECTION_API = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";

function previousMonth() {
  const now = new Date();
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 0));
  const start = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 1));
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
    month: start.toISOString().slice(0, 7),
  };
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function addUtcDays(date, days) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function rollingPeriods(endDateValue, delayDays = 3) {
  if (!Number.isInteger(delayDays) || delayDays < 0) {
    throw new Error("GSC_DATA_DELAY_DAYS must be a non-negative integer");
  }
  if (endDateValue && !/^\d{4}-\d{2}-\d{2}$/.test(endDateValue)) {
    throw new Error(`Invalid --end-date value: ${endDateValue}`);
  }
  const requestedEnd = endDateValue
    ? new Date(`${endDateValue}T00:00:00Z`)
    : addUtcDays(new Date(), -delayDays);
  if (Number.isNaN(requestedEnd.getTime()) || (endDateValue && isoDate(requestedEnd) !== endDateValue)) {
    throw new Error(`Invalid --end-date value: ${endDateValue}`);
  }

  const currentEnd = requestedEnd;
  const currentStart = addUtcDays(currentEnd, -27);
  const previousEnd = addUtcDays(currentStart, -1);
  const previousStart = addUtcDays(previousEnd, -27);
  return {
    current: { startDate: isoDate(currentStart), endDate: isoDate(currentEnd) },
    previous: { startDate: isoDate(previousStart), endDate: isoDate(previousEnd) },
  };
}

function cliOptions(argv) {
  const options = { rolling: false, listSites: false, endDate: undefined };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--rolling") options.rolling = true;
    else if (argument === "--list-sites") options.listSites = true;
    else if (argument === "--end-date") {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) throw new Error("--end-date requires YYYY-MM-DD");
      options.endDate = value;
      index += 1;
    }
    else if (argument === "--help" || argument === "-h") {
      console.log([
        "Usage: npm run seo:gsc-export -- [--rolling] [--end-date YYYY-MM-DD] [--list-sites]",
        "",
        "Default: export the previous full calendar month.",
        "--rolling: export current and previous 28-day windows for opportunity analysis.",
        "--end-date: override the rolling current-window end date (default: today minus 3 days).",
        "--list-sites: list Search Console properties visible to the credential, then exit.",
      ].join("\n"));
      process.exit(0);
    } else throw new Error(`Unknown argument: ${argument}`);
  }
  if (options.endDate && !options.rolling) {
    throw new Error("--end-date can only be used with --rolling");
  }
  if (options.listSites && (options.rolling || options.endDate)) {
    throw new Error("--list-sites cannot be combined with export options");
  }
  return options;
}

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

async function serviceAccountCredentials() {
  if (process.env.GSC_SERVICE_ACCOUNT_FILE) {
    return JSON.parse(await readFile(resolve(process.env.GSC_SERVICE_ACCOUNT_FILE), "utf8"));
  }
  if (process.env.GSC_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.GSC_SERVICE_ACCOUNT_JSON);
  }
  return null;
}

async function accessToken() {
  if (process.env.GSC_ACCESS_TOKEN) return process.env.GSC_ACCESS_TOKEN;
  const credentials = await serviceAccountCredentials();
  if (!credentials?.client_email || !credentials?.private_key) {
    throw new Error(
      "Set GSC_ACCESS_TOKEN, GSC_SERVICE_ACCOUNT_FILE, or GSC_SERVICE_ACCOUNT_JSON. " +
      "The service-account email must be added as a Search Console user."
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(JSON.stringify({
    iss: credentials.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${header}.${claim}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  const assertion = `${unsigned}.${signer.sign(credentials.private_key, "base64url")}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!response.ok) throw new Error(`OAuth token request failed (${response.status}): ${await response.text()}`);
  return (await response.json()).access_token;
}

async function api(token, url, init = {}) {
  const response = await fetch(url, {
    ...init,
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      ...(init.headers || {}),
    },
  });
  if (!response.ok) throw new Error(`${url} failed (${response.status}): ${await response.text()}`);
  return response.json();
}

async function searchAnalytics(token, dimensions, startDate, endDate) {
  const rows = [];
  const rowLimit = 25_000;
  for (let startRow = 0; ; startRow += rowLimit) {
    const result = await api(
      token,
      `${API_ROOT}/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`,
      {
        method: "POST",
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions,
          type: "web",
          dataState: "final",
          rowLimit,
          startRow,
        }),
      }
    );
    rows.push(...(result.rows || []));
    if (!result.rows || result.rows.length < rowLimit) return rows;
  }
}

function csvCell(value) {
  const text = value == null ? "" : String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toCsv(rows, dimensions) {
  const headers = [...dimensions, "clicks", "impressions", "ctr", "position"];
  const body = rows.map((row) => [
    ...(row.keys || []), row.clicks, row.impressions, row.ctr, row.position,
  ].map(csvCell).join(","));
  return `${headers.join(",")}\n${body.join("\n")}\n`;
}

async function inspectionUrls() {
  if (!process.env.GSC_INSPECTION_URLS_FILE) return [];
  const raw = await readFile(resolve(process.env.GSC_INSPECTION_URLS_FILE), "utf8");
  return raw.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

async function exportPerformanceWindow(token, outputDir, period) {
  await mkdir(outputDir, { recursive: true });
  const [pages, queries, pageQueries] = await Promise.all([
    searchAnalytics(token, ["page"], period.startDate, period.endDate),
    searchAnalytics(token, ["query"], period.startDate, period.endDate),
    searchAnalytics(token, ["page", "query"], period.startDate, period.endDate),
  ]);

  await Promise.all([
    writeFile(join(outputDir, "gsc-pages.csv"), toCsv(pages, ["page"])),
    writeFile(join(outputDir, "gsc-queries.csv"), toCsv(queries, ["query"])),
    writeFile(join(outputDir, "gsc-page-queries.csv"), toCsv(pageQueries, ["page", "query"])),
  ]);

  return { pages: pages.length, queries: queries.length, pageQueries: pageQueries.length };
}

async function exportRolling(token, endDate) {
  const delayDays = Number.parseInt(process.env.GSC_DATA_DELAY_DAYS || "3", 10);
  const periods = rollingPeriods(endDate, delayDays);
  const runId = periods.current.endDate;
  const runDir = join(OUTPUT_ROOT, "rolling", runId);
  const [currentCounts, previousCounts, sitemaps] = await Promise.all([
    exportPerformanceWindow(token, join(runDir, "current"), periods.current),
    exportPerformanceWindow(token, join(runDir, "previous"), periods.previous),
    api(token, `${API_ROOT}/sites/${encodeURIComponent(SITE_URL)}/sitemaps`),
  ]);
  await writeFile(join(runDir, "gsc-sitemaps.json"), `${JSON.stringify(sitemaps, null, 2)}\n`);

  const manifest = {
    generatedAt: new Date().toISOString(),
    property: SITE_URL,
    runId,
    periods,
    directories: {
      current: join(runDir, "current"),
      previous: join(runDir, "previous"),
    },
    counts: { current: currentCounts, previous: previousCounts },
  };
  await mkdir(join(OUTPUT_ROOT, "rolling"), { recursive: true });
  await Promise.all([
    writeFile(join(runDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`),
    writeFile(join(OUTPUT_ROOT, "rolling", "latest.json"), `${JSON.stringify(manifest, null, 2)}\n`),
    writeFile(join(runDir, "README.txt"), [
      `Rolling Search Console export for ${SITE_URL}`,
      `Current: ${periods.current.startDate} through ${periods.current.endDate}`,
      `Previous: ${periods.previous.startDate} through ${periods.previous.endDate}`,
      "",
      "Run `npm run seo:opportunity-audit` to create the ranked read-only report.",
    ].join("\n")),
  ]);
  console.log(`Rolling Search Console export written to ${runDir}`);
}

async function main() {
  const options = cliOptions(process.argv.slice(2));
  const token = await accessToken();
  if (options.listSites) {
    const result = await api(token, `${API_ROOT}/sites`);
    const entries = result.siteEntry || [];
    if (!entries.length) console.log("No Search Console properties are visible to this credential.");
    else {
      for (const entry of entries) console.log(`${entry.permissionLevel}\t${entry.siteUrl}`);
    }
    return;
  }
  if (options.rolling) {
    await exportRolling(token, options.endDate);
    return;
  }

  const { startDate, endDate, month } = previousMonth();
  const outputDir = join(OUTPUT_ROOT, month);
  await mkdir(outputDir, { recursive: true });

  const [pages, queries, pageQueries, sitemaps] = await Promise.all([
    searchAnalytics(token, ["page"], startDate, endDate),
    searchAnalytics(token, ["query"], startDate, endDate),
    searchAnalytics(token, ["page", "query"], startDate, endDate),
    api(token, `${API_ROOT}/sites/${encodeURIComponent(SITE_URL)}/sitemaps`),
  ]);

  await Promise.all([
    writeFile(join(outputDir, "gsc-pages.csv"), toCsv(pages, ["page"])),
    writeFile(join(outputDir, "gsc-queries.csv"), toCsv(queries, ["query"])),
    writeFile(join(outputDir, "gsc-page-queries.csv"), toCsv(pageQueries, ["page", "query"])),
    writeFile(join(outputDir, "gsc-sitemaps.json"), `${JSON.stringify(sitemaps, null, 2)}\n`),
  ]);

  const urls = await inspectionUrls();
  const inspections = [];
  for (const inspectionUrl of urls) {
    const result = await api(token, INSPECTION_API, {
      method: "POST",
      body: JSON.stringify({ inspectionUrl, siteUrl: SITE_URL, languageCode: "en-US" }),
    });
    inspections.push({ inspectionUrl, ...result });
  }
  if (inspections.length) {
    await writeFile(join(outputDir, "gsc-url-inspection.json"), `${JSON.stringify(inspections, null, 2)}\n`);
  }

  await writeFile(join(outputDir, "README.txt"), [
    `Search Console export for ${startDate} through ${endDate}`,
    `Property: ${SITE_URL}`,
    `Pages: ${pages.length}`,
    `Queries: ${queries.length}`,
    `Page/query rows: ${pageQueries.length}`,
    `URL inspections: ${inspections.length}`,
    "",
    "Bulk Page Indexing coverage is not available through the Search Console API.",
    "Export that report manually from Search Console and save it beside these files.",
  ].join("\n"));

  console.log(`Search Console export written to ${outputDir}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
