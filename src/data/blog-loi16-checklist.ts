import { blogCoverPath } from "../lib/blogImages";
import type { BlogPost } from "./blog";

const rules = "https://www.quebec.ca/habitation-territoire/achat-vente/condos-coproprietes/mesures-coproprietes";
const guide = "https://cdn-contenu.quebec.ca/cdn-contenu/adm/org/shq/Documents/publications/Guide-Explicatif-Mesures-Copropriete-Divise.pdf";

export const loi16Checklist: BlogPost = {
  slug: "checklist-loi-16-syndicat-copropriete",
  image: blogCoverPath("cover-regulation.webp"),
  datePublished: "2026-11-04",
  dateModified: "2026-11-04",
  fr: {
    category: "Outil gratuit",
    date: "Novembre 2026",
    title: "Liste de vérification Loi 16 pour les syndicats de copropriété",
    metaTitle: "Liste Loi 16 : carnet et fonds de prévoyance",
    excerpt: "Une liste gratuite pour préparer le carnet d'entretien, l'étude du fonds de prévoyance et le suivi du conseil.",
    brief: "Le conseil d'un syndicat de copropriété divise doit planifier son carnet d'entretien et son étude du fonds de prévoyance. Les syndicats existants ont généralement jusqu'au 15 août 2028 pour obtenir leurs premiers documents conformes. La liste ci-dessous aide à organiser le travail et reste accessible sans courriel.",
    sections: [
      {heading: "1. Confirmer la situation et les échéances", paragraphs: [["À vérifier : la date de constitution du syndicat, l'état des documents reçus du promoteur et les mesures transitoires applicables. Le règlement est entré en vigueur le 14 août 2025; le délai général pour les premiers documents des syndicats existants mène au 15 août 2028. Les cas impliquant un promoteur peuvent suivre d'autres règles. Consultez les ", {text: "mesures officielles du Québec", to: rules}, "."]]},
      {heading: "2. Rassembler les documents de l'immeuble", paragraphs: ["À réunir : déclaration de copropriété, plans disponibles, garanties, contrats, polices d'assurance, rapports d'inspection, historique des réparations, factures, procès-verbaux, budget et soldes des fonds. Désignez une personne responsable et notez les documents manquants."]},
      {heading: "3. Mandater les personnes habilitées", paragraphs: [["À faire : demander des propositions écrites pour le carnet et l'étude, vérifier que les personnes répondent aux conditions réglementaires, et clarifier le prix, les livrables et les dates. Le ", {text: "guide explicatif du gouvernement", to: guide}, " décrit les conditions applicables aux personnes qui établissent ou révisent ces documents."]]},
      {heading: "4. Faire établir le carnet d'entretien", paragraphs: ["À vérifier dans le mandat : inventaire des composantes concernées, entretien réalisé et à prévoir, état des éléments et planification des réparations majeures et remplacements. Le conseil tient le carnet à jour. Sa révision professionnelle est normalement requise tous les cinq ans; certaines copropriétés admissibles bénéficient d'une exception de dix ans."]},
      {heading: "5. Obtenir l'étude du fonds de prévoyance", paragraphs: ["À vérifier : solde initial utilisé, estimation des coûts et échéances des travaux majeurs des parties communes sur au moins 25 ans, soldes recommandés et contributions annuelles. L'étude est obtenue au moins tous les cinq ans. Une contribution ou un solde seul ne remplace pas une étude adaptée à l'immeuble."]},
      {heading: "6. Présenter les documents et fixer les contributions", paragraphs: ["À planifier : rendre le carnet et l'étude disponibles aux copropriétaires dans les 60 jours suivant leur production, ou avant l'assemblée annuelle si celle-ci a lieu plus tôt. Préparez une synthèse du solde, des travaux et des recommandations. Après consultation de l'assemblée, le conseil fixe les contributions en tenant compte de l'étude et de l'évolution de l'immeuble."]},
      {heading: "7. Suivre le plan chaque année", paragraphs: ["À prévoir au calendrier du conseil : mise à jour du carnet, suivi des travaux et des dépenses, revue des soldes et des contributions, communication aux copropriétaires et prochaine révision professionnelle. Conservez les rapports et les décisions dans le registre du syndicat."]},
      {heading: "Besoin d'aide pour organiser le suivi ?", paragraphs: [["Gestion Velora accompagne les syndicats de six unités et plus dans l'administration, le suivi financier et la coordination de l'entretien selon le mandat convenu. Les professionnels habilités établissent les documents requis; le conseil conserve ses responsabilités. Consultez ", {text: "nos services", to: "/services/syndicat-copropriete"}, ", ", {text: "nos tarifs", to: "/tarifs"}, " ou ", {text: "contactez-nous", to: "/contact"}, ". Cette liste est un outil d'organisation; la situation et la déclaration de copropriété de chaque immeuble doivent être vérifiées."]]},
    ],
  },
  en: {
    category: "Free resource", date: "November 2026",
    title: "Quebec Law 16 checklist for condo boards",
    metaTitle: "Law 16 checklist: condo log and reserve study",
    excerpt: "A free checklist to organize your maintenance log, reserve fund study and board follow-up.",
    brief: "Quebec condo boards must plan for a maintenance log and reserve fund study. Existing syndicates generally have until August 15, 2028 to obtain their first compliant documents. This checklist is freely available without an email address.",
    sections: [
      {heading: "1. Confirm your situation and deadlines", paragraphs: [["Check the syndicate's formation date, documents received from the developer and applicable transition rules. The regulation took effect August 14, 2025; the general deadline for existing syndicates' first documents is August 15, 2028. Developer transition cases may differ. Read ", {text: "Quebec's official guidance", to: rules}, "."]]},
      {heading: "2. Gather building records", paragraphs: ["Collect the declaration of co-ownership, available plans, warranties, contracts, insurance policies, inspection reports, repair history, invoices, minutes, budget and fund balances. Assign an owner and list missing records."]},
      {heading: "3. Engage qualified professionals", paragraphs: [["Request written proposals for the log and study, verify the professionals meet regulatory requirements, and clarify fees, deliverables and dates. The ", {text: "government's explanatory guide", to: guide}, " describes who may prepare and review the documents."]]},
      {heading: "4. Establish the maintenance log", paragraphs: ["Check that the mandate covers relevant components, completed and upcoming maintenance, condition, and planned major repairs and replacements. The board keeps the log current. Professional review is generally required every five years; some eligible buildings qualify for a ten-year exception."]},
      {heading: "5. Obtain the reserve fund study", paragraphs: ["Check the opening balance, estimated costs and timing of major common-element work over at least 25 years, recommended balances and annual contributions. A study must be obtained at least every five years. A fund balance or contribution alone does not replace a building-specific study."]},
      {heading: "6. Share the documents and set contributions", paragraphs: ["Make the log and study available to owners within 60 days after production, or before the annual meeting if sooner. Summarize the balance, work and recommendations. After consulting owners, the board sets contributions considering the study and the building's evolution."]},
      {heading: "7. Follow the plan each year", paragraphs: ["Schedule log updates, work and expense tracking, balance and contribution reviews, owner communication and the next professional review. Keep reports and decisions in the syndicate's register."]},
      {heading: "Need help organizing the follow-up?", paragraphs: [["Gestion Velora supports syndicates of six or more units with administration, financial follow-up and maintenance coordination under the agreed mandate. Qualified professionals prepare the required documents; the board retains its responsibilities. See ", {text: "our services", to: "/services/syndicat-copropriete"}, ", ", {text: "pricing", to: "/tarifs"}, " or ", {text: "contact us", to: "/contact"}, ". This checklist is an organizing aid; verify your building's circumstances and declaration."]]},
    ],
  },
};
