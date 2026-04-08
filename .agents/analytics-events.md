# Analytics event names (north star: contact submit / qualified call)

Use one consistent layer (`dataLayer.push`, `gtag`, or your stack) with these names so A/B tests stay comparable.

| Event name | When |
|------------|------|
| `cta_hero_contact` | Hero primary CTA (talk to team) |
| `cta_hero_discover` | Hero secondary (“see how we work”) |
| `cta_stats_proposal` | Stats strip “request proposal” |
| `cta_header_contact` | Header contact |
| `cta_footer_contact` | Footer contact link |
| `cta_service_sticky` | Service page sticky bar contact |
| `cta_service_footer` | Service page bottom CTA |
| `cta_blog_post` | Blog post end CTA |
| `form_contact_submit` | Contact form successful API/mailto submit |
| `nav_services_hub` | Nav/footer “all services” → `/services` |

Optional: `tel_click_header`, `tel_click_footer` on `tel:` links if calls are a goal.
