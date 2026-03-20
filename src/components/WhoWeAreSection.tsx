import { useTranslation } from "react-i18next";
import { ScrollReveal } from "./ScrollReveal";

export function WhoWeAreSection() {
  const { t } = useTranslation();
  const projects = t("whoWeAre.projects", { returnObjects: true }) as {
    category: string;
    location: string;
    name: string;
    image: string;
  }[];

  return (
    <section id="benefice" className="pt-12 lg:pt-16 pb-24 lg:pb-32 px-6 lg:px-16 bg-[#f9f6f3] dark:bg-velora-charcoal">
      <div className="max-w-[90rem] mx-auto">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-20">
          <div className="max-w-2xl">
            <ScrollReveal>
              <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-[2.75rem] text-velora-charcoal dark:text-white leading-tight mb-5">
                {t("whoWeAre.title")}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <p className="font-sans text-base text-velora-charcoal/70 dark:text-white/60 leading-relaxed">
                {t("whoWeAre.description")}
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.1}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-velora-charcoal dark:border-white text-velora-charcoal dark:text-white px-5 py-3 text-[11px] tracking-[0.15em] uppercase font-sans font-semibold hover:bg-velora-charcoal hover:text-white dark:hover:bg-white dark:hover:text-velora-charcoal transition-colors whitespace-nowrap"
            >
              {t("whoWeAre.cta")}
            </a>
          </ScrollReveal>
        </div>

        {/* Project cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <ScrollReveal key={project.name} delay={i * 0.1}>
              <article className="group">
                <div className="aspect-[4/5] rounded-lg overflow-hidden mb-4 bg-neutral-200 dark:bg-neutral-800">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-velora-charcoal/50 dark:text-white/40">
                    {project.category}
                    <span className="mx-1">/</span>
                    {project.location}
                  </p>
                  <span className="text-velora-charcoal/30 dark:text-white/30 text-xs" aria-hidden="true">↗</span>
                </div>
                <h3 className="font-playfair font-semibold text-lg text-velora-charcoal dark:text-white">
                  {project.name}
                </h3>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
