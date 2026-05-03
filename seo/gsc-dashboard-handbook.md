# Search Console handbook (May 2026 — operator-facing)

**Purpose:** Map repo deploys to measurable SEO outcomes without inventing metrics. **All numeric targets come from your GSC export**, not this document.

**Confidence:** UI labels and report names change—verify inside your property when following steps.

---

## 1. Baseline configuration

1. Property: **Domain** or **URL-prefix** for `https://www.gestionvelora.com` (match `SITE_URL` in `src/config.ts`).
2. Sitemaps: submit `https://www.gestionvelora.com/sitemap.xml` (see `public/robots.txt`).
3. Users: ensure at least two verified owners for continuity.

**Recheck:** 2026-08-01

---

## 2. Performance report segmentation

Use saved filters (exact names depend on GSC UI version):

| Segment | Intent |
|---------|--------|
| **Branded** | Queries containing `Gestion Velora`, `Velora`, common misspellings you observe. |
| **Non-branded** | All queries minus branded filter—demand capture health. |
| **AI-related** | If your property shows AI Overview / AI Mode columns or filters, track impressions/clicks separately—**export weekly**; do not compare to third-party tools without labeling source. |

**Annotation discipline:** On each production deploy, add a chart note: `deploy: <git-sha>; areas: <e.g. location templates, FAQ schema>`.

---

## 3. Insights tab

Use **Insights** for anomaly prompts (coverage, enhancement regressions). Treat as **hypothesis generator**—confirm with URL Inspection and changelog entry.

---

## 4. Experience (Core Web Vitals + INP)

- Prioritize **field** data for the same URLs as `seo/representative-urls.json`.
- Lab Lighthouse runs are **supplementary**—do not claim ranking impact from lab-only fixes.

---

## 5. Indexing / canonical truth

For each URL in `seo/representative-urls.json`:

- **URL Inspection** → Live test → confirm canonical, hreflang if applicable, and rendered HTML.
- If “Crawled — currently not indexed,” treat as **quality or discovery** signal—not a sitemap bug by default.

---

## 6. AI discovery files (site-level)

Verify reachable:

- `https://www.gestionvelora.com/llms.txt`
- `https://www.gestionvelora.com/.well-known/ai.txt`

Referenced from `public/robots.txt`.

---

## 7. Export template (CSV columns)

Suggested minimum columns to archive monthly:

- `date`
- `page` (top 100 paths by impressions)
- `impressions`
- `clicks`
- `ctr`
- `position`
- `query` (top 200 queries total)
- `is_branded` (boolean, derived)
- `notes` (deploy annotations)

Store exports outside the repo or in a private bucket—avoid committing customer queries.
