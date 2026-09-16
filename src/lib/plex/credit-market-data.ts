export const BOC_GOC_FIVE_YEAR_SERIES = "BD.CDN.5YR.DQ.YLD";
export const BOC_POLICY_RATE_SERIES = "V39079";

export interface MarketDataPoint {
  value: number;
  asOf: string;
  source: "Bank of Canada" | "Yahoo Finance";
  sourceUrl: string;
}

export interface CreditMarketSnapshot {
  gocFiveYear: MarketDataPoint | null;
  policyRate: MarketDataPoint | null;
  brentUsd: MarketDataPoint | null;
  fetchedAt: string;
}

type BocObservation = {
  d?: unknown;
  [series: string]: unknown;
};

function finite(value: unknown): number | null {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function latestBocPoint(
  observations: BocObservation[],
  series: string,
  sourceUrl: string,
): MarketDataPoint | null {
  for (const observation of observations) {
    const raw = observation[series];
    const value = raw && typeof raw === "object"
      ? finite((raw as { v?: unknown }).v)
      : null;
    if (value !== null && typeof observation.d === "string") {
      return { value, asOf: observation.d, source: "Bank of Canada", sourceUrl };
    }
  }
  return null;
}

/** Parse the public Bank of Canada Valet response without trusting its shape. */
export function parseBocMarketData(payload: unknown): Pick<CreditMarketSnapshot, "gocFiveYear" | "policyRate"> {
  const observations = payload && typeof payload === "object"
    && Array.isArray((payload as { observations?: unknown }).observations)
    ? (payload as { observations: BocObservation[] }).observations
    : [];

  return {
    gocFiveYear: latestBocPoint(
      observations,
      BOC_GOC_FIVE_YEAR_SERIES,
      "https://www.bankofcanada.ca/rates/interest-rates/canadian-bonds/",
    ),
    policyRate: latestBocPoint(
      observations,
      BOC_POLICY_RATE_SERIES,
      "https://www.bankofcanada.ca/core-functions/monetary-policy/key-interest-rate/",
    ),
  };
}

/** Parse Yahoo's chart response for the BZ=F Brent futures quote. */
export function parseYahooBrent(payload: unknown): MarketDataPoint | null {
  if (!payload || typeof payload !== "object") return null;
  const chart = (payload as { chart?: unknown }).chart;
  if (!chart || typeof chart !== "object") return null;
  const result = (chart as { result?: unknown }).result;
  if (!Array.isArray(result) || !result[0] || typeof result[0] !== "object") return null;
  const meta = (result[0] as { meta?: unknown }).meta;
  if (!meta || typeof meta !== "object") return null;

  const value = finite((meta as { regularMarketPrice?: unknown }).regularMarketPrice);
  const timestamp = finite((meta as { regularMarketTime?: unknown }).regularMarketTime);
  if (value === null || timestamp === null) return null;
  const asOf = new Date(timestamp * 1000);
  if (!Number.isFinite(asOf.getTime())) return null;

  return {
    value,
    asOf: asOf.toISOString(),
    source: "Yahoo Finance",
    sourceUrl: "https://finance.yahoo.com/quote/BZ%3DF/",
  };
}
