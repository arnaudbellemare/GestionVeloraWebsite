# Changelog

All notable changes to the Gestion Velora website are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- LICENSE, CONTRIBUTING.md, SECURITY.md, CODE_OF_CONDUCT.md for repository
  trust and discoverability
- llms.txt and llms-full.txt at repository root for AI discovery
- 7 missing English hub page links in static noscript section (fixes orphan
  /en/* cluster in link graph)
- Google Fonts loaded asynchronously via preload/onload pattern (CWV fix)

## [2026-04-24]

### Added
- FAQ page (FR + EN) with FAQPage schema
- Comparison pages: gestionnaire vs autogestion, Airbnb vs location longue
  durée, gestion interne vs externalisée
- 56 location pages (FR + EN) across 4 service types and 28 cities
- Blog posts: relevé 31, loyer, bail, REQ/NEQ targeting
- Auto-generated sitemap from route definitions (never stale)
- Duplicate FAQPage schema fix — SchemaOrg.tsx as single source of truth
- Googlebot video blocking + aria-hidden on background video

## [2026-04-01]

### Added
- Initial bilingual site (FR/EN) — homepage, 3 service pages, blog, pricing,
  privacy, editorial policy, methodology, sources, trust-proof
- LocalBusiness + Organization structured data in index.html
- AI discovery endpoints: /ai/summary.json, /ai/faq.json, /ai/service.json,
  /.well-known/ai.txt, /llms.txt, /llms-full.md
- Static prerendering via scripts/prerender.ts for AI crawlers
