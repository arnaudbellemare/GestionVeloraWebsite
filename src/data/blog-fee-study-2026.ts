import { blogCoverPath } from "../lib/blogImages";
import type { BlogPost, BlogSource } from "./blog";

/**
 * 2026 Quebec property-management fee study.
 *
 * Every figure below was read from the cited page on 2026-10-14 (see
 * claudedocs/fee-study-2026-research-fees.md and -market.md for the raw notes).
 * Medians exclude Gestion Velora so the study does not grade its own pricing;
 * Velora appears as a labelled reference row. Raw data ships as CSV/JSON under
 * /public/data so other sites can cite or re-analyse it.
 */

const STUDY_SLUG = "etude-frais-gestion-immobiliere-quebec-2026";
const STUDY_URL = `https://www.gestionvelora.com/blog/${STUDY_SLUG}`;

const URL_MULTIRENT = "https://www.multirent.ca/tarifs/";
const URL_AJAX = "https://gestionajax.ca/";
const URL_STRATEGIS = "https://condostrategis.ca/gestion-de-syndicat-de-copropriete/";
const URL_SERVICECONDO = "https://servicecondo.com/prices.php";
const URL_DELUXCO = "https://deluxco.ca/";
const URL_GESTIONDECONDOS = "https://gestiondecondos.com/services/gestion-externe/";
const URL_CONDOVIP = "https://www.gestioncondovip.com/en/";
const URL_SOLUTIONCONDO =
  "https://www.solutioncondo.com/services-gestion-copropriete/taux-horaires-et-debours/";
const URL_LOCATION_AJAX = "https://locationajax.ca/en/price-property-management/";
const URL_PENATES = "https://gestionimmobilierepl.com/grille-de-tarification";
const URL_PINARD =
  "https://www.marcelpinardgestionimmobiliere.com/gestion-immobiliere-a-sherbrooke";
const URL_PARKPLACE = "https://parkpl.co/montreal";
const URL_HEARTHOMES = "https://hearthomes.ca/airbnb-management-montreal/";
const URL_ABMM = "https://airbnbmanagementmontreal.com/";
const URL_STAYPRO = "https://staypro.ca/en/cities/montreal/";
const URL_RESERVER = "https://reserver.ca/en/gestion-locative";
const URL_TAL_RN2026 = "https://www.tal.gouv.qc.ca/sites/default/files/RN_2026_F.pdf";
const URL_TAL_PCT =
  "https://www.tal.gouv.qc.ca/fr/reconduction-du-bail-et-fixation-de-loyer/pourcentages-applicables-aux-criteres-de-fixation-de-loyer";
const URL_GAZETTE =
  "https://www.publicationsduquebec.gouv.qc.ca/fileadmin/gazette/pdf_encrypte/lois_reglements/2025F/86904.pdf";
const URL_SCHL_2015 = "https://pmml.ca/wp-content/uploads/2020/10/Frais-dexploitation-avril-2015.pdf";
const URL_CMHC_RMR =
  "https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research/market-reports/rental-market-reports-major-centres";
const URL_CMHC_TABLE =
  "https://assets.cmhc-schl.gc.ca/sites/cmhc/professional/housing-markets-data-and-research/housing-data-tables/rental-market/rental-market-report-data-tables/2025/rmr-canada-2025-en.xlsx";
const URL_STATCAN_CPI = "https://www150.statcan.gc.ca/n1/daily-quotidien/260914/t002a-eng.htm";
const URL_STATCAN_CPI_2025 = "https://www150.statcan.gc.ca/n1/daily-quotidien/260119/dq260119b-eng.htm";
const URL_APCIQ_MTL = "https://com.apciq.ca/sam/pdf/bar/2026/202603-bar-mtl-en.pdf";
const URL_APCIQ_QC = "https://com.apciq.ca/sam/pdf/bar/2026/202603-bar-quebec.pdf";
const URL_LOCALYS =
  "https://www.gestionlocalys.com/en/articles/gestion-locative-cle-en-main-quebec";
const URL_MAHD =
  "https://www.gestionmahd.com/combien-coute-un-gestionnaire-de-copropriete-au-quebec-en-2026/";
const URL_TENANTPAY =
  "https://www.tenantpay.com/blog/property-management-fees-in-canada-2026-costs";
const URL_SOUMISSIONS_COPRO = "https://soumissionscopropriete.ca/gestionnaires-copropriete-quebec/";
const URL_VELORA_TARIFS = "/tarifs";

const SOURCES_FR: BlogSource[] = [
  { label: "multiRent — Tarifs de gestion de copropriété", url: URL_MULTIRENT, date: "grille en vigueur depuis le 10 septembre 2026" },
  { label: "Gestion Ajax — Prix de la gestion de copropriété", url: URL_AJAX, date: "2026" },
  { label: "Condo Stratégis — Gestion de syndicat de copropriété", url: URL_STRATEGIS, date: "2026" },
  { label: "ServiceCondo — Prices", url: URL_SERVICECONDO, date: "2026" },
  { label: "Deluxco — Gestion de copropriété", url: URL_DELUXCO, date: "pied de page 2024" },
  { label: "GestionDeCondos.com — Gestion externe", url: URL_GESTIONDECONDOS, date: "page non datée" },
  { label: "GestionCondo VIP — Pricing", url: URL_CONDOVIP, date: "page du 8 décembre 2021, pied de page 2024" },
  { label: "SolutionCondo — Taux horaires et débours 2026-2027", url: URL_SOLUTIONCONDO, date: "2026" },
  { label: "Location Ajax — Price of property management", url: URL_LOCATION_AJAX, date: "2026" },
  { label: "Gestion immobilière Pénates et Lares — Grille de tarification", url: URL_PENATES, date: "2026" },
  { label: "Marcel Pinard Gestion immobilière — Sherbrooke", url: URL_PINARD, date: "2024-2026" },
  { label: "Park Place Properties — Montréal", url: URL_PARKPLACE, date: "2026" },
  { label: "HeartHomes — Airbnb management Montréal", url: URL_HEARTHOMES, date: "pied de page 2024" },
  { label: "AirBNB Management Montreal — Forfaits", url: URL_ABMM, date: "pied de page 2024" },
  { label: "StayPro — Montréal", url: URL_STAYPRO, date: "page non datée" },
  { label: "Reserver.ca — Gestion locative", url: URL_RESERVER, date: "2026" },
  { label: "TAL — Formulaire de renseignements nécessaires à la fixation du loyer 2026 (RN 2026)", url: URL_TAL_RN2026, date: "PDF modifié le 1er décembre 2025" },
  { label: "TAL — Pourcentages applicables aux critères de fixation de loyer 2026", url: URL_TAL_PCT, date: "annoncés le 19 janvier 2026" },
  { label: "Gazette officielle du Québec — Décret 1455-2025 (nouvelle méthode de fixation)", url: URL_GAZETTE, date: "17 décembre 2025" },
  { label: "SCHL — Grille des frais d'exploitation, Québec (hébergée par PMML)", url: URL_SCHL_2015, date: "avril 2015" },
  { label: "SCHL — Rapport sur le marché locatif, enquête d'octobre 2025", url: URL_CMHC_RMR, date: "publié le 11 décembre 2025" },
  { label: "SCHL — Tableaux de données, Canada (tableau 1.0), 2025", url: URL_CMHC_TABLE, date: "11 décembre 2025" },
  { label: "Statistique Canada — Indice des prix à la consommation, revue annuelle 2025", url: URL_STATCAN_CPI_2025, date: "19 janvier 2026" },
  { label: "Statistique Canada — IPC par province, août 2026", url: URL_STATCAN_CPI, date: "14 septembre 2026" },
  { label: "APCIQ — Baromètre résidentiel, RMR de Montréal, T3 2026", url: URL_APCIQ_MTL, date: "octobre 2026" },
  { label: "APCIQ — Baromètre résidentiel, RMR de Québec, T3 2026", url: URL_APCIQ_QC, date: "octobre 2026" },
  { label: "Gestion Velora — Tarifs", url: `https://www.gestionvelora.com${URL_VELORA_TARIFS}`, date: "2026" },
  { label: "Sources secondaires (hors médianes) : Gestion MAHD", url: URL_MAHD, date: "15 août 2026" },
  { label: "Sources secondaires : Soumissions Copropriété", url: URL_SOUMISSIONS_COPRO, date: "2026" },
  { label: "Sources secondaires : Localys", url: URL_LOCALYS, date: "12 août 2026" },
  { label: "Sources secondaires : TenantPay", url: URL_TENANTPAY, date: "7 février 2026" },
];

const SOURCES_EN: BlogSource[] = SOURCES_FR.map((s) => ({
  ...s,
  date: s.date
    ?.replace("grille en vigueur depuis le 10 septembre 2026", "grid in force since September 10, 2026")
    .replace("pied de page 2024", "2024 footer")
    .replace("page non datée", "undated page")
    .replace("page du 8 décembre 2021, pied de page 2024", "page dated December 8, 2021; 2024 footer")
    .replace("PDF modifié le 1er décembre 2025", "PDF modified December 1, 2025")
    .replace("annoncés le 19 janvier 2026", "announced January 19, 2026")
    .replace("17 décembre 2025", "December 17, 2025")
    .replace("avril 2015", "April 2015")
    .replace("publié le 11 décembre 2025", "published December 11, 2025")
    .replace("11 décembre 2025", "December 11, 2025")
    .replace("19 janvier 2026", "January 19, 2026")
    .replace("14 septembre 2026", "September 14, 2026")
    .replace("octobre 2026", "October 2026")
    .replace("15 août 2026", "August 15, 2026")
    .replace("12 août 2026", "August 12, 2026")
    .replace("7 février 2026", "February 7, 2026"),
  label: s.label
    .replace("Sources secondaires (hors médianes) :", "Secondary sources (outside the medians):")
    .replace("Sources secondaires :", "Secondary sources:"),
}));

export const feeStudyBlogPosts: BlogPost[] = [
  {
    slug: STUDY_SLUG,
    image: blogCoverPath("cover-noi-data.webp"),
    datePublished: "2026-10-14",
    dateModified: "2026-10-14",
    dataset: {
      csv: "/data/etude-frais-gestion-immobiliere-quebec-2026.csv",
      json: "/data/etude-frais-gestion-immobiliere-quebec-2026.json",
      name: {
        fr: "Frais de gestion immobilière publiés au Québec, 2026 (copropriété, location, Airbnb)",
        en: "Published property management fees in Quebec, 2026 (condo, rental, Airbnb)",
      },
      description: {
        fr: "35 points de données relevés le 14 octobre 2026 sur les pages tarifaires de 16 firmes québécoises, plus les repères du TAL et de la SCHL : tarif par unité par mois en copropriété, pourcentage du loyer en gestion locative, pourcentage des revenus en location courte durée. Chaque ligne cite l'URL, la date affichée et la base de taxation.",
        en: "35 data points read on October 14, 2026 from the pricing pages of 16 Quebec firms, plus TAL and CMHC benchmarks: per-unit monthly condo fees, percentage-of-rent rental management fees, percentage-of-revenue short-term rental fees. Every row cites the URL, the displayed date and the tax basis.",
      },
    },
    fr: {
      category: "Étude",
      date: "Octobre 2026",
      title: "Étude 2026 : les frais de gestion immobilière au Québec, d'après les grilles publiées de 16 firmes",
      metaTitle: "Frais de gestion immobilière au Québec : étude 2026",
      excerpt:
        "Copropriété 31 $ à 60 $ par unité par mois, location 5 % à 10 % du loyer, Airbnb 10 % à 20 % des revenus : les prix publiés au Québec en 2026, avec sources.",
      brief:
        "En octobre 2026, sept firmes du Grand Montréal publient un tarif de gestion de copropriété : 31 $ à 60 $ par unité par mois pour leur forfait le plus complet, médiane 37 $, soit 8 928 $ à 17 280 $ par an pour 24 unités. Les grilles publiées de gestion locative longue durée vont de 5 % à 10 % du loyer perçu, et la gestion Airbnb de 10 % à 20 % des revenus. Le TAL retient 5 % du revenu annuel comme frais de gestion.",
      study: {
        citation: `Gestion Velora (2026). Étude 2026 des frais de gestion immobilière au Québec : grilles tarifaires publiées de 16 firmes. Montréal, 14 octobre 2026. ${STUDY_URL}`,
        methodology:
          "Les 35 points de données ont été relevés le 14 octobre 2026 directement sur les pages tarifaires des firmes (jamais sur un annuaire ni une capture de moteur de recherche), puis recopiés tels quels avec la date affichée sur la page et la mention « avant taxes » ou « plus taxes » quand elle existe. Les médianes excluent Gestion Velora. Les repères réglementaires proviennent des documents du TAL, de la Gazette officielle, de la SCHL, de Statistique Canada et de l'APCIQ. Les données brutes sont téléchargeables ci-dessous et réutilisables librement avec mention de la source.",
        sources: SOURCES_FR,
      },
      sections: [
        {
          heading: "Que révèlent les grilles tarifaires publiées au Québec en 2026 ?",
          paragraphs: [
            "La plupart des articles sur « le coût d'un gestionnaire » recopient une fourchette sans dire d'où elle vient. Cette étude fait l'inverse : elle ne retient que des prix affichés publiquement par la firme elle-même, relevés le 14 octobre 2026, avec l'URL et la date visible sur chaque page. Au total, 16 firmes québécoises publient un tarif exploitable : 7 en gestion de copropriété, 3 en gestion locative longue durée et 6 en location courte durée. Deux autres n'affichent que des taux horaires ou des prix à la carte.",
            "Première constatation : la gestion de copropriété est le segment le plus transparent. Sept firmes du Grand Montréal affichent une grille par unité par mois, et les écarts sont larges : de 31 $ à 60 $ par unité par mois pour le forfait le plus complet de chaque firme, avec une médiane à 37 $. Le forfait d'entrée (administration et comptabilité sans l'entretien) se situe entre 27 $ et 45 $, médiane 31 $.",
            "Deuxième constatation : la gestion locative longue durée se facture presque toujours en pourcentage du loyer perçu, et toutes les grilles publiées tiennent dans la même bande de 5 % à 10 %, à Montréal comme à Gatineau ou Sherbrooke. La mise en location seule coûte en général un mois de loyer. Troisième constatation : la gestion Airbnb publiée va de 10 % à 20 % des revenus, les services complets se situant entre 15 % et 20 %.",
          ],
          table: {
            caption: "Résultats clés, prix publiés au Québec, relevés le 14 octobre 2026",
            columns: ["Segment", "Firmes avec grille publiée", "Fourchette publiée", "Médiane (hors Velora)", "Base"],
            rows: [
              ["Copropriété, forfait complet", "7 (Grand Montréal)", "31 $ à 60 $ / unité / mois", "37 $", "Avant taxes quand précisé"],
              ["Copropriété, forfait d'entrée", "7 (Grand Montréal)", "27 $ à 45 $ / unité / mois", "31 $", "Avant taxes quand précisé"],
              ["Location longue durée", "3 (Montréal, Gatineau, Sherbrooke)", "5 % à 10 % du loyer perçu", "Bande commune 5 % à 10 %", "Avant taxes quand précisé"],
              ["Mise en location seule", "1 grille + 1 référence", "Un mois de loyer", "—", "Une fois"],
              ["Location courte durée (Airbnb)", "6 (Montréal, Québec, chalets)", "10 % à 20 % des revenus", "15 % (service complet)", "Base de calcul rarement précisée"],
              ["Repère TAL (fixation de loyer)", "Règlement", "5 % du revenu annuel, jusqu'à 10 % si justifié", "—", "Convention, pas un prix de marché"],
            ],
            note: "Médianes calculées sur les firmes tierces seulement ; Gestion Velora figure comme ligne de référence dans chaque tableau. Les fourchettes « forfait complet » prennent, pour chaque firme, le forfait publié le plus étendu au tarif d'un contrat d'un an.",
          },
        },
        {
          heading: "Comment l'étude a-t-elle été construite ?",
          paragraphs: [
            "Règle d'inclusion : un chiffre n'entre dans l'étude que s'il est affiché sur une page de la firme (page « Tarifs », grille PDF ou page de service) avec un montant ou un pourcentage explicite. Les pages qui renvoient à une soumission sans prix ont été notées mais exclues. Les fourchettes publiées dans des blogues tiers, des plateformes de soumissions ou par des fournisseurs de logiciels sont reléguées dans un tableau « sources secondaires » et n'entrent dans aucune médiane.",
            "Chaque montant est recopié tel quel, avec sa base (par unité par mois, pourcentage du loyer perçu, pourcentage des revenus), sa taille minimale d'immeuble, la mention « avant taxes » ou « plus taxes » lorsqu'elle existe, et la date la plus précise visible sur la page : date d'entrée en vigueur, date de publication ou, à défaut, année du pied de page. Deux grilles de copropriété datent de 2021 et de 2024 et sont signalées comme telles.",
            [
              "Gestion Velora publie ses propres tarifs sur sa ",
              { text: "page Tarifs", to: URL_VELORA_TARIFS },
              " et apparaît dans chaque tableau comme ligne de référence, mais les médianes sont calculées sans elle afin que l'étude ne note pas sa propre grille. Les notes de recherche complètes, avec les pages consultées et les chiffres contradictoires rencontrés en chemin, sont résumées dans la section « limites » plus bas.",
            ],
          ],
        },
        {
          heading: "Combien coûte la gestion d'un syndicat de copropriété au Québec en 2026 ?",
          paragraphs: [
            [
              "Sept firmes du Grand Montréal publient une grille par unité par mois. La moins chère pour un petit immeuble est ",
              { text: "Gestion Ajax", to: URL_AJAX },
              " à 29 $ pour 6 à 20 unités (31 $ de 21 à 100 unités, 37 $ au-delà de 100), avec le même minimum de 6 unités que Gestion Velora. ",
              { text: "multiRent", to: URL_MULTIRENT },
              " décompose son offre en trois paliers (financière 10 $, administrative 27 $, complète 37 $) avec un plancher de 210 $ par mois et des frais d'inscription uniques de 450 $. ",
              { text: "Condo Stratégis", to: URL_STRATEGIS },
              " baisse son tarif avec la durée d'engagement : 36 $, 33 $ ou 31 $ selon un contrat d'un, deux ou trois ans.",
            ],
            [
              { text: "ServiceCondo", to: URL_SERVICECONDO },
              " affiche la dispersion la plus forte : 35 $ en assistance et 60 $ en clé en main pour 10 à 24 unités, puis 25 $ à 45 $ pour 25 à 49 unités et 20 $ à 35 $ pour 50 à 99 unités. ",
              { text: "Deluxco", to: URL_DELUXCO },
              " part de 45 $ plus taxes à partir de 16 unités. ",
              { text: "GestionDeCondos.com", to: URL_GESTIONDECONDOS },
              " annonce 30 $ à 35 $ plus taxes pour 21 à 39 condos, assemblées en sus. ",
              { text: "GestionCondo VIP", to: URL_CONDOVIP },
              " publie 30 $, 35 $ ou 40 $ selon le nombre de services pour 14 à 99 unités, mais sa page date de décembre 2021.",
            ],
            [
              "Toutes ces grilles dégressent avec la taille : le tarif unitaire d'un immeuble de 100 unités et plus tombe souvent sous 30 $. ",
              { text: "SolutionCondo", to: URL_SOLUTIONCONDO },
              ", l'un des plus gros acteurs, ne publie pas de tarif mensuel mais des taux horaires 2026-2027 : 150 $ pour un gestionnaire, 175 $ pour un directeur, 250 $ pour un associé, 95 $ pour le personnel clérical, plus une attestation à jour ou un DRCOP à 375 $. Pour comparer un devis horaire à une grille par porte, il faut donc estimer le nombre d'heures annuelles, ce que peu de syndicats savent faire.",
            ],
          ],
          table: {
            caption: "Tableau A : tarifs de gestion de copropriété publiés, par unité par mois, Grand Montréal",
            columns: ["Firme", "Grille publiée (par unité / mois)", "Minimum", "Taxes", "Date affichée"],
            rows: [
              ["multiRent", "Financière 10 $ · Administrative 27 $ · Complète 37 $ ; plancher 210 $/mois ; inscription 450 $", "5 unités", "Avant taxes", "En vigueur le 10 sept. 2026"],
              ["Gestion Ajax", "29 $ (6-20 unités) · 31 $ (21-100) · 37 $ (101+)", "6 unités", "Avant taxes", "2026"],
              ["Condo Stratégis", "36 $ (1 an) · 33 $ (2 ans) · 31 $ (3 ans)", "Non précisé", "Non précisé", "2026"],
              ["ServiceCondo", "10-24 unités : assistance 35 $, comptabilité + AGA 35 $, clé en main 60 $ ; 25-49 : 25/30/45 $ ; 50-99 : 20/25/35 $", "10 unités", "Non précisé", "2026"],
              ["Deluxco", "À partir de 45 $", "16 unités", "Plus taxes", "Pied de page 2024"],
              ["GestionDeCondos.com", "30 $ à 35 $ (21-39 condos) ; 40+ sur mesure ; assemblées en sus", "Minimum mensuel non publié", "Plus taxes", "Non datée"],
              ["GestionCondo VIP", "14-99 unités : 30/35/40 $ (1 à 3 services) ; 100-199 : 25/30/35 $ ; 200+ : 20/25/30 $", "14 unités", "Non précisé", "8 déc. 2021"],
              ["Gestion Velora (référence)", "Habituellement 33 $ à 36 $ ; jusqu'à 40 $ avec portails et intégrations", "6 unités", "Non précisé", "2026"],
            ],
            note: "Lecture : une firme peut facturer en sus les assemblées, l'étude du fonds de prévoyance, l'audit, les recours au tribunal ou les déplacements hors heures. Les grilles ne sont comparables qu'à périmètre égal.",
          },
        },
        {
          heading: "Que paie concrètement un syndicat de 24 unités en 2026 ?",
          paragraphs: [
            "Les grilles par unité masquent la facture réelle. Pour la rendre lisible, nous avons calculé le coût annuel d'un immeuble type de 24 unités en prenant, pour chaque firme, le forfait publié le plus étendu au tarif d'un contrat d'un an, avant taxes. L'immeuble de 24 unités tombe dans la tranche 21 à 100 chez Gestion Ajax, dans la tranche 10 à 24 chez ServiceCondo et dans la tranche 21 à 39 chez GestionDeCondos.com.",
            "Résultat : de 8 928 $ à 17 280 $ par an, médiane 10 656 $ hors Velora, soit un écart du simple au double entre la firme la moins chère et la plus chère pour un immeuble identique. À la médiane, la gestion professionnelle revient à 444 $ par unité par année, à comparer aux charges communes totales de l'immeuble lorsque le conseil juge une soumission.",
            [
              "Le même exercice avec le forfait d'entrée de chaque firme donne 7 776 $ à 12 960 $ par an. Pour savoir ce que recouvre chaque forfait, et pourquoi deux prix identiques ne couvrent pas forcément les mêmes tâches, voyez notre guide sur ",
              { text: "le coût d'un gestionnaire de copropriété à Montréal", to: "/blog/cout-gestionnaire-copropriete-montreal" },
              " et le comparatif ",
              { text: "autogestion ou gestionnaire", to: "/blog/gestion-condo-autogestion-ou-gestionnaire" },
              ".",
            ],
          ],
          table: {
            caption: "Coût annuel calculé pour 24 unités, forfait le plus complet publié, contrat d'un an, avant taxes",
            columns: ["Firme", "Tarif retenu / unité / mois", "Coût annuel 24 unités", "Précision"],
            rows: [
              ["Gestion Ajax", "31 $", "8 928 $", "Forfait unique, tranche 21-100 unités"],
              ["GestionDeCondos.com", "35 $", "10 080 $", "Haut de la fourchette ; assemblées en sus"],
              ["Condo Stratégis", "36 $", "10 368 $", "Contrat d'un an"],
              ["multiRent", "37 $", "10 656 $", "Forfait complète ; + 450 $ d'inscription la première année"],
              ["GestionCondo VIP", "40 $", "11 520 $", "3 services ; grille de 2021"],
              ["Deluxco", "45 $", "12 960 $", "« À partir de »"],
              ["ServiceCondo", "60 $", "17 280 $", "Clé en main, tranche 10-24 unités"],
              ["Médiane des 7 firmes", "37 $", "10 656 $", "Hors Gestion Velora"],
              ["Gestion Velora (référence)", "36 $ (jusqu'à 40 $)", "10 368 $ (jusqu'à 11 520 $)", "Base publiée 33 $ à 36 $"],
            ],
            note: "Calcul : tarif × 24 unités × 12 mois. Les taxes (TPS et TVQ, 14,975 %) s'ajoutent lorsque la grille est annoncée avant taxes.",
          },
        },
        {
          heading: "Quels sont les frais de gestion locative longue durée au Québec ?",
          paragraphs: [
            [
              "Les firmes de gestion locative publient beaucoup moins leurs prix que les gestionnaires de copropriété : trois grilles seulement, mais réparties sur trois régions, et toutes dans la même bande. ",
              { text: "Location Ajax", to: URL_LOCATION_AJAX },
              " facture 5 % à 10 % du loyer perçu en résidentiel et 3 % à 6 % en commercial, avant taxes, sans frais de démarrage, avec la règle « logement vacant, aucuns frais » ; la mise en location seule coûte un mois de loyer. ",
              { text: "Pénates et Lares", to: URL_PENATES },
              " à Gatineau publie trois paliers à 5 %, 7,5 % et 10 % du loyer perçu. ",
              { text: "Marcel Pinard", to: URL_PINARD },
              " à Sherbrooke affiche 5 % à 8 % en base et 8 % à 10 % en gestion complète pour six logements ou moins, puis 4 % à 6 % au-delà de six logements.",
            ],
            [
              "Gestion Velora structure ses honoraires différemment : l'équivalent d'un mois de loyer brut selon les modalités du mandat, ce qui correspond à environ 8,3 % du loyer annuel sur un mandat de douze mois, dans la bande publiée par les autres firmes. Pour un propriétaire, la vraie question n'est pas le pourcentage mais son assiette : loyer perçu ou loyer exigible, logement vacant facturé ou non, et ce qui s'ajoute (frais de mise en location, dossiers au ",
              { text: "Tribunal administratif du logement", to: "/blog/dossier-tal-proprietaire-liste-documents-preuves" },
              ", supervision de travaux).",
            ],
            "Appliquée au loyer moyen d'un 2 chambres dans la RMR de Montréal en octobre 2025 (1 346 $ selon la SCHL), la bande publiée représente 67 $ à 135 $ par mois et par logement, soit 808 $ à 1 615 $ par année. Pour un immeuble de six logements loués à ce loyer moyen, la gestion déléguée coûte donc entre 4 846 $ et 9 691 $ par an avant taxes, à comparer aux 4 846 $ que le TAL admet comme frais de gestion à 5 % du revenu annuel.",
          ],
          table: {
            caption: "Tableau B : gestion locative longue durée, grilles publiées, et exemple chiffré sur le loyer moyen SCHL",
            columns: ["Firme / repère", "Région", "Grille publiée", "Sur un 2 ch. à 1 346 $ / mois", "Date affichée"],
            rows: [
              ["Location Ajax", "Montréal, Laval, Rive-Sud, Rive-Nord", "5 % à 10 % du loyer perçu (résidentiel) ; 3 % à 6 % (commercial) ; mise en location : un mois", "67 $ à 135 $ / mois", "2026"],
              ["Pénates et Lares", "Gatineau / Outaouais", "5 % · 7,5 % · 10 % du loyer perçu", "67 $ · 101 $ · 135 $ / mois", "2026"],
              ["Marcel Pinard", "Sherbrooke", "≤ 6 logements : 5-8 % (base), 8-10 % (complète) ; > 6 logements : 4-6 %", "67 $ à 135 $ / mois", "2024-2026"],
              ["Gestion Velora (référence)", "Grand Montréal", "Un mois de loyer brut selon le mandat (≈ 8,3 % sur 12 mois)", "≈ 112 $ / mois", "2026"],
              ["TAL, formulaire RN 2026", "Québec", "5 % du revenu annuel ; jusqu'à 10 % si justifié", "67 $ / mois (5 %)", "1er déc. 2025"],
              ["SCHL, grille d'exploitation", "Québec", "3 % (5-6 logements) à 5 % (12 logements et plus) des revenus bruts", "40 $ à 67 $ / mois", "Avril 2015"],
            ],
            note: "Loyer moyen : SCHL, enquête d'octobre 2025, appartements de 2 chambres, RMR de Montréal, 1 346 $. Montants arrondis au dollar. Les repères TAL et SCHL sont des conventions de calcul, pas des prix de marché.",
          },
        },
        {
          heading: "Combien prennent les gestionnaires Airbnb au Québec ?",
          paragraphs: [
            [
              "Six firmes publient une commission. ",
              { text: "Park Place Properties", to: URL_PARKPLACE },
              " annonce des frais « à partir de 10 % » à Montréal. ",
              { text: "StayPro", to: URL_STAYPRO },
              " affiche trois paliers à 10 %, 14 % et 19 % plus taxes, le dernier incluant un gestionnaire local. ",
              { text: "AirBNB Management Montreal", to: URL_ABMM },
              " facture 12 % en formule de base et 18 % en formule experte avec ménage et réapprovisionnement. ",
              { text: "HeartHomes", to: URL_HEARTHOMES },
              " publie 15 % pour son service complet à Montréal comme à Québec. ",
              { text: "Reserver.ca", to: URL_RESERVER },
              ", orienté chalets, va de 10 % à 20 % des revenus bruts, le palier à 20 % incluant une protection dommages jusqu'à 2 000 $.",
            ],
            [
              "Gestion Velora se situe entre 18 % et 25 % des revenus de réservation selon le volume et les services, soit le haut de la fourchette publiée, pour un périmètre qui inclut la ",
              { text: "conformité municipale et le permis CITQ", to: "/services/airbnb" },
              ". Le point à vérifier avant de comparer deux commissions : la base de calcul. Peu de pages précisent si le pourcentage s'applique au revenu brut, au revenu net des frais de plateforme ou au revenu après ménage, et l'écart entre ces trois assiettes dépasse souvent l'écart entre deux firmes.",
            ],
            "À titre d'illustration seulement, sur un logement qui génère 40 000 $ de revenus bruts par année, 10 % représentent 4 000 $, 15 % représentent 6 000 $ et 20 % représentent 8 000 $. Ce revenu est une hypothèse de calcul, pas une statistique de marché : les revenus Airbnb réels dépendent du secteur, de la saison et de la réglementation montréalaise sur la location courte durée.",
          ],
          table: {
            caption: "Tableau C : location courte durée, commissions publiées",
            columns: ["Firme", "Région", "Commission publiée", "Inclus (selon la page)", "Date affichée"],
            rows: [
              ["Park Place Properties", "Montréal", "À partir de 10 %", "Optimisation d'annonce, communication voyageurs, entretien", "2026"],
              ["StayPro", "Montréal", "10 % · 14 % · 19 % plus taxes", "Réception virtuelle ; gestionnaire local à 19 %", "Non datée"],
              ["AirBNB Management Montreal", "Montréal", "12 % (base) · 18 % (expert)", "Expert : ménage, entretien, réapprovisionnement", "Pied de page 2024"],
              ["HeartHomes", "Montréal, Québec", "15 % (service complet)", "Mise en scène, annonce, tarification, aide au permis, assurance, ménage", "Pied de page 2024"],
              ["Reserver.ca", "Québec (chalets)", "10 % à 20 % des revenus bruts", "Protection dommages jusqu'à 2 000 $ à 20 %", "2026"],
              ["Gestion Velora (référence)", "Grand Montréal", "18 % à 25 % des revenus de réservation", "Permis, conformité, voyageurs, ménage, tarification", "2026"],
            ],
            note: "Base de calcul (revenu brut ou net) rarement précisée sur les pages consultées. Un septième acteur, Monsieur Concierge, facture à la carte sans commission.",
          },
        },
        {
          heading: "Quels repères donnent le TAL, la SCHL et les sources secondaires ?",
          paragraphs: [
            [
              "Le repère le plus solide n'est pas un prix de marché mais une convention de calcul. Le ",
              { text: "formulaire RN 2026 du TAL", to: URL_TAL_RN2026 },
              " indique que les frais de gestion « seront établis, lors de la fixation du loyer, à 5 % du revenu annuel de l'immeuble », avec un maximum de 10 % si le propriétaire déclare des frais réels (contrat de gestion, bureau, publicité, comptabilité). Autrement dit, un propriétaire qui paie 8 % à un gestionnaire ne peut en répercuter que 5 % par défaut dans une fixation de loyer, sauf à documenter l'écart.",
            ],
            [
              "La ",
              { text: "grille des frais d'exploitation de la SCHL pour le Québec", to: URL_SCHL_2015 },
              ", encore utilisée par des prêteurs et des courtiers, prévoit 3 % des revenus bruts pour la gestion et l'administration d'un immeuble de 5 ou 6 logements, 3 % à 4 % jusqu'à 11 logements et 5 % à partir de 12 logements ou en béton. Ce document date d'avril 2015 : il sert de plancher de normalisation bancaire, pas de prix courant. Notre ",
              { text: "calculateur de rendement plex", to: "/calculateur-rendement-plex-montreal" },
              " applique d'ailleurs 5 % des revenus comme hypothèse de gestion dans le calcul de la valeur économique.",
            ],
            "Les fourchettes publiées par des tiers (firmes dans leurs blogues, plateformes de soumissions, fournisseurs de logiciels) convergent avec les grilles réelles mais restent invérifiables : elles ne citent ni échantillon ni méthode. Nous les listons pour mémoire, hors de tout calcul.",
          ],
          table: {
            caption: "Tableau D : repères réglementaires et sources secondaires (hors médianes)",
            columns: ["Source", "Nature", "Chiffre avancé", "Date"],
            rows: [
              ["TAL, formulaire RN 2026", "Règlement (fixation de loyer)", "Frais de gestion à 5 % du revenu annuel, maximum 10 % si justifié", "PDF du 1er déc. 2025"],
              ["SCHL, frais d'exploitation Québec", "Normalisation (prêteurs)", "Gestion et administration : 3 % à 5 % des revenus bruts selon la taille et la structure", "Avril 2015"],
              ["TAL, critères 2026 (ancienne méthode)", "Indice", "Poste « frais de gestion » : +7,2 % en 2026 (8,2 % en 2025), avis donnés avant le 1er janvier 2026", "Janvier 2026"],
              ["Gestion MAHD (blogue)", "Firme", "Copropriété : 35 $ à 60 $ par unité par mois", "15 août 2026"],
              ["Soumissions Copropriété", "Plateforme de soumissions", "Copropriété : 25 $ à 35 $ par logement par mois", "2026"],
              ["Localys (blogue)", "Firme", "Locatif complet 8-12 %, de base 4-6 %, courte durée 15-25 %", "12 août 2026"],
              ["TenantPay (blogue)", "Fournisseur de paiement", "Montréal 7 % à 11 % ; moyenne canadienne ≈ 8 %", "7 févr. 2026"],
            ],
            note: "Aucune de ces sources secondaires ne publie d'échantillon ni de méthode. Nous n'avons trouvé aucune enquête de la CORPIQ, de l'APQ ou du RGCQ sur les honoraires de gestion.",
          },
        },
        {
          heading: "Dans quel marché locatif ces frais s'appliquent-ils en 2026 ?",
          paragraphs: [
            [
              "Un pourcentage du loyer suit le loyer : il vaut la peine de rappeler où en sont les loyers. Selon le ",
              { text: "Rapport sur le marché locatif de la SCHL", to: URL_CMHC_RMR },
              " publié le 11 décembre 2025 (enquête d'octobre 2025), le loyer moyen d'un 2 chambres atteint 1 346 $ dans la RMR de Montréal, en hausse de 7,2 % sur un an à échantillon constant, et le taux d'inoccupation remonte de 2,1 % à 2,9 %. À Québec, le 2 chambres se loue 1 277 $ (+6,1 %) avec une inoccupation de 2,4 %. Sur l'île de Montréal, le 2 chambres est à 1 361 $ ; à Laval, 1 362 $ ; sur la Rive-Sud, 1 315 $.",
            ],
            [
              "Deux autres chiffres encadrent 2026. Le ",
              { text: "pourcentage de base du TAL", to: URL_TAL_PCT },
              " pour les avis donnés à compter du 1er janvier 2026 est de 3,1 %, contre 4,5 % en 2025 : la nouvelle méthode du décret 1455-2025 le fixe sur la moyenne des trois dernières variations annuelles de l'IPC du Québec, auxquelles s'ajoutent les variations de taxes et d'assurances et 5 % des dépenses en immobilisations. L'IPC du Québec a progressé de 2,4 % en moyenne en 2025 et de 3,1 % sur douze mois en août 2026 selon Statistique Canada.",
            ],
            [
              "Côté transactions, l'",
              { text: "APCIQ", to: URL_APCIQ_MTL },
              " rapporte un prix médian de 860 500 $ pour un plex de 2 à 5 logements dans la RMR de Montréal au troisième trimestre 2026 (+3 % sur un an, 996 ventes) et de 600 000 $ dans la RMR de Québec (+17 %, 193 ventes). Pour un acheteur, la ligne « gestion » à 5 % des revenus pèse donc directement sur la valeur économique que calcule le prêteur, et un honoraire réel à 8 % ou 10 % se paie sur le rendement, pas sur le prêt.",
            ],
          ],
          table: {
            caption: "Marché locatif 2025-2026 : appartements de 2 chambres, SCHL, enquête d'octobre 2025",
            columns: ["Région (RMR)", "Loyer moyen 2 ch. oct. 2025", "Variation annuelle (échantillon constant)", "Inoccupation oct. 2024 → oct. 2025"],
            rows: [
              ["Montréal", "1 346 $", "+7,2 %", "2,1 % → 2,9 %"],
              ["Québec", "1 277 $", "+6,1 %", "0,9 % → 2,4 %"],
              ["Gatineau (partie québécoise)", "1 460 $", "+4,7 %", "1,9 % → 3,8 %"],
              ["Sherbrooke", "1 062 $", "+9,8 %", "1,4 % → 2,7 %"],
              ["Trois-Rivières", "1 016 $", "+6,6 %", "0,9 % → 2,7 %"],
              ["Saguenay", "985 $", "+10,9 %", "1,6 % → 1,3 %"],
              ["Québec, centres de 10 000 hab. et plus", "1 273 $", "+7,2 %", "1,8 % → 2,7 %"],
            ],
            note: "Source : SCHL, tableaux de données du Rapport sur le marché locatif 2025, tableau 1.0, immeubles de 3 logements et plus. La variation de Gatineau porte le code de fiabilité « d » (à utiliser avec prudence). Pourcentage de base TAL 2026 : 3,1 %. IPC Québec : +2,4 % en 2025, +3,1 % en août 2026.",
          },
        },
        {
          heading: "Quelles sont les limites de cette étude ?",
          paragraphs: [
            "L'échantillon est celui des firmes qui publient, pas celui du marché. Les grands gestionnaires de copropriété qui travaillent sur soumission uniquement n'y figurent pas, et rien n'indique que leurs prix se situent au milieu de la fourchette. Les grilles de copropriété proviennent toutes du Grand Montréal ; aucune firme de Québec, de Gatineau ou de Sherbrooke n'affiche de tarif par unité. En gestion locative, c'est l'inverse : aucune grille spécifique à Laval ou à Longueuil n'a été trouvée.",
            "Les pages ne sont pas toutes de 2026. GestionCondo VIP affiche une page de décembre 2021 ; Deluxco, HeartHomes et AirBNB Management Montreal un pied de page 2024 ; GestionDeCondos.com et StayPro aucune date. Les résumés de moteurs de recherche donnaient parfois d'autres chiffres que la page elle-même (27 $, 29 $ et 35 $ pour Gestion Ajax, 34 $ pour Deluxco) : nous avons retenu la page consultée le 14 octobre 2026. La base de taxation de Condo Stratégis et de ServiceCondo n'est pas précisée.",
            "Les médianes portent sur sept firmes de copropriété et trois de gestion locative : elles décrivent l'offre publiée, pas une moyenne pondérée par le nombre d'unités gérées. Enfin, un tarif par unité ne dit rien de la qualité du service ni des frais annexes (assemblées, étude de fonds de prévoyance, recours, travaux), qui peuvent représenter plusieurs milliers de dollars par an pour un syndicat. L'étude sera mise à jour chaque année ; les corrections documentées sont bienvenues.",
          ],
        },
        {
          heading: "Comment utiliser ces chiffres pour juger une soumission ?",
          paragraphs: [
            "Pour un syndicat : ramenez chaque soumission à un coût annuel pour votre nombre d'unités, puis placez-la dans la fourchette de 8 928 $ à 17 280 $ calculée pour 24 unités (ou refaites le calcul pour votre taille). Demandez la liste des extras facturés et la durée d'engagement exigée pour obtenir le tarif annoncé, puisque deux firmes conditionnent leur prix à un contrat de deux ou trois ans.",
            [
              "Pour un propriétaire bailleur : vérifiez si le pourcentage s'applique au loyer perçu ou exigible, si un logement vacant est facturé, et combien coûte la mise en location. Un pourcentage à 5 % avec un mois de loyer à chaque relocation peut coûter plus cher qu'un forfait à 8 % tout compris si le roulement est élevé. Notre guide sur ",
              { text: "l'augmentation de loyer et le calcul du TAL", to: "/blog/augmentation-loyer-montreal-regles-calcul-tal" },
              " explique comment les frais de gestion entrent dans la fixation d'un loyer.",
            ],
            [
              "Gestion Velora publie ses tarifs et répond aux soumissions avec le détail de ce qui est inclus. Pour situer votre immeuble, consultez nos ",
              { text: "tarifs de gestion immobilière", to: URL_VELORA_TARIFS },
              " ou notre page sur la ",
              { text: "gestion de syndicat de copropriété", to: "/services/syndicat-copropriete" },
              ". Les données brutes de l'étude sont téléchargeables ci-dessous ; les médias, associations et sites spécialisés peuvent les reprendre librement en citant la source.",
            ],
          ],
        },
      ],
    },
    en: {
      category: "Study",
      date: "October 2026",
      title: "2026 study: property management fees in Quebec, from the published price lists of 16 firms",
      metaTitle: "Quebec property management fees: 2026 study",
      excerpt:
        "Condo $31 to $60 per unit per month, rental 5% to 10% of rent, Airbnb 10% to 20% of revenue: the prices Quebec firms publish in 2026, with sources.",
      brief:
        "In October 2026, seven Greater Montreal firms publish a condo management price: $31 to $60 per unit per month for their most complete plan, median $37, which works out to $8,928 to $17,280 a year for a 24-unit building. Published long-term rental management fees run from 5% to 10% of rent collected, and Airbnb management from 10% to 20% of revenue. Quebec's housing tribunal (TAL) allows 5% of annual revenue as management expense.",
      study: {
        citation: `Gestion Velora (2026). 2026 study of property management fees in Quebec: published price lists of 16 firms. Montreal, October 14, 2026. ${STUDY_URL}`,
        methodology:
          "All 35 data points were read on October 14, 2026 directly from the firms' own pricing pages (never from a directory or a search-engine snippet), then copied as displayed with the date shown on the page and any \"before tax\" or \"plus tax\" wording. Medians exclude Gestion Velora. Regulatory benchmarks come from TAL, Gazette officielle, CMHC, Statistics Canada and APCIQ documents. The raw data is downloadable below and free to reuse with attribution.",
        sources: SOURCES_EN,
      },
      sections: [
        {
          heading: "What do Quebec's published price lists show in 2026?",
          paragraphs: [
            "Most articles on \"what a property manager costs\" repeat a range without saying where it comes from. This study does the opposite: it only keeps prices a firm displays publicly on its own site, read on October 14, 2026, with the URL and the date visible on each page. In total, 16 Quebec firms publish a usable price: 7 in condo management, 3 in long-term rental management and 6 in short-term rentals. Two more publish only hourly rates or à-la-carte prices.",
            "First finding: condo management is the most transparent segment. Seven Greater Montreal firms display a per-unit monthly grid, and the spread is wide: $31 to $60 per unit per month for each firm's most complete plan, median $37. The entry plan (administration and accounting without maintenance) runs from $27 to $45, median $31.",
            "Second finding: long-term rental management is almost always billed as a percentage of rent collected, and every published grid falls in the same 5% to 10% band, in Montreal as in Gatineau or Sherbrooke. Leasing alone usually costs one month's rent. Third finding: published Airbnb management runs from 10% to 20% of revenue, with full-service plans between 15% and 20%.",
          ],
          table: {
            caption: "Key results, published prices in Quebec, read on October 14, 2026",
            columns: ["Segment", "Firms with a published grid", "Published range", "Median (excl. Velora)", "Basis"],
            rows: [
              ["Condo, most complete plan", "7 (Greater Montreal)", "$31 to $60 / unit / month", "$37", "Before tax where stated"],
              ["Condo, entry plan", "7 (Greater Montreal)", "$27 to $45 / unit / month", "$31", "Before tax where stated"],
              ["Long-term rental", "3 (Montreal, Gatineau, Sherbrooke)", "5% to 10% of rent collected", "Common band 5% to 10%", "Before tax where stated"],
              ["Leasing only", "1 grid + 1 reference", "One month's rent", "—", "One time"],
              ["Short-term rental (Airbnb)", "6 (Montreal, Quebec City, cottages)", "10% to 20% of revenue", "15% (full service)", "Revenue basis rarely stated"],
              ["TAL benchmark (rent setting)", "Regulation", "5% of annual revenue, up to 10% if justified", "—", "Convention, not a market price"],
            ],
            note: "Medians computed on third-party firms only; Gestion Velora appears as a reference row in each table. \"Most complete plan\" takes, for each firm, the broadest published plan at the one-year contract rate.",
          },
        },
        {
          heading: "How was the study built?",
          paragraphs: [
            "Inclusion rule: a figure enters the study only if it is displayed on the firm's own page (a pricing page, a PDF grid or a service page) with an explicit amount or percentage. Pages that redirect to a quote without a price were noted but excluded. Ranges published by third-party blogs, quote platforms or software vendors are kept in a separate \"secondary sources\" table and enter no median.",
            "Every amount is copied as displayed, with its basis (per unit per month, percentage of rent collected, percentage of revenue), its minimum building size, any \"before tax\" or \"plus tax\" wording, and the most precise date visible on the page: effective date, publication date or, failing that, the footer year. Two condo grids date from 2021 and 2024 and are flagged as such.",
            [
              "Gestion Velora publishes its own prices on its ",
              { text: "pricing page", to: URL_VELORA_TARIFS },
              " and appears in every table as a reference row, but medians are computed without it so the study does not grade its own grid. The full research notes, including the pages consulted and the conflicting figures met along the way, are summarised in the \"limits\" section below.",
            ],
          ],
        },
        {
          heading: "How much does condo syndicate management cost in Quebec in 2026?",
          paragraphs: [
            [
              "Seven Greater Montreal firms publish a per-unit monthly grid. The cheapest for a small building is ",
              { text: "Gestion Ajax", to: URL_AJAX },
              " at $29 for 6 to 20 units ($31 from 21 to 100 units, $37 above 100), with the same 6-unit minimum as Gestion Velora. ",
              { text: "multiRent", to: URL_MULTIRENT },
              " splits its offer into three tiers (financial $10, administrative $27, complete $37) with a $210 monthly floor and a one-time $450 enrolment fee. ",
              { text: "Condo Stratégis", to: URL_STRATEGIS },
              " lowers its rate with the contract term: $36, $33 or $31 for a one-, two- or three-year contract.",
            ],
            [
              { text: "ServiceCondo", to: URL_SERVICECONDO },
              " shows the widest dispersion: $35 for assistance and $60 for turnkey at 10 to 24 units, then $25 to $45 at 25 to 49 units and $20 to $35 at 50 to 99 units. ",
              { text: "Deluxco", to: URL_DELUXCO },
              " starts at $45 plus tax from 16 units. ",
              { text: "GestionDeCondos.com", to: URL_GESTIONDECONDOS },
              " lists $30 to $35 plus tax for 21 to 39 condos, meetings extra. ",
              { text: "GestionCondo VIP", to: URL_CONDOVIP },
              " publishes $30, $35 or $40 depending on the number of services for 14 to 99 units, but its page dates from December 2021.",
            ],
            [
              "All these grids fall with size: the per-unit rate for a building of 100 units or more often drops below $30. ",
              { text: "SolutionCondo", to: URL_SOLUTIONCONDO },
              ", one of the largest players, publishes no monthly rate but 2026-2027 hourly rates: $150 for a manager, $175 for a director, $250 for a partner, $95 for clerical staff, plus $375 for an up-to-date certificate or a DRCOP. Comparing an hourly quote with a per-door grid therefore requires estimating annual hours, which few boards know how to do.",
            ],
          ],
          table: {
            caption: "Table A: published condo management fees, per unit per month, Greater Montreal",
            columns: ["Firm", "Published grid (per unit / month)", "Minimum", "Tax", "Displayed date"],
            rows: [
              ["multiRent", "Financial $10 · Administrative $27 · Complete $37; $210/month floor; $450 enrolment", "5 units", "Before tax", "In force Sept. 10, 2026"],
              ["Gestion Ajax", "$29 (6-20 units) · $31 (21-100) · $37 (101+)", "6 units", "Before tax", "2026"],
              ["Condo Stratégis", "$36 (1 yr) · $33 (2 yrs) · $31 (3 yrs)", "Not stated", "Not stated", "2026"],
              ["ServiceCondo", "10-24 units: assistance $35, accounting + AGM $35, turnkey $60; 25-49: $25/30/45; 50-99: $20/25/35", "10 units", "Not stated", "2026"],
              ["Deluxco", "From $45", "16 units", "Plus tax", "2024 footer"],
              ["GestionDeCondos.com", "$30 to $35 (21-39 condos); 40+ custom; meetings extra", "Monthly minimum not published", "Plus tax", "Undated"],
              ["GestionCondo VIP", "14-99 units: $30/35/40 (1 to 3 services); 100-199: $25/30/35; 200+: $20/25/30", "14 units", "Not stated", "Dec. 8, 2021"],
              ["Gestion Velora (reference)", "Typically $33 to $36; up to $40 with portals and integrations", "6 units", "Not stated", "2026"],
            ],
            note: "Reading note: a firm may bill meetings, the reserve fund study, the audit, tribunal filings or after-hours call-outs separately. Grids are only comparable at equal scope.",
          },
        },
        {
          heading: "What does a 24-unit syndicate actually pay in 2026?",
          paragraphs: [
            "Per-unit grids hide the real invoice. To make it legible, we computed the annual cost of a typical 24-unit building taking, for each firm, the broadest published plan at the one-year contract rate, before tax. A 24-unit building falls in the 21-to-100 band at Gestion Ajax, the 10-to-24 band at ServiceCondo and the 21-to-39 band at GestionDeCondos.com.",
            "Result: $8,928 to $17,280 a year, median $10,656 excluding Velora, a one-to-two spread between the cheapest and the most expensive firm for an identical building. At the median, professional management costs $444 per unit per year, a figure a board can set against the building's total common expenses when it weighs a proposal.",
            [
              "The same exercise with each firm's entry plan gives $7,776 to $12,960 a year. To see what each plan covers, and why two identical prices do not necessarily buy the same tasks, read our guide on ",
              { text: "what a condo manager costs in Montreal", to: "/blog/cout-gestionnaire-copropriete-montreal" },
              " and the comparison ",
              { text: "self-management or a manager", to: "/blog/gestion-condo-autogestion-ou-gestionnaire" },
              ".",
            ],
          ],
          table: {
            caption: "Computed annual cost for 24 units, most complete published plan, one-year contract, before tax",
            columns: ["Firm", "Rate used / unit / month", "Annual cost, 24 units", "Detail"],
            rows: [
              ["Gestion Ajax", "$31", "$8,928", "Single plan, 21-100 unit band"],
              ["GestionDeCondos.com", "$35", "$10,080", "Top of range; meetings extra"],
              ["Condo Stratégis", "$36", "$10,368", "One-year contract"],
              ["multiRent", "$37", "$10,656", "Complete plan; + $450 enrolment in year one"],
              ["GestionCondo VIP", "$40", "$11,520", "3 services; 2021 grid"],
              ["Deluxco", "$45", "$12,960", "\"From\" price"],
              ["ServiceCondo", "$60", "$17,280", "Turnkey, 10-24 unit band"],
              ["Median of the 7 firms", "$37", "$10,656", "Excluding Gestion Velora"],
              ["Gestion Velora (reference)", "$36 (up to $40)", "$10,368 (up to $11,520)", "Published base $33 to $36"],
            ],
            note: "Calculation: rate × 24 units × 12 months. GST and QST (14.975%) are added where the grid is stated before tax.",
          },
        },
        {
          heading: "What are long-term rental management fees in Quebec?",
          paragraphs: [
            [
              "Rental management firms publish their prices far less often than condo managers: only three grids, but spread across three regions, and all in the same band. ",
              { text: "Location Ajax", to: URL_LOCATION_AJAX },
              " charges 5% to 10% of rent collected for residential and 3% to 6% for commercial, before tax, with no set-up fee and a \"vacant unit, no fee\" rule; leasing alone costs one month's rent. ",
              { text: "Pénates et Lares", to: URL_PENATES },
              " in Gatineau publishes three tiers at 5%, 7.5% and 10% of rent collected. ",
              { text: "Marcel Pinard", to: URL_PINARD },
              " in Sherbrooke shows 5% to 8% for basic and 8% to 10% for full management on six units or fewer, then 4% to 6% above six units.",
            ],
            [
              "Gestion Velora structures its fee differently: the equivalent of one month's gross rent under the mandate terms, roughly 8.3% of annual rent on a twelve-month mandate, inside the band the other firms publish. For an owner the real question is not the percentage but its base: rent collected or rent due, whether a vacant unit is billed, and what is added on top (leasing fees, files before the ",
              { text: "housing tribunal", to: "/blog/dossier-tal-proprietaire-liste-documents-preuves" },
              ", works supervision).",
            ],
            "Applied to the average rent of a two-bedroom apartment in the Montreal CMA in October 2025 ($1,346 according to CMHC), the published band represents $67 to $135 per month per unit, or $808 to $1,615 a year. For a six-unit building rented at that average, delegated management therefore costs between $4,846 and $9,691 a year before tax, against the $4,846 the TAL allows as management expense at 5% of annual revenue.",
          ],
          table: {
            caption: "Table B: long-term rental management, published grids, with a worked example on the CMHC average rent",
            columns: ["Firm / benchmark", "Region", "Published grid", "On a 2-bed at $1,346 / month", "Displayed date"],
            rows: [
              ["Location Ajax", "Montreal, Laval, South Shore, North Shore", "5% to 10% of rent collected (residential); 3% to 6% (commercial); leasing: one month", "$67 to $135 / month", "2026"],
              ["Pénates et Lares", "Gatineau / Outaouais", "5% · 7.5% · 10% of rent collected", "$67 · $101 · $135 / month", "2026"],
              ["Marcel Pinard", "Sherbrooke", "≤ 6 units: 5-8% (basic), 8-10% (full); > 6 units: 4-6%", "$67 to $135 / month", "2024-2026"],
              ["Gestion Velora (reference)", "Greater Montreal", "One month's gross rent under the mandate (≈ 8.3% over 12 months)", "≈ $112 / month", "2026"],
              ["TAL, form RN 2026", "Quebec", "5% of annual revenue; up to 10% if justified", "$67 / month (5%)", "Dec. 1, 2025"],
              ["CMHC operating-expense grid", "Quebec", "3% (5-6 units) to 5% (12+ units) of gross revenue", "$40 to $67 / month", "April 2015"],
            ],
            note: "Average rent: CMHC, October 2025 survey, two-bedroom apartments, Montreal CMA, $1,346. Amounts rounded to the dollar. TAL and CMHC benchmarks are calculation conventions, not market prices.",
          },
        },
        {
          heading: "How much do Airbnb managers charge in Quebec?",
          paragraphs: [
            [
              "Six firms publish a commission. ",
              { text: "Park Place Properties", to: URL_PARKPLACE },
              " advertises fees \"from 10%\" in Montreal. ",
              { text: "StayPro", to: URL_STAYPRO },
              " shows three tiers at 10%, 14% and 19% plus tax, the last including a local manager. ",
              { text: "AirBNB Management Montreal", to: URL_ABMM },
              " charges 12% on its basic plan and 18% on its expert plan with housekeeping and restocking. ",
              { text: "HeartHomes", to: URL_HEARTHOMES },
              " publishes 15% for full-service hosting in Montreal and Quebec City alike. ",
              { text: "Reserver.ca", to: URL_RESERVER },
              ", cottage-focused, runs from 10% to 20% of gross revenue, the 20% tier including damage protection up to $2,000.",
            ],
            [
              "Gestion Velora sits between 18% and 25% of booking revenue depending on volume and services, the top of the published range, for a scope that includes ",
              { text: "municipal compliance and the CITQ permit", to: "/services/airbnb" },
              ". The point to check before comparing two commissions is the base. Few pages say whether the percentage applies to gross revenue, revenue net of platform fees or revenue after cleaning, and the gap between those three bases is often larger than the gap between two firms.",
            ],
            "As an illustration only, on a unit generating $40,000 of gross revenue a year, 10% is $4,000, 15% is $6,000 and 20% is $8,000. That revenue is a calculation assumption, not a market statistic: real Airbnb revenue depends on the neighbourhood, the season and Montreal's short-term rental rules.",
          ],
          table: {
            caption: "Table C: short-term rental, published commissions",
            columns: ["Firm", "Region", "Published commission", "Included (per the page)", "Displayed date"],
            rows: [
              ["Park Place Properties", "Montreal", "From 10%", "Listing optimisation, guest communication, maintenance", "2026"],
              ["StayPro", "Montreal", "10% · 14% · 19% plus tax", "Virtual front desk; local manager at 19%", "Undated"],
              ["AirBNB Management Montreal", "Montreal", "12% (basic) · 18% (expert)", "Expert: housekeeping, maintenance, restocking", "2024 footer"],
              ["HeartHomes", "Montreal, Quebec City", "15% (full service)", "Staging, listing, pricing, licensing help, insurance, cleaning", "2024 footer"],
              ["Reserver.ca", "Quebec (cottages)", "10% to 20% of gross revenue", "Damage protection up to $2,000 at 20%", "2026"],
              ["Gestion Velora (reference)", "Greater Montreal", "18% to 25% of booking revenue", "Permits, compliance, guests, cleaning, pricing", "2026"],
            ],
            note: "Revenue basis (gross or net) rarely stated on the pages consulted. A seventh player, Monsieur Concierge, bills à la carte with no commission.",
          },
        },
        {
          heading: "What benchmarks do the TAL, CMHC and secondary sources give?",
          paragraphs: [
            [
              "The strongest benchmark is not a market price but a calculation convention. The ",
              { text: "TAL's RN 2026 form", to: URL_TAL_RN2026 },
              " states that management expenses are set, when a rent is fixed, at 5% of the building's annual revenue, with a 10% maximum if the landlord declares actual costs (management contract, office, advertising, accounting). In other words, a landlord who pays a manager 8% can only pass 5% through a rent-setting application by default, unless the difference is documented.",
            ],
            [
              "The ",
              { text: "CMHC operating-expense grid for Quebec", to: URL_SCHL_2015 },
              ", still used by lenders and brokers, provides 3% of gross revenue for management and administration of a 5- or 6-unit building, 3% to 4% up to 11 units and 5% from 12 units or for concrete structures. That document dates from April 2015: it serves as a lender normalisation floor, not a current price. Our ",
              { text: "plex return calculator", to: "/calculateur-rendement-plex-montreal" },
              " likewise applies 5% of revenue as the management assumption in its economic-value calculation.",
            ],
            "Ranges published by third parties (firms in their blogs, quote platforms, software vendors) converge with the real grids but remain unverifiable: they cite neither a sample nor a method. We list them for the record, outside any calculation.",
          ],
          table: {
            caption: "Table D: regulatory benchmarks and secondary sources (outside the medians)",
            columns: ["Source", "Nature", "Figure given", "Date"],
            rows: [
              ["TAL, form RN 2026", "Regulation (rent setting)", "Management expense at 5% of annual revenue, 10% maximum if justified", "PDF of Dec. 1, 2025"],
              ["CMHC, Quebec operating expenses", "Normalisation (lenders)", "Management and administration: 3% to 5% of gross revenue by size and structure", "April 2015"],
              ["TAL, 2026 criteria (old method)", "Index", "\"Management fees\" line: +7.2% in 2026 (8.2% in 2025), notices given before Jan. 1, 2026", "January 2026"],
              ["Gestion MAHD (blog)", "Firm", "Condo: $35 to $60 per unit per month", "Aug. 15, 2026"],
              ["Soumissions Copropriété", "Quote platform", "Condo: $25 to $35 per unit per month", "2026"],
              ["Localys (blog)", "Firm", "Full rental 8-12%, basic 4-6%, short-term 15-25%", "Aug. 12, 2026"],
              ["TenantPay (blog)", "Payment provider", "Montreal 7% to 11%; Canadian average ≈ 8%", "Feb. 7, 2026"],
            ],
            note: "None of these secondary sources publishes a sample or a method. We found no CORPIQ, APQ or RGCQ survey of management fees.",
          },
        },
        {
          heading: "In what rental market do these fees apply in 2026?",
          paragraphs: [
            [
              "A percentage of rent follows the rent, so it is worth recalling where rents stand. According to the ",
              { text: "CMHC Rental Market Report", to: URL_CMHC_RMR },
              " published December 11, 2025 (October 2025 survey), the average two-bedroom rent reached $1,346 in the Montreal CMA, up 7.2% year over year on a fixed sample, and the vacancy rate rose from 2.1% to 2.9%. In Quebec City, a two-bedroom rents for $1,277 (+6.1%) with 2.4% vacancy. On the Island of Montreal the two-bedroom average is $1,361; in Laval, $1,362; on the South Shore, $1,315.",
            ],
            [
              "Two other figures frame 2026. The ",
              { text: "TAL base percentage", to: URL_TAL_PCT },
              " for notices given from January 1, 2026 is 3.1%, down from 4.5% in 2025: the new method under Order 1455-2025 sets it on the average of the last three annual changes in Quebec's CPI, to which tax and insurance variations and 5% of capital expenditure are added. Quebec's CPI rose 2.4% on average in 2025 and 3.1% over twelve months in August 2026 according to Statistics Canada.",
            ],
            [
              "On the transaction side, ",
              { text: "APCIQ", to: URL_APCIQ_MTL },
              " reports a median price of $860,500 for a 2-to-5-unit plex in the Montreal CMA in the third quarter of 2026 (+3% year over year, 996 sales) and $600,000 in the Quebec City CMA (+17%, 193 sales). For a buyer, the \"management\" line at 5% of revenue weighs directly on the economic value the lender computes, and an actual fee of 8% or 10% is paid out of the return, not out of the loan.",
            ],
          ],
          table: {
            caption: "Rental market 2025-2026: two-bedroom apartments, CMHC, October 2025 survey",
            columns: ["Region (CMA)", "Avg 2-bed rent Oct. 2025", "Annual change (fixed sample)", "Vacancy Oct. 2024 → Oct. 2025"],
            rows: [
              ["Montreal", "$1,346", "+7.2%", "2.1% → 2.9%"],
              ["Quebec City", "$1,277", "+6.1%", "0.9% → 2.4%"],
              ["Gatineau (Quebec part)", "$1,460", "+4.7%", "1.9% → 3.8%"],
              ["Sherbrooke", "$1,062", "+9.8%", "1.4% → 2.7%"],
              ["Trois-Rivières", "$1,016", "+6.6%", "0.9% → 2.7%"],
              ["Saguenay", "$985", "+10.9%", "1.6% → 1.3%"],
              ["Quebec, centres of 10,000+", "$1,273", "+7.2%", "1.8% → 2.7%"],
            ],
            note: "Source: CMHC, Rental Market Report 2025 data tables, Table 1.0, structures of 3+ units. The Gatineau change carries reliability code \"d\" (use with caution). TAL base percentage 2026: 3.1%. Quebec CPI: +2.4% in 2025, +3.1% in August 2026.",
          },
        },
        {
          heading: "What are the limits of this study?",
          paragraphs: [
            "The sample is the firms that publish, not the market. Large condo managers that work on quotation only do not appear, and nothing says their prices sit in the middle of the range. The condo grids all come from Greater Montreal; no firm in Quebec City, Gatineau or Sherbrooke displays a per-unit rate. In rental management it is the reverse: no grid specific to Laval or Longueuil was found.",
            "Not every page is from 2026. GestionCondo VIP shows a December 2021 page; Deluxco, HeartHomes and AirBNB Management Montreal a 2024 footer; GestionDeCondos.com and StayPro no date at all. Search-engine summaries sometimes gave different figures from the page itself ($27, $29 and $35 for Gestion Ajax, $34 for Deluxco): we kept the page as read on October 14, 2026. The tax basis of Condo Stratégis and ServiceCondo is not stated.",
            "The medians rest on seven condo firms and three rental firms: they describe the published offer, not an average weighted by units under management. Finally, a per-unit rate says nothing about service quality or ancillary fees (meetings, reserve fund study, tribunal filings, works), which can add several thousand dollars a year for a syndicate. The study will be updated yearly; documented corrections are welcome.",
          ],
        },
        {
          heading: "How to use these figures to judge a proposal",
          paragraphs: [
            "For a syndicate: convert each proposal to an annual cost for your unit count, then place it against the $8,928 to $17,280 range computed for 24 units (or redo the calculation for your size). Ask for the list of billed extras and the contract term required to obtain the advertised rate, since two firms condition their price on a two- or three-year contract.",
            [
              "For a landlord: check whether the percentage applies to rent collected or rent due, whether a vacant unit is billed, and what leasing costs. A 5% fee with one month's rent at every re-letting can cost more than an all-inclusive 8% plan if turnover is high. Our guide on ",
              { text: "rent increases and the TAL calculation", to: "/blog/augmentation-loyer-montreal-regles-calcul-tal" },
              " explains how management expenses enter a rent-setting application.",
            ],
            [
              "Gestion Velora publishes its prices and answers proposals with the detail of what is included. To place your building, see our ",
              { text: "property management pricing", to: URL_VELORA_TARIFS },
              " or our page on ",
              { text: "condo syndicate management", to: "/services/syndicat-copropriete" },
              ". The study's raw data is downloadable below; media, associations and specialised sites may reuse it freely with attribution.",
            ],
          ],
        },
      ],
    },
  },
];
