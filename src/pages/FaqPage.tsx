import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "../context/LocaleContext";
import { ScrollReveal } from "../components/ScrollReveal";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InternalLink } from "../components/InternalLink";

function toHeadingId(value: string): string {
  return `faq-${value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-nd-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-sans font-medium text-nd-display text-base leading-snug">{question}</span>
        <span className="text-nd-secondary">
          <ChevronIcon open={open} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="font-sans text-sm text-nd-secondary leading-relaxed pb-5">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const FAQ_CATEGORIES_FR = [
  {
    heading: "Gestion de condo et syndicat de copropriété",
    slugs: [0, 1, 2, 5, 6],
  },
  {
    heading: "Gestion locative et Airbnb",
    slugs: [3, 4],
  },
];

const FAQ_CATEGORIES_EN = [
  {
    heading: "Condo management and condo boards",
    slugs: [0, 1, 2, 5, 6],
  },
  {
    heading: "Rental management and Airbnb",
    slugs: [3, 4],
  },
];

export function FaqPage() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const isEn = locale === "en";

  const items = t("faqItems", { returnObjects: true }) as { question: string; answer: string }[];
  const categories = isEn ? FAQ_CATEGORIES_EN : FAQ_CATEGORIES_FR;

  useEffect(() => {
    document.title = isEn
      ? "Property Management FAQ Montreal | Gestion Velora"
      : "FAQ gestion immobilière Montréal | Gestion Velora";
    const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (metaDesc) {
      metaDesc.content = isEn
        ? "Answers to the most common questions about condo management, condo boards, rental, and Airbnb in Montreal."
        : "Réponses aux questions fréquentes sur la gestion de condo, syndicat de copropriété, location et Airbnb à Montréal.";
    }
  }, [isEn]);

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
            { label: "FAQ" },
          ]}
        />

        <ScrollReveal className="mb-16 mt-8">
          <h1 className="font-playfair font-semibold text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08] tracking-[-0.02em] text-nd-display mb-4">
            {t("faq.title")}
          </h1>
          <p className="font-sans text-base lg:text-lg text-nd-secondary max-w-2xl">
            {t("faq.subtitle")}
          </p>
        </ScrollReveal>

        <div className="max-w-2xl">
          {categories.map((cat) => (
            <section key={cat.heading} className="mb-12">
              <ScrollReveal>
                <h2 id={toHeadingId(cat.heading)} className="font-sans font-semibold text-lg text-nd-display mb-1 pb-3 border-b border-nd-border">
                  {cat.heading}
                </h2>
              </ScrollReveal>
              {cat.slugs.map((idx) => {
                const item = items[idx];
                if (!item) return null;
                return (
                  <ScrollReveal key={idx} delay={0.04}>
                    <FaqItem question={item.question} answer={item.answer} />
                  </ScrollReveal>
                );
              })}
            </section>
          ))}

          <ScrollReveal className="mt-12">
            <div className="rounded-2xl border border-nd-border bg-nd-surface p-8">
              <p className="font-sans text-nd-secondary mb-4">
                {isEn
                  ? "Don't see your question? Our team answers within 1–2 business days."
                  : "Vous ne trouvez pas votre réponse ? Notre équipe répond en 1 à 2 jours ouvrables."}
              </p>
              <InternalLink
                to="/#contact-form"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full font-sans font-semibold text-sm uppercase tracking-[0.1em] border border-nd-border text-nd-primary hover:border-nd-primary/50 transition-colors"
              >
                {isEn ? "Ask a question" : "Poser une question"}
              </InternalLink>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </motion.div>
  );
}
