import crypto from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { get, put } from "@vercel/blob";

const BLOB_PATH = "plex-radar/latest.json";
const MAX_BYTES = 2_000_000;

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
  return typeof feed.release === "string" && /^\d{4}-\d{2}-\d{2}$/.test(feed.release)
    && typeof feed.generated_at === "string" && Array.isArray(feed.deals)
    && feed.deals.length > 0 && feed.deals.length <= 1000;
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
      const result = await get(BLOB_PATH, { access: "private", useCache: false });
      if (!result) return send(res, 404, { error: "No release published" });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
      const reader = result.stream.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
      return void res.end();
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
      await put(BLOB_PATH, raw, { access: "private", contentType: "application/json", allowOverwrite: true });
      return send(res, 200, { release: payload.release, generated_at: payload.generated_at, listings: payload.deals.length });
    } catch (error) {
      if (error instanceof Error && error.message === "payload-too-large") return send(res, 413, { error: "Payload too large" });
      const incidentId = crypto.randomUUID();
      console.error("plex-radar publish failed", { incidentId, error });
      return send(res, 500, { error: "Unable to publish release", incident_id: incidentId });
    }
  }

  return send(res, 405, { error: "Method not allowed" });
}

export const config = { maxDuration: 15 };
