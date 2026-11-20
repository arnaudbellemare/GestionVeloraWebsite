import type { ServiceSlug } from "./services";

/**
 * Pricing and proof summary shown near the top of each service page.
 * Shared by ServicePage.tsx and scripts/prerender.ts so the raw HTML and the
 * hydrated page always state the same price.
 */
export interface ServiceGeoSummary {
  price: string;
  proof: string;
  compareTo: string;
}

export function getServiceGeoSummary(slug: ServiceSlug, locale: "fr" | "en"): ServiceGeoSummary {
  const isEn = locale === "en";

  if (slug === "airbnb") {
    return {
      price: isEn
        ? "Typical Airbnb management fee: 18-25% of booking revenue, depending on volume, property type, and service scope."
        : "Frais de gestion Airbnb typiques : 18-25 % des revenus de réservation, selon le volume, le type de bien et le périmètre du mandat.",
      proof: isEn
        ? "Includes listing optimization, dynamic pricing, guest messaging, cleaning coordination, maintenance, and 2026 Montreal/CITQ compliance monitoring."
        : "Inclut optimisation des annonces, tarification dynamique, messages voyageurs, ménage, maintenance et suivi de conformité Montréal/CITQ 2026.",
      compareTo: "/compare/airbnb-vs-location-longue-duree-montreal",
    };
  }

  if (slug === "location") {
    return {
      price: isEn
        ? "Long-term rental management fee: structured as one month's gross rent under the mandate terms."
        : "Honoraires de gestion locative longue durée : structure équivalente à un mois de loyer brut selon les modalités du mandat.",
      proof: isEn
        ? "Covers tenant screening, Quebec lease support, rent collection, maintenance coordination, TAL-aware follow-up, and monthly owner reporting."
        : "Couvre sélection locataire, baux du Québec, perception, maintenance, suivi conforme TAL et rapports mensuels propriétaire.",
      compareTo: "/compare/gestion-locative-interne-vs-externalisee",
    };
  }

  return {
    price: isEn
      ? "Condo board management pricing: typically $33-$36 per unit/month; up to $40 per unit/month with app and portal integrations."
      : "Tarifs de gestion de copropriété : généralement 33 $ à 36 $ / unité / mois ; jusqu'à 40 $ / unité / mois avec intégrations applicatives et portails.",
    proof: isEn
      ? "Covers AGM preparation, budgets, reserve fund oversight, maintenance logs, vendor coordination, owner communication, and 2026 Quebec co-ownership compliance."
      : "Couvre AGA, budgets, fonds de prévoyance, carnet d'entretien, fournisseurs, communications copropriétaires et conformité copropriété Québec 2026.",
    compareTo: "/compare/gestionnaire-vs-autogestion-condo",
  };
}
