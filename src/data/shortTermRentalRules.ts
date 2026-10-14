/**
 * Short-term (tourist) rental rules for Montréal and Québec, as published by
 * the City of Montréal and the Gouvernement du Québec.
 *
 * Every figure below was read from the raw page text on RULES_CHECKED_ON.
 * When a source page's "Mis à jour" date changes, re-read it and update this
 * file; the service page, the Airbnb location pages, and the prerendered HTML
 * all read from here.
 */

export const RULES_CHECKED_ON = "2026-10-14";

export const STR_SOURCES = {
  principalResidence: {
    url: "https://montreal.ca/demarches/louer-sa-residence-principale-des-touristes",
    labelFr: "Ville de Montréal, louer sa résidence principale à des touristes (mis à jour le 11 septembre 2026)",
    labelEn: "City of Montréal, renting your principal residence to tourists (updated September 11, 2026)",
  },
  commercial: {
    url: "https://montreal.ca/demarches/exploiter-une-residence-de-tourisme-commerciale",
    labelFr: "Ville de Montréal, exploiter une résidence de tourisme commerciale (mis à jour le 10 septembre 2026)",
    labelEn: "City of Montréal, operating a commercial tourist residence (updated September 10, 2026)",
  },
  lachine: {
    url: "https://montreal.ca/articles/hebergement-touristique-lachine-87046",
    labelFr: "Ville de Montréal, hébergement touristique à Lachine (mis à jour le 15 mai 2026)",
    labelEn: "City of Montréal, tourist accommodation in Lachine (updated May 15, 2026)",
  },
  registration: {
    url: "https://www.quebec.ca/tourisme-loisirs-sport/hebergement-touristique/enregistrement",
    labelFr: "Gouvernement du Québec, enregistrer un établissement d'hébergement touristique (mis à jour le 24 septembre 2026)",
    labelEn: "Gouvernement du Québec, registering a tourist accommodation establishment (updated September 24, 2026)",
  },
} as const;

/**
 * Location-page city slugs that are boroughs of the City of Montréal ("montreal"
 * is the city itself). Demerged island municipalities (Westmount, Dorval,
 * Pointe-Claire, Hampstead, etc.) are NOT here: the City's by-law does not
 * apply to them, their own zoning does.
 */
export const CITY_OF_MONTREAL_SLUGS: ReadonlySet<string> = new Set([
  "montreal",
  "ahuntsic-cartierville",
  "anjou",
  "cote-des-neiges-notre-dame-de-grace",
  "lachine",
  "lasalle",
  "mercier-hochelaga-maisonneuve",
  "montreal-nord",
  "outremont",
  "pierrefonds-roxboro",
  "plateau-mont-royal",
  "riviere-des-prairies-pointe-aux-trembles",
  "rosemont-la-petite-patrie",
  "saint-laurent",
  "saint-leonard",
  "sud-ouest",
  "verdun",
  "ville-marie",
  "villeray-saint-michel-parc-extension",
]);

/** Boroughs where renting a principal residence to tourists is prohibited outright. */
export const STR_PROHIBITED_BOROUGHS = ["lachine", "saint-laurent", "saint-leonard"] as const;

export interface RuleSource {
  label: string;
  url: string;
}

export interface AirbnbServiceRules {
  title: string;
  body: string;
  points: string[];
  sources: RuleSource[];
  checkedLabel: string;
}

/** The "what the rules allow" block on the Airbnb service page. */
export function getAirbnbServiceRules(locale: "fr" | "en"): AirbnbServiceRules {
  const s = STR_SOURCES;
  if (locale === "fr") {
    return {
      title: "Ce que les règles permettent à Montréal",
      body:
        "Avant de confier une unité en location courte durée, vérifiez qu'elle peut légalement être louée. Deux paliers s'appliquent : la Ville de Montréal (ou votre municipalité hors Montréal) et l'enregistrement provincial.",
      points: [
        "Résidence principale, Ville de Montréal : location à des touristes permise du 10 juin au 10 septembre seulement, pour un total de 31 jours ou moins, avec un permis d'exploitation de la Ville renouvelé chaque année. Une seule réservation à la fois, aucun repas servi, et le propriétaire doit habiter sur place.",
        "Interdit à Lachine, Saint-Laurent et Saint-Léonard pour une résidence principale. À Lachine, la location touristique de moins de 31 jours est interdite pour toute résidence, principale ou secondaire.",
        "Résidence de tourisme commerciale (unité qui n'est pas votre résidence principale) : permise seulement si l'arrondissement l'autorise, et souvent dans certains secteurs seulement, avec un certificat d'occupation. Plusieurs arrondissements l'interdisent sur tout leur territoire.",
        "Enregistrement provincial obligatoire pour tout séjour payant de 31 jours ou moins : document de conformité municipale, assurance responsabilité civile d'au moins 2 000 000 $ par événement et, en copropriété divise, formulaire d'autorisation du syndicat. Droits 2026 : 54 $ pour une résidence principale, 156 $ pour un établissement général.",
      ],
      sources: [
        { label: s.principalResidence.labelFr, url: s.principalResidence.url },
        { label: s.commercial.labelFr, url: s.commercial.url },
        { label: s.lachine.labelFr, url: s.lachine.url },
        { label: s.registration.labelFr, url: s.registration.url },
      ],
      checkedLabel: "Sources vérifiées le 14 octobre 2026. Les règles changent : relisez les pages officielles avant d'agir.",
    };
  }
  return {
    title: "What the rules allow in Montréal",
    body:
      "Before handing over a unit for short-term rental, check that it can legally be rented. Two layers apply: the City of Montréal (or your municipality outside Montréal) and provincial registration.",
    points: [
      "Principal residence, City of Montréal: renting to tourists is allowed only from June 10 to September 10, for a total of 31 days or less, with a City operating permit renewed every year. One reservation at a time, no meals served, and the owner must live on site.",
      "Prohibited in Lachine, Saint-Laurent and Saint-Léonard for a principal residence. In Lachine, tourist rental of under 31 days is prohibited for any dwelling, principal or secondary.",
      "Commercial tourist residence (a unit that is not your principal residence): allowed only where the borough permits it, often in certain sectors only, with a certificate of occupancy. Several boroughs prohibit it across their whole territory.",
      "Provincial registration is required for any paid stay of 31 days or less: a municipal compliance document, liability insurance of at least 2 000 000 $ per event and, in divided co-ownership, the syndicate's authorisation form. 2026 fees: 54 $ for a principal residence, 156 $ for a general establishment.",
    ],
    sources: [
      { label: s.principalResidence.labelEn, url: s.principalResidence.url },
      { label: s.commercial.labelEn, url: s.commercial.url },
      { label: s.lachine.labelEn, url: s.lachine.url },
      { label: s.registration.labelEn, url: s.registration.url },
    ],
    checkedLabel: "Sources checked October 14, 2026. Rules change: re-read the official pages before acting.",
  };
}

export interface AirbnbLocationRule {
  title: string;
  text: string;
  source: RuleSource;
}

/**
 * The one-paragraph rules note on an Airbnb location page. Borough pages get
 * the City of Montréal rules; other municipalities get the provincial layer
 * and a pointer to their own zoning, because the City's by-law does not
 * apply there.
 */
export function getAirbnbLocationRule(
  citySlug: string,
  cityName: string,
  locale: "fr" | "en",
): AirbnbLocationRule {
  const s = STR_SOURCES;
  const isFr = locale === "fr";
  const title = isFr ? "Règles de location courte durée" : "Short-term rental rules";

  if (citySlug === "montreal") {
    return {
      title,
      text: isFr
        ? "À Montréal, louer sa résidence principale à des touristes n'est permis que du 10 juin au 10 septembre, pour un total de 31 jours ou moins, avec un permis d'exploitation annuel de la Ville, et c'est interdit à Lachine, Saint-Laurent et Saint-Léonard. Une résidence de tourisme commerciale n'est permise que là où l'arrondissement l'autorise, avec un certificat d'occupation. L'enregistrement provincial est obligatoire dans tous les cas."
        : "In Montréal, renting your principal residence to tourists is allowed only from June 10 to September 10, for a total of 31 days or less, with an annual City operating permit, and it is prohibited in Lachine, Saint-Laurent and Saint-Léonard. A commercial tourist residence is allowed only where the borough permits it, with a certificate of occupancy. Provincial registration is required in every case.",
      source: { label: isFr ? s.principalResidence.labelFr : s.principalResidence.labelEn, url: s.principalResidence.url },
    };
  }

  if (CITY_OF_MONTREAL_SLUGS.has(citySlug)) {
    return {
      title,
      text: isFr
        ? `${cityName} est un arrondissement de la Ville de Montréal : louer sa résidence principale à des touristes n'y est permis que du 10 juin au 10 septembre, pour un total de 31 jours ou moins, avec un permis d'exploitation annuel de la Ville. Une résidence de tourisme commerciale n'est permise que si l'arrondissement l'autorise, avec un certificat d'occupation; vérifiez le secteur avant d'acheter ou de meubler. L'enregistrement provincial est obligatoire dans tous les cas.`
        : `${cityName} is a borough of the City of Montréal: renting your principal residence to tourists is allowed there only from June 10 to September 10, for a total of 31 days or less, with an annual City operating permit. A commercial tourist residence is allowed only if the borough permits it, with a certificate of occupancy; check the sector before buying or furnishing. Provincial registration is required in every case.`,
      source: { label: isFr ? s.commercial.labelFr : s.commercial.labelEn, url: s.commercial.url },
    };
  }

  return {
    title,
    text: isFr
      ? `${cityName} n'est pas un arrondissement de la Ville de Montréal : ce sont les règlements d'urbanisme de la municipalité qui déterminent si la location touristique de courte durée y est permise. Partout au Québec, un séjour payant de 31 jours ou moins exige l'enregistrement de l'établissement auprès du gouvernement du Québec, et ce dossier demande un document officiel de la municipalité confirmant la conformité au zonage.`
      : `${cityName} is not a borough of the City of Montréal: the municipality's own planning by-laws decide whether short-term tourist rental is allowed there. Anywhere in Québec, a paid stay of 31 days or less requires registering the establishment with the Gouvernement du Québec, and that file requires an official municipal document confirming zoning compliance.`,
    source: { label: isFr ? s.registration.labelFr : s.registration.labelEn, url: s.registration.url },
  };
}
