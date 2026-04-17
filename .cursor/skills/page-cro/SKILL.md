---
name: page-cro
description: >-
  Analyzes and improves marketing page conversion - headlines, CTAs, trust, friction,
  forms, and hierarchy. Use for homepage, landing, pricing, features, blog, or when the
  user says CRO, conversion optimization, improve conversions, or this page is not converting.
  Signup flows, onboarding, generic forms, and popups may need different playbooks if those
  skills exist in the environment.
metadata:
  version: 1.2.0
---

# Page Conversion Rate Optimization (CRO)

Act as a conversion-focused reviewer. Prioritize clarity, one primary action, and measurable hypotheses-not vague design opinions.

## This repository (Gestion Velora)

When editing this codebase, align recommendations with what exists:

- **Stack:** Vite, React 18, React Router, Tailwind, Framer Motion, i18next (`src/i18n/en.ts`, `fr.ts`). French default; English under `/en` (see `src/i18n/index.ts`, `LocaleContext`).
- **Main page:** `src/pages/HomePage.tsx` - hero (`HeroSection`), standards, process, services, FAQ, contact (`#contact`, `#contact-form`), footer with embedded WebGPU QR (`FooterSection`, `public/static/qr-tree-standalone.html` + bundle).
- **Contact & CTAs:** `ContactSection.tsx` - custom dropdowns (`ContactCustomSelect.tsx`), `useGoToContact` for `/#contact-form`, optional Web3Forms (`VITE_WEB3FORMS_ACCESS_KEY`).
- **Links:** Prefer `InternalLink` + locale-aware paths; hash CTAs (`#specification`, `#testimonials`, etc.) appear in hero and sections.

CRO work often touches **copy in i18n** and **section components** under `src/components/`. Keep changes scoped; do not rewrite unrelated pages.

## Initial assessment

**Product context:** If `.agents/product-marketing-context.md` or `.claude/product-marketing-context.md` exists, read it first.

Clarify when missing:

1. Page type and URL  
2. Primary conversion (contact, demo, call, signup, etc.)  
3. Traffic source (if known)

---

## Analysis framework (order of impact)

### 1. Value proposition (highest)

- Understood in ~5 seconds? Benefit-led, not jargon-led?  
- One dominant message vs. everything at once?

### 2. Headline

- Matches promise and traffic intent? Specific enough?

### 3. CTAs

- Single clear primary action; visible early.  
- Copy: outcome-led (“Request a proposal”, “Contact us”) vs. weak (“Submit”, “Learn more”).  
- Secondary actions do not compete.

### 4. Visual hierarchy

- Scannable; key elements stand out; whitespace; imagery supports the claim.

### 5. Trust

- Logos, testimonials, numbers, process transparency near claims and CTAs.

### 6. Objections

- Price, fit, effort, risk - addressed in FAQ, process, or guarantees where relevant.

### 7. Friction

- Form length, unclear steps, mobile, performance. **Here:** contact form UX lives in `ContactSection` / `ContactCustomSelect`.

---

## Output format

- **Quick wins** - fast, likely impact  
- **High-impact** - larger bets  
- **Test ideas** - hypotheses for A/B or measurement  
- **Copy alternatives** - 2–3 options + why  

---

## Page-type notes

- **Home:** Cold traffic; path to main conversion; serve both ready and researching visitors.  
- **Landing:** Message match to source; one main CTA.  
- **Pricing:** Comparison, recommended plan, reduce “which plan?” anxiety.  
- **Feature / service:** Benefit linkage, use cases, path to contact or demo.  
- **Blog:** Contextual CTAs at natural breakpoints.

---

## Experiments

Suggest tests on hero, proof, pricing block, form fields, and nav. Extended experiment lists are optional: add `.cursor/skills/page-cro/references/experiments.md` locally if you want a long catalog (not required for the agent).

---

## Follow-up questions (use when needed)

1. Current conversion or volume?  
2. Traffic sources?  
3. What happens after the CTA (CRM, email, calendar)?  
4. Research, heatmaps, or past tests?

---

## Related skills

If present in the user’s Cursor setup: signup-flow CRO, onboarding CRO, form CRO, popup CRO, copywriting, A/B test setup. Otherwise proceed with this skill only.
