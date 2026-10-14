export interface ComparisonSection {
  headingEn: string;
  headingFr: string;
  bodyEn: string;
  bodyFr: string;
  pointsEn: string[];
  pointsFr: string[];
}

export interface ComparisonFeatureRow {
  labelEn: string;
  labelFr: string;
  veloraEn: string;
  veloraFr: string;
  alternativeEn: string;
  alternativeFr: string;
  veloraPositive: boolean;
  alternativePositive: boolean;
}

export interface ComparisonPricingRow {
  itemEn: string;
  itemFr: string;
  veloraEn: string;
  veloraFr: string;
  alternativeEn: string;
  alternativeFr: string;
  noteEn: string;
  noteFr: string;
}

export interface ComparisonStory {
  titleEn: string;
  titleFr: string;
  contextEn: string;
  contextFr: string;
  actionsEn: string[];
  actionsFr: string[];
  outcomeEn: string;
  outcomeFr: string;
  disclosureEn: string;
  disclosureFr: string;
}

export interface ComparisonFaq {
  questionEn: string;
  questionFr: string;
  answerEn: string;
  answerFr: string;
}

export interface ComparisonInternalLink {
  labelEn: string;
  labelFr: string;
  to: string;
}

/**
 * The decision block rendered directly under the H1, before any table.
 * Each line names a concrete condition (building size, role, regulatory
 * trigger) the reader can recognise. It is also what answer engines quote.
 */
export interface ComparisonVerdict {
  chooseVeloraEn: string;
  chooseVeloraFr: string;
  chooseAlternativeEn: string;
  chooseAlternativeFr: string;
  notWorthSwitchingEn: string;
  notWorthSwitchingFr: string;
}

/**
 * One entry of the page's research sheet.
 * - `firsthand`: Gestion Velora's own published pages or operations.
 * - `published`: a third party's own published page (never a characterisation).
 * - `regulatory`: a statute, regulation, or government guidance page.
 */
export type ComparisonSourceBasis = "firsthand" | "published" | "regulatory";

export interface ComparisonSource {
  nameEn: string;
  nameFr: string;
  url: string;
  basis: ComparisonSourceBasis;
  /** ISO date the link and the claim it supports were last checked. */
  dateChecked: string;
}

export interface ComparisonAlternative {
  name: string;
  isVelora?: boolean;
  bestForEn: string;
  bestForFr: string;
  notBestForEn: string;
  notBestForFr: string;
  strengthsEn: string[];
  strengthsFr: string[];
  cautionsEn: string[];
  cautionsFr: string[];
}

export interface ComparisonPageData {
  slug: string;
  /** ISO date the page first went live. */
  datePublished: string;
  /** ISO date of the last content change. Bump only with a real change. */
  dateModified: string;
  /** ISO date the visible claims were last reviewed against their sources. */
  factsCheckedOn: string;
  /** Two sentences: what was checked firsthand, what was only read. */
  methodEn: string;
  methodFr: string;
  verdict: ComparisonVerdict;
  sources: ComparisonSource[];
  titleEn: string;
  titleFr: string;
  descriptionEn: string;
  descriptionFr: string;
  h1En: string;
  h1Fr: string;
  heroEn: string;
  heroFr: string;
  ctaEn: string;
  ctaFr: string;
  primaryColumnEn: string;
  primaryColumnFr: string;
  alternativeColumnEn: string;
  alternativeColumnFr: string;
  bestForEn: string[];
  bestForFr: string[];
  notBestForEn: string[];
  notBestForFr: string[];
  whereAlternativeWinsEn: string[];
  whereAlternativeWinsFr: string[];
  sections: ComparisonSection[];
  featureRows: ComparisonFeatureRow[];
  pricingRows: ComparisonPricingRow[];
  switchingStory: ComparisonStory;
  faqs: ComparisonFaq[];
  internalLinks: ComparisonInternalLink[];
  alternatives?: ComparisonAlternative[];
}

export const COMPARISON_PAGES: ComparisonPageData[] = [
  {
    slug: "gestionnaire-vs-autogestion-condo",
    datePublished: "2026-07-03",
    dateModified: "2026-10-14",
    factsCheckedOn: "2026-10-14",
    methodEn:
      "Gestion Velora's fee basis and 6-unit minimum were read from its own pricing page on the date shown. The self-management side describes board obligations under the Civil Code of Québec and is not a test of any other firm.",
    methodFr:
      "La base tarifaire et le minimum de 6 unités de Gestion Velora proviennent de sa page Tarifs à la date indiquée. Le volet autogestion décrit les obligations du conseil selon le Code civil du Québec et ne constitue pas un test d'une autre firme.",
    verdict: {
      chooseVeloraEn:
        "Choose a professional manager if no director can carry the treasurer and vendor-follow-up role, or if the building has more than about 12 units and its Loi 16 deliverables (maintenance logbook, reserve-fund study) are still outstanding.",
      chooseVeloraFr:
        "Choisissez un gestionnaire si aucun administrateur ne peut porter la trésorerie et le suivi des fournisseurs, ou si l'immeuble compte plus d'une douzaine d'unités et que ses livrables Loi 16 (carnet d'entretien, étude du fonds de prévoyance) restent à produire.",
      chooseAlternativeEn:
        "Stay self-managed if the building has fewer than 6 units, few incidents, and a director with accounting and vendor experience who intends to stay on the board. Gestion Velora does not take mandates under 6 units.",
      chooseAlternativeFr:
        "Restez en autogestion si l'immeuble compte moins de 6 unités, peu d'incidents, et un administrateur expérimenté en comptabilité et en fournisseurs qui compte rester au CA. Gestion Velora n'accepte pas de mandat sous 6 unités.",
      notWorthSwitchingEn:
        "Switching is probably not worth it if your current setup already produces annual financial statements, keeps the register current, and follows a dated compliance calendar, and the only pain is occasional admin work.",
      notWorthSwitchingFr:
        "Changer n'en vaut probablement pas la peine si votre fonctionnement actuel produit déjà des états financiers annuels, tient le registre à jour et suit un calendrier de conformité daté, et que le seul irritant est de l'administration ponctuelle.",
    },
    sources: [
      { nameEn: "Gestion Velora pricing page", nameFr: "Page Tarifs de Gestion Velora", url: "/tarifs", basis: "firsthand", dateChecked: "2026-10-14" },
      { nameEn: "Gestion Velora condo board management service", nameFr: "Service de gestion de syndicat de Gestion Velora", url: "/services/syndicat-copropriete", basis: "firsthand", dateChecked: "2026-10-14" },
      { nameEn: "Civil Code of Québec, Book IV, divided co-ownership", nameFr: "Code civil du Québec, Livre IV, copropriété divise", url: "https://www.legisquebec.gouv.qc.ca/fr/document/lc/CCQ-1991", basis: "regulatory", dateChecked: "2026-10-14" },
    ],
    titleEn: "Condo manager vs self-management in Montreal",
    titleFr: "Gestionnaire de copropriete vs autogestion a Montreal",
    descriptionEn:
      "Choose a condo manager if no director can carry treasury and vendor follow-up, or above 12 units with Loi 16 work pending; stay self-managed under 6 units.",
    descriptionFr:
      "Choisissez un gestionnaire si aucun administrateur ne peut porter trésorerie et fournisseurs, ou au-delà de 12 unités; restez en autogestion sous 6 unités.",
    h1En: "Condo manager vs self-management in Montreal",
    h1Fr: "Gestionnaire de copropriete vs autogestion a Montreal",
    heroEn: "The professional-management alternative for condo boards that need compliance discipline without losing strategic control.",
    heroFr: "L'alternative de gestion professionnelle pour les syndicats qui veulent de la rigueur sans perdre le controle strategique.",
    ctaEn: "Get a tailored management gap audit",
    ctaFr: "Obtenir un audit de gestion adapte",
    primaryColumnEn: "Gestion Velora manager-led model",
    primaryColumnFr: "Modele avec gestionnaire Gestion Velora",
    alternativeColumnEn: "Self-managed condo board",
    alternativeColumnFr: "Syndicat en autogestion",
    bestForEn: [
      "Condo boards with volunteer directors at capacity.",
      "Buildings with reserve-fund, maintenance, or governance complexity.",
      "Syndicates that need clean reporting for owners, lenders, and buyers.",
    ],
    bestForFr: [
      "Syndicats dont les administrateurs benevoles sont a capacite.",
      "Immeubles avec complexite de fonds de prevoyance, entretien ou gouvernance.",
      "Coproprietes qui veulent des rapports clairs pour coproprietaires, preteurs et acheteurs.",
    ],
    notBestForEn: [
      "Very small, low-incident buildings with an experienced board.",
      "Syndicates that only need occasional administrative help.",
    ],
    notBestForFr: [
      "Tres petits immeubles simples avec un CA experimente.",
      "Syndicats qui veulent seulement une aide administrative ponctuelle.",
    ],
    whereAlternativeWinsEn: [
      "Self-management can cost less in direct monthly fees.",
      "The board can make small decisions without a management workflow.",
      "It can work well when one director has strong accounting, vendor, and legal follow-up experience.",
    ],
    whereAlternativeWinsFr: [
      "L'autogestion peut couter moins cher en frais mensuels directs.",
      "Le CA peut prendre de petites decisions sans workflow de gestion.",
      "Elle fonctionne si un administrateur maitrise comptabilite, fournisseurs et suivi legal.",
    ],
    sections: [
      {
        headingEn: "Cost model",
        headingFr: "Modele de cout",
        bodyEn:
          "Self-management looks cheaper at first, but hidden costs appear through volunteer time, inconsistent follow-up, and expensive correction cycles.",
        bodyFr:
          "L'autogestion semble moins chere au debut, mais les couts caches apparaissent via le temps benevole, les suivis incoherents et les corrections.",
        pointsEn: [
          "Direct fees are lower in self-management, but volunteer workload rises sharply.",
          "Professional management stabilizes budget forecasting and vendor control.",
          "One avoided major error can offset multiple months of management fees.",
        ],
        pointsFr: [
          "Les frais directs sont plus bas en autogestion, mais la charge benevole augmente vite.",
          "La gestion professionnelle stabilise le budget et le pilotage fournisseurs.",
          "Une erreur majeure evitee peut compenser plusieurs mois d'honoraires.",
        ],
      },
      {
        headingEn: "Regulatory and legal exposure",
        headingFr: "Risque reglementaire et legal",
        bodyEn:
          "Bill 16 obligations, reserve-fund cycles, and AGM governance rules create real exposure when records or renewals slip.",
        bodyFr:
          "Les obligations de la Loi 16, le fonds de prevoyance et la gouvernance d'AGA creent une exposition reelle quand les dossiers prennent du retard.",
        pointsEn: [
          "Professional teams operate with documented compliance calendars.",
          "Board members keep strategic control while operational burden drops.",
          "Audit trails and report quality improve lender and buyer confidence.",
        ],
        pointsFr: [
          "Les equipes professionnelles fonctionnent avec un calendrier de conformite documente.",
          "Le CA garde le controle strategique avec moins de charge operationnelle.",
          "Les pistes d'audit et la qualite des rapports rassurent acheteurs et preteurs.",
        ],
      },
    ],
    featureRows: [
      {
        labelEn: "Compliance calendar",
        labelFr: "Calendrier de conformite",
        veloraEn: "Tracked with recurring governance checkpoints.",
        veloraFr: "Suivi avec points de controle recurrents.",
        alternativeEn: "Depends on volunteer availability.",
        alternativeFr: "Depend de la disponibilite benevole.",
        veloraPositive: true,
        alternativePositive: false,
      },
      {
        labelEn: "Direct monthly fee",
        labelFr: "Frais mensuel direct",
        veloraEn: "Management fee is explicit.",
        veloraFr: "Honoraires de gestion explicites.",
        alternativeEn: "Usually lower cash expense.",
        alternativeFr: "Depense monetaire souvent plus basse.",
        veloraPositive: false,
        alternativePositive: true,
      },
      {
        labelEn: "Vendor follow-up",
        labelFr: "Suivi fournisseurs",
        veloraEn: "Centralized quotes, approvals, and documentation.",
        veloraFr: "Soumissions, approbations et documents centralises.",
        alternativeEn: "Can be fast, but often informal.",
        alternativeFr: "Peut etre rapide, mais souvent informel.",
        veloraPositive: true,
        alternativePositive: false,
      },
      {
        labelEn: "Board workload",
        labelFr: "Charge du CA",
        veloraEn: "Board focuses on approvals and strategy.",
        veloraFr: "Le CA se concentre sur les approbations et la strategie.",
        alternativeEn: "Board carries daily coordination.",
        alternativeFr: "Le CA porte la coordination quotidienne.",
        veloraPositive: true,
        alternativePositive: false,
      },
    ],
    pricingRows: [
      {
        itemEn: "Monthly operating cost",
        itemFr: "Cout operationnel mensuel",
        veloraEn: "Quoted by building size and mandate complexity.",
        veloraFr: "Devis selon taille d'immeuble et complexite du mandat.",
        alternativeEn: "Low direct cost, high unpaid director time.",
        alternativeFr: "Faible cout direct, beaucoup de temps CA non remunere.",
        noteEn: "Compare against time, errors, and delayed maintenance, not only invoice amount.",
        noteFr: "Comparer au temps, aux erreurs et aux retards d'entretien, pas seulement a la facture.",
      },
      {
        itemEn: "Unexpected corrections",
        itemFr: "Corrections imprevues",
        veloraEn: "Lower risk through documented process.",
        veloraFr: "Risque reduit par processus documente.",
        alternativeEn: "Can become expensive after missed renewals or poor files.",
        alternativeFr: "Peut couter cher apres renouvellements oublies ou dossiers faibles.",
        noteEn: "This is where the cheap option can become expensive.",
        noteFr: "C'est la que l'option peu couteuse peut devenir chere.",
      },
    ],
    switchingStory: {
      titleEn: "A board moves from volunteer firefighting to monthly control",
      titleFr: "Un CA passe du mode urgence benevole au controle mensuel",
      contextEn:
        "A mid-size Montreal condo board had one director handling vendors, notices, and owner emails after work hours. The building was not failing, but every small issue depended on one person.",
      contextFr:
        "Un syndicat montréalais de taille moyenne reposait sur un administrateur qui gerait fournisseurs, avis et courriels le soir. L'immeuble fonctionnait, mais tout dependait d'une personne.",
      actionsEn: [
        "Built a compliance calendar and owner-response process.",
        "Moved vendor approvals into a documented quote and decision workflow.",
        "Created a monthly board dashboard for arrears, maintenance, and open decisions.",
      ],
      actionsFr: [
        "Mise en place d'un calendrier de conformite et d'un processus de reponse coproprietaires.",
        "Transfert des approbations fournisseurs dans un workflow documente.",
        "Creation d'un tableau mensuel pour arrears, entretien et decisions ouvertes.",
      ],
      outcomeEn:
        "The board kept decision authority, but stopped carrying daily execution. The strongest win was continuity: if a director left, the operating memory stayed in the system.",
      outcomeFr:
        "Le CA a garde l'autorite de decision, sans porter l'execution quotidienne. Le gain principal: la continuite, meme si un administrateur quitte.",
      disclosureEn:
        "Composite scenario based on recurring switching patterns; not a named client case study.",
      disclosureFr:
        "Scenario composite base sur des situations recurrentes; ce n'est pas une etude de cas client nominative.",
    },
    faqs: [
      {
        questionEn: "Is self-management ever the better choice?",
        questionFr: "L'autogestion est-elle parfois le meilleur choix?",
        answerEn:
          "Yes. If the building is small, stable, and the board has experienced directors with time, self-management can be efficient.",
        answerFr:
          "Oui. Pour un petit immeuble stable avec un CA experimente et disponible, l'autogestion peut etre efficace.",
      },
      {
        questionEn: "Will a manager replace the board?",
        questionFr: "Un gestionnaire remplace-t-il le CA?",
        answerEn:
          "No. A good manager executes and documents operations while the board keeps strategic decisions and approval authority.",
        answerFr:
          "Non. Un bon gestionnaire execute et documente les operations pendant que le CA garde les decisions strategiques.",
      },
      {
        questionEn: "When should a condo board switch?",
        questionFr: "Quand un syndicat devrait-il basculer?",
        answerEn:
          "Switch when response delays, compliance uncertainty, director burnout, or vendor follow-up start creating recurring risk.",
        answerFr:
          "Quand les delais, l'incertitude de conformite, l'epuisement du CA ou le suivi fournisseur creent un risque recurrent.",
      },
    ],
    internalLinks: [
      { labelEn: "Condo board management", labelFr: "Gestion de syndicat", to: "/services/syndicat-copropriete" },
      { labelEn: "Pricing", labelFr: "Tarifs", to: "/tarifs" },
      { labelEn: "Contact", labelFr: "Contact", to: "/contact" },
    ],
  },
  {
    slug: "airbnb-vs-location-longue-duree-montreal",
    datePublished: "2026-07-03",
    dateModified: "2026-10-14",
    factsCheckedOn: "2026-10-14",
    methodEn:
      "Gestion Velora's short-term management fee range was read from its own pricing page on the date shown. Regulatory statements point to the City of Montréal, CITQ, and TAL pages linked below; check them before acting, as the rules have changed more than once. No competitor's service was tested.",
    methodFr:
      "La fourchette d'honoraires de gestion courte durée de Gestion Velora provient de sa page Tarifs à la date indiquée. Les énoncés réglementaires renvoient aux pages de la Ville de Montréal, de la CITQ et du TAL ci-dessous; vérifiez-les avant d'agir, car les règles ont changé plus d'une fois. Aucun service concurrent n'a été testé.",
    verdict: {
      chooseVeloraEn:
        "Choose managed short-term rental only if the unit is eligible in its borough and under the building's declaration of co-ownership, you can accept income that varies by season, and you want someone else handling guest messaging, turnovers, and CITQ registration.",
      chooseVeloraFr:
        "Choisissez la courte durée gérée seulement si l'unité est admissible dans son arrondissement et selon la déclaration de copropriété, si vous acceptez un revenu qui varie selon la saison, et si vous voulez confier messages voyageurs, rotations et enregistrement CITQ à quelqu'un d'autre.",
      chooseAlternativeEn:
        "Choose long-term rental if you need predictable monthly income, if the unit is your principal residence or sits in a sector where short-term rental is not permitted, or if you cannot absorb empty weeks.",
      chooseAlternativeFr:
        "Choisissez la location longue durée si vous avez besoin d'un revenu mensuel prévisible, si l'unité est votre résidence principale ou se trouve dans un secteur où la courte durée n'est pas permise, ou si vous ne pouvez pas absorber des semaines vides.",
      notWorthSwitchingEn:
        "Switching from long-term to short-term is probably not worth it while a tenant is in place: Québec residential leases renew by default, and ending one to change rental strategy is not a routine step. Compare net operating income after cleaning, platform fees, management, and vacancy, not gross revenue.",
      notWorthSwitchingFr:
        "Passer de la longue à la courte durée n'en vaut probablement pas la peine tant qu'un locataire est en place: au Québec, le bail résidentiel se renouvelle par défaut, et y mettre fin pour changer de stratégie n'est pas une démarche courante. Comparez le revenu net après ménage, frais de plateforme, gestion et vacance, pas le revenu brut.",
    },
    sources: [
      { nameEn: "Gestion Velora pricing page", nameFr: "Page Tarifs de Gestion Velora", url: "/tarifs", basis: "firsthand", dateChecked: "2026-10-14" },
      { nameEn: "Gestion Velora Airbnb management service", nameFr: "Service de gestion Airbnb de Gestion Velora", url: "/services/gestion-airbnb", basis: "firsthand", dateChecked: "2026-10-14" },
      { nameEn: "City of Montréal, renting your principal residence to tourists (updated September 11, 2026)", nameFr: "Ville de Montréal, louer sa résidence principale à des touristes (mis à jour le 11 septembre 2026)", url: "https://montreal.ca/demarches/louer-sa-residence-principale-des-touristes", basis: "regulatory", dateChecked: "2026-10-14" },
      { nameEn: "City of Montréal, operating a commercial tourist residence (updated September 10, 2026)", nameFr: "Ville de Montréal, exploiter une résidence de tourisme commerciale (mis à jour le 10 septembre 2026)", url: "https://montreal.ca/demarches/exploiter-une-residence-de-tourisme-commerciale", basis: "regulatory", dateChecked: "2026-10-14" },
      { nameEn: "Gouvernement du Québec, registering a tourist accommodation establishment (updated September 24, 2026)", nameFr: "Gouvernement du Québec, enregistrer un établissement d'hébergement touristique (mis à jour le 24 septembre 2026)", url: "https://www.quebec.ca/tourisme-loisirs-sport/hebergement-touristique/enregistrement", basis: "regulatory", dateChecked: "2026-10-14" },
      { nameEn: "CITQ, tourist accommodation registration", nameFr: "CITQ, enregistrement des établissements d'hébergement touristique", url: "https://www.citq.qc.ca/", basis: "regulatory", dateChecked: "2026-10-14" },
      { nameEn: "Tribunal administratif du logement (TAL)", nameFr: "Tribunal administratif du logement (TAL)", url: "https://www.tal.gouv.qc.ca/", basis: "regulatory", dateChecked: "2026-10-14" },
      { nameEn: "CMHC Rental Market Report data tables", nameFr: "SCHL, tableaux de données du Rapport sur le marché locatif", url: "https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research/housing-data/data-tables/rental-market/rental-market-report-data-tables", basis: "published", dateChecked: "2026-10-14" },
    ],
    titleEn: "Airbnb vs long-term rental in Montreal",
    titleFr: "Airbnb vs location longue duree a Montreal",
    descriptionEn:
      "Choose managed Airbnb only if the unit is eligible in its borough and you accept seasonal income; choose long-term rental for predictable rent.",
    descriptionFr:
      "Airbnb géré seulement si l'unité est admissible dans son arrondissement et que vous acceptez un revenu saisonnier; sinon la longue durée pour un loyer prévisible.",
    h1En: "Airbnb vs long-term rental in Montreal",
    h1Fr: "Airbnb vs location longue duree a Montreal",
    heroEn: "The rental-strategy guide for owners who need stronger NOI without underestimating regulation and daily operations.",
    heroFr: "Le guide de strategie locative pour augmenter le NOI sans sous-estimer la reglementation ni l'operation quotidienne.",
    ctaEn: "Model your expected NOI by strategy",
    ctaFr: "Simuler votre NOI selon la strategie",
    primaryColumnEn: "Gestion Velora managed strategy",
    primaryColumnFr: "Strategie geree par Gestion Velora",
    alternativeColumnEn: "Owner-run rental strategy",
    alternativeColumnFr: "Strategie geree par le proprietaire",
    bestForEn: [
      "Owners who want an operating model before choosing short or long term.",
      "Assets where compliance, guest experience, and vacancy control affect NOI.",
      "Landlords comparing active income upside against time and risk.",
    ],
    bestForFr: [
      "Proprietaires qui veulent un modele operationnel avant de choisir court ou long terme.",
      "Actifs ou conformite, experience et vacance influencent le NOI.",
      "Bailleurs qui comparent potentiel de revenu et charge de gestion.",
    ],
    notBestForEn: [
      "Owners who want a completely passive short-term rental without operational oversight.",
      "Units where municipal or building rules clearly prohibit short-term rental.",
    ],
    notBestForFr: [
      "Proprietaires qui veulent une courte duree totalement passive sans suivi.",
      "Unites ou les regles municipales ou d'immeuble interdisent clairement la courte duree.",
    ],
    whereAlternativeWinsEn: [
      "Airbnb can produce higher gross revenue in peak demand periods.",
      "Long-term rental is simpler when the owner wants predictable monthly income.",
      "Owner-run management can preserve full control for hands-on landlords.",
    ],
    whereAlternativeWinsFr: [
      "Airbnb peut produire plus de revenu brut en periodes de forte demande.",
      "La longue duree est plus simple pour un revenu mensuel previsible.",
      "La gestion directe garde le controle complet aux proprietaires tres impliques.",
    ],
    sections: [
      {
        headingEn: "Montréal rules that settle the question first",
        headingFr: "Les règles montréalaises qui tranchent d'abord",
        bodyEn:
          "Before any revenue comparison, check whether the unit may legally be rented short-term. According to the City of Montréal page updated September 11, 2026, renting your principal residence to tourists requires a city operating permit renewed every year, is allowed only from June 10 to September 10, and for a total of 31 days or less within that window. It is not allowed at all in Lachine, Saint-Laurent and Saint-Léonard.",
        bodyFr:
          "Avant toute comparaison de revenus, vérifiez si l'unité peut légalement être louée à court terme. Selon la page de la Ville de Montréal mise à jour le 11 septembre 2026, louer sa résidence principale à des touristes exige un permis d'exploitation municipal renouvelé chaque année, n'est autorisé que du 10 juin au 10 septembre, et pour un total de 31 jours ou moins pendant cette période. C'est interdit à Lachine, Saint-Laurent et Saint-Léonard.",
        pointsEn: [
          "Principal residence: one reservation at a time, no meals served, and the owner must live on site. A tenant needs a lease that allows it or the landlord's written authorisation.",
          "A unit that is not your principal residence (commercial tourist residence) is allowed only in certain sectors of Montréal, with a certificate of occupancy from the borough. Several boroughs prohibit it outright.",
          "Provincial registration is required for any paid stay of 31 days or less. The file includes a municipal compliance document, liability insurance of at least 2 000 000 $ per event and, in divided co-ownership, the syndicate's authorisation form. So read the declaration of co-ownership first.",
          "2026 registration fees published by the Québec government: 54 $ for a principal residence, 156 $ for a general tourist establishment. Advertising without the registration number is an offence.",
        ],
        pointsFr: [
          "Résidence principale: une seule réservation à la fois, aucun repas servi, et le propriétaire doit habiter sur place. Un locataire doit avoir un bail qui l'autorise ou l'autorisation écrite de son propriétaire.",
          "Une unité qui n'est pas votre résidence principale (résidence de tourisme commerciale) n'est permise que dans certains secteurs de Montréal, avec un certificat d'occupation de l'arrondissement. Plusieurs arrondissements l'interdisent entièrement.",
          "L'enregistrement provincial est obligatoire pour tout séjour payant de 31 jours ou moins. Le dossier comprend un document de conformité municipale, une assurance responsabilité civile d'au moins 2 000 000 $ par événement et, en copropriété divise, le formulaire d'autorisation du syndicat. Lisez donc la déclaration de copropriété en premier.",
          "Droits d'enregistrement 2026 publiés par le gouvernement du Québec: 54 $ pour une résidence principale, 156 $ pour un établissement d'hébergement touristique général. Annoncer sans numéro d'enregistrement est une infraction.",
        ],
      },
      {
        headingEn: "Revenue profile",
        headingFr: "Profil de revenus",
        bodyEn:
          "Short-term rentals can outperform during high-demand periods, but seasonality and occupancy swings can destabilize cash flow.",
        bodyFr:
          "La courte duree peut surperformer en haute demande, mais la saisonnalite et l'occupation peuvent destabiliser le cash-flow.",
        pointsEn: [
          "Airbnb can drive higher gross revenue with active pricing and turnover control.",
          "Long-term rental generally provides smoother monthly forecasting.",
          "Asset mix and neighborhood rules should drive the decision.",
        ],
        pointsFr: [
          "Airbnb peut generer plus de revenu brut avec tarification active et bonne execution.",
          "La longue duree offre en general une meilleure previsibilite mensuelle.",
          "Le mix d'actifs et les regles locales doivent guider la decision.",
        ],
      },
      {
        headingEn: "Operational burden and compliance",
        headingFr: "Charge operationnelle et conformite",
        bodyEn:
          "Short-term rental requires guest messaging, turnovers, cleaning QA, and permit discipline. Long-term rental is slower, but still process-heavy.",
        bodyFr:
          "La courte duree exige messages voyageurs, rotations, controle menage et permis. La longue duree est plus stable, mais reste process-intensive.",
        pointsEn: [
          "Short-term strategy needs near-daily orchestration.",
          "Long-term strategy needs strong tenant screening and lease discipline.",
          "Both models improve with documented SOPs and clear KPI tracking.",
        ],
        pointsFr: [
          "La strategie courte duree demande une orchestration quasi quotidienne.",
          "La longue duree demande une selection locataire et une discipline de bail solides.",
          "Les deux modeles gagnent avec des SOP documentes et des KPI suivis.",
        ],
      },
    ],
    featureRows: [
      {
        labelEn: "Revenue upside",
        labelFr: "Potentiel de revenu",
        veloraEn: "Modeled against demand, compliance, and operating cost.",
        veloraFr: "Modelise selon demande, conformite et cout operationnel.",
        alternativeEn: "Can be strong, especially for active Airbnb operators.",
        alternativeFr: "Peut etre fort, surtout pour operateurs Airbnb actifs.",
        veloraPositive: true,
        alternativePositive: true,
      },
      {
        labelEn: "Predictability",
        labelFr: "Previsibilite",
        veloraEn: "Forecasts use occupancy, vacancy, and maintenance assumptions.",
        veloraFr: "Previsions avec hypotheses d'occupation, vacance et entretien.",
        alternativeEn: "Long-term is predictable; Airbnb is more variable.",
        alternativeFr: "Longue duree previsible; Airbnb plus variable.",
        veloraPositive: true,
        alternativePositive: false,
      },
      {
        labelEn: "Compliance workload",
        labelFr: "Charge de conformite",
        veloraEn: "Regulatory checks built into the operating plan.",
        veloraFr: "Controles reglementaires integres au plan.",
        alternativeEn: "Owner must track city, building, and platform rules.",
        alternativeFr: "Le proprietaire suit ville, immeuble et plateforme.",
        veloraPositive: true,
        alternativePositive: false,
      },
      {
        labelEn: "Daily execution",
        labelFr: "Execution quotidienne",
        veloraEn: "Guest or tenant workflows are assigned and measured.",
        veloraFr: "Workflows voyageurs ou locataires assignes et mesures.",
        alternativeEn: "Can work if the owner has time and local availability.",
        alternativeFr: "Fonctionne si le proprietaire est disponible localement.",
        veloraPositive: true,
        alternativePositive: true,
      },
    ],
    pricingRows: [
      {
        itemEn: "Management fee",
        itemFr: "Frais de gestion",
        veloraEn: "Quoted by mandate, unit count, and service intensity.",
        veloraFr: "Devis selon mandat, nombre d'unites et intensite.",
        alternativeEn: "No manager fee if fully owner-run.",
        alternativeFr: "Aucun honoraire si gestion 100% proprietaire.",
        noteEn: "Owner time, cleaning QA, vacancies, and compliance also have a cost.",
        noteFr: "Temps proprietaire, controle menage, vacance et conformite ont aussi un cout.",
      },
      {
        itemEn: "Revenue variability",
        itemFr: "Variabilite des revenus",
        veloraEn: "Scenario planning compares gross revenue to true NOI.",
        veloraFr: "Scenarios comparant revenu brut et NOI reel.",
        alternativeEn: "Higher upside can be offset by empty nights or delays.",
        alternativeFr: "Le potentiel peut etre absorbe par nuits vides ou delais.",
        noteEn: "The best strategy is the one that wins after expenses and risk.",
        noteFr: "La meilleure strategie gagne apres depenses et risques.",
      },
    ],
    switchingStory: {
      titleEn: "An owner stops choosing by gross rent alone",
      titleFr: "Un proprietaire arrete de choisir seulement par revenu brut",
      contextEn:
        "A Montreal owner was comparing Airbnb income screenshots with a long-term lease quote. The Airbnb number looked better, but the property had compliance, cleaning, and seasonal-risk questions.",
      contextFr:
        "Un proprietaire montréalais comparait des revenus Airbnb avec une offre longue duree. Le chiffre Airbnb semblait meilleur, mais l'actif avait des questions de conformite, menage et saisonnalite.",
      actionsEn: [
        "Built side-by-side NOI scenarios instead of gross-rent comparisons.",
        "Separated owner time, turnover cost, vacancy, and regulatory risk.",
        "Defined the operating conditions required before choosing short-term rental.",
      ],
      actionsFr: [
        "Creation de scenarios NOI cote a cote, pas seulement revenus bruts.",
        "Separation du temps proprietaire, cout de rotation, vacance et risque reglementaire.",
        "Definition des conditions operationnelles avant de choisir la courte duree.",
      ],
      outcomeEn:
        "The decision became clearer: short-term was only attractive if execution and compliance were strong enough to protect NOI.",
      outcomeFr:
        "La decision est devenue plus claire: la courte duree etait interessante seulement avec une execution et une conformite assez solides pour proteger le NOI.",
      disclosureEn:
        "Composite scenario based on recurring strategy reviews; not a named client case study.",
      disclosureFr:
        "Scenario composite base sur des revues de strategie recurrentes; ce n'est pas une etude de cas client nominative.",
    },
    faqs: [
      {
        questionEn: "Is Airbnb always more profitable in Montreal?",
        questionFr: "Airbnb est-il toujours plus rentable a Montreal?",
        answerEn:
          "No. Airbnb can produce higher gross revenue, but permit rules, turnover cost, cleaning quality, vacancy, and owner time can reduce NOI.",
        answerFr:
          "Non. Airbnb peut produire plus de revenu brut, mais permis, rotations, menage, vacance et temps proprietaire peuvent reduire le NOI.",
      },
      {
        questionEn: "When is long-term rental better?",
        questionFr: "Quand la longue duree est-elle meilleure?",
        answerEn:
          "Long-term rental often wins when predictable cash flow, lower daily workload, and regulatory simplicity matter more than peak upside.",
        answerFr:
          "La longue duree gagne souvent quand la previsibilite, la charge reduite et la simplicite reglementaire comptent plus que le potentiel maximal.",
      },
      {
        questionEn: "Can Gestion Velora compare both options?",
        questionFr: "Gestion Velora peut-elle comparer les deux options?",
        answerEn:
          "Yes. The right review compares gross income, operating cost, compliance, vacancy, maintenance, and owner involvement.",
        answerFr:
          "Oui. La bonne analyse compare revenu brut, cout operationnel, conformite, vacance, entretien et implication proprietaire.",
      },
    ],
    internalLinks: [
      { labelEn: "Airbnb management", labelFr: "Gestion Airbnb", to: "/services/airbnb" },
      { labelEn: "Rental management", labelFr: "Gestion locative", to: "/services/location" },
      { labelEn: "Pricing", labelFr: "Tarifs", to: "/tarifs" },
      { labelEn: "Contact", labelFr: "Contact", to: "/contact" },
    ],
  },
  {
    slug: "gestion-locative-interne-vs-externalisee",
    datePublished: "2026-07-03",
    dateModified: "2026-10-14",
    factsCheckedOn: "2026-10-14",
    methodEn:
      "Gestion Velora's service scope and fee basis were read from its own service and pricing pages on the date shown. The in-house side describes a landlord's obligations under Québec rental law and typical staffing patterns; it is not a test of any specific employer or firm.",
    methodFr:
      "La portée de service et la base tarifaire de Gestion Velora proviennent de ses pages Services et Tarifs à la date indiquée. Le volet interne décrit les obligations d'un locateur selon le droit locatif québécois et des modèles d'équipe courants; ce n'est pas un test d'un employeur ou d'une firme en particulier.",
    verdict: {
      chooseVeloraEn:
        "Choose outsourced management if you own 6 or more units across more than one building, no one on your side can answer repair requests and tenant calls during business hours, or you need monthly owner reports a lender or partner can read.",
      chooseVeloraFr:
        "Choisissez la gestion externalisée si vous détenez 6 unités ou plus réparties dans plus d'un immeuble, si personne de votre côté ne peut répondre aux demandes de réparation et aux appels de locataires pendant les heures ouvrables, ou si vous avez besoin de rapports mensuels lisibles par un prêteur ou un partenaire.",
      chooseAlternativeEn:
        "Keep an in-house team if you already employ a dedicated manager or on-site staff whose daily presence the buildings justify, and your reporting is already lender-ready.",
      chooseAlternativeFr:
        "Gardez une équipe interne si vous employez déjà un gestionnaire dédié ou du personnel sur place dont la présence quotidienne est justifiée par les immeubles, et si vos rapports sont déjà prêts pour un prêteur.",
      notWorthSwitchingEn:
        "Switching is probably not worth it if your portfolio is one small building you live in or near, vacancy is low, and the hours you spend on it are hours you want to spend.",
      notWorthSwitchingFr:
        "Changer n'en vaut probablement pas la peine si votre portefeuille se limite à un petit immeuble que vous habitez ou qui est près de chez vous, si la vacance est faible, et si les heures que vous y consacrez sont des heures que vous voulez y consacrer.",
    },
    sources: [
      { nameEn: "Gestion Velora pricing page", nameFr: "Page Tarifs de Gestion Velora", url: "/tarifs", basis: "firsthand", dateChecked: "2026-10-14" },
      { nameEn: "Gestion Velora rental management service", nameFr: "Service de gestion locative de Gestion Velora", url: "/services/gestion-locative", basis: "firsthand", dateChecked: "2026-10-14" },
      { nameEn: "Tribunal administratif du logement (TAL)", nameFr: "Tribunal administratif du logement (TAL)", url: "https://www.tal.gouv.qc.ca/", basis: "regulatory", dateChecked: "2026-10-14" },
      { nameEn: "CMHC Rental Market Report data tables", nameFr: "SCHL, tableaux de données du Rapport sur le marché locatif", url: "https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research/housing-data/data-tables/rental-market/rental-market-report-data-tables", basis: "published", dateChecked: "2026-10-14" },
    ],
    titleEn: "In-house vs outsourced rental management",
    titleFr: "Gestion locative interne vs externalisee",
    descriptionEn:
      "Choose outsourced rental management from 6 units across several buildings or when no one can take tenant calls; keep an in-house team if it is already staffed.",
    descriptionFr:
      "Gestion locative externalisée dès 6 unités sur plusieurs immeubles ou quand personne ne peut prendre les appels locataires; gardez l'interne si l'équipe existe.",
    h1En: "In-house vs outsourced rental management in Montreal",
    h1Fr: "Gestion locative interne vs externalisee a Montreal",
    heroEn: "The outsourcing alternative for owners who need operational depth without building a larger internal team.",
    heroFr: "L'alternative d'externalisation pour proprietaires qui veulent plus de profondeur sans grossir l'equipe interne.",
    ctaEn: "Review your operating thresholds",
    ctaFr: "Evaluer vos seuils operationnels",
    primaryColumnEn: "Gestion Velora outsourced team",
    primaryColumnFr: "Equipe externalisee Gestion Velora",
    alternativeColumnEn: "In-house rental team",
    alternativeColumnFr: "Equipe locative interne",
    bestForEn: [
      "Owners whose portfolio has outgrown informal tools and one-person coordination.",
      "Teams that need stronger reporting, response standards, and vendor follow-up.",
      "Investors who want control through KPIs instead of daily task ownership.",
    ],
    bestForFr: [
      "Proprietaires dont le portefeuille depasse les outils informels.",
      "Equipes qui veulent reporting, standards de reponse et suivi fournisseurs plus solides.",
      "Investisseurs qui veulent controler par KPI plutot que par taches quotidiennes.",
    ],
    notBestForEn: [
      "Large owners with a mature, well-staffed internal property operations team.",
      "Portfolios where resident relationships require a dedicated on-site employee every day.",
    ],
    notBestForFr: [
      "Grands proprietaires avec equipe interne mature et bien staffee.",
      "Portefeuilles ou la relation resident exige un employe sur site chaque jour.",
    ],
    whereAlternativeWinsEn: [
      "In-house teams can be closer to the owner's culture and asset history.",
      "Daily on-site presence can be stronger when the building justifies a dedicated employee.",
      "Internal teams may be better for highly customized institutional reporting stacks.",
    ],
    whereAlternativeWinsFr: [
      "Une equipe interne peut mieux connaitre la culture et l'historique du proprietaire.",
      "La presence quotidienne sur site peut etre meilleure si l'immeuble justifie un employe dedie.",
      "L'interne peut convenir aux stacks de reporting institutionnel tres personnalises.",
    ],
    sections: [
      {
        headingEn: "Scalability threshold",
        headingFr: "Seuil de scalabilite",
        bodyEn:
          "In-house models work well with small, simple portfolios. As units and maintenance events grow, response times and consistency often decline.",
        bodyFr:
          "Le modele interne fonctionne bien sur de petits portefeuilles simples. Quand les unites et incidents augmentent, delais et constance se degradent.",
        pointsEn: [
          "Track unresolved tickets and lease cycle delays as leading indicators.",
          "If service level drops, tenant churn and vacancy costs rise quickly.",
          "Outsourcing can restore SLA consistency with formal workflows.",
        ],
        pointsFr: [
          "Suivez tickets non resolus et retards de cycle de bail comme indicateurs avances.",
          "Quand le niveau de service baisse, roulement et vacance augmentent vite.",
          "L'externalisation peut restaurer des SLA stables avec des workflows formels.",
        ],
      },
      {
        headingEn: "Control and reporting",
        headingFr: "Controle et reporting",
        bodyEn:
          "Externalized management does not remove ownership control when governance is explicit: KPIs, approval workflows, and monthly reviews.",
        bodyFr:
          "La gestion externalisee n'enleve pas le controle proprietaire si la gouvernance est explicite: KPI, workflows d'approbation et revues mensuelles.",
        pointsEn: [
          "Define approval boundaries for capex, vendor selection, and legal notices.",
          "Use monthly dashboards to keep decision authority with owners.",
          "Structured reporting reduces dependence on individual staff memory.",
        ],
        pointsFr: [
          "Definissez les seuils d'approbation pour capex, fournisseurs et avis legaux.",
          "Utilisez un dashboard mensuel pour garder l'autorite de decision cote proprietaire.",
          "Un reporting structure reduit la dependance a la memoire individuelle.",
        ],
      },
    ],
    featureRows: [
      {
        labelEn: "Operational depth",
        labelFr: "Profondeur operationnelle",
        veloraEn: "Process, escalation, and vendor workflows included.",
        veloraFr: "Processus, escalades et workflows fournisseurs inclus.",
        alternativeEn: "Strong if the internal team is experienced and staffed.",
        alternativeFr: "Fort si l'equipe interne est experimentee et suffisante.",
        veloraPositive: true,
        alternativePositive: true,
      },
      {
        labelEn: "Hiring burden",
        labelFr: "Charge de recrutement",
        veloraEn: "No new internal hire required.",
        veloraFr: "Aucun nouveau recrutement interne requis.",
        alternativeEn: "Requires hiring, training, backup, and supervision.",
        alternativeFr: "Exige recrutement, formation, releve et supervision.",
        veloraPositive: true,
        alternativePositive: false,
      },
      {
        labelEn: "Owner control",
        labelFr: "Controle proprietaire",
        veloraEn: "Control through approvals, dashboards, and review cadence.",
        veloraFr: "Controle par approbations, tableaux et cadence de revue.",
        alternativeEn: "Maximum direct control if the owner manages the team well.",
        alternativeFr: "Controle direct maximal si l'equipe est bien geree.",
        veloraPositive: true,
        alternativePositive: true,
      },
      {
        labelEn: "Continuity",
        labelFr: "Continuite",
        veloraEn: "Operating memory stays in documented systems.",
        veloraFr: "Memoire operationnelle dans les systemes documentes.",
        alternativeEn: "Can depend on a few key employees.",
        alternativeFr: "Peut dependre de quelques employes cles.",
        veloraPositive: true,
        alternativePositive: false,
      },
    ],
    pricingRows: [
      {
        itemEn: "Team cost",
        itemFr: "Cout d'equipe",
        veloraEn: "Management fee matched to portfolio complexity.",
        veloraFr: "Honoraires adaptes a la complexite du portefeuille.",
        alternativeEn: "Salary, benefits, training, software, and coverage.",
        alternativeFr: "Salaire, avantages, formation, logiciels et releve.",
        noteEn: "Compare the fully loaded cost, not salary alone.",
        noteFr: "Comparer le cout complet, pas seulement le salaire.",
      },
      {
        itemEn: "Service gaps",
        itemFr: "Ecarts de service",
        veloraEn: "SLA and reporting cadence are set up front.",
        veloraFr: "SLA et cadence de reporting definis des le depart.",
        alternativeEn: "Gaps appear when volume exceeds team capacity.",
        alternativeFr: "Les ecarts apparaissent quand le volume depasse la capacite.",
        noteEn: "Vacancy, churn, and unresolved tickets are pricing signals.",
        noteFr: "Vacance, roulement et tickets ouverts sont des signaux de cout.",
      },
    ],
    switchingStory: {
      titleEn: "A portfolio replaces informal follow-up with an operating cadence",
      titleFr: "Un portefeuille remplace le suivi informel par une cadence operationnelle",
      contextEn:
        "A small internal team knew the buildings well, but requests were tracked across inboxes and memory. Reporting was late and maintenance follow-up changed by employee.",
      contextFr:
        "Une petite equipe interne connaissait les immeubles, mais les demandes vivaient dans les courriels et la memoire. Les rapports etaient tardifs et le suivi variait selon l'employe.",
      actionsEn: [
        "Defined approval thresholds and weekly open-ticket review.",
        "Moved leasing and maintenance into repeatable workflows.",
        "Set monthly owner reporting around NOI, vacancy, arrears, and maintenance.",
      ],
      actionsFr: [
        "Definition des seuils d'approbation et revue hebdomadaire des tickets.",
        "Migration location et entretien vers des workflows repetables.",
        "Reporting mensuel sur NOI, vacance, arrears et entretien.",
      ],
      outcomeEn:
        "The owner kept visibility and decision rights while reducing the coordination load on internal staff.",
      outcomeFr:
        "Le proprietaire a garde visibilite et decisions tout en reduisant la charge de coordination interne.",
      disclosureEn:
        "Composite scenario based on recurring operating transitions; not a named client case study.",
      disclosureFr:
        "Scenario composite base sur des transitions operationnelles recurrentes; ce n'est pas une etude de cas client nominative.",
    },
    faqs: [
      {
        questionEn: "Does outsourcing mean losing control?",
        questionFr: "Externaliser veut-il dire perdre le controle?",
        answerEn:
          "No. Control improves when approvals, reporting cadence, KPIs, and escalation rules are clear.",
        answerFr:
          "Non. Le controle s'ameliore quand approbations, cadence de reporting, KPI et escalades sont clairs.",
      },
      {
        questionEn: "When should an owner keep management in-house?",
        questionFr: "Quand garder la gestion a l'interne?",
        answerEn:
          "Keep it in-house when the team is stable, specialized, adequately staffed, and already delivering reliable reporting and response times.",
        answerFr:
          "Gardez l'interne si l'equipe est stable, specialisee, suffisante et livre deja reporting et delais fiables.",
      },
      {
        questionEn: "What is the main trigger to outsource?",
        questionFr: "Quel est le principal declencheur pour externaliser?",
        answerEn:
          "The trigger is usually recurring service inconsistency: late reporting, unresolved tickets, vacancy delays, or staff overload.",
        answerFr:
          "Le declencheur est souvent l'inconstance: rapports tardifs, tickets ouverts, delais de vacance ou surcharge d'equipe.",
      },
    ],
    internalLinks: [
      { labelEn: "Rental management", labelFr: "Gestion locative", to: "/services/location" },
      { labelEn: "Pricing", labelFr: "Tarifs", to: "/tarifs" },
      { labelEn: "Contact", labelFr: "Contact", to: "/contact" },
    ],
  },
  {
    slug: "meilleures-alternatives-gestion-immobiliere-montreal",
    datePublished: "2026-07-03",
    dateModified: "2026-10-14",
    factsCheckedOn: "2026-10-14",
    methodEn:
      "Gestion Velora's fee basis and scope were read from its own pricing and methodology pages on the date shown. Each other firm's description restates only what that firm's own website published on the same date; the pages are linked below. Gestion Velora has not tested their services, and nothing here is an assessment of quality. Confirm scope, exclusions and pricing with each firm before signing.",
    methodFr:
      "La base tarifaire et la portée de Gestion Velora proviennent de ses pages Tarifs et Méthodologie à la date indiquée. La description de chaque autre firme reprend uniquement ce que son propre site web publiait à la même date; les pages sont liées ci-dessous. Gestion Velora n'a pas testé leurs services, et rien ici n'évalue leur qualité. Confirmez portée, exclusions et prix auprès de chaque firme avant de signer.",
    verdict: {
      chooseVeloraEn:
        "Choose Gestion Velora if your condo board wants a syndicate specialist with a published per-unit fee (33 to 36 $ per unit per month, 6-unit minimum), with rental or Airbnb management from the same firm if owners need it.",
      chooseVeloraFr:
        "Choisissez Gestion Velora si votre syndicat veut un spécialiste de la copropriété avec un tarif par unité publié (33 à 36 $ par unité par mois, minimum 6 unités), et la gestion locative ou Airbnb chez la même firme si des copropriétaires en ont besoin.",
      chooseAlternativeEn:
        "Choose another firm on this list if you want a lower published rate in exchange for a 2- or 3-year contract (Condo Stratégis), an external administrator seat on the board rather than full delegation (Gestion AlphaCondo), or a local office off the island of Montréal (Laucandrique). Confirm scope, exclusions, and pricing directly with each firm; this page does not rate their service quality.",
      chooseAlternativeFr:
        "Choisissez une autre firme de cette liste si vous voulez un tarif publié plus bas en échange d'un contrat de 2 ou 3 ans (Condo Stratégis), un administrateur externe au CA plutôt qu'une délégation complète (Gestion AlphaCondo), ou un bureau hors de l'île de Montréal (Laucandrique). Confirmez portée, exclusions et prix directement auprès de chaque firme; cette page n'évalue pas la qualité de leur service.",
      notWorthSwitchingEn:
        "Switching managers is probably not worth it if your current firm delivers financial statements on time, keeps the register and maintenance logbook current, and answers emergencies. A cheaper quote rarely offsets a bad handover.",
      notWorthSwitchingFr:
        "Changer de gestionnaire n'en vaut probablement pas la peine si votre firme actuelle livre les états financiers à temps, tient le registre et le carnet d'entretien à jour, et répond aux urgences. Un devis moins cher compense rarement une mauvaise transition.",
    },
    sources: [
      { nameEn: "Gestion Velora pricing page", nameFr: "Page Tarifs de Gestion Velora", url: "/tarifs", basis: "firsthand", dateChecked: "2026-10-14" },
      { nameEn: "Gestion Velora methodology page", nameFr: "Page Méthodologie de Gestion Velora", url: "/methodology", basis: "firsthand", dateChecked: "2026-10-14" },
      { nameEn: "Gestion Velora condo board management service", nameFr: "Service de gestion de syndicat de Gestion Velora", url: "/services/syndicat-copropriete", basis: "firsthand", dateChecked: "2026-10-14" },
      { nameEn: "Civil Code of Québec, Book IV, divided co-ownership", nameFr: "Code civil du Québec, Livre IV, copropriété divise", url: "https://www.legisquebec.gouv.qc.ca/fr/document/lc/CCQ-1991", basis: "regulatory", dateChecked: "2026-10-14" },
      { nameEn: "Gestion AlphaCondo, services page", nameFr: "Gestion AlphaCondo, page Services", url: "https://www.gestionalphacondo.com/services", basis: "published", dateChecked: "2026-10-14" },
      { nameEn: "SolutionCondo, homepage", nameFr: "SolutionCondo, page d'accueil", url: "https://www.solutioncondo.com/", basis: "published", dateChecked: "2026-10-14" },
      { nameEn: "SolutionCondo, hourly rates and disbursements", nameFr: "SolutionCondo, taux horaires et débours", url: "https://www.solutioncondo.com/services-gestion-copropriete/taux-horaires-et-debours/", basis: "published", dateChecked: "2026-10-14" },
      { nameEn: "SolutionCondo, Programme Harmonie (long-term rental)", nameFr: "SolutionCondo, Programme Harmonie (location long terme)", url: "https://www.solutioncondo.com/gestion-locative-programme-harmonie/", basis: "published", dateChecked: "2026-10-14" },
      { nameEn: "Condo Stratégis, condo syndicate management and pricing", nameFr: "Condo Stratégis, gestion de syndicat et tarifs", url: "https://condostrategis.ca/gestion-de-syndicat-de-copropriete/", basis: "published", dateChecked: "2026-10-14" },
      { nameEn: "Laucandrique, homepage", nameFr: "Laucandrique, page d'accueil", url: "https://laucandrique.ca/", basis: "published", dateChecked: "2026-10-14" },
    ],
    titleEn: "Best property management alternatives in Montreal",
    titleFr: "Meilleures alternatives en gestion immobiliere a Montreal",
    descriptionEn:
      "Choose Gestion Velora for a condo-syndicate specialist with published per-unit fees; Condo Stratégis for multi-year rates. Four Montréal-area firms compared.",
    descriptionFr:
      "Gestion Velora pour un spécialiste des syndicats avec tarifs par unité publiés; Condo Stratégis pour un contrat pluriannuel. Quatre firmes comparées.",
    h1En: "Best property management alternatives in Montreal",
    h1Fr: "Meilleures alternatives en gestion immobiliere a Montreal",
    heroEn: "The Montreal property management alternatives list for owners who need fit, not a one-sided vendor pitch.",
    heroFr: "La liste d'alternatives en gestion immobiliere a Montreal pour choisir selon le fit, pas selon un pitch a sens unique.",
    ctaEn: "Compare Gestion Velora with your shortlist",
    ctaFr: "Comparer Gestion Velora avec votre shortlist",
    primaryColumnEn: "Gestion Velora",
    primaryColumnFr: "Gestion Velora",
    alternativeColumnEn: "Other Montreal firms",
    alternativeColumnFr: "Autres firmes montréalaises",
    bestForEn: [
      "Condo boards and owners who want documented operations, clear reporting, and practical responsiveness.",
      "Portfolios comparing condo, rental, and short-term rental management under one operating lens.",
      "Decision makers who want a fair shortlist before requesting proposals.",
    ],
    bestForFr: [
      "Syndicats et proprietaires qui veulent operations documentees, reporting clair et reactivite concrete.",
      "Portefeuilles qui comparent copropriete, locatif et courte duree sous un meme angle operationnel.",
      "Decideurs qui veulent une shortlist honnete avant de demander des propositions.",
    ],
    notBestForEn: [
      "Buyers who only want the lowest direct monthly fee.",
      "Large institutions that need a fully custom enterprise stack before onboarding.",
    ],
    notBestForFr: [
      "Acheteurs qui cherchent seulement le plus bas frais mensuel direct.",
      "Grandes institutions qui exigent un stack enterprise totalement personnalise avant mandat.",
    ],
    whereAlternativeWinsEn: [
      "A larger competitor may have more staff redundancy for very large portfolios.",
      "A hyper-specialized condo firm may be better if the only need is syndicate administration.",
      "A firm with a dedicated platform may appeal to boards that prioritize resident app features above advisory support.",
    ],
    whereAlternativeWinsFr: [
      "Un concurrent plus grand peut offrir plus de redondance pour tres gros portefeuilles.",
      "Une firme ultra specialisee en copropriete peut mieux convenir si le besoin est seulement syndical.",
      "Une firme avec plateforme dediee peut seduire les CA qui priorisent l'app resident.",
    ],
    sections: [
      {
        headingEn: "How to use this alternatives list",
        headingFr: "Comment utiliser cette liste d'alternatives",
        bodyEn:
          "Inclusion rule: a firm is listed when its own website, read on October 14, 2026, names condo syndicate management as a service and the Greater Montréal area as a territory, and its pages were consistent enough to quote. Firms whose site names another region as its territory, or whose site still carried template placeholder content on that date, were left out. Shortlist by property type, reporting expectations, service urgency, and governance needs, then compare proposal scope line by line.",
        bodyFr:
          "Règle d'inclusion: une firme figure ici si son propre site web, lu le 14 octobre 2026, nomme la gestion de syndicat de copropriété comme service et le Grand Montréal comme territoire, et si ses pages étaient assez cohérentes pour être citées. Les firmes dont le site nomme une autre région comme territoire, ou dont le site contenait encore du contenu de gabarit à cette date, ont été écartées. Shortlistez selon type d'actif, attentes de reporting, urgence de service et gouvernance, puis comparez les devis ligne par ligne.",
        pointsEn: [
          "Ask each firm where they are strongest and where they are not the right fit.",
          "Compare management fee, exclusions, emergency handling, and reporting cadence.",
          "Request references from buildings similar to yours.",
        ],
        pointsFr: [
          "Demandez a chaque firme ou elle est forte et ou elle n'est pas le bon fit.",
          "Comparez honoraires, exclusions, urgences et cadence de reporting.",
          "Demandez des references d'immeubles comparables.",
        ],
      },
    ],
    featureRows: [
      {
        labelEn: "Condo governance",
        labelFr: "Gouvernance copropriete",
        veloraEn: "Strong fit for boards that need process plus advisory clarity.",
        veloraFr: "Bon fit pour CA qui veulent processus et clarte conseil.",
        alternativeEn: "Several competitors are also strong here.",
        alternativeFr: "Plusieurs concurrents sont aussi solides ici.",
        veloraPositive: true,
        alternativePositive: true,
      },
      {
        labelEn: "Rental operations",
        labelFr: "Operations locatives",
        veloraEn: "Fit for owners tracking service quality, vacancy, and NOI.",
        veloraFr: "Fit pour suivre service, vacance et NOI.",
        alternativeEn: "Broad firms may have more scale for large portfolios.",
        alternativeFr: "Les firmes larges peuvent avoir plus d'echelle.",
        veloraPositive: true,
        alternativePositive: true,
      },
      {
        labelEn: "Transparent decision support",
        labelFr: "Aide a la decision transparente",
        veloraEn: "Built around honest fit, reporting, and documented tradeoffs.",
        veloraFr: "Base sur fit honnete, reporting et arbitrages documentes.",
        alternativeEn: "Depends on the firm and proposal scope.",
        alternativeFr: "Depend de la firme et du devis.",
        veloraPositive: true,
        alternativePositive: false,
      },
      {
        labelEn: "Lowest direct price",
        labelFr: "Prix direct le plus bas",
        veloraEn: "Not positioned as the cheapest option.",
        veloraFr: "Pas positionnee comme l'option la moins chere.",
        alternativeEn: "Some smaller or narrower providers may quote lower.",
        alternativeFr: "Des fournisseurs plus petits ou etroits peuvent etre moins chers.",
        veloraPositive: false,
        alternativePositive: true,
      },
    ],
    pricingRows: [
      {
        itemEn: "Monthly management fee",
        itemFr: "Honoraires mensuels",
        veloraEn: "Condo management published at 33 to 36 $ per unit per month, 6-unit minimum, up to 40 $ with app and portal integrations (pricing page).",
        veloraFr: "Gestion de copropriété publiée à 33 à 36 $ par unité par mois, minimum 6 unités, jusqu'à 40 $ avec intégrations applicatives (page Tarifs).",
        alternativeEn: "Condo Stratégis publishes 36 $, 33 $ or 31 $ per unit per month for 1-, 2- or 3-year contracts. SolutionCondo publishes hourly rates and disbursements but no management fee. Gestion AlphaCondo and Laucandrique publish no pricing.",
        alternativeFr: "Condo Stratégis publie 36 $, 33 $ ou 31 $ par unité par mois selon un contrat de 1, 2 ou 3 ans. SolutionCondo publie des taux horaires et débours mais aucun honoraire de gestion. Gestion AlphaCondo et Laucandrique ne publient aucun prix.",
        noteEn: "Ask what is included before comparing price.",
        noteFr: "Demandez ce qui est inclus avant de comparer le prix.",
      },
      {
        itemEn: "Add-ons and exclusions",
        itemFr: "Extras et exclusions",
        veloraEn: "Proposal should define cadence, approvals, reporting, and emergency scope.",
        veloraFr: "Le devis doit definir cadence, approbations, reporting et urgences.",
        alternativeEn: "Some firms separate admin, app, legal, or emergency work.",
        alternativeFr: "Certaines firmes separent admin, app, legal ou urgences.",
        noteEn: "The cheapest quote can become expensive if core work is excluded.",
        noteFr: "Le devis le moins cher peut devenir cher si le coeur du travail est exclu.",
      },
    ],
    switchingStory: {
      titleEn: "A board shortlists fairly instead of defaulting to the loudest brand",
      titleFr: "Un CA shortliste honnetement au lieu de choisir la marque la plus visible",
      contextEn:
        "A condo board had three proposals with similar headlines and different exclusions. The lowest fee looked attractive, but emergency handling, reporting cadence, and reserve-fund coordination were unclear.",
      contextFr:
        "Un CA avait trois propositions aux titres similaires mais avec exclusions differentes. Le plus bas prix semblait attirant, mais urgences, reporting et fonds de prevoyance etaient flous.",
      actionsEn: [
        "Compared each proposal by included work, exclusions, and decision cadence.",
        "Asked each provider to name where they were not the strongest fit.",
        "Weighted service continuity and board workload alongside price.",
      ],
      actionsFr: [
        "Comparaison des devis par inclusions, exclusions et cadence de decision.",
        "Demande a chaque fournisseur d'indiquer ou il n'etait pas le meilleur fit.",
        "Ponderation de la continuite et de la charge CA avec le prix.",
      ],
      outcomeEn:
        "The board made a calmer decision because tradeoffs were explicit. The winner was not chosen by slogan, but by operating fit.",
      outcomeFr:
        "Le CA a decide plus calmement parce que les arbitrages etaient explicites. Le choix s'est fait par fit operationnel, pas par slogan.",
      disclosureEn:
        "Composite scenario based on recurring procurement reviews; not a named client case study.",
      disclosureFr:
        "Scenario composite base sur des revues d'achat recurrentes; ce n'est pas une etude de cas client nominative.",
    },
    alternatives: [
      {
        name: "Gestion Velora",
        isVelora: true,
        bestForEn: "Condo boards that want a syndicate specialist with a published per-unit fee basis and the tradeoffs written down; rental and short-term rental management are available from the same team.",
        bestForFr: "Syndicats qui veulent un spécialiste de la copropriété, avec une base tarifaire par unité publiée et des compromis écrits; la gestion locative et courte durée est offerte par la même équipe.",
        notBestForEn: "Buildings under 6 units, or buyers whose only criterion is the lowest possible direct fee.",
        notBestForFr: "Immeubles de moins de 6 unités, ou acheteurs dont le seul critère est le plus bas frais direct.",
        strengthsEn: ["Condo management published at 33 to 36 $ per unit per month on the pricing page.", "Syndicate management first; long-term and short-term rental available from the same team."],
        strengthsFr: ["Gestion de copropriété publiée à 33 à 36 $ par unité par mois sur la page Tarifs.", "La gestion de syndicat d'abord; location longue et courte durée offertes par la même équipe."],
        cautionsEn: ["Ask for the exact scope and cadence that match your building."],
        cautionsFr: ["Demandez la portée et la cadence exactes adaptées à votre immeuble."],
      },
      {
        name: "Gestion AlphaCondo",
        bestForEn: "Condo syndicates in the Greater Montréal area that want full delegation. Its site offers two formulas: complete management (financial, administrative and operational) or an external administrator seat on the board.",
        bestForFr: "Syndicats de copropriété du Grand Montréal qui veulent tout déléguer. Son site propose deux formules: gestion complète (financière, administrative et opérationnelle) ou un administrateur externe au CA.",
        notBestForEn: "Owners who also need long-term or short-term rental management; neither is offered on its site.",
        notBestForFr: "Propriétaires qui ont aussi besoin de gestion locative longue ou courte durée; ni l'une ni l'autre n'est offerte sur son site.",
        strengthsEn: ["Two published formulas: complete management or an external administrator on the board.", "Its site states 24h/7 emergency handling for buildings under management."],
        strengthsFr: ["Deux formules publiées: gestion complète ou administrateur externe au CA.", "Son site indique des urgences 24h/7 pour les immeubles sous gestion."],
        cautionsEn: ["No pricing published; request a quote.", "Territory stated as Greater Montréal; confirm your city."],
        cautionsFr: ["Aucun prix publié; demandez une soumission.", "Territoire indiqué: Grand Montréal; confirmez votre ville."],
      },
      {
        name: "SolutionCondo",
        bestForEn: "Condo boards choosing between complete, partial or self-managed formulas. Its site also lists a 24h/7 emergency call service and a long-term rental program for condo units (Programme Harmonie).",
        bestForFr: "Syndicats qui choisissent entre gestion complète, partielle ou autogestion. Son site présente aussi un service d'appels d'urgence 24h/7 et un programme de location long terme pour les unités de copropriété (Programme Harmonie).",
        notBestForEn: "Owners looking for short-term rental management; it is not mentioned on its site.",
        notBestForFr: "Propriétaires qui cherchent de la gestion de location courte durée; elle n'est pas mentionnée sur son site.",
        strengthsEn: ["Publishes an hourly-rate and disbursement schedule for 2026 and 2027.", "Montréal office; complete, partial or self-management formulas."],
        strengthsFr: ["Publie une grille de taux horaires et de débours pour 2026 et 2027.", "Bureau à Montréal; formules complète, partielle ou autogestion."],
        cautionsEn: ["No monthly management fee or per-unit price is published; the schedule covers hourly rates and disbursements only.", "No service territory is stated; confirm coverage."],
        cautionsFr: ["Aucun honoraire mensuel ni prix par unité publié; la grille couvre seulement taux horaires et débours.", "Aucun territoire de service indiqué; confirmez la couverture."],
      },
      {
        name: "Condo Stratégis",
        bestForEn: "Small and mid-size syndicates in Greater Montréal. Its site publishes per-unit monthly pricing by contract length: 36 $ for 1 year, 33 $ for 2 years, 31 $ for 3 years, and offers reserve-fund studies.",
        bestForFr: "Petits et moyens syndicats du Grand Montréal. Son site publie un prix mensuel par unité selon la durée du contrat: 36 $ pour 1 an, 33 $ pour 2 ans, 31 $ pour 3 ans, et offre des études de fonds de prévoyance.",
        notBestForEn: "Owners needing rental or short-term rental management, or very large syndicates; its site targets small and medium syndicates.",
        notBestForFr: "Propriétaires qui ont besoin de gestion locative ou courte durée, ou très grands syndicats; son site cible les petits et moyens syndicats.",
        strengthsEn: ["Published per-unit pricing, the only firm on this list other than Gestion Velora to do so.", "States RGCQ membership on its site."],
        strengthsFr: ["Prix par unité publié, la seule firme de cette liste avec Gestion Velora à le faire.", "Indique être membre du RGCQ sur son site."],
        cautionsEn: ["The published rates carry an asterisk; confirm what each contract includes and the custom-quote conditions.", "Decide the contract term you want before comparing the three rates."],
        cautionsFr: ["Les tarifs publiés portent un astérisque; confirmez ce que chaque contrat inclut et les conditions de soumission.", "Fixez la durée de contrat voulue avant de comparer les trois tarifs."],
      },
      {
        name: "Laucandrique",
        bestForEn: "Syndicates under 25 units (its Essentiel formula) or over 25 units (Classique). Its site names Greater Montréal, the Eastern Townships and the Laurentians, with offices in Brossard and Mont-Tremblant.",
        bestForFr: "Syndicats de moins de 25 unités (formule Essentiel) ou de plus de 25 unités (Classique). Son site nomme le Grand Montréal, l'Estrie et les Laurentides, avec des bureaux à Brossard et Mont-Tremblant.",
        notBestForEn: "Owners needing rental or short-term rental management; not offered on its site.",
        notBestForFr: "Propriétaires qui ont besoin de gestion locative ou courte durée; non offerte sur son site.",
        strengthsEn: ["Formulas split by unit count, plus Maintenance and Technique divisions and an emergency service.", "Its homepage states more than 35 years of operation."],
        strengthsFr: ["Formules selon le nombre d'unités, plus des divisions Maintenance et Technique et un service d'urgence.", "Sa page d'accueil indique plus de 35 ans d'activité."],
        cautionsEn: ["No pricing published.", "Head office in Brossard; confirm the local team for a building on the island of Montréal."],
        cautionsFr: ["Aucun prix publié.", "Siège social à Brossard; confirmez l'équipe locale pour un immeuble sur l'île de Montréal."],
      },
    ],
    faqs: [
      {
        questionEn: "Who are the best property management alternatives in Montreal?",
        questionFr: "Quelles sont les meilleures alternatives en gestion immobiliere a Montreal?",
        answerEn:
          "A fair shortlist can include Gestion Velora, Gestion AlphaCondo, SolutionCondo, Condo Stratégis and Laucandrique, depending on property type, unit count and whether you also need rental management.",
        answerFr:
          "Une shortlist honnête peut inclure Gestion Velora, Gestion AlphaCondo, SolutionCondo, Condo Stratégis et Laucandrique, selon le type d'actif, le nombre d'unités et le besoin ou non de gestion locative.",
      },
      {
        questionEn: "Should I choose the cheapest property manager?",
        questionFr: "Faut-il choisir le gestionnaire le moins cher?",
        answerEn:
          "Not automatically. Compare exclusions, emergency handling, reporting cadence, and the amount of work that remains with you.",
        answerFr:
          "Pas automatiquement. Comparez exclusions, urgences, reporting et travail qui reste de votre cote.",
      },
      {
        questionEn: "Why include competitor strengths?",
        questionFr: "Pourquoi mentionner les forces des concurrents?",
        answerEn:
          "Because buyers make better decisions when tradeoffs are explicit. Honest comparisons also build more trust than pretending every competitor is weak.",
        answerFr:
          "Parce que les acheteurs decident mieux quand les arbitrages sont explicites. Les comparatifs honnetes inspirent plus confiance.",
      },
    ],
    internalLinks: [
      { labelEn: "All services", labelFr: "Tous les services", to: "/services" },
      { labelEn: "Pricing", labelFr: "Tarifs", to: "/tarifs" },
      { labelEn: "Condo board management", labelFr: "Gestion de syndicat", to: "/services/syndicat-copropriete" },
      { labelEn: "Contact", labelFr: "Contact", to: "/contact" },
    ],
  },
];

export function getComparisonBySlug(slug: string): ComparisonPageData | null {
  return COMPARISON_PAGES.find((page) => page.slug === slug) ?? null;
}

/** Format an ISO date for the visible byline, timezone-safe (dates are calendar dates, not instants). */
export function formatComparisonDate(iso: string, locale: "fr" | "en"): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}
