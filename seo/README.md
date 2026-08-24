# SEO artifacts (durable, policy-aligned)

This folder holds **governance and measurement templates** for Gestion Velora’s marketing site. It does **not** auto-fix SEO; it makes tradeoffs explicit.

## Files

| File | Role |
|------|------|
| `audit-issues.json` | Prioritized issues with evidence, rollback, recheck dates |
| `representative-urls.json` | Minimal URL set for validation (Rich Results / Inspection) |
| `decision-cards.md` | reversible decisions with confidence labels |
| `gsc-dashboard-handbook.md` | How operators use Search Console segments + annotations |
| `geo-answer-engine-playbook.md` | Answer-engine visibility workflow based on controlled GEO research |
| `opportunity-experiments-template.csv` | Private +28/+56-day experiment-ledger template |

Root **`seo-changelog.md`** ties deploys (Git) to SEO outcomes.

## Constraints (May 2026)

- **No** scaled thin geo pages for keyword volume. The repo currently contains a large programmatic location matrix—see **`GEO-SCALE-001`** in `audit-issues.json`. Editorial and technical work must increase **distinct value per URL** or reduce inventory.

- **`claudedocs/seo-priority-top100.md`** and **`npm run seo:priority`** are **editorial prioritization aids only**, not authorization to spin up more templates.

- **GEO / answer-engine work** must start with retrieval and topical fit before formatting. Use `geo-answer-engine-playbook.md`; do not treat formatting-only edits as a visibility strategy.

## Verification

```bash
npm run seo:verify
```

## Weekly SEO/GEO opportunity audit

The read-only audit compares two consecutive 28-day Search Console windows. It ranks actual click
regressions, CTR headroom, queries in positions 5–20, unclear query ownership, and likely
cannibalization. It writes private Markdown, CSV, and JSON artifacts below `.search-data/`; it never
edits or publishes site content.

```bash
GSC_SERVICE_ACCOUNT_FILE=/secure/path/key.json npm run seo:gsc-export -- --rolling
npm run seo:opportunity-audit
```

The rolling export ends three days before the run by default so it only requests mature Search
Console data. Override this for reproducible runs with `--end-date YYYY-MM-DD`. The audit defaults
to a 10-impression signal floor; use `--min-impressions` to change it.

Before approving a recommendation, confirm intent, bilingual ownership, conversions, backlinks,
canonical signals, and whether an existing page should be refreshed instead. A
`review_topic_gap` result is an investigation prompt—not permission to generate a page.

Copy `opportunity-experiments-template.csv` into the private `.search-data/` directory to record an
approved change and its +28/+56-day rechecks. Search queries and experiment results must remain out
of git.

## Removed location URLs (301)

When cities are removed from `src/data/locations.ts`, regenerate Vercel redirects from `scripts/generate-vercel-location-redirects.mjs` (keep `REMOVED_CITY_SLUGS` in sync), then:

```bash
npm run seo:vercel-redirects
```
