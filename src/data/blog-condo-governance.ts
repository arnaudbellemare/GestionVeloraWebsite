import { blogCoverPath } from "../lib/blogImages";
import type { BlogPost } from "./blog";

const QUEBEC_CONDO_RULES_URL =
  "https://www.quebec.ca/habitation-territoire/achat-vente/condos-coproprietes/mesures-coproprietes";
const CIVIL_CODE_URL =
  "https://www.legisquebec.gouv.qc.ca/fr/document/lc/CCQ-1991?langCont=fr";
const SELF_INSURANCE_REGULATION_URL =
  "https://www.legisquebec.gouv.qc.ca/fr/document/rc/CCQ,%20r.%204.1";

export const condoGovernanceBlogPosts = [
  {
    slug: "loi-16-copropriete-quebec-echeances-conformite",
    image: blogCoverPath("cover-regulation.webp"),
    datePublished: "2026-09-14",
    dateModified: "2026-09-14",
    fr: {
      category: "Loi 16",
      date: "Septembre 2026",
      title: "Loi 16 en copropriété : échéances et plan de conformité 2025–2028",
      metaTitle: "Loi 16 copropriété : échéances 2025–2028",
      excerpt:
        "Ce que chaque syndicat doit faire pour le carnet d'entretien, l'étude du fonds de prévoyance et les nouvelles règles de transparence.",
      brief:
        "Le règlement de la Loi 16 est en vigueur depuis le 14 août 2025. Les syndicats existants disposent de trois ans et un jour pour obtenir leur premier carnet d'entretien et leur première étude du fonds de prévoyance. Le conseil doit commencer maintenant : inventaire, mandat professionnel, documents, budget et communication aux copropriétaires.",
      sections: [
        {
          heading: "Qu'est-ce qui est réellement entré en vigueur le 14 août 2025 ?",
          paragraphs: [
            [
              "Le ",
              { text: "règlement québécois sur la gestion des copropriétés divises", to: QUEBEC_CONDO_RULES_URL },
              " est entré en vigueur le 14 août 2025 dans la continuité de la Loi 16. Tous les syndicats de copropriété divise doivent s'y conformer; ni le conseil d'administration ni l'assemblée ne peuvent décider de s'en soustraire.",
            ],
            "Les syndicats existants ont trois ans et un jour à compter de l'entrée en vigueur pour faire établir un premier carnet d'entretien conforme et obtenir une première étude du fonds de prévoyance. Cela mène au 15 août 2028. Attendre 2028 est risqué : l'inventaire, l'inspection, la collecte des plans et contrats et le choix d'un professionnel indépendant prennent du temps.",
            "Les copropriétés neuves suivent aussi des règles de transition propres au promoteur. Le conseil doit vérifier la date de l'assemblée de transition et les documents reçus plutôt que supposer que le promoteur a tout remis automatiquement.",
          ],
        },
        {
          heading: "Que doivent contenir le carnet et l'étude du fonds de prévoyance ?",
          paragraphs: [
            "Le carnet d'entretien inventorie les parties communes et les éléments privatifs entretenus par le syndicat. Il consigne leur état, leur durée de vie restante, les réparations majeures et remplacements prévus sur 25 ans, les travaux réalisés, les coûts et les documents afférents. Le conseil le met à jour au moins une fois par année et justifie les travaux reportés.",
            "Le carnet est normalement révisé par un professionnel habilité au moins tous les cinq ans; certaines petites copropriétés ou configurations simples peuvent bénéficier d'un cycle de dix ans. Cette exception vise la révision du carnet. L'étude du fonds de prévoyance, elle, doit être obtenue tous les cinq ans.",
            [
              "L'étude utilise le carnet pour recommander le solde requis au début de chaque année et les versements nécessaires. L'article 1071 du ",
              { text: "Code civil du Québec", to: CIVIL_CODE_URL },
              " exige que les cotisations soient fixées à partir de ces recommandations, en tenant compte de l'évolution de l'immeuble et des sommes déjà disponibles.",
            ],
          ],
        },
        {
          heading: "Quel plan de conformité le conseil devrait-il suivre ?",
          paragraphs: [
            "Commencez par une résolution du conseil, un responsable interne et un calendrier. Rassemblez déclaration de copropriété, plans, garanties, contrats, factures, rapports d'inspection, sinistres et historique des travaux. Demandez plusieurs offres à des professionnels habilités et indépendants, avec un mandat qui distingue clairement le carnet, l'étude et les révisions futures.",
            "Une fois les documents produits, le conseil dispose de 60 jours pour les rendre accessibles aux copropriétaires; si l'assemblée annuelle arrive avant cette échéance, ils doivent être accessibles avant l'assemblée. Présentez ensuite le scénario recommandé, le solde réel, les travaux des prochaines années et l'effet sur les charges.",
            [
              "Après la première étude, le conseil a au plus 30 jours après l'assemblée annuelle pour fixer les sommes à verser en suivant ses recommandations. Si le fonds est insuffisant, le rattrapage peut être étalé sur un maximum de dix ans. Consultez aussi notre guide sur la ",
              { text: "présentation de l'étude en assemblée", to: "/blog/etude-fonds-prevoyance-assemblee-coproprietaires" },
              ".",
            ],
          ],
        },
      ],
    },
    en: {
      category: "Law 16",
      date: "September 2026",
      title: "Quebec Law 16 for condos: deadlines and a 2025–2028 compliance plan",
      metaTitle: "Quebec Law 16 condo deadlines: 2025–2028",
      excerpt:
        "What every condo board must do about the maintenance log, reserve fund study, and new transparency rules.",
      brief:
        "Quebec's Law 16 regulation has applied since August 14, 2025. Existing condo boards have three years and one day to obtain their first maintenance log and reserve fund study. Boards should begin now by organizing the inventory, professional mandate, records, budget impact, and owner communications rather than waiting for the deadline.",
      sections: [
        {
          heading: "What actually came into force on August 14, 2025?",
          paragraphs: [
            [
              "Quebec's ",
              { text: "divided co-ownership management regulation", to: QUEBEC_CONDO_RULES_URL },
              " came into force on August 14, 2025, following Law 16. Every divided co-ownership syndicate must comply. Neither the board nor the owners' meeting can vote to opt out.",
            ],
            "Existing syndicates have three years and one day from that effective date to establish a compliant first maintenance log and obtain a first reserve fund study, leading to August 15, 2028. Waiting until 2028 is risky because inventory work, inspection, collection of plans and contracts, and selection of an independent professional all take time.",
            "New co-ownerships also have promoter transition rules. The board should verify the transition-meeting date and every record delivered instead of assuming the promoter automatically supplied a complete file.",
          ],
        },
        {
          heading: "What must the maintenance log and reserve fund study contain?",
          paragraphs: [
            "The maintenance log inventories common portions and private-portion components maintained by the syndicate. It records condition, remaining useful life, major repairs and replacements planned over 25 years, completed work, costs, and supporting records. The board updates it at least annually and records why scheduled work was deferred.",
            "An authorized professional normally revises the log at least every five years; some small or structurally simple co-ownerships qualify for a ten-year cycle. That exception concerns the maintenance-log revision. The reserve fund study must still be obtained every five years.",
            [
              "The study uses the log to recommend the balance needed at the start of each year and required contributions. Article 1071 of the ",
              { text: "Civil Code of Québec", to: CIVIL_CODE_URL },
              " requires contributions to follow those recommendations while accounting for building changes and money already in the fund.",
            ],
          ],
        },
        {
          heading: "What compliance plan should the board follow?",
          paragraphs: [
            "Start with a board resolution, an internal owner, and a schedule. Gather the declaration of co-ownership, plans, warranties, contracts, invoices, inspection reports, claims history, and completed-work records. Obtain several proposals from authorized, independent professionals, with a mandate that clearly separates the log, the study, and later revisions.",
            "Once produced, the board has 60 days to make the documents available to owners; if the annual meeting occurs first, they must be available before the meeting. Present the recommended scenario, actual balance, near-term work, and condo-fee impact together.",
            [
              "After the first study, the board has no more than 30 days following the annual meeting to set contributions in accordance with its recommendations. If the fund is deficient, replenishment may be spread over no more than ten years. See our guide to ",
              { text: "presenting the study at an owners' meeting", to: "/en/blog/etude-fonds-prevoyance-assemblee-coproprietaires" },
              ".",
            ],
          ],
        },
      ],
    },
  },
  {
    slug: "etude-fonds-prevoyance-assemblee-coproprietaires",
    image: blogCoverPath("cover-agm.webp"),
    datePublished: "2026-09-14",
    dateModified: "2026-09-14",
    fr: {
      category: "Fonds de prévoyance",
      date: "Septembre 2026",
      title: "Présenter l'étude du fonds de prévoyance en assemblée de copropriété",
      metaTitle: "Présenter l'étude du fonds de prévoyance en AGA",
      excerpt:
        "Une méthode claire pour transformer l'étude sur 25 ans en décisions, cotisations et communications compréhensibles.",
      brief:
        "Une étude du fonds de prévoyance ne devrait pas être déposée comme un rapport technique incompréhensible. Avant l'assemblée, le conseil doit la rendre accessible, relier les travaux sur 25 ans au budget annuel et expliquer les scénarios de cotisation. L'assemblée est consultée; le conseil fixe ensuite les contributions et documente sa décision.",
      sections: [
        {
          heading: "Quels documents préparer avant l'assemblée ?",
          paragraphs: [
            [
              "Le règlement de la ",
              { text: "Loi 16 sur les copropriétés divises", to: QUEBEC_CONDO_RULES_URL },
              " oblige le conseil à rendre le carnet d'entretien et l'étude accessibles dans les 60 jours de leur production, ou avant l'assemblée annuelle si elle survient plus tôt. Envoyez un résumé lisible avec le rapport complet, pas seulement un chiffre de cotisation.",
            ],
            "Le dossier de séance devrait rapprocher cinq éléments : solde actuel du fonds, solde recommandé au début de l'année, versement annuel recommandé, travaux prévus pour les cinq prochaines années et trajectoire sur 25 ans. Ajoutez les hypothèses d'inflation, honoraires, taxes et rendement utilisées par le professionnel.",
            "L'avis de convocation à l'assemblée annuelle doit notamment être accompagné du bilan, de l'état des résultats, de l'état des dettes et créances, du budget prévisionnel ainsi que d'une note sur les contrats et travaux proposés. Si l'étude change fortement les charges, joignez un tableau par fraction et une explication des écarts avec l'ancien budget.",
          ],
        },
        {
          heading: "Qui décide des cotisations : l'assemblée ou le conseil ?",
          paragraphs: [
            [
              "L'article 1072 du ",
              { text: "Code civil du Québec", to: CIVIL_CODE_URL },
              " prévoit que le conseil fixe chaque année la contribution aux charges communes après consultation de l'assemblée. La consultation est réelle et doit permettre questions et observations, mais elle n'est pas automatiquement un vote donnant à l'assemblée un droit de veto sur le budget.",
            ],
            "Le conseil demeure responsable d'adopter une contribution suffisante, y compris les versements recommandés à l'étude. Une majorité opposée à une hausse ne permet pas d'ignorer les besoins documentés de l'immeuble. La déclaration de copropriété peut toutefois imposer des étapes supplémentaires qu'il faut vérifier.",
            "Une contribution spéciale exige elle aussi une consultation préalable de l'assemblée en vertu de l'article 1072.1. Distinguez clairement une hausse annuelle récurrente, un rattrapage du fonds et un appel spécial lié à un projet précis.",
          ],
        },
        {
          heading: "Comment présenter l'étude pour obtenir une discussion utile ?",
          paragraphs: [
            "Commencez par le bâtiment, pas par le montant : quelles composantes approchent leur fin de vie, quel risque crée un report et quels travaux peuvent être regroupés. Montrez ensuite un scénario conforme aux recommandations et, si le professionnel le permet, des variantes de calendrier avec leur coût total et leur risque.",
            "Pour chaque scénario, affichez la contribution mensuelle moyenne, l'effet par quote-part, le solde annuel projeté et les années où le fonds atteint son point bas. Ne promettez pas qu'une projection sur 25 ans sera exacte : le carnet est mis à jour chaque année et l'étude est renouvelée tous les cinq ans.",
            "Consignez au procès-verbal les documents présentés, les questions, les recommandations professionnelles et les motifs de la décision. Après la première étude, le conseil fixe les versements dans les 30 jours suivant l'assemblée. Un avis individuel indique ensuite à chaque copropriétaire le montant et les dates d'exigibilité.",
          ],
        },
      ],
    },
    en: {
      category: "Reserve Fund",
      date: "September 2026",
      title: "How to present a condo reserve fund study at the owners' meeting",
      metaTitle: "Presenting a condo reserve fund study at the AGM",
      excerpt:
        "A clear method for turning a 25-year study into understandable decisions, contributions, and owner communication.",
      brief:
        "A reserve fund study should not be dropped on owners as an unreadable technical report. Before the meeting, the board must make it available, connect the 25-year work plan to the annual budget, and explain contribution scenarios. Owners are consulted; the board then sets the contributions and records the reasons for its decision.",
      sections: [
        {
          heading: "Which documents should be prepared before the meeting?",
          paragraphs: [
            [
              "Quebec's ",
              { text: "Law 16 co-ownership regulation", to: QUEBEC_CONDO_RULES_URL },
              " requires the board to make the maintenance log and study available within 60 days after production, or before the annual meeting if it occurs sooner. Send a readable summary with the full report, not merely a contribution number.",
            ],
            "The meeting package should reconcile five items: current fund balance, recommended opening balance, recommended annual deposit, work planned for the next five years, and the 25-year trajectory. Include the professional's assumptions for inflation, fees, taxes, and investment return.",
            "The annual meeting notice must include the balance sheet, income statement, statement of debts and receivables, forecast budget, and a note about proposed contracts and work. If the study materially changes fees, include a per-unit table and explain the variance from the previous budget.",
          ],
        },
        {
          heading: "Who decides the contributions: the owners or the board?",
          paragraphs: [
            [
              "Article 1072 of the ",
              { text: "Civil Code of Québec", to: CIVIL_CODE_URL },
              " says the board annually sets common-expense contributions after consulting the owners' meeting. Consultation must allow meaningful questions and observations, but it is not automatically a vote giving the meeting a veto over the budget.",
            ],
            "The board remains responsible for setting sufficient contributions, including the deposits recommended by the study. Owner opposition to an increase does not permit directors to ignore documented building needs. The declaration of co-ownership may impose additional procedural steps and must also be checked.",
            "A special contribution likewise requires prior consultation under article 1072.1. Clearly distinguish a recurring annual increase, a reserve-fund catch-up, and a special assessment for a defined project.",
          ],
        },
        {
          heading: "How should the study be presented to produce a useful discussion?",
          paragraphs: [
            "Start with the building, not the dollar amount: which components are nearing end of life, what risk a delay creates, and which projects can be coordinated. Then show a scenario following the recommendations and, where the professional supports them, scheduling alternatives with their total cost and risk.",
            "For each scenario, show the average monthly contribution, impact by fractional share, projected annual balance, and years when the fund reaches its low point. Do not imply that a 25-year projection is exact: the log is updated annually and the study is renewed every five years.",
            "Record the documents presented, questions, professional recommendations, and reasons for the board's decision in the minutes. After the first study, the board sets deposits within 30 days following the meeting. Each owner is then promptly notified of the amount and due dates.",
          ],
        },
      ],
    },
  },
  {
    slug: "budget-frais-condo-charges-communes-quebec",
    image: blogCoverPath("cover-manager-cost.webp"),
    datePublished: "2026-09-14",
    dateModified: "2026-09-14",
    fr: {
      category: "Budget de copropriété",
      date: "Septembre 2026",
      title: "Budget de copropriété : calculer les frais de condo sans déficit caché",
      metaTitle: "Budget et frais de condo au Québec : guide du CA",
      excerpt:
        "Comment bâtir les charges communes avec le budget courant, le fonds de prévoyance et le fonds d'auto assurance.",
      brief:
        "Un budget de copropriété fiable sépare trois besoins : exploitation courante, fonds de prévoyance et fonds d'auto assurance. Le conseil chiffre les contrats et risques, applique les recommandations de l'étude, consulte l'assemblée, puis répartit les contributions selon la déclaration. Un suivi mensuel évite que les déficits deviennent des appels de fonds surprises.",
      sections: [
        {
          heading: "Quels montants doivent entrer dans les frais de condo ?",
          paragraphs: [
            "Le premier bloc couvre l'exploitation : assurance du syndicat, énergie commune, entretien ménager, déneigement, ascenseurs, sécurité, administration, inspections, contrats et réparations courantes. Utilisez les renouvellements réels, les consommations récentes et une hypothèse d'inflation expliquée, plutôt qu'un simple pourcentage ajouté au budget précédent.",
            [
              "Le deuxième bloc est le ",
              { text: "fonds de prévoyance", to: "/blog/etude-fonds-prevoyance-assemblee-coproprietaires" },
              ", réservé aux réparations majeures et remplacements des parties communes. Son versement vient de l'étude, pas d'un montant arbitraire destiné à garder les frais artificiellement bas.",
            ],
            [
              "Le troisième bloc est le ",
              { text: "fonds d'auto assurance", to: "/blog/fonds-auto-assurance-copropriete-franchise-calcul" },
              ". Il doit rester liquide pour les franchises et certains dommages non couverts. Les trois blocs apparaissent ensemble dans les charges communes, mais leurs usages et leur comptabilité doivent demeurer distincts.",
            ],
          ],
        },
        {
          heading: "Comment répartir le budget entre les copropriétaires ?",
          paragraphs: [
            [
              "Selon l'article 1064 du ",
              { text: "Code civil du Québec", to: CIVIL_CODE_URL },
              ", chaque copropriétaire contribue normalement aux charges communes selon la valeur relative de sa fraction. Les utilisateurs d'une partie commune à usage restreint assument seuls son entretien et ses réparations courantes.",
            ],
            "La déclaration peut prévoir une répartition différente pour les réparations majeures et le remplacement de certaines parties communes à usage restreint. Avant de produire le tableau par unité, vérifiez les quotes-parts, les clés particulières, les stationnements, rangements et changements publiés à la déclaration.",
            "Calculez le besoin annuel de chaque bloc, soustrayez seulement les revenus réellement prévisibles, puis testez la trésorerie mois par mois. Un budget équilibré sur douze mois peut manquer de liquidités en janvier si les primes annuelles et grands contrats arrivent avant les encaissements.",
          ],
        },
        {
          heading: "Comment adopter et suivre le budget pendant l'année ?",
          paragraphs: [
            "L'avis de convocation à l'assemblée annuelle comprend les états financiers requis, les dettes et créances, le budget prévisionnel et les renseignements sur les contrats et travaux proposés. Présentez l'écart avec l'année précédente par poste, l'impact par fraction et les hypothèses qui pourraient encore changer.",
            "Le conseil fixe annuellement les contributions après consultation de l'assemblée, puis avise sans délai chaque copropriétaire du montant et des dates d'exigibilité. Une cotisation spéciale exige aussi une consultation préalable. Le procès-verbal devrait refléter les questions et les motifs, pas seulement le total adopté.",
            "Chaque mois, comparez réel et budget pour les revenus, dépenses, retards de paiement et trois soldes de fonds. Déclenchez un correctif lorsque l'écart devient structurel : renégociation d'un contrat, ajustement du calendrier ou nouvelle consultation. Reporter silencieusement une facture au fonds de prévoyance ne corrige pas un budget d'exploitation insuffisant.",
          ],
        },
      ],
    },
    en: {
      category: "Condo Budget",
      date: "September 2026",
      title: "Quebec condo budget: calculating fees without a hidden deficit",
      metaTitle: "Quebec condo budget and fees: a board guide",
      excerpt:
        "How to build common expenses from operations, reserve-fund contributions, and the self-insurance fund.",
      brief:
        "A reliable condo budget separates three needs: current operations, the reserve fund, and the self-insurance fund. The board prices contracts and risks, applies the study's recommendations, consults the owners, and allocates contributions under the declaration of co-ownership. Monthly variance tracking prevents small deficits from becoming surprise special assessments.",
      sections: [
        {
          heading: "Which amounts belong in condo fees?",
          paragraphs: [
            "The first block covers operations: syndicate insurance, common utilities, cleaning, snow removal, elevators, security, administration, inspections, contracts, and routine repairs. Use actual renewals, recent consumption, and an explained inflation assumption instead of simply adding a percentage to last year's budget.",
            [
              "The second block is the ",
              { text: "reserve fund", to: "/en/blog/etude-fonds-prevoyance-assemblee-coproprietaires" },
              ", restricted to major repairs and replacement of common portions. Its deposit comes from the study, not an arbitrary amount chosen to keep fees artificially low.",
            ],
            [
              "The third block is the ",
              { text: "self-insurance fund", to: "/en/blog/fonds-auto-assurance-copropriete-franchise-calcul" },
              ". It must remain liquid for deductibles and certain uninsured losses. The three blocks all form part of common expenses, but their use and accounting should remain distinct.",
            ],
          ],
        },
        {
          heading: "How is the budget allocated among owners?",
          paragraphs: [
            [
              "Under article 1064 of the ",
              { text: "Civil Code of Québec", to: CIVIL_CODE_URL },
              ", each owner normally contributes to common expenses according to the relative value of the fraction. Users of a restricted-use common portion alone pay its routine maintenance and repair costs.",
            ],
            "The declaration may provide a different allocation for major repairs and replacement of certain restricted-use common portions. Before producing the unit schedule, verify fractional shares, special allocation keys, parking, storage, and every published amendment to the declaration.",
            "Calculate each block's annual requirement, subtract only reasonably predictable income, and test cash flow month by month. A budget balanced over twelve months can still run short in January if annual premiums and major contracts fall due before fee receipts accumulate.",
          ],
        },
        {
          heading: "How should the budget be adopted and monitored during the year?",
          paragraphs: [
            "The annual meeting notice includes the required financial statements, debts and receivables, forecast budget, and information on proposed contracts and work. Show each line's variance from the previous year, the impact by fraction, and assumptions that may still change.",
            "The board annually sets contributions after consulting the owners, then promptly notifies each owner of the amount and due dates. A special contribution also requires prior consultation. The minutes should record material questions and reasons, not merely the total set.",
            "Every month, compare actual and budgeted income, expenses, arrears, and the three fund balances. Correct structural variances through contract changes, schedule adjustments, or another consultation. Quietly charging an operating invoice to the reserve fund does not fix an inadequate operating budget.",
          ],
        },
      ],
    },
  },
  {
    slug: "fonds-auto-assurance-copropriete-franchise-calcul",
    image: blogCoverPath("cover-law141.webp"),
    datePublished: "2026-09-14",
    dateModified: "2026-09-14",
    fr: {
      category: "Assurance copropriété",
      date: "Septembre 2026",
      title: "Fonds d'auto assurance en copropriété : franchise, calcul et dégâts d'eau",
      metaTitle: "Fonds d'auto assurance : franchise et calcul",
      excerpt:
        "La formule québécoise, les franchises exclues et les contrôles à faire avant le renouvellement d'assurance.",
      brief:
        "Le fonds d'auto assurance appartient au syndicat et doit rester liquide. Il paie les franchises de l'assurance collective et certains dommages non couverts. Sa contribution minimale annuelle dépend de la capitalisation existante et de la franchise la plus élevée, sauf celles pour tremblement de terre et inondation. La prime d'assurance n'est pas la franchise.",
      sections: [
        {
          heading: "À quoi sert le fonds d'auto assurance ?",
          paragraphs: [
            [
              "L'article 1071.1 du ",
              { text: "Code civil du Québec", to: CIVIL_CODE_URL },
              " oblige le syndicat à constituer un fonds liquide et disponible à court terme. Il sert d'abord à payer les franchises des assurances du syndicat. Il peut aussi couvrir certains dommages aux biens assurables du syndicat lorsque ni une indemnité ni le fonds de prévoyance ne peuvent y pourvoir.",
            ],
            "Ce fonds n'est ni la police, ni la prime, ni le fonds de prévoyance. La prime est le prix payé à l'assureur; la franchise est la portion du sinistre qui reste à la charge du syndicat. Le fonds de prévoyance, lui, finance les réparations majeures et remplacements planifiés des parties communes.",
            "Les dégâts d'eau sont souvent le risque opérationnel le plus visible, mais le conseil doit lire le tableau complet des franchises. Une fuite, un refoulement et une inondation peuvent relever de protections et de franchises différentes. Le calcul légal ne consiste donc pas à choisir automatiquement la ligne « dégâts d'eau ».",
          ],
        },
        {
          heading: "Comment calculer la contribution minimale annuelle ?",
          paragraphs: [
            [
              "Le ",
              { text: "Règlement sur l'assurance des copropriétés divises", to: SELF_INSURANCE_REGULATION_URL },
              " utilise la plus haute franchise des assurances du syndicat, sans tenir compte des franchises de tremblement de terre et d'inondation. Le calcul est refait chaque année au moment où les sommes du fonds de prévoyance sont déterminées.",
            ],
            "Si le fonds capitalisé est inférieur ou égal à la moitié de cette franchise, la contribution minimale est égale à la moitié de la franchise. S'il dépasse la moitié sans atteindre la franchise complète, la contribution correspond à la différence entre la franchise et le fonds. Lorsque le fonds atteint ou dépasse la franchise, aucune contribution minimale n'est exigée pour cette année.",
            "Si la formule ferait dépasser 100 000 $ de capitalisation, la contribution peut être réduite afin que le fonds atteigne au moins 100 000 $. Il s'agit d'un plancher réglementaire, pas forcément du bon niveau de risque : l'article 1071.1 prévoit aussi un montant additionnel raisonnable pour les autres paiements auxquels le fonds est affecté.",
          ],
        },
        {
          heading: "Quels contrôles faire au budget et après un sinistre ?",
          paragraphs: [
            "À chaque renouvellement, demandez à l'assureur ou au courtier la police complète, les avenants et un tableau des franchises par risque. Notez tout changement de franchise, particulièrement pour les fuites et débordements d'eau, puis recalculez la contribution avec le solde bancaire réel du fonds.",
            "Gardez le fonds dans un compte distinct ou, au minimum, dans une comptabilité distincte, liquide et traçable. Le budget devrait montrer le solde d'ouverture, les contributions, les retraits, le minimum réglementaire et la cible prudente retenue par le conseil. Expliquez aux copropriétaires pourquoi une prime stable peut coexister avec une franchise plus élevée.",
            [
              "Après un sinistre, documentez la franchise payée, les dommages non indemnisés et l'autorisation du retrait, puis établissez un plan de reconstitution au budget suivant. Reliez ce suivi à la ",
              { text: "préparation des frais de condo", to: "/blog/budget-frais-condo-charges-communes-quebec" },
              " et aux mesures de prévention des dégâts d'eau.",
            ],
          ],
        },
      ],
    },
    en: {
      category: "Condo Insurance",
      date: "September 2026",
      title: "Quebec condo self-insurance fund: deductibles, calculation, and water damage",
      metaTitle: "Condo self-insurance fund: deductible calculation",
      excerpt:
        "Quebec's contribution formula, excluded deductibles, and the controls to perform before insurance renewal.",
      brief:
        "The self-insurance fund belongs to the syndicate and must remain liquid. It pays the collective policy's deductibles and certain uninsured losses. Its minimum annual contribution depends on current capitalization and the highest deductible, excluding earthquake and flood deductibles. The insurance premium is not the deductible and does not determine the fund target.",
      sections: [
        {
          heading: "What is the condo self-insurance fund for?",
          paragraphs: [
            [
              "Article 1071.1 of the ",
              { text: "Civil Code of Québec", to: CIVIL_CODE_URL },
              " requires the syndicate to maintain a liquid fund available on short notice. It first pays deductibles under the syndicate's insurance. It may also cover certain damage to property in which the syndicate has an insurable interest when neither insurance proceeds nor the reserve fund can cover it.",
            ],
            "This fund is not the policy, premium, or reserve fund. The premium is the price paid to the insurer; the deductible is the portion of an insured loss left to the syndicate. The reserve fund finances planned major repairs and replacement of common portions.",
            "Water damage is often the most visible operational risk, but the board must read the full deductible schedule. Leakage, sewer backup, and flooding may fall under different coverage and deductibles. The legal calculation is not simply whichever line happens to say water damage.",
          ],
        },
        {
          heading: "How is the minimum annual contribution calculated?",
          paragraphs: [
            [
              "Quebec's ",
              { text: "divided co-ownership insurance regulation", to: SELF_INSURANCE_REGULATION_URL },
              " uses the highest deductible under the syndicate's policies, excluding earthquake and flood deductibles. The calculation is performed annually when reserve-fund deposits are determined.",
            ],
            "If fund capitalization is less than or equal to one-half of that deductible, the minimum contribution equals one-half of the deductible. If capitalization is above one-half but below the full deductible, the contribution is the difference between the deductible and the fund. Once capitalization meets or exceeds the deductible, no minimum contribution is required that year.",
            "Where the formula would push capitalization above $100,000, the contribution may be reduced so the fund reaches at least $100,000. This is a regulatory floor, not necessarily the appropriate risk target: article 1071.1 also calls for a reasonable additional amount for the fund's other permitted payments.",
          ],
        },
        {
          heading: "Which controls belong in the budget and post-claim process?",
          paragraphs: [
            "At every renewal, obtain the complete policy, endorsements, and a deductible schedule by peril from the insurer or broker. Record every deductible change, especially for water leakage and overflow, then recalculate the contribution using the fund's actual bank balance.",
            "Keep the fund in a separate account or, at minimum, separate and traceable accounting. The budget should show opening balance, deposits, withdrawals, the regulatory minimum, and the board's prudent target. Explain why a stable premium can still accompany a higher deductible.",
            [
              "After a claim, document the deductible paid, uninsured damage, and authorization for each withdrawal, then establish a replenishment plan in the next budget. Connect this work to ",
              { text: "condo-fee preparation", to: "/en/blog/budget-frais-condo-charges-communes-quebec" },
              " and water-damage prevention measures.",
            ],
          ],
        },
      ],
    },
  },
] satisfies BlogPost[];
