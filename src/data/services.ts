export const services = {
  "syndicat-copropriete": {
    slug: "syndicat-copropriete",
    title: "Syndicat de copropriété",
    subtitle: "Une gestion complète pour votre copropriété",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=85",
    description:
      "Gestion Velora offre des services complets de gestion pour les syndicats de copropriété à Montréal. Notre équipe expérimentée assure la transparence, la rigueur et une communication claire avec tous les copropriétaires.",
    offerings: [
      {
        title: "Administration et gouvernance",
        items: [
          "Convoquation et tenue des assemblées générales",
          "Rédaction des procès-verbaux",
          "Gestion des décisions du conseil d'administration",
          "Respect des dispositions de la Loi sur la copropriété",
        ],
      },
      {
        title: "Fonds de prévoyance et finances",
        items: [
          "Gestion du fonds de prévoyance",
          "Élaboration des budgets prévisionnels",
          "Suivi des comptes et rapports financiers",
          "Perception des charges communes",
        ],
      },
      {
        title: "Travaux et maintenance",
        items: [
          "Coordination des travaux majeurs",
          "Sélection des entrepreneurs et soumissions",
          "Suivi des contrats d'entretien",
          "Gestion des urgences et sinistres",
        ],
      },
      {
        title: "Communication et relations",
        items: [
          "Liaison avec les copropriétaires",
          "Gestion des plaintes et demandes",
          "Transparence dans tous les rapports",
          "Support administratif continu",
        ],
      },
    ],
  },
  airbnb: {
    slug: "airbnb",
    title: "Gestion Airbnb et location courte durée",
    subtitle: "Maximisez vos revenus en toute sérénité",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&q=85",
    description:
      "Gestion Velora prend en charge l'intégralité de la gestion de vos propriétés en location courte durée à Montréal. Réservations, ménage, maintenance et communication avec les voyageurs — tout est géré pour vous.",
    offerings: [
      {
        title: "Gestion des réservations",
        items: [
          "Optimisation des annonces et des tarifs",
          "Gestion des demandes et confirmations",
          "Coordination des arrivées et départs",
          "Suivi des avis et de la réputation",
        ],
      },
      {
        title: "Opérations au quotidien",
        items: [
          "Ménage professionnel entre chaque séjour",
          "Remise des clés et accueil des voyageurs",
          "Maintenance et réparations",
          "Gestion des urgences 24/7",
        ],
      },
      {
        title: "Conformité et réglementation",
        items: [
          "Respect des règlements municipaux de Montréal",
          "Enregistrement et permis requis",
          "Assurances et responsabilité",
          "Conformité fiscale",
        ],
      },
    ],
  },
  location: {
    slug: "location",
    title: "Gestion locative longue durée",
    subtitle: "Une gestion locative professionnelle et humaine",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=85",
    description:
      "Gestion Velora gère vos immeubles locatifs à Montréal avec rigueur et professionnalisme. De la sélection des locataires au suivi des loyers et entretiens, nous assurons une gestion sereine et rentable.",
    offerings: [
      {
        title: "Sélection des locataires",
        items: [
          "Publicité et diffusion des annonces",
          "Visites et tri des candidatures",
          "Vérification des antécédents (crédit, références)",
          "Rédaction et signature des baux",
        ],
      },
      {
        title: "Gestion des loyers et finances",
        items: [
          "Perception des loyers",
          "Suivi des impayés et relances",
          "Rapports financiers détaillés",
          "Gestion des dépôts de garantie",
        ],
      },
      {
        title: "Entretien et maintenance",
        items: [
          "Coordination des réparations",
          "Inspections périodiques",
          "Relations avec les fournisseurs",
          "Gestion des urgences",
        ],
      },
      {
        title: "Relation locataire",
        items: [
          "Communication transparente",
          "Traitement des demandes et plaintes",
          "Renouvellement et résiliation des baux",
          "Médiation en cas de litiges",
        ],
      },
    ],
  },
} as const;

export type ServiceSlug = keyof typeof services;
