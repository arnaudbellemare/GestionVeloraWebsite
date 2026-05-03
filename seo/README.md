# SEO artifacts (durable, policy-aligned)

This folder holds **governance and measurement templates** for Gestion Velora’s marketing site. It does **not** auto-fix SEO; it makes tradeoffs explicit.

## Files

| File | Role |
|------|------|
| `audit-issues.json` | Prioritized issues with evidence, rollback, recheck dates |
| `representative-urls.json` | Minimal URL set for validation (Rich Results / Inspection) |
| `decision-cards.md` | reversible decisions with confidence labels |
| `gsc-dashboard-handbook.md` | How operators use Search Console segments + annotations |

Root **`seo-changelog.md`** ties deploys (Git) to SEO outcomes.

## Constraints (May 2026)

- **No** scaled thin geo pages for keyword volume. The repo currently contains a large programmatic location matrix—see **`GEO-SCALE-001`** in `audit-issues.json`. Editorial and technical work must increase **distinct value per URL** or reduce inventory.

- **`claudedocs/seo-priority-top100.md`** and **`npm run seo:priority`** are **editorial prioritization aids only**, not authorization to spin up more templates.

## Verification

```bash
npm run seo:verify
```

## Removed location URLs (301)

When cities are removed from `src/data/locations.ts`, regenerate Vercel redirects from `scripts/generate-vercel-location-redirects.mjs` (keep `REMOVED_CITY_SLUGS` in sync), then:

```bash
npm run seo:vercel-redirects
```
