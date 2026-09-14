import { blogCoverPath } from "../lib/blogImages";
import type { BlogPost } from "./blog";

const TAL_FILING_URL =
  "https://www.tal.gouv.qc.ca/fr/votre-demande-en-ligne/depot-d-une-demande-au-tribunal";
const TAL_NON_PAYMENT_URL =
  "https://www.tal.gouv.qc.ca/fr/etre-locataire/paiement-du-loyer";
const TAL_DAMAGE_CLAIM_URL =
  "https://www.tal.gouv.qc.ca/fr/formulaires-de-demande-au-tribunal/demande-en-indemnit%C3%A9-de-relocation-et-dommages";
const CIVIL_CODE_URL =
  "https://www.legisquebec.gouv.qc.ca/fr/document/lc/CCQ-1991?langCont=fr";
const CAI_LEASE_URL =
  "https://www.cai.gouv.qc.ca/protection-renseignements-personnels/sujets-et-domaines-dinteret/signature-bail";
const SOQUIJ_URL = "https://citoyens.soquij.qc.ca/";
const CECQ_URL = "https://enquetesquebec.net/cecq/";
const BSP_URL = "https://www.bspquebec.ca/fr";
const GJQ_URL = "https://gjq.ca/loyers-impayes/";

export const tenantRiskBlogPosts = [
  {
    slug: "dossier-tal-proprietaire-liste-documents-preuves",
    image: blogCoverPath("cover-lease.webp"),
    datePublished: "2026-09-14",
    dateModified: "2026-09-14",
    fr: {
      category: "Guide TAL",
      date: "Septembre 2026",
      title: "Dossier TAL du propriétaire : liste complète des documents et preuves",
      metaTitle: "Dossier TAL : documents et preuves du propriétaire",
      excerpt:
        "La liste pratique pour préparer, déposer, notifier et présenter un dossier de propriétaire au Tribunal administratif du logement.",
      brief:
        "Un dossier TAL solide relie chaque somme et chaque événement à une preuve datée : bail, registre des loyers, échanges, avis, photos, factures et témoins. Après l'ouverture, la demande doit être notifiée et la preuve de notification ainsi que la liste des pièces doivent être déposées dans le délai indiqué par le Tribunal.",
      sections: [
        {
          heading: "Quels documents réunir avant d'ouvrir un dossier au TAL ?",
          paragraphs: [
            "Préparez le bail complet et ses annexes, les renouvellements ou avis de modification, l'identité et les coordonnées exactes de chaque partie, l'adresse du logement, puis une chronologie courte des faits. Pour un dossier financier, ajoutez un registre mois par mois indiquant le loyer exigible, les paiements reçus, les soldes et la méthode utilisée pour calculer la réclamation.",
            "Joignez seulement les preuves utiles : relevés ou reçus de paiement, chèques refusés, courriels et textos pertinents, mises en demeure et preuves de livraison, photos datées, états des lieux d'entrée et de sortie, rapports d'entrepreneur, factures, estimations et coordonnées des témoins. Conservez les originaux et préparez des copies lisibles dans le même ordre que votre liste de pièces.",
            "Si l'immeuble appartient à plusieurs personnes, identifiez le locateur inscrit au bail et chaque demandeur nécessaire. Le service en ligne standard vise une demande signée par un seul demandeur; une demande exigeant plusieurs signatures doit généralement utiliser le format PDF prévu par le TAL. Une société, une succession, une fiducie ou un syndicat doit aussi confirmer qui est légalement autorisé à signer et agir.",
          ],
        },
        {
          heading: "Que faut-il faire après le dépôt de la demande ?",
          paragraphs: [
            [
              "Consultez la page officielle du ",
              { text: "dépôt d'une demande au TAL", to: TAL_FILING_URL },
              ". Le Tribunal transmet ensuite un exemplaire portant le numéro de dossier. Cet exemplaire doit être notifié à l'autre partie; gardez le rapport d'huissier, le reçu de courrier recommandé ou toute autre preuve de notification permise.",
            ],
            "Pour une demande en ligne, le TAL indique que la preuve de notification et la liste des pièces au soutien de la demande doivent être versées au dossier dans les 45 jours suivant l'introduction de la demande. Respectez aussi toute directive particulière inscrite sur votre accusé de réception, votre avis d'audience ou une ordonnance du Tribunal.",
            "Une liste de pièces n'est pas la preuve elle-même. Numérotez chaque document, décrivez-le clairement, déposez-le selon la méthode autorisée et assurez-vous que l'autre partie en reçoit copie lorsque les règles l'exigent. Vérifiez le dossier en ligne avant l'audience pour repérer rapidement un document refusé ou manquant.",
          ],
        },
        {
          heading: "Comment rendre la preuve facile à comprendre à l'audience ?",
          paragraphs: [
            "Présentez une histoire vérifiable plutôt qu'une pile de documents : date, obligation, manquement, communication, conséquence et montant réclamé. Faites correspondre chaque ligne de votre tableau financier à une pièce. Pour les dommages, distinguez le coût réel, les travaux déjà payés et les estimations, puis expliquez pourquoi chaque dépense découle du manquement reproché.",
            "Le demandeur demeure responsable de sa preuve et de la formulation de ses conclusions. Les documents requis varient selon qu'il s'agit de loyer impayé, de dommages, de résiliation, d'accès au logement ou d'une autre demande. Cette liste est un outil de préparation générale, pas un avis juridique; en cas de doute important, consultez le TAL, un avocat ou un notaire avant l'audience.",
          ],
        },
      ],
    },
    en: {
      category: "TAL Guide",
      date: "September 2026",
      title: "Landlord TAL file: the complete document and evidence checklist",
      metaTitle: "TAL file: landlord documents and evidence",
      excerpt:
        "A practical checklist for preparing, filing, notifying, and presenting a landlord's case before Quebec's housing tribunal.",
      brief:
        "A strong TAL file connects every amount and event to dated evidence: the lease, rent ledger, messages, notices, photographs, invoices, and witnesses. After filing, the application must be notified, and proof of notification plus the exhibit list must be filed within the time stated by Quebec's housing tribunal.",
      sections: [
        {
          heading: "Which documents should a landlord collect before filing at the TAL?",
          paragraphs: [
            "Prepare the complete lease and schedules, renewals or modification notices, the exact identity and contact information of every party, the rental address, and a short chronology. For a financial case, include a month-by-month ledger showing rent due, payments received, balances, and how the amount claimed was calculated.",
            "Attach only useful evidence: payment records or receipts, returned cheques, relevant emails and texts, demand letters and delivery proof, dated photographs, move-in and move-out reports, contractor reports, invoices, estimates, and witness contact information. Keep the originals and arrange readable copies in the same order as the exhibit list.",
            "Where several people own the property, identify the landlord named in the lease and every required applicant. The standard online service is intended for an application signed by one applicant; matters requiring several applicant signatures generally use the TAL's PDF process. A corporation, estate, trust, or condo syndicate must also confirm who is legally authorized to sign and act.",
          ],
        },
        {
          heading: "What must happen after the application is filed?",
          paragraphs: [
            [
              "Consult the TAL's official ",
              { text: "application-filing instructions", to: TAL_FILING_URL },
              ". The Tribunal then sends a copy bearing the file number. That copy must be notified to the other party; retain the bailiff's report, registered-mail receipt, or other permitted proof of notification.",
            ],
            "For an online application, the TAL says proof of notification and the list of supporting exhibits must be placed in the file within 45 days after the application is introduced. Follow any additional direction printed on the acknowledgement, hearing notice, or Tribunal order.",
            "An exhibit list is not the evidence itself. Number and describe each document, file it through an accepted method, and provide it to the other party when the rules require. Check the online docket before the hearing so a rejected or missing item can be corrected early.",
          ],
        },
        {
          heading: "How do you make the evidence easy to follow at the hearing?",
          paragraphs: [
            "Present a verifiable sequence instead of a document pile: date, obligation, breach, communication, consequence, and amount claimed. Match each line in the financial ledger to an exhibit. For damage, separate actual cost, work already paid, and estimates, then explain why each expense resulted from the alleged breach.",
            "The applicant remains responsible for the evidence and the remedy requested. Required documents vary for unpaid rent, damage, lease termination, access, and other applications. This checklist is general preparation information, not legal advice; consult the TAL or a Quebec legal professional when the facts or amount make the choice of procedure uncertain.",
          ],
        },
      ],
    },
  },
  {
    slug: "non-paiement-loyer-tal-deuxieme-chance-recours",
    image: blogCoverPath("cover-rent-increase.webp"),
    datePublished: "2026-09-14",
    dateModified: "2026-09-14",
    fr: {
      category: "Guide TAL",
      date: "Septembre 2026",
      title: "Loyer impayé au TAL : jugement, deuxième chance et nouvelle demande",
      metaTitle: "Loyer impayé au TAL : jugement et deuxième recours",
      excerpt:
        "Ce qui arrive réellement après un non-paiement : recouvrement, résiliation, paiement avant jugement et récidive.",
      brief:
        "Dès le lendemain de l'échéance, le loyer est en défaut. Après plus de trois semaines, le locateur peut aussi demander la résiliation et l'expulsion. Mais le paiement complet avant jugement peut éviter la résiliation, et certaines décisions accordent un sursis conditionnel : il faut donc lire les conclusions exactes avant d'agir.",
      sections: [
        {
          heading: "Quand le propriétaire peut-il ouvrir un dossier pour non-paiement ?",
          paragraphs: [
            [
              "Selon le ",
              { text: "Tribunal administratif du logement", to: TAL_NON_PAYMENT_URL },
              ", le locataire est en défaut dès le lendemain de la date convenue si le loyer complet n'est pas reçu. Le locateur peut alors réclamer le loyer, les intérêts et les frais. Lorsque le retard dépasse trois semaines, il peut également demander la résiliation du bail et l'expulsion des occupants.",
            ],
            "Le choix des conclusions est important. Une demande limitée au paiement vise le recouvrement; elle ne produit pas automatiquement une expulsion. Si la résiliation est recherchée, elle doit être demandée et appuyée par les faits applicables. Pour des retards fréquents plutôt qu'un seul arriéré de plus de trois semaines, le locateur doit aussi démontrer un préjudice sérieux.",
            "Déposez rapidement une demande complète, mais n'annoncez jamais une date d'expulsion ou un délai d'audience garanti. La mise au rôle varie selon la catégorie, la région, les urgences et le dossier. Continuez à tenir le registre des sommes exigibles et reçues pendant l'attente.",
          ],
        },
        {
          heading: "Quelle est la « deuxième chance » du locataire ?",
          paragraphs: [
            "La règle la plus courante est le paiement avant jugement : le locataire peut éviter la résiliation en payant le loyer dû, les frais et les intérêts avant que la décision soit rendue. Le dossier ne doit donc pas être présenté comme une expulsion automatique dès son ouverture.",
            [
              "Le ",
              { text: "Code civil du Québec", to: CIVIL_CODE_URL },
              " prévoit aussi des mécanismes dont l'application dépend du jugement, notamment une exécution suspendue sous conditions dans certaines situations. Le locateur doit lire les conclusions mot pour mot : une condamnation à payer, une résiliation immédiate et une résiliation dont l'exécution est suspendue n'ont pas les mêmes suites.",
            ],
            "Si une décision conditionnelle impose le paiement ponctuel et que le locataire manque ensuite à cette condition, le propriétaire doit généralement retourner devant le TAL selon le recours prévu par la décision et la loi. Il peut donc y avoir une seconde démarche et un nouveau délai, mais ce n'est ni automatique ni identique dans tous les dossiers.",
          ],
        },
        {
          heading: "Comment limiter les mois de pertes pendant la procédure ?",
          paragraphs: [
            "Conservez un grand livre à jour, les preuves de chaque tentative de paiement, les communications et tout préjudice causé par les retards répétés. Mettez à jour la réclamation lorsque la procédure le permet et apportez un calcul clair à l'audience. Une entente de paiement doit être écrite, datée et préciser sans ambiguïté son effet sur le dossier ouvert.",
            "Après une résiliation et un départ, le locateur peut réclamer certaines pertes découlant du manquement, mais il doit limiter son préjudice en cherchant raisonnablement un nouveau locataire. Ne changez pas les serrures et ne reprenez pas le logement simplement parce qu'un paiement manque : l'exécution d'une expulsion suit le jugement et les règles applicables.",
            "Ce contenu expose les principales branches du processus et ne remplace pas l'analyse d'une décision. Pour savoir s'il faut une nouvelle demande, une exécution par huissier ou une autre procédure, faites vérifier le dispositif du jugement et l'état du dossier.",
          ],
        },
      ],
    },
    en: {
      category: "TAL Guide",
      date: "September 2026",
      title: "Unpaid rent at the TAL: judgment, second chance, and repeat application",
      metaTitle: "Unpaid rent at the TAL: judgment and repeat claim",
      excerpt:
        "What actually follows non-payment: recovery, termination, payment before judgment, and a later default.",
      brief:
        "Rent is in default the day after it is due. After more than three weeks, the landlord may also seek lease termination and eviction. Full payment before judgment can prevent termination, however, and some decisions impose conditional relief. The exact operative terms of the judgment must be read before taking the next step.",
      sections: [
        {
          heading: "When can a landlord file an unpaid-rent case?",
          paragraphs: [
            [
              "According to Quebec's ",
              { text: "Tribunal administratif du logement", to: TAL_NON_PAYMENT_URL },
              ", the tenant is in default the day after the agreed due date if full rent has not been received. The landlord may claim rent, interest, and filing costs. Once arrears exceed three weeks, the landlord may also request lease termination and eviction of the occupants.",
            ],
            "The remedy requested matters. A payment-only application seeks recovery and does not automatically produce an eviction. Termination must be requested and supported by the applicable facts. For frequent late payments rather than one arrear exceeding three weeks, the landlord must also prove serious prejudice.",
            "File a complete application promptly, but never promise a fixed hearing or eviction date. Scheduling varies by case category, region, urgency, and the state of the docket. Continue recording every amount due and received while waiting.",
          ],
        },
        {
          heading: "What is the tenant's so-called second chance?",
          paragraphs: [
            "The most common rule is payment before judgment: a tenant can prevent termination by paying all rent due, costs, and interest before the decision is rendered. Opening a non-payment file therefore does not itself guarantee eviction.",
            [
              "The ",
              { text: "Civil Code of Québec", to: CIVIL_CODE_URL },
              " also provides mechanisms whose application depends on the judgment, including suspended execution subject to conditions in some circumstances. Read the operative terms word for word: an order to pay, immediate termination, and termination with suspended execution lead to different next steps.",
            ],
            "If a conditional decision requires on-time payment and the tenant later breaches that condition, the landlord generally has to return to the TAL using the remedy provided by the judgment and the law. A second proceeding and another wait may therefore be required, but that outcome is neither automatic nor identical in every file.",
          ],
        },
        {
          heading: "How can the landlord limit losses while the case is pending?",
          paragraphs: [
            "Keep the rent ledger current, retain proof of every attempted payment, save communications, and document serious prejudice caused by repeated delays. Update the amount claimed when procedure permits and bring a transparent calculation to the hearing. Any payment plan should be written, dated, and explicit about its effect on the existing case.",
            "After termination and departure, some losses resulting from the breach may be claimed, but the landlord must mitigate by making reasonable efforts to re-rent. Do not change locks or take possession merely because rent is unpaid: eviction enforcement follows a judgment and the applicable execution rules.",
            "This article outlines the main procedural branches and cannot replace review of a specific decision. Have the operative terms and current docket checked before deciding whether the next step is a further TAL application, bailiff enforcement, or another remedy.",
          ],
        },
      ],
    },
  },
  {
    slug: "retrouver-locataire-parti-sans-adresse-enquete-civile",
    image: blogCoverPath("cover-req-neq.webp"),
    datePublished: "2026-09-14",
    dateModified: "2026-09-14",
    fr: {
      category: "Recouvrement",
      date: "Septembre 2026",
      title: "Retrouver un locataire parti sans laisser d'adresse au Québec",
      metaTitle: "Retrouver un locataire parti sans adresse au Québec",
      excerpt:
        "Comment documenter le départ, chercher une adresse légalement et notifier une réclamation au bon débiteur.",
      brief:
        "Un locataire introuvable ne fait pas disparaître la dette, mais une réclamation doit viser la bonne personne et être notifiée correctement. Avant de mandater un enquêteur, confirmez le départ, rassemblez les identifiants déjà obtenus légalement et définissez le but précis de la recherche. Vérifiez toujours le permis, les frais et l'usage des données.",
      sections: [
        {
          heading: "Que faire dès que le locataire semble avoir quitté ?",
          paragraphs: [
            "Ne concluez pas à l'abandon sur un seul indice. Documentez les loyers impayés, les tentatives de contact, les clés remises, les témoignages, l'état des services et tout message annonçant un départ. Avant d'entrer, de changer les serrures ou de disposer de biens, confirmez votre droit de reprendre possession; une erreur peut transformer un dossier de recouvrement en réclamation contre le propriétaire.",
            "Rassemblez les renseignements déjà détenus légalement : nom complet tel qu'il apparaît au bail, ancienne adresse, coordonnées fournies, date de naissance si elle avait été recueillie pour une fin permise, employeur ou références autorisées, numéro de dossier TAL et copie d'un jugement. Évitez d'accumuler des renseignements sans lien avec la notification ou l'exécution recherchée.",
            "Préparez aussi le montant : loyers dus, date de relocation, efforts faits pour réduire la perte, dommages distincts de l'usure normale et pièces justificatives. Une adresse retrouvée ne corrige pas une créance mal calculée.",
          ],
        },
        {
          heading: "Que fait le Centre d'Enquêtes Civiles du Québec ?",
          paragraphs: [
            [
              "Le ",
              { text: "Centre d'Enquêtes Civiles du Québec", to: CECQ_URL },
              " se présente comme un service de recherche et d'identification pour propriétaires, avocats, entreprises et organismes. Son site indique que ses enquêteurs sont enregistrés auprès du ",
              { text: "Bureau de la sécurité privée", to: BSP_URL },
              " et qu'il consulte notamment le RDPRM et SOQUIJ pour certaines recherches de débiteurs.",
            ],
            "Il s'agit d'une entreprise tierce, pas d'un service du TAL ni d'un partenaire de Gestion Velora. Avant de transmettre un dossier, vérifiez le permis actuel de l'agence ou de l'enquêteur, le mandat écrit, le coût, ce qui constitue un résultat, la politique de conservation et les renseignements qui seront communiqués. Le site du Centre indique notamment une conservation de cinq ans pour certains renseignements de recherche.",
            "Aucun dépistage ne garantit une adresse exploitable ou la solvabilité. Demandez un rapport suffisamment précis pour éviter une homonymie, mais limité aux données nécessaires à la fin légitime déclarée.",
          ],
        },
        {
          heading: "Que faire lorsqu'une nouvelle adresse est trouvée ?",
          paragraphs: [
            "Transmettez le rapport à l'huissier ou au professionnel qui prépare la notification et faites confirmer que l'adresse correspond bien au débiteur visé. Conservez le mandat, la facture et la preuve de notification : certains frais raisonnables peuvent être réclamés selon le dossier, mais ils ne sont pas automatiquement accordés.",
            "Si la recherche échoue, ne publiez pas les renseignements du locataire et ne contactez pas son entourage de façon intrusive. Un huissier ou un juriste peut évaluer la notification par un autre mode, une demande au Tribunal ou l'opportunité économique de poursuivre. La prescription continue de courir même lorsque le débiteur est difficile à localiser.",
          ],
        },
      ],
    },
    en: {
      category: "Debt Recovery",
      date: "September 2026",
      title: "Finding a Quebec tenant who left without a forwarding address",
      metaTitle: "Find a Quebec tenant who left no address",
      excerpt:
        "How to document the departure, search lawfully, and notify a claim to the correct debtor.",
      brief:
        "A missing tenant does not erase a debt, but a claim must identify the correct person and be properly notified. Before hiring an investigator, confirm the departure, gather identifiers that were obtained lawfully, and define the precise purpose of the search. Always verify licensing, fees, deliverables, and how personal information will be handled.",
      sections: [
        {
          heading: "What should a landlord do when the tenant appears to have left?",
          paragraphs: [
            "Do not infer abandonment from one clue. Document unpaid rent, contact attempts, returned keys, witness information, utility status, and any message announcing departure. Before entering, changing locks, or handling belongings, confirm the right to retake possession; a mistake can turn a recovery file into a claim against the landlord.",
            "Gather information already held lawfully: the full name shown on the lease, former address, supplied contact details, date of birth if collected for a permitted purpose, authorized employment or landlord references, TAL file number, and any judgment. Do not accumulate information unrelated to the notification or enforcement purpose.",
            "Prepare the amount as well: rent due, re-rental date, mitigation efforts, damage beyond ordinary wear, and supporting records. Finding an address does not repair a poorly documented claim.",
          ],
        },
        {
          heading: "What does the Centre d'Enquêtes Civiles du Québec offer?",
          paragraphs: [
            [
              "The ",
              { text: "Centre d'Enquêtes Civiles du Québec", to: CECQ_URL },
              " presents itself as a search and identification service for landlords, lawyers, businesses, and public bodies. Its website says its investigators are registered with Quebec's ",
              { text: "Bureau de la sécurité privée", to: BSP_URL },
              " and that certain debtor searches draw on databases including the RDPRM and SOQUIJ.",
            ],
            "This is a third-party business, not part of the TAL and not a Gestion Velora partner. Before sending a file, verify the agency or investigator's current licence, written mandate, price, definition of a successful result, retention policy, and information to be disclosed. The Centre's website says some search information is retained for five years.",
            "No trace guarantees a usable address or solvency. Ask for enough detail to prevent a mistaken identity while limiting the report to information necessary for the stated legitimate purpose.",
          ],
        },
        {
          heading: "What happens after a new address is found?",
          paragraphs: [
            "Give the report to the bailiff or professional arranging notification and confirm that the address belongs to the debtor in question. Keep the mandate, invoice, and notification proof. Some reasonable expenses may be recoverable depending on the proceeding, but they are not automatically awarded.",
            "If the search fails, do not publish the tenant's information or pressure unrelated family and contacts. A bailiff or legal professional can assess alternative notification, a Tribunal application, and whether further recovery is economical. Limitation periods continue to matter even when a debtor is difficult to locate.",
          ],
        },
      ],
    },
  },
  {
    slug: "vendre-creance-loyer-impaye-gjq",
    image: blogCoverPath("cover-noi-data.webp"),
    datePublished: "2026-09-14",
    dateModified: "2026-09-14",
    fr: {
      category: "Recouvrement",
      date: "Septembre 2026",
      title: "Vendre une créance de loyer impayé à GJQ : ce qu'il faut vérifier",
      metaTitle: "Vendre une créance de loyer impayé à GJQ",
      excerpt:
        "La cession de créance expliquée : offre, documents, transfert du recouvrement et points à comparer avant de signer.",
      brief:
        "GJQ annonce acheter certaines créances de loyers et dommages afin d'en prendre le recouvrement. Le propriétaire reçoit une offre plutôt que d'attendre l'exécution complète, mais cède normalement une partie de la valeur potentielle. Avant de signer, il faut vérifier l'admissibilité, le prix net, les garanties et le transfert des renseignements.",
      sections: [
        {
          heading: "Quelle différence entre vendre une créance et mandater un recouvrement ?",
          paragraphs: [
            "Une agence de recouvrement agit généralement pour le créancier et lui remet les sommes récupérées selon le contrat. Dans une cession, le créancier transfère plutôt ses droits au cessionnaire contre un prix convenu. Le prix peut être inférieur au solde nominal parce que l'acheteur assume le délai, le coût, l'insolvabilité possible et le risque d'échec.",
            "La cession peut libérer du temps et stabiliser une perte, mais elle réduit aussi le contrôle du propriétaire sur le dossier. Lisez qui devient propriétaire de la créance, quelles communications peuvent être faites au débiteur, si le cédant doit collaborer plus tard et dans quelles situations l'acheteur peut réclamer un remboursement.",
            "Une dette alléguée, un dossier TAL ouvert et un jugement exécutoire n'ont pas la même valeur ni les mêmes moyens d'exécution. Décrivez exactement l'étape atteinte; ne présentez jamais une réclamation contestée comme un jugement définitif.",
          ],
        },
        {
          heading: "Que propose Gestion Jugements Québec pour les loyers impayés ?",
          paragraphs: [
            [
              "Sur sa page consacrée aux ",
              { text: "loyers impayés", to: GJQ_URL },
              ", Gestion Jugements Québec affirme acquérir certains dossiers de loyers et de dommages, y compris lorsqu'un locataire a quitté en cours de bail. L'entreprise présente son offre comme une solution de cession plutôt qu'un simple mandat confié à une agence ou à un huissier.",
            ],
            "Cette description provient de GJQ elle-même. Elle ne garantit pas que votre dossier sera accepté, le montant offert, le délai de paiement ni le résultat du recouvrement. Demandez une proposition écrite et comparez-la au montant net probable d'une exécution personnelle, après honoraires, temps, risque et solvabilité.",
            "Gestion Velora ne reçoit aucune commission pour cette référence et ne garantit pas les services de GJQ. Le lien est fourni comme piste à évaluer lorsque le propriétaire souhaite convertir une créance incertaine en paiement immédiat partiel.",
          ],
        },
        {
          heading: "Quelle liste vérifier avant de céder la dette ?",
          paragraphs: [
            "Préparez le bail, le grand livre, la preuve du départ ou des dommages, les factures, la demande TAL, la décision et la preuve de notification ou d'exécution disponible. Vérifiez ensuite le prix net, les frais, les taxes, le moment du paiement, les déclarations exigées, les garanties de validité et de solvabilité, toute clause de rachat, la confidentialité et la manière d'aviser le débiteur de la cession.",
            "Faites confirmer que vous pouvez légalement communiquer chaque renseignement transmis et utilisez un canal sécurisé. Conservez une copie du contrat de cession et mettez à jour votre comptabilité pour éviter qu'un ancien mandataire continue de réclamer la même somme.",
            "Pour une créance élevée, contestée ou proche de la prescription, obtenez un avis juridique et comptable avant la signature. Le meilleur choix peut être la vente, l'exécution par huissier, une entente, une agence de recouvrement ou l'abandon économique du dossier; aucune option n'est toujours supérieure.",
          ],
        },
      ],
    },
    en: {
      category: "Debt Recovery",
      date: "September 2026",
      title: "Selling an unpaid-rent claim to GJQ: what landlords should verify",
      metaTitle: "Selling an unpaid-rent claim to GJQ",
      excerpt:
        "Claim assignment explained: offer, documents, transfer of recovery, and the terms to compare before signing.",
      brief:
        "GJQ advertises the purchase of certain unpaid-rent and property-damage claims so it can handle recovery. The landlord receives an offer instead of waiting for full enforcement, but normally gives up part of the claim's potential value. Eligibility, net price, warranties, and personal-information transfer should all be checked before signing.",
      sections: [
        {
          heading: "How is selling a claim different from hiring a collection agency?",
          paragraphs: [
            "A collection agency generally acts for the creditor and remits recovered funds according to its contract. In an assignment, the creditor instead transfers its rights to a purchaser for an agreed price. That price may be below the face balance because the buyer assumes delay, cost, possible insolvency, and failure risk.",
            "Assignment can save time and crystallize a loss, but it also reduces the landlord's control. Read who becomes the claim owner, what communication may be made to the debtor, whether the seller must assist later, and when the purchaser can demand repayment from the seller.",
            "An alleged debt, an open TAL application, and an enforceable judgment have different value and remedies. Describe the exact procedural stage and never present a disputed claim as a final judgment.",
          ],
        },
        {
          heading: "What does Gestion Jugements Québec advertise for unpaid rent?",
          paragraphs: [
            [
              "On its ",
              { text: "unpaid-rent page", to: GJQ_URL },
              ", Gestion Jugements Québec says it purchases certain rent and damage files, including cases where a tenant left during the lease. The company presents the offer as an assignment rather than a collection mandate given to an agency or bailiff.",
            ],
            "That description comes from GJQ itself. It does not guarantee acceptance, an offer amount, payment timing, or successful collection. Request a written proposal and compare it with the likely net result of self-directed enforcement after fees, time, risk, and debtor solvency.",
            "Gestion Velora receives no referral fee and does not guarantee GJQ's services. The link is provided as one option to evaluate when a landlord prefers a partial immediate payment over holding an uncertain receivable.",
          ],
        },
        {
          heading: "What should be checked before assigning the debt?",
          paragraphs: [
            "Prepare the lease, ledger, departure or damage proof, invoices, TAL application, decision, and available notification or enforcement records. Then verify net price, fees, taxes, payment timing, required representations, validity and solvency warranties, repurchase clauses, confidentiality, and how the debtor will be notified of assignment.",
            "Confirm that each piece of personal information may lawfully be disclosed and use a secure channel. Keep the assignment agreement and update the accounting records so a former agent does not continue pursuing the same amount.",
            "For a large, disputed, or nearly prescribed claim, obtain legal and accounting advice before signing. The rational choice may be sale, bailiff enforcement, settlement, an agency mandate, or economic write-off; no one option is best for every file.",
          ],
        },
      ],
    },
  },
  {
    slug: "locataire-quitte-sans-avis-logement-endommage",
    image: blogCoverPath("cover-tenant-experience.webp"),
    datePublished: "2026-09-14",
    dateModified: "2026-09-14",
    fr: {
      category: "Gestion locative",
      date: "Septembre 2026",
      title: "Locataire parti sans avis ou logement endommagé : marche à suivre",
      metaTitle: "Départ sans avis et logement endommagé : que faire ?",
      excerpt:
        "Les étapes pour sécuriser le logement, préserver la preuve, relouer rapidement et réclamer les pertes justifiées.",
      brief:
        "Lorsqu'un locataire part sans avis ou laisse des dommages, il faut d'abord confirmer la reprise de possession, protéger l'immeuble et préserver une preuve datée. L'état de sortie doit être comparé à l'état d'entrée, en séparant l'usure normale des dommages. Le propriétaire doit aussi réduire sa perte en relouant raisonnablement vite.",
      sections: [
        {
          heading: "Comment confirmer le départ sans faire une reprise illégale ?",
          paragraphs: [
            "Un logement silencieux ou un loyer impayé ne prouve pas à lui seul un déguerpissement. Tentez de joindre le locataire par les coordonnées convenues, notez les dates, vérifiez si les clés ont été remises et recueillez les indices objectifs sans intrusion. En cas d'incertitude, demandez au TAL ou à un professionnel si une ordonnance est nécessaire avant de reprendre possession.",
            "S'il y a un risque urgent — eau, chauffage, porte ouverte ou danger pour l'immeuble — intervenez seulement dans la mesure nécessaire pour sécuriser les lieux et documentez la raison, l'heure et les personnes présentes. Évitez de jeter des effets personnels : l'abandon du bail et l'abandon de chaque bien sont deux questions distinctes.",
            "À la reprise légitime, changez les accès, relevez les compteurs, photographiez chaque pièce avant le nettoyage et faites un inventaire des biens restants. Un témoin neutre ou un rapport professionnel renforce la chronologie.",
          ],
        },
        {
          heading: "Comment distinguer dommage, saleté et usure normale ?",
          paragraphs: [
            [
              "L'article 1890 du ",
              { text: "Code civil du Québec", to: CIVIL_CODE_URL },
              " prévoit que le locataire remet les lieux dans l'état où il les a reçus, sauf les changements résultant du vieillissement, de l'usure normale ou d'une force majeure. Une peinture normalement vieillie n'est donc pas traitée comme un mur volontairement percé ou un équipement brisé par négligence.",
            ],
            "Comparez l'état de sortie aux photos et au rapport d'entrée. Pour chaque poste, indiquez l'âge de l'élément, son état antérieur, le dommage observé, la réparation choisie et la facture. La réclamation doit refléter la perte réelle; remplacer à neuf un élément déjà très usé ne justifie pas automatiquement le coût intégral.",
            "Conservez les photos originales avec leurs dates, les vidéos, témoignages, rapports, devis, factures et preuves de paiement. Lorsque des travaux urgents empêchent d'attendre l'audience, documentez l'état avant toute intervention.",
          ],
        },
        {
          heading: "Quels loyers et frais peut-on réclamer après le départ ?",
          paragraphs: [
            [
              "Le TAL fournit une ",
              { text: "demande en indemnité de relocation et dommages", to: TAL_DAMAGE_CLAIM_URL },
              " destinée aux réclamations suivant l'abandon des lieux. Selon la preuve, le locateur peut réclamer des loyers perdus, des frais raisonnables de relocation et des dommages matériels attribuables au locataire.",
            ],
            "Le propriétaire doit toutefois limiter son préjudice : annoncer rapidement, permettre les visites, conserver les candidatures et expliquer la date réelle de relocation. Un logement laissé vacant volontairement ou rénové longtemps pour un projet personnel peut réduire la période imputable à l'ancien locataire.",
            "Envoyez un état de compte détaillé à la dernière adresse connue et à toute nouvelle adresse obtenue légalement. Si l'identité, la possession, les biens abandonnés ou le montant sont contestés, obtenez un avis juridique avant de disposer des biens ou de déposer la demande.",
          ],
        },
      ],
    },
    en: {
      category: "Rental Management",
      date: "September 2026",
      title: "Tenant left without notice or damaged the unit: what to do next",
      metaTitle: "Tenant left without notice or damaged the unit",
      excerpt:
        "Steps to secure the unit, preserve evidence, re-rent promptly, and claim supported losses.",
      brief:
        "When a tenant leaves without notice or causes damage, first confirm lawful possession, protect the building, and preserve dated evidence. Compare move-out condition with the move-in record and separate ordinary wear from compensable damage. The landlord must also mitigate the loss by making reasonable efforts to re-rent the unit promptly.",
      sections: [
        {
          heading: "How do you confirm departure without taking possession unlawfully?",
          paragraphs: [
            "A quiet unit or unpaid rent alone does not prove abandonment. Try the agreed contact methods, record dates, check whether keys were returned, and gather objective indicators without intrusion. If possession remains uncertain, ask the TAL or a legal professional whether an order is required before taking the unit back.",
            "Where an urgent risk exists — water, heating failure, an open door, or danger to the building — intervene only as necessary to secure the premises and record the reason, time, and people present. Do not discard belongings casually: abandonment of the lease and abandonment of every item are separate questions.",
            "Once possession is lawfully recovered, secure access, record meter readings, photograph every room before cleaning, and inventory remaining property. A neutral witness or professional report strengthens the chronology.",
          ],
        },
        {
          heading: "How do you separate damage, cleaning, and ordinary wear?",
          paragraphs: [
            [
              "Article 1890 of the ",
              { text: "Civil Code of Québec", to: CIVIL_CODE_URL },
              " requires the tenant to return the premises in the condition received, except for changes caused by age, ordinary wear, or superior force. Normally aged paint is therefore different from a deliberately punctured wall or equipment broken through negligence.",
            ],
            "Compare move-out condition with move-in photographs and reports. For each item, record its age, previous condition, observed damage, chosen repair, and invoice. The claim should reflect actual loss; replacing an already depreciated item with a new one does not automatically justify charging the full replacement cost.",
            "Keep original dated photographs, video, witness evidence, reports, estimates, invoices, and payment proof. If urgent work cannot wait for a hearing, document the condition before anyone begins repairs or cleaning.",
          ],
        },
        {
          heading: "Which rent losses and expenses may be claimed?",
          paragraphs: [
            [
              "The TAL provides an ",
              { text: "application for re-rental indemnity and damages", to: TAL_DAMAGE_CLAIM_URL },
              " for claims following abandonment. Depending on the evidence, a landlord may claim lost rent, reasonable re-rental costs, and tenant-caused property damage.",
            ],
            "The landlord must mitigate: advertise promptly, allow visits, retain application records, and explain the actual re-rental date. Keeping a unit vacant by choice or renovating it for an unrelated project may reduce the period attributable to the former tenant.",
            "Send an itemized statement to the last known address and any new address obtained lawfully. If identity, possession, remaining belongings, or the amount is disputed, obtain legal advice before disposing of property or filing the claim.",
          ],
        },
      ],
    },
  },
  {
    slug: "verification-locataire-soquij-credit-references",
    image: blogCoverPath("cover-choose-manager.webp"),
    datePublished: "2026-09-14",
    dateModified: "2026-09-14",
    fr: {
      category: "Location",
      date: "Septembre 2026",
      title: "Vérification d'un locataire au Québec : SOQUIJ, crédit et références",
      metaTitle: "Vérifier un locataire : SOQUIJ, crédit, références",
      excerpt:
        "Une méthode rigoureuse et légale pour confirmer l'identité, le crédit, les références et les décisions TAL d'un candidat.",
      brief:
        "Une vérification fiable ne repose jamais sur un seul résultat SOQUIJ ou une impression. Elle combine identité confirmée, consentement à l'enquête de crédit, revenus ou habitudes de paiement, références vérifiées et analyse contextuelle des décisions publiques. La même grille doit être appliquée à tous, sans discrimination et avec le minimum de données personnelles.",
      sections: [
        {
          heading: "Comment confirmer l'identité sans recueillir trop d'information ?",
          paragraphs: [
            [
              "La ",
              { text: "Commission d'accès à l'information du Québec", to: CAI_LEASE_URL },
              " indique qu'un locateur peut demander le nom, le prénom et l'adresse complète. Il peut demander à voir une pièce d'identité pour confirmer l'identité, mais ne doit pas en copier, photographier ou conserver les numéros simplement pour constituer le dossier de location.",
            ],
            "Utilisez une fiche uniforme : nom légal, adresse actuelle, coordonnées, période d'occupation recherchée et consentements nécessaires. Pour une enquête de crédit, la CAI précise que le nom, l'adresse et la date de naissance suffisent généralement; le numéro d'assurance sociale n'est pas nécessaire.",
            "Expliquez ce qui sera vérifié, pourquoi, auprès de qui et combien de temps les données seront conservées. Limitez l'accès au dossier et détruisez les renseignements lorsqu'ils ne sont plus nécessaires selon votre politique et les exigences légales.",
          ],
        },
        {
          heading: "Comment utiliser SOQUIJ sans confondre deux personnes ?",
          paragraphs: [
            [
              "Le service citoyen ",
              { text: "Trouver une décision de SOQUIJ", to: SOQUIJ_URL },
              " permet une recherche par nom des parties et inclut le Tribunal administratif du logement parmi ses corpus. Recherchez les variantes raisonnables du nom, puis lisez la décision complète : être nommé dans un dossier ne dit pas, à lui seul, qui a gagné ni pourquoi.",
            ],
            "Confirmez l'identité avec plusieurs éléments concordants permis — nom complet, adresse ou période pertinente, rôle dans le dossier et faits compatibles. Une homonymie peut causer un refus injustifié. À l'inverse, aucun résultat ne prouve l'absence d'antécédent : certaines décisions sont anonymisées, non publiées ou mises en ligne après un délai.",
            "Évaluez seulement les faits pertinents au bail proposé. Une personne peut avoir exercé légitimement un droit contre un ancien propriétaire. Notez le motif objectif de votre décision et appliquez le même seuil à chaque candidat.",
          ],
        },
        {
          heading: "Comment vérifier crédit, emploi et ancien propriétaire ?",
          paragraphs: [
            "Obtenez un consentement valide avant de demander un rapport de crédit ou de contacter les locateurs actuels et antérieurs sur les habitudes de paiement. Analysez la capacité et la régularité de paiement plutôt qu'un score isolé; un candidat peut aussi fournir une attestation bancaire, des extraits pertinents de son dossier ou d'autres preuves prévues par la CAI.",
            "Pour la référence locative, ne vous contentez pas du numéro donné. Confirmez indépendamment que la personne est ou était réellement propriétaire ou mandataire — par exemple à l'aide du rôle d'évaluation, d'une source d'entreprise ou des documents de gestion — puis posez les mêmes questions factuelles : dates d'occupation, paiements, avis, état des lieux et respect des obligations.",
            [
              "N'utilisez jamais la sélection pour écarter un candidat en raison d'un motif protégé, et n'exigez pas de dépôt interdit. Une ",
              { text: "gestion locative structurée", to: "/services/location" },
              " conserve une grille écrite, les consentements et une justification objective, tout en recueillant seulement les renseignements nécessaires.",
            ],
          ],
        },
      ],
    },
    en: {
      category: "Leasing",
      date: "September 2026",
      title: "Screening a Quebec tenant: SOQUIJ, credit, and landlord references",
      metaTitle: "Tenant screening: SOQUIJ, credit, references",
      excerpt:
        "A careful, lawful method for confirming identity, credit, references, and TAL decisions involving an applicant.",
      brief:
        "Reliable screening never rests on one SOQUIJ result or a first impression. It combines confirmed identity, consent-based credit review, payment capacity, verified landlord references, and contextual reading of public decisions. Use the same written criteria for every applicant, avoid discrimination, and collect only the personal information necessary for the rental decision.",
      sections: [
        {
          heading: "How can identity be confirmed without over-collecting information?",
          paragraphs: [
            [
              "Quebec's ",
              { text: "Commission d'accès à l'information", to: CAI_LEASE_URL },
              " says a landlord may request an applicant's first name, last name, and complete address. Identification may be shown to confirm identity, but the landlord should not copy or photograph it or retain its numbers merely to create a rental file.",
            ],
            "Use one consistent application sheet: legal name, current address, contact details, intended occupancy, and required consents. For a credit check, the CAI says name, address, and date of birth are generally sufficient; a social insurance number is not necessary.",
            "Explain what will be checked, why, with whom, and how long information will be kept. Restrict file access and destroy information when it is no longer required under the retention policy and applicable law.",
          ],
        },
        {
          heading: "How should SOQUIJ be used without mistaking one person for another?",
          paragraphs: [
            [
              "SOQUIJ's public ",
              { text: "decision search", to: SOQUIJ_URL },
              " supports party-name searches and includes the Tribunal administratif du logement among its bodies. Search reasonable name variants, then read the complete decision: being named in a case does not reveal, by itself, who succeeded or why.",
            ],
            "Confirm identity through several matching, permitted details — full name, relevant address or time period, role in the case, and compatible facts. A shared name can lead to an unfair refusal. Conversely, no result does not prove no history: some decisions are anonymized, unpublished, or posted after a delay.",
            "Assess only facts relevant to the proposed tenancy. A person may have legitimately exercised a right against a former landlord. Record the objective reason for the decision and apply the same threshold to every applicant.",
          ],
        },
        {
          heading: "How do you verify credit, employment, and a former landlord?",
          paragraphs: [
            "Obtain valid consent before requesting a credit report or contacting current and former landlords about payment habits. Assess capacity and payment consistency rather than one score; an applicant may also provide a bank attestation, relevant credit-file excerpts, or other evidence identified by the CAI.",
            "Do not rely only on the phone number supplied for a landlord reference. Independently confirm that the person owns or managed the property — using an assessment roll, a business source, or management documentation — then ask every reference the same factual questions about occupancy dates, payments, notices, move-out condition, and compliance with the lease.",
            [
              "Never use screening to exclude an applicant on a protected ground, and do not demand a prohibited deposit. Structured ",
              { text: "rental management", to: "/services/location" },
              " keeps a written rubric, consents, and an objective decision record while collecting only necessary information.",
            ],
          ],
        },
      ],
    },
  },
] satisfies BlogPost[];
