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
  /** Shorter page <title> tag (≤ 57 chars so " | Gestion Velora" fits within 75). Falls back to title. */
  metaTitle?: string;
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
      metaTitle: "Gestion immobilière intelligente à Montréal 2026",
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
      metaTitle: "Intelligent property management in Montreal 2026",
      excerpt:
        "Trends transforming property management in Montreal: technology, data, and tenant experience.",
      brief:
        "Smart property management in Montreal in 2026 means automating repetitive tasks (rent reminders, maintenance follow-ups, reports) while keeping human judgment for emergencies and disputes. Three trends drive this shift: data-driven operations, digital board governance for condo boards, and automated short-term rental workflows — each covered here with practical takeaways for Montreal owners.",
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
      metaTitle: "Maintenance préventive à Montréal : économies et rendement",
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
        "Preventive maintenance in Montreal reduces emergency repair costs by 20–40% by catching wear before failure occurs. This article explains which building systems to inspect first, how a maintenance calendar connects directly to the reserve fund for condo boards, and why documented upkeep history is both a financial strategy and a legal protection under Quebec law.",
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
      metaTitle: "Maximiser le NOI à Montréal : données et performance",
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
        "Net Operating Income (NOI) for Montreal rental buildings is improved by tracking five monthly indicators: vacancy rate, time-to-lease, recurring maintenance costs, arrears, and utilities. A 2–3 point vacancy swing can move NOI more than a rent increase. This article explains what each metric reveals, how condo boards apply the same logic, and why data governance prevents the disputes that quietly erode returns.",
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
      metaTitle: "Expérience locataire à Montréal : avantage concurrentiel",
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
      metaTitle: "Tenant experience in Montreal: competitive advantage",
      excerpt:
        "In a competitive market, tenant experience quality makes the difference.",
      brief:
        "High tenant turnover in Montreal costs landlords 3–6% of annual gross income in vacancy, unit repairs, and re-leasing spend. This article details what long-term tenants and Airbnb guests each expect, which three metrics predict turnover before it happens, and how fast, consistent response times retain quality occupants and compound into meaningful savings over a lease cycle.",
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
      metaTitle: "Réglementation copropriété Montréal : guide pratique",
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
      metaTitle: "Condo regulation Montreal: essential compliance guide",
      excerpt:
        "Quebec's Condo Act and municipal bylaws govern condo board management.",
      brief:
        "Montreal condo boards operate under three regulatory layers: Quebec's Condo Act (C-6.1), City of Montreal bylaws, and the building's internal bylaw. The most common compliance gaps involve AGM notice timing, quorum calculation errors, and underfunded reserves. This article recaps each obligation and explains how a professional manager prevents the costly mistakes self-managed boards make most often.",
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
      metaTitle: "Airbnb Montréal : permis et réglementation 2026",
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
        "Renting on Airbnb in Montreal legally requires a Tourisme Québec classification certificate, compliance with municipal zoning bylaws, dedicated insurance (standard residential policies exclude tourist accommodation), and proper income tax reporting. This article explains each requirement, which rules change most often, and the operating practices that prevent neighbor complaints and city inspection issues.",
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
        "To choose the right property manager in Montreal, verify three things before signing: sample financial reports (the clearest indicator of actual rigor), their documented emergency response policy, and two recent references in comparable buildings. This article lists objective selection criteria, red flags that signal hidden costs, and specific questions to ask about TAL compliance and dispute handling.",
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
      metaTitle: "Fonds de prévoyance copropriété Montréal : obligations",
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
      metaTitle: "Condo reserve fund Montreal: obligations guide",
      excerpt:
        "Establishing and managing the reserve fund is crucial for condo sustainability.",
      brief:
        "Quebec condo boards must maintain a reserve fund for major common-area replacements (roofing, elevators, façade, mechanicals), sized by a reserve study updated every three to five years. An underfunded reserve is a hidden liability that weakens unit sale prices. This article explains how reserve studies set contribution targets and how proactive AGM communication prevents the surprise special assessments that erode owner trust.",
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
  {
    slug: "syndicat-copropriete-fonctionnement",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=85",
    datePublished: "2026-03-10",
    dateModified: "2026-04-20",
    fr: {
      category: "Copropriété",
      date: "Mars 2026",
      title: "Comment fonctionne un syndicat de copropriété ?",
      metaTitle: "Syndicat de copropriété : fonctionnement",
      excerpt: "Le syndicat de copropriété est l'entité légale qui administre les parties communes d'un immeuble. Voici comment il fonctionne concrètement.",
      brief: "Le syndicat de copropriété est l'entité légale constituée automatiquement dès qu'une déclaration de copropriété est publiée. Il représente tous les copropriétaires, administre les parties communes, lève les charges et doit faire respecter les règlements de l'immeuble. Sa gouvernance repose sur un conseil d'administration élu en assemblée générale.",
      sections: [
        {
          heading: "Qu'est-ce qu'un syndicat de copropriété au Québec ?",
          paragraphs: [
            "Le syndicat de copropriété est une personne morale créée automatiquement lors de la publication de la déclaration de copropriété. Il représente collectivement l'ensemble des copropriétaires et a pour mission d'administrer les parties communes, d'assurer la conservation de l'immeuble et de faire respecter le règlement. Contrairement à ce que certains croient, le syndicat n'est pas une option : il est obligatoire dès qu'un immeuble est divisé en parties privatives.",
            [
              "La gestion quotidienne est confiée à un ",
              { text: "gestionnaire de copropriété", to: "/services/syndicat-copropriete" },
              " ou assurée en autogestion par les membres du conseil d'administration. Le CA est élu par les copropriétaires en assemblée générale. Il détient les pouvoirs d'administration courante et doit rendre compte de ses décisions lors de l'AGA annuelle obligatoire.",
            ],
            "Le syndicat perçoit les charges communes (condo fees) auprès de chaque copropriétaire selon leurs quotes-parts inscrites dans la déclaration. Ces sommes servent à couvrir les dépenses d'exploitation (entretien, assurance, services communs) et à alimenter le fonds de prévoyance pour les travaux majeurs futurs.",
          ],
        },
        {
          heading: "Quelles sont les responsabilités légales du syndicat ?",
          paragraphs: [
            "Depuis la réforme du Code civil par la Loi 16 (2020) et l'entrée en vigueur de la Loi 141 sur les fonds de prévoyance (2022), les obligations du syndicat se sont considérablement renforcées. Le syndicat doit désormais mandater une étude de fonds de prévoyance tous les cinq ans, tenir un carnet d'entretien actualisé et divulguer son état financier à tout copropriétaire qui en fait la demande.",
            "Le syndicat est également responsable de souscrire une assurance sur les parties communes et d'assurer la conformité de l'immeuble aux normes du bâtiment. En cas de sinistre ou de défaut d'entretien entraînant un préjudice à un copropriétaire ou à un tiers, le syndicat peut être tenu responsable. Une gestion rigoureuse est donc essentielle pour protéger le patrimoine collectif.",
            "Sur le plan judiciaire, le syndicat peut ester en justice pour défendre les intérêts communs : recouvrer des charges impayées, poursuivre un constructeur pour vices cachés ou réclamer des dommages. Il peut aussi être poursuivi. C'est pourquoi beaucoup de syndicats préfèrent déléguer l'administration à un professionnel agréé plutôt que de gérer ces responsabilités à titre bénévole.",
          ],
        },
        {
          heading: "Syndicat autogéré ou géré par un professionnel : quelle différence ?",
          paragraphs: [
            [
              "L'autogestion convient aux petits immeubles (moins de 6 unités) où les copropriétaires ont le temps et les compétences nécessaires. Dès que l'immeuble prend de l'ampleur ou que la complexité administrative augmente (Loi 141, gestion des conflits, travaux majeurs), faire appel à une ",
              { text: "équipe de gestion de condo", to: "/services/gestion-condo" },
              " devient plus avantageux que de tout gérer bénévolement.",
            ],
            "Un gestionnaire professionnel prend en charge la comptabilité, les appels de fonds, la coordination des entrepreneurs, la correspondance avec les copropriétaires, la préparation des assemblées et le suivi réglementaire. Il apporte une expertise en droit de la copropriété québécoise qui réduit le risque d'erreurs coûteuses.",
            "Gestion Velora accompagne les syndicats de copropriété à Montréal avec un mandat sur mesure : de l'administration complète à la co-gestion selon vos besoins. Nos rapports mensuels et notre portail copropriétaires assurent une transparence totale, sans effort supplémentaire pour votre conseil d'administration.",
          ],
        },
      ],
    },
    en: {
      category: "Condo",
      date: "March 2026",
      title: "How does a condo board (syndicat) work in Quebec?",
      metaTitle: "Condo board Quebec: how it works",
      excerpt: "A condo board (syndicat de copropriété) is the legal entity that manages the common areas of a building. Here is how it works in practice.",
      brief: "A condo board (syndicat de copropriété) is a legal entity automatically created when a declaration of co-ownership is registered. It represents all unit owners, manages common areas, collects condo fees, and enforces building rules. Its governance rests on a board of directors elected at the annual general meeting.",
      sections: [
        {
          heading: "What is a condo board (syndicat) in Quebec?",
          paragraphs: [
            "A syndicat de copropriété is a legal person automatically created when a declaration of co-ownership is published. It represents all unit owners collectively and is responsible for administering common areas, preserving the building, and enforcing the by-laws. The syndicat is not optional: it is mandatory whenever a building is divided into private and common portions.",
            [
              "Day-to-day administration is either handled by a ",
              { text: "professional condo manager", to: "/services/syndicat-copropriete" },
              " or self-managed by a volunteer board. The board of directors is elected by unit owners at the annual general meeting (AGM). It holds ordinary management powers and must report to owners at the mandatory yearly AGM.",
            ],
            "The syndicat collects condo fees from each owner according to their fractional share (quote-part) registered in the declaration. These funds cover operating expenses (maintenance, insurance, shared services) and the reserve fund for future major work.",
          ],
        },
        {
          heading: "What are the legal obligations of a condo board?",
          paragraphs: [
            "Since the Civil Code reforms under Law 16 (2020) and the reserve fund rules of Law 141 (2022), condo board obligations have significantly increased. Boards must now commission a reserve fund study every five years, maintain an up-to-date maintenance log (carnet d'entretien), and disclose financial statements to any owner upon request.",
            "The condo board must also carry insurance on common areas and ensure the building meets construction standards. If damage occurs due to poor maintenance, the board may face legal liability. Rigorous management is therefore essential to protect the collective asset.",
            "Condo boards can sue and be sued. They can pursue construction defect claims, recover unpaid condo fees, and claim damages. This legal exposure is a major reason many buildings hire a professional property manager rather than relying solely on volunteer directors.",
          ],
        },
        {
          heading: "Self-managed vs. professionally managed: what's the difference?",
          paragraphs: [
            [
              "Self-management works for small buildings (under 6 units) where owners have the time and skills. As complexity grows — Law 141 compliance, conflict resolution, major repairs — hiring a ",
              { text: "professional condo management team", to: "/services/gestion-condo" },
              " becomes more cost-effective than managing everything on a volunteer basis.",
            ],
            "A professional manager handles accounting, fee collection, contractor coordination, owner communications, AGM preparation, and regulatory compliance. Their expertise in Quebec condo law reduces the risk of costly errors.",
            "Gestion Velora supports condo boards in Montreal with tailored mandates — from full administration to co-management. Monthly reports and an owner portal deliver complete transparency with no extra burden on your board.",
          ],
        },
      ],
    },
  },
  {
    slug: "cout-gestionnaire-copropriete-montreal",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=85",
    datePublished: "2026-03-18",
    dateModified: "2026-04-20",
    fr: {
      category: "Tarifs",
      date: "Mars 2026",
      title: "Combien coûte un gestionnaire de copropriété à Montréal ?",
      metaTitle: "Gestionnaire copropriété : coût à Montréal",
      excerpt: "Le coût d'un gestionnaire de copropriété à Montréal varie selon la taille de l'immeuble et les services requis. Voici ce que vous devez savoir.",
      brief: "À Montréal, les frais de gestion d'un syndicat de copropriété se situent généralement entre 35 $ et 65 $ par unité par mois selon la taille de l'immeuble, la complexité du mandat et les services inclus. Des forfaits modulaires permettent d'ajuster les services aux besoins réels du syndicat.",
      sections: [
        {
          heading: "Quels sont les tarifs habituels pour un gestionnaire de copropriété ?",
          paragraphs: [
            [
              "Les honoraires d'un ",
              { text: "gestionnaire de copropriété", to: "/services/gestion-copropriete" },
              " à Montréal sont généralement calculés au prorata du nombre d'unités. Pour un petit immeuble (6 à 12 unités), les frais de gestion se situent typiquement entre 35 $ et 45 $ par unité par mois. Pour les immeubles de taille moyenne (13 à 40 unités), la fourchette se situe entre 45 $ et 60 $ par unité. Les grands complexes (plus de 40 unités) bénéficient souvent d'économies d'échelle et négocient des tarifs à partir de 30 $ à 40 $ par unité.",
            ],
            "Ces honoraires couvrent l'administration courante : comptabilité, perception des charges, coordination des travaux, correspondance, préparation des assemblées et suivi réglementaire. Certaines firmes facturent des extras pour la gestion des urgences hors heures, la préparation de l'étude de fonds de prévoyance ou le suivi judiciaire. Il est important de comparer les devis en détail pour éviter les mauvaises surprises.",
            "Des services additionnels comme la gestion des conflits entre copropriétaires, le suivi des assurances ou l'assistance à la planification des travaux majeurs peuvent être inclus dans un forfait premium ou facturés séparément. Demandez toujours un contrat détaillant l'ensemble des postes inclus et les seuils de facturation supplémentaire.",
          ],
        },
        {
          heading: "Gestion professionnelle ou autogestion : une question de retour sur investissement",
          paragraphs: [
            "Il est tentant de comparer le coût d'un gestionnaire à zéro pour l'autogestion. Mais l'autogestion a un coût réel : temps bénévole des administrateurs, risques d'erreurs comptables, manque de rigueur dans le suivi des travaux et exposure légale si les obligations de la Loi 141 ne sont pas respectées. Pour un immeuble de 20 unités, un gestionnaire professionnel à 50 $/unité représente 1 000 $/mois — soit environ 12 000 $/an. Un seul appel de fonds évité grâce à un fonds de prévoyance bien géré peut couvrir plusieurs années de frais.",
            "La valeur d'une gestion rigoureuse se reflète aussi dans la valeur des unités. Les acheteurs et prêteurs hypothécaires examinent de près l'état financier du syndicat, la santé du fonds de prévoyance et la qualité des processus administratifs. Un immeuble bien géré se revend mieux et se finance plus facilement.",
            [
              "Pour les syndicats qui souhaitent conserver un certain contrôle, des formules de co-gestion permettent de déléguer les tâches les plus chronophages (comptabilité, appels de fonds, suivi des travaux) tout en conservant la prise de décision au sein du CA. Consultez nos ",
              { text: "tarifs de gestion immobilière", to: "/tarifs" },
              " pour une vue complète des formules disponibles.",
            ],
          ],
        },
        {
          heading: "Comment évaluer et comparer les offres de gestion ?",
          paragraphs: [
            "Avant de signer un contrat de gestion, demandez une proposition détaillée précisant : les services inclus dans les honoraires de base, les services facturés en supplément, la durée et les conditions de résiliation du contrat, les délais de réponse garantis (urgences vs demandes courantes) et les outils de reporting mis à disposition.",
            "Vérifiez les références du gestionnaire auprès d'autres syndicats qu'il administre. La certification de l'OACIQ ou de l'RGCQ (Regroupement des gestionnaires et copropriétaires du Québec) est un indicateur de sérieux et d'adhésion aux meilleures pratiques. Une firme qui gère plus de syndicats offre souvent un meilleur accès à des fournisseurs fiables et à des taux négociés pour les travaux courants.",
            "Gestion Velora publie ses tarifs de base de façon transparente et propose des soumissions gratuites sans engagement. Chaque mandat est adapté à la réalité de votre immeuble, sans frais cachés ni extras non annoncés.",
          ],
        },
      ],
    },
    en: {
      category: "Pricing",
      date: "March 2026",
      title: "How much does a condo property manager cost in Montreal?",
      metaTitle: "Condo manager cost Montreal",
      excerpt: "The cost of a condo property manager in Montreal depends on building size and services required. Here is what you need to know before signing.",
      brief: "In Montreal, condo board management fees typically range from $35 to $65 per unit per month depending on building size, mandate complexity, and included services. Modular packages let you match services to your actual needs.",
      sections: [
        {
          heading: "What are typical condo management fees in Montreal?",
          paragraphs: [
            [
              "Fees for a ",
              { text: "professional condo property manager", to: "/services/gestion-copropriete" },
              " in Montreal are generally calculated per unit. For small buildings (6–12 units), expect $35–$45 per unit per month. Mid-size buildings (13–40 units) typically fall between $45–$60 per unit. Larger complexes (40+ units) often benefit from economies of scale with rates starting around $30–$40 per unit.",
            ],
            "These fees usually cover routine administration: accounting, fee collection, contractor coordination, owner communications, AGM preparation, and regulatory compliance. Some firms charge extras for after-hours emergencies, reserve fund study coordination, or legal follow-up. Always compare proposals in detail to avoid surprises.",
            "Additional services such as conflict resolution, insurance coordination, or major work planning may be included in a premium package or billed separately. Always ask for a contract that clearly details what is included in the base fee and what triggers additional billing.",
          ],
        },
        {
          heading: "Professional management vs. self-management: an ROI question",
          paragraphs: [
            "It is tempting to compare the cost of a manager against zero for self-management. But self-management has real costs: volunteer director time, accounting errors, inconsistent maintenance follow-up, and legal exposure if Law 141 obligations are not met. For a 20-unit building, a professional manager at $50/unit costs $1,000/month — about $12,000/year. One avoided special assessment from a well-managed reserve fund can offset several years of management fees.",
            "Rigorous management also affects unit values. Buyers and mortgage lenders closely examine the condo board's financial health, reserve fund adequacy, and quality of administrative processes. A well-run building sells faster and at a better price.",
            [
              "For boards that want to retain some control, co-management arrangements let you delegate the most time-consuming tasks (accounting, fee collection, contractor follow-up) while keeping final decisions within your board. See our ",
              { text: "property management pricing", to: "/tarifs" },
              " for a full overview of available packages.",
            ],
          ],
        },
        {
          heading: "How to evaluate and compare management proposals",
          paragraphs: [
            "Before signing a management contract, ask for a detailed proposal covering: services included in the base fee, services billed as extras, contract duration and termination terms, guaranteed response times (emergencies vs. routine), and reporting tools available to the board.",
            "Check references with other condo boards the manager currently serves. RGCQ (Regroupement des gestionnaires et copropriétaires du Québec) membership is a sign of commitment to best practices. Firms managing multiple buildings often have better access to reliable contractors and negotiated rates for routine work.",
            "Gestion Velora publishes base fees transparently and offers free no-commitment quotes. Every mandate is tailored to your building's reality, with no hidden fees or unexpected extras.",
          ],
        },
      ],
    },
  },
  {
    slug: "gestion-condo-autogestion-ou-gestionnaire",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85",
    datePublished: "2026-03-25",
    dateModified: "2026-04-20",
    fr: {
      category: "Copropriété",
      date: "Mars 2026",
      title: "Gestion de condo : autogestion ou gestionnaire professionnel ?",
      metaTitle: "Gestion condo : auto ou professionnel ?",
      excerpt: "Faut-il autogérer votre condo ou faire appel à un gestionnaire professionnel ? Ce guide compare les deux options pour vous aider à décider.",
      brief: "L'autogestion convient aux petits immeubles dont les administrateurs ont le temps et les compétences nécessaires. Dès que la complexité augmente — Loi 141, travaux majeurs, conflits de copropriété — un gestionnaire professionnel offre un meilleur rapport risque/coût et protège la valeur de l'immeuble sur le long terme.",
      sections: [
        {
          heading: "Quand l'autogestion est-elle viable pour un condo ?",
          paragraphs: [
            [
              "L'autogestion de la ",
              { text: "gestion de condo", to: "/services/gestion-condo" },
              " est envisageable dans un immeuble de petite taille (moins de 8 unités) où les copropriétaires se connaissent bien, où les finances sont simples et où les parties communes nécessitent peu d'entretien. Elle requiert qu'au moins un administrateur dispose de compétences en comptabilité, en droit de la copropriété et en gestion de projet pour superviser les travaux.",
            ],
            "L'autogestion présente des avantages réels : économies sur les honoraires de gestion, contrôle direct sur les décisions et connaissance fine de l'immeuble par ses occupants. Toutefois, elle expose le syndicat à des risques importants si les administrateurs manquent de temps ou d'expertise : retards dans les appels de fonds, non-conformité réglementaire, conflits non résolus.",
            "La Loi 141 a considérablement complexifié les obligations des syndicats depuis 2022 : étude de fonds de prévoyance obligatoire tous les cinq ans, carnet d'entretien structuré, nouvelles règles d'assurance. Ces exigences demandent un suivi rigoureux que peu de syndicats autogérés peuvent assurer sans l'aide d'un professionnel.",
          ],
        },
        {
          heading: "Quels problèmes surviennent souvent dans les syndicats autogérés ?",
          paragraphs: [
            "Les syndicats autogérés font régulièrement face à trois types de problèmes. Premièrement, la comptabilité approximative : mauvaise allocation des charges entre parties communes et privatives, omissions dans les cotisations au fonds de prévoyance, états financiers incomplets. Ces erreurs peuvent entraîner des appels de fonds imprévus et diminuer la valeur de revente des unités.",
            "Deuxièmement, la gestion des conflits : sans processus formalisé, les désaccords entre copropriétaires (nuisances, travaux non autorisés, stationnement) s'enveniment. Un gestionnaire professionnel intervient comme tiers neutre et applique le règlement de l'immeuble de façon cohérente, réduisant les tensions et les recours judiciaires coûteux.",
            "Troisièmement, la réactivité aux urgences : les dégâts d'eau, pannes d'ascenseur ou problèmes de chauffage n'attendent pas les disponibilités des administrateurs bénévoles. Un gestionnaire professionnel dispose d'un réseau de fournisseurs qualifiés et d'une ligne d'urgence 24/7 pour intervenir rapidement et limiter les dommages.",
          ],
        },
        {
          heading: "Comment choisir entre autogestion et gestion professionnelle ?",
          paragraphs: [
            [
              "Faites cet audit rapide. Si votre immeuble compte plus de 10 unités, a plus de 15 ans d'âge, fait face à des travaux majeurs dans les 5 prochaines années ou a connu des difficultés à percevoir les charges communes, la ",
              { text: "gestion professionnelle de copropriété", to: "/services/gestion-copropriete" },
              " sera probablement plus rentable que l'autogestion une fois les risques pris en compte.",
            ],
            "Pour les syndicats qui souhaitent conserver un certain contrôle, la co-gestion est une solution intermédiaire : le gestionnaire prend en charge les tâches administratives (comptabilité, appels de fonds, gestion des fournisseurs) tandis que le CA conserve la prise de décision stratégique. Cette formule réduit la charge des administrateurs bénévoles sans les priver de leur rôle de gouvernance.",
            "Gestion Velora propose une évaluation gratuite de votre situation pour vous recommander la formule la mieux adaptée à votre syndicat. Nos mandats sont flexibles et évolutifs : vous pouvez commencer par un mandat partiel et élargir selon vos besoins.",
          ],
        },
      ],
    },
    en: {
      category: "Condo",
      date: "March 2026",
      title: "Condo self-management vs. professional manager: which is right?",
      metaTitle: "Condo self-management vs pro manager",
      excerpt: "Should you self-manage your condo board or hire a professional manager? This guide compares both options to help you decide.",
      brief: "Self-management works for small buildings where directors have enough time and expertise. As complexity grows — Law 141 compliance, major repairs, owner disputes — a professional condo manager offers a better risk/cost ratio and protects long-term building value.",
      sections: [
        {
          heading: "When is condo self-management a viable option?",
          paragraphs: [
            [
              "Self-managing a ",
              { text: "condo building", to: "/services/gestion-condo" },
              " is feasible in small buildings (fewer than 8 units) where owners know each other well, finances are straightforward, and common areas require minimal maintenance. It requires at least one director with skills in accounting, Quebec condo law, and project management to oversee maintenance work.",
            ],
            "Self-management has real advantages: savings on management fees, direct control over decisions, and intimate knowledge of the building. However, it exposes the board to significant risks if directors lack time or expertise: delays in fee collection, regulatory non-compliance, unresolved disputes.",
            "Law 141 has substantially increased condo board obligations since 2022: mandatory reserve fund studies every five years, structured maintenance logs, and new insurance rules. These requirements demand rigorous follow-up that few self-managed boards can sustain without professional help.",
          ],
        },
        {
          heading: "What problems commonly arise in self-managed condo boards?",
          paragraphs: [
            "Self-managed boards regularly face three types of problems. First, imprecise accounting: misallocated charges between common and private portions, gaps in reserve fund contributions, incomplete financial statements. These errors can trigger surprise special assessments and reduce unit resale values.",
            "Second, conflict management: without a formalized process, disputes between owners (noise, unauthorized work, parking) escalate. A professional manager intervenes as a neutral third party, applies by-laws consistently, and reduces costly legal proceedings.",
            "Third, emergency response: water damage, elevator failures, or heating problems don't wait for volunteer directors' availability. A professional manager has a network of qualified contractors and a 24/7 emergency line to respond quickly and limit damage.",
          ],
        },
        {
          heading: "How to choose between self-management and professional management?",
          paragraphs: [
            [
              "Run this quick audit: if your building has more than 10 units, is over 15 years old, faces major work in the next 5 years, or has had trouble collecting condo fees, ",
              { text: "professional condo management", to: "/services/gestion-copropriete" },
              " will likely be more cost-effective than self-management once risks are factored in.",
            ],
            "For boards that want to retain some control, co-management is a middle ground: the manager handles administrative tasks (accounting, fee collection, contractor management) while the board retains strategic decision-making. This reduces the burden on volunteer directors without removing their governance role.",
            "Gestion Velora offers a free assessment to recommend the best option for your building. Our mandates are flexible and scalable — you can start with a partial mandate and expand as needed.",
          ],
        },
      ],
    },
  },
  {
    slug: "loi-141-obligations-syndicat-copropriete",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=85",
    datePublished: "2026-04-02",
    dateModified: "2026-04-20",
    fr: {
      category: "Réglementation",
      date: "Avril 2026",
      title: "Loi 141 : obligations des syndicats de copropriété au Québec",
      metaTitle: "Loi 141 syndicat copropriété Québec",
      excerpt: "La Loi 141 impose de nouvelles obligations aux syndicats de copropriété québécois. Voici ce que votre CA doit savoir et faire pour être conforme.",
      brief: "La Loi 141 (2018, en vigueur 2022) oblige les syndicats de copropriété québécois à constituer un fonds de prévoyance suffisant basé sur une étude actuarielle, à tenir un carnet d'entretien et à s'assurer que les assurances couvrent adéquatement la valeur à neuf de l'immeuble. Ces obligations s'appliquent à toutes les copropriétés divises, quelle que soit leur taille.",
      sections: [
        {
          heading: "Quelles sont les principales obligations introduites par la Loi 141 ?",
          paragraphs: [
            [
              "Adoptée en 2018, la Loi 141 (Loi visant principalement à améliorer l'encadrement du secteur financier) a profondément réformé les règles applicables aux ",
              { text: "syndicats de copropriété", to: "/services/syndicat-copropriete" },
              " québécois. Ses dispositions relatives aux fonds de prévoyance et à l'entretien des immeubles sont entrées en vigueur progressivement entre 2020 et 2022. Trois obligations majeures en découlent.",
            ],
            "Première obligation : l'étude de fonds de prévoyance. Le syndicat doit mandater un professionnel qualifié (ingénieur, technicien en bâtiment ou expert en évaluation) pour réaliser une étude déterminant le montant des contributions annuelles nécessaires pour financer les travaux majeurs prévus sur 25 ans. Cette étude doit être renouvelée tous les 5 ans. Elle remplace l'ancienne règle du minimum de 5 % des charges communes, qui était souvent insuffisante.",
            "Deuxième obligation : le carnet d'entretien. Le syndicat doit tenir à jour un registre documentant l'état de chaque composante majeure de l'immeuble (toiture, plomberie, systèmes mécaniques, façade), les travaux effectués et les travaux planifiés. Ce document est consultable par tout copropriétaire et doit être remis à l'acheteur lors d'une transaction immobilière.",
          ],
        },
        {
          heading: "Les assurances : ce que la Loi 141 exige des syndicats",
          paragraphs: [
            "La Loi 141 a également renforcé les obligations d'assurance des syndicats. Le syndicat doit maintenant s'assurer à la valeur de remplacement à neuf (full replacement cost) de l'immeuble, incluant les parties communes et les améliorations apportées aux parties privatives. Un évaluateur agréé doit estimer cette valeur au moins une fois tous les trois ans.",
            "Les copropriétaires individuels doivent, quant à eux, obtenir une assurance habitation (partie privative) qui couvre leur franchise et les améliorations locatives. La Loi 141 a introduit la notion de franchise collective : en cas de sinistre impliquant une partie privative, la franchise de l'assurance collective peut être réclamée auprès du copropriétaire responsable.",
            "Ces nouvelles règles d'assurance ont complexifié la gestion des sinistres dans les copropriétés. Un gestionnaire professionnel maîtrise ces mécanismes et peut coordonner efficacement les réclamations entre l'assureur du syndicat et ceux des copropriétaires, évitant les litiges coûteux.",
          ],
        },
        {
          heading: "Comment se conformer à la Loi 141 sans se noyer dans la bureaucratie ?",
          paragraphs: [
            "La première étape est de réaliser une étude de fonds de prévoyance si ce n'est pas encore fait. Plusieurs firmes spécialisées offrent ce service à Montréal. Le coût varie entre 2 000 $ et 8 000 $ selon la taille de l'immeuble, mais c'est un investissement qui protège le syndicat de toute contestation légale sur l'insuffisance de ses réserves.",
            [
              "La deuxième étape est de mettre en place le carnet d'entretien. Un ",
              { text: "gestionnaire de copropriété professionnel", to: "/services/gestion-copropriete" },
              " peut vous aider à structurer ce document et à le tenir à jour. Il sert aussi d'outil de planification pour les travaux à venir, permettant au syndicat d'anticiper les dépenses plutôt que de les subir.",
            ],
            "Gestion Velora intègre le suivi de la conformité Loi 141 dans tous ses mandats de gestion de syndicat. Nos clients reçoivent des alertes proactives lorsque des renouvellements d'études ou des mises à jour de carnet sont requis, évitant ainsi toute non-conformité.",
          ],
        },
      ],
    },
    en: {
      category: "Regulation",
      date: "April 2026",
      title: "Law 141: condo board obligations in Quebec explained",
      metaTitle: "Law 141 condo board Quebec",
      excerpt: "Law 141 introduced major new obligations for Quebec condo boards. Here is what your board needs to know and do to stay compliant.",
      brief: "Law 141 (2018, in force 2022) requires Quebec condo boards to build an adequate reserve fund based on an actuarial study, maintain a building maintenance log, and insure the building at full replacement cost. These obligations apply to all divided co-ownerships regardless of size.",
      sections: [
        {
          heading: "What are the main obligations introduced by Law 141?",
          paragraphs: [
            [
              "Adopted in 2018, Law 141 profoundly reformed rules applicable to Quebec ",
              { text: "condo boards (syndicats)", to: "/services/syndicat-copropriete" },
              ". Its provisions on reserve funds and building maintenance came into force progressively between 2020 and 2022. Three major obligations result from it.",
            ],
            "First obligation: the reserve fund study. The board must hire a qualified professional (engineer, building technician, or evaluator) to conduct a study determining the annual contributions needed to fund planned major work over 25 years. This study must be renewed every 5 years. It replaces the old rule of a minimum 5% of condo fees, which was often insufficient.",
            "Second obligation: the maintenance log (carnet d'entretien). The board must keep an updated register documenting the condition of each major building component (roof, plumbing, mechanical systems, façade), work completed, and planned work. Any owner may consult it, and it must be provided to buyers during a real estate transaction.",
          ],
        },
        {
          heading: "Insurance: what Law 141 requires from condo boards",
          paragraphs: [
            "Law 141 also strengthened insurance obligations. The board must insure the building at full replacement cost, including common areas and improvements made to private portions. A certified appraiser must estimate this value at least once every three years.",
            "Individual unit owners must carry condo insurance covering their deductible and leasehold improvements. Law 141 introduced the collective deductible concept: in a claim involving a private portion, the collective insurance deductible can be recovered from the responsible owner.",
            "These new insurance rules have made claims management more complex. A professional manager understands these mechanisms and can efficiently coordinate claims between the board's insurer and individual owners' insurers, avoiding costly disputes.",
          ],
        },
        {
          heading: "How to comply with Law 141 without drowning in bureaucracy?",
          paragraphs: [
            "The first step is commissioning a reserve fund study if you haven't already. Several specialized firms offer this service in Montreal. Costs range from $2,000 to $8,000 depending on building size — a worthwhile investment that protects the board from legal challenges about reserve adequacy.",
            [
              "The second step is implementing the maintenance log. A ",
              { text: "professional condo property manager", to: "/services/gestion-copropriete" },
              " can help structure and maintain this document. It also serves as a planning tool for upcoming work, letting the board anticipate expenses rather than react to them.",
            ],
            "Gestion Velora integrates Law 141 compliance monitoring into all condo board management mandates. Clients receive proactive alerts when study renewals or log updates are required, preventing any non-compliance.",
          ],
        },
      ],
    },
  },
  {
    slug: "augmenter-valeur-condo-montreal",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
    datePublished: "2026-04-05",
    dateModified: "2026-04-20",
    fr: {
      category: "Conseils",
      date: "Avril 2026",
      title: "6 façons d'augmenter la valeur de votre condo à Montréal",
      metaTitle: "Augmenter valeur condo Montréal",
      excerpt: "Vous souhaitez augmenter la valeur de votre condo à Montréal ? Ces six stratégies éprouvées vous aideront à maximiser votre retour lors de la revente.",
      brief: "Pour augmenter la valeur d'un condo à Montréal, concentrez-vous sur les rénovations à fort retour sur investissement (cuisine, salle de bain, rangements), la saine gestion du syndicat (fonds de prévoyance, carnet d'entretien) et la présentation de l'unité lors de la mise en marché. La qualité de gestion de l'immeuble influence directement la valeur de chaque unité.",
      sections: [
        {
          heading: "Les rénovations qui rapportent le plus lors de la revente",
          paragraphs: [
            "La cuisine et la salle de bain restent les pièces qui génèrent le meilleur retour sur investissement lors d'une rénovation résidentielle. À Montréal, une rénovation de cuisine moderne (comptoirs de quartz, armoires intégrées, éclairage DEL) peut générer un retour de 70 à 85 % du coût en valeur ajoutée à la revente. La salle de bain suit avec 60 à 75 % de retour. Ces estimations varient selon le quartier et le positionnement du condo dans le marché.",
            "L'optimisation du rangement est souvent sous-estimée. Dans les petits condos montréalais où l'espace est limité, des solutions intelligentes (garde-robes organisés, îlot de cuisine multifonction, mezzanine) peuvent augmenter l'attrait perçu de façon significative. Les acheteurs paient une prime pour le rangement dans les marchés denses comme le Plateau ou Rosemont.",
            "Attention aux rénovations qui ne se récupèrent pas : les finitions trop personnalisées (couleurs vives, matériaux de niche) ou les équipements technologiques propriétaires (domotique complexe) peuvent réduire le bassin d'acheteurs potentiels plutôt que d'en élargir l'attrait. Visez le neutre, l'intemporel et le fonctionnel.",
          ],
        },
        {
          heading: "Comment la gestion du syndicat affecte la valeur de votre condo",
          paragraphs: [
            [
              "La valeur d'un condo ne dépend pas uniquement de l'unité elle-même : la santé financière du ",
              { text: "syndicat de copropriété", to: "/services/syndicat-copropriete" },
              " influence directement la valeur de chaque unité. Un fonds de prévoyance bien alimenté, un carnet d'entretien à jour et des états financiers sains rassurent les acheteurs et les prêteurs hypothécaires. À l'inverse, un syndicat mal géré avec des dettes ou des travaux urgents non financés peut déprécier une unité même rénovée.",
            ],
            "Les notaires et courtiers immobiliers recommandent systématiquement de vérifier l'état du syndicat avant toute offre d'achat. Un appel de fonds extraordinaire imminent, des litiges non résolus ou un fonds de prévoyance sous-capitalisé sont des signaux d'alarme. En tant que copropriétaire, vous pouvez contribuer à la valeur de votre actif en participant activement à la gouvernance de votre syndicat ou en plaidant pour une gestion professionnelle.",
            [
              "Investir dans la ",
              { text: "gestion professionnelle de condo", to: "/services/gestion-condo" },
              " améliore l'expérience de tous les copropriétaires et la réputation de l'immeuble sur le marché. Les acheteurs potentiels posent souvent la question : « qui gère l'immeuble ? » Un gestionnaire reconnu rassure et facilite la vente.",
            ],
          ],
        },
        {
          heading: "Présentation et mise en marché : l'impact de la première impression",
          paragraphs: [
            "La mise en scène (home staging) a démontré son efficacité pour raccourcir les délais de vente et maximiser le prix de vente. À Montréal, des études de courtiers immobiliers locaux indiquent qu'un condo bien présenté se vend 5 à 15 % plus cher qu'un condo comparable non mis en scène. Les coûts d'un service de home staging professionnel (500 à 2 500 $) sont généralement récupérés largement à la vente.",
            "La qualité des photos de mise en marché est aussi déterminante. Plus de 90 % des acheteurs commencent leur recherche en ligne. Des photos professionnelles mettant en valeur la luminosité, les espaces et les finis de qualité génèrent plus de visites et plus d'offres concurrentes. Investissez dans un photographe immobilier professionnel avant de mettre votre condo sur le marché.",
            "Enfin, la propreté et la dépersonnalisation sont essentielles. Rangez les objets personnels, optez pour une palette neutre et assurez-vous que chaque pièce soit impeccable lors des visites. Ces préparatifs ne coûtent souvent rien mais peuvent faire la différence entre une vente rapide au prix demandé et des mois de négociations.",
          ],
        },
      ],
    },
    en: {
      category: "Tips",
      date: "April 2026",
      title: "6 ways to increase your condo value in Montreal",
      metaTitle: "Increase condo value Montreal",
      excerpt: "Want to increase your condo value in Montreal? These six proven strategies will help you maximize your return when it comes time to sell.",
      brief: "To increase condo value in Montreal, focus on high-ROI renovations (kitchen, bathroom, storage), healthy condo board management (reserve fund, maintenance log), and strong presentation when listing. Building management quality directly influences each unit's value.",
      sections: [
        {
          heading: "Renovations that deliver the best resale return",
          paragraphs: [
            "Kitchen and bathroom renovations consistently deliver the highest return on investment in residential real estate. In Montreal, a modern kitchen renovation (quartz counters, integrated cabinets, LED lighting) can generate 70–85% of its cost back in added resale value. Bathrooms follow at 60–75%. Returns vary by neighborhood and condo market positioning.",
            "Storage optimization is often underestimated. In Montreal's smaller condos where space is limited, smart solutions (organized closets, multi-function kitchen islands, mezzanines) can significantly increase perceived appeal. Buyers pay a premium for storage in dense markets like the Plateau or Rosemont.",
            "Beware of renovations that don't pay back: highly personalized finishes (bold colors, niche materials) or proprietary tech installations (complex smart home systems) can shrink your buyer pool. Aim for neutral, timeless, and functional.",
          ],
        },
        {
          heading: "How condo board management affects your unit's value",
          paragraphs: [
            [
              "A condo's value depends not only on the unit itself: the financial health of the ",
              { text: "condo board (syndicat)", to: "/services/syndicat-copropriete" },
              " directly influences each unit's value. A healthy reserve fund, up-to-date maintenance log, and sound financial statements reassure buyers and mortgage lenders. Conversely, a poorly managed board with debts or unfunded urgent repairs can devalue even a renovated unit.",
            ],
            "Notaries and real estate agents routinely recommend verifying the condo board's status before any purchase offer. An impending special assessment, unresolved litigation, or underfunded reserve fund are red flags. As an owner, you can contribute to your asset's value by actively participating in board governance or advocating for professional management.",
            [
              "Investing in ",
              { text: "professional condo management", to: "/services/gestion-condo" },
              " improves the experience for all owners and the building's reputation on the market. Prospective buyers often ask: 'who manages this building?' A recognized manager provides reassurance and makes your unit easier to sell.",
            ],
          ],
        },
        {
          heading: "Presentation and listing: the power of first impressions",
          paragraphs: [
            "Home staging has proven its effectiveness in shortening sale timelines and maximizing sale prices. In Montreal, local real estate agent studies suggest a well-presented condo sells 5–15% more than a comparable unstaged unit. Professional staging costs ($500–$2,500) are typically recovered many times over at sale.",
            "Listing photo quality is equally decisive. Over 90% of buyers start their search online. Professional photos showcasing natural light, space, and quality finishes generate more visits and competing offers. Invest in a professional real estate photographer before listing.",
            "Finally, cleanliness and depersonalization are essential. Store personal items, opt for a neutral palette, and ensure every room is spotless for showings. These preparations often cost nothing but can mean the difference between a quick sale at asking price and months of negotiations.",
          ],
        },
      ],
    },
  },
  {
    slug: "obligations-conseil-administration-copropriete",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=85",
    datePublished: "2026-04-08",
    dateModified: "2026-04-20",
    fr: {
      category: "Gouvernance",
      date: "Avril 2026",
      title: "Obligations du conseil d'administration d'une copropriété",
      metaTitle: "Obligations CA copropriété Québec",
      excerpt: "Le conseil d'administration d'une copropriété au Québec a des obligations légales précises. Voici ce que chaque administrateur doit connaître.",
      brief: "Le conseil d'administration (CA) d'un syndicat de copropriété québécois doit administrer l'immeuble avec diligence et prudence, percevoir les charges communes, maintenir le fonds de prévoyance, tenir les assemblées, et agir dans l'intérêt collectif des copropriétaires. En cas de manquement, les administrateurs peuvent être tenus personnellement responsables.",
      sections: [
        {
          heading: "Quelles sont les obligations légales du CA d'une copropriété ?",
          paragraphs: [
            [
              "Le conseil d'administration est l'organe exécutif du ",
              { text: "syndicat de copropriété", to: "/services/syndicat-copropriete" },
              ". Ses membres, élus en assemblée générale, ont l'obligation d'administrer l'immeuble avec la prudence et la diligence d'une personne raisonnable (article 1085 du Code civil du Québec). Cette norme implique de prendre des décisions éclairées, de documenter les délibérations et d'agir dans le meilleur intérêt de l'ensemble des copropriétaires.",
            ],
            "Parmi les obligations essentielles du CA : tenir l'assemblée générale annuelle dans les six mois suivant la clôture de l'exercice financier, présenter les états financiers vérifiés, adopter le budget de l'exercice suivant, renouveler l'étude de fonds de prévoyance tous les cinq ans, et mettre à jour le carnet d'entretien. Ces obligations ont été renforcées par la Loi 16 (2020) et la Loi 141 (2022).",
            "Le CA doit également s'assurer que l'immeuble est adéquatement assuré à la valeur de remplacement à neuf, que les entrepreneurs mandatés sont qualifiés et assurés, et que les décisions importantes (travaux majeurs, modifications de règlement) sont approuvées en assemblée ou par résolution du CA. La tenue à jour des registres du syndicat (procès-verbaux, contrats, correspondance) est aussi une obligation légale.",
          ],
        },
        {
          heading: "Quelles sont les responsabilités personnelles des administrateurs ?",
          paragraphs: [
            "Les membres du CA bénévoles ne sont généralement pas tenus personnellement responsables des dettes du syndicat, mais ils peuvent l'être en cas de faute grave : non-paiement de cotisations à la CNESST, non-respect des règles de sécurité entraînant un accident, ou prise de décisions frauduleuses ou contraires aux intérêts des copropriétaires. La responsabilité civile des administrateurs est une réalité que beaucoup ignorent.",
            "Pour se protéger, certains syndicats souscrivent une assurance responsabilité des administrateurs et dirigeants (D&O). Cette protection est particulièrement recommandée pour les grands immeubles où les décisions du CA ont un impact financier significatif. Elle couvre les frais de défense et les indemnités en cas de poursuite contre les administrateurs.",
            "La meilleure protection reste cependant une gouvernance rigoureuse : procès-verbaux détaillés, décisions documentées, appels d'offres pour les travaux majeurs, consultation d'un juriste pour les questions complexes. Un administrateur qui documente ses décisions et agit de bonne foi est rarement tenu responsable même en cas de résultat négatif.",
          ],
        },
        {
          heading: "Déléguer pour gouverner efficacement : quand faire appel à un gestionnaire ?",
          paragraphs: [
            [
              "Le CA peut déléguer l'administration courante à un ",
              { text: "gestionnaire professionnel de copropriété", to: "/services/gestion-copropriete" },
              " sans se dessaisir de sa gouvernance. La délégation couvre typiquement : la comptabilité et les appels de fonds, la gestion des contrats de services, la coordination des travaux, la correspondance avec les copropriétaires et le suivi réglementaire. Le CA conserve l'approbation du budget, les décisions stratégiques et la relation avec les copropriétaires.",
            ],
            "Cette délégation réduit la charge des administrateurs bénévoles, améliore la qualité des processus et réduit le risque d'erreurs. Pour les CA dont les membres changent fréquemment (rotation élevée), elle assure aussi la continuité de l'administration : le gestionnaire est la mémoire institutionnelle du syndicat.",
            "Gestion Velora travaille en partenariat avec les CA des syndicats montréalais, en assurant les opérations quotidiennes tout en préparant les administrateurs aux décisions importantes. Nos rapports mensuels donnent au CA une vision claire de la situation financière et opérationnelle de l'immeuble.",
          ],
        },
      ],
    },
    en: {
      category: "Governance",
      date: "April 2026",
      title: "Duties of a condo board of directors in Quebec",
      metaTitle: "Condo board duties Quebec",
      excerpt: "A condo board of directors in Quebec has specific legal obligations. Here is what every board member needs to know to govern responsibly.",
      brief: "A Quebec condo board must administer the building with diligence and prudence, collect condo fees, maintain the reserve fund, hold annual meetings, and act in the collective interest of all owners. Failure to do so can expose individual directors to personal liability.",
      sections: [
        {
          heading: "What are the legal duties of a condo board in Quebec?",
          paragraphs: [
            [
              "The board of directors is the executive body of the ",
              { text: "condo board (syndicat)", to: "/services/syndicat-copropriete" },
              ". Its elected members must administer the building with the prudence and diligence of a reasonable person (Quebec Civil Code article 1085). This standard means making informed decisions, documenting deliberations, and acting in the best interest of all unit owners.",
            ],
            "Key board obligations include: holding the annual general meeting within six months of fiscal year end, presenting audited financial statements, adopting the following year's budget, renewing the reserve fund study every five years, and updating the maintenance log. These obligations were strengthened by Law 16 (2020) and Law 141 (2022).",
            "The board must also ensure the building is adequately insured at full replacement cost, that contractors are qualified and insured, and that major decisions (large repairs, by-law changes) are approved at an AGM or by board resolution. Keeping the condo's records up to date (minutes, contracts, correspondence) is also a legal obligation.",
          ],
        },
        {
          heading: "Personal liability: what board members need to know",
          paragraphs: [
            "Volunteer board members are generally not personally liable for the condo board's debts, but they can be held liable for serious faults: failure to pay CNESST contributions, ignoring safety rules that lead to an accident, or taking fraudulent decisions against owners' interests. Director civil liability is a reality many ignore.",
            "To protect themselves, some boards take out directors and officers (D&O) liability insurance. This coverage is especially recommended for large buildings where board decisions have significant financial impact. It covers defense costs and indemnities if directors are sued.",
            "The best protection, however, is rigorous governance: detailed meeting minutes, documented decisions, competitive bids for major work, and consultation with a lawyer for complex issues. A director who documents decisions and acts in good faith is rarely held liable even when outcomes are negative.",
          ],
        },
        {
          heading: "Delegating for effective governance: when to hire a manager?",
          paragraphs: [
            [
              "The board can delegate routine administration to a ",
              { text: "professional condo property manager", to: "/services/gestion-copropriete" },
              " without giving up governance. Delegation typically covers: accounting and fee collection, service contract management, contractor coordination, owner communications, and regulatory compliance. The board retains budget approval, strategic decisions, and the relationship with owners.",
            ],
            "This delegation reduces the burden on volunteer directors, improves process quality, and reduces the risk of errors. For boards with frequent member turnover, it also ensures administrative continuity: the manager becomes the institutional memory of the condo board.",
            "Gestion Velora works as a partner with condo boards in Montreal, handling daily operations while preparing directors for important decisions. Monthly reports give the board a clear picture of the building's financial and operational situation.",
          ],
        },
      ],
    },
  },
  {
    slug: "assemblee-generale-copropriete-guide",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=85",
    datePublished: "2026-04-12",
    dateModified: "2026-04-20",
    fr: {
      category: "Gouvernance",
      date: "Avril 2026",
      title: "Assemblée générale de copropriété : guide complet pour les syndicats",
      metaTitle: "Assemblée générale copropriété : guide",
      excerpt: "L'assemblée générale annuelle (AGA) est une obligation légale pour tout syndicat de copropriété québécois. Ce guide vous explique comment la préparer et la mener efficacement.",
      brief: "L'assemblée générale annuelle (AGA) d'un syndicat de copropriété québécois doit se tenir dans les six mois suivant la clôture de l'exercice financier. Elle sert à approuver les états financiers, élire les administrateurs, adopter le budget et traiter les résolutions soumises par les copropriétaires. Une bonne préparation est essentielle pour qu'elle soit valide et productive.",
      sections: [
        {
          heading: "Quelles sont les règles pour tenir une assemblée générale valide ?",
          paragraphs: [
            [
              "Le Code civil du Québec et la déclaration de copropriété de l'immeuble encadrent la tenue des assemblées générales du ",
              { text: "syndicat de copropriété", to: "/services/syndicat-copropriete" },
              ". L'avis de convocation doit être envoyé à chaque copropriétaire au moins 15 jours avant la date de l'assemblée (ou selon le délai prévu dans la déclaration). Il doit indiquer la date, l'heure, le lieu et l'ordre du jour complet.",
            ],
            "Le quorum est généralement fixé à la majorité des voix des copropriétaires représentant la majorité des quotes-parts (sauf dispositions contraires dans la déclaration). Si le quorum n'est pas atteint à l'heure prévue, l'assemblée doit être ajournée et reconvoquée. Faute de quorum à la deuxième convocation, les décisions peuvent être prises par les copropriétaires présents selon certaines conditions.",
            "Les votes s'expriment selon les quotes-parts de chaque unité, sauf pour certaines décisions qui requièrent une majorité qualifiée (75 % des voix pour les modifications à la déclaration de copropriété, par exemple). Le procès-verbal doit être rédigé et signé dans les 30 jours suivant l'assemblée et conservé dans les registres du syndicat.",
          ],
        },
        {
          heading: "Comment préparer une AGA efficace étape par étape",
          paragraphs: [
            "Commencez la préparation au moins 6 à 8 semaines avant l'AGA. Rassemblez les états financiers de l'exercice clos (idéalement vérifiés par un comptable), préparez le projet de budget pour l'exercice suivant, rédigez l'ordre du jour avec les points obligatoires et les résolutions proposées. Si des travaux majeurs sont à l'ordre du jour, obtenez les soumissions à l'avance pour que les copropriétaires puissent se prononcer en toute connaissance de cause.",
            [
              "Envoyez l'avis de convocation avec tous les documents pertinents (états financiers, budget, résolutions, notes explicatives). Un ",
              { text: "gestionnaire de condo professionnel", to: "/services/gestion-condo" },
              " prépare habituellement ces documents et l'ensemble des communications avec les copropriétaires. Cette étape est souvent sous-estimée : des copropriétaires bien informés à l'avance sont plus engagés et les débats en assemblée sont plus constructifs.",
            ],
            "Pendant l'assemblée, désignez un président de séance (souvent le président du CA), un secrétaire pour rédiger le procès-verbal, et un scrutateur pour le dépouillement des votes. Pour les assemblées à distance (Zoom, Teams), vérifiez que votre déclaration de copropriété le permet et que des dispositions ont été prises pour l'identification des participants et le vote électronique.",
          ],
        },
        {
          heading: "Les erreurs fréquentes à éviter lors d'une AGA",
          paragraphs: [
            "Les erreurs les plus fréquentes : convoquer l'assemblée dans des délais insuffisants (moins de 15 jours), omettre des points obligatoires à l'ordre du jour (approbation des états financiers, élection des administrateurs), ne pas atteindre le quorum faute de mobilisation suffisante, et adopter des résolutions à l'unanimité sur des points qui ne le requièrent pas légalement (ce qui peut poser problème si un seul copropriétaire conteste ultérieurement).",
            "Une autre erreur fréquente est de ne pas documenter correctement le procès-verbal. Un procès-verbal incomplet ou non signé peut rendre des décisions contestables. Il doit mentionner la date, le lieu, les présences, le quorum atteint, chaque point de l'ordre du jour discuté, les résolutions adoptées avec les résultats des votes et les oppositions exprimées.",
            "Pour éviter ces écueils, de nombreux syndicats délèguent la préparation et l'animation de l'AGA à leur gestionnaire professionnel. Gestion Velora prépare l'ensemble des documents, coordonne la logistique et rédige le procès-verbal conforme aux exigences légales, libérant le CA de cette charge administrative.",
          ],
        },
      ],
    },
    en: {
      category: "Governance",
      date: "April 2026",
      title: "Annual condo AGM: complete guide for Quebec condo boards",
      metaTitle: "Condo AGM Quebec: complete guide",
      excerpt: "The annual general meeting (AGM) is a legal obligation for every Quebec condo board. This guide explains how to prepare and run an effective AGM.",
      brief: "A Quebec condo board's annual general meeting (AGM) must be held within six months of the fiscal year end. It approves financial statements, elects directors, adopts the budget, and addresses owner resolutions. Good preparation is essential for a valid and productive meeting.",
      sections: [
        {
          heading: "What rules govern a valid condo AGM in Quebec?",
          paragraphs: [
            [
              "The Quebec Civil Code and the building's declaration of co-ownership govern the AGM rules for each ",
              { text: "condo board (syndicat)", to: "/services/syndicat-copropriete" },
              ". The notice of meeting must be sent to every owner at least 15 days before the meeting (or as per the declaration). It must state the date, time, location, and complete agenda.",
            ],
            "Quorum is generally a majority of votes representing a majority of fractional shares (unless the declaration specifies otherwise). If quorum is not reached at the scheduled time, the meeting must be adjourned and reconvened. At the second notice, decisions can sometimes be made by those present depending on specific conditions.",
            "Votes are weighted by each unit's fractional share, except for certain decisions requiring a qualified majority (e.g., 75% of votes for changes to the declaration). Meeting minutes must be drafted and signed within 30 days and kept in the condo board's records.",
          ],
        },
        {
          heading: "How to prepare an effective AGM step by step",
          paragraphs: [
            "Start preparation 6–8 weeks before the AGM. Gather the closed fiscal year's financial statements (ideally audited by an accountant), prepare the draft budget for the next year, draft the agenda with mandatory items and proposed resolutions. If major repairs are on the agenda, get quotes in advance so owners can vote with full information.",
            [
              "Send the notice of meeting with all relevant documents (financial statements, budget, resolutions, explanatory notes). A ",
              { text: "professional condo manager", to: "/services/gestion-condo" },
              " typically prepares these documents and handles all owner communications. This step is often underestimated: well-informed owners are more engaged and AGM discussions are more constructive.",
            ],
            "During the meeting, designate a chair (usually the board president), a secretary to draft the minutes, and a scrutineer to count votes. For remote meetings (Zoom, Teams), verify your declaration allows it and that provisions have been made for participant identification and electronic voting.",
          ],
        },
        {
          heading: "Common mistakes to avoid at your condo AGM",
          paragraphs: [
            "Most frequent mistakes: giving insufficient notice (less than 15 days), omitting mandatory agenda items (financial statement approval, director elections), failing to reach quorum due to poor owner mobilization, and adopting resolutions unanimously when the law only requires a simple majority (which can create contestation issues later).",
            "Another common error is inadequate minute-taking. Incomplete or unsigned minutes can make decisions contestable. Minutes must include the date, location, attendees, quorum confirmation, each agenda item discussed, resolutions adopted with vote counts, and any objections raised.",
            "To avoid these pitfalls, many condo boards delegate AGM preparation and facilitation to their professional manager. Gestion Velora prepares all documents, coordinates logistics, and drafts legally compliant minutes — freeing the board from this administrative burden.",
          ],
        },
      ],
    },
  },
  {
    slug: "choisir-gestionnaire-condo-montreal",
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1200&q=85",
    datePublished: "2026-04-15",
    dateModified: "2026-04-20",
    fr: {
      category: "Conseils",
      date: "Avril 2026",
      title: "Comment choisir son gestionnaire de condo à Montréal",
      metaTitle: "Choisir gestionnaire condo Montréal",
      excerpt: "Choisir le bon gestionnaire de condo à Montréal est une décision importante pour votre syndicat. Voici les critères essentiels et les questions à poser.",
      brief: "Pour choisir un gestionnaire de condo à Montréal, évaluez la transparence des rapports financiers, la réactivité aux urgences, l'expertise en réglementation québécoise (Loi 141, Code civil), les références vérifiables et la qualité des outils numériques mis à disposition. Un bon gestionnaire est un partenaire à long terme, pas un prestataire de services courants.",
      sections: [
        {
          heading: "Quels critères évaluer pour choisir un gestionnaire de condo ?",
          paragraphs: [
            [
              "La sélection d'un ",
              { text: "gestionnaire de condo", to: "/services/gestion-condo" },
              " est une décision qui engage votre syndicat pour plusieurs années. Les critères les plus importants : la transparence des rapports financiers (fréquence, format, accessibilité), la réactivité pour les urgences (délai de réponse garanti, réseau d'urgence 24/7), et l'expertise réglementaire (Loi 16, Loi 141, Code civil du Québec, réglementation municipale).",
            ],
            "Demandez à voir des exemples de rapports mensuels. Un bon gestionnaire produit des rapports clairs qui permettent au CA de suivre les dépenses réelles vs budget, l'état du fonds de prévoyance, les demandes de maintenance en cours et les indicateurs de performance clés. Des rapports opaques ou excessivement complexes sont un signe de mauvaise gestion ou d'un manque de transparence.",
            "Vérifiez les affiliations professionnelles : l'RGCQ (Regroupement des gestionnaires et copropriétaires du Québec) regroupe les firmes engagées dans les meilleures pratiques de gestion de copropriété. Certains gestionnaires sont aussi membres de l'OACIQ ou détiennent des certifications en gestion immobilière. Ces affiliations ne garantissent pas la qualité mais indiquent un engagement envers les standards de l'industrie.",
          ],
        },
        {
          heading: "Les questions à poser lors d'une demande de soumission",
          paragraphs: [
            "Posez ces questions clés lors de votre évaluation : Combien d'immeubles gérez-vous actuellement ? Quel est votre ratio gestionnaire / immeubles ? Quels outils numériques offrez-vous aux copropriétaires et au CA ? Comment gérez-vous les urgences hors heures ? Quels sont les délais de réponse garantis pour les demandes courantes ? Qui est mon interlocuteur principal et quelle est sa formation ?",
            "Demandez des références de syndicats comparables au vôtre (taille, type d'immeuble, quartier) et contactez-les directement. Posez-leur : le gestionnaire respecte-t-il ses engagements de délai ? La comptabilité est-elle précise et à jour ? Le CA se sent-il bien soutenu dans ses décisions ? La communication avec les copropriétaires est-elle professionnelle ? Ces retours d'expérience valent plus que tout discours commercial.",
            "Examinez attentivement le contrat proposé : durée, conditions de résiliation, services inclus vs facturés en supplément, clause d'indexation annuelle des honoraires, mécanismes de résolution de conflits. Un contrat équilibré protège les deux parties et établit des attentes claires dès le départ.",
          ],
        },
        {
          heading: "Pourquoi Gestion Velora se distingue à Montréal",
          paragraphs: [
            [
              "Gestion Velora accompagne les syndicats de copropriété et les ",
              { text: "gestionnaires de copropriété", to: "/services/gestion-copropriete" },
              " montréalais avec une approche fondée sur la transparence, la rigueur et la disponibilité. Nos rapports mensuels sont accessibles en tout temps via le portail copropriétaires, notre ligne d'urgence est disponible 24/7, et chaque mandat est géré par un gestionnaire dédié qui connaît votre immeuble en profondeur.",
            ],
            "Notre expertise couvre l'ensemble des obligations réglementaires québécoises : conformité Loi 141, étude de fonds de prévoyance, carnet d'entretien, préparation des AGA, gestion des assurances et coordination des travaux majeurs. Nous travaillons avec un réseau de fournisseurs qualifiés et assurés, sélectionnés pour leur fiabilité et leurs tarifs compétitifs.",
            "Nous proposons une évaluation gratuite et sans engagement de votre situation pour vous recommander la formule de gestion la mieux adaptée. Contactez notre équipe pour discuter de votre mandat et recevoir une soumission transparente dans les 48 heures.",
          ],
        },
      ],
    },
    en: {
      category: "Tips",
      date: "April 2026",
      title: "How to choose a condo manager in Montreal",
      metaTitle: "Choose condo manager Montreal",
      excerpt: "Choosing the right condo manager in Montreal is a critical decision for your board. Here are the key criteria and questions to ask before signing.",
      brief: "To choose a condo manager in Montreal, evaluate financial report transparency, emergency responsiveness, expertise in Quebec regulation (Law 141, Civil Code), verifiable references, and quality of digital tools. A good manager is a long-term partner, not just a service provider.",
      sections: [
        {
          heading: "What criteria matter most when choosing a condo manager?",
          paragraphs: [
            [
              "Selecting a ",
              { text: "condo manager", to: "/services/gestion-condo" },
              " is a decision that commits your board for several years. The most important criteria: financial report transparency (frequency, format, accessibility), emergency responsiveness (guaranteed response times, 24/7 emergency network), and regulatory expertise (Law 16, Law 141, Quebec Civil Code, municipal regulations).",
            ],
            "Ask to see sample monthly reports. A good manager produces clear reports that let the board track actual vs. budgeted expenses, reserve fund status, open maintenance requests, and key performance indicators. Opaque or overly complex reports are a sign of poor management or lack of transparency.",
            "Check professional affiliations: RGCQ (Regroupement des gestionnaires et copropriétaires du Québec) groups firms committed to condo management best practices. Some managers also hold OACIQ membership or property management certifications. Affiliations don't guarantee quality but indicate a commitment to industry standards.",
          ],
        },
        {
          heading: "Questions to ask when requesting proposals",
          paragraphs: [
            "Ask these key questions during your evaluation: How many buildings do you currently manage? What is your manager-to-building ratio? What digital tools do you provide to owners and the board? How do you handle after-hours emergencies? What are guaranteed response times for routine requests? Who is my primary contact and what is their background?",
            "Request references from boards similar to yours (size, building type, neighborhood) and contact them directly. Ask: does the manager meet their commitments on time? Is the accounting accurate and current? Does the board feel well-supported in its decisions? Is owner communication professional? These firsthand accounts are worth more than any sales pitch.",
            "Carefully review the proposed contract: duration, termination terms, services included vs. billed as extras, annual fee indexation clause, dispute resolution mechanisms. A balanced contract protects both parties and sets clear expectations from the start.",
          ],
        },
        {
          heading: "Why Gestion Velora stands out in Montreal",
          paragraphs: [
            [
              "Gestion Velora supports condo boards and ",
              { text: "condo property managers", to: "/services/gestion-copropriete" },
              " in Montreal with an approach grounded in transparency, rigor, and availability. Monthly reports are accessible anytime via the owner portal, our emergency line is available 24/7, and every mandate is managed by a dedicated manager who knows your building in depth.",
            ],
            "Our expertise covers all Quebec regulatory obligations: Law 141 compliance, reserve fund studies, maintenance logs, AGM preparation, insurance management, and major work coordination. We work with a network of qualified, insured contractors selected for reliability and competitive rates.",
            "We offer a free, no-commitment assessment of your situation and recommend the best management package for your building. Contact our team to discuss your mandate and receive a transparent quote within 48 hours.",
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
  metaTitle?: string;
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
    metaTitle: loc.metaTitle,
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
