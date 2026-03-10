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
              <strong className="text-velora-charcoal dark:text-white">Gestion Velora est une entreprise de gestion immobilière à Montréal</strong> qui offre des services de syndicat de copropriété, gestion Airbnb et location longue durée. Nous combinons expertise immobilière, technologie et transparence pour une gestion proactive et centrée sur la valorisation de votre actif.
            </p>
            <p className="font-sans text-lg text-velora-charcoal/80 dark:text-white/80 leading-relaxed mt-6">
              Les propriétaires et syndics méritent mieux : pas de promesses vides, une exécution rigoureuse. Chaque décision — planification des travaux, relation locataires — est guidée par les données et réalisée avec soin.
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
