import { useTranslation } from "react-i18next";
import { ScrollReveal } from "./ScrollReveal";
import { useGoToContact } from "../hooks/useGoToContact";

export function WhoWeAreSection() {
  const { t } = useTranslation();
  const { contactHref, goToContact } = useGoToContact();
  const projects = t("whoWeAre.projects", { returnObjects: true }) as {
    category: string;
    location: string;
    name: string;
    image: string;
  }[];

  return (
    <section id="benefice" className="pt-12 lg:pt-16 pb-24 lg:pb-32 px-6 lg:px-16 bg-nd-canvas">
      <div className="max-w-[90rem] mx-auto">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-20">
          <div className="max-w-2xl">
            <ScrollReveal>
              <h2 className="font-sans font-medium text-3xl sm:text-4xl lg:text-[2.75rem] text-nd-display leading-[1.1] tracking-[-0.02em] mb-5">
                {t("whoWeAre.title")}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <p className="font-sans text-base text-nd-secondary leading-relaxed">
                {t("whoWeAre.description")}
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.1}>
            <a
              href={contactHref}
              onClick={goToContact}
              className="inline-flex items-center gap-2 border border-nd-border-visible text-nd-primary px-5 py-3 text-[10px] tracking-[0.12em] uppercase font-mono hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors whitespace-nowrap"
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
                <div className="aspect-[4/5] rounded-lg overflow-hidden mb-4 bg-nd-border border border-nd-border">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-95"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-nd-secondary">
                    {project.category}
                    <span className="mx-1">/</span>
                    {project.location}
                  </p>
                  <span className="text-nd-muted text-xs" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <h3 className="font-sans font-medium text-lg text-nd-primary">
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
