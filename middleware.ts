import { next } from "@vercel/functions/middleware";
import allowlist from "./location-slugs.generated.json";

const allowed = new Set(allowlist as string[]);

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
  matcher: ["/location/:path*", "/en/location/:path*"],
};

export default function middleware(request: Request) {
  const path = new URL(request.url).pathname;
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
