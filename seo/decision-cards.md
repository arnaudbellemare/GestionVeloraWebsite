# Decision cards (evidence-backed)

**Recheck all cards:** 2026-08-01

---

## DC-001 — Geo URL strategy: quality floor over count

| Field | Content |
|-------|---------|
| **Decision** | Pause expansion of static `CITIES × services` URL templates until each URL meets a documented uniqueness rubric (local specificity, verifiable operating detail, or unique FAQ). |
| **Evidence** | `LOCATION_SLUGS` cross-product in `src/data/locations.ts`; sitemap ~560 URLs. Aligns with scaled-content risk in `seo/audit-issues.json` GEO-SCALE-001. |
| **Alternatives rejected** | Continuous addition of municipalities for keyword coverage only (high penalty risk under March 2026 spam/scaled-content enforcement philosophy). |
| **Rollback** | Shrink `CITIES`; rebuild; optionally noindex underperformers after 60-day GSC evidence. |
| **Verification** | GSC: impressions/branded vs non-brand split; manual diff of 10 random location pages for substantive uniqueness. |
| **Confidence** | HIGH |

---

## DC-002 — FAQ structured data: single source

| Field | Content |
|-------|---------|
| **Decision** | Keep FAQ JSON-LD from prerender for `/faq`; remove runtime duplicate (`SchemaOrg.tsx` FAQ branch removed in `709f00b`). |
| **Evidence** | Search Console duplicate FAQPage report; code inspection showed prerender + runtime injection. |
| **Rollback** | Restore runtime block only if prerender drops FAQ schema—then remove prerender FAQ instead (still single source). |
| **Verification** | Rich Results Test / view-source: one `FAQPage` script on `/faq`. |
| **Confidence** | HIGH |

---

## DC-003 — Measurement: GSC-first, annotations on deploy

| Field | Content |
|-------|---------|
| **Decision** | Treat Search Console as source of truth for indexing and queries; annotate chart at each production deploy (git SHA + scope). |
| **Evidence** | Repo cannot store live impressions; operator must export or use GSC UI (May 2026 features vary by account—verify labels locally). |
| **Rollback** | N/A |
| **Verification** | Annotation visible on Performance chart for last deploy date. |
| **Confidence** | MEDIUM |
