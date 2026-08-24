# Measurement operations

Updated 2026-07-21.

## GA4 and Google Tag Manager

Set `VITE_GTM_ID` in the production build environment. If no GTM container is available, set
`VITE_GA4_MEASUREMENT_ID` as a direct GA4 fallback. Never set both intentionally; GTM takes
precedence.

In GTM, create a GA4 Configuration / Google tag with automatic page views disabled, then create
GA4 Event tags for these custom data-layer events:

| Event | Parameters |
| --- | --- |
| `page_view` | `page_path`, `page_title` |
| `web_vital` | `web_vital_name`, `web_vital_value`, `web_vital_rating`, `page_path` |
| `ai_referral_visit` | `ai_platform`, `referral_host`, `landing_page` |

Register `web_vital_name`, `web_vital_rating`, `ai_platform`, and `referral_host` as event-scoped
custom dimensions in GA4. Register `web_vital_value` as a custom metric. GA4 already records
session source/medium, but `ai_referral_visit` provides a stable reporting group for referrals from
Perplexity, ChatGPT, Gemini, Copilot, and Claude.

AI referral counts are a lower bound: native apps and privacy controls can remove the referrer.
Google AI Overview and AI Mode visits remain combined with ordinary Web search reporting.

## Search Console exports and weekly opportunity audit

1. Create a Google Cloud service account with Search Console API access.
2. Add its email as a user on `sc-domain:gestionvelora.com` (or set `GSC_SITE_URL` to the verified
   URL-prefix property).
3. Store the credential outside git and run:

   `GSC_SERVICE_ACCOUNT_FILE=/secure/path/key.json npm run seo:gsc-export`

The command writes the previous full month's page, query, page/query, and sitemap data under the
git-ignored `.search-data/YYYY-MM/` directory. Set `GSC_INSPECTION_URLS_FILE` to a newline-delimited
URL list to add URL Inspection results.

For the weekly read-only prioritization workflow, run:

```bash
GSC_SERVICE_ACCOUNT_FILE=/secure/path/key.json npm run seo:gsc-export -- --rolling
npm run seo:opportunity-audit
```

The first command stores current and previous 28-day windows under `.search-data/rolling/`; the
second writes a ranked report under `.search-data/opportunity/`. The score is relative to that run,
not a traffic forecast. Review every suggested action manually and log approved experiments using
`seo/opportunity-experiments-template.csv`, with outcome checks at +28 and +56 days.

Search Console has no bulk Page Indexing API. Export the Page Indexing report manually each month
and save it with the API files. CrUX uses a rolling 28-day window and can withhold URL-level data
when traffic is too low.

## Monthly AI citation run

Run every prompt in `seo/ai-citation-prompts.csv` once in each monitored answer engine using a clean
session and the same geography/language settings. Copy `seo/ai-citation-results-template.csv` into
the private monthly data directory and record mention, citation URL, visible citation position,
competitors, platform/model, and run date. Do not treat a missing referral as proof that no citation
occurred.

## Location-route evaluation

The current inventory contains 504 bilingual nonpriority routes. Do not retire them from a partial
export. After collecting a complete GSC Pages export, GSC Links export, and GA4 landing-page key
event export, run:

`npm run seo:location-evaluate -- --complete --gsc <gsc-pages.csv> --backlinks <links.csv> --conversions <ga4.csv>`

The output is a decision worksheet, not an automatic deletion. Routes with any measured signal are
`candidate_301` to the matching service hub; zero-signal routes are `candidate_410` and still require
an indexing check. Only after reviewing that worksheet should the route generator and middleware
retirement manifest be changed.
