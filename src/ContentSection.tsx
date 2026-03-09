import { motion } from "framer-motion";
import { ScrollReveal } from "./components/ScrollReveal";

const benefitCards = [
  {
    icon: "▣",
    title: "Maximiser la valeur de la propriété",
    description:
      "Obtenez des rendements plus élevés grâce à une maintenance proactive, des stratégies de location axées sur le marché et une surveillance financière experte pour protéger et faire fructifier votre investissement.",
  },
  {
    icon: "◉",
    title: "Surveillance transparente de plusieurs propriétés",
    description:
      "Suivez et gérez facilement plusieurs propriétés, en garantissant une qualité, une conformité et une satisfaction des locataires constantes sur tous les sites.",
  },
  {
    icon: "◈",
    title: "Simplifiez la communication",
    description:
      "Éliminez les barrières grâce à une communication réactive entre locataires et propriétaires, une assistance 24h/24 et 7j/7 et des rapports transparents auxquels vous pouvez faire confiance.",
  },
  {
    icon: "◇",
    title: "Voyez votre croissance en action",
    description:
      "Accédez à des rapports clairs et visuels sur l'occupation, les revenus et les dépenses afin de pouvoir prendre des décisions sûres et fondées sur des données pour votre portefeuille.",
  },
];

const bigPictureItems = [
  {
    number: "01",
    text: "Détectez les problèmes avant qu'ils ne s'aggravent : des demandes de maintenance aux écarts budgétaires, recevez des alertes et des mises à jour avant que les petits problèmes ne deviennent des réparations coûteuses.",
  },
  {
    number: "02",
    text: "Mettez tout le monde sur la même longueur d'onde : partagez des données financières, des résumés de réunions et des rapports d'étape faciles à lire, disponibles en français et en anglais.",
  },
  {
    number: "03",
    text: "Donnez vie à l'évolution de votre bâtiment : santé financière, projets à venir et étapes clés, clairement affichés pour que chacun puisse les suivre.",
  },
  {
    number: "04",
    text: "Simplifiez la gestion immobilière avec toutes les données, documents et mises à jour de votre bâtiment dans un accès unique et facile à utiliser.",
  },
];

const serviceColumns = [
  {
    title: "Syndicat de copropriété",
    features: [
      "Gestion stratégique: Permet aux administrateurs de se concentrer sur les décisions majeures.",
      "Expertise financière: Comptabilité professionnelle et rapports mensuels.",
      "Entretien planifié: Gestion experte pour la conservation de la valeur de l'actif.",
      "Ressources humaines optimisées: Collaboration et suivi de qualité avec le personnel et les fournisseurs.",
    ],
  },
  {
    title: "Airbnb",
    features: [
      "Gestion des opérations quotidiennes: Libérez-vous du temps, nous gérons les communications et la logistique pour vous.",
      "Suivi financier simplifié: Recevez des rapports clairs sur vos revenus et dépenses pour une rentabilité optimale.",
      "Entretien réactif: Les réparations sont souvent gérées au cas par cas par l'hôte.",
      "Assistance 24/7 pour les urgences: Offrez une tranquillité d'esprit à vos voyageurs et à vous-même.",
    ],
  },
  {
    title: "Location",
    features: [
      "Gestion administrative de A à Z: Nous nous occupons des baux, de la perception des loyers et des communications.",
      "Conformité légale et comptable: Sécurisez votre investissement grâce à notre expertise des lois et des finances.",
      "Plan d'entretien préventif: Protégez et valorisez votre bien immobilier sur le long terme.",
      "Interface professionnelle avec les locataires: Nous gérons les relations et les demandes pour une location sans tracas.",
    ],
  },
];

const customSolutions = [
  {
    number: "01",
    title: "Expertise Administrative simplifiée",
    description:
      "Nous gérons avec précision tous les aspects administratifs de vos propriétés, des contrats de location aux obligations légales, grâce à notre plateforme intuitive qui vous offre un contrôle total en temps réel.",
  },
  {
    number: "02",
    title: "Optimisation financière sur mesure",
    description:
      "Avec une gestion rigoureuse des flux financiers et des rapports détaillés, nous maximisons la rentabilité de vos investissements tout en vous offrant une transparence totale sur vos performances immobilières.",
  },
  {
    number: "03",
    title: "Entretien et satisfaction garantis",
    description:
      "Nous prenons soin de vos biens au quotidien, de l'entretien aux réparations, pour assurer leur parfait état et la satisfaction de vos locataires, vous libérant ainsi de tout souci opérationnel.",
  },
];

export const ContentSection = (): JSX.Element => {
  return (
    <section className="relative">
      {/* Bénéfice Section */}
      <section id="benefice" className="py-32 px-6 lg:px-12 border-t border-black/5 dark:border-white/5 bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-16">
            <p className="font-sans text-sm uppercase tracking-[0.2em] text-velora-green mb-4">
              Bénéfice
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-velora-dark dark:text-white leading-tight tracking-tight mb-6 max-w-3xl">
              Nous avons déchiffré le code d&apos;une gestion immobilière sans
              tracas.
            </h2>
            <p className="font-sans text-lg text-velora-muted dark:text-white/70 max-w-2xl">
              Nous offrons des solutions de gestion immobilière concrètes, sans
              tracas ni incertitudes.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {benefitCards.map((card, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.article
                  whileHover={{ y: -4 }}
                  className="group p-8 rounded-2xl border border-black/5 dark:border-white/5 bg-[#faf9f7] dark:bg-white/[0.02] hover:bg-accentaccent-2/20 dark:hover:bg-white/[0.04] hover:border-velora-green/20 dark:hover:border-white/10 transition-all duration-300"
                >
                  <span className="text-2xl text-velora-green dark:text-velora-light mb-6 block">
                    {card.icon}
                  </span>
                  <h3 className="font-serif text-xl text-velora-dark dark:text-white mb-4">
                    {card.title}
                  </h3>
                  <p className="font-sans text-sm text-velora-muted dark:text-white/60 leading-relaxed">
                    {card.description}
                  </p>
                </motion.article>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Hero image */}
        <ScrollReveal className="max-w-7xl mx-auto mt-24">
          <div className="rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 aspect-video">
            <img
              src="/hero-image.png"
              alt="Gestion immobilière"
              className="w-full h-full object-cover"
              onError={(e) => {
                const el = e.currentTarget;
                el.style.background =
                  "linear-gradient(135deg, rgba(72,92,17,0.3) 0%, rgba(10,10,10,0.9) 100%)";
                el.alt = "";
              }}
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Big Picture Section */}
      <section id="comment-faire" className="py-32 px-6 lg:px-12 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/2">
            <ScrollReveal>
              <h2 className="font-serif text-4xl md:text-5xl text-velora-dark dark:text-white leading-tight mb-6">
                Voir la situation dans son ensemble
              </h2>
              <p className="font-sans text-lg text-velora-muted dark:text-white/70 mb-12">
                Nous rendons la gestion immobilière de Montréal claire, simple et
                transparente, afin que vous sachiez toujours exactement ce qui se
                passe dans votre immeuble.
              </p>
            </ScrollReveal>

            <div className="space-y-0">
              {bigPictureItems.map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.05}>
                  <div className="py-8 border-t border-black/5 dark:border-white/5 flex gap-8">
                    <span className="font-sans text-velora-green dark:text-velora-light/80 text-sm shrink-0">
                      {item.number}
                    </span>
                    <p className="font-sans text-velora-dark dark:text-white/80">{item.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <a
                href="mailto:info@gestionvelora.com"
                rel="noopener noreferrer"
                target="_blank"
                className="inline-flex items-center gap-2 mt-12 px-8 py-4 bg-accentaccent-2 text-velora-dark rounded-full font-sans font-bold text-sm hover:bg-accentaccent-2/90 transition-colors"
              >
                En savoir plus
                <span className="w-1.5 h-1.5 border-r border-t border-velora-dark rotate-45" />
              </a>
            </ScrollReveal>
          </div>

          <ScrollReveal className="lg:w-1/2">
            <div className="rounded-3xl aspect-[4/5] bg-gradient-to-br from-mid-green/20 to-velora-dark/20 dark:from-velora-green/20 dark:to-velora-dark border border-black/5 dark:border-white/5" />
          </ScrollReveal>
        </div>
      </section>

      {/* Spécifications Section */}
      <section id="specification" className="py-32 px-6 lg:px-12 border-t border-velora-green/30 bg-[#faf9f7] dark:bg-transparent">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-20">
            <p className="font-sans text-sm uppercase tracking-[0.2em] text-velora-green mb-4">
              Spécifications
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-velora-dark dark:text-white leading-tight mb-6">
              Pourquoi choisir Gestion Velora ?
            </h2>
            <p className="font-sans text-lg text-velora-muted dark:text-white/70 max-w-2xl mx-auto mb-10">
              Parce que votre immeuble mérite une gestion aussi proactive que
              vous. Gestion Velora se concentre sur des systèmes rationalisés
              pour que vous puissiez vous concentrer sur les résultats.
            </p>
            <a
              href="mailto:info@gestionvelora.com"
              rel="noopener noreferrer"
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accentaccent-2 text-velora-dark rounded-full font-sans font-bold text-sm hover:bg-accentaccent-2/90 transition-colors"
            >
              En savoir plus
              <span className="w-1.5 h-1.5 border-r border-t border-velora-dark rotate-45" />
            </a>
          </ScrollReveal>

          <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-4">
            {serviceColumns.map((column, colIndex) => (
              <ScrollReveal key={colIndex} delay={colIndex * 0.1}>
                <article
                  className={`flex-1 min-w-[300px] lg:min-w-0 rounded-2xl overflow-hidden border ${
                    colIndex === 0
                      ? "bg-white dark:bg-white/[0.03] border-black/10 dark:border-white/10 shadow-sm"
                      : "bg-white/50 dark:bg-transparent border-black/5 dark:border-white/5"
                  }`}
                >
                  <div className="p-8 border-b border-black/5 dark:border-white/5">
                    <h3 className="font-serif text-2xl text-velora-dark dark:text-white">
                      {column.title}
                    </h3>
                  </div>
                  <div className="divide-y divide-black/5 dark:divide-white/5">
                    {column.features.map((feature, i) => (
                      <div key={i} className="p-8">
                        <p className="font-sans text-sm text-velora-muted dark:text-white/70">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-32 px-6 lg:px-12 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <ScrollReveal className="lg:w-1/2">
            <div className="rounded-3xl aspect-[4/5] overflow-hidden bg-gradient-to-br from-mid-green/30 to-velora-dark/30 dark:from-velora-green/30 dark:to-velora-dark">
              <img
                src="/image.png"
                alt="Témoignage"
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal className="lg:w-1/2">
            <blockquote className="font-serif text-3xl md:text-4xl text-velora-dark dark:text-white leading-snug mb-10">
              « Gestion Velora a complètement transformé notre façon de gérer
              cette propriété. Les visualisations de données sont claires et
              intuitives, et la plateforme est très facile à utiliser. Je ne peux
              pas imaginer gérer mon syndicat sans elle. »
            </blockquote>
            <footer>
              <cite className="font-sans font-semibold text-velora-dark dark:text-white not-italic">
                John Smith
              </cite>
              <p className="font-sans text-sm text-velora-muted dark:text-white/60 mt-1">
                Président du syndicat de copropriété
              </p>
            </footer>
          </ScrollReveal>
        </div>
      </section>

      {/* Custom Solutions */}
      <section className="py-32 px-6 lg:px-12 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-20">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-velora-dark dark:text-white leading-tight">
              Une gestion sur mesure à l&apos;écoute de vos besoins
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {customSolutions.map((solution, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <article className="border-t border-black/5 dark:border-white/5 pt-10">
                  <span className="font-serif text-6xl text-velora-green/50 dark:text-velora-light/50 block mb-8">
                    {solution.number}
                  </span>
                  <h3 className="font-serif text-xl text-velora-dark dark:text-white mb-4">
                    {solution.title}
                  </h3>
                  <p className="font-sans text-velora-muted dark:text-white/70">
                    {solution.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Property showcase */}
      <section className="py-20 px-6 lg:px-12">
        <ScrollReveal className="max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden aspect-video">
            <img
              src="/image-2.png"
              alt="Showcase immobilier"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(72,92,17,0.2) 0%, rgba(10,10,10,0.8) 100%)";
              }}
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Contact CTA */}
      <section
        id="contactez-nous"
        className="py-32 px-6 lg:px-12 border-t border-black/5 dark:border-white/5"
      >
        <ScrollReveal className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-velora-dark dark:text-white leading-tight mb-6">
            Contactez-nous
          </h2>
          <p className="font-sans text-lg text-velora-muted dark:text-white/70 mb-12">
            Planifiez un appel rapide pour découvrir comment Gestion Velora peut
            transformer votre temps en un avantage.
          </p>
          <a
            href="mailto:info@gestionvelora.com"
            rel="noopener noreferrer"
            target="_blank"
            className="inline-flex items-center justify-center gap-2 w-full max-w-md mx-auto px-8 py-5 bg-accentaccent-1 text-white rounded-full font-sans font-bold text-base hover:brightness-110 transition-colors"
          >
            En savoir plus
            <span className="w-1.5 h-1.5 border-r border-t border-white rotate-45" />
          </a>
        </ScrollReveal>
      </section>
    </section>
  );
};
