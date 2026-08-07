import { next } from "@vercel/functions/middleware";
import allowlist from "./location-slugs.generated.json";
import {
  RETIRED_LOCATION_REDIRECTS,
  isGoneLocationSlug,
} from "./src/data/locationRoutePolicy";

const allowed = new Set(allowlist as string[]);
const CANONICAL_HOST = "www.gestionvelora.com";
const APEX_HOST = "gestionvelora.com";
const PUBLIC_FILE_RE = /\.(?:css|js|mjs|map|json|xml|txt|ico|png|jpe?g|webp|avif|gif|svg|mp4|webm|woff2?|otf|ttf|glb)$/i;

/**
 * Self-declared crawlers we want an audit trail for. A User-Agent proves
 * nothing on its own — it is attacker-controlled text — so we record the source
 * IP alongside it. `scripts/verify-crawler-identity.mjs` consumes these lines
 * and checks each IP against the operator's announced prefixes (Meta/AS32934)
 * or forward-confirmed reverse DNS (Google/Bing/OpenAI/Anthropic).
 *
 * Without this, nothing about bot traffic is verifiable after the fact: static
 * pages are served from the CDN without invoking a function, so they produce no
 * runtime log line, and no log drain is configured to retain one.
 */
const CRAWLER_UA_RE =
  /(meta-external|meta-webindexer|facebookexternalhit|facebookbot|WhatsApp|Twitterbot|Discordbot|Slackbot|TelegramBot|Googlebot|Google-Extended|Bingbot|GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-SearchBot|anthropic-ai|PerplexityBot|Perplexity-User|CCBot|Applebot|Bytespider|Amazonbot)/i;

/**
 * One JSON line per crawler hit, into Vercel runtime logs. Bots only: human
 * traffic is never logged, which keeps this both privacy-preserving and
 * low-volume enough to stay within log retention.
 */
function logCrawlerHit(request: Request, path: string): void {
  const ua = request.headers.get("user-agent");
  if (!ua || !CRAWLER_UA_RE.test(ua)) return;

  // Vercel sets x-real-ip to the true client IP; x-forwarded-for is a chain
  // whose leftmost entry is the client. Both are set by the edge, not the
  // caller, so they cannot be forged by the requester.
  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown";

  console.log(
    `CRAWLER ${JSON.stringify({ ip, ua, path, ts: new Date().toISOString() })}`
  );
}

/** Minimal HTML 404 so bots/users see a real error body, not soft-redirect to home. */
const NOT_FOUND_HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta name="robots" content="noindex, nofollow"/>
  <title>404 — Gestion Velora</title>
</head>
<body style="font-family:system-ui,-apple-system,sans-serif;padding:2rem;max-width:40rem;line-height:1.5">
  <h1 style="font-size:1.25rem">Page introuvable</h1>
  <p>Cette adresse de service par ville n’existe pas.</p>
  <p>
    <a href="/locations">Villes desservies (FR)</a>
    &nbsp;·&nbsp;
    <a href="/en/locations">Cities we serve (EN)</a>
  </p>
</body>
</html>`;

const GONE_HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta name="robots" content="noindex, nofollow"/>
  <title>410 — Gestion Velora</title>
</head>
<body style="font-family:system-ui,-apple-system,sans-serif;padding:2rem;max-width:40rem;line-height:1.5">
  <h1 style="font-size:1.25rem">Page retirée</h1>
  <p>Cette ancienne page de service par ville a été retirée.</p>
  <p><a href="/locations">Villes desservies</a></p>
</body>
</html>`;

export const config = {
  matcher: ["/:path*"],
};

export default function middleware(request: Request) {
  const url = new URL(request.url);
  let path = url.pathname;
  let changed = false;

  if (url.hostname === APEX_HOST) {
    url.hostname = CANONICAL_HOST;
    changed = true;
  }

  if (path === "/en") {
    path = "/en/";
    changed = true;
  } else if (path === "/index.html") {
    path = "/";
    changed = true;
  } else if (path.endsWith("/index.html")) {
    path = path.slice(0, -"/index.html".length);
    if (path !== "/en") path = path.replace(/\/+$/, "");
    if (path === "/en") path = "/en/";
    if (!path) path = "/";
    changed = true;
  } else if (path.length > 1 && path.endsWith("/") && path !== "/en/") {
    path = path.replace(/\/+$/, "");
    changed = true;
  }

  if (changed) {
    url.pathname = path;
    return Response.redirect(url, 308);
  }

  if (PUBLIC_FILE_RE.test(path)) {
    return next();
  }

  // Page requests only — assets short-circuit above, so this stays signal.
  logCrawlerHit(request, path);

  const m = path.match(/^\/(?:en\/)?location\/([^/]+)\/?$/);
  if (!m) {
    return next();
  }
  const slug = m[1];
  const redirect = RETIRED_LOCATION_REDIRECTS[slug];
  if (redirect) {
    url.pathname = path.startsWith("/en/") ? redirect.en : redirect.fr;
    return Response.redirect(url, 301);
  }
  if (isGoneLocationSlug(slug)) {
    return new Response(GONE_HTML, {
      status: 410,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }
  if (!allowed.has(slug)) {
    return new Response(NOT_FOUND_HTML, {
      status: 404,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  }
  return next();
}
