export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

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
    dateModified: "2026-02-15",
    fr: {
      category: "Actualités",
      date: "Février 2026",
      title: "L'avenir de la gestion immobilière intelligente en 2026",
      excerpt:
        "Les tendances qui transformeront la gestion immobilière à Montréal : technologie, données et expérience locataire.",
      brief:
        "À Montréal, la gestion immobilière s’aligne sur plus de données, d’automatisation et de transparence envers copropriétaires et locataires. Cet article distille trois tendances pour 2026, le rôle des outils numériques pour les syndicats et ce qu’une gestion « intelligente » doit livrer concrètement — sans sacrifier la relation humaine ni les obligations légales au Québec.",
      sections: [
        {
          heading: "Quelles tendances structurent la gestion immobilière intelligente en 2026 ?",
          paragraphs: [
            "La numérisation des processus (budgets, bons de travail, suivis) et l’analyse de données (occupation, délais de location, coûts) deviennent le socle des opérations : elles réduisent les erreurs manuelles et rendent les décisions traçables.",
            "Selon des analyses sectorielles du marché locatif canadien (SCHL, 2024), la pression sur les coûts et l’occupation pousse les gestionnaires à des indicateurs plus fréquents — pas seulement une fois par l’exercice financier.",
          ],
        },
        {
          heading: "Comment les syndicats et investisseurs tirent-ils parti des plateformes numériques ?",
          paragraphs: [
            "Les conseils d’administration peuvent centraliser les documents d’assemblée, les contrats et l’historique des travaux, ce qui répond à l’exigence de transparence envers les copropriétaires prévue par la Loi sur la copropriété des immeubles (Québec, RLRQ c. C-6.1).",
            "Pour les investisseurs, les tableaux de bord permettent de comparer immeubles et de prioriser les travaux — utile quand le fonds de prévoyance et les études de réserve structurent les décisions pluriannuelles.",
          ],
        },
        {
          heading: "Que signifie une gestion intelligente pour Airbnb et la location longue durée ?",
          paragraphs: [
            "Pour la courte durée, l’automatisation des messages, du ménage et du calendrier limite les frictions ; pour la longue durée, la sélection et le suivi locatif réduisent le roulement, souvent un des postes les plus coûteux.",
            "Gestion Velora intègre ces outils en gardant une ligne directe avec les parties prenantes : la technologie sert la clarté, pas le remplacement des arbitrages humains (urgences, médiation, relation de confiance).",
          ],
        },
      ],
    },
    en: {
      category: "News",
      date: "February 2026",
      title: "The future of intelligent property management in 2026",
      excerpt:
        "Trends transforming property management in Montreal: technology, data, and tenant experience.",
      brief:
        "Montreal property management is converging on stronger data, automation, and transparency for owners and tenants. This article summarizes three 2026 trends, how digital tools support condo boards, and what “smart” management should deliver in practice—without losing human judgment or compliance with Quebec rules.",
      sections: [
        {
          heading: "What trends are shaping intelligent property management in 2026?",
          paragraphs: [
            "Digitizing workflows (budgets, work orders, logs) and using operational data (occupancy, time-to-lease, costs) is becoming baseline: it cuts manual error and makes decisions auditable.",
            "Canadian rental-market commentary (CMHC, 2024) highlights cost and occupancy pressure—pushing managers toward more frequent KPIs, not only year-end reporting.",
          ],
        },
        {
          heading: "How do condo boards and investors benefit from platforms?",
          paragraphs: [
            "Boards can centralize meeting materials, contracts, and work history—supporting transparency expectations under Quebec’s Condo Act (C-6.1).",
            "Investors can compare assets and prioritize capex—especially when reserve studies and reserve funds drive multi-year planning.",
          ],
        },
        {
          heading: "What does “smart” mean for Airbnb and long-term rentals?",
          paragraphs: [
            "Short-term rentals gain from automated messaging, turnover, and calendars; long-term rentals benefit from screening and tenancy management that reduce costly turnover.",
            "Gestion Velora uses these tools while keeping a direct line to stakeholders—technology should increase clarity, not replace judgment on emergencies and trust.",
          ],
        },
      ],
    },
  },
  {
    slug: "maintenance-preventive-economise-millions",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=85",
    datePublished: "2026-01-14",
    dateModified: "2026-03-01",
    fr: {
      category: "Technologie",
      date: "Janvier 2026",
      title: "Pourquoi la maintenance préventive économise des millions",
      excerpt:
        "Une stratégie de maintenance proactive réduit les coûts et prolonge la durée de vie des actifs immobiliers.",
      brief:
        "la maintenance préventive vise à détecter l’usure avant la panne coûteuse et à étaler les dépenses dans le temps. Nous expliquons pourquoi les immeubles bien suivis évitent des travaux d’urgence majeurs, comment le fonds de prévoyance s’y rattache en copropriété, et quels systèmes méritent un calendrier d’inspection prioritaire à Montréal.",
      sections: [
        {
          heading: "Pourquoi la maintenance préventive réduit-elle les coûts totaux ?",
          paragraphs: [
            "Une panne non détectée (toiture, chauffage, ascenseur) peut déclencher des dommages cascades et des travaux d’urgence facturés à prime—souvent 20 à 40 % plus chers que les travaux planifiés selon les ordres de grandeur couramment cités en gestion d’actifs.",
            "Les inspections régulières documentent l’état des équipements et alimentent les budgets prévisionnels plutôt que les surprises en milieu d’hiver.",
          ],
        },
        {
          heading: "Comment le syndicat aligne-t-il entretien et fonds de prévoyance ?",
          paragraphs: [
            "Au Québec, le fonds de prévoyance finance les travaux majeurs; une étude de réserve actualisée relie maintenance courante et remplacements planifiés (loi sur la copropriété, RLRQ c. C-6.1).",
            "Sans calendrier d’entretien, le syndicat surestime ou sous-estime les charges—et fragilise la confiance des copropriétaires lors des assemblées.",
          ],
        },
        {
          heading: "Quels systèmes surveiller en priorité dans un immeuble montréalais ?",
          paragraphs: [
            "Toiture et étanchéité, chauffage et ECS, électricité des parties communes, ascenseurs et structure—sont typiquement les postes à forte criticité pour la sécurité et la continuité d’usage.",
            "Gestion Velora recommande des prestataires qualifiés, des preuves photo/PV et une traçabilité des correctifs : c’est la base d’une défense documentée en cas d’incident ou de litige.",
          ],
        },
      ],
    },
    en: {
      category: "Technology",
      date: "January 2026",
      title: "Why preventive maintenance saves millions",
      excerpt:
        "A proactive maintenance strategy reduces costs and extends the lifespan of real estate assets.",
      brief:
        "preventive maintenance finds wear before expensive failures and spreads spend over time. Here’s why well-run buildings avoid major emergency work, how reserve funds connect for condo boards, and which systems deserve priority inspection calendars in Montreal.",
      sections: [
        {
          heading: "Why does preventive maintenance lower total cost?",
          paragraphs: [
            "Undetected failures (roofing, heating, elevators) can cascade into emergency work—often quoted at 20–40% premiums versus planned work in asset-management practice.",
            "Regular inspections document equipment condition and feed forecasts instead of mid-winter surprises.",
          ],
        },
        {
          heading: "How do boards align upkeep with the reserve fund?",
          paragraphs: [
            "In Quebec, the reserve fund finances major work; an updated reserve study links routine care to planned replacements (Condo Act, C-6.1).",
            "Without a maintenance calendar, boards mis-estimate charges—and owner trust suffers at AGMs.",
          ],
        },
        {
          heading: "Which systems matter most in a Montreal building?",
          paragraphs: [
            "Roofing/envelope, heating/DHW, common electrical, elevators, and structure are typically high criticality for safety and continuity.",
            "Gestion Velora emphasizes qualified vendors, photo/minute trails, and fix documentation—core to defensible operations if incidents arise.",
          ],
        },
      ],
    },
  },
  {
    slug: "maximiser-noi-approche-donnees",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=85",
    datePublished: "2025-12-10",
    dateModified: "2025-12-10",
    fr: {
      category: "Finance",
      date: "Décembre 2025",
      title: "Maximiser le NOI : approche basée sur les données",
      excerpt:
        "Comment l'analyse des données aide les propriétaires et syndicats à optimiser le revenu net d'exploitation.",
      brief:
        "le NOI (revenu net d’exploitation) résume la performance opérationnelle avant le financement. Nous voyons quels leviers mesurer chaque mois, comment la transparence des charges en copropriété soutient les décisions d’assemblée, et pourquoi la donnée seule ne remplace pas une gouvernance claire entre copropriétaires.",
      sections: [
        {
          heading: "Qu’est-ce que le NOI et pourquoi le suivre chaque mois ?",
          paragraphs: [
            "Le NOI agrège revenus locatifs (ou charges de copropriété côté gestion) moins dépenses opérationnelles courantes—hors capital et amortissement selon la convention comptable appliquée.",
            "Une variation de 2 à 3 points de vacance ou de dépenses peut déplacer le NOI plus qu’une hausse modérée des loyers : d’où l’intérêt de tableaux comparatifs mensuels.",
          ],
        },
        {
          heading: "Quelles données regarder pour un immeuble locatif ou un syndicat ?",
          paragraphs: [
            "Pour la location : délai moyen de location, taux d’impayés, travaux récurrents, coûts utilitaires—croisés avec la typologie d’unités.",
            "Pour la copropriété : budget vs réel, appels de fonds, travaux reportés, et lecture avec le fonds de prévoyance pour éviter les décisions myopes.",
          ],
        },
        {
          heading: "Comment la donnée renforce-t-elle la confiance sans tout automatiser ?",
          paragraphs: [
            "Des rapports lisibles pour le conseil et les copropriétaires réduisent les débats sur les chiffres et recentrent la discussion sur les priorités.",
            "Gestion Velora combine tableaux de bord et arbitrage humain : la donnée éclaire, la gouvernance tranche—notamment sur travaux majeurs et politique de loyers.",
          ],
        },
      ],
    },
    en: {
      category: "Finance",
      date: "December 2025",
      title: "Maximize NOI: a data-driven approach",
      excerpt:
        "How data analysis helps owners and condo boards optimize net operating income.",
      brief:
        "NOI summarizes operating performance before financing. We outline which levers to track monthly, how transparent condo charges support AGM decisions, and why data never replaces clear governance among owners.",
      sections: [
        {
          heading: "What is NOI and why track it monthly?",
          paragraphs: [
            "NOI aggregates rental income (or condo charges under management) minus operating expenses—excluding capital and depreciation depending on accounting convention.",
            "A 2–3 point swing in vacancy or expenses can move NOI more than a modest rent increase—hence month-over-month dashboards.",
          ],
        },
        {
          heading: "Which metrics matter for rentals vs. condo boards?",
          paragraphs: [
            "Rentals: time-to-lease, arrears, recurring repairs, utilities—crossed with unit mix.",
            "Condos: budget vs actual, special assessments, deferred work, read against the reserve fund to avoid short-term decisions.",
          ],
        },
        {
          heading: "How does data build trust without automating everything?",
          paragraphs: [
            "Readable board and owner reports reduce arguments about numbers and refocus debate on priorities.",
            "Gestion Velora pairs dashboards with human judgment—data informs, governance decides, especially on capex and rent policy.",
          ],
        },
      ],
    },
  },
  {
    slug: "experience-locataire-avantage-concurrentiel",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=85",
    datePublished: "2025-11-18",
    dateModified: "2025-11-18",
    fr: {
      category: "Stratégie",
      date: "Novembre 2025",
      title: "L'expérience locataire : le nouvel avantage concurrentiel",
      excerpt:
        "Dans un marché compétitif, la qualité de l'expérience locataire fait la différence.",
      brief:
        "quand l’offre est abondante, les locataires et voyageurs comparent la réactivité, la propreté et la clarté des règles. Nous détaillons les attentes mesurables en location longue durée et courte durée, l’impact du roulement sur le cash-flow, et des pratiques concrètes pour des réponses rapides sans sacrifier la conformité.",
      sections: [
        {
          heading: "Pourquoi l’expérience locataire influence-t-elle directement le rendement ?",
          paragraphs: [
            "Un roulement élevé multiplie les frais de remise en état, la publicité et le vide locatif—des postes qui peuvent représenter plusieurs pourcents du revenu brut annuel selon la structure d’actif.",
            "Une communication prévisible (délais de réponse, canaux uniques) réduit les litiges et les appels répétés au TAL pour des problèmes évitables.",
          ],
        },
        {
          heading: "Que attendent les locataires longue durée vs. voyageurs Airbnb à Montréal ?",
          paragraphs: [
            "Longue durée : état des lieux clair, demandes d’entretien traitées avec suivi, règlements de copropriété expliqués.",
            "Courte durée : propreté, consignes d’arrivée et dépannage 24 h pour les imprévus—sans flou sur le nombre d’occupants ou les règles municipales.",
          ],
        },
        {
          heading: "Comment mesurer l’expérience sans en faire une obsession vanity ?",
          paragraphs: [
            "Indicateurs simples : délai de première réponse, taux de renouvellement, notes internes après intervention, nombre de réclamations récurrentes par unité.",
            "Gestion Velora aligne ces indicateurs sur des standards de service transparents pour le propriétaire : l’objectif est la stabilité locative, pas seulement une note en ligne.",
          ],
        },
      ],
    },
    en: {
      category: "Strategy",
      date: "November 2025",
      title: "Tenant experience: the new competitive advantage",
      excerpt:
        "In a competitive market, tenant experience quality makes the difference.",
      brief:
        "when supply is plentiful, tenants and guests compare responsiveness, cleanliness, and clear rules. We outline measurable expectations for long- and short-term rentals, turnover’s cash-flow impact, and practical ways to respond fast while staying compliant.",
      sections: [
        {
          heading: "Why does tenant experience directly affect returns?",
          paragraphs: [
            "High turnover multiplies turnover costs, advertising, and vacancy—often several points of gross annual income depending on asset type.",
            "Predictable communication (response times, single channels) reduces disputes and repeat filings for avoidable issues.",
          ],
        },
        {
          heading: "What do long-term tenants vs. Airbnb guests expect in Montreal?",
          paragraphs: [
            "Long-term: clear move-in condition, tracked maintenance requests, explained condo bylaws.",
            "Short-term: cleaning, check-in instructions, 24h troubleshooting—without ambiguity on occupancy limits or municipal rules.",
          ],
        },
        {
          heading: "How do you measure experience without vanity metrics?",
          paragraphs: [
            "Simple KPIs: first-response time, renewal rate, post-work notes, repeat complaints per unit.",
            "Gestion Velora ties these to transparent owner standards—aiming for tenancy stability, not only online ratings.",
          ],
        },
      ],
    },
  },
  {
    slug: "gestion-copropriete-montreal-reglementation",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85",
    datePublished: "2025-10-08",
    dateModified: "2025-10-08",
    fr: {
      category: "Actualités",
      date: "Octobre 2025",
      title: "Gestion de copropriété à Montréal : ce qu'il faut savoir sur la réglementation",
      excerpt:
        "La Loi sur la copropriété et les règlements municipaux encadrent la gestion des syndicats.",
      brief:
        "gérer un syndicat à Montréal, c’est conjuger la Loi sur la copropriété des immeubles, les règlements municipaux et les règlements intérieurs de l’immeuble. Nous rappelons les obligations d’assemblée et de fonds, l’intérêt d’une documentation rigoureuse, et le rôle du gestionnaire pour éviter les écarts de conformité coûteux.",
      sections: [
        {
          heading: "Quelles lois encadrent le syndicat au Québec ?",
          paragraphs: [
            "La Loi sur la copropriété des immeubles (RLRQ c. C-6.1) fixe notamment les règles d’assemblée, de syndicat, de fonds de prévoyance et de conservation des archives.",
            "La Ville de Montréal peut imposer des exigences d’entretien, de sécurité incendie ou de permis selon les travaux—à croiser avec le règlement de copropriété.",
          ],
        },
        {
          heading: "Pourquoi les procès-verbaux et avis d’assemblée sont-ils stratégiques ?",
          paragraphs: [
            "Les délais de convocation et les majorités requises conditionnent la validité des décisions : une erreur peut invalider un vote ou retarder un financement urgent.",
            "Une trace écrite homogène aide aussi en cas de revente d’unité ou d’audit des copropriétaires.",
          ],
        },
        {
          heading: "Comment un gestionnaire réduit-il les risques réglementaires au quotidien ?",
          paragraphs: [
            "Calendrier de conformité (assurances, inspections, registres), coordination avec les professionnels (ingénieurs, architectes) et communication claire au conseil.",
            "Gestion Velora structure ces cycles pour que le conseil décide sur des dossiers complets—pas sur des versions partielles des faits.",
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
        "Montreal condo boards must align Quebec’s Condo Act, municipal bylaws, and the building’s internal regulations. We recap meeting and reserve-fund obligations, why minutes matter, and how managers reduce costly compliance gaps.",
      sections: [
        {
          heading: "What laws govern Quebec condo boards?",
          paragraphs: [
            "Quebec’s Act respecting divided co-ownership (C-6.1) sets rules for meetings, the syndicate, reserve funds, and record-keeping.",
            "The City of Montreal may add maintenance, fire-safety, or permit requirements depending on work—alongside the building’s bylaws.",
          ],
        },
        {
          heading: "Why are minutes and meeting notices strategic?",
          paragraphs: [
            "Notice timelines and voting thresholds determine decision validity—errors can void votes or delay urgent funding.",
            "Consistent records also help unit sales and owner audits.",
          ],
        },
        {
          heading: "How does a manager reduce day-to-day regulatory risk?",
          paragraphs: [
            "Compliance calendars (insurance, inspections, registers), coordination with professionals, and clear board communication.",
            "Gestion Velora structures these cycles so boards decide on complete files—not partial facts.",
          ],
        },
      ],
    },
  },
  {
    slug: "airbnb-montreal-permis-reglementation",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85",
    datePublished: "2025-09-12",
    dateModified: "2025-09-12",
    fr: {
      category: "Technologie",
      date: "Septembre 2025",
      title: "Airbnb à Montréal : permis, réglementation et bonnes pratiques",
      excerpt:
        "Tout savoir sur la légalité et les exigences pour louer en courte durée à Montréal.",
      brief:
        "la location courte durée à Montréal est encadrée par des règles municipales et fiscales qui évoluent. Nous rappelons l’importance du classement de l’hébergement, des taxes et assurances, et des bonnes pratiques d’exploitation pour rester aligné avec la Ville et limiter les risques lors de contrôles ou de plaintes de voisinage.",
      sections: [
        {
          heading: "Quelles exigences municipales faut-il anticiper ?",
          paragraphs: [
            "Montréal impose un cadre pour les hébergements touristiques (classement, règles de zonage et d’usage) : vérifiez la catégorie applicable et les conditions affichées sur le site officiel de la Ville avant mise en location.",
            "Le non-respect peut mener à des constats d’infraction et des amendes—le gestionnaire doit tenir les preuves (publicités, calendriers, contacts).",
          ],
        },
        {
          heading: "Quelles obligations fiscales et d’assurance sont souvent oubliées ?",
          paragraphs: [
            "Les taxes de vente applicables (TPS/TVQ selon les cas) et la déclaration des revenus locatifs doivent être intégrées au modèle d’affaires—les pourcentages exacts dépendent du statut et des règles en vigueur.",
            "L’assurance habitation courte durée n’est pas interchangeable avec une police résidentielle standard : validez les avenants avec votre assureur.",
          ],
        },
        {
          heading: "Comment réduire les risques de voisinage et d’usure prématurée ?",
          paragraphs: [
            "Règles d’occupation claires, limite de bruit, ménage qualitatif et dépannage rapide réduisent les plaintes et les avis négatifs.",
            "Gestion Velora documente les opérations pour que le propriétaire puisse démontrer diligence raisonnable en cas de litige.",
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
        "short-term rentals in Montreal sit under municipal and tax rules that change. We cover why classification matters, taxes and insurance, and operating practices that align with city requirements and reduce risk during inspections or neighbor complaints.",
      sections: [
        {
          heading: "What municipal requirements should hosts plan for?",
          paragraphs: [
            "Montreal regulates tourist lodging (classification, zoning/use rules): confirm the applicable category on the City’s official site before listing.",
            "Non-compliance can lead to fines—managers should keep evidence (listings, calendars, contacts).",
          ],
        },
        {
          heading: "Which tax and insurance obligations are often missed?",
          paragraphs: [
            "Applicable sales taxes and rental income reporting must be built into the operating model—exact rates depend on status and current rules.",
            "Short-term insurance riders differ from standard homeowner policies—validate endorsements with your insurer.",
          ],
        },
        {
          heading: "How do you reduce neighbor risk and excessive wear?",
          paragraphs: [
            "Clear occupancy rules, noise limits, quality cleaning, and fast troubleshooting reduce complaints and negative reviews.",
            "Gestion Velora documents operations so owners can show reasonable diligence if disputes arise.",
          ],
        },
      ],
    },
  },
  {
    slug: "choisir-gestionnaire-immobilier-montreal",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=85",
    datePublished: "2025-08-20",
    dateModified: "2025-08-20",
    fr: {
      category: "Stratégie",
      date: "Août 2025",
      title: "Comment choisir son gestionnaire immobilier à Montréal",
      excerpt:
        "Les critères à considérer pour sélectionner un gestionnaire fiable et compétent.",
      brief:
        "le bon gestionnaire combine transparence financière, processus documentés et disponibilité en situation d’urgence. Nous listons des critères vérifiables (références, rapports types, gouvernance), des signaux d’alarme, et des questions à poser avant de signer—pour syndicats, locations et courte durée.",
      sections: [
        {
          heading: "Quels critères objectifs vérifier avant de signer ?",
          paragraphs: [
            "Exemples de rapports financiers et de bons de travail, politique de réponse (délai cible), liste de fournisseurs qualifiés, et expérience avec votre type d’actif (copropriété, multiplex, Airbnb).",
            "Demandez deux références récentes dans un immeuble comparable—pas seulement des témoignages marketing.",
          ],
        },
        {
          heading: "Quels signaux d’alarme doivent vous faire hésiter ?",
          paragraphs: [
            "Absence de traçabilité des dépenses, mandats flous, ou refus de partager un plan de maintenance annuel pour les immeubles équipés.",
            "Une rémunération anormalement basse peut cacher des frais dissimulés ou une sous-capacité opérationnelle.",
          ],
        },
        {
          heading: "Quelles questions poser sur la conformité et les litiges ?",
          paragraphs: [
            "Processus TAL ou municipalités, tenue des registres obligatoires, coordination avec avocats ou ingénieurs pour travaux majeurs.",
            "Gestion Velora privilégie des mandats écrits, des KPIs partagés et des revues trimestrielles avec le propriétaire ou le conseil.",
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
        "a strong manager combines financial transparency, documented processes, and real availability in emergencies. We list verifiable criteria (references, sample reports, governance), red flags, and questions to ask before signing—for condos, rentals, and short-term.",
      sections: [
        {
          heading: "What objective criteria should you verify before signing?",
          paragraphs: [
            "Sample financial and work-order reports, target response times, qualified vendor lists, and experience with your asset type (condo, multiplex, Airbnb).",
            "Ask for two recent references in a comparable building—not only marketing testimonials.",
          ],
        },
        {
          heading: "What red flags should make you pause?",
          paragraphs: [
            "No spend traceability, vague mandates, or refusal to share an annual maintenance plan where appropriate.",
            "Abnormally low fees can hide hidden charges or under-capacity operations.",
          ],
        },
        {
          heading: "What should you ask about compliance and disputes?",
          paragraphs: [
            "TAL/municipal processes, mandatory registers, and coordination with counsel/engineers for major work.",
            "Gestion Velora favors written mandates, shared KPIs, and quarterly reviews with owners or the board.",
          ],
        },
      ],
    },
  },
  {
    slug: "fonds-prevoyance-copropriete-quebec",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=85",
    datePublished: "2025-07-18",
    dateModified: "2025-07-18",
    fr: {
      category: "Finance",
      date: "Juillet 2025",
      title: "Fonds de prévoyance en copropriété : obligations et bonnes pratiques au Québec",
      excerpt:
        "La constitution et la gestion du fonds de prévoyance sont cruciales pour la pérennité de la copropriété.",
      brief:
        "le fonds de prévoyance finance les travaux majeurs non couverts par le budget courant. Nous expliquons le lien avec l’étude de réserve, les décisions d’assemblée qui encadrent les prélèvements, et pourquoi une communication continue évite les appels de fonds surprise qui fragilisent la valeur des unités.",
      sections: [
        {
          heading: "À quoi sert exactement le fonds de prévoyance ?",
          paragraphs: [
            "Il couvre les remplacements et réparations majeurs (toiture, façade, mécanique) selon une planification pluriannuelle—notamment lorsque l’étude de réserve identifie des échéances critiques.",
            "La Loi sur la copropriété impose des règles de constitution et de suivi : le syndicat doit opérer avec prudence et loyauté envers les copropriétaires.",
          ],
        },
        {
          heading: "Pourquoi l’étude de réserve est-elle le document de référence ?",
          paragraphs: [
            "Elle traduit l’état des composantes majeures en coûts et années—base pour ajuster les cotisations et prioriser les travaux.",
            "Sans mise à jour régulière, le fonds peut être structurellement sous-alimenté malgré des comptes « à jour » à court terme.",
          ],
        },
        {
          heading: "Comment communiquer pour éviter les chocs financiers ?",
          paragraphs: [
            "Prévoir des scénarios (travaux avancés, retards, inflation des contrats) et les expliquer en assemblée avec des fourchettes chiffrées.",
            "Gestion Velora appuie les conseils avec des échéanciers clairs et une traçabilité des décisions pour réduire les conflits entre copropriétaires.",
          ],
        },
      ],
    },
    en: {
      category: "Finance",
      date: "July 2025",
      title: "Condo reserve fund in Quebec: obligations and best practices",
      excerpt:
        "Establishing and managing the reserve fund is crucial for condo sustainability.",
      brief:
        "the reserve fund finances major work not covered by the annual budget. We explain the tie to reserve studies, assembly decisions on contributions, and why steady communication avoids surprise special assessments that hurt unit values.",
      sections: [
        {
          heading: "What is the reserve fund for?",
          paragraphs: [
            "It covers major replacements and repairs (roofing, envelope, mechanicals) on a multi-year plan—especially when the reserve study flags critical timelines.",
            "Quebec’s Condo Act sets funding and stewardship rules: the syndicate must act prudently and loyally toward owners.",
          ],
        },
        {
          heading: "Why is the reserve study the reference document?",
          paragraphs: [
            "It translates major component condition into costs and years—basis for adjusting contributions and prioritizing work.",
            "Without regular updates, the fund can be structurally underfunded even if short-term books look fine.",
          ],
        },
        {
          heading: "How should boards communicate to avoid financial shocks?",
          paragraphs: [
            "Model scenarios (accelerated work, delays, contractor inflation) and present ranges at AGMs.",
            "Gestion Velora supports boards with clear timelines and decision trails to reduce owner conflict.",
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
