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
  /** Shorter title template for <title> tags (≤ 53 chars so city name + suffix stays ≤ 70). */
  titleTmplFr: string;
  titleTmplEn: string;
  descFr: string;
  descEn: string;
  keywordFr: string;
  keywordEn: string;
}

export const CITIES: City[] = [
  // Greater Montreal cities
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
  // Montreal Island municipalities
  { slug: "westmount", nameFr: "Westmount", nameEn: "Westmount", region: "Île de Montréal" },
  { slug: "outremont", nameFr: "Outremont", nameEn: "Outremont", region: "Île de Montréal" },
  { slug: "mont-royal", nameFr: "Mont-Royal", nameEn: "Mont-Royal", region: "Île de Montréal" },
  { slug: "cote-saint-luc", nameFr: "Côte-Saint-Luc", nameEn: "Cote-Saint-Luc", region: "Île de Montréal" },
  { slug: "dollard-des-ormeaux", nameFr: "Dollard-des-Ormeaux", nameEn: "Dollard-des-Ormeaux", region: "Île de Montréal" },
  { slug: "kirkland", nameFr: "Kirkland", nameEn: "Kirkland", region: "Île de Montréal" },
  { slug: "pointe-claire", nameFr: "Pointe-Claire", nameEn: "Pointe-Claire", region: "Île de Montréal" },
  { slug: "saint-laurent", nameFr: "Saint-Laurent", nameEn: "Saint-Laurent", region: "Île de Montréal" },
  { slug: "verdun", nameFr: "Verdun", nameEn: "Verdun", region: "Île de Montréal" },
  { slug: "lachine", nameFr: "Lachine", nameEn: "Lachine", region: "Île de Montréal" },
  // Montreal boroughs (arrondissements - high-search-volume keyword targets)
  { slug: "plateau-mont-royal", nameFr: "Plateau-Mont-Royal", nameEn: "Plateau-Mont-Royal", region: "Montréal" },
  { slug: "rosemont-la-petite-patrie", nameFr: "Rosemont–La Petite-Patrie", nameEn: "Rosemont-La Petite-Patrie", region: "Montréal" },
  { slug: "villeray-saint-michel-parc-extension", nameFr: "Villeray–Saint-Michel–Parc-Extension", nameEn: "Villeray-Saint-Michel-Parc-Extension", region: "Montréal" },
  { slug: "cote-des-neiges-notre-dame-de-grace", nameFr: "Côte-des-Neiges–Notre-Dame-de-Grâce", nameEn: "Cote-des-Neiges-Notre-Dame-de-Grace", region: "Montréal" },
  { slug: "mercier-hochelaga-maisonneuve", nameFr: "Mercier–Hochelaga-Maisonneuve", nameEn: "Mercier-Hochelaga-Maisonneuve", region: "Montréal" },
  { slug: "riviere-des-prairies-pointe-aux-trembles", nameFr: "Rivière-des-Prairies–Pointe-aux-Trembles", nameEn: "Riviere-des-Prairies-Pointe-aux-Trembles", region: "Montréal" },
  { slug: "ahuntsic-cartierville", nameFr: "Ahuntsic-Cartierville", nameEn: "Ahuntsic-Cartierville", region: "Montréal" },
  { slug: "saint-leonard", nameFr: "Saint-Léonard", nameEn: "Saint-Leonard", region: "Montréal" },
  { slug: "anjou", nameFr: "Anjou", nameEn: "Anjou", region: "Montréal" },
  { slug: "montreal-nord", nameFr: "Montréal-Nord", nameEn: "Montreal-Nord", region: "Montréal" },
  { slug: "pierrefonds-roxboro", nameFr: "Pierrefonds-Roxboro", nameEn: "Pierrefonds-Roxboro", region: "Montréal" },
  { slug: "lasalle", nameFr: "LaSalle", nameEn: "LaSalle", region: "Montréal" },
  { slug: "sud-ouest", nameFr: "Le Sud-Ouest", nameEn: "Le Sud-Ouest", region: "Montréal" },
  { slug: "ville-marie", nameFr: "Ville-Marie", nameEn: "Ville-Marie", region: "Montréal" },
  // High-intent Greater Montreal municipalities (expands local SEO coverage)
  { slug: "saint-lambert", nameFr: "Saint-Lambert", nameEn: "Saint-Lambert", region: "Montérégie" },
  { slug: "candiac", nameFr: "Candiac", nameEn: "Candiac", region: "Montérégie" },
  { slug: "la-prairie", nameFr: "La Prairie", nameEn: "La Prairie", region: "Montérégie" },
  { slug: "saint-constant", nameFr: "Saint-Constant", nameEn: "Saint-Constant", region: "Montérégie" },
  { slug: "delson", nameFr: "Delson", nameEn: "Delson", region: "Montérégie" },
  { slug: "boisbriand", nameFr: "Boisbriand", nameEn: "Boisbriand", region: "Laurentides" },
  { slug: "lorraine", nameFr: "Lorraine", nameEn: "Lorraine", region: "Laurentides" },
  { slug: "rosemere", nameFr: "Rosemère", nameEn: "Rosemere", region: "Laurentides" },
  { slug: "deux-montagnes", nameFr: "Deux-Montagnes", nameEn: "Deux-Montagnes", region: "Laurentides" },
  { slug: "sainte-therese", nameFr: "Sainte-Thérèse", nameEn: "Sainte-Therese", region: "Laurentides" },
  { slug: "bois-des-filion", nameFr: "Bois-des-Filion", nameEn: "Bois-des-Filion", region: "Laurentides" },
  { slug: "charlemagne", nameFr: "Charlemagne", nameEn: "Charlemagne", region: "Lanaudière" },
  { slug: "lassomption", nameFr: "L'Assomption", nameEn: "L'Assomption", region: "Lanaudière" },
  { slug: "saint-eustache", nameFr: "Saint-Eustache", nameEn: "Saint-Eustache", region: "Laurentides" },
  { slug: "beaconsfield", nameFr: "Beaconsfield", nameEn: "Beaconsfield", region: "Île de Montréal" },
  { slug: "dorval", nameFr: "Dorval", nameEn: "Dorval", region: "Île de Montréal" },
  { slug: "montreal-ouest", nameFr: "Montréal-Ouest", nameEn: "Montreal West", region: "Île de Montréal" },
  { slug: "hampstead", nameFr: "Hampstead", nameEn: "Hampstead", region: "Île de Montréal" },
  { slug: "chambly", nameFr: "Chambly", nameEn: "Chambly", region: "Montérégie" },
  { slug: "carignan", nameFr: "Carignan", nameEn: "Carignan", region: "Montérégie" },
  { slug: "saint-bruno-de-montarville", nameFr: "Saint-Bruno-de-Montarville", nameEn: "Saint-Bruno-de-Montarville", region: "Montérégie" },
  { slug: "sainte-julie", nameFr: "Sainte-Julie", nameEn: "Sainte-Julie", region: "Montérégie" },
  { slug: "beloeil", nameFr: "Beloeil", nameEn: "Beloeil", region: "Montérégie" },
];

export const LOCATION_SERVICES: LocationService[] = [
  {
    slug: "syndicat-copropriete",
    serviceSlug: "syndicat-copropriete",
    nameFr: "Syndicat de copropriété",
    nameEn: "Condo board management",
    h1Fr: "Gestion de syndicat de copropriété à {city}",
    h1En: "Condo board management in {city}",
    titleTmplFr: "Syndicat de copropriété à {city}",
    titleTmplEn: "Condo board management in {city}",
    descFr:
      "Gestion Velora, firme de gestion de copropriété à {city}, assure une gestion complète et humaine de votre syndicat de copropriétaires : gestion administrative et financière, assemblée générale annuelle (AGA), budget annuel, charges communes, fonds de prévoyance, registre de copropriété, entretien des parties communes, conformité Loi 141 et accompagnement d'urgence 24/7.",
    descEn:
      "Gestion Velora, a condo management firm serving {city}, provides complete and human-centered condo board administration: financial and administrative operations, annual general meeting (AGM), annual budget, common fees, reserve fund, condo register, common-area maintenance, Loi 141 compliance, and 24/7 emergency support.",
    keywordFr: "gestion syndicat copropriété {city}",
    keywordEn: "condo board management {city}",
  },
  {
    slug: "gestion-locative",
    serviceSlug: "location",
    nameFr: "Gestion locative",
    nameEn: "Rental management",
    h1Fr: "Gestion locative à {city}, location longue durée",
    h1En: "Rental property management in {city}",
    titleTmplFr: "Gestion locative à {city}",
    titleTmplEn: "Rental management in {city}",
    descFr:
      "Gestion Velora prend en charge la gestion locative complète de vos immeubles à {city} : sélection des locataires, rédaction des baux, suivi des loyers, entretien, coordination fournisseurs et rapports mensuels transparents.",
    descEn:
      "Gestion Velora delivers complete rental property management in {city}: tenant screening, lease administration, rent collection, maintenance coordination, vendor follow-up, and transparent monthly reporting.",
    keywordFr: "gestion locative {city}",
    keywordEn: "rental management {city}",
  },
  {
    slug: "gestion-airbnb",
    serviceSlug: "airbnb",
    nameFr: "Gestion Airbnb",
    nameEn: "Airbnb management",
    h1Fr: "Gestion Airbnb à {city}, location courte durée",
    h1En: "Airbnb management in {city}",
    titleTmplFr: "Gestion Airbnb à {city}",
    titleTmplEn: "Airbnb management in {city}",
    descFr:
      "Gestion Velora gère vos locations courte durée à {city} avec une approche proactive : annonces, réservations, accueil des voyageurs, ménage, maintenance, optimisation des revenus et conformité réglementaire.",
    descEn:
      "Gestion Velora manages your short-term rentals in {city} with a proactive approach: listings, bookings, guest operations, cleaning, maintenance, revenue optimization, and regulatory compliance.",
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
    titleTmplFr: "Gestion commerciale à {city}",
    titleTmplEn: "Commercial management in {city}",
    descFr:
      "Gestion Velora accompagne les propriétaires d'immeubles commerciaux à {city} : gestion des baux commerciaux, entretien, relations locataires, contrôle des charges, et optimisation durable du rendement.",
    descEn:
      "Gestion Velora supports commercial property owners in {city}: lease management, maintenance, tenant relations, operating-cost control, and long-term yield optimization.",
    keywordFr: "gestion immobilière commerciale {city}",
    keywordEn: "commercial property management {city}",
  },
];

// All valid location slugs (service-city), generated from LOCATION_SERVICES x CITIES
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

const TITLE_SUFFIX = " | Gestion Velora";
const TITLE_MAX = 70;

function buildMetaTitle(headline: string): string {
  const withSuffix = `${headline}${TITLE_SUFFIX}`;
  if (withSuffix.length <= TITLE_MAX) return withSuffix;
  return headline;
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
          metaTitleFr: buildMetaTitle(fill(svc.titleTmplFr, city)),
          metaTitleEn: buildMetaTitle(fill(svc.titleTmplEn, city)),
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
