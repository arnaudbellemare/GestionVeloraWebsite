import { useTranslation } from "react-i18next";
import { InternalLink } from "./InternalLink";
import { ScrollReveal } from "./ScrollReveal";

interface LeadCaptureSectionProps {
  variant?: "homepage" | "blog" | "service";
}

export function LeadCaptureSection({ variant = "homepage" }: LeadCaptureSectionProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith("en");
  const isBlog = variant === "blog";

  return (
    <ScrollReveal>
      <section
        className={isBlog
          ? "my-12 rounded-2xl border border-waabi-pink/20 bg-waabi-pink/[0.04] dark:bg-waabi-pink/[0.07] px-6 py-8 lg:px-8 lg:py-10"
          : "py-16 lg:py-20 bg-nd-surface border-y border-nd-border"}
        aria-labelledby="loi16-resource-heading"
      >
        <div className={isBlog ? "" : "max-w-[90rem] mx-auto px-6 lg:px-16"}>
          <div className="max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-waabi-pink mb-3">
              {isEn ? "Free resource" : "Ressource gratuite"}
            </p>
            <h2 id="loi16-resource-heading" className="font-sans font-medium text-xl lg:text-2xl text-nd-display mb-2 leading-snug tracking-[-0.02em]">
              {isEn ? "Law 16 checklist for condo boards" : "Liste de vérification Loi 16 pour les syndicats"}
            </h2>
            <p className="font-sans text-sm text-black/65 dark:text-white/65 mb-6">
              {isEn ? "Organize the maintenance log, reserve study and board follow-up. Read it online without an email address." : "Organisez le carnet d'entretien, l'étude du fonds de prévoyance et le suivi du conseil. Consultez-la en ligne sans fournir de courriel."}
            </p>
            <InternalLink to="/blog/checklist-loi-16-syndicat-copropriete" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-neutral-950 text-white font-sans font-semibold text-sm hover:bg-black dark:bg-white dark:text-neutral-950 min-h-[44px]">
              {isEn ? "Open the checklist" : "Consulter la liste"}
            </InternalLink>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
