# Prioritized backlog (accretive, low-penalty-risk)

**Ordered by impact × feasibility.** Each item should ship with a changelog row and GSC annotation.

## P0 — Quality / policy alignment

1. **GEO inventory review:** Execute sampling plan in `audit-issues.json` → `GEO-SCALE-001`. Merge, deepen, or de-index URLs that cannot pass uniqueness rubric.
2. **Intent cluster map:** One page per *job-to-be-done* (e.g. “condo board compliance”, “short-term rental compliance”)—expand **blog + compare** depth, not city variants.

## P1 — Technical truth

3. **Schema audit pass:** For each template in `representative-urls.json`, confirm single primary structured-data story (no duplicate `@type` for same intent).
4. **Hreflang parity:** Automated check that every `representative-urls` FR path has a live EN counterpart (and vice versa).

## P2 — Measurement

5. **Branded vs non-branded baseline:** Export 4 weeks of Performance with segment definitions from `gsc-dashboard-handbook.md`.
6. **CWV field review:** Record LCP/INP/CLS **field** percentiles for top 10 URL paths by impressions.

## P3 — AI / extractability

7. **Citation surfaces:** Ensure methodology, editorial policy, and author signals stay linked from high-traffic pages (footer + in-article).
8. **Answer-first blocks:** Roll editorial pattern from best-performing posts to service hubs where queries warrant it—**without** duplicate FAQ schema abuse.

**Rejected:** Bulk FAQPage on non-FAQ pages; mass city page generation without unique proof.
