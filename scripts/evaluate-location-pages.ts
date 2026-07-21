#!/usr/bin/env tsx

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { CITIES, LOCATION_SERVICES } from "../src/data/locations";
import { isPriorityLocationSlug } from "../src/data/locationPriority";

type MetricMap = Map<string, number>;

function argument(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function parseCsv(raw: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < raw.length; i += 1) {
    const char = raw[i];
    if (char === '"') {
      if (quoted && raw[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && raw[i + 1] === "\n") i += 1;
      row.push(cell);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

function normalizedHeader(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function findColumn(headers: string[], candidates: string[]): number {
  const normalized = headers.map(normalizedHeader);
  return normalized.findIndex((header) => candidates.some((candidate) => header === normalizedHeader(candidate)));
}

function canonicalPath(value: string): string {
  try {
    const url = new URL(value, "https://www.gestionvelora.com");
    return url.pathname.replace(/\/$/, "") || "/";
  } catch {
    return value.trim().replace(/^https?:\/\/[^/]+/, "").replace(/\/$/, "") || "/";
  }
}

function metricsFromCsv(path: string, valueCandidates: string[]): MetricMap {
  const rows = parseCsv(readFileSync(resolve(path), "utf8"));
  const headers = rows.shift();
  if (!headers) throw new Error(`${path}: empty CSV`);
  const pageIndex = findColumn(headers, ["page", "landing page", "target page", "url", "landingPagePlusQueryString"]);
  const valueIndex = findColumn(headers, valueCandidates);
  if (pageIndex < 0 || valueIndex < 0) {
    throw new Error(`${path}: expected a page/URL column and one of ${valueCandidates.join(", ")}`);
  }
  const values = new Map<string, number>();
  for (const row of rows) {
    const page = canonicalPath(row[pageIndex] || "");
    const value = Number((row[valueIndex] || "0").replace(/[%,$\s]/g, ""));
    if (!page || !Number.isFinite(value)) continue;
    values.set(page, (values.get(page) || 0) + value);
  }
  return values;
}

function csvCell(value: string | number): string {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function main() {
  if (!process.argv.includes("--complete")) {
    throw new Error(
      "Refusing to classify routes without --complete. This flag confirms that the GSC, backlink, " +
      "and conversion exports cover the full evaluation period."
    );
  }
  const gscPath = argument("gsc");
  const backlinksPath = argument("backlinks");
  const conversionsPath = argument("conversions");
  const outputPath = resolve(argument("out") || ".search-data/location-route-evaluation.csv");
  if (!gscPath || !backlinksPath || !conversionsPath) {
    throw new Error("Usage: npm run seo:location-evaluate -- --complete --gsc <pages.csv> --backlinks <links.csv> --conversions <ga4.csv> [--out <file>]");
  }

  const impressions = metricsFromCsv(gscPath, ["impressions"]);
  const clicks = metricsFromCsv(gscPath, ["clicks"]);
  const backlinks = metricsFromCsv(backlinksPath, ["backlinks", "linking sites", "links", "count"]);
  const conversions = metricsFromCsv(conversionsPath, ["conversions", "key events", "leads", "count"]);

  const rows: Array<Array<string | number>> = [];
  for (const service of LOCATION_SERVICES) {
    for (const city of CITIES) {
      const slug = `${service.slug}-${city.slug}`;
      if (isPriorityLocationSlug(slug)) continue;
      for (const locale of ["fr", "en"] as const) {
        const path = `${locale === "en" ? "/en" : ""}/location/${slug}`;
        const pageImpressions = impressions.get(path) || 0;
        const pageClicks = clicks.get(path) || 0;
        const pageBacklinks = backlinks.get(path) || 0;
        const pageConversions = conversions.get(path) || 0;
        const hasValue = pageImpressions > 0 || pageBacklinks > 0 || pageConversions > 0;
        const destination = `${locale === "en" ? "/en" : ""}/services/${service.serviceSlug}`;
        rows.push([
          path,
          locale,
          service.slug,
          city.slug,
          pageClicks,
          pageImpressions,
          pageBacklinks,
          pageConversions,
          hasValue ? "candidate_301" : "candidate_410",
          hasValue ? destination : "",
          hasValue
            ? "Has impressions, backlinks, or conversions; preserve signals through a relevant service hub."
            : "No measured impressions, backlinks, or conversions in the complete exports; verify indexing before 410.",
        ]);
      }
    }
  }

  const headers = [
    "page", "locale", "service", "city", "clicks", "impressions", "backlinks", "conversions",
    "recommendation", "destination", "rationale",
  ];
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n") + "\n";
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, csv, "utf8");
  console.log(`Evaluated ${rows.length} nonpriority bilingual routes → ${outputPath}`);
}

main();
