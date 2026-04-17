# Home page section `id` map

Use these hashes with `InternalLink` (locale-aware) or `useGoToContact` for contact.  
Changing an `id` here requires updating footer, hero, and any deep links.

| Hash | Component | Purpose |
|------|-----------|---------|
| `#specification` | `WhatWeDoSection` | Services / “what we do” |
| `#standards` | `OurStandardsSection` | Standards / approach |
| `#benefice` | `WhoWeAreSection` | Who we are / portfolio lead-in |
| `#process` | `OurProcessSection` | Process steps |
| `#testimonials` | `TrustedPartnersSection` | Social proof |
| `#portails` | `PortalAccessSection` | Owner / manager portals |
| `#insights` | `InsightsSection` | Blog teaser |
| `#faq` | `FAQSection` | FAQ |
| `#contact` | `ContactSection` | Contact section (scroll target) |
| `#contact-form` | `ContactSection` | Form anchor (preferred for CTAs; see `useGoToContact`) |

## Other routes (no hash)

- `/services` - services hub (FR default; `/en/services` in English)
- `/services/:slug` - service detail
- `/blog`, `/blog/:slug` - insights
- `/privacy` - privacy policy (if you add `/legal/terms` etc., document IDs the same way)
