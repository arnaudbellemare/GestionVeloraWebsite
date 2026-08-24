export interface GscMetricRow {
  page?: string;
  query?: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface AuditDataset {
  pages: GscMetricRow[];
  queries: GscMetricRow[];
  pageQueries: GscMetricRow[];
}

export interface AuditPeriod {
  startDate: string;
  endDate: string;
}

export interface AuditOptions {
  minimumImpressions?: number;
  ownerShareThreshold?: number;
  cannibalShareThreshold?: number;
  brandTerms?: string[];
  exactBrandTerms?: string[];
}

export interface PageOpportunity {
  page: string;
  score: number;
  action:
    | "consolidate_or_clarify_ownership"
    | "refresh_existing_page"
    | "metadata_test"
    | "improve_existing_page"
    | "no_action";
  current: GscMetricRow;
  previous: GscMetricRow;
  lostClicks: number;
  ctrOpportunityClicks: number;
  rankOpportunityClicks: number;
  cannibalizedQueries: string[];
}

export interface QueryOpportunity {
  query: string;
  score: number;
  action:
    | "consolidate_or_clarify_ownership"
    | "review_topic_gap"
    | "refresh_existing_page"
    | "metadata_test"
    | "improve_existing_page"
    | "no_action";
  current: GscMetricRow;
  previous: GscMetricRow;
  ownerPage: string;
  ownerShare: number;
  routeRelevance: number;
  clearOwner: boolean;
  cannibalized: boolean;
  competingPages: string[];
  nearMiss: boolean;
  branded: boolean;
  lostClicks: number;
  ctrOpportunityClicks: number;
  rankOpportunityClicks: number;
}

export interface CtrBaseline {
  bucket: string;
  impressions: number;
  ctr: number;
  source: "property" | "fallback";
}

export interface OpportunityAudit {
  pageOpportunities: PageOpportunity[];
  queryOpportunities: QueryOpportunity[];
  ctrBaselines: CtrBaseline[];
  summary: {
    pagesCompared: number;
    queriesCompared: number;
    regressions: number;
    nearMisses: number;
    cannibalizedQueries: number;
    topicGapsToReview: number;
  };
}

const DEFAULT_OPTIONS: Required<AuditOptions> = {
  minimumImpressions: 10,
  ownerShareThreshold: 0.7,
  cannibalShareThreshold: 0.2,
  brandTerms: ["gestion velora", "velora", "gestion valora"],
  exactBrandTerms: ["valora"],
};

const FALLBACK_CTR: Record<string, number> = {
  "1": 0.25,
  "2": 0.15,
  "3": 0.1,
  "4": 0.07,
  "5-7": 0.05,
  "8-10": 0.03,
  "11-20": 0.015,
  "21+": 0.005,
};

const STOP_WORDS = new Set([
  "a", "au", "aux", "avec", "de", "des", "du", "en", "et", "la", "le", "les", "pour", "sur", "un", "une",
  "and", "at", "for", "in", "of", "on", "the", "to", "with", "www", "com", "en", "fr", "services", "service",
]);

function finiteNumber(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number.parseFloat(String(value ?? ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function parseCsv(input: string): Record<string, string>[] {
  const records: string[][] = [];
  let record: string[] = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if (quoted) {
      if (character === '"' && input[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') quoted = false;
      else field += character;
    } else if (character === '"') quoted = true;
    else if (character === ",") {
      record.push(field);
      field = "";
    } else if (character === "\n") {
      record.push(field.replace(/\r$/, ""));
      records.push(record);
      record = [];
      field = "";
    } else field += character;
  }
  if (field || record.length) {
    record.push(field.replace(/\r$/, ""));
    records.push(record);
  }
  const [headers, ...rows] = records.filter((row) => row.some((cell) => cell !== ""));
  if (!headers) return [];
  return rows.map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])));
}

export function parseGscCsv(input: string): GscMetricRow[] {
  return parseCsv(input).map((row) => ({
    page: row.page || undefined,
    query: row.query || undefined,
    clicks: finiteNumber(row.clicks),
    impressions: finiteNumber(row.impressions),
    ctr: finiteNumber(row.ctr),
    position: finiteNumber(row.position),
  }));
}

function emptyMetric(page?: string, query?: string): GscMetricRow {
  return { page, query, clicks: 0, impressions: 0, ctr: 0, position: 0 };
}

function metricMap(rows: GscMetricRow[], key: "page" | "query"): Map<string, GscMetricRow> {
  const map = new Map<string, GscMetricRow>();
  for (const row of rows) {
    const value = row[key];
    if (value) map.set(value, row);
  }
  return map;
}

function positionBucket(position: number): string {
  if (position <= 1.5) return "1";
  if (position <= 2.5) return "2";
  if (position <= 3.5) return "3";
  if (position <= 4.5) return "4";
  if (position <= 7.5) return "5-7";
  if (position <= 10.5) return "8-10";
  if (position <= 20.5) return "11-20";
  return "21+";
}

function buildCtrBaselines(rows: GscMetricRow[]): CtrBaseline[] {
  const totals = new Map<string, { clicks: number; impressions: number }>();
  for (const row of rows) {
    const bucket = positionBucket(row.position);
    const current = totals.get(bucket) ?? { clicks: 0, impressions: 0 };
    current.clicks += row.clicks;
    current.impressions += row.impressions;
    totals.set(bucket, current);
  }
  return Object.keys(FALLBACK_CTR).map((bucket) => {
    const total = totals.get(bucket) ?? { clicks: 0, impressions: 0 };
    const hasEnoughPropertyData = total.impressions >= 100;
    return {
      bucket,
      impressions: total.impressions,
      ctr: hasEnoughPropertyData ? total.clicks / total.impressions : FALLBACK_CTR[bucket],
      source: hasEnoughPropertyData ? "property" : "fallback",
    };
  });
}

function expectedCtr(position: number, baselines: CtrBaseline[]): number {
  return baselines.find((baseline) => baseline.bucket === positionBucket(position))?.ctr ?? 0;
}

function targetCtr(baselines: CtrBaseline[]): number {
  return baselines.find((baseline) => baseline.bucket === "4")?.ctr ?? FALLBACK_CTR["4"];
}

function opportunityMetrics(row: GscMetricRow, previous: GscMetricRow, baselines: CtrBaseline[]) {
  const lostClicks = Math.max(0, previous.clicks - row.clicks);
  const ctrOpportunityClicks = Math.max(0, (expectedCtr(row.position, baselines) - row.ctr) * row.impressions);
  const rankOpportunityClicks = row.position >= 5 && row.position <= 20
    ? Math.max(0, (targetCtr(baselines) - expectedCtr(row.position, baselines)) * row.impressions)
    : 0;
  return { lostClicks, ctrOpportunityClicks, rankOpportunityClicks };
}

function normalized(value: number, maximum: number): number {
  return maximum > 0 ? Math.min(1, value / maximum) : 0;
}

function normalizedTokens(value: string): string[] {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function normalizedPhrase(value: string): string {
  return normalizedTokens(value).join(" ");
}

function isBrandedQuery(query: string, options: Required<AuditOptions>): boolean {
  const normalizedQuery = normalizedPhrase(query);
  return options.brandTerms.some((term) => normalizedQuery.includes(normalizedPhrase(term)))
    || options.exactBrandTerms.some((term) => normalizedQuery === normalizedPhrase(term));
}

function pathname(page: string): string {
  try {
    return decodeURIComponent(new URL(page).pathname);
  } catch {
    return page;
  }
}

export function routeRelevance(query: string, page: string): number {
  const queryTokens = [...new Set(normalizedTokens(query))];
  if (!queryTokens.length) return 0;
  const pageTokens = new Set(normalizedTokens(pathname(page)));
  const matches = queryTokens.filter((token) => pageTokens.has(token)).length;
  return matches / queryTokens.length;
}

function queryOwnership(
  pageQueries: GscMetricRow[],
  queries: GscMetricRow[],
  options: Required<AuditOptions>,
): Map<string, Omit<QueryOpportunity, "score" | "action" | "current" | "previous" | "nearMiss" | "branded" | "lostClicks" | "ctrOpportunityClicks" | "rankOpportunityClicks">> {
  const grouped = new Map<string, GscMetricRow[]>();
  const queryMetrics = metricMap(queries, "query");
  for (const row of pageQueries) {
    if (!row.query || !row.page || row.impressions <= 0) continue;
    const rows = grouped.get(row.query) ?? [];
    rows.push(row);
    grouped.set(row.query, rows);
  }

  const ownership = new Map();
  for (const [query, rows] of grouped) {
    const sorted = rows.slice().sort((a, b) => b.impressions - a.impressions);
    const total = sorted.reduce((sum, row) => sum + row.impressions, 0);
    const first = sorted[0];
    const ownerShare = total > 0 ? first.impressions / total : 0;
    const relevance = routeRelevance(query, first.page ?? "");
    const secondShare = sorted[1] && total > 0 ? sorted[1].impressions / total : 0;
    const fallbackCtr = total > 0 ? sorted.reduce((sum, row) => sum + row.clicks, 0) / total : 0;
    const fallbackPosition = total > 0
      ? sorted.reduce((sum, row) => sum + row.position * row.impressions, 0) / total
      : 0;
    // GSC can report a different impression total for [page, query] than for
    // [query]. Use the query aggregate to judge performance and the page rows
    // only to detect split ownership.
    const queryMetric = queryMetrics.get(query);
    const combinedCtr = queryMetric?.ctr ?? fallbackCtr;
    const weightedPosition = queryMetric?.position ?? fallbackPosition;
    const cannibalized = Boolean(
      sorted[1]
      && sorted[1].impressions >= Math.max(5, options.minimumImpressions / 2)
      && secondShare >= options.cannibalShareThreshold
      && (weightedPosition > 4 || combinedCtr < 0.02)
    );
    ownership.set(query, {
      query,
      ownerPage: first.page ?? "",
      ownerShare,
      routeRelevance: relevance,
      clearOwner: ownerShare >= options.ownerShareThreshold && relevance >= 0.25,
      cannibalized,
      competingPages: cannibalized ? sorted.slice(0, 3).map((row) => row.page ?? "") : [],
    });
  }
  return ownership;
}

function pageAction(opportunity: Omit<PageOpportunity, "score" | "action">): PageOpportunity["action"] {
  if (opportunity.cannibalizedQueries.length) return "consolidate_or_clarify_ownership";
  if (opportunity.lostClicks >= Math.max(1, opportunity.previous.clicks * 0.2)) return "refresh_existing_page";
  if (opportunity.ctrOpportunityClicks > opportunity.rankOpportunityClicks && opportunity.ctrOpportunityClicks >= 1) {
    return "metadata_test";
  }
  if (opportunity.rankOpportunityClicks > 0) return "improve_existing_page";
  return "no_action";
}

function queryAction(opportunity: Omit<QueryOpportunity, "score" | "action">): QueryOpportunity["action"] {
  if (opportunity.cannibalized) return "consolidate_or_clarify_ownership";
  if (opportunity.nearMiss && !opportunity.clearOwner && !opportunity.branded) return "review_topic_gap";
  if (opportunity.lostClicks >= Math.max(1, opportunity.previous.clicks * 0.2)) return "refresh_existing_page";
  if (opportunity.ctrOpportunityClicks > opportunity.rankOpportunityClicks && opportunity.ctrOpportunityClicks >= 1) {
    return "metadata_test";
  }
  if (opportunity.rankOpportunityClicks > 0) return "improve_existing_page";
  return "no_action";
}

export function analyzeOpportunities(
  current: AuditDataset,
  previous: AuditDataset,
  requestedOptions: AuditOptions = {},
): OpportunityAudit {
  const options: Required<AuditOptions> = {
    minimumImpressions: requestedOptions.minimumImpressions ?? DEFAULT_OPTIONS.minimumImpressions,
    ownerShareThreshold: requestedOptions.ownerShareThreshold ?? DEFAULT_OPTIONS.ownerShareThreshold,
    cannibalShareThreshold: requestedOptions.cannibalShareThreshold ?? DEFAULT_OPTIONS.cannibalShareThreshold,
    brandTerms: requestedOptions.brandTerms ?? DEFAULT_OPTIONS.brandTerms,
    exactBrandTerms: requestedOptions.exactBrandTerms ?? DEFAULT_OPTIONS.exactBrandTerms,
  };
  const baselines = buildCtrBaselines(current.queries);
  const ownership = queryOwnership(current.pageQueries, current.queries, options);
  const currentPages = metricMap(current.pages, "page");
  const previousPages = metricMap(previous.pages, "page");
  const currentQueries = metricMap(current.queries, "query");
  const previousQueries = metricMap(previous.queries, "query");

  const cannibalizationByPage = new Map<string, string[]>();
  for (const [query, owner] of ownership) {
    if (!owner.cannibalized) continue;
    for (const page of owner.competingPages) {
      const queries = cannibalizationByPage.get(page) ?? [];
      queries.push(query);
      cannibalizationByPage.set(page, queries);
    }
  }

  const rawPages: Omit<PageOpportunity, "score" | "action">[] = [];
  for (const page of new Set([...currentPages.keys(), ...previousPages.keys()])) {
    const currentRow = currentPages.get(page) ?? emptyMetric(page);
    const previousRow = previousPages.get(page) ?? emptyMetric(page);
    if (Math.max(currentRow.impressions, previousRow.impressions) < options.minimumImpressions) continue;
    rawPages.push({
      page,
      current: currentRow,
      previous: previousRow,
      ...opportunityMetrics(currentRow, previousRow, baselines),
      cannibalizedQueries: cannibalizationByPage.get(page) ?? [],
    });
  }
  const maxPageLost = Math.max(0, ...rawPages.map((row) => row.lostClicks));
  const maxPageCtr = Math.max(0, ...rawPages.map((row) => row.ctrOpportunityClicks));
  const maxPageRank = Math.max(0, ...rawPages.map((row) => row.rankOpportunityClicks));
  const pageOpportunities = rawPages.map((row) => ({
    ...row,
    score: Math.round(
      normalized(row.lostClicks, maxPageLost) * 40
      + normalized(row.ctrOpportunityClicks, maxPageCtr) * 25
      + normalized(row.rankOpportunityClicks, maxPageRank) * 25
      + (row.cannibalizedQueries.length ? 10 : 0),
    ),
    action: pageAction(row),
  })).filter((row) => row.action !== "no_action").sort((a, b) => b.score - a.score);

  const rawQueries: Omit<QueryOpportunity, "score" | "action">[] = [];
  for (const query of new Set([...currentQueries.keys(), ...previousQueries.keys()])) {
    const currentRow = currentQueries.get(query) ?? emptyMetric(undefined, query);
    const previousRow = previousQueries.get(query) ?? emptyMetric(undefined, query);
    if (Math.max(currentRow.impressions, previousRow.impressions) < options.minimumImpressions) continue;
    const owner = ownership.get(query) ?? {
      query,
      ownerPage: "",
      ownerShare: 0,
      routeRelevance: 0,
      clearOwner: false,
      cannibalized: false,
      competingPages: [],
    };
    rawQueries.push({
      query,
      current: currentRow,
      previous: previousRow,
      ...owner,
      nearMiss: currentRow.position >= 5 && currentRow.position <= 20,
      branded: isBrandedQuery(query, options),
      ...opportunityMetrics(currentRow, previousRow, baselines),
    });
  }
  const maxQueryLost = Math.max(0, ...rawQueries.map((row) => row.lostClicks));
  const maxQueryCtr = Math.max(0, ...rawQueries.map((row) => row.ctrOpportunityClicks));
  const maxQueryRank = Math.max(0, ...rawQueries.map((row) => row.rankOpportunityClicks));
  const maxQueryImpressions = Math.max(0, ...rawQueries.map((row) => row.current.impressions));
  const queryOpportunities = rawQueries.map((row) => ({
    ...row,
    score: Math.round(
      normalized(row.lostClicks, maxQueryLost) * 30
      + normalized(row.ctrOpportunityClicks, maxQueryCtr) * 20
      + normalized(row.rankOpportunityClicks, maxQueryRank) * 25
      + normalized(row.current.impressions, maxQueryImpressions) * 10
      + (row.cannibalized ? 10 : 0)
      + (row.nearMiss && !row.clearOwner && !row.branded ? 5 : 0),
    ),
    action: queryAction(row),
  })).filter((row) => row.action !== "no_action").sort((a, b) => b.score - a.score);

  return {
    pageOpportunities,
    queryOpportunities,
    ctrBaselines: baselines,
    summary: {
      pagesCompared: rawPages.length,
      queriesCompared: rawQueries.length,
      regressions: rawPages.filter((row) => row.lostClicks > 0).length,
      nearMisses: rawQueries.filter((row) => row.nearMiss).length,
      cannibalizedQueries: rawQueries.filter((row) => row.cannibalized).length,
      topicGapsToReview: rawQueries.filter((row) => row.nearMiss && !row.clearOwner && !row.cannibalized && !row.branded).length,
    },
  };
}
