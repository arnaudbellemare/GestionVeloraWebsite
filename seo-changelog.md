# SEO changelog (repo-native operating log)

**Purpose:** Single source of truth for durable, policy-aligned SEO changes. Pair with `seo/audit-issues.json` and Git commit hashes.

**Policy anchor (May 2026):** Helpful Content system, scaled content abuse guidance, and spam updates reward **unique utility** over templated breadth. Geo pages are allowed only when they reflect **real service coverage** and **materially distinct** value—not keyword mirrors.

---

## Recheck discipline

| Artifact | Next full review |
|----------|------------------|
| This changelog | **2026-08-01** |
| `seo/audit-issues.json` | **2026-08-01** |
| `representative-urls.json` sampling in Rich Results Test | **2026-06-15** |

---

## 13-phase execution map (status snapshot)

**Evidence confidence:** `[HIGH]` = verified in this repo or official Google documentation read in-session; `[MEDIUM]` = standard practice requiring GSC export to confirm; `[LOW]` = hypothesis pending measurement.

| Phase | Focus | Status | Primary evidence |
|-------|--------|--------|------------------|
| 1 | Crawl / index / canonical truth | **Partial** | `[HIGH]` `scripts/prerender.ts` generates `public/sitemap.xml`; `BrowserRouter` + locale routes in `src/App.tsx`. Live GSC URL counts lag deploy—verify in property. |
| 2 | Rendering / JS SEO | **Partial** | `[HIGH]` Prerender emits static HTML for crawlers; SPA hydration on client. Recheck critical URLs in URL Inspection after each deploy. |
| 3 | Core Web Vitals + INP | **Not run (needs field data)** | `[MEDIUM]` Requires Search Console **Experience** + CrUX; lab Lighthouse optional. No deterministic rank claims from CWV alone. |
| 4 | Structured data correctness | **Improved** | `[HIGH]` Duplicate `FAQPage` on `/faq` addressed by runtime removal in `SchemaOrg.tsx` (commit `709f00b`); prerender remains single FAQ JSON-LD source. |
| 5 | Intent clusters (user jobs, not keyword lists) | **Backlog** | Map services + blog + compare to clusters in `seo/decision-cards.md`. |
| 6 | Internal linking & topic authority | **Partial** | `[HIGH]` `LocationPage.tsx` adds contextual links; avoid orphan thin clusters—see audit `GEO-SCALE-001`. |
| 7 | E-E-A-T & first-party trust | **Partial** | `[HIGH]` Author/org schema patterns in `config.ts`, editorial routes referenced in `robots.txt`. Expand case studies / methodology where measurable. |
| 8 | Internationalization (hreflang, alternates) | **Partial** | `[HIGH]` Prerender `xhtml:link` alternates in sitemap; verify FR/EN parity per template in `representative-urls.json`. |
| 9 | Search Console configuration | **Operator task** | `[MEDIUM]` Submit `https://www.gestionvelora.com/sitemap.xml`; use **Insights**, branded vs non-brand segments, annotations on deploy dates (see `seo/gsc-dashboard-handbook.md`). |
| 10 | AI discovery & extractability | **Partial** | `[HIGH]` `public/llms.txt`, `public/.well-known/ai.txt`; answer-first blocks on key templates. |
| 11 | AI Overview / AI Mode visibility | **Measurement design only** | `[LOW]` UI labels evolve—export Performance + segment; see handbook. No fabricated impression numbers. |
| 12 | Pruning / consolidation / quality gates | **Required** | `[HIGH]` Programmatic location URLs must be justified per URL or risk scaled-content signals—see `GEO-SCALE-001`. |
| 13 | Governance | **Active** | This file + JSON audits + PR discipline. |

---

## Deploy log (add one row per production deploy)

| Date (UTC) | Git | Notes |
|------------|-----|-------|
| 2026-05-02 | `a204b0e` | Shrink `CITIES` to Greater Montreal footprint; optional factual `localLead` copy on key municipalities; Vercel 301s for removed city suffixes → `/locations`. |
| 2026-05-02 | `709f00b` | Dedupe FAQ JSON-LD on `/faq` (runtime vs prerender). |
| 2026-05-02 | `d3377dc` | Location template internal linking + locations index breadth; sitemap regen. |
| 2026-05-02 | `9871432` | Expanded location inventory + priority matrix tooling—**review under GEO-SCALE-001**. |
| 2026-07-24 | `cca31d7` | Real operating figures (500 units, 98% occupancy, 24/7) across StatsSection, all five service descriptions per locale, Organization JSON-LD, and `llms.txt` grounding facts, with source attribution. Visible byline added to standard prerendered blog posts (previously AMP-only); Article `author.url` repointed from site root to `/about` with `jobTitle`, `worksFor`, `sameAs`. |
| 2026-07-24 | _pending_ | GEO audit follow-up. Prerendered pages now emit a crawlable site nav inside `#root` (React replaces it on mount): the delivered homepage HTML went from 16 hrefs / 4 content links to 33, ending orphan status for `/compare` + `/locations` and exposing the trust pages. H2/H3 gain slugified `id` anchors for section-level citation (0% → 100%, 2290 headings, no duplicates). Footer gains `/methodology`, `/sources`, `/trust-proof` so the prerendered nav mirrors real UI. Four service `metaTitle`s per locale differentiated (were 85–89% similar). `llms.txt` + `/services/gestion-condo` keyword coverage. |

---

## Stale tactics explicitly rejected

- Mass `FAQPage` injection on pages without matching visible FAQ content.
- “More pages = more SEO” without uniqueness or demand proof.
- Claiming CWV fixes alone guarantee ranking changes.
- **Chasing the text-to-HTML ratio by externalising the inlined CSS.** Decided 2026-07-24. A GEO audit flags the homepage at 5.4% (threshold 10%); 70% of the page is the inlined Tailwind bundle. Measured: 63.5 KB raw but **11.3 KB gzipped**, and the whole document is 18.7 KB gzipped. Externalising would lift the ratio to 16.7% while adding a render-blocking request and undoing the deliberate LCP optimisation in `vite.config.ts`. The ratio is a raw-byte proxy; the audit separately reports `is_thin_content: False` and an evergreen score of 92. **Keep the inline CSS.** Revisit only if LCP headroom appears or the audit starts measuring compressed bytes.
- **Fabricated `aggregateRating` / `Review` markup.** The site has no customer reviews (`#testimonials` is the partner-logo strip); inventing ratings would breach Google's structured-data policy. Blocked pending real, verifiable review data.
