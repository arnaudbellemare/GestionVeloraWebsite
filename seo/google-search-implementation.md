# Google Search Implementation Notes

Updated 2026-05-31.

This site follows Google Search Central guidance as build-time rules, not just editorial notes.

## Official Google Sources Applied

- SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Crawling and indexing overview: https://developers.google.com/search/docs/crawling-indexing
- Canonical URL guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Robots meta tag guidance: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
- Sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Structured data overview: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Structured data policies: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Supported structured data features: https://developers.google.com/search/docs/guides/search-gallery
- Image SEO best practices: https://developers.google.com/search/docs/appearance/google-images
- Lazy-loaded content guidance: https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading
- Video SEO best practices: https://developers.google.com/search/docs/advanced/guidelines/video
- AMP guidelines: https://developers.google.com/search/docs/crawling-indexing/amp

## Implemented Rules

### Crawlability And Indexing

- Production pages are prerendered into static HTML under `dist/` so crawlers can read the main content without depending only on client-side rendering.
- Priority pages are included in `sitemap.xml`; generated location variants are included only when marked as priority.
- Generated non-priority location pages can exist for UX coverage, but are marked `noindex, follow` and excluded from the sitemap.
- `public/robots.txt` points to the production sitemap and must not block the whole site.

### Canonical And Hreflang

- Each indexable page has one production HTTPS canonical URL.
- Canonical URLs must not contain fragments.
- French and English alternates are emitted as `fr-CA`, `en-CA`, and `x-default`.
- Sitemap entries include the same hreflang clusters as page HTML.
- AMP blog duplicates canonicalize back to their non-AMP article URLs.

### Metadata

- Every generated HTML page must have a title, meta description, canonical, and `html lang`.
- Service pages use dedicated meta titles/descriptions so the main copropriete page and supporting pages do not cannibalize each other.
- Blog article pages expose AMP alternates only for blog posts, not homepage, service, pricing, or contact flows.

### Structured Data

- JSON-LD is used for Google-supported page types:
  - `Organization` and `WebSite` in the base HTML.
  - `FAQPage` where the FAQ content is visible on the page.
  - `Service` on service detail pages.
  - `ItemList` on service and blog hubs.
  - `Article` plus `BreadcrumbList` on blog articles.
  - `VideoObject` only for the noindex video watch route.
- Duplicate AMP/canonical blog versions carry matching Article and Breadcrumb structured data.
- Structured data is placed on the page it describes and is verified as parseable JSON.

### Images And Lazy Loading

- Crawlable images use HTML image elements with `src` attributes.
- AMP pages use `amp-img`.
- Build verification warns on missing image `alt` text.
- Above-the-fold hero media is not hidden behind user actions; lazy-loaded content must load based on visibility, not clicks or manual scrolling.

### Content And Internal Links

- Main keyword ownership is mapped in `seo/keyword-map.md`.
- Backlink and anchor text rules are mapped in `seo/backlink-plan.md`.
- Blog articles about Loi 141, fonds de prevoyance, AGA, condo boards, and maintenance link internally to the most relevant condo service pages.
- New pages should be created for users and search intent, not to inflate sitemap count.

## Verification

Run:

```bash
npm run build
npm run seo:verify
```

`npm run seo:verify` now validates:

- repo SEO artifacts;
- generated `dist/sitemap.xml`;
- `public/robots.txt`;
- titles and meta descriptions;
- canonical URLs;
- hreflang clusters;
- JSON-LD parseability;
- blog AMP alternates;
- AMP page structure;
- image crawlability basics.

Warnings should be reviewed before release. Errors must be fixed before pushing.
