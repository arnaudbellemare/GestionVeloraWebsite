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
    titleEn: "Condo manager vs self-management in Montreal",
    titleFr: "Gestionnaire de copropriete vs autogestion a Montreal",
    descriptionEn:
      "Compare condo manager vs self-management in Montreal across cost, compliance risk, response time, and board workload.",
    descriptionFr:
      "Comparatif gestionnaire de copropriete vs autogestion a Montreal: cout, conformite, delai de reponse et charge du CA.",
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
      { labelEn: "Contact", labelFr: "Contact", to: "/#contact-form" },
    ],
  },
  {
    slug: "airbnb-vs-location-longue-duree-montreal",
    titleEn: "Airbnb vs long-term rental in Montreal",
    titleFr: "Airbnb vs location longue duree a Montreal",
    descriptionEn:
      "Compare Airbnb vs long-term rental in Montreal across revenue volatility, regulation, workload, pricing, and NOI stability.",
    descriptionFr:
      "Comparatif Airbnb vs location longue duree a Montreal: revenus, reglementation, charge operationnelle, prix et stabilite NOI.",
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
      { labelEn: "Contact", labelFr: "Contact", to: "/#contact-form" },
    ],
  },
  {
    slug: "gestion-locative-interne-vs-externalisee",
    titleEn: "In-house vs outsourced rental management",
    titleFr: "Gestion locative interne vs externalisee",
    descriptionEn:
      "Compare in-house vs outsourced rental management in Montreal across control, service quality, staffing, reporting, and NOI stability.",
    descriptionFr:
      "Comparatif gestion locative interne vs externalisee a Montreal: controle, service, equipe, reporting et stabilite NOI.",
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
      { labelEn: "Contact", labelFr: "Contact", to: "/#contact-form" },
    ],
  },
  {
    slug: "meilleures-alternatives-gestion-immobiliere-montreal",
    titleEn: "Best property management alternatives in Montreal",
    titleFr: "Meilleures alternatives en gestion immobiliere a Montreal",
    descriptionEn:
      "Fair Montreal property management alternatives: Gestion Velora plus four real competitors compared by fit, strengths, cautions, and pricing signals.",
    descriptionFr:
      "Alternatives en gestion immobiliere a Montreal: Gestion Velora et quatre concurrents reels compares par fit, forces, limites et signaux de prix.",
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
          "Shortlist by property type, reporting expectations, service urgency, and governance needs. Then compare proposal scope line by line.",
        bodyFr:
          "Shortlistez selon type d'actif, attentes de reporting, urgence de service et gouvernance. Comparez ensuite les devis ligne par ligne.",
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
        veloraEn: "Quoted by asset type, unit count, and operating scope.",
        veloraFr: "Devis selon actif, nombre d'unites et portee operationnelle.",
        alternativeEn: "Ranges vary widely by provider and exclusions.",
        alternativeFr: "Varie fortement selon fournisseur et exclusions.",
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
        bestForEn: "Owners and condo boards that want documented operations, practical responsiveness, and clear tradeoff advice.",
        bestForFr: "Proprietaires et syndicats qui veulent operations documentees, reactivite pratique et conseils clairs.",
        notBestForEn: "Buyers whose only criterion is the lowest possible direct fee.",
        notBestForFr: "Acheteurs dont le seul critere est le plus bas frais direct.",
        strengthsEn: ["Multi-service lens across condo, rental, and Airbnb.", "Clear reporting and conversion-focused owner communication."],
        strengthsFr: ["Vision multi-services: copropriete, locatif et Airbnb.", "Reporting clair et communication orientee decisions."],
        cautionsEn: ["Ask for the exact scope and cadence that match your building."],
        cautionsFr: ["Demandez la portee et la cadence exactes adaptees a votre immeuble."],
      },
      {
        name: "Gestion AlphaCondo",
        bestForEn: "Condo corporations around Montreal and Laval looking for a specialized coproperty-management provider.",
        bestForFr: "Syndicats a Montreal et Laval qui veulent une firme specialisee en copropriete.",
        notBestForEn: "Owners whose main need is mixed rental, Airbnb, or commercial operations.",
        notBestForFr: "Proprietaires dont le besoin principal est locatif, Airbnb ou commercial mixte.",
        strengthsEn: ["Strong condo positioning.", "Good fit for boards that prioritize syndicate administration."],
        strengthsFr: ["Positionnement copropriete fort.", "Bon fit pour CA centres sur l'administration syndicale."],
        cautionsEn: ["Verify scope if your mandate spans rental or short-term operations."],
        cautionsFr: ["Validez la portee si votre mandat couvre locatif ou courte duree."],
      },
      {
        name: "Habitanium",
        bestForEn: "Boards that value tech-forward condo management and extended support coverage.",
        bestForFr: "CA qui valorisent une gestion copropriete technologique et un soutien etendu.",
        notBestForEn: "Owners who prefer a smaller, less platform-led operating style.",
        notBestForFr: "Proprietaires qui preferent une approche plus petite et moins plateforme.",
        strengthsEn: ["AI and 24/7 positioning.", "Coverage across Montreal, Laval, and the North Shore."],
        strengthsFr: ["Positionnement IA et 24/7.", "Couverture Montreal, Laval et Rive-Nord."],
        cautionsEn: ["Ask how platform features translate into daily board workload reduction."],
        cautionsFr: ["Demandez comment la plateforme reduit concretement la charge du CA."],
      },
      {
        name: "Gestion MR",
        bestForEn: "Syndicates that want a focused condo-administration specialist.",
        bestForFr: "Syndicats qui veulent un specialiste de l'administration copropriete.",
        notBestForEn: "Owners looking for broader rental or short-term rental operating support.",
        notBestForFr: "Proprietaires cherchant un support locatif ou courte duree plus large.",
        strengthsEn: ["Specialized syndicate-management focus.", "Relevant for governance and administrative follow-up."],
        strengthsFr: ["Focus specialise en gestion de syndicat.", "Pertinent pour gouvernance et suivi administratif."],
        cautionsEn: ["Compare service cadence, emergency handling, and reporting examples."],
        cautionsFr: ["Comparez cadence de service, urgences et exemples de rapports."],
      },
      {
        name: "SolutionCondo",
        bestForEn: "Condo boards that prioritize real-time condo-management systems and resident-facing workflows.",
        bestForFr: "CA qui priorisent des systemes temps reel et workflows coproprietaires.",
        notBestForEn: "Owners who need a single partner for mixed condo, rental, and Airbnb strategy.",
        notBestForFr: "Proprietaires qui veulent un seul partenaire pour copropriete, locatif et Airbnb.",
        strengthsEn: ["Recognizable condo-management positioning.", "Strong fit when app-enabled board communication matters."],
        strengthsFr: ["Positionnement copropriete reconnu.", "Bon fit quand l'app et la communication CA comptent beaucoup."],
        cautionsEn: ["Confirm pricing, onboarding, and what work remains with the board."],
        cautionsFr: ["Confirmez prix, onboarding et travail restant au CA."],
      },
    ],
    faqs: [
      {
        questionEn: "Who are the best property management alternatives in Montreal?",
        questionFr: "Quelles sont les meilleures alternatives en gestion immobiliere a Montreal?",
        answerEn:
          "A fair shortlist can include Gestion Velora, Gestion AlphaCondo, Habitanium, Gestion MR, and SolutionCondo, depending on property type and operating needs.",
        answerFr:
          "Une shortlist honnete peut inclure Gestion Velora, Gestion AlphaCondo, Habitanium, Gestion MR et SolutionCondo selon le type d'actif et les besoins.",
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
      { labelEn: "Contact", labelFr: "Contact", to: "/#contact-form" },
    ],
  },
];

export function getComparisonBySlug(slug: string): ComparisonPageData | null {
  return COMPARISON_PAGES.find((page) => page.slug === slug) ?? null;
}
