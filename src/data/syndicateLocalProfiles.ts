/**
 * Public housing-stock figures for the 20 indexable syndicate location pages.
 *
 * Municipalities: Statistics Canada, 2021 Census, table 98-10-0233-01
 * (private households by period of construction, structural type of dwelling,
 * dwelling condition and tenure), read through the WDS API on
 * LOCAL_DATA_CHECKED_ON. Montréal boroughs are not census subdivisions, so
 * they come from the Ville de Montréal open dataset "Profils des ménages et
 * des logements 2021" (same census, CC BY 4.0), which also gives the
 * neighbourhood breakdown. The two sources agree on the City of Montréal
 * totals (130,580 vs 130,575 households in buildings of 5+ storeys; 36.4%
 * owners in both).
 *
 * Percentages are shares of occupied private dwellings, rounded to one
 * decimal. null means the census table reports no value for that cell.
 * Regenerate from the source rather than editing numbers by hand.
 */

export const LOCAL_DATA_CHECKED_ON = "2026-10-14";

export interface MunicipalProfile {
  csdCode: string;
  households: number;
  owner: number;
  pre1981: number;
  built1981to2000: number;
  post2001: number;
  apt5plus: number | null;
  apt5plusHouseholds: number | null;
  /** Share of the 5+ storey apartments built 2001-2021; null under 1,000 such households. */
  apt5plusBuiltSince2001: number | null;
  aptUnder5: number;
  singleDetached: number;
  majorRepairs: number;
}

export interface BoroughProfile {
  dwellings: number;
  owner: number;
  apt5plus: number;
  apt5plusHouseholds: number;
  aptUnder5: number;
  singleDetached: number;
  majorRepairs: number;
  neighbourhoods: { name: string; apt5plus: number; owner: number }[];
}

export const MUNICIPAL_PROFILES: Record<string, MunicipalProfile> = {
  "longueuil": { csdCode: "2458227", households: 113085, owner: 52.3, pre1981: 55.3, built1981to2000: 25.1, post2001: 19.6, apt5plus: 4.3, apt5plusHouseholds: 4840, apt5plusBuiltSince2001: 18.9, aptUnder5: 49.1, singleDetached: 31.9, majorRepairs: 6.8 },
  "laval": { csdCode: "2465005", households: 169785, owner: 66.6, pre1981: 46.9, built1981to2000: 28.7, post2001: 24.4, apt5plus: 9.8, apt5plusHouseholds: 16575, apt5plusBuiltSince2001: 55.0, aptUnder5: 30.5, singleDetached: 44.8, majorRepairs: 5.2 },
  "montreal": { csdCode: "2466023", households: 816355, owner: 36.4, pre1981: 66.4, built1981to2000: 18.1, post2001: 15.5, apt5plus: 16.0, apt5plusHouseholds: 130580, apt5plusBuiltSince2001: 39.3, aptUnder5: 56.9, singleDetached: 7.1, majorRepairs: 8.6 },
  "brossard": { csdCode: "2458007", households: 35885, owner: 69.6, pre1981: 39.5, built1981to2000: 23.7, post2001: 36.9, apt5plus: 9.1, apt5plusHouseholds: 3250, apt5plusBuiltSince2001: 63.2, aptUnder5: 34.3, singleDetached: 38.8, majorRepairs: 5.1 },
  "boucherville": { csdCode: "2458033", households: 17295, owner: 84.0, pre1981: 49.0, built1981to2000: 28.6, post2001: 22.4, apt5plus: 1.6, apt5plusHouseholds: 285, apt5plusBuiltSince2001: null, aptUnder5: 25.4, singleDetached: 59.1, majorRepairs: 4.8 },
  "repentigny": { csdCode: "2460013", households: 34175, owner: 77.0, pre1981: 37.6, built1981to2000: 38.3, post2001: 24.0, apt5plus: 3.4, apt5plusHouseholds: 1155, apt5plusBuiltSince2001: 52.8, aptUnder5: 26.6, singleDetached: 59.7, majorRepairs: 4.8 },
  "saint-bruno-de-montarville": { csdCode: "2458037", households: 10445, owner: 86.1, pre1981: 60.2, built1981to2000: 22.2, post2001: 17.6, apt5plus: 1.4, apt5plusHouseholds: 150, apt5plusBuiltSince2001: null, aptUnder5: 20.0, singleDetached: 70.7, majorRepairs: 5.7 },
  "terrebonne": { csdCode: "2464008", households: 45245, owner: 76.1, pre1981: 26.2, built1981to2000: 35.9, post2001: 37.8, apt5plus: 2.6, apt5plusHouseholds: 1185, apt5plusBuiltSince2001: 96.2, aptUnder5: 21.1, singleDetached: 62.1, majorRepairs: 4.3 },
  "westmount": { csdCode: "2466032", households: 8590, owner: 53.9, pre1981: 88.0, built1981to2000: 9.3, post2001: 2.9, apt5plus: 37.0, apt5plusHouseholds: 3180, apt5plusBuiltSince2001: 4.7, aptUnder5: 17.9, singleDetached: 12.6, majorRepairs: 8.5 },
  "blainville": { csdCode: "2473015", households: 22425, owner: 77.7, pre1981: 18.8, built1981to2000: 36.0, post2001: 45.2, apt5plus: 1.3, apt5plusHouseholds: 285, apt5plusBuiltSince2001: null, aptUnder5: 21.0, singleDetached: 64.2, majorRepairs: 3.2 },
  "mirabel": { csdCode: "2474005", households: 24795, owner: 66.1, pre1981: 16.3, built1981to2000: 22.9, post2001: 60.9, apt5plus: 0.7, apt5plusHouseholds: 165, apt5plusBuiltSince2001: null, aptUnder5: 26.6, singleDetached: 54.0, majorRepairs: 2.6 },
  "saint-eustache": { csdCode: "2472005", households: 18955, owner: 69.5, pre1981: 48.3, built1981to2000: 30.7, post2001: 21.0, apt5plus: 1.6, apt5plusHouseholds: 310, apt5plusBuiltSince2001: null, aptUnder5: 32.6, singleDetached: 53.4, majorRepairs: 4.4 },
  "boisbriand": { csdCode: "2473005", households: 11425, owner: 64.5, pre1981: 35.6, built1981to2000: 43.5, post2001: 20.8, apt5plus: 0.6, apt5plusHouseholds: 65, apt5plusBuiltSince2001: null, aptUnder5: 38.9, singleDetached: 46.8, majorRepairs: 4.4 },
  "saint-lambert": { csdCode: "2458012", households: 10550, owner: 60.9, pre1981: 68.1, built1981to2000: 21.0, post2001: 10.9, apt5plus: 23.2, apt5plusHouseholds: 2445, apt5plusBuiltSince2001: 25.6, aptUnder5: 34.7, singleDetached: 28.6, majorRepairs: 7.0 },
  "sainte-julie": { csdCode: "2459010", households: 11610, owner: 79.8, pre1981: 35.9, built1981to2000: 43.2, post2001: 20.9, apt5plus: null, apt5plusHouseholds: null, apt5plusBuiltSince2001: null, aptUnder5: 24.4, singleDetached: 66.8, majorRepairs: 2.9 },
};

export const BOROUGH_PROFILES: Record<string, BoroughProfile> = {
  "lasalle": { dwellings: 35770, owner: 39.2, apt5plus: 6.6, apt5plusHouseholds: 2370, aptUnder5: 82.2, singleDetached: 11.2, majorRepairs: 7.4, neighbourhoods: [{ name: "Cecil-P.-Newman", apt5plus: 1.2, owner: 31.9 }, { name: "Sault-Saint-Louis", apt5plus: 10.3, owner: 44.2 }] },
  "plateau-mont-royal": { dwellings: 57880, owner: 27.9, apt5plus: 16.5, apt5plusHouseholds: 9550, aptUnder5: 81, singleDetached: 2.5, majorRepairs: 10.9, neighbourhoods: [{ name: "Lorimier", apt5plus: 8.4, owner: 28.2 }, { name: "Parc-Lafontaine", apt5plus: 15.9, owner: 31.1 }, { name: "Parc-Laurier", apt5plus: 4, owner: 33.7 }, { name: "Mile End", apt5plus: 11.1, owner: 31.0 }, { name: "Saint-Louis", apt5plus: 12.8, owner: 29.7 }, { name: "Milton-Parc", apt5plus: 59.5, owner: 8.8 }] },
  "saint-laurent": { dwellings: 39155, owner: 47.8, apt5plus: 29.8, apt5plusHouseholds: 11675, aptUnder5: 44.7, singleDetached: 25.3, majorRepairs: 8.0, neighbourhoods: [{ name: "Chameran/Montpellier", apt5plus: 75.2, owner: 24.3 }, { name: "Grenet", apt5plus: 16.4, owner: 32.4 }, { name: "Dutrisac", apt5plus: 11.4, owner: 53.3 }, { name: "Bois-Francs", apt5plus: 21.3, owner: 63.2 }, { name: "Du Collège/Hodge", apt5plus: 14.1, owner: 52.3 }] },
  "verdun": { dwellings: 35075, owner: 37.6, apt5plus: 22.7, apt5plusHouseholds: 7960, aptUnder5: 67.3, singleDetached: 10, majorRepairs: 8.8, neighbourhoods: [{ name: "Verdun-Centre", apt5plus: 8.9, owner: 27.0 }, { name: "Île-des-Sœurs", apt5plus: 61, owner: 57.5 }, { name: "Desmarchais-Crawford", apt5plus: 3, owner: 33.5 }] },
  "ville-marie": { dwellings: 61425, owner: 27.5, apt5plus: 56.9, apt5plusHouseholds: 34940, aptUnder5: 40.7, singleDetached: 2.4, majorRepairs: 8.0, neighbourhoods: [{ name: "Sainte-Marie", apt5plus: 15.7, owner: 24.4 }, { name: "Vieux-Montréal", apt5plus: 72.7, owner: 49.2 }, { name: "René-Lévesque", apt5plus: 73.6, owner: 27.6 }, { name: "Montagne", apt5plus: 80.3, owner: 19.8 }] },
};

/** City of Montréal rate, used as the comparison point on every other page. */
const MONTREAL_MAJOR_REPAIRS = 8.6;

const SOURCES = {
  statcan: {
    fr: "https://www150.statcan.gc.ca/t1/tbl1/fr/tv.action?pid=9810023301",
    en: "https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=9810023301",
  },
  mtlProfiles: "https://donnees.montreal.ca/dataset/profils-menages-logements",
  rbqFacades: {
    fr: "https://www.rbq.gouv.qc.ca/domaines-dintervention/batiment/interpretation-directives-techniques-et-administratives/chapitre-batiment-du-code-de-securite/facades-entretien-et-inspection/",
    en: "https://www.rbq.gouv.qc.ca/en/areas-of-intervention/building/technical-information/building-chapter-from-the-safety-code/facades-maintenance-and-inspection/",
  },
  ccq: {
    fr: "https://www.legisquebec.gouv.qc.ca/fr/document/lc/CCQ-1991",
    en: "https://www.legisquebec.gouv.qc.ca/en/document/cs/CCQ-1991",
  },
} as const;

export interface LocalSource {
  label: string;
  url: string;
}

export interface SyndicateLocalSection {
  title: string;
  facts: string[];
  points: string[];
  sources: LocalSource[];
  checkedLabel: string;
}

type Locale = "fr" | "en";

function pct(value: number, locale: Locale): string {
  const n = value.toLocaleString(locale === "fr" ? "fr-CA" : "en-CA", { maximumFractionDigits: 1 });
  return locale === "fr" ? `${n} %` : `${n}%`;
}

function count(value: number, locale: Locale): string {
  return value.toLocaleString(locale === "fr" ? "fr-CA" : "en-CA");
}

/** French "de" + place name, with the contractions a borough name needs ("du Plateau-Mont-Royal"). */
const FR_MASCULINE_ARTICLE: ReadonlySet<string> = new Set(["Plateau-Mont-Royal", "Sud-Ouest"]);

function deFr(name: string): string {
  if (FR_MASCULINE_ARTICLE.has(name)) return `du ${name}`;
  if (name.startsWith("Le ")) return `du ${name.slice(3)}`;
  if (name.startsWith("Les ")) return `des ${name.slice(4)}`;
  if (name.startsWith("La ")) return `de la ${name.slice(3)}`;
  if (/^[AEIOUYÀÂÉÈÊÎÔÛaeiouyh]/.test(name)) return `d'${name}`;
  return `de ${name}`;
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

interface Shared {
  owner: number;
  apt5plus: number | null;
  apt5plusHouseholds: number | null;
  aptUnder5: number;
  singleDetached: number;
  majorRepairs: number;
}

function majorRepairsFact(p: Shared, isMontreal: boolean, locale: Locale): string {
  if (isMontreal) {
    return locale === "fr"
      ? `${pct(p.majorRepairs, locale)} des logements avaient besoin de réparations majeures en 2021; le Plateau-Mont-Royal avait le taux le plus élevé des arrondissements, 10,9 %.`
      : `${pct(p.majorRepairs, locale)} of dwellings needed major repairs in 2021; Le Plateau-Mont-Royal had the highest borough rate, 10.9%.`;
  }
  const rel = p.majorRepairs > MONTREAL_MAJOR_REPAIRS ? "above" : p.majorRepairs < MONTREAL_MAJOR_REPAIRS ? "below" : "equal";
  if (locale === "fr") {
    const word = rel === "above" ? "au-dessus du" : rel === "below" ? "sous le" : "égal au";
    return `${pct(p.majorRepairs, locale)} des logements avaient besoin de réparations majeures en 2021, ${word} taux de la Ville de Montréal (${pct(MONTREAL_MAJOR_REPAIRS, locale)}).`;
  }
  const word = rel === "above" ? "above" : rel === "below" ? "below" : "equal to";
  return `${pct(p.majorRepairs, locale)} of dwellings needed major repairs in 2021, ${word} the City of Montréal rate (${pct(MONTREAL_MAJOR_REPAIRS, locale)}).`;
}

function typesFact(p: Shared, locale: Locale): string {
  if (locale === "fr") {
    const tower = p.apt5plus === null ? "" : `${pct(p.apt5plus, locale)} sont des appartements dans des immeubles de cinq étages ou plus, `;
    return `Par type de bâtiment : ${tower}${pct(p.aptUnder5, locale)} des appartements dans un duplex ou un immeuble de moins de cinq étages, et ${pct(p.singleDetached, locale)} des maisons individuelles.`;
  }
  const tower = p.apt5plus === null ? "" : `${pct(p.apt5plus, locale)} are apartments in buildings of five storeys or more, `;
  return `By building type: ${tower}${pct(p.aptUnder5, locale)} are apartments in a duplex or a building under five storeys, and ${pct(p.singleDetached, locale)} are single-detached houses.`;
}

/**
 * Practical points, in priority order; at most three are shown. Each one is
 * triggered by this city's own figures and rests on a rule or a cited source.
 */
function buildPoints(
  p: Shared,
  ages: { pre1981?: number; built1981to2000?: number; post2001?: number; apt5plusBuiltSince2001?: number | null },
  locale: Locale,
): { points: string[]; usesRbq: boolean; usesCcq: boolean } {
  const fr = locale === "fr";
  const points: string[] = [];
  let usesRbq = false;
  let usesCcq = false;

  if (p.apt5plusHouseholds !== null && p.apt5plusHouseholds >= 1000) {
    usesRbq = true;
    let s = fr
      ? `${count(p.apt5plusHouseholds, locale)} ménages vivent dans des immeubles de cinq étages ou plus. Le propriétaire d'un tel immeuble doit obtenir d'un architecte ou d'un ingénieur un rapport de vérification des façades au plus tard au 10e anniversaire de la construction, puis tous les 5 ans, et tenir un registre. En copropriété, cette obligation revient au syndicat, qui entretient les parties communes.`
      : `${count(p.apt5plusHouseholds, locale)} households live in buildings of five storeys or more. The owner of such a building must obtain a façade verification report from an architect or engineer by the 10th anniversary of construction, then every 5 years, and keep a register. In a condo, that falls to the syndicate, which maintains the common portions.`;
    const recent = ages.apt5plusBuiltSince2001;
    if (recent !== undefined && recent !== null) {
      if (recent >= 50) {
        s += fr
          ? ` ${pct(recent, locale)} de ces logements sont dans des immeubles construits depuis 2001 : beaucoup en sont à leur premier ou deuxième cycle de rapports.`
          : ` ${pct(recent, locale)} of these units are in buildings put up since 2001, so many are in their first or second report cycle.`;
      } else if (recent < 15) {
        s += fr
          ? ` Seulement ${pct(recent, locale)} de ces logements sont dans des immeubles construits depuis 2001 : la plupart des tours en sont à plusieurs cycles de rapports.`
          : ` Only ${pct(recent, locale)} of these units are in buildings put up since 2001, so most of these towers are several report cycles in.`;
      }
    }
    points.push(s);
  }

  if (p.owner < 50) {
    usesCcq = true;
    const renters = round1(100 - p.owner);
    points.push(
      fr
        ? `${pct(renters, locale)} des ménages sont locataires. Le copropriétaire qui loue sa partie privative doit en aviser le syndicat dans les 15 jours, avec le nom du locataire, la durée du bail et la date de remise du règlement de l'immeuble, qui devient opposable au locataire dès cette remise (Code civil du Québec, art. 1065 et 1057).`
        : `${pct(renters, locale)} of households rent. A co-owner who leases their unit must notify the syndicate within 15 days with the tenant's name, the lease term and the date the tenant received the building by-laws, which bind the tenant from that moment (Civil Code of Québec, arts. 1065 and 1057).`,
    );
  }

  if (ages.pre1981 !== undefined && ages.pre1981 >= 45) {
    points.push(
      fr
        ? `${pct(ages.pre1981, locale)} des logements ont été construits avant 1981 et ont donc plus de 45 ans. Pour un immeuble de cet âge, l'étude du fonds de prévoyance doit chiffrer le remplacement de l'enveloppe, de la toiture, de la plomberie et de l'électricité, pas seulement l'entretien courant.`
        : `${pct(ages.pre1981, locale)} of dwellings were built before 1981, so they are now over 45 years old. For a building that age, the reserve-fund study should cost out replacing the envelope, roof, plumbing and electrical systems, not just routine upkeep.`,
    );
  }

  if (ages.built1981to2000 !== undefined && ages.built1981to2000 >= 35) {
    points.push(
      fr
        ? `${pct(ages.built1981to2000, locale)} des logements ont été construits entre 1981 et 2000. À 25 à 45 ans, ces immeubles arrivent au premier cycle de remplacement des toitures, fenêtres et systèmes mécaniques, que l'étude du fonds de prévoyance doit planifier.`
        : `${pct(ages.built1981to2000, locale)} of dwellings were built between 1981 and 2000. At 25 to 45 years old, these buildings are reaching their first replacement cycle for roofs, windows and mechanical systems, which the reserve-fund study should schedule.`,
    );
  }

  if (ages.post2001 !== undefined && ages.post2001 >= 35) {
    points.push(
      fr
        ? `${pct(ages.post2001, locale)} des logements ont été construits depuis 2001. Dans un jeune syndicat, la première étude du fonds de prévoyance et le carnet d'entretien fixent les contributions pour des années; rattraper un sous-financement mène à des cotisations spéciales.`
        : `${pct(ages.post2001, locale)} of dwellings were built since 2001. In a young syndicate, the first reserve-fund study and maintenance logbook set contributions for years; catching up on underfunding later means special assessments.`,
    );
  }

  if (p.aptUnder5 >= 60) {
    points.push(
      fr
        ? `${pct(p.aptUnder5, locale)} des logements sont dans un duplex ou un immeuble de moins de cinq étages. Les copropriétés issues de plex convertis comptent souvent moins de 6 unités, sous le minimum de 6 unités de Gestion Velora; à cette taille, un CA rigoureux en autogestion convient souvent mieux.`
        : `${pct(p.aptUnder5, locale)} of dwellings are in a duplex or a building under five storeys. Condos converted from plexes often have fewer than 6 units, below Gestion Velora's 6-unit minimum; at that size, a careful self-managed board is often the better fit.`,
    );
  }

  if (points.length < 2 && p.majorRepairs <= 6) {
    points.push(
      fr
        ? `Seulement ${pct(p.majorRepairs, locale)} des logements avaient besoin de réparations majeures en 2021. Un parc en bon état est le moment de capitaliser le fonds de prévoyance, avant l'arrivée des grosses factures.`
        : `Only ${pct(p.majorRepairs, locale)} of dwellings needed major repairs in 2021. A stock in good condition is the time to build up the reserve fund, before the large bills arrive.`,
    );
  }

  return { points: points.slice(0, 3), usesRbq, usesCcq };
}

export function hasSyndicateLocalProfile(citySlug: string): boolean {
  return citySlug in MUNICIPAL_PROFILES || citySlug in BOROUGH_PROFILES;
}

export function getSyndicateLocalSection(
  citySlug: string,
  cityName: string,
  locale: Locale,
): SyndicateLocalSection | null {
  const fr = locale === "fr";
  const muni = MUNICIPAL_PROFILES[citySlug];
  const borough = BOROUGH_PROFILES[citySlug];
  if (!muni && !borough) return null;

  const title = fr ? `Le parc immobilier ${deFr(cityName)} en chiffres` : `${cityName} housing stock in figures`;
  const facts: string[] = [];
  const sources: LocalSource[] = [];
  let built: ReturnType<typeof buildPoints>;

  if (muni) {
    facts.push(
      fr
        ? `${count(muni.households, locale)} ménages privés au recensement de 2021, dont ${pct(muni.owner, locale)} propriétaires de leur logement.`
        : `${count(muni.households, locale)} private households in the 2021 Census; ${pct(muni.owner, locale)} own their home.`,
    );
    facts.push(
      fr
        ? `Âge du parc : ${pct(muni.pre1981, locale)} construits avant 1981, ${pct(muni.built1981to2000, locale)} entre 1981 et 2000, ${pct(muni.post2001, locale)} depuis 2001.`
        : `Age of the stock: ${pct(muni.pre1981, locale)} built before 1981, ${pct(muni.built1981to2000, locale)} between 1981 and 2000, ${pct(muni.post2001, locale)} since 2001.`,
    );
    facts.push(typesFact(muni, locale));
    facts.push(majorRepairsFact(muni, citySlug === "montreal", locale));
    built = buildPoints(muni, muni, locale);
    sources.push({
      label: fr
        ? `Statistique Canada, Recensement de 2021, tableau 98-10-0233-01 (subdivision de recensement ${muni.csdCode})`
        : `Statistics Canada, 2021 Census, table 98-10-0233-01 (census subdivision ${muni.csdCode})`,
      url: SOURCES.statcan[locale],
    });
    if (citySlug === "montreal") {
      sources.push({
        label: fr
          ? "Ville de Montréal, Profils des ménages et des logements 2021 (données ouvertes, CC BY 4.0)"
          : "Ville de Montréal, Profils des ménages et des logements 2021 (open data, CC BY 4.0)",
        url: SOURCES.mtlProfiles,
      });
    }
  } else {
    const b = borough!;
    facts.push(
      fr
        ? `${count(b.dwellings, locale)} logements occupés au recensement de 2021, dont ${pct(b.owner, locale)} occupés par leur propriétaire.`
        : `${count(b.dwellings, locale)} occupied dwellings in the 2021 Census; ${pct(b.owner, locale)} are owner-occupied.`,
    );
    facts.push(typesFact(b, locale));
    facts.push(majorRepairsFact(b, false, locale));
    const sorted = [...b.neighbourhoods].sort((x, y) => x.apt5plus - y.apt5plus);
    const lo = sorted[0];
    const hi = sorted[sorted.length - 1];
    facts.push(
      fr
        ? `D'un quartier à l'autre, la part des immeubles de cinq étages ou plus va de ${pct(lo.apt5plus, locale)} (${lo.name}) à ${pct(hi.apt5plus, locale)} (${hi.name}).`
        : `From one neighbourhood to the next, the share in buildings of five storeys or more ranges from ${pct(lo.apt5plus, locale)} (${lo.name}) to ${pct(hi.apt5plus, locale)} (${hi.name}).`,
    );
    built = buildPoints(b, {}, locale);
    sources.push({
      label: fr
        ? `Ville de Montréal, Profils des ménages et des logements 2021, ${cityName} (données ouvertes, CC BY 4.0)`
        : `Ville de Montréal, Profils des ménages et des logements 2021, ${cityName} (open data, CC BY 4.0)`,
      url: SOURCES.mtlProfiles,
    });
  }

  if (built.usesRbq) {
    sources.push({
      label: fr ? "Régie du bâtiment du Québec, Façades – Entretien et inspection" : "Régie du bâtiment du Québec, Façades – maintenance and inspection",
      url: SOURCES.rbqFacades[locale],
    });
  }
  if (built.usesCcq) {
    sources.push({
      label: fr ? "Code civil du Québec, art. 1057 et 1065" : "Civil Code of Québec, arts. 1057 and 1065",
      url: SOURCES.ccq[locale],
    });
  }

  return {
    title,
    facts,
    points: built.points,
    sources,
    checkedLabel: fr
      ? "Chiffres du recensement de 2021, sources consultées le 14 octobre 2026."
      : "2021 Census figures, sources checked October 14, 2026.",
  };
}
