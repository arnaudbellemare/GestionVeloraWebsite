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

async function main() {
  const { startDate, endDate, month } = previousMonth();
  const token = await accessToken();
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
