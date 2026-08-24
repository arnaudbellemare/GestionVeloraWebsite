import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, isAbsolute, join, resolve } from "node:path";
import {
  analyzeOpportunities,
  parseGscCsv,
  type AuditDataset,
  type AuditPeriod,
  type OpportunityAudit,
} from "./lib/seo-opportunity.js";

interface Manifest {
  generatedAt?: string;
  property?: string;
  runId?: string;
  periods?: { current: AuditPeriod; previous: AuditPeriod };
  directories?: { current: string; previous: string };
}

interface CliOptions {
  manifest: string;
  current?: string;
  previous?: string;
  output?: string;
  minimumImpressions: number;
}

function cliOptions(argv: string[]): CliOptions {
  const options: CliOptions = {
    manifest: ".search-data/rolling/latest.json",
    minimumImpressions: 10,
  };
  const valueAfter = (index: number, flag: string): string => {
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`${flag} requires a value`);
    return value;
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--manifest") {
      options.manifest = valueAfter(index, argument);
      index += 1;
    } else if (argument === "--current") {
      options.current = valueAfter(index, argument);
      index += 1;
    } else if (argument === "--previous") {
      options.previous = valueAfter(index, argument);
      index += 1;
    } else if (argument === "--output") {
      options.output = valueAfter(index, argument);
      index += 1;
    }
    else if (argument === "--min-impressions") {
      options.minimumImpressions = Number.parseInt(valueAfter(index, argument), 10);
      index += 1;
    } else if (argument === "--help" || argument === "-h") {
      console.log([
        "Usage: npm run seo:opportunity-audit -- [options]",
        "",
        "Options:",
        "  --manifest <file>          Rolling export manifest (default: .search-data/rolling/latest.json)",
        "  --current <directory>      Override current 28-day GSC export directory",
        "  --previous <directory>     Override previous 28-day GSC export directory",
        "  --output <directory>       Report output directory",
        "  --min-impressions <number> Minimum signal per page/query (default: 10)",
        "",
        "Each input directory must contain gsc-pages.csv, gsc-queries.csv, and gsc-page-queries.csv.",
      ].join("\n"));
      process.exit(0);
    } else throw new Error(`Unknown argument: ${argument}`);
  }
  if (!Number.isFinite(options.minimumImpressions) || options.minimumImpressions < 1) {
    throw new Error("--min-impressions must be a positive integer");
  }
  if (Boolean(options.current) !== Boolean(options.previous)) {
    throw new Error("--current and --previous must be supplied together");
  }
  return options;
}

async function loadDataset(directory: string): Promise<AuditDataset> {
  const [pages, queries, pageQueries] = await Promise.all([
    readFile(join(directory, "gsc-pages.csv"), "utf8"),
    readFile(join(directory, "gsc-queries.csv"), "utf8"),
    readFile(join(directory, "gsc-page-queries.csv"), "utf8"),
  ]);
  return {
    pages: parseGscCsv(pages),
    queries: parseGscCsv(queries),
    pageQueries: parseGscCsv(pageQueries),
  };
}

function resolveManifestDirectory(value: string, manifestPath: string): string {
  if (isAbsolute(value)) return value;
  if (value.startsWith(".search-data/") || value.startsWith("./")) return resolve(value);
  return resolve(dirname(manifestPath), value);
}

function csvCell(value: unknown): string {
  const text = value == null ? "" : String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function rowsToCsv(headers: string[], rows: unknown[][]): string {
  return `${headers.join(",")}\n${rows.map((row) => row.map(csvCell).join(",")).join("\n")}\n`;
}

function percent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function decimal(value: number): string {
  return value.toFixed(1);
}

function markdownCell(value: unknown): string {
  return String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ");
}

function displayPage(page: string): string {
  try {
    return new URL(page).pathname || "/";
  } catch {
    return page;
  }
}

function periodLabel(period: AuditPeriod | undefined, fallback: string): string {
  return period ? `${period.startDate} → ${period.endDate}` : fallback;
}

function markdownReport(
  audit: OpportunityAudit,
  manifest: Manifest,
  currentDirectory: string,
  previousDirectory: string,
): string {
  const currentLabel = periodLabel(manifest.periods?.current, basename(currentDirectory));
  const previousLabel = periodLabel(manifest.periods?.previous, basename(previousDirectory));
  const lines = [
    "# SEO/GEO opportunity audit",
    "",
    `Generated: ${new Date().toISOString()}`,
    `Property: ${manifest.property ?? "not specified"}`,
    `Current window: ${currentLabel}`,
    `Comparison window: ${previousLabel}`,
    "",
    "This is a read-only prioritization report. It does not authorize publishing, page creation, consolidation, or redirects.",
    "Scores are relative within this export and must not be interpreted as traffic forecasts.",
    "",
    "## Summary",
    "",
    `- Pages compared: ${audit.summary.pagesCompared}`,
    `- Queries compared: ${audit.summary.queriesCompared}`,
    `- Pages with click regression: ${audit.summary.regressions}`,
    `- Queries in positions 5–20: ${audit.summary.nearMisses}`,
    `- Cannibalized queries to review: ${audit.summary.cannibalizedQueries}`,
    `- Possible topic gaps requiring human review: ${audit.summary.topicGapsToReview}`,
    "",
    "## Ranked page opportunities",
    "",
    "| Score | Page | Action | Clicks now / before | Impressions | Position | Lost clicks | CTR headroom | Rank headroom | Cannibalized queries |",
    "|---:|---|---|---:|---:|---:|---:|---:|---:|---|",
  ];
  for (const row of audit.pageOpportunities.slice(0, 50)) {
    lines.push(`| ${row.score} | ${markdownCell(displayPage(row.page))} | ${row.action} | ${decimal(row.current.clicks)} / ${decimal(row.previous.clicks)} | ${decimal(row.current.impressions)} | ${decimal(row.current.position)} | ${decimal(row.lostClicks)} | ${decimal(row.ctrOpportunityClicks)} | ${decimal(row.rankOpportunityClicks)} | ${markdownCell(row.cannibalizedQueries.slice(0, 3).join("; "))} |`);
  }
  if (!audit.pageOpportunities.length) lines.push("| — | No qualifying page opportunities | no_action | — | — | — | — | — | — | — |");

  lines.push(
    "",
    "## Ranked query opportunities",
    "",
    "`review_topic_gap` means investigate intent and the current owner. It is not a recommendation to generate a new page.",
    "",
    "| Score | Query | Action | Impressions | Position | CTR | Owner | Owner share | Route relevance | Flags |",
    "|---:|---|---|---:|---:|---:|---|---:|---:|---|",
  );
  for (const row of audit.queryOpportunities.slice(0, 100)) {
    const flags = [row.nearMiss ? "near-miss" : "", row.branded ? "branded" : "", row.cannibalized ? "cannibalization" : "", !row.clearOwner ? "owner unclear" : ""].filter(Boolean);
    lines.push(`| ${row.score} | ${markdownCell(row.query)} | ${row.action} | ${decimal(row.current.impressions)} | ${decimal(row.current.position)} | ${percent(row.current.ctr)} | ${markdownCell(displayPage(row.ownerPage))} | ${percent(row.ownerShare)} | ${percent(row.routeRelevance)} | ${flags.join("; ")} |`);
  }
  if (!audit.queryOpportunities.length) lines.push("| — | No qualifying query opportunities | no_action | — | — | — | — | — | — | — |");

  lines.push(
    "",
    "## CTR reference used for prioritization",
    "",
    "Property CTR is used only when a position bucket has at least 100 impressions. Otherwise the audit uses a conservative generic fallback.",
    "",
    "| Position bucket | CTR | Impressions | Source |",
    "|---|---:|---:|---|",
  );
  for (const baseline of audit.ctrBaselines) {
    lines.push(`| ${baseline.bucket} | ${percent(baseline.ctr)} | ${decimal(baseline.impressions)} | ${baseline.source} |`);
  }
  lines.push(
    "",
    "## Human review sequence",
    "",
    "1. Confirm the query intent and page ownership in Search Console.",
    "2. Prefer a surgical refresh or metadata experiment on the existing owner.",
    "3. Consolidate only after checking backlinks, conversions, canonical signals, and bilingual equivalents.",
    "4. Create content only when the intent is important and genuinely uncovered.",
    "5. Record the approved change in the private experiment ledger and recheck at +28 and +56 days.",
    "",
  );
  return lines.join("\n");
}

async function main() {
  const options = cliOptions(process.argv.slice(2));
  const manifestPath = resolve(options.manifest);
  let manifest: Manifest = {};
  if (!options.current) {
    manifest = JSON.parse(await readFile(manifestPath, "utf8")) as Manifest;
    if (!manifest.directories?.current || !manifest.directories.previous) {
      throw new Error(`Manifest is missing current/previous directories: ${manifestPath}`);
    }
  }

  const currentDirectory = options.current
    ? resolve(options.current)
    : resolveManifestDirectory(manifest.directories!.current, manifestPath);
  const previousDirectory = options.previous
    ? resolve(options.previous)
    : resolveManifestDirectory(manifest.directories!.previous, manifestPath);
  const outputDirectory = resolve(
    options.output ?? join(".search-data", "opportunity", manifest.runId ?? new Date().toISOString().slice(0, 10)),
  );

  const [current, previous] = await Promise.all([
    loadDataset(currentDirectory),
    loadDataset(previousDirectory),
  ]);
  const audit = analyzeOpportunities(current, previous, { minimumImpressions: options.minimumImpressions });
  await mkdir(outputDirectory, { recursive: true });

  const pageCsv = rowsToCsv(
    ["score", "page", "action", "current_clicks", "previous_clicks", "current_impressions", "current_ctr", "current_position", "lost_clicks", "ctr_headroom_clicks", "rank_headroom_clicks", "cannibalized_queries"],
    audit.pageOpportunities.map((row) => [row.score, row.page, row.action, row.current.clicks, row.previous.clicks, row.current.impressions, row.current.ctr, row.current.position, row.lostClicks, row.ctrOpportunityClicks, row.rankOpportunityClicks, row.cannibalizedQueries.join("; ")]),
  );
  const queryCsv = rowsToCsv(
    ["score", "query", "action", "current_clicks", "previous_clicks", "current_impressions", "current_ctr", "current_position", "owner_page", "owner_share", "route_relevance", "clear_owner", "near_miss", "branded", "cannibalized", "competing_pages"],
    audit.queryOpportunities.map((row) => [row.score, row.query, row.action, row.current.clicks, row.previous.clicks, row.current.impressions, row.current.ctr, row.current.position, row.ownerPage, row.ownerShare, row.routeRelevance, row.clearOwner, row.nearMiss, row.branded, row.cannibalized, row.competingPages.join("; ")]),
  );
  await Promise.all([
    writeFile(join(outputDirectory, "report.md"), markdownReport(audit, manifest, currentDirectory, previousDirectory)),
    writeFile(join(outputDirectory, "page-opportunities.csv"), pageCsv),
    writeFile(join(outputDirectory, "query-opportunities.csv"), queryCsv),
    writeFile(join(outputDirectory, "audit.json"), `${JSON.stringify({ manifest, ...audit }, null, 2)}\n`),
  ]);

  console.log(`SEO/GEO opportunity audit written to ${outputDirectory}`);
  console.log(`${audit.pageOpportunities.length} page opportunities; ${audit.queryOpportunities.length} query opportunities.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
