import { motion } from "framer-motion";
import { LottiePlayer } from "./LottiePlayer";
import { ScrollReveal } from "./ScrollReveal";

/** Add Jitter exports: pick a template at jitter.video/templates (e.g. Animated Bar Chart, The Vault),
 * export as Lottie JSON, save to public/animations/, then set the path here. Leave empty for static image. */
const LOTTIE_DASHBOARD_TILE = ""; // e.g. "/animations/bar-chart.json"
const LOTTIE_REPORT_CHART = "/animations/chart-bars.json";
const LOTTIE_CHAT_TYPING = "/animations/typing-dots.json";

/** 4K-ready Unsplash URLs: w=1920 for sharp display on retina/4K, q=90 for quality */
const gridImages = [
  {
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=90",
    alt: "Immeuble en copropriété",
    lottieSrc: undefined as string | undefined,
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=90",
    alt: "Immeuble et gestion locative",
    lottieSrc: undefined as string | undefined,
  },
  {
    src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=90",
    alt: "Documents financiers",
    lottieSrc: undefined as string | undefined,
  },
  {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=90",
    alt: "Tableau de bord",
    lottieSrc: LOTTIE_DASHBOARD_TILE || undefined,
  },
];

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    title: "Suivez et documentez.",
    description:
      "Maintenez un historique complet des travaux, inspections et entretiens. Chaque intervention est tracée et archivée pour une transparence totale.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Communication centralisée.",
    description:
      "Échangez avec les copropriétaires et locataires au bon endroit. Posez des questions directement sur un rapport, un devis ou une décision.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: "Vue d'ensemble.",
    description:
      "Réunissez vos immeubles, charges et performances en un seul endroit. Portefeuille, budgets et taux d'occupation à portée de main.",
  },
];

export function PropertyToolsSection() {
  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-16 bg-[#f9f6f3] dark:bg-velora-charcoal overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="max-w-[90rem] mx-auto relative">
        {/* Upper: Two columns */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-20 lg:mb-28">
          {/* Left: Image grid */}
          <ScrollReveal className="lg:w-1/2">
            <h2 className="font-playfair font-bold text-3xl lg:text-4xl text-black dark:text-white leading-tight mb-8">
              Toute votre gestion immobilière en un coup d'œil.
            </h2>
            <div className="relative grid grid-cols-2 gap-3 sm:gap-4 py-6 sm:py-8">
              {gridImages.map((img, i) => {
                const isLeft = i % 2 === 0;
                const row = Math.floor(i / 2);
                const baseRotate = isLeft ? -2 : 1.5;
                const baseX = isLeft ? -2 : 2;
                const baseY = row === 0 ? -3 : 3;
                return (
                  <motion.div
                    key={img.alt}
                    className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-lg ring-1 ring-black/5 dark:ring-white/5 cursor-pointer will-change-transform"
                    initial={{ rotate: baseRotate, x: baseX, y: baseY }}
                    whileHover={{
                      rotate: 0,
                      x: 0,
                      y: 0,
                      scale: 1.03,
                      zIndex: 10,
                      transition: { type: "spring", stiffness: 400, damping: 30 },
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    {img.lottieSrc ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                        <LottiePlayer src={img.lottieSrc} className="w-full h-full" loop />
                      </div>
                    ) : (
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Right: Document mockup with chat overlay */}
          <ScrollReveal delay={0.1} className="lg:w-1/2">
            <div className="relative mt-8 lg:mt-0">
              <div className="rounded-2xl bg-white dark:bg-neutral-900 p-6 lg:p-8 shadow-xl ring-1 ring-black/5 dark:ring-white/5">
                <div className="flex gap-4 mb-6">
                  <div className="h-2 w-16 rounded bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-2 w-24 rounded bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-2 w-20 rounded bg-neutral-200 dark:bg-neutral-700" />
                </div>
                <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  Rapport financier — Immeuble Saint-Laurent • T3 2024
                </p>
                <div className="space-y-3 mb-6">
                  <div className="h-3 w-full rounded bg-neutral-100 dark:bg-neutral-800" />
                  <div className="h-3 w-[90%] rounded bg-neutral-100 dark:bg-neutral-800" />
                  <div className="h-3 w-[95%] rounded bg-neutral-100 dark:bg-neutral-800" />
                </div>
                <div className="flex gap-8 mb-4">
                  <div className="flex-1 h-20 rounded-lg bg-neutral-100 dark:bg-neutral-800 overflow-hidden flex items-center justify-center">
                    {LOTTIE_REPORT_CHART ? (
                      <LottiePlayer src={LOTTIE_REPORT_CHART} className="w-full h-20" loop />
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </div>
                  <div className="flex-1 h-20 rounded-lg bg-neutral-100 dark:bg-neutral-800 overflow-hidden flex items-center justify-center">
                    {LOTTIE_REPORT_CHART ? (
                      <LottiePlayer src={LOTTIE_REPORT_CHART} className="w-full h-20" loop />
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </div>
                </div>
                <div className="h-16 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
              </div>

              {/* Chat overlay */}
              <div className="absolute right-4 lg:right-0 top-1/2 -translate-y-1/2 w-56 sm:w-64 lg:w-72 rounded-xl bg-white dark:bg-neutral-800 shadow-xl ring-1 ring-black/10 dark:ring-white/10 p-4">
                <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                  24/08/2024, 14h
                </p>
                <p className="font-sans text-sm text-black dark:text-white mb-1">
                  Marie D.
                </p>
                <p className="font-sans text-sm text-neutral-700 dark:text-neutral-300 mb-3">
                  Le devis pour la toiture semble bon, on en parle en AG ?
                </p>
                <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                  24/08/2024, 15h
                </p>
                <p className="font-sans text-sm text-black dark:text-white mb-1">
                  Pierre M.
                </p>
                <p className="font-sans text-sm text-neutral-700 dark:text-neutral-300 mb-3">
                  Oui, j&apos;ai vérifié les trois soumissions.
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <LottiePlayer
                    src={LOTTIE_CHAT_TYPING}
                    className="h-5 w-16"
                    loop
                  />
                  <span className="font-sans text-xs text-neutral-500 dark:text-neutral-400">
                    Marie écrit…
                  </span>
                </div>
                <button
                  type="button"
                  className="font-sans text-xs text-waabi-pink hover:underline"
                >
                  Répondre
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Lower: Three feature blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.1}>
              <div className="flex flex-col">
                <div className="text-waabi-pink mb-4">{f.icon}</div>
                <h3 className="font-sans font-bold text-lg text-black dark:text-white mb-2">
                  {f.title}
                </h3>
                <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {f.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
