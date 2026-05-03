## Summary

Describe the user-visible or crawler-visible change (one paragraph).

## SEO impact

- **Risk tier:** P0 / P1 / P2 / P3 (see `seo/audit-issues.json`)
- **Helpful Content / scaled content:** Does this increase unique utility per URL, or only breadth?
- **Structured data:** Any new/changed JSON-LD? Confirm single source per page type.

## Evidence

- [ ] `npm run build` passes
- [ ] `npm run seo:verify` passes
- [ ] Representative URLs tested: paste paths from `seo/representative-urls.json`
- [ ] Search Console annotation planned for deploy date + git SHA

## Rollback

How to revert safely (feature flag, revert commit, or content rollback).
