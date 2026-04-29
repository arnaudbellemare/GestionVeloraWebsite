export interface ComparisonSection {
  headingEn: string;
  headingFr: string;
  bodyEn: string;
  bodyFr: string;
  pointsEn: string[];
  pointsFr: string[];
}

export interface ComparisonPageData {
  slug: string;
  titleEn: string;
  titleFr: string;
  descriptionEn: string;
  descriptionFr: string;
  heroEn: string;
  heroFr: string;
  ctaEn: string;
  ctaFr: string;
  sections: ComparisonSection[];
}

export const COMPARISON_PAGES: ComparisonPageData[] = [
  {
    slug: "gestionnaire-vs-autogestion-condo",
    titleEn: "Condo manager vs self-management in Montreal",
    titleFr: "Gestionnaire de copropriete vs autogestion a Montreal",
    descriptionEn:
      "A practical comparison of cost, compliance risk, response time, and board workload between self-managed condo boards and professional management.",
    descriptionFr:
      "Comparatif pratique entre autogestion et gestion professionnelle de copropriete: cout, risque de conformite, delai de reponse et charge du CA.",
    heroEn: "Condo manager vs self-management: which model protects your building better?",
    heroFr: "Gestionnaire vs autogestion: quel modele protege mieux votre immeuble?",
    ctaEn: "Get a tailored management gap audit",
    ctaFr: "Obtenir un audit de gestion adapte",
    sections: [
      {
        headingEn: "Cost model",
        headingFr: "Modele de cout",
        bodyEn:
          "Self-management can look cheaper at first, but hidden costs appear quickly: director time, inconsistent follow-up, and expensive correction cycles.",
        bodyFr:
          "L'autogestion semble moins chere au debut, mais les couts caches apparaissent vite: temps des administrateurs, suivis incoherents et corrections couteuses.",
        pointsEn: [
          "Direct fees are lower in self-management, but volunteer workload rises sharply.",
          "Professional management stabilizes budget forecasting and vendor control.",
          "One avoided major error can offset multiple months of management fees.",
        ],
        pointsFr: [
          "Les frais directs sont plus bas en autogestion, mais la charge benevole explose.",
          "La gestion professionnelle stabilise le budget et le pilotage fournisseurs.",
          "Une seule erreur majeure evitee peut compenser plusieurs mois d'honoraires.",
        ],
      },
      {
        headingEn: "Regulatory and legal exposure",
        headingFr: "Risque reglementaire et legal",
        bodyEn:
          "Bill 16 obligations, reserve-fund cycles, and AGM governance rules are strict. Delays or missing records create avoidable legal exposure.",
        bodyFr:
          "Les obligations de la Loi 16, le fonds de prevoyance et la gouvernance d'AGA sont strictes. Les retards et registres incomplets augmentent l'exposition legale.",
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
  },
  {
    slug: "airbnb-vs-location-longue-duree-montreal",
    titleEn: "Airbnb vs long-term rental in Montreal",
    titleFr: "Airbnb vs location longue duree a Montreal",
    descriptionEn:
      "Compare revenue volatility, operational intensity, and regulatory constraints between short-term and long-term rental strategies in Greater Montreal.",
    descriptionFr:
      "Comparer volatilite des revenus, intensite operationnelle et contraintes reglementaires entre location courte et longue duree dans le Grand Montreal.",
    heroEn: "Airbnb or long-term rental: choose by risk profile, not hype",
    heroFr: "Airbnb ou longue duree: choisissez selon le risque, pas la hype",
    ctaEn: "Model your expected NOI by strategy",
    ctaFr: "Simuler votre NOI selon la strategie",
    sections: [
      {
        headingEn: "Revenue profile",
        headingFr: "Profil de revenus",
        bodyEn:
          "Short-term rentals can outperform in high-demand periods, but seasonality and occupancy swings can create unstable cash flow.",
        bodyFr:
          "La courte duree peut surperformer en haute demande, mais la saisonnalite et les variations d'occupation peuvent destabiliser le cash-flow.",
        pointsEn: [
          "Airbnb can drive higher gross revenue with active pricing and turnover control.",
          "Long-term rental generally provides smoother monthly forecasting.",
          "Your asset mix and neighborhood rules should drive the decision.",
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
          "Short-term rental requires faster operations: guest messaging, turnovers, cleaning QA, and permit compliance. Long-term operations are slower but still process-heavy.",
        bodyFr:
          "La courte duree exige une execution rapide: messages voyageurs, rotations, controle menage et conformite permis. La longue duree est plus stable mais reste process-intensive.",
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
  },
  {
    slug: "gestion-locative-interne-vs-externalisee",
    titleEn: "In-house vs outsourced rental management",
    titleFr: "Gestion locative interne vs externalisee",
    descriptionEn:
      "A side-by-side framework to decide when in-house rental management stops scaling and when outsourcing improves response quality and NOI stability.",
    descriptionFr:
      "Cadre d'aide a la decision pour savoir quand la gestion locative interne atteint ses limites et quand l'externalisation ameliore la qualite de service et la stabilite du NOI.",
    heroEn: "In-house vs outsourced management: when to switch",
    heroFr: "Interne vs externalisee: quand basculer",
    ctaEn: "Review your operating thresholds",
    ctaFr: "Evaluer vos seuils operationnels",
    sections: [
      {
        headingEn: "Scalability threshold",
        headingFr: "Seuil de scalabilite",
        bodyEn:
          "In-house models work well with small, simple portfolios. As units and maintenance events grow, response times and consistency often decline.",
        bodyFr:
          "Le modele interne fonctionne bien sur de petits portefeuilles simples. Quand les unites et incidents augmentent, delais et constance se degradent souvent.",
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
  },
];

export function getComparisonBySlug(slug: string): ComparisonPageData | null {
  return COMPARISON_PAGES.find((page) => page.slug === slug) ?? null;
}
