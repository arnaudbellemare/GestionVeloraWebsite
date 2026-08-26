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
  currentRbe: string;
  potential: string;
  currentCashFlow: string;
  irr: string;
  afterTaxIrr: string;
  equityMultiple: string;
  proformaCashFlow: string;
  proformaCashFlowNote: string;
  npv: string;
  discountedAt: string;
  keyMetrics: string;
  valuationMethod: string;
  incomeApproach: string;
  incomeApproachNote: string;
  comparableApproach: string;
  comparableApproachNote: string;
  unitsSuffix: string;
  perMonth: string;
  perYear: string;
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
  comparableValue: string;
  comparableValueHelp: string;
  comparableFromRadar: string;
  comparableMissingRadar: string;
  comparableSales: string;
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
  fromUnitMix: string;
  fromUnitMixArea: string;
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
  radarAggregateIncomeTitle: string;
  radarAggregateIncomeNote: string;
  confirmRentRoll: string;
  unitTypeUnknown: string;
  derivedFromAggregate: string;
  colType: string;
  colUnits: string;
  colInPlaceRent: string;
  colMarketRent: string;
  colSqftPerUnit: string;
  colMonthlyUpside: string;
  remove: string;
  total: string;

  // CMHC benchmark
  colCmhcRent: string;
  cmhcOptimizationLabel: string;
  cmhcOptimizationNote: string;
  cmhcSourceNote: string;
  cmhcLowReliability: string;
  cmhcLevelZone: string;
  cmhcLevelCma: string;
  cmhcOccupiedCaveat: string;
  cmhcEstimatedWithoutRentRoll: string;
  modelEstimate: string;
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
  modeStandard: string;
  modeMli: string;
  notAvailable5Plus: string;
  commercialStartsAt5: string;
  ownerOccupied: string;
  ownerOccupiedHelp: string;
  ownerOccupiedUnit: string;
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
  compounding: string;
  semiAnnual: string;
  monthly: string;
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
  marketValueHeading: string;
  marketValueSub: string;
  marketCapInput: string;
  marketCapInputHelp: string;
  marketGrmInput: string;
  marketGrmInputHelp: string;
  marketGrmValue: string;
  marketCapValue: string;
  selectedValue: string;
  valueMargin: string;
  marketValueMissing: string;
  marketGrmSecondary: string;
  notProvided: string;
  colRate: string;
  colPaymentMo: string;
  colCashFlow: string;
  colCoc: string;
  financingComparison: string;
  financingComparisonSub: string;
  scenario: string;
  currentScenario: string;
  unavailable: string;
  cashRequired: string;
  insurancePremium: string;
  totalLoan: string;
  colAmortization: string;
  irr5: string;
  irr10: string;
  netAfterTax5: string;
  netAfterTax10: string;

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
  janitorial: string;
  heating: string;
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
  appreciationHelp: string;
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
  exitCapRate: string;
  exitCapRateHelp: string;
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
  colPctRbe: string;
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
  adjustedNetOperatingIncome: string;
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
  colValueAtExitCap: string;
  colLoanBalance: string;
  colEquity: string;

  // Underwriting detail
  optimizationHeading: string;
  optimizationCopy: string;
  optimizationMissing: string;
  optimizationMissingCopy: string;
  optimizationEstimatedNone: string;
  radarEstimatedPotentialNote: string;
  financialAnatomy: string;
  financialAnatomySub: string;
  marketIndicators: string;
  metric: string;
  currentValue: string;
  potentialValue: string;
  grm: string;
  netIncomeMultiplier: string;
  operatingExpenseRatio: string;
  cashFlowPerDoor: string;
  returnMatrix: string;
  returnMatrixSub: string;
  horizon: string;
  beforeTax: string;
  afterTax: string;
  afterTaxNpv: string;
  equityTimeline: string;
  equityTimelineSub: string;
  principalPaid: string;
  cumulativePrincipalPaid: string;
  interestPaid: string;
  recovery: string;
  totalReturnRecovery: string;
  cashFlowRecovery: string;
  externalDueDiligence: string;
  externalDueDiligenceNote: string;
  score: string;
  positives: string;
  warnings: string;
  verdictStrongBuy: string;
  verdictBuy: string;
  verdictHold: string;
  verdictAvoid: string;

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

  purchaseCap: "TGA au prix offert",
  purchaseCapNote: "sur le revenu net actuel",
  proformaCap: "TGA potentiel",
  proformaCapNote: "aux loyers du marché",
  pricePerUnit: "Prix par porte",
  totalEquity: "Mise de fonds totale",
  totalEquityNote: "comptant à la clôture",
  cocYear1: "Rendement comptant (an 1)",
  avgCoc: "Rendement comptant moyen",
  dscr: "RCD",
  currentNoi: "RNE actuel",
  currentRbe: "RBE actuel",
  potential: "Potentiel",
  currentCashFlow: "Cash-flow actuel",
  irr: "TRI",
  afterTaxIrr: "TRI après impôt",
  equityMultiple: "Multiple de la mise",
  proformaCashFlow: "Cash-flow potentiel",
  proformaCashFlowNote: "tous les logements au marché",
  npv: "VAN",
  discountedAt: "actualisée à",
  keyMetrics: "Métriques clés de rendement",
  valuationMethod: "Méthode de valeur",
  incomeApproach: "5 logements et plus · approche par revenu et TGA",
  incomeApproachNote:
    "La valeur marchande actuelle exige un TGA appuyé par des ventes vérifiées. La valeur projetée utilise séparément votre TGA de sortie; la capacité de financement dépend du RCD du prêteur.",
  comparableApproach: "1 à 4 logements · comparables vendus",
  comparableApproachNote:
    "La valeur projetée part de la valeur soutenue par des ventes comparables, puis applique l’appréciation prévue. Le TGA reste une métrique de rendement, mais ne détermine pas la valeur de revente.",
  unitsSuffix: "logements",
  perMonth: "/mois",
  perYear: "/an",
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
  comparableValue: "Valeur selon comparables vendus",
  comparableValueHelp: "Valeur marchande actuelle estimée à partir de ventes récentes comparables, distincte du prix offert",
  comparableFromRadar: "Valeur comparable sauvegardée par Plex Radar",
  comparableMissingRadar: "Plex Radar n'a pas encore de valeur comparable sauvegardée pour cette fiche; entrez une valeur fondée sur des ventes vérifiées.",
  comparableSales: "ventes comparables",
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
  fromUnitMix: "Somme de l'onglet Logements",
  fromUnitMixArea: "Somme des pi² de l'onglet Logements",
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
  radarAggregateIncomeTitle: "Estimation à partir des données Centris",
  radarAggregateIncomeNote:
    "Le revenu total, le nombre de portes, le type d’immeuble et le secteur donnent une bonne estimation initiale. Le modèle répartit le revenu annoncé sur une composition typique et applique ses loyers locaux; ce ne sont pas les baux réels. Remplacez ces estimations avec le rôle des loyers lorsqu’il est disponible.",
  confirmRentRoll: "J’ai remplacé les données par les baux réels",
  unitTypeUnknown: "Type à confirmer",
  derivedFromAggregate: "dérivé du revenu total annoncé",
  colType: "Type",
  colUnits: "Nombre",
  colInPlaceRent: "Loyer en place",
  colMarketRent: "Loyer du marché",
  colSqftPerUnit: "Pi² / logement",
  colMonthlyUpside: "Potentiel mensuel",
  remove: "Retirer",
  total: "Total",
  colCmhcRent: "Moyenne SCHL",
  cmhcOptimizationLabel: "Potentiel d'optimisation",
  cmhcOptimizationNote:
    "Somme des écarts des logements sous la moyenne SCHL. Les logements déjà au-dessus ne sont pas soustraits : on ne peut pas baisser le loyer d'un locataire en place.",
  cmhcSourceNote: "SCHL, Enquête sur les logements locatifs — octobre 2025",
  cmhcLowReliability: "Échantillon mince (cote D) — à utiliser avec prudence",
  cmhcLevelZone: "zone SCHL",
  cmhcLevelCma: "moyenne RMR",
  cmhcOccupiedCaveat:
    "Moyenne des logements occupés, pas le loyer demandé à la relocation. Sous le contrôle du TAL, l'écart entre les deux est réel : ce repère indique si les baux en place sont sous-évalués, pas ce que vous obtiendrez demain.",
  cmhcEstimatedWithoutRentRoll:
    "Comparaison indicative : la composition et la répartition des loyers sont estimées à partir du type d’immeuble, du secteur et du revenu total Centris. Confirmez-les avec le rôle des loyers.",
  modelEstimate: "Estimation du modèle",
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
  modeStandard: "SCHL Standard 5–6",
  modeMli: "SCHL MLI Select",
  notAvailable5Plus: "Non disponible à 5 logements et plus",
  commercialStartsAt5: "Le commercial commence à 5 logements",
  ownerOccupied: "J'occuperai un des logements",
  ownerOccupiedHelp:
    "L'assurance prêt hypothécaire l'exige pour 1 à 4 logements. Le logement choisi est retiré des revenus locatifs, mais sa valeur locative demeure dans la valeur de revente.",
  ownerOccupiedUnit: "Logement occupé par l'acheteur",
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
  compounding: "Composition du taux",
  semiAnnual: "Semestrielle canadienne",
  monthly: "Mensuelle",
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
  financingComparison: "Comparer les structures de financement",
  financingComparisonSub:
    "Comparaison indicative calculée avec le même revenu, les mêmes dépenses et la même sortie. Les taux ne sont pas des offres de prêt.",
  scenario: "Scénario",
  currentScenario: "Sélectionné",
  unavailable: "Non disponible",
  cashRequired: "Comptant requis",
  insurancePremium: "Prime d'assurance",
  totalLoan: "Prêt total",
  colAmortization: "Amort.",
  irr5: "TRI 5 ans",
  irr10: "TRI 10 ans",
  netAfterTax5: "Net après impôt — an 5",
  netAfterTax10: "Net après impôt — an 10",

  veHeading: "Capacité de financement indicative",
  veSub:
    "Estimation du prêt que le revenu normalisé peut soutenir selon le RCD, le taux de qualification et le ratio prêt-valeur. Ce calcul sert au financement : ce n’est ni une évaluation marchande ni une promesse de prêt.",
  veNormalizedNoi: "Revenu net normalisé",
  veNormalizedNote: "Après substitution des dépenses par les normes bancaires",
  veQualificationRate: "Taux de qualification",
  veMaxDebtService: "Service de la dette maximal",
  veMaxLoan: "Prêt maximal",
  veValue: "Base de financement indicative",
  veGap: "Écart de financement avec le prix",
  veCashRequired: "Mise de fonds requise avant frais",
  veCashShortfall: "Comptant additionnel dû à l'écart",
  veAbovePrice: "Le revenu soutient le financement maximal prévu; le prix demeure la limite.",
  veBelowPrice: "Le revenu ne soutient pas le financement maximal prévu; davantage de comptant est requis.",
  veShortfallNote:
    "Quand le prêt maximal est insuffisant, le comptant requis devient le prix moins le prêt maximal, auquel s’ajoutent les frais de clôture.",
  veVariesNote:
    "Chaque prêteur normalise différemment. Faites confirmer le revenu reconnu, les dépenses, le taux et le prêt maximal par un prêteur ou un courtier hypothécaire.",
  marketValueHeading: "Indications de valeur marchande actuelle",
  marketValueSub:
    "Pour un immeuble de cinq logements et plus, le TGA de marché doit venir de ventes comparables analysées, d’un évaluateur ou d’un courtier. Le calculateur ne le déduit jamais du prix demandé.",
  marketCapInput: "TGA de marché actuel vérifié",
  marketCapInputHelp: "Saisissez un TGA provenant de transactions comparables de 5+ logements ou d’une évaluation. Distinct du TGA de sortie.",
  marketGrmInput: "MRB de marché vérifié",
  marketGrmInputHelp: "Saisissez un MRB observé sur des ventes comparables. Laissez à 0 si vous n’avez pas de donnée vérifiée.",
  marketGrmValue: "Valeur par MRB de marché",
  marketCapValue: "Valeur par TGA de marché",
  selectedValue: "Indication principale par TGA",
  valueMargin: "Marge sur le prix",
  marketValueMissing: "TGA de marché non renseigné : aucune valeur marchande n’est retenue.",
  marketGrmSecondary: "Le MRB est un contrôle secondaire; il ne remplace pas la capitalisation du RNE.",
  notProvided: "Non renseigné",

  renoHeading: "Rénovation et relocation",
  renoSub:
    "Le loyer d'un locataire en place suit le cadre de fixation du TAL; il n'existe pas de plafond universel unique. Le rythme de relocation et les règles applicables déterminent la vitesse de valorisation.",
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
  janitorial: "Conciergerie",
  heating: "Chauffage",
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
  talGuideline: "Composante de base TAL",
  talGuidelineHelp: "Hypothèse de base seulement; taxes, assurances et travaux admissibles s'ajoutent selon l'immeuble.",
  appreciation: "Appréciation des comparables",
  appreciationHelp: "Croissance annuelle de la valeur appuyée par les ventes comparables du secteur",
  expenseGrowth: "Croissance des dépenses",
  capAtTal: "Limiter la croissance de base des loyers en place à l'hypothèse TAL",
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
  exitCapRate: "TGA de sortie — scénario",
  exitCapRateHelp: "Hypothèse de revente distincte du TGA de marché actuel. Le scénario initial n’est pas une donnée de transaction : remplacez-le et testez plusieurs taux.",
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
    "La colonne « Actuel » reprend les revenus et dépenses d’aujourd’hui. La colonne « Potentiel / futur » projette les loyers du marché et les dépenses à prévoir; chaque montant peut être ajusté, par exemple pour les taxes après réévaluation ou la gestion que vous assumerez vous-même.",
  typedIn: "Saisi",
  typedInOne: "1 montant proforma est saisi à la main plutôt que calculé",
  typedInMany: "montants proforma sont saisis à la main plutôt que calculés",
  highlightedBelow: "- surlignés ci-dessous.",
  recalculateIt: "Recalculer",
  recalculateThem: "Tout recalculer",
  colLine: "Poste",
  colInPlace: "Actuel",
  colInPlaceSub: "revenus et dépenses aujourd'hui",
  colPctRbe: "% du RBE",
  colProforma: "Potentiel / futur",
  colProformaSub: "loyers du marché et dépenses prévues",
  colDelta: "Δ",
  colDeltaSub: "le potentiel",
  income: "Revenus",
  grossScheduledIncome: "Revenu brut potentiel",
  vacancyCreditLoss: "Inoccupation et mauvaises créances",
  effectiveGrossIncome: "Revenu brut effectif",
  operatingExpenses: "Dépenses d'exploitation",
  capexReserve: "Réserve de capital (après RNE)",
  condoFeesLine: "Frais de copropriété",
  other: "Autres",
  totalOperatingExpenses: "Total des dépenses d'exploitation",
  netOperatingIncome: "Revenu net d'exploitation",
  adjustedNetOperatingIncome: "RNE ajusté après la réserve de capital",
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
  colValueAtExitCap: "Valeur selon le TGA de sortie",
  colLoanBalance: "Solde du prêt",
  colEquity: "Équité",
  optimizationHeading: "Potentiel d'optimisation locative",
  optimizationCopy:
    "Écart annuel entre les loyers actuels et les loyers potentiels saisis. La réalisation dépend du roulement, des travaux, des baux et des règles applicables du TAL.",
  optimizationMissing: "Aucun loyer futur distinct saisi",
  optimizationMissingCopy:
    "Le calculateur ne conclut pas que le potentiel est nul. Saisissez des loyers de marché vérifiés pour mesurer l’écart locatif.",
  optimizationEstimatedNone: "Aucun écart positif estimé",
  radarEstimatedPotentialNote:
    "Estimation du modèle à partir du revenu total annoncé, d’une composition typique et des loyers locaux. Elle donne un ordre de grandeur; le potentiel confirmé exige les baux, la typologie réelle et des loyers de marché comparables.",
  financialAnatomy: "Anatomie financière",
  financialAnatomySub:
    "Le TGA, le MRB et le MRN du sujet sont calculés automatiquement avec le prix offert, les revenus et les dépenses saisis. Ce ne sont pas des taux paritaires provenant de ventes comparables.",
  marketIndicators: "Ratios du sujet et exploitation",
  metric: "Indicateur",
  currentValue: "Actuel",
  potentialValue: "Potentiel",
  grm: "MRB — multiplicateur de revenu brut",
  netIncomeMultiplier: "MRN — multiplicateur de revenu net",
  operatingExpenseRatio: "Ratio de dépenses",
  cashFlowPerDoor: "Cash-flow / porte / mois",
  returnMatrix: "Rendements à 5 et 10 ans",
  returnMatrixSub:
    "TRI et VAN recalculés à chaque horizon, avant et après l'impôt estimé sur le revenu locatif, la récupération de DPA et le gain en capital.",
  horizon: "Horizon",
  beforeTax: "Avant impôt",
  afterTax: "Après impôt",
  afterTaxNpv: "VAN après impôt",
  equityTimeline: "Amortissement et équité",
  equityTimelineSub:
    "Capital et intérêts de chaque année, avec le capital cumulatif, selon l'amortissement sélectionné et le taux de renouvellement prévu.",
  principalPaid: "Capital remboursé",
  cumulativePrincipalPaid: "Capital cumulatif",
  interestPaid: "Intérêts payés",
  recovery: "Récupération du comptant",
  totalReturnRecovery: "Par rendement total",
  cashFlowRecovery: "Par cash-flow seulement",
  externalDueDiligence: "Vérifications externes non incluses",
  externalDueDiligenceNote:
    "Les risques d'inondation, de glissement de terrain, le zonage, la contamination et les services à proximité exigent des sources géospatiales et municipales vérifiées; le calculateur ne les présume pas.",
  score: "Score",
  positives: "Forces",
  warnings: "Points à surveiller",
  verdictStrongBuy: "Très solide",
  verdictBuy: "Solide",
  verdictHold: "À approfondir",
  verdictAvoid: "Fragile",

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

  purchaseCap: "Cap rate at offer price",
  purchaseCapNote: "on in-place NOI",
  proformaCap: "Potential cap rate",
  proformaCapNote: "at market rents",
  pricePerUnit: "Price per door",
  totalEquity: "Total equity",
  totalEquityNote: "cash to close",
  cocYear1: "Cash-on-cash (yr 1)",
  avgCoc: "Average cash-on-cash",
  dscr: "DSCR",
  currentNoi: "Current NOI",
  currentRbe: "Current EGI",
  potential: "Potential",
  currentCashFlow: "Current cash flow",
  irr: "IRR",
  afterTaxIrr: "After-tax IRR",
  equityMultiple: "Equity multiple",
  proformaCashFlow: "Proforma cash flow",
  proformaCashFlowNote: "all units at market",
  npv: "NPV",
  discountedAt: "discounted at",
  keyMetrics: "Key return metrics",
  valuationMethod: "Valuation method",
  incomeApproach: "5+ units · income and cap-rate approach",
  incomeApproachNote:
    "Current market value requires a cap rate supported by verified sales. Projected value separately uses your exit cap rate; financing capacity depends on the lender’s DSCR.",
  comparableApproach: "1–4 units · sold comparables",
  comparableApproachNote:
    "Projected value starts from the value supported by comparable sales, then applies expected appreciation. Cap rate remains a return metric but does not set resale value.",
  unitsSuffix: "units",
  perMonth: "/mo",
  perYear: "/yr",
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
  comparableValue: "Value from sold comparables",
  comparableValueHelp: "Current market value estimated from recent comparable sales, separate from the offer price",
  comparableFromRadar: "Comparable value saved by Plex Radar",
  comparableMissingRadar: "Plex Radar does not yet have a saved comparable value for this listing; enter a value supported by verified sales.",
  comparableSales: "comparable sales",
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
  fromUnitMix: "Sum of the Unit mix tab",
  fromUnitMixArea: "Sum of the ft² in the Unit mix tab",
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
  radarAggregateIncomeTitle: "Estimate based on Centris information",
  radarAggregateIncomeNote:
    "Total income, door count, property type and area provide a useful initial estimate. The model allocates advertised income across a typical unit mix and applies local modeled rents; these are not the actual leases. Replace the estimates with the rent roll when it becomes available.",
  confirmRentRoll: "I replaced these figures with the actual rent roll",
  unitTypeUnknown: "Type to confirm",
  derivedFromAggregate: "derived from advertised total income",
  colType: "Type",
  colUnits: "Units",
  colInPlaceRent: "In-place rent",
  colMarketRent: "Market rent",
  colSqftPerUnit: "ft² / unit",
  colMonthlyUpside: "Monthly upside",
  remove: "Remove",
  total: "Total",
  colCmhcRent: "CMHC average",
  cmhcOptimizationLabel: "Optimization potential",
  cmhcOptimizationNote:
    "Sum of the gaps on units below the CMHC average. Units already above are not netted off: a sitting tenant's rent cannot be reduced.",
  cmhcSourceNote: "CMHC Rental Market Survey — October 2025",
  cmhcLowReliability: "Thin sample (CMHC code D) — use with caution",
  cmhcLevelZone: "CMHC zone",
  cmhcLevelCma: "CMA average",
  cmhcOccupiedCaveat:
    "Average across occupied units, not asking rent on turnover. Under TAL rent control the gap between the two is real: this benchmarks whether in-place leases are under-set, not what you will get tomorrow.",
  cmhcEstimatedWithoutRentRoll:
    "Indicative comparison: the unit mix and rent allocation are estimated from the property type, area and total Centris income. Confirm them against the rent roll.",
  modelEstimate: "Model estimate",
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
  modeStandard: "CMHC Standard 5–6",
  modeMli: "CMHC MLI Select",
  notAvailable5Plus: "Not available at 5+ units",
  commercialStartsAt5: "Commercial tracks start at 5 units",
  ownerOccupied: "I will occupy one of the units",
  ownerOccupiedHelp:
    "Mortgage insurance on 1–4 units requires it. The selected unit is removed from rental income, while its market rent remains in the resale valuation.",
  ownerOccupiedUnit: "Buyer-occupied unit",
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
  compounding: "Rate compounding",
  semiAnnual: "Canadian semi-annual",
  monthly: "Monthly",
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
  financingComparison: "Compare financing structures",
  financingComparisonSub:
    "Indicative comparison using the same income, expenses and exit assumptions. Rates shown are not loan offers.",
  scenario: "Scenario",
  currentScenario: "Selected",
  unavailable: "Unavailable",
  cashRequired: "Cash required",
  insurancePremium: "Insurance premium",
  totalLoan: "Total loan",
  colAmortization: "Amort.",
  irr5: "5-year IRR",
  irr10: "10-year IRR",
  netAfterTax5: "After-tax net — year 5",
  netAfterTax10: "After-tax net — year 10",

  veHeading: "Indicative financing capacity",
  veSub:
    "Estimate of the loan supported by normalized income under the DSCR, qualification rate and loan-to-value assumptions. This is a financing calculation, not a market appraisal or loan offer.",
  veNormalizedNoi: "Normalized NOI",
  veNormalizedNote: "After substituting the bank's expense standards",
  veQualificationRate: "Qualification rate",
  veMaxDebtService: "Maximum debt service",
  veMaxLoan: "Maximum loan",
  veValue: "Indicative financing basis",
  veGap: "Financing gap to price",
  veCashRequired: "Required down payment before costs",
  veCashShortfall: "Extra cash due to the gap",
  veAbovePrice: "Income supports the modeled maximum financing; price remains the limit.",
  veBelowPrice: "Income does not support the modeled maximum financing; more cash is required.",
  veShortfallNote:
    "When the maximum loan is insufficient, required cash becomes price minus maximum loan, plus closing costs.",
  veVariesNote:
    "Every lender normalizes differently. Have the recognized income, expenses, rate and maximum loan confirmed by a lender or mortgage broker.",
  marketValueHeading: "Current market-value indications",
  marketValueSub:
    "For a property with five units or more, the market cap rate must come from analyzed comparable sales, an appraiser or a broker. The calculator never infers it from asking price.",
  marketCapInput: "Verified current market cap rate",
  marketCapInputHelp: "Enter a cap rate from comparable 5+ unit sales or an appraisal. Keep it separate from the exit cap rate.",
  marketGrmInput: "Verified market GRM",
  marketGrmInputHelp: "Enter a GRM observed in comparable sales. Leave at 0 when no verified figure is available.",
  marketGrmValue: "Market GRM value",
  marketCapValue: "Market cap-rate value",
  selectedValue: "Primary cap-rate indication",
  valueMargin: "Margin to price",
  marketValueMissing: "Market cap rate not provided: no market value is selected.",
  marketGrmSecondary: "GRM is a secondary cross-check; it does not replace NOI capitalization.",
  notProvided: "Not provided",

  renoHeading: "Renovation and turnover",
  renoSub:
    "A sitting tenant's rent follows the TAL rent-fixing framework; there is no single universal ceiling. Turnover timing and the applicable rules determine how quickly the value-add lands.",
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
  janitorial: "Janitorial",
  heating: "Heating",
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
  talGuideline: "TAL base component",
  talGuidelineHelp: "Base planning assumption only; property-specific taxes, insurance and eligible work are additional.",
  appreciation: "Comparable-sales appreciation",
  appreciationHelp: "Annual value growth supported by comparable sales in the area",
  expenseGrowth: "Expense growth",
  capAtTal: "Limit in-place base rent growth to the TAL assumption",
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
  exitCapRate: "Exit cap rate — scenario",
  exitCapRateHelp: "Resale assumption kept separate from the current market cap rate. The initial scenario is not transaction data: replace it and test several rates.",
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
    "The Current column shows today’s income and expenses. Potential / future projects market rents and forecast expenses; every figure can be adjusted, for example for reassessed taxes or management you plan to handle yourself.",
  typedIn: "Typed in",
  typedInOne: "1 proforma figure is typed in by hand instead of calculated",
  typedInMany: "proforma figures are typed in by hand instead of calculated",
  highlightedBelow: "- highlighted below.",
  recalculateIt: "Recalculate it",
  recalculateThem: "Recalculate them",
  colLine: "Line",
  colInPlace: "Current",
  colInPlaceSub: "income and expenses today",
  colPctRbe: "% of EGI",
  colProforma: "Potential / future",
  colProformaSub: "market rents and forecast expenses",
  colDelta: "Δ",
  colDeltaSub: "the upside",
  income: "Income",
  grossScheduledIncome: "Gross scheduled income",
  vacancyCreditLoss: "Vacancy & credit loss",
  effectiveGrossIncome: "Effective gross income",
  operatingExpenses: "Operating expenses",
  capexReserve: "Capital reserve (below NOI)",
  condoFeesLine: "Condo fees",
  other: "Other",
  totalOperatingExpenses: "Total operating expenses",
  netOperatingIncome: "Net operating income",
  adjustedNetOperatingIncome: "Adjusted NOI after capital reserve",
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
  colValueAtExitCap: "Value at the exit cap rate",
  colLoanBalance: "Loan balance",
  colEquity: "Equity",
  optimizationHeading: "Rental optimization potential",
  optimizationCopy:
    "Annual gap between current rents and the potential rents entered. Realization depends on turnover, renovations, leases and applicable rental rules.",
  optimizationMissing: "No distinct future rents entered",
  optimizationMissingCopy:
    "The calculator does not conclude that potential is zero. Enter verified market rents to measure the rental gap.",
  optimizationEstimatedNone: "No positive gap estimated",
  radarEstimatedPotentialNote:
    "Model estimate based on advertised total income, a typical unit mix and local rents. It provides an order of magnitude; confirmed upside requires the leases, actual unit mix and comparable market-rent evidence.",
  financialAnatomy: "Financial anatomy",
  financialAnatomySub:
    "The subject property's cap rate, GRM and NIM are calculated automatically from the offer price, entered income and expenses. They are not parity rates from comparable sales.",
  marketIndicators: "Subject-property and operating ratios",
  metric: "Metric",
  currentValue: "Current",
  potentialValue: "Potential",
  grm: "GRM — gross rent multiplier",
  netIncomeMultiplier: "NIM — net income multiplier",
  operatingExpenseRatio: "Operating expense ratio",
  cashFlowPerDoor: "Cash flow / door / month",
  returnMatrix: "5- and 10-year returns",
  returnMatrixSub:
    "IRR and NPV are recalculated at each horizon, before and after estimated rental income tax, CCA recapture and capital gains tax.",
  horizon: "Horizon",
  beforeTax: "Before tax",
  afterTax: "After tax",
  afterTaxNpv: "After-tax NPV",
  equityTimeline: "Amortization and equity",
  equityTimelineSub:
    "Annual principal and interest, plus cumulative principal, under the selected amortization and expected renewal rate.",
  principalPaid: "Principal paid",
  cumulativePrincipalPaid: "Cumulative principal",
  interestPaid: "Interest paid",
  recovery: "Cash recovery",
  totalReturnRecovery: "From total return",
  cashFlowRecovery: "From cash flow only",
  externalDueDiligence: "External due diligence not included",
  externalDueDiligenceNote:
    "Flood, landslide, zoning, contamination and nearby-service risks require verified geospatial and municipal sources; the calculator does not presume them.",
  score: "Score",
  positives: "Strengths",
  warnings: "Watch items",
  verdictStrongBuy: "Very strong",
  verdictBuy: "Strong",
  verdictHold: "Needs review",
  verdictAvoid: "Fragile",

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
