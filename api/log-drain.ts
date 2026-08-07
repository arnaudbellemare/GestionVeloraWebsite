import crypto from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { put } from "@vercel/blob";

/**
 * Vercel Log Drain receiver.
 *
 * Vercel POSTs batches of log entries here. We keep only crawler traffic and
 * persist it to Blob so bot activity is answerable after the fact — `vercel
 * logs` is a five-minute live tail, which cannot characterise a multi-hour
 * crawl pattern.
 *
 * The drain's own `proxy.clientIp` / `proxy.userAgent` are the useful fields:
 * they are present on `static` entries, so this captures CDN-served prerendered
 * pages that never invoke a function and therefore emit no runtime log of their
 * own. That is strictly more coverage than the middleware's CRAWLER lines,
 * which are still accepted here so both paths land in the same place.
 *
 * Contract (vercel.com/docs/drains/security):
 *   - `x-vercel-signature` is HMAC-SHA1 of the raw body, hex, keyed by the
 *     drain's signature secret.
 *   - The endpoint must answer 200 or Vercel marks the drain errored.
 */

const CRAWLER_UA_RE =
  /(meta-external|meta-webindexer|facebookexternalhit|facebookbot|WhatsApp|Twitterbot|Discordbot|Slackbot|TelegramBot|Googlebot|Google-Extended|Bingbot|GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-SearchBot|anthropic-ai|PerplexityBot|Perplexity-User|CCBot|Applebot|Bytespider|Amazonbot)/i;

/** Our own endpoint — never record it, or the drain feeds itself. */
const SELF_PATH = "/api/log-drain";

interface CrawlerRecord {
  ip: string;
  ua: string;
  path: string;
  ts: string;
  status?: number;
  source?: string;
}

function timingSafeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/** Accept both delivery formats: NDJSON, and JSON that may be an array. */
function parseEntries(raw: string): unknown[] {
  const trimmed = raw.trim();
  if (!trimmed) return [];

  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && typeof parsed === "object") return [parsed];
  } catch {
    /* not a single JSON document — fall through to line-delimited */
  }

  const out: unknown[] = [];
  for (const line of trimmed.split("\n")) {
    const s = line.trim();
    if (!s) continue;
    try {
      out.push(JSON.parse(s));
    } catch {
      /* skip malformed line rather than drop the whole batch */
    }
  }
  return out;
}

function toRecord(entry: Record<string, any>): CrawlerRecord | null {
  const proxy = entry.proxy ?? {};
  const path: string = proxy.path ?? entry.path ?? "";
  if (path.startsWith(SELF_PATH)) return null;

  const ts = new Date(proxy.timestamp ?? entry.timestamp ?? Date.now()).toISOString();

  // Preferred: the drain's own request metadata, present even for static hits.
  const uaField = proxy.userAgent;
  const ua = Array.isArray(uaField) ? uaField.join(" ") : (uaField ?? "");
  if (ua && CRAWLER_UA_RE.test(ua)) {
    return {
      ip: proxy.clientIp ?? "unknown",
      ua,
      path,
      ts,
      status: proxy.statusCode ?? entry.statusCode,
      source: entry.source,
    };
  }

  // Fallback: a CRAWLER line emitted by middleware.ts.
  const message: string = typeof entry.message === "string" ? entry.message : "";
  const i = message.indexOf("CRAWLER {");
  if (i !== -1) {
    try {
      const payload = JSON.parse(message.slice(i + "CRAWLER ".length));
      if (payload?.ip) {
        return {
          ip: payload.ip,
          ua: payload.ua ?? "",
          path: payload.path ?? path,
          ts: payload.ts ?? ts,
          source: entry.source,
        };
      }
    } catch {
      /* truncated message */
    }
  }

  return null;
}

/**
 * Body parsing is disabled so the exact bytes Vercel signed reach the HMAC.
 * Anything that re-serialises the payload first would change the digest.
 */
export const config = { api: { bodyParser: false } };

function readRawBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer | string) =>
      chunks.push(typeof c === "string" ? Buffer.from(c) : c)
    );
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function send(res: ServerResponse, status: number, payload: unknown): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  if (req.method !== "POST") {
    return send(res, 405, { error: "method not allowed" });
  }

  const rawBuf = await readRawBody(req);
  const raw = rawBuf.toString("utf-8");

  const secret = process.env.LOG_DRAIN_SECRET;
  if (!secret) {
    // Fail closed: without the secret we cannot tell Vercel from anyone else.
    console.error("log-drain: LOG_DRAIN_SECRET is not set; rejecting delivery");
    return send(res, 500, { error: "not configured" });
  }

  const expected = crypto.createHmac("sha1", secret).update(rawBuf).digest("hex");
  const provided = (req.headers["x-vercel-signature"] as string | undefined) ?? "";
  if (!timingSafeEqual(expected, provided)) {
    return send(res, 403, {
      code: "invalid_signature",
      error: "signature didn't match",
    });
  }

  const entries = parseEntries(raw);
  const records: CrawlerRecord[] = [];
  for (const e of entries) {
    if (e && typeof e === "object") {
      const r = toRecord(e as Record<string, any>);
      if (r) records.push(r);
    }
  }

  if (records.length) {
    const day = new Date().toISOString().slice(0, 10);
    const body = records.map((r) => JSON.stringify(r)).join("\n") + "\n";
    try {
      // Private store: these records are visitor IP addresses, which are
      // personal data. Reads require the store token, so the files are not
      // fetchable from a URL alone.
      //
      // One immutable object per batch. Blob has no append, and read-modify-write
      // would race across concurrent deliveries; the fetch script concatenates.
      await put(`crawler/${day}/batch.ndjson`, body, {
        access: "private",
        addRandomSuffix: true,
        contentType: "application/x-ndjson",
      });
    } catch (err) {
      // Still 200: a failed write must not make Vercel mark the drain errored
      // and start dropping deliveries. Surface it in logs instead.
      console.error("log-drain: blob write failed", err);
    }
  }

  return send(res, 200, { received: entries.length, stored: records.length });
}
