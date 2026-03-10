import { useTranslation } from "react-i18next";
import { ScrollReveal } from "./ScrollReveal";

export function WhoWeAreSection() {
  const { t } = useTranslation();
  return (
    <section id="benefice" className="pt-12 lg:pt-16 pb-24 lg:pb-32 px-6 lg:px-16 bg-[#f9f6f3] dark:bg-velora-charcoal">
      <div className="max-w-[90rem] mx-auto">
        <p className="font-sans text-sm uppercase tracking-[0.25em] text-velora-gold dark:text-velora-gold mb-4">
          {t("whoWeAre.label")}
        </p>
        <ScrollReveal>
          <h2 className="font-playfair text-4xl lg:text-6xl text-velora-charcoal dark:text-white leading-tight mb-8 max-w-3xl">
            {t("whoWeAre.title")}
          </h2>
        </ScrollReveal>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <ScrollReveal>
            <p className="font-sans text-lg text-velora-charcoal/80 dark:text-white/80 leading-relaxed">
              <strong className="text-velora-charcoal dark:text-white">{t("whoWeAre.p1Lead")}</strong>
              {t("whoWeAre.p1Tail")}
            </p>
            <p className="font-sans text-lg text-velora-charcoal/80 dark:text-white/80 leading-relaxed mt-6">
              {t("whoWeAre.p2")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-sans text-lg text-velora-charcoal/80 dark:text-white/80 leading-relaxed">
              {t("whoWeAre.p3")}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
