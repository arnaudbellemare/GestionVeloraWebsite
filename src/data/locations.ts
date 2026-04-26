export interface City {
  slug: string;
  nameFr: string;
  nameEn: string;
  region: string;
}

export interface LocationService {
  slug: string;
  serviceSlug: string; // maps to existing /services/:slug
  nameFr: string;
  nameEn: string;
  h1Fr: string;
  h1En: string;
  descFr: string;
  descEn: string;
  keywordFr: string;
  keywordEn: string;
}

export const CITIES: City[] = [
  { slug: "montreal", nameFr: "Montréal", nameEn: "Montreal", region: "Île de Montréal" },
  { slug: "laval", nameFr: "Laval", nameEn: "Laval", region: "Laval" },
  { slug: "longueuil", nameFr: "Longueuil", nameEn: "Longueuil", region: "Montérégie" },
  { slug: "brossard", nameFr: "Brossard", nameEn: "Brossard", region: "Montérégie" },
  { slug: "boucherville", nameFr: "Boucherville", nameEn: "Boucherville", region: "Montérégie" },
  { slug: "repentigny", nameFr: "Repentigny", nameEn: "Repentigny", region: "Lanaudière" },
  { slug: "terrebonne", nameFr: "Terrebonne", nameEn: "Terrebonne", region: "Lanaudière" },
  { slug: "saint-jean-sur-richelieu", nameFr: "Saint-Jean-sur-Richelieu", nameEn: "Saint-Jean-sur-Richelieu", region: "Montérégie" },
  { slug: "blainville", nameFr: "Blainville", nameEn: "Blainville", region: "Laurentides" },
  { slug: "mirabel", nameFr: "Mirabel", nameEn: "Mirabel", region: "Laurentides" },
  { slug: "mascouche", nameFr: "Mascouche", nameEn: "Mascouche", region: "Lanaudière" },
  { slug: "chateauguay", nameFr: "Châteauguay", nameEn: "Chateauguay", region: "Montérégie" },
  { slug: "saint-jerome", nameFr: "Saint-Jérôme", nameEn: "Saint-Jerome", region: "Laurentides" },
  { slug: "varennes", nameFr: "Varennes", nameEn: "Varennes", region: "Montérégie" },
];

export const LOCATION_SERVICES: LocationService[] = [
  {
    slug: "syndicat-copropriete",
    serviceSlug: "syndicat-copropriete",
    nameFr: "Syndicat de copropriété",
    nameEn: "Condo board management",
    h1Fr: "Gestion de syndicat de copropriété à {city}",
    h1En: "Condo board management in {city}",
    descFr:
      "Gestion Velora assure l'administration complète de votre syndicat de copropriété à {city} : assemblées générales, fonds de prévoyance, conformité Loi 141 et relations avec les copropriétaires.",
    descEn:
      "Gestion Velora handles full condo board administration in {city}: general assemblies, reserve funds, Loi 141 compliance, and owner relations.",
    keywordFr: "syndicat copropriété {city}",
    keywordEn: "condo board management {city}",
  },
  {
    slug: "gestion-locative",
    serviceSlug: "location",
    nameFr: "Gestion locative",
    nameEn: "Rental management",
    h1Fr: "Gestion locative à {city} — location longue durée",
    h1En: "Rental property management in {city}",
    descFr:
      "Gestion Velora prend en charge la gestion locative de vos immeubles à {city} : sélection des locataires, rédaction des baux, suivi des loyers et entretien.",
    descEn:
      "Gestion Velora manages your rental properties in {city}: tenant screening, leases, rent collection, and maintenance coordination.",
    keywordFr: "gestion locative {city}",
    keywordEn: "rental management {city}",
  },
  {
    slug: "gestion-airbnb",
    serviceSlug: "airbnb",
    nameFr: "Gestion Airbnb",
    nameEn: "Airbnb management",
    h1Fr: "Gestion Airbnb à {city} — location courte durée",
    h1En: "Airbnb management in {city}",
    descFr:
      "Gestion Velora gère vos locations courte durée à {city} : annonces, réservations, accueil des voyageurs, ménage et conformité réglementaire.",
    descEn:
      "Gestion Velora manages your short-term rentals in {city}: listings, bookings, guest check-in, cleaning, and regulatory compliance.",
    keywordFr: "gestion Airbnb {city}",
    keywordEn: "Airbnb management {city}",
  },
  {
    slug: "gestion-immobiliere-commerciale",
    serviceSlug: "syndicat-copropriete",
    nameFr: "Gestion immobilière commerciale",
    nameEn: "Commercial property management",
    h1Fr: "Gestion immobilière commerciale à {city}",
    h1En: "Commercial property management in {city}",
    descFr:
      "Gestion Velora accompagne les propriétaires d'immeubles commerciaux à {city} : gestion des baux commerciaux, entretien, relations avec les locataires et optimisation du rendement.",
    descEn:
      "Gestion Velora supports commercial property owners in {city}: commercial leases, maintenance, tenant relations, and yield optimization.",
    keywordFr: "gestion immobilière commerciale {city}",
    keywordEn: "commercial property management {city}",
  },
];

// All 56 valid location slugs (service-city)
export const LOCATION_SLUGS: string[] = LOCATION_SERVICES.flatMap((svc) =>
  CITIES.map((city) => `${svc.slug}-${city.slug}`)
);

export interface ResolvedLocation {
  city: City;
  service: LocationService;
  pageSlugFr: string;
  h1Fr: string;
  h1En: string;
  descFr: string;
  descEn: string;
  metaTitleFr: string;
  metaTitleEn: string;
  metaDescFr: string;
  metaDescEn: string;
}

function fill(template: string, city: City): string {
  return template.replace(/{city}/g, city.nameFr).replace(/{cityEn}/g, city.nameEn);
}

export function resolveLocation(slug: string): ResolvedLocation | null {
  for (const svc of LOCATION_SERVICES) {
    for (const city of CITIES) {
      const pageSlug = `${svc.slug}-${city.slug}`;
      if (pageSlug === slug) {
        return {
          city,
          service: svc,
          pageSlugFr: pageSlug,
          h1Fr: fill(svc.h1Fr, city),
          h1En: fill(svc.h1En, city),
          descFr: fill(svc.descFr, city),
          descEn: fill(svc.descEn, city),
          metaTitleFr: `${fill(svc.h1Fr, city)} — Gestion Velora`,
          metaTitleEn: `${fill(svc.h1En, city)} — Gestion Velora`,
          metaDescFr: fill(svc.descFr, city),
          metaDescEn: fill(svc.descEn, city),
        };
      }
    }
  }
  return null;
}

// Bullet-point service features per service type (shared across cities)
export const LOCATION_FEATURES: Record<string, { fr: string[]; en: string[] }> = {
  "syndicat-copropriete": {
    fr: [
      "Administration et convocation des assemblées générales",
      "Gestion des fonds de prévoyance conformément à la Loi 141",
      "Suivi des travaux majeurs et appels d'offres",
      "Rapports financiers trimestriels",
      "Communication avec les copropriétaires 24/7",
      "Conformité légale et réglementaire (RLRQ c. C-6.1)",
    ],
    en: [
      "Administration and convening of general assemblies",
      "Reserve fund management compliant with Loi 141",
      "Major work follow-up and tendering",
      "Quarterly financial reports",
      "24/7 owner communication",
      "Legal and regulatory compliance (RLRQ c. C-6.1)",
    ],
  },
  "gestion-locative": {
    fr: [
      "Sélection rigoureuse des locataires (enquête de crédit, références)",
      "Rédaction et gestion des baux (Règlement sur les formulaires)",
      "Collecte et suivi des loyers",
      "Coordination de l'entretien et des réparations",
      "Gestion des fin de baux et renouvellements",
      "Rapports financiers mensuels pour chaque immeuble",
    ],
    en: [
      "Rigorous tenant screening (credit check, references)",
      "Lease drafting and management",
      "Rent collection and tracking",
      "Maintenance and repair coordination",
      "Lease-end and renewal management",
      "Monthly financial reports per building",
    ],
  },
  "gestion-airbnb": {
    fr: [
      "Création et optimisation des annonces (Airbnb, VRBO, Booking)",
      "Gestion des réservations et communication avec les voyageurs",
      "Accueil, remise des clés et check-out",
      "Coordination du ménage et de la maintenance",
      "Tarification dynamique selon la saison",
      "Conformité aux règlements municipaux sur la location courte durée",
    ],
    en: [
      "Listing creation and optimization (Airbnb, VRBO, Booking)",
      "Reservation management and guest communication",
      "Guest check-in, key handover, and check-out",
      "Cleaning and maintenance coordination",
      "Dynamic pricing by season",
      "Compliance with municipal short-term rental regulations",
    ],
  },
  "gestion-immobiliere-commerciale": {
    fr: [
      "Gestion des baux commerciaux et renouvellements",
      "Suivi des loyers commerciaux et charges communes",
      "Entretien préventif des espaces commerciaux",
      "Relations avec les locataires commerciaux",
      "Gestion des appels d'offres pour les travaux majeurs",
      "Optimisation du rendement et valorisation du patrimoine",
    ],
    en: [
      "Commercial lease management and renewals",
      "Commercial rent and common charge tracking",
      "Preventive maintenance of commercial spaces",
      "Commercial tenant relations",
      "Tendering for major works",
      "Yield optimization and asset value growth",
    ],
  },
};
