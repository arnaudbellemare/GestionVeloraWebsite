import { ScrollReveal } from "./ScrollReveal";

export function WhoWeAreSection() {
  return (
    <section id="benefice" className="pt-12 lg:pt-16 pb-24 lg:pb-32 px-6 lg:px-16 bg-[#f9f6f3] dark:bg-velora-charcoal">
      <div className="max-w-[90rem] mx-auto">
        <p className="font-sans text-sm uppercase tracking-[0.25em] text-velora-gold dark:text-velora-gold mb-4">
          Qui sommes-nous
        </p>
        <ScrollReveal>
          <h2 className="font-playfair text-4xl lg:text-6xl text-velora-charcoal dark:text-white leading-tight mb-8 max-w-3xl">
            Nous avons construit notre approche.
          </h2>
        </ScrollReveal>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <ScrollReveal>
            <p className="font-sans text-lg text-velora-charcoal/80 dark:text-white/80 leading-relaxed">
              Gestion Velora est née d&apos;une conviction simple : les propriétaires
              et syndics méritent mieux. Pas de meilleures promesses — une
              meilleure exécution. Chaque décision, de la planification des
              travaux à la relation locataires, est guidée par les données et
              réalisée avec soin.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-sans text-lg text-velora-charcoal/80 dark:text-white/80 leading-relaxed">
              Notre équipe combine des décennies d&apos;expertise immobilière avec une
              technologie moderne pour créer une expérience de gestion transparente,
              proactive et réellement centrée sur la valorisation de votre actif.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
