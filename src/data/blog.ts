export interface BlogPostLocale {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
}

export interface BlogPost {
  slug: string;
  image: string;
  fr: BlogPostLocale;
  en: BlogPostLocale;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "avenir-gestion-immobiliere-intelligente-2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85",
    fr: {
      category: "Actualités",
      date: "Février 2026",
      title: "L'avenir de la gestion immobilière intelligente en 2026",
      excerpt:
        "Les tendances qui transformeront la gestion immobilière à Montréal : technologie, données et expérience locataire.",
      content: `Gestion Velora observe l'évolution rapide du secteur immobilier à Montréal. En 2026, trois tendances majeures façonnent notre métier : la numérisation des processus, l'analyse prédictive et la personnalisation de l'expérience locataire.

La technologie permet désormais de centraliser les données, automatiser les tâches répétitives et offrir une transparence accrue aux copropriétaires et investisseurs. Les syndicats de copropriété bénéficient de plateformes qui simplifient les assemblées et le suivi financier.

Pour les propriétaires en location courte ou longue durée, Gestion Velora intègre ces outils tout en conservant un contact humain essentiel. La gestion immobilière intelligente, c'est allier efficacité et relation de confiance.`,
    },
    en: {
      category: "News",
      date: "February 2026",
      title: "The future of intelligent property management in 2026",
      excerpt:
        "Trends transforming property management in Montreal: technology, data, and tenant experience.",
      content: `Gestion Velora observes the rapid evolution of the Montreal real estate sector. In 2026, three major trends shape our business: digitization of processes, predictive analytics, and personalization of the tenant experience.

Technology now makes it possible to centralize data, automate repetitive tasks, and offer greater transparency to condo owners and investors. Condo boards benefit from platforms that simplify meetings and financial tracking.

For short-term or long-term rental owners, Gestion Velora integrates these tools while maintaining essential human contact. Intelligent property management means combining efficiency with trusted relationships.`,
    },
  },
  {
    slug: "maintenance-preventive-economise-millions",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=85",
    fr: {
      category: "Technologie",
      date: "Janvier 2026",
      title: "Pourquoi la maintenance préventive économise des millions",
      excerpt:
        "Une stratégie de maintenance proactive réduit les coûts et prolonge la durée de vie des actifs immobiliers.",
      content: `La maintenance préventive est un pilier de la gestion immobilière professionnelle. Gestion Velora recommande une approche structurée pour chaque type de bien : syndicats de copropriété, locations Airbnb ou locatives longue durée.

En planifiant les inspections et entretiens réguliers, on évite les pannes majeures, les urgences coûteuses et l'insatisfaction des occupants. Les systèmes de chauffage, plomberie, toiture et ascenseurs nécessitent un suivi rigoureux.

Pour les syndicats, un fonds de prévoyance bien constitué et une stratégie de travaux à long terme garantissent la pérennité de l'immeuble. Gestion Velora accompagne les conseils d'administration dans cette démarche.`,
    },
    en: {
      category: "Technology",
      date: "January 2026",
      title: "Why preventive maintenance saves millions",
      excerpt:
        "A proactive maintenance strategy reduces costs and extends the lifespan of real estate assets.",
      content: `Preventive maintenance is a cornerstone of professional property management. Gestion Velora recommends a structured approach for every property type: condo boards, Airbnb rentals, or long-term leases.

By planning regular inspections and maintenance, we avoid major breakdowns, costly emergencies, and occupant dissatisfaction. Heating, plumbing, roofing, and elevator systems require rigorous follow-up.

For condo boards, a well-structured reserve fund and long-term capital planning ensure the building's longevity. Gestion Velora supports boards of directors in this process.`,
    },
  },
  {
    slug: "maximiser-noi-approche-donnees",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=85",
    fr: {
      category: "Finance",
      date: "Décembre 2025",
      title: "Maximiser le NOI : approche basée sur les données",
      excerpt:
        "Comment l'analyse des données aide les propriétaires et syndicats à optimiser le revenu net d'exploitation.",
      content: `Le NOI (Net Operating Income) est un indicateur clé de la performance immobilière. Gestion Velora utilise des rapports détaillés et des tableaux de bord pour aider les propriétaires et syndicats à suivre les revenus et dépenses.

En analysant les tendances, taux d'occupation, délais de location, coûts d'entretien, on identifie les leviers d'optimisation. Une tarification dynamique pour les Airbnb, une sélection rigoureuse des locataires en longue durée, et une gestion serrée des charges en copropriété contribuent à maximiser le NOI.

La transparence et la rigueur sont au cœur de notre approche. Chaque dollar est justifié, chaque décision s'appuie sur des données fiables.`,
    },
    en: {
      category: "Finance",
      date: "December 2025",
      title: "Maximize NOI: a data-driven approach",
      excerpt:
        "How data analysis helps owners and condo boards optimize net operating income.",
      content: `NOI (Net Operating Income) is a key indicator of real estate performance. Gestion Velora uses detailed reports and dashboards to help owners and condo boards track revenue and expenses.

By analyzing trends, occupancy rates, time to lease, maintenance costs, we identify optimization levers. Dynamic pricing for Airbnb, rigorous tenant screening for long-term rentals, and tight management of condo fees all contribute to maximizing NOI.

Transparency and rigour are at the heart of our approach. Every dollar is accounted for; every decision is based on reliable data.`,
    },
  },
  {
    slug: "experience-locataire-avantage-concurrentiel",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=85",
    fr: {
      category: "Stratégie",
      date: "Novembre 2025",
      title: "L'expérience locataire : le nouvel avantage concurrentiel",
      excerpt:
        "Dans un marché compétitif, la qualité de l'expérience locataire fait la différence.",
      content: `À Montréal, la concurrence immobilière est forte. Les locataires et voyageurs attendent une communication rapide, des logements impeccables et une gestion réactive. Gestion Velora place l'expérience locataire au centre de sa stratégie.

Pour les locations longue durée, nous assurons un accueil professionnel, des réponses rapides aux demandes et un entretien rigoureux des parties communes. Pour les Airbnb, le ménage impeccable et la coordination des arrivées/départs sont essentiels.

Un locataire ou voyageur satisfait reste plus longtemps, recommande et paie son loyer à temps. L'investissement dans l'expérience locataire se traduit par une réduction du roulement et une valorisation du bien.`,
    },
    en: {
      category: "Strategy",
      date: "November 2025",
      title: "Tenant experience: the new competitive advantage",
      excerpt:
        "In a competitive market, tenant experience quality makes the difference.",
      content: `In Montreal, real estate competition is strong. Tenants and travellers expect fast communication, spotless units, and responsive management. Gestion Velora places tenant experience at the centre of its strategy.

For long-term rentals, we ensure professional onboarding, quick responses to requests, and rigorous maintenance of common areas. For Airbnb, immaculate cleaning and check-in/out coordination are essential.

A satisfied tenant or guest stays longer, recommends the property, and pays rent on time. Investing in tenant experience leads to reduced turnover and asset appreciation.`,
    },
  },
  {
    slug: "gestion-copropriete-montreal-reglementation",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85",
    fr: {
      category: "Actualités",
      date: "Octobre 2025",
      title: "Gestion de copropriété à Montréal : ce qu'il faut savoir sur la réglementation",
      excerpt:
        "La Loi sur la copropriété et les règlements municipaux encadrent la gestion des syndicats.",
      content: `La gestion d'un syndicat de copropriété à Montréal implique de maîtriser la Loi sur la copropriété du Québec ainsi que les règlements municipaux. Gestion Velora accompagne les conseils d'administration dans le respect de ces obligations.

Les assemblées générales doivent être convoquées selon les délais et formalités prévus. Les procès-verbaux, le fonds de prévoyance et les travaux majeurs sont encadrés par des règles précises. Une gestion rigoureuse évite les litiges et assure la sérénité des copropriétaires.`,
    },
    en: {
      category: "News",
      date: "October 2025",
      title: "Condo management in Montreal: what you need to know about regulation",
      excerpt:
        "Quebec's Condo Act and municipal bylaws govern condo board management.",
      content: `Managing a condo board in Montreal requires mastery of Quebec's Condo Act and municipal bylaws. Gestion Velora supports boards of directors in meeting these obligations.

Annual general meetings must be convened according to required timelines and formalities. Meeting minutes, the reserve fund, and major works are governed by precise rules. Rigorous management avoids disputes and ensures peace of mind for owners.`,
    },
  },
  {
    slug: "airbnb-montreal-permis-reglementation",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85",
    fr: {
      category: "Technologie",
      date: "Septembre 2025",
      title: "Airbnb à Montréal : permis, réglementation et bonnes pratiques",
      excerpt:
        "Tout savoir sur la légalité et les exigences pour louer en courte durée à Montréal.",
      content: `Montréal impose des règles spécifiques pour la location courte durée. Gestion Velora assure la conformité de vos propriétés : enregistrement, permis, assurances et respect des règles de zonage.

Une gestion professionnelle inclut la tenue des registres, la collecte des taxes et la communication avec les autorités en cas de contrôle. Nous vous accompagnons pour que votre activité soit sereine et conforme.`,
    },
    en: {
      category: "Technology",
      date: "September 2025",
      title: "Airbnb in Montreal: permits, regulation and best practices",
      excerpt:
        "Everything you need to know about legality and requirements for short-term rental in Montreal.",
      content: `Montreal imposes specific rules for short-term rentals. Gestion Velora ensures your properties comply: registration, permits, insurance, and zoning compliance.

Professional management includes record-keeping, tax collection, and communication with authorities during inspections. We support you so your activity runs smoothly and compliantly.`,
    },
  },
  {
    slug: "choisir-gestionnaire-immobilier-montreal",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=85",
    fr: {
      category: "Stratégie",
      date: "Août 2025",
      title: "Comment choisir son gestionnaire immobilier à Montréal",
      excerpt:
        "Les critères à considérer pour sélectionner un gestionnaire fiable et compétent.",
      content: `Choisir un gestionnaire immobilier est une décision importante. Transparence, réactivité, expertise et références sont des critères essentiels. Gestion Velora se démarque par son approche personnalisée et sa rigueur.

Que ce soit pour un syndicat de copropriété, une location Airbnb ou un immeuble locatif, demandez des références, consultez les rapports types et rencontrez l'équipe. Un bon gestionnaire doit inspirer confiance et communiquer clairement.`,
    },
    en: {
      category: "Strategy",
      date: "August 2025",
      title: "How to choose a property manager in Montreal",
      excerpt:
        "Criteria to consider when selecting a reliable and competent manager.",
      content: `Choosing a property manager is an important decision. Transparency, responsiveness, expertise, and references are essential criteria. Gestion Velora stands out for its personalized approach and rigour.

Whether for a condo board, Airbnb rental, or rental building, ask for references, review sample reports, and meet the team. A good manager should inspire confidence and communicate clearly.`,
    },
  },
  {
    slug: "fonds-prevoyance-copropriete-quebec",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=85",
    fr: {
      category: "Finance",
      date: "Juillet 2025",
      title: "Fonds de prévoyance en copropriété : obligations et bonnes pratiques au Québec",
      excerpt:
        "La constitution et la gestion du fonds de prévoyance sont cruciales pour la pérennité de la copropriété.",
      content: `Le fonds de prévoyance permet de financer les travaux majeurs prévus dans l'immeuble. Sa constitution et son suivi sont encadrés par la Loi sur la copropriété. Gestion Velora assiste les syndicats dans l'élaboration des études et le respect des obligations.

Un fonds bien géré évite les appels de fonds imprévus et assure la réalisation des travaux dans les délais. La transparence envers les copropriétaires est essentielle.`,
    },
    en: {
      category: "Finance",
      date: "July 2025",
      title: "Condo reserve fund in Quebec: obligations and best practices",
      excerpt:
        "Establishing and managing the reserve fund is crucial for condo sustainability.",
      content: `The reserve fund finances planned major work in the building. Its establishment and tracking are governed by Quebec's Condo Act. Gestion Velora assists condo boards with reserve studies and compliance.

A well-managed fund avoids unexpected special assessments and ensures work is completed on schedule. Transparency with owners is essential.`,
    },
  },
];

export function getPostBySlug(slug: string, locale: "fr" | "en" = "fr"): (BlogPost & { title: string; category: string; date: string; excerpt: string; content: string }) | undefined {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return undefined;
  const loc = post[locale];
  return { ...post, ...loc };
}
