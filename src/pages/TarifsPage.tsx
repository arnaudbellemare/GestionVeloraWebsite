import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useLocale } from "../context/LocaleContext";
import { ScrollReveal } from "../components/ScrollReveal";
import { useGoToContact } from "../hooks/useGoToContact";
import { Breadcrumbs } from "../components/Breadcrumbs";

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

interface PricingTier {
  name: string;
  priceNote: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export function TarifsPage() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { contactHref, goToContact } = useGoToContact();
  const isEn = locale === "en";

  useEffect(() => {
    document.title = isEn
      ? "Property Management Pricing Montreal | Gestion Velora"
      : "Tarifs gestion immobilière Montréal | Gestion Velora";
    setMeta(
      "description",
      isEn
        ? "Transparent property management pricing in Montreal. Condo board, Airbnb, and rental management fees with no hidden costs."
        : "Tarifs transparents pour la gestion immobilière à Montréal. Syndicat de copropriété, Airbnb et location longue durée, sans frais cachés."
    );
  }, [isEn]);

  const syndicatTiers: PricingTier[] = isEn
    ? [
        {
          name: "Essential",
          priceNote: "Typically $33–$36 / unit / month",
          description: "Core condo board administration for small buildings (up to 12 units). Final pricing depends on mandate specifics.",
          features: [
            "Annual general assembly",
            "Monthly financial reports",
            "Maintenance request tracking",
            "Email support",
          ],
          cta: "Request a quote",
        },
        {
          name: "Standard",
          priceNote: "Up to $40 / unit / month with app integrations",
          description: "Full administration with reserve fund management for mid-size buildings, including portals and operational tooling.",
          features: [
            "Everything in Essential",
            "App & portal integrations (pricing up to $40/unit/month)",
            "Reserve fund management (Loi 141)",
            "Major work coordination",
            "Owner portal access",
            "24/7 emergency line",
          ],
          cta: "Request a quote",
          highlighted: true,
        },
        {
          name: "Premium",
          priceNote: "Custom pricing",
          description: "White-glove management for large or complex condominiums.",
          features: [
            "Everything in Standard",
            "Dedicated property manager",
            "Custom reporting dashboard",
            "Annual reserve fund study",
            "Legal & compliance advisory",
          ],
          cta: "Contact us",
        },
      ]
    : [
        {
          name: "Essentiel",
          priceNote: "Généralement 33 $ à 36 $ / unité / mois",
          description: "Administration de base pour petits syndicats (jusqu'à 12 unités). Montant selon les spécificités du mandat.",
          features: [
            "Assemblée générale annuelle",
            "Rapports financiers mensuels",
            "Suivi des demandes de maintenance",
            "Support par courriel",
          ],
          cta: "Obtenir une soumission",
        },
        {
          name: "Standard",
          priceNote: "Jusqu'à 40 $ / unité / mois avec intégrations applicatives",
          description: "Administration complète avec portails et outils applicatifs, et gestion du fonds de prévoyance pour immeubles de taille moyenne.",
          features: [
            "Tout ce qui est inclus dans Essentiel",
            "Intégrations applicatives et portails (jusqu'à 40 $ / unité / mois)",
            "Gestion du fonds de prévoyance (Loi 141)",
            "Coordination des travaux majeurs",
            "Accès au portail copropriétaires",
            "Ligne d'urgence 24/7",
          ],
          cta: "Obtenir une soumission",
          highlighted: true,
        },
        {
          name: "Premium",
          priceNote: "Tarif sur mesure",
          description: "Gestion sur mesure pour grands immeubles ou copropriétés complexes.",
          features: [
            "Tout ce qui est inclus dans Standard",
            "Gestionnaire dédié",
            "Tableau de bord personnalisé",
            "Étude de réserve annuelle",
            "Conseil juridique et conformité",
          ],
          cta: "Nous contacter",
        },
      ];

  const locationTiers: PricingTier[] = isEn
    ? [
        {
          name: "Basic",
          priceNote: "One month's rent",
          description: "Rent collection and tenant communications. Our fee is structured as one month's gross rent under the mandate terms.",
          features: [
            "Tenant screening",
            "Rent collection",
            "Monthly statements",
            "Basic maintenance coordination",
          ],
          cta: "Request a quote",
        },
        {
          name: "Full Service",
          priceNote: "One month's rent",
          description: "End-to-end rental management including leasing and maintenance, for the same one-month-rent fee structure with broader service scope.",
          features: [
            "Everything in Basic",
            "Lease drafting and renewals",
            "24/7 emergency maintenance",
            "Annual property inspection",
            "Owner portal access",
          ],
          cta: "Request a quote",
          highlighted: true,
        },
      ]
    : [
        {
          name: "Base",
          priceNote: "Honoraires : 1 mois de loyer",
          description: "Collecte des loyers et communications avec les locataires. Rémunération équivalente à un mois de loyer brut, selon modalités du mandat.",
          features: [
            "Sélection des locataires",
            "Collecte des loyers",
            "Relevés mensuels",
            "Coordination de base des travaux",
          ],
          cta: "Obtenir une soumission",
        },
        {
          name: "Complet",
          priceNote: "Honoraires : 1 mois de loyer",
          description: "Gestion locative complète incluant mise en location et maintenance. Même principe (un mois de loyer), périmètre de services élargi.",
          features: [
            "Tout ce qui est inclus dans Base",
            "Rédaction et renouvellement des baux",
            "Maintenance d'urgence 24/7",
            "Inspection annuelle",
            "Accès au portail propriétaire",
          ],
          cta: "Obtenir une soumission",
          highlighted: true,
        },
      ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="pt-24 lg:pt-32 pb-24 px-6 lg:px-16"
    >
      <div className="max-w-[90rem] mx-auto">
        <Breadcrumbs
          items={[
            { label: t("breadcrumb.home"), to: "/" },
            { label: isEn ? "Pricing" : "Tarifs" },
          ]}
        />

        <ScrollReveal className="mb-16 mt-8">
          <h1 className="font-playfair font-semibold text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08] tracking-[-0.02em] text-nd-display mb-4">
            {isEn ? "Transparent pricing for every property type" : "Tarifs transparents pour chaque type de bien"}
          </h1>
          <p className="font-sans text-base lg:text-lg text-nd-secondary max-w-2xl">
            {isEn
              ? "All plans include onboarding, setup, and dedicated support. No hidden fees; pricing is based on the size and complexity of your mandate."
              : "Tous les forfaits incluent l'intégration, la configuration et un support dédié. Aucun frais caché; les tarifs dépendent de la taille et de la complexité de votre mandat."}
          </p>
        </ScrollReveal>

        {/* Syndicat section */}
        <section className="mb-20">
          <ScrollReveal className="mb-10">
            <h2 id="pricing-condo-board" className="font-sans font-semibold text-2xl lg:text-3xl text-nd-display tracking-[-0.015em]">
              {isEn ? "Condo board management" : "Gestion de syndicat de copropriété"}
            </h2>
            <p className="font-sans text-nd-secondary mt-2 max-w-3xl">
              {isEn
                ? "Per unit per month, minimum 6-unit buildings. Typical range is $33–$36 per unit depending on mandate specifics; packages with app and portal integrations can go up to $40."
                : "Par unité par mois, immeubles de 6 unités minimum. Fourchette habituelle : 33 $ à 36 $ / unité selon les spécificités du mandat ; avec intégrations applicatives (portails, outils), jusqu'à 40 $ / unité / mois."}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {syndicatTiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 0.08}>
                <div
                  className={`rounded-2xl border p-8 flex flex-col h-full ${
                    tier.highlighted
                      ? "border-nd-primary bg-nd-primary/5"
                      : "border-nd-border bg-nd-canvas"
                  }`}
                >
                  {tier.highlighted && (
                    <span className="inline-block font-mono text-[10px] uppercase tracking-[0.12em] text-nd-primary mb-3">
                      {isEn ? "Most popular" : "Le plus populaire"}
                    </span>
                  )}
                  <h3 id={`pricing-condo-tier-${i + 1}`} className="font-sans font-semibold text-xl text-nd-display mb-1">{tier.name}</h3>
                  <p className="font-sans font-medium text-nd-primary text-lg mb-3">{tier.priceNote}</p>
                  <p className="font-sans text-sm text-nd-secondary mb-6 leading-relaxed">{tier.description}</p>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 font-sans text-sm text-nd-primary">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nd-primary" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={contactHref}
                    onClick={goToContact}
                    className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-sans font-semibold text-sm uppercase tracking-[0.1em] transition-colors ${
                      tier.highlighted
                        ? "bg-nd-primary text-white hover:bg-nd-primary/90"
                        : "border border-nd-border text-nd-primary hover:border-nd-primary/50"
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Location section */}
        <section className="mb-20">
          <ScrollReveal className="mb-10">
            <h2 id="pricing-rental-management" className="font-sans font-semibold text-2xl lg:text-3xl text-nd-display tracking-[-0.015em]">
              {isEn ? "Rental management" : "Gestion locative longue durée"}
            </h2>
            <p className="font-sans text-nd-secondary mt-2 max-w-3xl">
              {isEn
                ? "Fees are structured as one month’s gross rent under the mandate (not a percentage of each month’s collections)."
                : "Honoraires calibrés sur un mois de loyer brut (forfait lié au mandat), et non sur un pourcentage mensuel des loyers perçus."}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
            {locationTiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 0.08}>
                <div
                  className={`rounded-2xl border p-8 flex flex-col h-full ${
                    tier.highlighted
                      ? "border-nd-primary bg-nd-primary/5"
                      : "border-nd-border bg-nd-canvas"
                  }`}
                >
                  {tier.highlighted && (
                    <span className="inline-block font-mono text-[10px] uppercase tracking-[0.12em] text-nd-primary mb-3">
                      {isEn ? "Recommended" : "Recommandé"}
                    </span>
                  )}
                  <h3 id={`pricing-rental-tier-${i + 1}`} className="font-sans font-semibold text-xl text-nd-display mb-1">{tier.name}</h3>
                  <p className="font-sans font-medium text-nd-primary text-lg mb-3">{tier.priceNote}</p>
                  <p className="font-sans text-sm text-nd-secondary mb-6 leading-relaxed">{tier.description}</p>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 font-sans text-sm text-nd-primary">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nd-primary" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={contactHref}
                    onClick={goToContact}
                    className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-sans font-semibold text-sm uppercase tracking-[0.1em] transition-colors ${
                      tier.highlighted
                        ? "bg-nd-primary text-white hover:bg-nd-primary/90"
                        : "border border-nd-border text-nd-primary hover:border-nd-primary/50"
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Airbnb note */}
        <section className="mb-20">
          <ScrollReveal>
            <div className="rounded-2xl border border-nd-border bg-nd-surface p-8 max-w-2xl">
              <h2 id="pricing-airbnb-short-term" className="font-sans font-semibold text-xl text-nd-display mb-2">
                {isEn ? "Airbnb & short-term rental" : "Airbnb et location courte durée"}
              </h2>
              <p className="font-sans text-nd-secondary mb-4">
                {isEn
                  ? "Short-term rental management fees depend on volume, property type, and services required. Typically 18–25% of booking revenue. Contact us for a custom quote."
                  : "Les frais de gestion Airbnb varient selon le volume, le type de bien et les services requis. Généralement 18–25 % des revenus de réservation. Contactez-nous pour une soumission sur mesure."}
              </p>
              <a
                href={contactHref}
                onClick={goToContact}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full font-sans font-semibold text-sm uppercase tracking-[0.1em] border border-nd-border text-nd-primary hover:border-nd-primary/50 transition-colors"
              >
                {isEn ? "Get a quote" : "Obtenir une soumission"}
              </a>
            </div>
          </ScrollReveal>
        </section>

        {/* FAQ */}
        <section>
          <ScrollReveal className="mb-8">
            <h2 id="pricing-faq" className="font-sans font-semibold text-2xl text-nd-display">
              {isEn ? "Pricing FAQ" : "FAQ sur les tarifs"}
            </h2>
          </ScrollReveal>
          <div className="max-w-2xl space-y-6">
            {(isEn
              ? [
                  {
                    q: "Are there setup or onboarding fees?",
                    a: "No. Onboarding, file transfer, and portal setup are included in your first month at no additional cost.",
                  },
                  {
                    q: "Is there a minimum contract duration?",
                    a: "Most mandates are 12-month agreements, renewable annually. We also offer month-to-month arrangements for smaller portfolios.",
                  },
                  {
                    q: "What's not included?",
                    a: "Maintenance and repair costs are paid directly by the property or condo board; we coordinate the work but don't mark up contractor invoices.",
                  },
                ]
              : [
                  {
                    q: "Y a-t-il des frais d'intégration ou de démarrage ?",
                    a: "Non. L'intégration, le transfert de dossiers et la configuration du portail sont inclus dans votre premier mois sans frais supplémentaires.",
                  },
                  {
                    q: "Quelle est la durée minimale du contrat ?",
                    a: "La plupart des mandats sont des ententes de 12 mois, renouvelables annuellement. Nous offrons aussi des arrangements mensuels pour les petits portefeuilles.",
                  },
                  {
                    q: "Qu'est-ce qui n'est pas inclus ?",
                    a: "Les coûts de maintenance et de réparation sont payés directement par l'immeuble ou le syndicat; nous coordonnons les travaux mais ne majorons pas les factures des entrepreneurs.",
                  },
                ]
            ).map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.07}>
                <div className="border-b border-nd-border pb-6">
                  <h3 id={`pricing-faq-item-${i + 1}`} className="font-sans font-medium text-nd-display mb-2">{item.q}</h3>
                  <p className="font-sans text-nd-secondary text-sm leading-relaxed">{item.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
