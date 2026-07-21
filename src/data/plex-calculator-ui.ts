/**
 * UI labels for the plex calculator, in both site locales.
 *
 * Flat and typed so the component cannot reference a key that has not been
 * translated: adding a field to CalcUi breaks the build until both locales
 * define it.
 */

export interface CalcUi {
  // Shell
  area: string;
  exportCsv: string;
  exportEmailPrompt: string;
  exportEmailPlaceholder: string;
  exportEmailSkip: string;
  exportEmailSubmit: string;
  exportEmailNote: string;

  // KPIs
  purchaseCap: string;
  purchaseCapNote: string;
  proformaCap: string;
  proformaCapNote: string;
  pricePerUnit: string;
  totalEquity: string;
  totalEquityNote: string;
  cocYear1: string;
  avgCoc: string;
  dscr: string;
  currentNoi: string;
  currentCashFlow: string;
  irr: string;
  equityMultiple: string;
  proformaCashFlow: string;
  proformaCashFlowNote: string;
  unitsSuffix: string;
  perMonth: string;
  overYears: string;
  yrHold: string;

  // Flip KPIs
  afterRepairValue: string;
  purchasePrice: string;
  rehabBudget: string;
  cashIn: string;
  welcomeTax: string;
  holdingCost: string;
  sellingCosts: string;
  profit: string;
  returnOnCash: string;
  marginOnArv: string;
  allInCost: string;
  monthlyCarry: string;
  months: string;

  // Tabs
  tabProperty: string;
  tabUnitMix: string;
  tabFinancing: string;
  tabRenovation: string;
  tabExpenses: string;
  tabAssumptions: string;
  tabRefinancing: string;
  tabExit: string;

  // Property
  propertyHeading: string;
  propertySub: string;
  propertyType: string;
  propertyTypeHelp: string;
  askingPrice: string;
  offerPrice: string;
  belowAsk: string;
  buildingYear: string;
  yearsOld: string;
  lotSize: string;
  perSqftLand: string;
  condoFeesMonthly: string;
  condoFeesHelp: string;
  totalUnits: string;
  units: string;
  netRentableArea: string;
  unitArea: string;
  costPerSqft: string;
  montrealAgglo: string;
  offIsland: string;
  publishedFigure: string;
  interpolated: string;
  municipalTax: string;
  priceIndex: string;
  rents: string;
  welcomeTaxOnPurchase: string;
  welcomeTaxMontreal: string;
  welcomeTaxOffIsland: string;
  whatChanges: string;

  // Property type option labels
  typeCondo: string;
  typeDuplex: string;
  typeTriplex: string;
  typeQuadruplex: string;
  typeFivePlus: string;
  typeFlip: string;

  // Unit mix
  unitMixHeading: string;
  unitMixSub: string;
  colType: string;
  colUnits: string;
  colInPlaceRent: string;
  colMarketRent: string;
  colSqftPerUnit: string;
  colMonthlyUpside: string;
  remove: string;
  total: string;
  addUnitType: string;
  annualUpside: string;
  grmInPlace: string;
  onePercentRule: string;
  avgRentPerUnit: string;
  bed0a: string;
  bed0b: string;
  bed1: string;
  bed2: string;
  bed3: string;
  bed4: string;

  // Financing
  financingHeading: string;
  financingSub: string;
  modeResidential: string;
  modeCommercial: string;
  modeMli: string;
  notAvailable5Plus: string;
  commercialStartsAt5: string;
  ownerOccupied: string;
  ownerOccupiedHelp: string;
  belowMinimum: string;
  needsAtLeast: string;
  minRule1to2: string;
  minRule3to4: string;
  noInsurance: string;
  downPayment: string;
  conventionalNoPremium: string;
  insurableTo: string;
  rentalNeeds20: string;
  maxLtv: string;
  targetDscr: string;
  targetDscrHelp: string;
  mliPoints: string;
  mliPointsHelp: string;
  interestRate: string;
  amortization: string;
  amortCappedBy: string;
  term: string;
  termHelp: string;
  lenderFee: string;
  otherUpfront: string;
  loanOutcome: string;
  loanAmount: string;
  sizedBy: string;
  byDscrTest: string;
  byLtvCap: string;
  byDownPayment: string;
  maxByLtv: string;
  maxByDscr: string;
  effectiveLtv: string;
  monthlyPayment: string;
  annualDebtService: string;
  premiumNote: string;
  premiumTaxLine: string;
  stressTest: string;
  passes: string;
  fails: string;
  renewalSensitivity: string;
  renewalSub: string;

  // Valeur économique (bank value)
  veHeading: string;
  veSub: string;
  veNormalizedNoi: string;
  veNormalizedNote: string;
  veQualificationRate: string;
  veMaxDebtService: string;
  veMaxLoan: string;
  veValue: string;
  veGap: string;
  veCashRequired: string;
  veCashShortfall: string;
  veAbovePrice: string;
  veBelowPrice: string;
  veShortfallNote: string;
  veVariesNote: string;
  colRate: string;
  colPaymentMo: string;
  colCashFlow: string;
  colCoc: string;

  // Renovation
  renoHeading: string;
  renoSub: string;
  initialRehab: string;
  initialRehabHelp: string;
  unitsTurnedPerYear: string;
  costPerUnit: string;
  programStartsYear: string;
  totalProgramCost: string;
  yearsToFullTurnover: string;
  never: string;
  monthlyRentLift: string;
  noiLift: string;
  renoNote: string;
  arvHelp: string;
  holdingPeriod: string;
  holdingPeriodHelp: string;
  flipNote: string;

  // Expenses
  expensesHeading: string;
  expensesSubPlex: string;
  expensesSubCondo: string;
  municipalTaxes: string;
  schoolTax: string;
  insurance: string;
  snowRemoval: string;
  landscaping: string;
  commonHydro: string;
  otherExpenses: string;
  capexPerUnit: string;
  repairsMaintenance: string;
  propertyManagement: string;
  ofGrossRent: string;
  vacancy: string;
  ownerPaysSchoolTax: string;
  totalOpEx: string;
  expenseRatio: string;
  perUnitPerYear: string;
  breakEvenRatio: string;

  // Assumptions
  growthHeading: string;
  marketRentGrowth: string;
  talGuideline: string;
  talGuidelineHelp: string;
  appreciation: string;
  expenseGrowth: string;
  capAtTal: string;
  taxHeading: string;
  taxSub: string;
  marginalRate: string;
  marginalRateHelp: string;
  ccaRate: string;
  ccaRateHelp: string;
  buildingPortion: string;
  buildingPortionHelp: string;
  capGainsInclusion: string;
  halfYearRule: string;
  ccaYear1: string;
  taxableIncomeY1: string;
  incomeTaxY1: string;
  afterTaxCashFlow: string;
  closingHeading: string;
  notaryFees: string;
  inspection: string;
  environmental: string;
  environmentalHelp: string;
  titleInsurance: string;
  discountRate: string;
  totalClosingCosts: string;
  initialRehabLine: string;
  totalCashToClose: string;

  // Refinancing
  refiHeading: string;
  refiSub: string;
  valueAfterReposition: string;
  valueAfterRepositionHelp: string;
  refiLtv: string;
  renewalRate: string;
  appraisedValue: string;
  newLoan: string;
  cashOut: string;
  leftInDeal: string;
  newPayment: string;
  cashFlowAfterRefi: string;
  cocAfterRefi: string;
  allCapitalReturned: string;
  allCapitalReturnedNote: string;

  // Exit
  exitHeading: string;
  exitSub: string;
  holdPeriod: string;
  sellingCostsPct: string;
  salePriceYear: string;
  loanBalance: string;
  netSaleProceeds: string;
  taxOnSale: string;
  totalCcaClaimed: string;
  ccaRecapture: string;
  taxOnRecapture: string;
  capitalGain: string;
  taxablePortion: string;
  taxOnCapitalGain: string;
  totalTaxOnSale: string;
  netProfitAfterTax: string;
  returnOnInvestment: string;
  annualized: string;
  npvAt: string;

  // APOD
  apodHeading: string;
  apodIntro: string;
  typedIn: string;
  typedInOne: string;
  typedInMany: string;
  highlightedBelow: string;
  recalculateIt: string;
  recalculateThem: string;
  colLine: string;
  colInPlace: string;
  colInPlaceSub: string;
  colPctGsi: string;
  colProforma: string;
  colProformaSub: string;
  colDelta: string;
  colDeltaSub: string;
  income: string;
  grossScheduledIncome: string;
  vacancyCreditLoss: string;
  effectiveGrossIncome: string;
  operatingExpenses: string;
  capexReserve: string;
  condoFeesLine: string;
  other: string;
  totalOperatingExpenses: string;
  netOperatingIncome: string;
  cashFlowBeforeTax: string;
  resetToCalculated: string;

  // Projection
  projectionHeading: string;
  chartAria: string;
  chartHint: string;
  colYear: string;
  year: string;
  colGrossRent: string;
  colNoi: string;
  colDebtService: string;
  colRenoSpend: string;
  colAtMarket: string;
  colCapOnCost: string;
  colValue: string;
  colLoanBalance: string;
  colEquity: string;

  // Verdict + sources
  verdictHeading: string;
  verdictSub: string;
  sourcesHeading: string;
  sourcesIntro: string;
  colFigure: string;
  colValueHeader: string;
  colSource: string;
  disclaimer: string;
}

const fr: CalcUi = {
  area: "Secteur",
  exportCsv: "Exporter les chiffres",
  exportEmailPrompt: "Recevoir aussi l'analyse par courriel ?",
  exportEmailPlaceholder: "votre@courriel.com",
  exportEmailSkip: "Télécharger sans courriel",
  exportEmailSubmit: "Envoyer et télécharger",
  exportEmailNote: "Facultatif. Le fichier se télécharge dans tous les cas.",

  purchaseCap: "Taux de capitalisation",
  purchaseCapNote: "sur le revenu net actuel",
  proformaCap: "Taux proforma",
  proformaCapNote: "aux loyers du marché",
  pricePerUnit: "Prix par porte",
  totalEquity: "Mise de fonds totale",
  totalEquityNote: "comptant à la clôture",
  cocYear1: "Rendement comptant (an 1)",
  avgCoc: "Rendement comptant moyen",
  dscr: "Ratio de couverture",
  currentNoi: "Revenu net actuel",
  currentCashFlow: "Flux de trésorerie",
  irr: "TRI",
  equityMultiple: "Multiple de la mise",
  proformaCashFlow: "Flux proforma",
  proformaCashFlowNote: "tous les logements au marché",
  unitsSuffix: "logements",
  perMonth: "/mois",
  overYears: "sur",
  yrHold: "ans de détention",

  afterRepairValue: "Valeur après travaux",
  purchasePrice: "Prix d'achat",
  rehabBudget: "Budget de travaux",
  cashIn: "Comptant investi",
  welcomeTax: "Droits de mutation",
  holdingCost: "Coût de portage",
  sellingCosts: "Frais de vente",
  profit: "Profit",
  returnOnCash: "Rendement sur comptant",
  marginOnArv: "Marge sur la valeur de revente",
  allInCost: "Coût de revient total",
  monthlyCarry: "Portage mensuel",
  months: "mois",

  tabProperty: "Immeuble",
  tabUnitMix: "Logements",
  tabFinancing: "Financement",
  tabRenovation: "Rénovation",
  tabExpenses: "Dépenses",
  tabAssumptions: "Hypothèses",
  tabRefinancing: "Refinancement",
  tabExit: "Revente",

  propertyHeading: "Informations sur l'immeuble",
  propertySub:
    "Changer le type d'immeuble réinitialise les prix, la composition des logements et le financement aux médianes du secteur. Tous les rendements se calculent sur le prix offert, pas sur le prix demandé.",
  propertyType: "Type d'immeuble",
  propertyTypeHelp: "Réinitialise le modèle",
  askingPrice: "Prix demandé",
  offerPrice: "Prix offert",
  belowAsk: "sous le prix demandé",
  buildingYear: "Année de construction",
  yearsOld: "ans",
  lotSize: "Superficie du terrain",
  perSqftLand: "/pi² de terrain",
  condoFeesMonthly: "Frais de copropriété / mois",
  condoFeesHelp: "Une copropriété détient un logement, pas un terrain",
  totalUnits: "Nombre de logements",
  units: "Logements",
  netRentableArea: "Superficie locative nette",
  unitArea: "Superficie du logement",
  costPerSqft: "Coût / pi²",
  montrealAgglo: "Agglomération de Montréal",
  offIsland: "Hors de l'île",
  publishedFigure: "Chiffre publié",
  interpolated: "Interpolé",
  municipalTax: "Taxe municipale",
  priceIndex: "Indice de prix",
  rents: "loyers",
  welcomeTaxOnPurchase: "Droits de mutation sur cet achat :",
  welcomeTaxMontreal:
    "Montréal applique son propre barème, atteignant 2 % au-delà de 552 300 $, 2,5 % au-delà de 1,1 M$, 3,5 % au-delà de 2,14 M$ et 4 % au-delà de 3,11 M$. C'est la seule municipalité autorisée à dépasser le plafond provincial de 3 %.",
  welcomeTaxOffIsland:
    "Hors de Montréal, le barème provincial plafonne à 1,5 % au-delà de 315 000 $, mais une municipalité peut ajouter jusqu'à 3 % sur la tranche excédant 500 000 $ par règlement : vérifiez auprès de la ville.",
  whatChanges: "Ce qui change pour ce type d'immeuble",

  typeCondo: "Copropriété",
  typeDuplex: "Duplex",
  typeTriplex: "Triplex",
  typeQuadruplex: "Quadruplex",
  typeFivePlus: "5 logements et plus",
  typeFlip: "Achat-revente",

  unitMixHeading: "Composition des logements",
  unitMixSub:
    "Le loyer en place est ce que le bail perçoit aujourd'hui. Le loyer du marché est ce que le logement obtient à la relocation. Cet écart est le potentiel de valorisation, et le TAL détermine à quelle vitesse vous le captez.",
  colType: "Type",
  colUnits: "Nombre",
  colInPlaceRent: "Loyer en place",
  colMarketRent: "Loyer du marché",
  colSqftPerUnit: "Pi² / logement",
  colMonthlyUpside: "Potentiel mensuel",
  remove: "Retirer",
  total: "Total",
  addUnitType: "Ajouter un type",
  annualUpside: "Potentiel annuel",
  grmInPlace: "Multiplicateur de revenu brut",
  onePercentRule: "Règle du 1 %",
  avgRentPerUnit: "Loyer moyen / logement",
  bed0a: "Une pièce plus salle de bain",
  bed0b: "Cuisine séparée, sans chambre",
  bed1: "Une chambre",
  bed2: "Deux chambres",
  bed3: "Trois chambres",
  bed4: "Quatre chambres",

  financingHeading: "Financement",
  financingSub:
    "Sous cinq logements, vous êtes évalué comme du résidentiel et votre mise de fonds détermine le prêt. À cinq et plus, le prêteur calcule à partir du revenu net : c'est le plafond prêt-valeur ou le test de couverture, selon celui qui limite en premier.",
  modeResidential: "Résidentiel (1 à 4)",
  modeCommercial: "Commercial (5+)",
  modeMli: "SCHL MLI Select",
  notAvailable5Plus: "Non disponible à 5 logements et plus",
  commercialStartsAt5: "Le commercial commence à 5 logements",
  ownerOccupied: "J'occuperai un des logements",
  ownerOccupiedHelp:
    "L'assurance prêt hypothécaire l'exige pour 1 à 4 logements. Un achat purement locatif est conventionnel : 20 % de mise de fonds minimum.",
  belowMinimum: "Sous le minimum",
  needsAtLeast: "Cette structure exige au moins",
  minRule1to2: "1 à 2 logements : 5 % sur la première tranche de 500 000 $ puis 10 % sur le reste.",
  minRule3to4: "3 à 4 logements : assurable jusqu'à 90 %, donc 10 % minimum.",
  noInsurance: "Sans assurance",
  downPayment: "Mise de fonds",
  conventionalNoPremium: "Conventionnel: aucune prime",
  insurableTo: "Assurable jusqu'à",
  rentalNeeds20: "Achat locatif: 20 % requis",
  maxLtv: "Ratio prêt-valeur maximal",
  targetDscr: "Ratio de couverture visé",
  targetDscrHelp: "Minimum du prêteur, généralement 1,10 à 1,30",
  mliPoints: "Points MLI Select",
  mliPointsHelp: "Jusqu'à",
  interestRate: "Taux d'intérêt",
  amortization: "Amortissement",
  amortCappedBy: "Plafonné par le palier à",
  term: "Terme",
  termHelp: "Les prêts canadiens se renouvellent au terme",
  lenderFee: "Frais du prêteur",
  otherUpfront: "Autres frais initiaux",
  loanOutcome: "Résultat du financement",
  loanAmount: "Montant du prêt",
  sizedBy: "Déterminé par",
  byDscrTest: "Test de couverture",
  byLtvCap: "Plafond prêt-valeur",
  byDownPayment: "Mise de fonds",
  maxByLtv: "Maximum selon le prêt-valeur",
  maxByDscr: "Maximum selon la couverture",
  effectiveLtv: "Prêt-valeur effectif",
  monthlyPayment: "Paiement mensuel",
  annualDebtService: "Service de la dette annuel",
  premiumTaxLine: "Taxe sur la prime d'assurance (9 %)",
  premiumNote:
    "La prime d'assurance est capitalisée dans le prêt; la taxe sur la prime est payable comptant à la clôture. Les taux de prime sont des estimations : la SCHL tarifie chaque dossier individuellement.",
  stressTest: "Test de résistance à",
  passes: "Réussi",
  fails: "Échoué",
  renewalSensitivity: "Sensibilité au renouvellement",
  renewalSub:
    "Votre terme se termine et la totalité du solde est refinancée au taux du moment. C'est le principal risque d'une détention au Canada.",
  colRate: "Taux",
  colPaymentMo: "Paiement / mois",
  colCashFlow: "Flux de trésorerie",
  colCoc: "Rendement comptant",

  veHeading: "Valeur économique (méthode bancaire)",
  veSub:
    "À cinq logements et plus, le prêteur ne finance pas votre prix : il finance sa propre valeur. Il normalise quatre postes (gestion, entretien, conciergerie et inoccupation), divise le revenu net normalisé par le ratio de couverture, actualise ce paiement au taux de qualification et obtient le prêt maximal. La valeur économique est ce prêt divisé par le ratio prêt-valeur. Les barèmes normalisés ci-dessous (5 % des revenus, 500 $ et 200 $ par logement, inoccupation plancher de 3 %) sont illustratifs : chaque institution fixe les siens.",
  veNormalizedNoi: "Revenu net normalisé",
  veNormalizedNote: "Après substitution des dépenses par les normes bancaires",
  veQualificationRate: "Taux de qualification",
  veMaxDebtService: "Service de la dette maximal",
  veMaxLoan: "Prêt maximal",
  veValue: "Valeur économique",
  veGap: "Écart avec le prix",
  veCashRequired: "Comptant réellement requis",
  veCashShortfall: "Comptant additionnel dû à l'écart",
  veAbovePrice: "La banque évalue au-dessus de votre prix : le financement suit le prix.",
  veBelowPrice: "La banque évalue sous votre prix : le prêt est plafonné par sa valeur, pas la vôtre.",
  veShortfallNote:
    "Quand la valeur économique est sous le prix d'achat, vous couvrez la totalité de l'écart comptant : la mise de fonds réelle devient prix moins prêt maximal, pas 20 % du prix. À Montréal, le TGA exigé par la banque dépasse largement le TGA du marché, cet écart vient des taux de qualification, pas d'un défaut de l'immeuble.",
  veVariesNote:
    "Chaque prêteur normalise différemment et la valeur économique bouge quotidiennement avec les taux de qualification. Ceci est une version défendable du calcul, pas le chiffre d'une banque précise.",

  renoHeading: "Rénovation et relocation",
  renoSub:
    "Le loyer d'un locataire en place est plafonné par le TAL. Le loyer ne revient au marché qu'au départ du locataire : c'est le rythme de relocation, et non l'ampleur de l'écart, qui détermine la vitesse de valorisation.",
  initialRehab: "Budget de travaux initial",
  initialRehabHelp: "Travaux immédiats, payés à la clôture",
  unitsTurnedPerYear: "Logements relocés / an",
  costPerUnit: "Coût par logement",
  programStartsYear: "Début du programme (année)",
  totalProgramCost: "Coût total du programme",
  yearsToFullTurnover: "Années pour tout reloger",
  never: "Jamais",
  monthlyRentLift: "Hausse mensuelle à terme",
  noiLift: "Hausse du revenu net à terme",
  renoNote:
    "Les dépenses de rénovation sont traitées comme du capital dans l'année où elles surviennent : elles affectent le TRI, pas le revenu net.",
  arvHelp: "Prix de revente une fois les travaux terminés",
  holdingPeriod: "Durée de détention",
  holdingPeriodHelp: "Chaque mois coûte l'hypothèque plus le portage",
  flipNote:
    "Ce profit est net des droits de mutation, du notaire, du portage et des frais de vente : les quatre postes qui grugent discrètement la marge d'un achat-revente.",

  expensesHeading: "Dépenses d'exploitation",
  expensesSubPlex:
    "Le déneigement et l'électricité des aires communes ne sont pas optionnels à Montréal, et les vendeurs les omettent régulièrement de la fiche descriptive.",
  expensesSubCondo:
    "Les frais de copropriété sont le poste à examiner : demandez l'étude du fonds de prévoyance avant de présumer qu'ils tiendront.",
  municipalTaxes: "Taxes municipales",
  schoolTax: "Taxe scolaire",
  insurance: "Assurance",
  snowRemoval: "Déneigement",
  landscaping: "Aménagement paysager",
  commonHydro: "Électricité des communs",
  otherExpenses: "Autres dépenses",
  capexPerUnit: "Réserve de capital / logement",
  repairsMaintenance: "Entretien et réparations",
  propertyManagement: "Gestion immobilière",
  ofGrossRent: "du revenu brut",
  vacancy: "Inoccupation et mauvaises créances",
  ownerPaysSchoolTax: "Le propriétaire paie la taxe scolaire",
  totalOpEx: "Total des dépenses d'exploitation",
  expenseRatio: "Ratio de dépenses",
  perUnitPerYear: "Par logement / an",
  breakEvenRatio: "Seuil de rentabilité",

  growthHeading: "Croissance et contrôle des loyers",
  marketRentGrowth: "Croissance des loyers du marché",
  talGuideline: "Hausse suggérée par le TAL",
  talGuidelineHelp: "S'applique aux locataires en place",
  appreciation: "Appréciation",
  expenseGrowth: "Croissance des dépenses",
  capAtTal: "Plafonner les hausses des loyers en place au taux du TAL",
  taxHeading: "Traitement fiscal",
  taxSub:
    "Le Canada utilise l'amortissement dégressif, pas linéaire, et le réclamer crée une récupération à la vente. Le terrain n'est pas amortissable.",
  marginalRate: "Taux marginal d'imposition",
  marginalRateHelp: "Québec et fédéral combinés",
  ccaRate: "Taux de DPA",
  ccaRateHelp: "Catégorie 1 résidentiel : 4 %",
  buildingPortion: "Portion bâtiment",
  buildingPortionHelp: "Le solde est du terrain, non amortissable",
  capGainsInclusion: "Taux d'inclusion du gain en capital",
  halfYearRule: "Appliquer la règle du demi-taux la première année",
  ccaYear1: "DPA réclamée l'an 1",
  taxableIncomeY1: "Revenu imposable l'an 1",
  incomeTaxY1: "Impôt l'an 1",
  afterTaxCashFlow: "Flux de trésorerie après impôt",
  closingHeading: "Frais de clôture",
  notaryFees: "Frais de notaire",
  inspection: "Inspection",
  environmental: "Étude environnementale (phase I)",
  environmentalHelp: "Souvent exigée à 5 logements et plus",
  titleInsurance: "Assurance titres",
  discountRate: "Taux d'actualisation (VAN)",
  totalClosingCosts: "Total des frais de clôture",
  initialRehabLine: "Travaux initiaux",
  totalCashToClose: "Comptant total à la clôture",

  refiHeading: "Refinancement",
  refiSub:
    "Une fois le programme de relocation terminé, le revenu net augmente, l'immeuble est réévalué et vous pouvez retirer de l'équité à la nouvelle valeur.",
  valueAfterReposition: "Valeur après repositionnement",
  valueAfterRepositionHelp: "Laisser à 0 pour utiliser prix + travaux",
  refiLtv: "Prêt-valeur au refinancement",
  renewalRate: "Taux au renouvellement",
  appraisedValue: "Valeur évaluée",
  newLoan: "Nouveau prêt",
  cashOut: "Capital retiré",
  leftInDeal: "Capital laissé dans le projet",
  newPayment: "Nouveau paiement",
  cashFlowAfterRefi: "Flux après refinancement",
  cocAfterRefi: "Rendement comptant après refinancement",
  allCapitalReturned: "Capital entièrement récupéré",
  allCapitalReturnedNote:
    "Le refinancement retire plus que votre mise initiale, le rendement sur le capital restant est donc indéfini. Vérifiez que le nouveau paiement respecte toujours le ratio de couverture de votre prêteur.",

  exitHeading: "Revente",
  exitSub:
    "La DPA réclamée en cours de détention est récupérée à votre taux marginal complet : c'est un report d'impôt, pas une déduction.",
  holdPeriod: "Durée de détention",
  sellingCostsPct: "Frais de vente",
  salePriceYear: "Prix de vente (année",
  loanBalance: "Solde du prêt",
  netSaleProceeds: "Produit net de la vente",
  taxOnSale: "Impôt à la vente",
  totalCcaClaimed: "DPA totale réclamée",
  ccaRecapture: "Récupération de DPA",
  taxOnRecapture: "Impôt sur la récupération",
  capitalGain: "Gain en capital",
  taxablePortion: "Portion imposable",
  taxOnCapitalGain: "Impôt sur le gain en capital",
  totalTaxOnSale: "Impôt total à la vente",
  netProfitAfterTax: "Profit net après impôt",
  returnOnInvestment: "Rendement sur investissement",
  annualized: "Annualisé",
  npvAt: "VAN à",

  apodHeading: "Données d'exploitation annuelles",
  apodIntro:
    "Chaque montant peut être modifié. Modifier la colonne « en place » met à jour la donnée d'origine. Modifier la colonne « proforma » ne change que cette ligne : utile pour les taxes après réévaluation, ou la gestion que vous prévoyez assumer vous-même.",
  typedIn: "Saisi",
  typedInOne: "1 montant proforma est saisi à la main plutôt que calculé",
  typedInMany: "montants proforma sont saisis à la main plutôt que calculés",
  highlightedBelow: "- surlignés ci-dessous.",
  recalculateIt: "Recalculer",
  recalculateThem: "Tout recalculer",
  colLine: "Poste",
  colInPlace: "En place",
  colInPlaceSub: "ce qui est perçu aujourd'hui",
  colPctGsi: "% du revenu brut",
  colProforma: "Proforma",
  colProformaSub: "tous les logements au marché",
  colDelta: "Δ",
  colDeltaSub: "le potentiel",
  income: "Revenus",
  grossScheduledIncome: "Revenu brut potentiel",
  vacancyCreditLoss: "Inoccupation et mauvaises créances",
  effectiveGrossIncome: "Revenu brut effectif",
  operatingExpenses: "Dépenses d'exploitation",
  capexReserve: "Réserve de capital",
  condoFeesLine: "Frais de copropriété",
  other: "Autres",
  totalOperatingExpenses: "Total des dépenses d'exploitation",
  netOperatingIncome: "Revenu net d'exploitation",
  cashFlowBeforeTax: "Flux de trésorerie avant impôt",
  resetToCalculated: "Saisi à la main : cliquer pour revenir au montant calculé",

  projectionHeading: "Projection proforma",
  chartAria:
    "Graphique de la projection : barres du flux de trésorerie annuel, courbe du revenu net et courbe de l'équité accumulée. Les mêmes chiffres figurent dans le tableau ci-dessous.",
  chartHint:
    "Les barres sous la ligne zéro sont des années à flux négatif. La courbe d'équité montre ce que le remboursement du capital et l'appréciation construisent pendant ce temps.",
  colYear: "Année",
  year: "Année",
  colGrossRent: "Revenu brut",
  colNoi: "Revenu net",
  colDebtService: "Service de la dette",
  colRenoSpend: "Travaux",
  colAtMarket: "Au marché",
  colCapOnCost: "Taux sur le coût",
  colValue: "Valeur",
  colLoanBalance: "Solde du prêt",
  colEquity: "Équité",

  verdictHeading: "Où se situe cet immeuble",
  verdictSub:
    "Ces seuils sont des règles empiriques, pas une analyse de crédit. Un faible score sur un immeuble que vous pouvez repositionner n'a pas la même portée que sur un immeuble déjà au marché.",
  sourcesHeading: "Règles et chiffres utilisés",
  sourcesIntro:
    "Chaque valeur ci-dessous provient d'une source externe, à jour en juillet 2026. Toutes sont indexées ou révisées périodiquement : vérifiez-les avant de déposer une offre.",
  colFigure: "Élément",
  colValueHeader: "Valeur",
  colSource: "Source",
  disclaimer:
    "Outil fourni à titre informatif. Il ne constitue ni un conseil financier, fiscal ou juridique, ni une évaluation. Validez chaque hypothèse auprès d'un courtier hypothécaire, d'un comptable et d'un inspecteur avant de déposer une offre.",
};

const en: CalcUi = {
  area: "Area",
  exportCsv: "Export numbers",
  exportEmailPrompt: "Also send the analysis by email?",
  exportEmailPlaceholder: "you@email.com",
  exportEmailSkip: "Download without email",
  exportEmailSubmit: "Send and download",
  exportEmailNote: "Optional. The file downloads either way.",

  purchaseCap: "Purchase cap rate",
  purchaseCapNote: "on in-place NOI",
  proformaCap: "Proforma cap rate",
  proformaCapNote: "at market rents",
  pricePerUnit: "Price per door",
  totalEquity: "Total equity",
  totalEquityNote: "cash to close",
  cocYear1: "Cash-on-cash (yr 1)",
  avgCoc: "Average cash-on-cash",
  dscr: "DSCR",
  currentNoi: "Current NOI",
  currentCashFlow: "Current cash flow",
  irr: "IRR",
  equityMultiple: "Equity multiple",
  proformaCashFlow: "Proforma cash flow",
  proformaCashFlowNote: "all units at market",
  unitsSuffix: "units",
  perMonth: "/mo",
  overYears: "over",
  yrHold: "yr hold",

  afterRepairValue: "After-repair value",
  purchasePrice: "Purchase price",
  rehabBudget: "Rehab budget",
  cashIn: "Cash in",
  welcomeTax: "Welcome tax",
  holdingCost: "Holding cost",
  sellingCosts: "Selling costs",
  profit: "Profit",
  returnOnCash: "Return on cash",
  marginOnArv: "Margin on ARV",
  allInCost: "All-in cost",
  monthlyCarry: "Monthly carry",
  months: "months",

  tabProperty: "Property",
  tabUnitMix: "Unit mix",
  tabFinancing: "Financing",
  tabRenovation: "Renovation",
  tabExpenses: "Expenses",
  tabAssumptions: "Assumptions",
  tabRefinancing: "Refinancing",
  tabExit: "Exit / sale",

  propertyHeading: "Property information",
  propertySub:
    "Changing the property type reseeds prices, unit mix and financing to that type's area medians. All returns run off the offer price, not the asking price.",
  propertyType: "Property type",
  propertyTypeHelp: "Reseeds the model",
  askingPrice: "Asking price",
  offerPrice: "Offer price",
  belowAsk: "below ask",
  buildingYear: "Building year",
  yearsOld: "years old",
  lotSize: "Lot size",
  perSqftLand: "/ft² of land",
  condoFeesMonthly: "Condo fees / month",
  condoFeesHelp: "A condo owns a unit, not a lot",
  totalUnits: "Total units",
  units: "Units",
  netRentableArea: "Net rentable area",
  unitArea: "Unit area",
  costPerSqft: "Cost / ft²",
  montrealAgglo: "Montreal agglomeration",
  offIsland: "Off-island",
  publishedFigure: "Published figure",
  interpolated: "Interpolated",
  municipalTax: "Municipal tax",
  priceIndex: "Price index",
  rents: "rents",
  welcomeTaxOnPurchase: "Welcome tax on this purchase:",
  welcomeTaxMontreal:
    "Montreal sets its own schedule, climbing to 2% over $552,300, 2.5% over $1.1M, 3.5% over $2.14M and 4% over $3.11M. It is the one municipality allowed to exceed the 3% provincial ceiling.",
  welcomeTaxOffIsland:
    "Outside Montreal the statutory schedule tops out at 1.5% above $315,000, though a municipality may add up to 3% on the portion above $500,000 by bylaw: check the town.",
  whatChanges: "What changes at this property type",

  typeCondo: "Condo",
  typeDuplex: "Duplex",
  typeTriplex: "Triplex",
  typeQuadruplex: "Quadruplex",
  typeFivePlus: "5+ units",
  typeFlip: "House flip",

  unitMixHeading: "Unit mix",
  unitMixSub:
    "In-place rent is what the lease collects today. Market rent is what the unit gets on turnover. That spread is the value-add, and the TAL decides how slowly you capture it.",
  colType: "Type",
  colUnits: "Units",
  colInPlaceRent: "In-place rent",
  colMarketRent: "Market rent",
  colSqftPerUnit: "ft² / unit",
  colMonthlyUpside: "Monthly upside",
  remove: "Remove",
  total: "Total",
  addUnitType: "Add unit type",
  annualUpside: "Annual upside",
  grmInPlace: "GRM (in-place)",
  onePercentRule: "1% rule",
  avgRentPerUnit: "Avg rent / unit",
  bed0a: "One room plus bathroom",
  bed0b: "Separate kitchen, no bedroom",
  bed1: "One bedroom",
  bed2: "Two bedrooms",
  bed3: "Three bedrooms",
  bed4: "Four bedrooms",

  financingHeading: "Financing",
  financingSub:
    "Under five units you are underwritten as residential and your down payment sets the loan. At five and up the lender sizes off NOI: whichever bites first, the LTV cap or the DSCR test, is the loan you get.",
  modeResidential: "Residential (1–4)",
  modeCommercial: "Commercial (5+)",
  modeMli: "CMHC MLI Select",
  notAvailable5Plus: "Not available at 5+ units",
  commercialStartsAt5: "Commercial tracks start at 5 units",
  ownerOccupied: "I will occupy one of the units",
  ownerOccupiedHelp:
    "Mortgage insurance on 1–4 units requires it. A pure rental purchase is conventional: 20% down minimum.",
  belowMinimum: "Below minimum",
  needsAtLeast: "This structure needs at least",
  minRule1to2: "1–2 units: 5% of the first $500,000 plus 10% of the balance.",
  minRule3to4: "3–4 units insure to 90% LTV, so 10% is the floor.",
  noInsurance: "No insurance",
  downPayment: "Down payment",
  conventionalNoPremium: "Conventional: no premium",
  insurableTo: "Insurable to",
  rentalNeeds20: "Rental purchase: 20% required",
  maxLtv: "Max LTV",
  targetDscr: "Target DSCR",
  targetDscrHelp: "Lender minimum, typically 1.10–1.30",
  mliPoints: "MLI Select points",
  mliPointsHelp: "Up to",
  interestRate: "Interest rate",
  amortization: "Amortization",
  amortCappedBy: "Capped by tier at",
  term: "Term",
  termHelp: "Canadian mortgages renew at term",
  lenderFee: "Lender fee / points",
  otherUpfront: "Other upfront cash",
  loanOutcome: "Loan outcome",
  loanAmount: "Loan amount",
  sizedBy: "Sized by",
  byDscrTest: "DSCR test",
  byLtvCap: "LTV cap",
  byDownPayment: "Down payment",
  maxByLtv: "Max by LTV",
  maxByDscr: "Max by DSCR",
  effectiveLtv: "Effective LTV",
  monthlyPayment: "Monthly payment",
  annualDebtService: "Annual debt service",
  premiumTaxLine: "Tax on the insurance premium (9%)",
  premiumNote:
    "The insurance premium is capitalized into the loan; the tax on it is payable in cash at closing. Premium rates are estimates: CMHC prices each file individually.",
  stressTest: "Stress test at",
  passes: "Passes",
  fails: "Fails",
  renewalSensitivity: "Renewal sensitivity",
  renewalSub:
    "Your term ends and the whole balance reprices at the rate of the day. This is the single largest risk in a Canadian hold.",
  colRate: "Rate",
  colPaymentMo: "Payment / mo",
  colCashFlow: "Cash flow",
  colCoc: "Cash-on-cash",

  veHeading: "Economic value (the bank's method)",
  veSub:
    "At five units and up, the lender does not finance your price, it finances its own value. It normalizes four lines (management, maintenance, janitorial and vacancy), divides the normalized NOI by the coverage ratio, discounts that payment at the qualification rate and gets the maximum loan. The economic value is that loan divided by the loan-to-value ratio. The normalized figures below (5% of revenue, $500 and $200 per unit, vacancy floored at 3%) are illustrative: each institution sets its own.",
  veNormalizedNoi: "Normalized NOI",
  veNormalizedNote: "After substituting the bank's expense standards",
  veQualificationRate: "Qualification rate",
  veMaxDebtService: "Maximum debt service",
  veMaxLoan: "Maximum loan",
  veValue: "Economic value",
  veGap: "Gap to price",
  veCashRequired: "Cash actually required",
  veCashShortfall: "Extra cash due to the gap",
  veAbovePrice: "The bank values it above your price: financing follows the price.",
  veBelowPrice: "The bank values it below your price: the loan is capped by its number, not yours.",
  veShortfallNote:
    "When the economic value sits below the purchase price, you cover the whole gap in cash: the real down payment becomes price minus maximum loan, not 20% of price. In Montreal the cap rate the bank requires sits well above the market cap rate, that gap comes from qualification rates, not from a defect in the building.",
  veVariesNote:
    "Every lender normalizes differently, and economic value moves daily with qualification rates. This is one defensible version of the calculation, not any specific bank's number.",

  renoHeading: "Renovation and turnover",
  renoSub:
    "A sitting tenant's rent is capped by the TAL. You only reset to market when a unit turns over, so the pace of turnover, not the size of the rent gap, sets how fast the value-add lands.",
  initialRehab: "Initial rehab budget",
  initialRehabHelp: "Day-one work, paid at closing",
  unitsTurnedPerYear: "Units turned / year",
  costPerUnit: "Cost per unit",
  programStartsYear: "Program starts year",
  totalProgramCost: "Total program cost",
  yearsToFullTurnover: "Years to full turnover",
  never: "Never",
  monthlyRentLift: "Monthly rent lift at completion",
  noiLift: "NOI lift at completion",
  renoNote:
    "Renovation spend is treated as capital in the year it happens: it hits the IRR, not the NOI.",
  arvHelp: "Resale price once work is done",
  holdingPeriod: "Holding period",
  holdingPeriodHelp: "Every month costs mortgage plus carrying",
  flipNote:
    "That profit is after welcome tax, notary, carrying and selling costs: the four things that quietly consume a flip margin.",

  expensesHeading: "Operating expenses",
  expensesSubPlex:
    "Snow removal and common hydro are not optional line items in Montreal, and vendors routinely omit both from the listing's expense sheet.",
  expensesSubCondo:
    "Condo fees are the line to scrutinise: ask for the reserve-fund study before assuming they hold.",
  municipalTaxes: "Municipal taxes",
  schoolTax: "School tax",
  insurance: "Insurance",
  snowRemoval: "Snow removal",
  landscaping: "Landscaping",
  commonHydro: "Common hydro",
  otherExpenses: "Other expenses",
  capexPerUnit: "CapEx reserve / unit",
  repairsMaintenance: "Repairs & maintenance",
  propertyManagement: "Property management",
  ofGrossRent: "of gross rent",
  vacancy: "Vacancy & credit loss",
  ownerPaysSchoolTax: "Owner pays school tax",
  totalOpEx: "Total operating expenses",
  expenseRatio: "Expense ratio",
  perUnitPerYear: "Per unit / year",
  breakEvenRatio: "Break-even ratio",

  growthHeading: "Growth and rent control",
  marketRentGrowth: "Market rent growth",
  talGuideline: "TAL guideline increase",
  talGuidelineHelp: "Applies to sitting tenants",
  appreciation: "Appreciation",
  expenseGrowth: "Expense growth",
  capAtTal: "Cap in-place rent increases at the TAL guideline",
  taxHeading: "Tax treatment",
  taxSub:
    "Canada uses declining-balance CCA, not straight-line depreciation, and claiming it creates recapture on sale. Land is not depreciable.",
  marginalRate: "Marginal tax rate",
  marginalRateHelp: "Combined QC + federal",
  ccaRate: "CCA rate",
  ccaRateHelp: "Class 1 residential: 4%",
  buildingPortion: "Building portion",
  buildingPortionHelp: "Balance is non-depreciable land",
  capGainsInclusion: "Capital gains inclusion",
  halfYearRule: "Apply half-year rule in year 1",
  ccaYear1: "CCA claimed year 1",
  taxableIncomeY1: "Taxable income year 1",
  incomeTaxY1: "Income tax year 1",
  afterTaxCashFlow: "After-tax cash flow",
  closingHeading: "Closing costs",
  notaryFees: "Notary fees",
  inspection: "Inspection",
  environmental: "Environmental (Phase I)",
  environmentalHelp: "Often required at 5+ units",
  titleInsurance: "Title insurance",
  discountRate: "Discount rate (NPV)",
  totalClosingCosts: "Total closing costs",
  initialRehabLine: "Initial rehab",
  totalCashToClose: "Total cash to close",

  refiHeading: "Refinance",
  refiSub:
    "Once the turnover program lifts NOI, the building reappraises and you can pull equity back out at the new value.",
  valueAfterReposition: "Value after repositioning",
  valueAfterRepositionHelp: "Leave at 0 to use price + rehab",
  refiLtv: "Refinance LTV",
  renewalRate: "Renewal rate",
  appraisedValue: "Appraised value",
  newLoan: "New loan",
  cashOut: "Cash out",
  leftInDeal: "Left in the deal",
  newPayment: "New payment",
  cashFlowAfterRefi: "Cash flow after refi",
  cocAfterRefi: "Cash-on-cash after refi",
  allCapitalReturned: "All capital returned",
  allCapitalReturnedNote:
    "The refinance pulls out more than you put in, so return on remaining equity is undefined. Confirm the new payment still clears your lender's DSCR before counting on it.",

  exitHeading: "Exit",
  exitSub:
    "CCA you claimed along the way comes back as recapture at your full marginal rate: it is a deferral, not a deduction.",
  holdPeriod: "Hold period",
  sellingCostsPct: "Selling costs",
  salePriceYear: "Sale price (year",
  loanBalance: "Loan balance",
  netSaleProceeds: "Net sale proceeds",
  taxOnSale: "Tax on sale",
  totalCcaClaimed: "Total CCA claimed",
  ccaRecapture: "CCA recapture",
  taxOnRecapture: "Tax on recapture",
  capitalGain: "Capital gain",
  taxablePortion: "Taxable portion",
  taxOnCapitalGain: "Tax on capital gain",
  totalTaxOnSale: "Total tax on sale",
  netProfitAfterTax: "Net profit after tax",
  returnOnInvestment: "Return on investment",
  annualized: "Annualized",
  npvAt: "NPV @",

  apodHeading: "Annual property operating data",
  apodIntro:
    "Every figure here can be typed over. Editing the in-place column writes back to the input it came from. Editing the proforma column changes that one line only: useful for taxes after a reassessment, or management you plan to drop by self-managing.",
  typedIn: "Typed in",
  typedInOne: "1 proforma figure is typed in by hand instead of calculated",
  typedInMany: "proforma figures are typed in by hand instead of calculated",
  highlightedBelow: "- highlighted below.",
  recalculateIt: "Recalculate it",
  recalculateThem: "Recalculate them",
  colLine: "Line",
  colInPlace: "In-place",
  colInPlaceSub: "what it collects today",
  colPctGsi: "% of GSI",
  colProforma: "Proforma",
  colProformaSub: "all units at market rent",
  colDelta: "Δ",
  colDeltaSub: "the upside",
  income: "Income",
  grossScheduledIncome: "Gross scheduled income",
  vacancyCreditLoss: "Vacancy & credit loss",
  effectiveGrossIncome: "Effective gross income",
  operatingExpenses: "Operating expenses",
  capexReserve: "CapEx reserve",
  condoFeesLine: "Condo fees",
  other: "Other",
  totalOperatingExpenses: "Total operating expenses",
  netOperatingIncome: "Net operating income",
  cashFlowBeforeTax: "Cash flow before tax",
  resetToCalculated: "Typed in by hand: click to go back to the calculated figure",

  projectionHeading: "Proforma projection",
  chartAria:
    "Projection chart: bars show annual cash flow, one line shows net operating income and another shows accumulated equity. The same figures appear in the table below.",
  chartHint:
    "Bars below the zero line are negative cash-flow years. The equity line shows what principal paydown and appreciation build over the same period.",
  colYear: "Year",
  year: "Year",
  colGrossRent: "Gross rent",
  colNoi: "NOI",
  colDebtService: "Debt service",
  colRenoSpend: "Reno spend",
  colAtMarket: "At market",
  colCapOnCost: "Cap on cost",
  colValue: "Value",
  colLoanBalance: "Loan balance",
  colEquity: "Equity",

  verdictHeading: "Where this deal stands",
  verdictSub:
    "Thresholds are rules of thumb, not underwriting. A weak score on a building you can reposition is a different thing from a weak score on one already at market.",
  sourcesHeading: "Rules and figures behind this model",
  sourcesIntro:
    "Every value below comes from an external source, current as of July 2026. All of them are indexed or revised periodically: re-check before an offer.",
  colFigure: "Figure",
  colValueHeader: "Value",
  colSource: "Source",
  disclaimer:
    "Provided for information only. This is not financial, tax or legal advice, and not an appraisal. Validate every assumption with a mortgage broker, an accountant and an inspector before making an offer.",
};

export const CALC_UI: Record<"fr" | "en", CalcUi> = { fr, en };
