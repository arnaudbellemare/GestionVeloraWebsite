import { CALCULATOR_PAGE, REFERENCE_PAGE } from "./plex-calculator";
import { RADAR_PATHS } from "./plex-radar";

type Locale = "fr" | "en";

/**
 * Last breadcrumb item (Home > this page) for top-level hub and utility pages.
 * Shared by the prerender script and SchemaOrg so the BreadcrumbList in the
 * served HTML matches the one React injects after hydration.
 */
const HUB_LABELS: Array<{ fr: string; en: string; label: Record<Locale, string> }> = [
  { fr: "/services", en: "/en/services", label: { fr: "Services", en: "Services" } },
  { fr: "/blog", en: "/en/blog", label: { fr: "Conseils", en: "Insights" } },
  { fr: "/compare", en: "/en/compare", label: { fr: "Guides comparatifs", en: "Comparison guides" } },
  { fr: "/locations", en: "/en/locations", label: { fr: "Villes desservies", en: "Cities we serve" } },
  {
    fr: "/calculateur-rendement-plex-montreal",
    en: "/en/montreal-plex-investment-calculator",
    label: { fr: CALCULATOR_PAGE.fr.title, en: CALCULATOR_PAGE.en.title },
  },
  {
    fr: "/guide-achat-plex-montreal",
    en: "/en/montreal-plex-buyer-guide",
    label: { fr: REFERENCE_PAGE.fr.title, en: REFERENCE_PAGE.en.title },
  },
  {
    fr: RADAR_PATHS.fr,
    en: RADAR_PATHS.en,
    label: { fr: "Immeubles à revenus à vendre", en: "Montreal income properties for sale" },
  },
  { fr: "/contact", en: "/en/contact", label: { fr: "Contact", en: "Contact" } },
  { fr: "/tarifs", en: "/en/tarifs", label: { fr: "Tarifs", en: "Pricing" } },
  { fr: "/about", en: "/en/about", label: { fr: "À propos", en: "About" } },
  { fr: "/editorial-policy", en: "/en/editorial-policy", label: { fr: "Politique éditoriale", en: "Editorial policy" } },
  { fr: "/sources", en: "/en/sources", label: { fr: "Sources et références", en: "Sources and references" } },
  { fr: "/privacy", en: "/en/privacy", label: { fr: "Politique de confidentialité", en: "Privacy policy" } },
  { fr: "/terms", en: "/en/terms", label: { fr: "Conditions d’utilisation", en: "Terms of use" } },
];

export function getHubBreadcrumbLabel(path: string): string | null {
  const normalized = path.length > 1 ? path.replace(/\/+$/, "") : path;
  for (const hub of HUB_LABELS) {
    if (normalized === hub.fr) return hub.label.fr;
    if (normalized === hub.en) return hub.label.en;
  }
  return null;
}
