import crypto from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import {
  BOC_GOC_FIVE_YEAR_SERIES,
  BOC_POLICY_RATE_SERIES,
  parseBocMarketData,
  parseYahooBrent,
  type CreditMarketSnapshot,
} from "../src/lib/plex/credit-market-data.js";

const BOC_URL = `https://www.bankofcanada.ca/valet/observations/${BOC_GOC_FIVE_YEAR_SERIES},${BOC_POLICY_RATE_SERIES}/json?recent=10`;
const BRENT_URL = "https://query2.finance.yahoo.com/v8/finance/chart/BZ%3DF?range=5d&interval=1d";

function send(res: ServerResponse, status: number, payload: unknown, cache = "no-store") {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", cache);
  res.end(JSON.stringify(payload));
}

async function json(url: string, signal: AbortSignal, headers?: Record<string, string>): Promise<unknown> {
  const response = await fetch(url, { signal, headers });
  if (!response.ok) throw new Error(`upstream-${response.status}`);
  return response.json() as Promise<unknown>;
}

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  if (req.method !== "GET") return send(res, 405, { error: "Method not allowed" });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const [bocResult, brentResult] = await Promise.allSettled([
      json(BOC_URL, controller.signal),
      json(BRENT_URL, controller.signal, { "User-Agent": "GestionVelora/1.0" }),
    ]);
    const boc = bocResult.status === "fulfilled"
      ? parseBocMarketData(bocResult.value)
      : { gocFiveYear: null, policyRate: null };
    const brentUsd = brentResult.status === "fulfilled" ? parseYahooBrent(brentResult.value) : null;
    const snapshot: CreditMarketSnapshot = {
      ...boc,
      brentUsd,
      fetchedAt: new Date().toISOString(),
    };

    if (!snapshot.gocFiveYear && !snapshot.policyRate && !snapshot.brentUsd) {
      const incidentId = crypto.randomUUID();
      console.error("credit-market upstreams unavailable", {
        incidentId,
        boc: bocResult.status === "rejected" ? bocResult.reason : "empty",
        brent: brentResult.status === "rejected" ? brentResult.reason : "empty",
      });
      return send(res, 502, { error: "Market data unavailable", incident_id: incidentId });
    }

    return send(res, 200, snapshot, "public, max-age=900, stale-while-revalidate=3600");
  } catch (error) {
    const incidentId = crypto.randomUUID();
    console.error("credit-market request failed", { incidentId, error });
    return send(res, 500, { error: "Unable to load market data", incident_id: incidentId });
  } finally {
    clearTimeout(timeout);
  }
}

export const config = { maxDuration: 10 };
