import { next } from "@vercel/functions/middleware";
import allowlist from "./location-slugs.generated.json";

const allowed = new Set(allowlist as string[]);
const CANONICAL_HOST = "www.gestionvelora.com";
const APEX_HOST = "gestionvelora.com";
const PUBLIC_FILE_RE = /\.(?:css|js|mjs|map|json|xml|txt|ico|png|jpe?g|webp|avif|gif|svg|mp4|webm|woff2?|otf|ttf|glb)$/i;

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

  const m = path.match(/^\/(?:en\/)?location\/([^/]+)\/?$/);
  if (!m) {
    return next();
  }
  const slug = m[1];
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
