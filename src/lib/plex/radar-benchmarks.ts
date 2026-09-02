import type { RadarDeal, RadarFeed, RadarMetrics } from "../../data/plex-radar";
import {
  CMHC_SURVEY_PERIOD,
  CMHC_SURVEY_PERIOD_EN,
  cmhcCoveredAreas,
  isLowReliability,
  lookupCmhcRent,
  type CmhcGeoLevel,
  type CmhcReliability,
} from "./cmhc-rents.js";

/**
 * Relative market benchmarks for Plex Radar.
 *
 * The published grade uses absolute thresholds (an 8% cap rate for a
 * residential plex) that Quebec listings almost never meet: across the first
 * two months of releases the median asking cap rate on the island of Montréal
 * was 2.9%, so 90% of the feed graded "avoid" and the ranking carried almost no
 * information. This module ranks each listing against the trailing window of
 * listings in the same region and unit class instead, and keeps the absolute
 * grade as a secondary signal.
 *
 * Benchmarks are computed server-side from the archived releases and stored as
 * quantile tables (21 points per metric per pool) so the page downloads a few
 * kilobytes rather than the ~350 KB per daily release.
 */

export const BENCHMARKS_VERSION = "plex-radar-benchmarks/1.0.0";
export const BENCHMARK_WINDOW_DAYS = 60;
/** Below this many listings a pool is skipped and a broader one is used. */
export const BENCHMARK_MIN_SAMPLE = 15;
export const QUANTILE_POINTS = 21;

export type BenchmarkMetricKey = "capRate" | "cashFlowPerDoor" | "pricePerDoor" | "grm";
export type BenchmarkClass = "residential" | "commercial";
export type PoolScope = "region" | "class" | "all";

export const BENCHMARK_METRICS: BenchmarkMetricKey[] = ["capRate", "cashFlowPerDoor", "pricePerDoor", "grm"];

/** Metrics where a lower value is the better outcome for the buyer. */
const LOWER_IS_BETTER: Record<BenchmarkMetricKey, boolean> = {
  capRate: false,
  cashFlowPerDoor: false,
  pricePerDoor: true,
  grm: true,
};

export type BenchmarkPool = {
  key: string;
  region: string | null;
  class: BenchmarkClass | null;
  count: number;
  /** Ascending values at percentiles 0, 5, 10 … 100. */
  quantiles: Record<BenchmarkMetricKey, number[]>;
  medians: Record<BenchmarkMetricKey, number>;
};

export type RadarBenchmarks = {
  version: string;
  /** Latest release folded into the window; the cache key on the server. */
  release: string;
  generated_at: string;
  window_days: number;
  releases: string[];
  listing_count: number;
  pools: Record<string, BenchmarkPool>;
};

export function dealClass(deal: Pick<RadarDeal, "listing">): BenchmarkClass {
  const listing = deal.listing;
  return listing.units >= 5 || Boolean(listing.mixed_use) || (listing.commercial_units ?? 0) > 0
    ? "commercial"
    : "residential";
}

export function poolKey(region: string | null, klass: BenchmarkClass | null): string {
  return `${region ?? "*"}|${klass ?? "*"}`;
}

type Sample = Record<BenchmarkMetricKey, number>;

function sampleOf(deal: RadarDeal): Sample | null {
  if (deal.status !== "underwritten") return null;
  const gross = deal.listing.potential_gross_income ?? 0;
  if (gross <= 0 || deal.listing.price <= 0 || deal.listing.units <= 0) return null;
  const n = (key: string) => Number(deal.metrics[key]);
  const capRate = n("cap_rate");
  const cashFlowPerDoor = n("monthly_cash_flow_per_door");
  const pricePerDoor = Number.isFinite(n("price_per_door")) && n("price_per_door") > 0
    ? n("price_per_door")
    : deal.listing.price / deal.listing.units;
  const grm = Number.isFinite(n("grm")) && n("grm") > 0 ? n("grm") : deal.listing.price / gross;
  if (![capRate, cashFlowPerDoor, pricePerDoor, grm].every(Number.isFinite)) return null;
  return { capRate, cashFlowPerDoor, pricePerDoor, grm };
}

/** Linear-interpolated quantiles of an ascending array. */
export function quantiles(sorted: number[], points = QUANTILE_POINTS): number[] {
  if (sorted.length === 0) return [];
  if (sorted.length === 1) return Array.from({ length: points }, () => sorted[0]);
  return Array.from({ length: points }, (_, index) => {
    const position = (index / (points - 1)) * (sorted.length - 1);
    const lower = Math.floor(position);
    const upper = Math.min(sorted.length - 1, lower + 1);
    const weight = position - lower;
    return sorted[lower] + (sorted[upper] - sorted[lower]) * weight;
  });
}

function releaseWithinWindow(release: string, latest: string, windowDays: number): boolean {
  const gap = (Date.parse(`${latest}T00:00:00Z`) - Date.parse(`${release}T00:00:00Z`)) / 86_400_000;
  return Number.isFinite(gap) && gap >= 0 && gap <= windowDays;
}

/**
 * Folds trailing releases into quantile tables. A listing republished across
 * several releases counts once, at its most recent underwriting.
 */
export function buildBenchmarks(feeds: RadarFeed[], windowDays = BENCHMARK_WINDOW_DAYS): RadarBenchmarks {
  const ordered = [...feeds].sort((a, b) => b.release.localeCompare(a.release));
  const latest = ordered[0]?.release ?? "";
  const inWindow = ordered.filter((feed) => releaseWithinWindow(feed.release, latest, windowDays));
  const seen = new Map<string, { sample: Sample; region: string; klass: BenchmarkClass }>();
  for (const feed of inWindow) {
    for (const deal of feed.deals) {
      const id = deal.listing.listing_id;
      if (seen.has(id)) continue;
      const sample = sampleOf(deal);
      if (!sample) continue;
      seen.set(id, { sample, region: deal.listing.region || "Autre", klass: dealClass(deal) });
    }
  }

  const buckets = new Map<string, { region: string | null; klass: BenchmarkClass | null; samples: Sample[] }>();
  const push = (region: string | null, klass: BenchmarkClass | null, sample: Sample) => {
    const key = poolKey(region, klass);
    const bucket = buckets.get(key) ?? { region, klass, samples: [] };
    bucket.samples.push(sample);
    buckets.set(key, bucket);
  };
  for (const { sample, region, klass } of seen.values()) {
    push(region, klass, sample);
    push(null, klass, sample);
    push(null, null, sample);
  }

  const pools: Record<string, BenchmarkPool> = {};
  for (const [key, bucket] of buckets) {
    if (bucket.samples.length < 2) continue;
    const table = {} as Record<BenchmarkMetricKey, number[]>;
    const medians = {} as Record<BenchmarkMetricKey, number>;
    for (const metric of BENCHMARK_METRICS) {
      const sorted = bucket.samples.map((sample) => sample[metric]).sort((a, b) => a - b);
      // Six significant digits keep the stored tables small without moving a
      // percentile: cap rates carry four decimals, dollar figures the cents.
      table[metric] = quantiles(sorted).map((value) => Number(value.toPrecision(6)));
      medians[metric] = table[metric][Math.floor(QUANTILE_POINTS / 2)];
    }
    pools[key] = { key, region: bucket.region, class: bucket.klass, count: bucket.samples.length, quantiles: table, medians };
  }

  return {
    version: BENCHMARKS_VERSION,
    release: latest,
    generated_at: new Date().toISOString(),
    window_days: windowDays,
    releases: inWindow.map((feed) => feed.release),
    listing_count: seen.size,
    pools,
  };
}

/**
 * Share of the pool that a value beats, 0–100, read off the quantile table by
 * linear interpolation. Ties inside a flat run resolve to the run's midpoint so
 * a value equal to the median reads as 50, not 0 or 100.
 */
export function percentileOf(table: number[], value: number): number {
  if (table.length === 0 || !Number.isFinite(value)) return 50;
  const last = table.length - 1;
  if (value < table[0]) return 0;
  if (value > table[last]) return 100;
  const toPercent = (position: number) => Math.round((position / last) * 1000) / 10;
  // Last index whose value does not exceed the sample.
  let low = 0;
  while (low < last && table[low + 1] <= value) low += 1;
  if (table[low] === value) {
    let first = low;
    while (first > 0 && table[first - 1] === value) first -= 1;
    return toPercent((first + low) / 2);
  }
  const fraction = (value - table[low]) / (table[low + 1] - table[low]);
  return toPercent(low + fraction);
}

export type ResolvedPool = { pool: BenchmarkPool; scope: PoolScope };

/** Region and class first; falls back to province-wide same class, then everything. */
export function resolvePool(benchmarks: RadarBenchmarks, region: string, klass: BenchmarkClass, minSample = BENCHMARK_MIN_SAMPLE): ResolvedPool | null {
  const candidates: Array<[string, PoolScope]> = [
    [poolKey(region, klass), "region"],
    [poolKey(null, klass), "class"],
    [poolKey(null, null), "all"],
  ];
  for (const [key, scope] of candidates) {
    const pool = benchmarks.pools[key];
    if (pool && pool.count >= minSample) return { pool, scope };
  }
  const any = benchmarks.pools[poolKey(null, null)];
  return any ? { pool: any, scope: "all" } : null;
}

export type RelativeTier = "top" | "above" | "inline" | "below";

export type RelativeComponent = {
  key: "yield" | "cashFlow" | "price";
  metric: BenchmarkMetricKey;
  value: number;
  median: number;
  /** 0–100, already oriented so higher is better for the buyer. */
  percentile: number;
};

export type RelativeRank = {
  score: number;
  tier: RelativeTier;
  components: RelativeComponent[];
  pool: { scope: PoolScope; region: string | null; class: BenchmarkClass | null; count: number };
};

export function relativeTier(score: number): RelativeTier {
  if (score >= 80) return "top";
  if (score >= 60) return "above";
  if (score >= 40) return "inline";
  return "below";
}

/**
 * Ranks a listing's metrics against its pool. Three components carry equal
 * weight: yield (cap rate), cash flow per door and price per door. GRM is
 * published in the tables for reference but not scored, since it moves with
 * the cap rate and would double-count price.
 */
export function relativeRank(deal: RadarDeal, metrics: RadarMetrics, benchmarks: RadarBenchmarks | null): RelativeRank | null {
  if (!benchmarks) return null;
  const resolved = resolvePool(benchmarks, deal.listing.region || "Autre", dealClass(deal));
  if (!resolved) return null;
  const { pool, scope } = resolved;
  const oriented = (metric: BenchmarkMetricKey, value: number) => {
    const raw = percentileOf(pool.quantiles[metric], value);
    return LOWER_IS_BETTER[metric] ? Math.round((100 - raw) * 10) / 10 : raw;
  };
  const pricePerDoor = deal.listing.price / Math.max(1, deal.listing.units);
  const components: RelativeComponent[] = [
    { key: "yield", metric: "capRate", value: metrics.capRate, median: pool.medians.capRate, percentile: oriented("capRate", metrics.capRate) },
    { key: "cashFlow", metric: "cashFlowPerDoor", value: metrics.cashFlowPerDoor, median: pool.medians.cashFlowPerDoor, percentile: oriented("cashFlowPerDoor", metrics.cashFlowPerDoor) },
    { key: "price", metric: "pricePerDoor", value: pricePerDoor, median: pool.medians.pricePerDoor, percentile: oriented("pricePerDoor", pricePerDoor) },
  ];
  const score = Math.round(components.reduce((sum, component) => sum + component.percentile, 0) / components.length);
  return {
    score,
    tier: relativeTier(score),
    components,
    pool: { scope, region: pool.region, class: pool.class, count: pool.count },
  };
}

// ─── CMHC rent benchmark ─────────────────────────────────────────────────────

/**
 * Bedroom counts of the calculator's typical unit mix per door count, used to
 * weight the CMHC bedroom-type averages when a listing only discloses total
 * income. Mirrors PROPERTY_PRESETS in calculator.ts (asserted by the test
 * script) without pulling the whole calculator into the Radar bundle.
 */
export const TYPICAL_BEDROOMS: Record<"duplex" | "triplex" | "quadruplex" | "fiveplex-plus", number[]> = {
  duplex: [3, 2],
  triplex: [2, 3, 3],
  quadruplex: [1, 2, 2, 3],
  "fiveplex-plus": [1, 1, 2, 2, 2, 3],
};

export function typicalMixFor(units: number): number[] {
  if (units <= 2) return TYPICAL_BEDROOMS.duplex;
  if (units === 3) return TYPICAL_BEDROOMS.triplex;
  if (units === 4) return TYPICAL_BEDROOMS.quadruplex;
  return TYPICAL_BEDROOMS["fiveplex-plus"];
}

/** Regions whose whole territory sits inside the Montréal CMA survey. */
const CMA_REGIONS = new Set(["Montréal (Île)", "Laval"]);

/**
 * Whether the Montréal CMA survey is a valid benchmark for a listing: either
 * the city maps to a surveyed area, or it sits on the island or in Laval where
 * the CMA average applies as a fallback. Everything else (Québec, Estrie…) has
 * no benchmark in this dataset and must say so rather than borrow Montréal's.
 */
export function cmhcBenchmarkApplies(region: string, areaKey: string): boolean {
  return CMA_REGIONS.has(region) || cmhcCoveredAreas().includes(areaKey);
}

export type RentSignal =
  | {
    applies: true;
    /** Advertised gross income divided by doors and months. */
    inPlaceRent: number;
    /** CMHC average for the typical mix, weighted by bedroom count. */
    benchmarkRent: number;
    /** Positive when in-place rents sit below the CMHC average. */
    gapPct: number;
    /** Annual gross income added if every door reached the benchmark; 0 when above. */
    upsideAnnual: number;
    /** Cap rate at asking price if that upside flowed through at policy margins. */
    capAtBenchmark: number;
    geography: string;
    level: CmhcGeoLevel;
    reliability: CmhcReliability;
    lowReliability: boolean;
    surveyPeriod: { fr: string; en: string };
  }
  | { applies: false; reason: "no-benchmark" | "no-income" };

/**
 * Compares a listing's in-place average rent with the CMHC survey average for
 * its area. Only doors below the benchmark create upside: a sitting tenant's
 * rent cannot be reduced, so a building above the average simply has less
 * room to grow. The margin on added income nets out vacancy, management and
 * the repairs share from the deal's own assumptions.
 */
export function cmhcRentSignal(deal: RadarDeal, areaKey: string, metrics: Pick<RadarMetrics, "noi">): RentSignal {
  const listing = deal.listing;
  const gross = listing.potential_gross_income ?? 0;
  if (gross <= 0 || listing.units <= 0) return { applies: false, reason: "no-income" };
  if (!cmhcBenchmarkApplies(listing.region, areaKey)) return { applies: false, reason: "no-benchmark" };

  const mix = typicalMixFor(listing.units);
  const points = mix.map((bedrooms) => lookupCmhcRent(areaKey, bedrooms));
  const benchmarkRent = points.reduce((sum, point) => sum + point.rent, 0) / points.length;
  const finest = [...points].sort((a, b) => levelRank(a.level) - levelRank(b.level))[0];
  const reliability = points.map((point) => point.reliability).sort()[points.length - 1];
  const inPlaceRent = gross / listing.units / 12;
  const gapPct = (benchmarkRent - inPlaceRent) / benchmarkRent;
  const upsideAnnual = Math.max(0, benchmarkRent - inPlaceRent) * listing.units * 12;
  const assumption = (key: string, fallback: number) => {
    const value = Number(deal.assumptions?.[key]);
    return Number.isFinite(value) && value >= 0 && value < 1 ? value : fallback;
  };
  const margin = 1 - assumption("vacancy_rate", 0.03) - assumption("management_pct", 0.05) - assumption("repairs_pct", 0.08);
  const capAtBenchmark = listing.price > 0 ? (metrics.noi + upsideAnnual * margin) / listing.price : 0;

  return {
    applies: true,
    inPlaceRent,
    benchmarkRent,
    gapPct,
    upsideAnnual,
    capAtBenchmark,
    geography: finest.geography,
    level: finest.level,
    reliability,
    lowReliability: isLowReliability(reliability),
    surveyPeriod: { fr: CMHC_SURVEY_PERIOD, en: CMHC_SURVEY_PERIOD_EN },
  };
}

function levelRank(level: CmhcGeoLevel): number {
  return level === "neighbourhood" ? 0 : level === "zone" ? 1 : 2;
}
