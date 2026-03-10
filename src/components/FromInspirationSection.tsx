import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { DashboardMockup } from "./DashboardMockup";

const cardKeys = [
  { titleKey: "fromInspiration.download", descKey: "fromInspiration.downloadDesc", mockup: "download" as const },
  { titleKey: "fromInspiration.archive", descKey: "fromInspiration.archiveDesc", mockup: "archive" as const },
  { titleKey: "fromInspiration.comment", descKey: "fromInspiration.commentDesc", mockup: "comment" as const },
  { titleKey: "fromInspiration.dashboard", descKey: "fromInspiration.dashboardDesc", mockup: "dashboard" as const },
];

function DownloadMockup({ t }: { t: (k: string) => string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setCopied((c) => !c), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex justify-center py-6">
      <motion.div
        layout
        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-neutral-800 dark:bg-neutral-800 text-white font-sans text-sm cursor-default select-none"
        initial={false}
        animate={{
          backgroundColor: copied ? "rgb(72, 92, 17)" : "rgb(38, 38, 38)",
        }}
        transition={{ duration: 0.3 }}
      >
        {copied ? (
          <>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20"
            >
              <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {t("fromInspiration.downloaded")}
            </motion.span>
          </>
        ) : (
          <>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{t("fromInspiration.exportReport")}</span>
          </>
        )}
      </motion.div>
    </div>
  );
}

function ArchiveMockup({ t }: { t: (k: string) => string }) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSelected((s) => (s + 1) % 2), 3500);
    return () => clearInterval(t);
  }, []);

  const items = [
    { name: "Résidence Saint-Denis", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=96&q=85" },
    { name: "Immeuble Papineau", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=96&q=85" },
  ];

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
        <p className="font-sans text-xs font-medium text-neutral-600 dark:text-neutral-400">{t("fromInspiration.archiveIn")}</p>
      </div>
      <div className="p-2 space-y-1">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-default">
          <span className="text-lg">+</span>
          <span className="font-sans text-sm">{t("fromInspiration.newFolder")}</span>
        </div>
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            layout
            className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-default ${
              selected === i
                ? "bg-velora-green/10 dark:bg-velora-green/20"
                : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
            }`}
            onClick={() => setSelected(i)}
          >
            <div className="flex items-center gap-2 min-w-0">
              <img src={item.image} alt="" className="h-8 w-8 rounded object-cover shrink-0 bg-neutral-200 dark:bg-neutral-700" />
              <span className="font-sans text-sm text-neutral-900 dark:text-white truncate">{item.name}</span>
            </div>
            {selected === i && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-velora-green text-white"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const TYPING_PHASES = ["", "A", "Aj", "Ajo", "Ajou", "Ajout", "Ajoute", "Ajouté", "Ajouté.", "Ajouté. "];

function CommentMockup({ t }: { t: (k: string) => string }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TYPING_PHASES.length), 400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg overflow-hidden">
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <div className="h-7 w-7 rounded-full bg-neutral-300 dark:bg-neutral-500 flex items-center justify-center shrink-0" title="Profil par défaut">
            <svg className="h-4 w-4 text-neutral-500 dark:text-neutral-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div>
            <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400">{t("fromInspiration.you2h")}</p>
            <p className="font-sans text-sm text-neutral-800 dark:text-neutral-200">
              {t("fromInspiration.quotePlaceholder")}
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 px-3 py-2">
          <input
            type="text"
            readOnly
            value={TYPING_PHASES[idx]}
            className="flex-1 bg-transparent font-sans text-sm text-neutral-800 dark:text-neutral-200 outline-none"
          />
          <span className="inline-block w-0.5 h-4 bg-neutral-400 dark:bg-neutral-500 animate-pulse" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-velora-green text-white shrink-0"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export function FromInspirationSection() {
  const { t } = useTranslation();
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-16 bg-white dark:bg-velora-darker">
      <div className="max-w-[90rem] mx-auto">
        <ScrollReveal scale>
          <h2 className="font-playfair font-bold text-4xl lg:text-5xl text-velora-charcoal dark:text-white text-center leading-tight mb-16">
            {t("fromInspiration.title")}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {cardKeys.map((card, i) => (
            <ScrollReveal key={card.titleKey} delay={i * 0.1}>
              <motion.div
                className="flex flex-col justify-center h-full rounded-2xl bg-[#f9f6f3] dark:bg-velora-charcoal p-6 lg:p-8 shadow-sm ring-1 ring-black/5 dark:ring-white/5"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center justify-center mb-6 min-h-[140px]">
                  {card.mockup === "download" && <DownloadMockup t={t} />}
                  {card.mockup === "archive" && <ArchiveMockup t={t} />}
                  {card.mockup === "comment" && <CommentMockup t={t} />}
                  {card.mockup === "dashboard" && <DashboardMockup />}
                </div>
                <h3 className="font-sans font-bold text-lg text-velora-charcoal dark:text-white mb-2">
                  {t(card.titleKey)}
                </h3>
                <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {t(card.descKey)}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
