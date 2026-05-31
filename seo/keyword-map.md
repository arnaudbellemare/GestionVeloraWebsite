# SERP Keyword Map

Generated from a lightweight SERP review on 2026-05-29 and the current Gestion Velora page inventory.

## Working Thesis

The strongest SEO angle for Gestion Velora should be copropriete-led, not generic "gestion immobiliere" first.

Generic "gestion immobiliere Montreal" is broad and mixes rental, commercial, investment, and condo operators. The more defensible buyer-intent cluster is:

- gestion de copropriete Montreal
- gestionnaire de copropriete Montreal
- gestion syndicat de copropriete Montreal
- administration syndicat de copropriete
- gestion copropriete Loi 16 / Loi 141

## SERP Signals

Current results for copropriete queries repeatedly surface competitors and pages using "gestion de copropriete", "gestionnaire de copropriete", "syndicat", "Grand Montreal", "Loi 16", "fonds de prevoyance", "AGA", "registre", and "24/7".

Observed competitors/pages:

- Gestion AlphaCondo: emphasizes "gestion de coproprietes Montreal & Laval", "gestionnaire de coproprietes", "Grand Montreal", and premium service quality. Source: https://www.gestionalphacondo.com/
- Habitanium: targets "gestionnaire de copropriete", "Montreal, Laval, Rive-Nord", "IA", "24/7", and administration/financial/operational management. Source: https://habitanium.com/
- Gestion MR: focuses on "gestion syndicat copropriete" and specialized administration for condo boards. Source: https://gestionmr.ca/
- Gestion Lenoble: combines "gestion de copropriete a Montreal", "Grand Montreal", "syndicats", and board support.
- SolutionCondo: strong authority around "gestionnaire de syndicats de copropriete" and real-time condo management. Source: https://www.solutioncondo.com/
- Immoplex: broad "gestion immobiliere Montreal, Rive-Sud et Laval" with copropriete, locative, and commercial coverage.

## Page Keyword Map

| Page | Primary Keyword | Secondary Keywords | Role |
|---|---|---|---|
| `/` | gestion immobiliere Montreal | gestionnaire immobilier Montreal; gestion copropriete Montreal; gestion locative Montreal | Brand + broad local entry |
| `/services/syndicat-copropriete` | gestion de copropriete Montreal | gestion syndicat de copropriete; gestionnaire de copropriete; fonds de prevoyance; AGA; Loi 141 | Primary commercial condo page |
| `/services/gestion-copropriete` | gestionnaire de copropriete Montreal | role gestionnaire copropriete; administration copropriete; conformite copropriete | Supporting intent page; watch cannibalization |
| `/services/gestion-condo` | gestion condo Montreal | gestion de condo; condo board management; coproprietaires | Supporting / colloquial keyword page |
| `/services/location` | gestion locative Montreal | gestion immeuble locatif; gestion loyers; selection locataires; TAL | Rental owner intent |
| `/services/airbnb` | gestion Airbnb Montreal | gestion location courte duree; conciergerie Airbnb; conformite location courte duree | Short-term rental intent |
| `/tarifs` | prix gestion copropriete Montreal | tarif gestion immobiliere; cout gestionnaire copropriete; frais gestion locative | Pricing intent |
| `/locations` | gestion immobiliere Grand Montreal | gestion copropriete Laval; gestion copropriete Longueuil; gestion locative Laval | Local hub, not a keyword dump |
| `/location/syndicat-copropriete-{city}` | gestion de copropriete {city} | gestionnaire de copropriete {city}; syndicat de copropriete {city} | Priority local condo pages |
| `/location/gestion-locative-{city}` | gestion locative {city} | property management {city}; gestion immeuble locatif {city} | Priority local rental pages |
| `/location/gestion-airbnb-{city}` | gestion Airbnb {city} | gestion location courte duree {city}; Airbnb compliance {city} | Priority short-term rental pages |

## Cannibalization Watch

The three pages below are close together:

- `/services/syndicat-copropriete`
- `/services/gestion-copropriete`
- `/services/gestion-condo`

Recommended stance:

- Treat `/services/syndicat-copropriete` as the main conversion page for "gestion de copropriete Montreal".
- Keep `/services/gestion-copropriete` for "gestionnaire de copropriete Montreal" and educational/role-based intent.
- Keep `/services/gestion-condo` for colloquial "gestion condo Montreal" only if Search Console shows impressions; otherwise consider merging or noindexing later.

## Expansion Rule

Do not expand the sitemap just because a keyword exists.

Promote a generated page only when it has:

- a clear primary keyword with search intent;
- distinct local copy;
- at least two internal links from hubs/service pages/blog;
- no overlap with a stronger existing page;
- GSC evidence or clear business priority.

## Current Actions

1. Service metadata now gives `/services/syndicat-copropriete` ownership of "gestion de copropriete Montreal".
2. Supporting service pages have separate meta titles for "gestionnaire de copropriete Montreal", "gestion condo Montreal", "gestion locative Montreal", and "gestion Airbnb Montreal".
3. Blog posts about Loi 141, reserve funds, maintenance, AGA, and condo board obligations already include internal links into the condo service pages.
4. Backlink execution is tracked in `seo/backlink-plan.md`.
5. Track GSC impressions for "gestion de copropriete", "gestionnaire de copropriete", "syndicat de copropriete", and city variants before adding more sitemap URLs.
