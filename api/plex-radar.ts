import crypto from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { get, list, put } from "@vercel/blob";
import type { RadarFeed } from "../src/data/plex-radar.js";
import {
  BENCHMARKS_VERSION,
  BENCHMARK_WINDOW_DAYS,
  buildBenchmarks,
  type RadarBenchmarks,
} from "../src/lib/plex/radar-benchmarks.js";

const BLOB_PATH = "plex-radar/latest.json";
const RELEASE_PREFIX = "plex-radar/releases/";
const BENCHMARKS_PATH = "plex-radar/benchmarks.json";
const MAX_BYTES = 2_000_000;
const RELEASE_DATE = /^\d{4}-\d{2}-\d{2}$/;
/** Upper bound on releases folded into one benchmark build (daily × window). */
const MAX_BENCHMARK_RELEASES = BENCHMARK_WINDOW_DAYS + 5;

function send(res: ServerResponse, status: number, payload: unknown, cache = "no-store") {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", cache);
  res.end(JSON.stringify(payload));
}

function bearer(req: IncomingMessage) {
  const value = String(req.headers.authorization ?? "");
  return value.startsWith("Bearer ") ? value.slice(7) : "";
}

function safeEqual(a: string, b: string) {
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);
  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
}

function validFeed(value: unknown): value is { release: string; generated_at: string; deals: unknown[] } {
  if (!value || typeof value !== "object") return false;
  const feed = value as { release?: unknown; generated_at?: unknown; deals?: unknown };
  return typeof feed.release === "string" && RELEASE_DATE.test(feed.release)
    && typeof feed.generated_at === "string" && Array.isArray(feed.deals)
    && feed.deals.length > 0 && feed.deals.length <= 1000;
}

function releasePath(release: string) {
  return `${RELEASE_PREFIX}${release}.json`;
}

async function streamBlob(res: ServerResponse, pathname: string) {
  const result = await get(pathname, { access: "private", useCache: false });
  const stream = result?.stream;
  if (!stream) return false;
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    res.write(value);
  }
  res.end();
  return true;
}

async function readJson<T>(pathname: string): Promise<T | null> {
  const result = await get(pathname, { access: "private", useCache: false });
  const stream = result?.stream;
  if (!stream) return null;
  const text = await new Response(stream).text();
  return JSON.parse(text) as T;
}

async function listReleases(): Promise<string[]> {
  const result = await list({ prefix: RELEASE_PREFIX, limit: 500 });
  return result.blobs
    .map((blob) => blob.pathname.slice(RELEASE_PREFIX.length).replace(/\.json$/, ""))
    .filter((release) => RELEASE_DATE.test(release))
    .sort((a, b) => b.localeCompare(a));
}

/**
 * Rebuilds the relative-scoring tables from the trailing window of releases
 * and stores them. Called after each publish and lazily when a reader finds
 * the stored tables missing or behind the latest release.
 */
async function rebuildBenchmarks(releases: string[]): Promise<RadarBenchmarks | null> {
  const latest = releases[0];
  if (!latest) return null;
  const cutoff = Date.parse(`${latest}T00:00:00Z`) - BENCHMARK_WINDOW_DAYS * 86_400_000;
  const window = releases
    .filter((release) => Date.parse(`${release}T00:00:00Z`) >= cutoff)
    .slice(0, MAX_BENCHMARK_RELEASES);
  const feeds = (await Promise.all(window.map((release) => readJson<RadarFeed>(releasePath(release)))))
    .filter((feed): feed is RadarFeed => Boolean(feed && Array.isArray(feed.deals)));
  if (feeds.length === 0) return null;
  const benchmarks = buildBenchmarks(feeds);
  await put(BENCHMARKS_PATH, JSON.stringify(benchmarks), {
    access: "private", contentType: "application/json", allowOverwrite: true,
  });
  return benchmarks;
}

async function currentBenchmarks(): Promise<RadarBenchmarks | null> {
  const releases = await listReleases();
  const stored = await readJson<RadarBenchmarks>(BENCHMARKS_PATH).catch(() => null);
  if (stored && stored.version === BENCHMARKS_VERSION && stored.release === releases[0]) return stored;
  return rebuildBenchmarks(releases);
}

async function body(req: IncomingMessage): Promise<Buffer> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > MAX_BYTES) throw new Error("payload-too-large");
    chunks.push(buffer);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  if (req.method === "GET") {
    try {
      const url = new URL(req.url ?? "/api/plex-radar", "https://www.gestionvelora.com");
      if (url.searchParams.get("history") === "1") {
        return send(res, 200, { releases: await listReleases() }, "no-store");
      }
      if (url.searchParams.get("benchmarks") === "1") {
        const benchmarks = await currentBenchmarks();
        if (!benchmarks) return send(res, 404, { error: "No release published" });
        return send(res, 200, benchmarks, "public, max-age=300, stale-while-revalidate=3600");
      }
      const release = url.searchParams.get("release");
      if (release && !RELEASE_DATE.test(release)) return send(res, 400, { error: "Invalid release date" });
      const found = await streamBlob(res, release ? releasePath(release) : BLOB_PATH);
      if (!found) return send(res, 404, { error: release ? "Release not found" : "No release published" });
      return;
    } catch (error) {
      const incidentId = crypto.randomUUID();
      console.error("plex-radar read failed", { incidentId, error });
      return send(res, 500, { error: "Unable to read release", incident_id: incidentId });
    }
  }

  if (req.method === "POST") {
    const expected = process.env.PLEX_RADAR_PUBLISH_TOKEN ?? "";
    if (!expected || !safeEqual(bearer(req), expected)) return send(res, 401, { error: "Unauthorized" });
    try {
      const raw = await body(req);
      const payload: unknown = JSON.parse(raw.toString("utf-8"));
      if (!validFeed(payload)) return send(res, 400, { error: "Invalid release payload" });
      await put(releasePath(payload.release), raw, { access: "private", contentType: "application/json", allowOverwrite: true });
      const url = new URL(req.url ?? "/api/plex-radar", "https://www.gestionvelora.com");
      const archiveOnly = url.searchParams.get("archive_only") === "1";
      if (!archiveOnly) {
        await put(BLOB_PATH, raw, { access: "private", contentType: "application/json", allowOverwrite: true });
      }
      // Best effort: a benchmark failure must never fail the publish. Readers
      // rebuild lazily if the stored tables lag the latest release.
      let benchmarks: string | null = null;
      try {
        benchmarks = (await rebuildBenchmarks(await listReleases()))?.release ?? null;
      } catch (error) {
        console.error("plex-radar benchmarks rebuild failed", { release: payload.release, error });
      }
      return send(res, 200, {
        release: payload.release, generated_at: payload.generated_at, listings: payload.deals.length,
        archive_only: archiveOnly, benchmarks,
      });
    } catch (error) {
      if (error instanceof Error && error.message === "payload-too-large") return send(res, 413, { error: "Payload too large" });
      const incidentId = crypto.randomUUID();
      console.error("plex-radar publish failed", { incidentId, error });
      return send(res, 500, { error: "Unable to publish release", incident_id: incidentId });
    }
  }

  return send(res, 405, { error: "Method not allowed" });
}

export const config = { maxDuration: 30 };
