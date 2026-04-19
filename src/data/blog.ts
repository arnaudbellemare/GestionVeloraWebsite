export interface BlogSection {
  heading: string;
  paragraphs: RichParagraph[];
}

/** A segment within a rich paragraph: plain text or an internal link */
export type RichSegment = string | { text: string; to: string };
/** A paragraph is either a plain string or an array of segments (for inline links) */
export type RichParagraph = string | RichSegment[];

export interface BlogPostLocale {
  category: string;
  /** Display date (month + year) for cards */
  date: string;
  title: string;
  excerpt: string;
  /** 40–60 words, answer-first for AEO */
  brief: string;
  sections: BlogSection[];
}

export interface BlogPost {
  slug: string;
  image: string;
  /** ISO 8601 date (publication) */
  datePublished: string;
  /** ISO 8601 date (last update) */
  dateModified: string;
  fr: BlogPostLocale;
  en: BlogPostLocale;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "avenir-gestion-immobiliere-intelligente-2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85",
    datePublished: "2026-02-15",
    dateModified: "2026-04-01",
    fr: {
      category: "Actualités",
      date: "Février 2026",
      title: "L'avenir de la gestion immobilière intelligente à Montréal en 2026",
      excerpt:
        "Les tendances qui transformeront la gestion immobilière à Montréal : technologie, données et expérience locataire.",
      brief:
        "À Montréal, la gestion immobilière s'aligne sur plus de données, d'automatisation et de transparence envers copropriétaires et locataires. Cet article distille trois tendances pour 2026, le rôle des outils numériques pour les syndicats et ce qu'une gestion « intelligente » doit livrer concrètement, sans sacrifier la relation humaine ni les obligations légales au Québec.",
      sections: [
        {
          heading: "Quelles tendances structurent la gestion immobilière intelligente en 2026 ?",
          paragraphs: [
            [
              "La numérisation des processus (budgets, bons de travail, suivis de maintenance) et l'analyse de données opérationnelles (taux d'occupation, délais de location, coûts récurrents) deviennent le socle des opérations modernes. Pour les ",
              { text: "syndicats de copropriété", to: "/services/syndicat-copropriete" },
              " et les propriétaires montréalais, cette transition n'est plus optionnelle : elle réduit les erreurs manuelles, rend les décisions traçables et permet une gestion proactive plutôt que réactive.",
            ],
            "Selon des analyses sectorielles du marché locatif canadien (SCHL, 2024), la pression sur les coûts et le taux d'occupation pousse les gestionnaires vers des indicateurs plus fréquents, bien au-delà du seul exercice financier annuel. Un suivi mensuel permet d'ajuster les loyers, d'anticiper les travaux urgents et de repérer les tendances de vacance avant qu'elles n'impactent le rendement. Sur le marché montréalais, où la réglementation et la concurrence évoluent vite, cette réactivité repose entièrement sur la qualité de l'information disponible.",
            "L'intelligence artificielle et les outils d'automatisation s'intègrent progressivement, non pour remplacer le jugement du gestionnaire, mais pour libérer du temps sur les tâches répétitives : rappels de loyer, suivis de maintenance standardisés, rapports d'exploitation. La valeur ajoutée humaine reste dans l'arbitrage : négociation en situation tendue, gestion d'une urgence structurelle ou médiation entre copropriétaires lors de décisions stratégiques difficiles.",
          ],
        },
        {
          heading: "Comment les syndicats et investisseurs tirent-ils parti des plateformes numériques ?",
          paragraphs: [
            "Les conseils d'administration peuvent centraliser les documents d'assemblée, les contrats et l'historique complet des travaux, ce qui répond directement à l'exigence de transparence prévue par la Loi sur la copropriété des immeubles (Québec, RLRQ c. C-6.1). Un historique bien documenté réduit les litiges lors des assemblées générales et simplifie le transfert de dossier lors d'un changement de gestionnaire ou d'une vente d'unité.",
            "Pour les investisseurs disposant de plusieurs propriétés à Montréal, les tableaux de bord comparatifs permettent d'identifier rapidement quel immeuble sous-performe et où concentrer les investissements. Cela s'avère particulièrement précieux quand le fonds de prévoyance et les études de réserve conditionnent les décisions pluriannuelles, chaque dollar mal orienté aujourd'hui peut générer des appels de fonds imprévus demain.",
            "Les copropriétaires individuels bénéficient eux aussi de cette transparence accrue : l'accès numérique aux procès-verbaux, aux états financiers et aux communications du syndicat réduit le sentiment de manque d'information souvent à l'origine des tensions internes. Une gouvernance numérique bien structurée transforme la relation de gestion en acte de confiance durable, pas seulement en obligation légale.",
          ],
        },
        {
          heading: "Que signifie une gestion intelligente pour Airbnb et la location longue durée ?",
          paragraphs: [
            [
              "Pour la ",
              { text: "location courte durée à Montréal", to: "/services/airbnb" },
              ", l'automatisation des messages aux voyageurs, des plannings de ménage et des calendriers de réservation réduit les frictions opérationnelles et les risques d'annulation. Pour la location longue durée, une sélection rigoureuse et un suivi actif du locataire limitent le roulement locatif, souvent l'un des postes de coût les plus sous-estimés dans un portefeuille immobilier.",
            ],
            "Gestion Velora intègre ces outils numériques tout en maintenant une relation directe avec les parties prenantes : la technologie doit servir la clarté et la réactivité, pas remplacer les décisions humaines sur les urgences, les litiges ou les arbitrages stratégiques. Les meilleurs résultats combinent des processus automatisés pour les tâches répétitives et une disponibilité humaine pour les situations imprévues qui sortent des scénarios préprogrammés.",
            "En 2026, la distinction entre gestionnaires performants et gestionnaires moyens ne sera pas uniquement technologique ; elle sera dans la capacité à interpréter les données, à agir rapidement et à aligner conformité, rentabilité et qualité de la relation avec les occupants. Pour les propriétaires et syndicats à Montréal, ce choix est déterminant pour la valeur et la sérénité à long terme.",
          ],
        },
      ],
    },
    en: {
      category: "News",
      date: "February 2026",
      title: "The future of intelligent property management in Montreal in 2026",
      excerpt:
        "Trends transforming property management in Montreal: technology, data, and tenant experience.",
      brief:
        "Montreal property management is converging on stronger data, automation, and transparency for owners and tenants. This article summarizes three 2026 trends, how digital tools support condo boards, and what 'smart' management should deliver in practice, without losing human judgment or compliance with Quebec rules.",
      sections: [
        {
          heading: "What trends are shaping intelligent property management in 2026?",
          paragraphs: [
            [
              "Digitizing core workflows (budgets, work orders, maintenance logs) and leveraging operational data (occupancy rates, time-to-lease, recurring costs) has become the baseline for well-run properties. For ",
              { text: "condo boards", to: "/services/syndicat-copropriete" },
              " and landlords across Montreal, this shift from spreadsheets to centralized platforms is no longer optional: it cuts manual error, makes decisions auditable, and enables proactive management instead of reactive damage control.",
            ],
            "Canadian rental market analysis (CMHC, 2024) highlights mounting cost and occupancy pressure, pushing managers toward more frequent performance indicators, well beyond the annual financial close. Monthly dashboards allow rent adjustments, early identification of maintenance trends, and vacancy forecasting before shortfalls materialize. In Montreal's evolving regulatory and competitive landscape, that kind of responsiveness depends entirely on the quality of available data.",
            "AI tools and automation are progressively entering property management, not to replace manager judgment, but to free time from repetitive tasks: rent reminders, standardized maintenance follow-ups, operational reports. Human value remains where it matters most: resolving tense tenant situations, managing structural emergencies, or facilitating condo board decisions with long-term financial consequences.",
          ],
        },
        {
          heading: "How do condo boards and investors benefit from digital platforms?",
          paragraphs: [
            "Boards can centralize meeting materials, contracts, and the full work history of a building, directly supporting transparency obligations under Quebec's Act respecting divided co-ownership (C-6.1). Well-maintained digital records reduce disputes at annual meetings and simplify handoffs when managers change or units are sold.",
            "For investors managing several Montreal properties, comparative dashboards quickly identify underperforming assets and clarify where capital should be concentrated. This is especially valuable when reserve studies and reserve funds are driving multi-year planning, and a poorly allocated dollar today can turn into an unexpected special assessment down the line.",
            "Individual unit owners benefit too: online access to minutes, financial statements, and syndicate communications reduces the information gap that typically fuels internal tensions. Well-structured digital governance turns property management into an act of sustained trust, not just a legal obligation.",
          ],
        },
        {
          heading: "What does 'smart' mean for Airbnb and long-term rentals?",
          paragraphs: [
            [
              "For ",
              { text: "short-term rentals in Montreal", to: "/services/airbnb" },
              ", automated guest messaging, cleaning schedules, and reservation calendars reduce friction and cancellation risk. For long-term rentals, rigorous tenant screening and active tenancy management limit turnover, one of the most underestimated cost drivers in a real estate portfolio.",
            ],
            "Gestion Velora integrates these digital tools while maintaining a direct line to all stakeholders: technology should serve clarity and responsiveness, not replace judgment on emergencies, disputes, or strategic tradeoffs. The best outcomes combine automated workflows for recurring tasks with genuine human availability for situations that fall outside any preset scenario.",
            "By 2026, the gap between strong and average property managers will be less about technology adoption and more about the ability to interpret data, act fast, and align compliance, profitability, and occupant relationship quality. For Montreal owners and condo boards, that distinction determines long-term asset value, and peace of mind.",
          ],
        },
      ],
    },
  },
  {
    slug: "maintenance-preventive-economise-millions",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=85",
    datePublished: "2026-01-14",
    dateModified: "2026-04-01",
    fr: {
      category: "Technologie",
      date: "Janvier 2026",
      title: "Maintenance préventive à Montréal : pourquoi ça économise des millions",
      excerpt:
        "Une stratégie de maintenance proactive réduit les coûts et prolonge la durée de vie des actifs immobiliers.",
      brief:
        "La maintenance préventive vise à détecter l'usure avant la panne coûteuse et à étaler les dépenses dans le temps. Nous expliquons pourquoi les immeubles bien suivis évitent des travaux d'urgence majeurs, comment le fonds de prévoyance s'y rattache en copropriété, et quels systèmes méritent un calendrier d'inspection prioritaire à Montréal.",
      sections: [
        {
          heading: "Pourquoi la maintenance préventive réduit-elle les coûts totaux ?",
          paragraphs: [
            "Une panne non détectée (toiture, chauffage, ascenseur, plomberie principale) peut déclencher des dommages en cascade et des travaux d'urgence facturés à prime, souvent 20 à 40 % plus chers que les travaux planifiés selon les ordres de grandeur couramment cités en gestion d'actifs. À Montréal, où les hivers rigoureux accélèrent la dégradation des systèmes d'enveloppe et de chauffage, ce différentiel de coût est encore plus marqué : retarder un entretien de toiture d'une saison peut tripler la facture finale une fois les infiltrations d'eau établies.",
            "Les inspections régulières documentent l'état des équipements et alimentent les budgets prévisionnels plutôt que les surprises en milieu d'hiver. Un calendrier d'entretien annuel, partagé avec le conseil d'administration ou le propriétaire, permet de prendre des décisions budgétaires en avance et d'éviter les appels de fonds d'urgence qui fragilisent la confiance des copropriétaires au moment des assemblées.",
            "La maintenance préventive n'est pas uniquement une stratégie financière. C'est aussi une protection juridique. En cas d'incident (dégât des eaux, accident lié à un ascenseur, incendie par défaillance électrique), un historique d'entretien documenté démontre la diligence raisonnable du syndicat ou du propriétaire, réduisant significativement l'exposition en responsabilité civile.",
          ],
        },
        {
          heading: "Comment le syndicat aligne-t-il entretien et fonds de prévoyance ?",
          paragraphs: [
            "Au Québec, le fonds de prévoyance finance les travaux majeurs de remplacement et de réparation ; une étude de réserve actualisée traduit l'état des composantes majeures en coûts projetés et en échéances, permettant au syndicat d'ajuster les cotisations en conséquence (Loi sur la copropriété, RLRQ c. C-6.1). L'entretien courant bien documenté ralentit également la dégradation des composantes, repoussant certains remplacements coûteux et prolongeant la durée de vie effective des immeubles.",
            [
              "Sans calendrier d'entretien structuré, le syndicat risque de surestimer ou sous-estimer ses charges opérationnelles, fragilisant la confiance des copropriétaires lors des assemblées. Pour en savoir plus sur la ",
              { text: "gestion complète d'un syndicat de copropriété à Montréal", to: "/services/syndicat-copropriete" },
              ", un accompagnement professionnel permet de structurer ces cycles de maintenance avec rigueur et transparence.",
            ],
            "La loi impose des obligations de prudence et de loyauté aux administrateurs du syndicat, ce qui inclut la mise en place d'une politique d'entretien raisonnablement préventive. Un gestionnaire expérimenté aide le conseil à prioriser les interventions selon le risque, l'impact sur les occupants et le coût total de possession, pas seulement le prix immédiat d'une soumission.",
          ],
        },
        {
          heading: "Quels systèmes surveiller en priorité dans un immeuble montréalais ?",
          paragraphs: [
            "Toiture et étanchéité, chauffage et eau chaude sanitaire (ECS), électricité des parties communes, ascenseurs et structure portante sont typiquement les postes à forte criticité pour la sécurité des occupants et la continuité d'usage de l'immeuble. À Montréal, le gel-dégel génère des contraintes particulières sur les membranes d'étanchéité et les systèmes de drainage : ces éléments méritent une inspection annuelle post-hiver, au minimum.",
            "Gestion Velora recommande des prestataires qualifiés avec une traçabilité complète : photos d'état, procès-verbaux d'intervention et suivi des correctifs. Cette documentation forme la base d'une défense solide en cas d'incident ou de litige, mais elle sert aussi à informer le conseil lors de la planification budgétaire et de la révision de l'étude de réserve.",
            "En résumé, investir dans un calendrier de maintenance préventive n'est pas une dépense. C'est une réduction de risque mesurable. Pour les copropriétés et les immeubles locatifs à Montréal, c'est l'un des leviers les plus directs pour préserver la valeur des actifs, maintenir la confiance des occupants et éviter les surprises qui coûtent cher à tous les niveaux.",
          ],
        },
      ],
    },
    en: {
      category: "Technology",
      date: "January 2026",
      title: "Preventive maintenance in Montreal: why it saves millions",
      excerpt:
        "A proactive maintenance strategy reduces costs and extends the lifespan of real estate assets.",
      brief:
        "Preventive maintenance finds wear before expensive failures and spreads spend over time. Here's why well-run buildings avoid major emergency work, how reserve funds connect for condo boards, and which systems deserve priority inspection calendars in Montreal.",
      sections: [
        {
          heading: "Why does preventive maintenance lower total cost?",
          paragraphs: [
            "An undetected failure (roof membrane, heating system, elevator, main plumbing) can cascade into emergency work that's often priced at a 20–40% premium over planned repairs in standard asset management practice. In Montreal, where severe winters accelerate wear on building envelopes and heating systems, that cost gap widens further: deferring a roof maintenance cycle by one season can easily triple the final invoice once water infiltration has done its damage.",
            "Regular inspections document equipment condition and feed budget forecasts instead of generating mid-winter surprises. A shared annual maintenance calendar, visible to the board or property owner, enables advance budget decisions and helps avoid emergency special assessments that erode owner confidence and create financial strain for unit holders.",
            "Preventive maintenance is also a legal shield. When incidents occur (water damage, elevator accidents, electrical fires) a documented maintenance history demonstrates the syndicate's or owner's reasonable diligence, substantially reducing liability exposure. Without records, defending against claims becomes difficult and expensive regardless of the actual care taken.",
          ],
        },
        {
          heading: "How do boards align upkeep with the reserve fund?",
          paragraphs: [
            "In Quebec, the reserve fund finances major replacements and repairs; an up-to-date reserve study translates major component condition into projected costs and timelines, allowing the board to calibrate contributions accordingly (Condo Act, C-6.1). Well-documented routine maintenance also slows component degradation, extending the effective lifespan of systems and deferring some costly replacements, which directly benefits the building's long-term financial health.",
            [
              "Without a structured maintenance schedule, boards risk mis-estimating operational charges, and owner confidence suffers at AGMs. For boards seeking professional support with ",
              { text: "condo management in Montreal", to: "/services/syndicat-copropriete" },
              ", a dedicated manager helps structure these maintenance cycles with documentation, vendor management, and clear board communication.",
            ],
            "Quebec law imposes prudence and loyalty obligations on syndicate administrators, which includes establishing a reasonably preventive maintenance policy. An experienced manager helps the board prioritize interventions by risk level, occupant impact, and total cost of ownership, not simply by the cheapest immediate quote.",
          ],
        },
        {
          heading: "Which systems matter most in a Montreal building?",
          paragraphs: [
            "Roofing and waterproofing, heating and domestic hot water, common electrical systems, elevators, and load-bearing structure are typically the highest criticality systems for occupant safety and continuous building use. In Montreal, freeze-thaw cycles create particular stress on waterproofing membranes and drainage systems; these deserve post-winter inspection every year at minimum, alongside any pre-winter preparation.",
            "Gestion Velora emphasizes qualified vendors with complete traceability: condition photos, intervention reports, and documented fixes. This documentation forms the foundation for defensible operations if incidents arise, but it also serves the board during budget planning and reserve study updates, replacing guesses with evidence.",
            "In short, investing in a preventive maintenance calendar is not an expense. It is a measurable risk reduction. For Montreal condos and rental properties, it is one of the most direct levers available to preserve asset value, sustain tenant and owner trust, and avoid the costly surprises that affect everyone's bottom line.",
          ],
        },
      ],
    },
  },
  {
    slug: "maximiser-noi-approche-donnees",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=85",
    datePublished: "2025-12-10",
    dateModified: "2026-04-01",
    fr: {
      category: "Finance",
      date: "Décembre 2025",
      title: "Maximiser le NOI à Montréal : approche basée sur les données",
      excerpt:
        "Comment l'analyse des données aide les propriétaires et syndicats à optimiser le revenu net d'exploitation.",
      brief:
        "Le NOI (revenu net d'exploitation) résume la performance opérationnelle avant le financement. Nous voyons quels leviers mesurer chaque mois, comment la transparence des charges en copropriété soutient les décisions d'assemblée, et pourquoi la donnée seule ne remplace pas une gouvernance claire entre copropriétaires.",
      sections: [
        {
          heading: "Qu'est-ce que le NOI et pourquoi le suivre chaque mois ?",
          paragraphs: [
            "Le NOI (revenu net d'exploitation) agrège les revenus locatifs ou les charges de copropriété collectées, moins les dépenses opérationnelles courantes, hors capital et amortissement selon la convention comptable appliquée. C'est l'indicateur le plus synthétique de la performance opérationnelle d'un immeuble : il permet de distinguer un problème de revenus (loyers trop bas, vacance élevée) d'un problème de charges (maintenance non maîtrisée, contrats peu compétitifs).",
            "Une variation de 2 à 3 points de vacance ou de dépenses peut déplacer le NOI plus qu'une hausse modérée des loyers : d'où l'intérêt de tableaux comparatifs mensuels plutôt qu'un seul bilan annuel. Sur le marché montréalais, où les revenus locatifs subissent des pressions légales (encadrement des augmentations au TAL) et où les coûts de maintenance augmentent, un suivi serré est indispensable pour maximiser la rentabilité sans compromettre la qualité des services aux locataires.",
            "Le suivi mensuel du NOI permet aussi d'identifier les anomalies rapidement : une hausse soudaine des coûts d'eau peut signaler une fuite non détectée ; une baisse des encaissements peut indiquer des problèmes de recouvrement en développement. Ces signaux faibles, détectés tôt, se règlent à moindre coût qu'une fois qu'ils ont dégénéré en litige ou en dommage structurel.",
          ],
        },
        {
          heading: "Quelles données regarder pour un immeuble locatif ou un syndicat ?",
          paragraphs: [
            [
              "Pour la ",
              { text: "gestion locative longue durée à Montréal", to: "/services/location" },
              ", les indicateurs prioritaires sont le délai moyen de location, le taux d'impayés, les coûts de travaux récurrents et les dépenses utilitaires, croisés avec la composition des unités. Ces données permettent d'évaluer si une unité est sous-louée, si les charges d'entretien sont anormalement élevées par rapport au marché ou si les locataires actuels présentent un profil de risque préoccupant.",
            ],
            "Pour la copropriété, les données clés sont le budget réel vs prévisionnel, les appels de fonds spéciaux, les travaux reportés et l'état du fonds de prévoyance. Une lecture croisée de ces chiffres révèle si le syndicat est structurellement solide ou s'il accumule silencieusement des passifs (travaux différés, réserve sous-alimentée) qui se matérialiseront en charges imprévues dans les exercices suivants.",
            "La granularité des données importe autant que leur fréquence : des rapports segmentés par unité, par système ou par catégorie de dépense permettent des décisions de priorisation bien plus précises qu'un rapport consolidé global. L'enjeu n'est pas d'accumuler des chiffres. C'est d'avoir les bonnes données, au bon niveau de détail, au moment où les décisions doivent être prises.",
          ],
        },
        {
          heading: "Comment la donnée renforce-t-elle la confiance sans tout automatiser ?",
          paragraphs: [
            "Des rapports lisibles, pour le conseil et pour les copropriétaires, réduisent les débats stériles sur les chiffres lors des assemblées et recentrent la discussion sur les priorités stratégiques. Une communication financière transparente, présentée avec des benchmarks simples et des fourchettes de projection, transforme des chiffres bruts en informations actionnables pour des parties prenantes qui n'ont pas nécessairement une formation comptable.",
            "Gestion Velora combine tableaux de bord opérationnels et arbitrage humain : la donnée éclaire, la gouvernance tranche. Cela est particulièrement vrai pour les décisions structurantes (travaux majeurs, révision du budget, politique de loyers) où des facteurs non quantifiables (dynamique de marché, qualité des soumissions, relations avec les locataires) doivent compléter l'analyse chiffrée.",
            "En pratique, maximiser le NOI à Montréal ne signifie pas uniquement augmenter les loyers ou réduire les charges à court terme. Cela implique une vision intégrée : stabiliser la vacance, maîtriser les coûts de maintenance, gérer proactivement les impayés, et investir intelligemment dans l'immeuble pour préserver (ou accroître) sa valeur marchande dans un marché immobilier compétitif.",
          ],
        },
      ],
    },
    en: {
      category: "Finance",
      date: "December 2025",
      title: "Maximize NOI in Montreal: a data-driven approach",
      excerpt:
        "How data analysis helps owners and condo boards optimize net operating income.",
      brief:
        "NOI summarizes operating performance before financing. We outline which levers to track monthly, how transparent condo charges support AGM decisions, and why data never replaces clear governance among owners.",
      sections: [
        {
          heading: "What is NOI and why track it monthly?",
          paragraphs: [
            "Net Operating Income aggregates rental revenue (or collected condo fees under management) minus recurring operating expenses, excluding capital items and depreciation per the applicable accounting convention. It is the single most informative measure of a building's operational performance: it distinguishes revenue-side issues (underpriced rents, high vacancy) from cost-side problems (uncontrolled maintenance, uncompetitive contracts).",
            "A 2–3 point swing in vacancy or expenses can move NOI more than a modest rent increase, which is why month-over-month dashboards matter more than a single year-end report. In Montreal, where rent increases face regulatory constraints (TAL guidelines) and maintenance costs are rising, tight monthly monitoring is essential to maximize returns without compromising service quality for tenants.",
            "Regular NOI tracking also surfaces anomalies early: a sudden spike in water costs may signal an undetected leak; a dip in collections may indicate developing arrears. These weak signals, caught quickly, resolve at a fraction of the cost compared to waiting until they escalate into disputes or structural damage.",
          ],
        },
        {
          heading: "Which metrics matter for rentals vs. condo boards?",
          paragraphs: [
            [
              "For ",
              { text: "long-term rental management in Montreal", to: "/services/location" },
              ", priority indicators are time-to-lease, arrears rates, recurring repair costs, and utilities, crossed with unit mix. These metrics reveal whether a unit is underpriced, whether maintenance charges are running above market norms, or whether the current tenant profile carries concerning risk.",
            ],
            "For condo boards, the key data points are budget-vs-actual variances, special assessments levied, deferred work accumulations, and reserve fund balance relative to the reserve study. Reading these numbers together reveals whether the syndicate is structurally sound, or quietly accumulating liabilities (deferred repairs, underfunded reserves) that will materialize as unexpected charges in future fiscal years.",
            "Data granularity matters as much as frequency: reports segmented by unit, by system, or by expense category enable far more precise prioritization decisions than a single consolidated summary. The goal isn't to accumulate data. It's to have the right data, at the right level of detail, precisely when decisions need to be made.",
          ],
        },
        {
          heading: "How does data build trust without automating everything?",
          paragraphs: [
            "Readable reports, for boards and unit owners alike, reduce unproductive arguments about numbers at meetings and refocus discussion on strategic priorities. Transparent financial communication, presented with simple benchmarks and projection ranges, converts raw figures into actionable information for stakeholders who may not have an accounting background.",
            "Gestion Velora pairs operational dashboards with human judgment: data informs, governance decides. This is especially true for structural decisions (major capital work, budget revisions, rent policies) where non-quantifiable factors (market dynamics, bid quality, tenant relationships) must complement the numerical analysis.",
            "In practice, maximizing NOI in Montreal doesn't mean simply raising rents or cutting costs in the short term. It requires an integrated view: stabilizing vacancy, controlling maintenance spend, proactively managing arrears, and investing wisely in the building to preserve (or grow) its market value in a competitive real estate environment.",
          ],
        },
      ],
    },
  },
  {
    slug: "experience-locataire-avantage-concurrentiel",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=85",
    datePublished: "2025-11-18",
    dateModified: "2026-04-01",
    fr: {
      category: "Stratégie",
      date: "Novembre 2025",
      title: "L'expérience locataire à Montréal : le nouvel avantage concurrentiel",
      excerpt:
        "Dans un marché compétitif, la qualité de l'expérience locataire fait la différence.",
      brief:
        "Quand l'offre est abondante, les locataires et voyageurs comparent la réactivité, la propreté et la clarté des règles. Nous détaillons les attentes mesurables en location longue durée et courte durée, l'impact du roulement sur le cash-flow, et des pratiques concrètes pour des réponses rapides sans sacrifier la conformité.",
      sections: [
        {
          heading: "Pourquoi l'expérience locataire influence-t-elle directement le rendement ?",
          paragraphs: [
            "Un roulement élevé multiplie les frais de remise en état des unités, les coûts de publicité et la période de vacance, des postes qui peuvent représenter plusieurs pourcents du revenu brut annuel selon la structure de l'actif. À Montréal, où le marché locatif a connu des tensions importantes, la fidélisation des bons locataires est devenue un avantage économique concret, au-delà de la simple satisfaction morale.",
            "Une communication prévisible, avec des délais de réponse clairs, des canaux uniques et la traçabilité des demandes, réduit les litiges et les appels répétés au Tribunal administratif du logement (TAL) pour des problèmes qui auraient pu être résolus en amont. Chaque plainte formelle non seulement coûte en temps de gestion, mais génère également une tension relationnelle difficile à dissoudre.",
            "L'expérience locataire n'est pas seulement un facteur de rétention : c'est aussi un signal que les gestionnaires sérieux envoient sur le marché. Un immeuble bien géré attire de meilleurs profils locataires, maintient des niveaux de loyer plus compétitifs et génère moins de dommages à la remise, un effet cumulatif qui se mesure en milliers de dollars sur la durée d'un bail.",
          ],
        },
        {
          heading: "Que attendent les locataires longue durée vs. voyageurs Airbnb à Montréal ?",
          paragraphs: [
            [
              "Pour la ",
              { text: "gestion locative longue durée", to: "/services/location" },
              " : les locataires montréalais attendent un état des lieux clair à l'entrée, un traitement structuré des demandes d'entretien avec suivi, et une explication lisible des règlements si l'immeuble est en mode syndicat. La transparence sur les règles et les délais d'intervention est la base d'une relation locative durable.",
            ],
            [
              "Pour la ",
              { text: "location Airbnb à Montréal", to: "/services/airbnb" },
              " : les voyageurs évaluent la propreté, la clarté des instructions d'arrivée et la réactivité en cas d'imprévu. Un manque de clarté sur les règles d'occupation génère des avis négatifs et des litiges qui se règlent rarement en faveur du propriétaire. Un cadre d'opération bien défini protège à la fois le bien et la réputation de l'hôte.",
            ],
            "Ces attentes divergent sur le format, mais convergent sur l'essentiel : réactivité, cohérence et transparence. Qu'il s'agisse d'un séjour de deux nuits ou d'un bail de deux ans, les occupants veulent savoir qu'ils peuvent faire confiance au gestionnaire pour traiter rapidement et équitablement tout problème qui survient.",
          ],
        },
        {
          heading: "Comment mesurer l'expérience sans en faire une obsession vanity ?",
          paragraphs: [
            "Des indicateurs simples mais concrets : délai moyen de première réponse aux demandes, taux de renouvellement de bail, nombre de réclamations récurrentes par unité, notes internes après chaque intervention. Ces métriques reflètent la réalité opérationnelle mieux que les avis en ligne, qui peuvent être biaisés ou non représentatifs de l'ensemble du portefeuille.",
            "Gestion Velora aligne ces indicateurs sur des standards de service transparents pour le propriétaire : l'objectif est la stabilité locative et l'optimisation du rendement, pas seulement une note en ligne flatteuse. Les rapports trimestriels incluent une revue de ces indicateurs, permettant d'identifier les unités qui méritent une attention particulière avant que les problèmes ne deviennent critiques.",
            "En définitive, l'expérience locataire est un investissement mesurable : réduire le taux de roulement, améliorer les délais de réponse et formaliser les processus d'entrée et de sortie peut se traduire directement en économies nettes significatives sur l'horizon d'une ou deux années. C'est l'un des leviers les plus sous-exploités dans la gestion immobilière professionnelle à Montréal.",
          ],
        },
      ],
    },
    en: {
      category: "Strategy",
      date: "November 2025",
      title: "Tenant experience in Montreal: the new competitive advantage",
      excerpt:
        "In a competitive market, tenant experience quality makes the difference.",
      brief:
        "When supply is plentiful, tenants and guests compare responsiveness, cleanliness, and clear rules. We outline measurable expectations for long- and short-term rentals, turnover's cash-flow impact, and practical ways to respond fast while staying compliant.",
      sections: [
        {
          heading: "Why does tenant experience directly affect returns?",
          paragraphs: [
            "High turnover compounds turnover costs, advertising spend, and vacancy periods, categories that can represent several points of gross annual income depending on asset type. In Montreal, where the rental market has experienced significant tension, retaining quality tenants has become a concrete economic advantage, not merely a matter of goodwill.",
            "Predictable communication, with clear response timelines, single contact channels, and tracked requests, reduces disputes and repeat filings with the Tribunal administratif du logement (TAL) for problems that could have been resolved upstream. Every formal complaint costs management time and creates relational friction that is difficult to undo once established.",
            "Tenant experience is not only a retention factor. It is a market signal. Well-managed buildings attract stronger tenant profiles, command more competitive rents, and generate lower damage at unit turnover, a compounding effect worth thousands of dollars over the life of a single lease, and significantly more across a portfolio.",
          ],
        },
        {
          heading: "What do long-term tenants vs. Airbnb guests expect in Montreal?",
          paragraphs: [
            [
              "For ",
              { text: "long-term rental management", to: "/services/location" },
              ": Montreal tenants expect a clear move-in condition report, structured maintenance request tracking with follow-up, and an explanation of condo bylaws if the building operates as a syndicate. Transparency about rules and response timelines is the foundation of a lasting tenancy relationship.",
            ],
            [
              "For ",
              { text: "Airbnb management in Montreal", to: "/services/airbnb" },
              ": guests evaluate cleanliness, the clarity of check-in instructions, and responsiveness when something goes wrong. Ambiguity about occupancy limits or building rules generates negative reviews and disputes that rarely resolve in the owner's favour. A well-defined operating framework protects both the property and the host's reputation.",
            ],
            "These expectations differ in format but converge on the essentials: responsiveness, consistency, and transparency. Whether the stay is two nights or two years, occupants want confidence that a competent, fair manager will handle problems promptly. That trust is built at first contact and maintained through reliable processes; it cannot be recovered once broken.",
          ],
        },
        {
          heading: "How do you measure experience without vanity metrics?",
          paragraphs: [
            "Simple, concrete indicators: average first-response time, lease renewal rate, recurring complaints per unit, internal notes after each intervention. These operational metrics reflect reality better than online reviews, which can be skewed or unrepresentative of a full portfolio's actual performance.",
            "Gestion Velora ties these measures to transparent service standards reported to property owners: the goal is tenancy stability and return optimization, not a flattering online rating. Quarterly reports include a review of these indicators, making it possible to identify units or buildings that warrant attention before issues become critical.",
            "Ultimately, tenant experience is a measurable investment: reducing turnover, improving response times, and formalizing move-in and move-out processes can translate directly into meaningful net savings over one to two years. It is one of the most underutilized levers in professional Montreal property management.",
          ],
        },
      ],
    },
  },
  {
    slug: "gestion-copropriete-montreal-reglementation",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85",
    datePublished: "2025-10-08",
    dateModified: "2026-04-01",
    fr: {
      category: "Actualités",
      date: "Octobre 2025",
      title: "Gestion de copropriété à Montréal : ce qu'il faut savoir sur la réglementation",
      excerpt:
        "La Loi sur la copropriété et les règlements municipaux encadrent la gestion des syndicats.",
      brief:
        "Gérer un syndicat à Montréal, c'est conjuguer la Loi sur la copropriété des immeubles, les règlements municipaux et les règlements intérieurs de l'immeuble. Nous rappelons les obligations d'assemblée et de fonds, l'intérêt d'une documentation rigoureuse, et le rôle du gestionnaire pour éviter les écarts de conformité coûteux.",
      sections: [
        {
          heading: "Quelles lois encadrent le syndicat au Québec ?",
          paragraphs: [
            "La Loi sur la copropriété des immeubles (RLRQ c. C-6.1) fixe les règles fondamentales pour les assemblées, le rôle du syndicat, la gestion du fonds de prévoyance et la conservation des archives. Cette loi a connu des modifications importantes ces dernières années pour renforcer les obligations des administrateurs et la transparence envers les copropriétaires, des changements qui ont accru la complexité de la gestion pour les petits syndicats sans ressources internes.",
            "La Ville de Montréal peut imposer des exigences supplémentaires selon les travaux envisagés : permis de construction ou de rénovation, conformité aux normes de sécurité incendie, ou conditions d'accès aux façades et aux terrains adjacents. Ces exigences municipales s'ajoutent aux obligations provinciales et au règlement de copropriété lui-même, créant un cadre réglementaire à trois niveaux que le gestionnaire doit maîtriser.",
            "La méconnaissance de l'une de ces couches réglementaires peut entraîner des retards coûteux : travaux arrêtés faute de permis, assemblées invalides pour cause de convocations non conformes, ou décisions de conseil fragilisées par des majorités mal calculées. Un gestionnaire expérimenté anticipe ces risques grâce à un calendrier de conformité rigoureux.",
          ],
        },
        {
          heading: "Pourquoi les procès-verbaux et avis d'assemblée sont-ils stratégiques ?",
          paragraphs: [
            "Les délais de convocation légaux et les majorités requises pour chaque type de décision conditionnent la validité des votes : une erreur sur le quorum ou le délai d'envoi peut invalider une résolution importante, retarder des travaux urgents ou forcer la tenue d'une nouvelle assemblée avec tous les coûts associés. Ces erreurs sont plus fréquentes qu'on ne le croit dans les syndicats autogérés.",
            [
              "Une documentation systématique (ordres du jour, procès-verbaux, preuves d'envoi) protège également le syndicat en cas de contestation par un copropriétaire insatisfait. Pour structurer professionnellement la ",
              { text: "gestion de syndicat de copropriété à Montréal", to: "/services/syndicat-copropriete" },
              ", consulter un gestionnaire qualifié est une étape déterminante.",
            ],
            "Les procès-verbaux bien rédigés ne se contentent pas de consigner les décisions : ils documentent les alternatives envisagées, les expertises consultées et les raisons des choix effectués. Ce niveau de documentation devient précieux lors de la revente d'une unité ou en cas de sinistre où la diligence raisonnable du syndicat doit être démontrée.",
          ],
        },
        {
          heading: "Comment un gestionnaire réduit-il les risques réglementaires au quotidien ?",
          paragraphs: [
            "Un gestionnaire professionnel structure les cycles de conformité annuels : renouvellement des assurances, inspections périodiques obligatoires, mise à jour des registres légaux, vérification des contrats de maintenance. Ces tâches, dispersées sur l'année, deviennent invisibles quand elles sont bien gérées, et catastrophiques quand elles sont oubliées.",
            "La coordination avec les professionnels (ingénieurs pour les études de réserve, avocats pour les litiges ou modifications de déclaration, entrepreneurs qualifiés pour les travaux majeurs) est une dimension clé. Le gestionnaire ne remplace pas ces spécialistes, mais assure la cohérence entre leurs interventions et les décisions du conseil.",
            "Gestion Velora structure ces cycles pour que le conseil d'administration décide sur des dossiers complets et validés, pas sur des versions partielles ou urgentes. Cette approche transforme la gestion réglementaire d'une source de stress en un processus prévisible, permettant aux administrateurs bénévoles de se concentrer sur la gouvernance stratégique.",
          ],
        },
      ],
    },
    en: {
      category: "News",
      date: "October 2025",
      title: "Condo management in Montreal: what you need to know about regulation",
      excerpt:
        "Quebec's Condo Act and municipal bylaws govern condo board management.",
      brief:
        "Montreal condo boards must align Quebec's Condo Act, municipal bylaws, and the building's internal regulations. We recap meeting and reserve-fund obligations, why minutes matter, and how managers reduce costly compliance gaps.",
      sections: [
        {
          heading: "What laws govern Quebec condo boards?",
          paragraphs: [
            "Quebec's Act respecting divided co-ownership (RLRQ c. C-6.1) sets the fundamental rules for meetings, syndicate responsibilities, reserve fund management, and record-keeping. The law has seen significant amendments in recent years, strengthening administrator obligations and owner transparency requirements, changes that have increased governance complexity for small self-managed boards.",
            "The City of Montreal may impose additional requirements depending on planned work: building permits, fire safety compliance, or access conditions for facade work or adjacent properties. These municipal requirements layer on top of both provincial law and the building's internal bylaw, creating a three-tier regulatory framework that managers must actively monitor.",
            "Gaps in any of these regulatory layers can cause costly delays: work stopped for lack of permits, invalid meetings due to non-compliant notices, or board decisions challenged due to miscalculated majorities. An experienced manager pre-empts these risks with a rigorous compliance calendar and continuous regulatory monitoring.",
          ],
        },
        {
          heading: "Why are minutes and meeting notices strategic?",
          paragraphs: [
            "Legal notice timelines and required voting thresholds for each decision type determine whether resolutions hold up: an error in quorum calculation or notice delivery timing can invalidate a key vote, delay urgent work, or require calling an entirely new meeting, at full cost. These errors are more common than expected in self-managed boards.",
            [
              "Systematic meeting documentation (agendas, minutes, delivery proof) also protects the syndicate if a unit owner contests a decision. For boards considering professional ",
              { text: "condo management in Montreal", to: "/services/syndicat-copropriete" },
              ", structured documentation support is one of the most immediate risk-reduction benefits.",
            ],
            "Well-prepared minutes don't just record decisions; they document alternatives considered, expertise consulted, and the rationale behind choices made. This level of documentation becomes valuable during unit sales and in the event of incidents where the board's reasonable diligence must be demonstrated.",
          ],
        },
        {
          heading: "How does a manager reduce day-to-day regulatory risk?",
          paragraphs: [
            "A professional manager structures annual compliance cycles: insurance renewals, mandatory periodic inspections, legal register updates, maintenance contract reviews. These tasks, scattered throughout the year, become invisible when properly managed, and critical when overlooked.",
            "Coordination with professionals (engineers for reserve studies, lawyers for disputes or declaration amendments, qualified contractors for major work) is another key risk-reduction dimension. The manager doesn't replace these specialists, but ensures coherence between their interventions and board decisions.",
            "Gestion Velora structures these cycles so the board decides on complete, validated files, not on partial or time-pressured information. This approach transforms regulatory compliance from a source of board stress into a predictable process, allowing volunteer administrators to focus on strategic governance.",
          ],
        },
      ],
    },
  },
  {
    slug: "airbnb-montreal-permis-reglementation",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85",
    datePublished: "2025-09-12",
    dateModified: "2026-04-01",
    fr: {
      category: "Technologie",
      date: "Septembre 2025",
      title: "Airbnb à Montréal : permis, réglementation et bonnes pratiques",
      excerpt:
        "Tout savoir sur la légalité et les exigences pour louer en courte durée à Montréal.",
      brief:
        "La location courte durée à Montréal est encadrée par des règles municipales et fiscales qui évoluent. Nous rappelons l'importance du classement de l'hébergement, des taxes et assurances, et des bonnes pratiques d'exploitation pour rester aligné avec la Ville et limiter les risques lors de contrôles ou de plaintes de voisinage.",
      sections: [
        {
          heading: "Quelles exigences municipales faut-il anticiper ?",
          paragraphs: [
            "Montréal encadre les hébergements touristiques dans le cadre de son règlement sur l'urbanisme et le zonage : le type d'hébergement, la catégorie de classement applicable et les conditions de cohabitation avec les copropriétaires ou locataires dans le même immeuble font l'objet de règles qui évoluent. Avant de mettre une propriété en location, il est indispensable de vérifier la catégorie applicable sur le site officiel de la Ville de Montréal et, le cas échéant, d'obtenir le classement requis auprès de Tourisme Québec.",
            "Le non-respect peut mener à des constats d'infraction, des amendes et des ordres de cesser l'exploitation, des conséquences qui peuvent survenir suite à une plainte de voisin, un contrôle municipal ou une vérification des plateformes. Un gestionnaire sérieux tient à jour les preuves d'exploitation conformes (publicités en règle, calendriers, registre des voyageurs) pour que le propriétaire puisse démontrer sa conformité en tout temps.",
            "La réglementation de la location courte durée à Montréal évolue régulièrement : de nouvelles restrictions de zonage, des mises à jour des exigences de classement ou des modifications fiscales peuvent entrer en vigueur sans préavis médiatique important. Une veille réglementaire active, idéalement déléguée à un gestionnaire spécialisé, est la seule façon d'éviter les mauvaises surprises.",
          ],
        },
        {
          heading: "Quelles obligations fiscales et d'assurance sont souvent oubliées ?",
          paragraphs: [
            "Les obligations de taxes de vente applicables (TPS, TVQ dans certains cas selon le seuil de revenus et le statut de l'exploitant) et la déclaration correcte des revenus locatifs doivent être intégrées dès le départ dans le modèle d'affaires. Ces aspects varient selon le statut de l'exploitant. Consulter un comptable ou fiscaliste spécialisé en immobilier est fortement recommandé avant de débuter l'activité.",
            [
              "L'assurance habitation résidentielle standard ne couvre généralement pas les activités d'hébergement touristique : des avenants spécifiques ou une police dédiée sont nécessaires. Pour une ",
              { text: "gestion Airbnb à Montréal", to: "/services/airbnb" },
              " conforme et sécurisée, un accompagnement professionnel permet de naviguer ces exigences d'assurance avec les bons interlocuteurs.",
            ],
            "Les plateformes comme Airbnb offrent des protections d'hôtes, mais ces protections ont des limites et des exclusions importantes qui ne remplacent pas une couverture adéquate. La documentation des séjours (photos de l'état du logement, confirmations de réservation, échanges avec les voyageurs) est indispensable pour faire valoir toute réclamation.",
          ],
        },
        {
          heading: "Comment réduire les risques de voisinage et d'usure prématurée ?",
          paragraphs: [
            "Des règles d'occupation claires (nombre d'occupants maximal, interdiction de fêtes, heures calmes), une politique de ménage qualitatif systématique et un service de dépannage réactif 24/7 réduisent significativement les plaintes des voisins et les avis négatifs. Dans un immeuble en copropriété, ces règles doivent être compatibles avec le règlement de l'immeuble.",
            "L'usure prématurée des équipements (électroménagers, serrures, mobilier) est inévitable en location courte durée intensive, mais elle peut être significativement ralentie par des protocoles d'accueil rigoureux, des inventaires à chaque rotation et une maintenance préventive régulière. Un gestionnaire professionnel structure ces processus pour que les coûts d'exploitation restent prévisibles.",
            "Gestion Velora documente l'ensemble des opérations (photos d'état, rapports d'entretien, communications avec les voyageurs) de façon à ce que le propriétaire puisse démontrer sa diligence raisonnable en cas de litige avec un voyageur, une assurance ou la Ville. Cette traçabilité est souvent le facteur décisif dans la résolution favorable d'un dossier contentieux.",
          ],
        },
      ],
    },
    en: {
      category: "Technology",
      date: "September 2025",
      title: "Airbnb in Montreal: permits, regulation and best practices",
      excerpt:
        "Everything you need to know about legality and requirements for short-term rental in Montreal.",
      brief:
        "Short-term rentals in Montreal sit under municipal and tax rules that change. We cover why classification matters, taxes and insurance, and operating practices that align with city requirements and reduce risk during inspections or neighbor complaints.",
      sections: [
        {
          heading: "What municipal requirements should hosts plan for?",
          paragraphs: [
            "Montreal regulates tourist accommodations through its urban planning and zoning bylaws: accommodation type, applicable classification category, and coexistence rules with other condo owners or tenants in the same building are governed by rules that continue to evolve. Before listing a property on Airbnb or any platform, confirm the applicable category on the City of Montreal's official website and, where required, obtain the classification from Tourisme Québec.",
            "Non-compliance can lead to violation notices, fines, and orders to cease operations, consequences that may arise from a neighbour complaint, a municipal inspection, or a platform audit. A professional manager maintains current compliance documentation (compliant listings, reservation records, guest registers) so owners can demonstrate conformity at any moment.",
            "Short-term rental regulations in Montreal evolve regularly: new zoning restrictions, updated classification requirements, or tax changes can come into effect without major media coverage. Active regulatory monitoring, ideally delegated to a specialized manager, is the only reliable way to avoid operational or legal surprises.",
          ],
        },
        {
          heading: "Which tax and insurance obligations are often missed?",
          paragraphs: [
            "Applicable sales tax obligations (GST, QST in some cases depending on revenue threshold and operator status) and proper rental income tax reporting must be integrated into the short-term rental business model from the start. These requirements vary by operator status and applicable tax rules. Consulting an accountant or real estate tax specialist is strongly recommended.",
            [
              "Standard residential insurance typically does not cover tourist accommodation activities: specific endorsements or a dedicated policy are needed to cover guest-caused damage, civil liability, and loss of income. For ",
              { text: "Airbnb management in Montreal", to: "/services/airbnb" },
              " that is both compliant and well-protected, professional management helps navigate these insurance requirements with the right specialists.",
            ],
            "Platforms like Airbnb offer host protections, but these have significant limits and exclusions that don't replace adequate insurance coverage. Documenting stays (property condition photos, booking confirmations, guest communications) is essential for supporting any claim when an incident occurs.",
          ],
        },
        {
          heading: "How do you reduce neighbor risk and excessive wear?",
          paragraphs: [
            "Clear occupancy rules (maximum guests, no-party policy, quiet hours), systematic quality cleaning between every stay, and a responsive 24/7 troubleshooting service significantly reduce neighbor complaints and negative reviews. In a condo building, these rules must align with the building's internal bylaw.",
            "Premature equipment wear (appliances, locks, furniture) is unavoidable in intensive short-term rental, but it can be meaningfully slowed with rigorous welcome protocols, per-turnover inventories, and regular preventive maintenance. A professional manager structures these processes so operating costs remain predictable despite frequent occupant changes.",
            "Gestion Velora documents all operations (condition photos, maintenance reports, guest communications) so owners can demonstrate reasonable diligence if disputes arise with guests, insurers, or the City. This traceability is often the decisive factor in resolving a contentious file favorably.",
          ],
        },
      ],
    },
  },
  {
    slug: "choisir-gestionnaire-immobilier-montreal",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=85",
    datePublished: "2025-08-20",
    dateModified: "2026-04-01",
    fr: {
      category: "Stratégie",
      date: "Août 2025",
      title: "Comment choisir son gestionnaire immobilier à Montréal",
      excerpt:
        "Les critères à considérer pour sélectionner un gestionnaire fiable et compétent.",
      brief:
        "Le bon gestionnaire combine transparence financière, processus documentés et disponibilité en situation d'urgence. Nous listons des critères vérifiables (références, rapports types, gouvernance), des signaux d'alarme, et des questions à poser avant de signer, pour syndicats, locations et courte durée.",
      sections: [
        {
          heading: "Quels critères objectifs vérifier avant de signer ?",
          paragraphs: [
            "Avant de confier la gestion de votre immeuble ou syndicat, demandez des exemples concrets de rapports financiers et de bons de travail : ces documents révèlent immédiatement le niveau de rigueur et de clarté du gestionnaire. Un rapport illisible, incomplet ou produit irrégulièrement est un signal préoccupant, même si le discours commercial est convaincant. La forme des livrables reflète directement la qualité des processus internes.",
            "Renseignez-vous sur la politique de réponse aux urgences (délai cible, processus d'escalade), la liste des fournisseurs qualifiés utilisés et l'expérience documentée avec votre type d'actif spécifique (copropriété, multiplex locatif, location Airbnb). Un gestionnaire spécialisé en syndicats n'a pas nécessairement les réflexes pour gérer efficacement un portefeuille Airbnb en rotation intensive, et vice versa.",
            "Demandez systématiquement deux références récentes dans des immeubles comparables au vôtre. Les questions à poser : les délais de réponse aux urgences, la communication pendant les travaux majeurs, et la façon dont les désaccords ont été gérés. Ces conversations directes valent plus qu'un portfolio bien présenté.",
          ],
        },
        {
          heading: "Quels signaux d'alarme doivent vous faire hésiter ?",
          paragraphs: [
            [
              "L'absence de traçabilité des dépenses (pas de reçus, pas de portail propriétaire, rapport financier annuel seulement) doit déclencher une réflexion sérieuse. Pour la ",
              { text: "gestion locative professionnelle à Montréal", to: "/services/location" },
              " ou la gestion d'un syndicat, la transparence financière n'est pas un bonus. C'est une condition non négociable de toute relation de gestion saine.",
            ],
            "Des mandats rédigés de façon floue (sans définition précise des services inclus, sans KPIs, sans processus d'escalade documenté) laissent la porte ouverte à des malentendus coûteux. Un mandat professionnel doit préciser les délais de réponse, la structure des honoraires, les livrables réguliers attendus et les conditions de résiliation.",
            "Une rémunération anormalement basse par rapport au marché peut masquer des frais supplémentaires non déclarés (commissions sur fournisseurs, surcharges sur travaux) ou indiquer une sous-capacité opérationnelle. Le coût total de gestion, transparent et documenté, doit être le critère de comparaison, pas seulement les honoraires de base.",
          ],
        },
        {
          heading: "Quelles questions poser sur la conformité et les litiges ?",
          paragraphs: [
            "Demandez comment le gestionnaire gère les procédures TAL (dossiers de non-paiement, contestations de loyer), la tenue des registres obligatoires et la coordination avec avocats ou ingénieurs pour les dossiers complexes. Un gestionnaire qui ne peut pas expliquer son processus de gestion des litiges est soit très inexpérimenté, soit peu transparent sur la réalité de ses mandats.",
            "La conformité réglementaire inclut aussi la gestion des assurances, le respect des normes de sécurité incendie et la mise à jour des permis pour les activités de location courte durée. Vérifiez si le gestionnaire dispose d'un calendrier de conformité formalisé, ou s'il gère ces aspects de façon réactive au fil des exigences.",
            "Gestion Velora structure ses mandats autour de rapports écrits réguliers, d'indicateurs de performance partagés et de revues trimestrielles avec le propriétaire ou le conseil d'administration. Cette transparence opérationnelle est la condition d'une relation de gestion durable, et d'une confiance réelle, au-delà des promesses commerciales initiales.",
          ],
        },
      ],
    },
    en: {
      category: "Strategy",
      date: "August 2025",
      title: "How to choose a property manager in Montreal",
      excerpt:
        "Criteria to consider when selecting a reliable and competent manager.",
      brief:
        "A strong manager combines financial transparency, documented processes, and real availability in emergencies. We list verifiable criteria (references, sample reports, governance), red flags, and questions to ask before signing, for condos, rentals, and short-term.",
      sections: [
        {
          heading: "What objective criteria should you verify before signing?",
          paragraphs: [
            "Before entrusting property or syndicate management, ask for concrete examples of financial reports and work orders: these documents immediately reveal the manager's level of rigour and communication quality. An unreadable, incomplete, or irregularly produced report is a concerning signal even when the sales pitch is compelling. The quality of deliverables directly reflects the quality of internal processes.",
            "Ask about emergency response policy (target timelines, escalation process), the list of qualified vendors used, and documented experience with your specific asset type (condo board, rental multiplex, Airbnb). A manager specialized in condo boards may not have the reflexes or network to efficiently manage an intensive Airbnb rotation portfolio. Specialization matters.",
            "Always request two recent references in buildings comparable to yours, not general marketing testimonials. Questions to ask references: emergency response times, communication quality during major work, and how disagreements over decisions were handled. These direct conversations are worth far more than a well-presented portfolio.",
          ],
        },
        {
          heading: "What red flags should make you pause?",
          paragraphs: [
            [
              "No spend traceability (no receipts, no owner portal, annual financial report only) should trigger serious reconsideration. For professional ",
              { text: "rental management in Montreal", to: "/services/location" },
              " or condo board management, financial transparency is not a bonus. It is a non-negotiable condition of any healthy management relationship.",
            ],
            "Vaguely written mandates, without precise service definitions, KPIs, documented escalation processes, or clear termination conditions, leave the door open to costly misunderstandings. A professional contract must specify response timelines, fee structure, expected deliverables, and the conditions under which the agreement can be ended.",
            "Abnormally low fees relative to the market may hide undisclosed charges (vendor commissions, work markups) or signal operational under-capacity that will result in lower service quality in practice. Total transparent management cost, fully documented, should be the comparison metric, not only the base fee headline.",
          ],
        },
        {
          heading: "What should you ask about compliance and disputes?",
          paragraphs: [
            "Ask how the manager handles TAL processes (non-payment files, lease termination requests, rent contestations), mandatory register maintenance, and coordination with lawyers or engineers for complex files. A manager who cannot explain their dispute management process is either very inexperienced or not transparent about the reality of their mandates.",
            "Regulatory compliance also covers insurance management, fire safety standard compliance, and permit maintenance for short-term rental activities. Verify whether the manager maintains a formalized compliance calendar, or handles these requirements reactively, as they arise.",
            "Gestion Velora structures its mandates around regular written reports, shared performance indicators, and quarterly reviews with property owners or the board. This operational transparency is the condition for a durable management relationship, and for genuine trust, beyond the initial commercial promises.",
          ],
        },
      ],
    },
  },
  {
    slug: "fonds-prevoyance-copropriete-quebec",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=85",
    datePublished: "2025-07-18",
    dateModified: "2026-04-01",
    fr: {
      category: "Finance",
      date: "Juillet 2025",
      title: "Fonds de prévoyance en copropriété à Montréal : obligations et bonnes pratiques au Québec",
      excerpt:
        "La constitution et la gestion du fonds de prévoyance sont cruciales pour la pérennité de la copropriété.",
      brief:
        "Le fonds de prévoyance finance les travaux majeurs non couverts par le budget courant. Nous expliquons le lien avec l'étude de réserve, les décisions d'assemblée qui encadrent les prélèvements, et pourquoi une communication continue évite les appels de fonds surprise qui fragilisent la valeur des unités.",
      sections: [
        {
          heading: "À quoi sert exactement le fonds de prévoyance ?",
          paragraphs: [
            "Le fonds de prévoyance finance les travaux de remplacement et de réparation majeurs des parties communes (toiture, façade, mécanique, ascenseurs, systèmes électriques) selon une planification pluriannuelle définie dans l'étude de réserve. Il se distingue du budget opérationnel courant qui couvre l'entretien régulier : sans fonds de prévoyance bien capitalisé, ces remplacements coûteux tombent sur les copropriétaires sous forme d'appels de fonds spéciaux imprévus, souvent à des moments inopportuns.",
            "La Loi sur la copropriété impose des règles précises de constitution et de gestion du fonds : le syndicat doit agir avec prudence, intégrité et diligence envers les copropriétaires, ce qui inclut une alimentation régulière proportionnelle aux risques identifiés. Un fonds structurellement sous-alimenté, même s'il affiche un solde positif à court terme, représente un passif masqué qui fragilise la valeur des unités lors des transactions immobilières.",
            "À Montréal, les immeubles de copropriété de différentes époques présentent des profils de risque très différents : un immeuble des années 1970 avec une toiture et une plomberie d'origine n'a pas les mêmes besoins de capitalisation qu'une construction neuve. L'étude de réserve, actualisée périodiquement, est le seul outil qui permet de calibrer correctement les cotisations annuelles selon l'état réel des composantes.",
          ],
        },
        {
          heading: "Pourquoi l'étude de réserve est-elle le document de référence ?",
          paragraphs: [
            "L'étude de réserve traduit l'état des composantes majeures de l'immeuble en coûts de remplacement estimés et en délais probables. C'est la base sur laquelle le syndicat ajuste les cotisations annuelles et priorise les travaux à venir. Sans ce document à jour, les décisions de l'assemblée sur les cotisations et les travaux reposent sur des estimations informelles qui peuvent s'avérer gravement erronées.",
            [
              "Sans mise à jour régulière (souvent recommandée aux trois à cinq ans), le fonds peut être structurellement sous-alimenté malgré des comptes qui semblent en ordre à court terme. Pour les syndicats montréalais cherchant un appui dans la ",
              { text: "gestion de copropriété professionnelle", to: "/services/syndicat-copropriete" },
              ", l'accompagnement sur les études de réserve et la planification pluriannuelle est l'un des aspects les plus précieux.",
            ],
            "L'étude de réserve informe également les acheteurs potentiels d'unités : un immeuble avec une étude récente et un fonds bien capitalisé est beaucoup plus facile à vendre et maintient une valeur marchande plus stable. À l'inverse, un fonds sous-alimenté signalé lors d'une transaction peut déclencher des négociations à la baisse ou faire avorter une vente.",
          ],
        },
        {
          heading: "Comment communiquer pour éviter les chocs financiers ?",
          paragraphs: [
            "Présenter des scénarios chiffrés (travaux avancés, retards, inflation des contrats) lors des assemblées annuelles permet aux copropriétaires de comprendre les fourchettes de cotisation envisagées et d'anticiper leur impact budgétaire personnel. Cette transparence proactive réduit les chocs lors des assemblées extraordinaires où des appels de fonds urgents doivent être votés.",
            "Une communication continue sur l'avancement des travaux planifiés, et les raisons pour lesquelles certains ont été reportés, maintient la confiance des copropriétaires dans la gouvernance du syndicat. Les tensions les plus fréquentes naissent non pas des dépenses elles-mêmes, mais du sentiment d'avoir été tenus à l'écart de décisions importantes ou d'avoir été surpris par des coûts qu'ils auraient pu anticiper.",
            "Gestion Velora appuie les conseils avec des échéanciers clairs de dépenses pluriannuelles, une traçabilité complète des décisions et une communication structurée à l'attention des copropriétaires. L'objectif est de transformer la gestion du fonds de prévoyance d'une source d'anxiété collective en un processus de planification transparent, où chaque cotisation supplémentaire se justifie par des faits.",
          ],
        },
      ],
    },
    en: {
      category: "Finance",
      date: "July 2025",
      title: "Condo reserve fund in Montreal, Quebec: obligations and best practices",
      excerpt:
        "Establishing and managing the reserve fund is crucial for condo sustainability.",
      brief:
        "The reserve fund finances major work not covered by the annual budget. We explain the tie to reserve studies, assembly decisions on contributions, and why steady communication avoids surprise special assessments that hurt unit values.",
      sections: [
        {
          heading: "What is the reserve fund for?",
          paragraphs: [
            "The reserve fund finances major common-area replacement and repair work (roofing, building envelope, mechanicals, elevators, electrical systems) on a multi-year plan defined by the reserve study. It is distinct from the operational budget, which covers routine upkeep: without an adequately funded reserve, costly replacements fall on unit owners as unplanned special assessments, often at the worst possible time.",
            "Quebec's Condo Act imposes specific rules on reserve fund constitution and management: the syndicate must act with prudence, integrity, and diligence toward owners, which includes funding the reserve in proportion to identified risks. A structurally underfunded reserve, even if it shows a positive short-term balance, represents a hidden liability that weakens unit values in real estate transactions.",
            "In Montreal, condo buildings from different eras present very different risk profiles: a 1970s building with original roofing and plumbing has fundamentally different capitalization needs than new construction. An up-to-date reserve study, reviewed periodically, is the only tool that allows annual contributions to be calibrated to the building's actual component condition.",
          ],
        },
        {
          heading: "Why is the reserve study the reference document?",
          paragraphs: [
            "The reserve study translates major building component condition into estimated replacement costs and probable timelines, the foundation for adjusting annual contributions and prioritizing upcoming work. Without a current document, AGM decisions on contributions and capital work rest on informal estimates that may prove seriously inaccurate.",
            [
              "Without regular updates (typically recommended every three to five years), the fund can be structurally underfunded despite short-term accounts that appear in order. For Montreal boards seeking support in ",
              { text: "professional condo management", to: "/services/syndicat-copropriete" },
              ", guidance on reserve studies and multi-year financial planning is one of the most valuable areas of professional support.",
            ],
            "The reserve study also informs prospective unit buyers: a building with a recent study and a well-funded reserve is far easier to sell and maintains a more stable market value. Conversely, an underfunded reserve disclosed during a transaction can trigger downward price negotiation or cause deals to fall through entirely.",
          ],
        },
        {
          heading: "How should boards communicate to avoid financial shocks?",
          paragraphs: [
            "Presenting cost scenarios at annual meetings (accelerated work, delays, contractor inflation) allows unit owners to understand projected contribution ranges and anticipate their personal budget impact. This proactive transparency reduces shocks when extraordinary meetings must be called to vote on urgent special assessments.",
            "Ongoing communication about planned work progress, and the reasons certain items have been deferred, maintains owner confidence in syndicate governance. The most common tensions arise not from the expenditures themselves, but from owners feeling excluded from important decisions or blindsided by costs they could have anticipated.",
            "Gestion Velora supports boards with clear multi-year expenditure schedules, complete decision traceability, and structured owner communication. The goal is to transform reserve fund management from a source of collective anxiety into a transparent planning process, where every additional contribution is justified by facts, not surprises.",
          ],
        },
      ],
    },
  },
];

export type BlogPostView = {
  slug: string;
  image: string;
  datePublished: string;
  dateModified: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  brief: string;
  sections: BlogSection[];
};

export function getPostBySlug(slug: string, locale: "fr" | "en" = "fr"): BlogPostView | undefined {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return undefined;
  const loc = post[locale];
  return {
    slug: post.slug,
    image: post.image,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    category: loc.category,
    date: loc.date,
    title: loc.title,
    excerpt: loc.excerpt,
    brief: loc.brief,
    sections: loc.sections,
  };
}

export type BlogPostCard = {
  slug: string;
  image: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
};

export function getRelatedPosts(slug: string, locale: "fr" | "en", limit = 3): BlogPostCard[] {
  return blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, limit)
    .map((p) => {
      const loc = p[locale];
      return {
        slug: p.slug,
        image: p.image,
        title: loc.title,
        category: loc.category,
        date: loc.date,
        excerpt: loc.excerpt,
      };
    });
}
