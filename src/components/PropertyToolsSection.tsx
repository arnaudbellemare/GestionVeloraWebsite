import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { LottiePlayer } from "./LottiePlayer";
import { ScrollReveal } from "./ScrollReveal";
import { PropertyToolsBottomRight } from "./PropertyToolsBottomRight";

const LOTTIE_REPORT_CHART = "/animations/chart-bars.json";
const LOTTIE_CHAT_TYPING = "/animations/typing-dots.json";

const featureKeys = [
  {
    titleKey: "propertyTools.follow",
    descKey: "propertyTools.followDesc",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    titleKey: "propertyTools.communicate",
    descKey: "propertyTools.communicateDesc",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    titleKey: "propertyTools.overview",
    descKey: "propertyTools.overviewDesc",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
      delay: i * 0.12,
    },
  }),
};

const floatVariants = {
  float: {
    y: [-4, 4, -4],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

export function PropertyToolsSection() {
  const { t } = useTranslation();
  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 px-6 lg:px-16 bg-[#f9f6f3] dark:bg-velora-charcoal overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Ambient gradient blobs */}
      <motion.div
        className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-velora-green/[0.04] dark:bg-velora-green/[0.06] blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 -right-24 w-80 h-80 rounded-full bg-waabi-pink/[0.03] dark:bg-waabi-pink/[0.05] blur-[80px] pointer-events-none"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-[90rem] mx-auto relative">
        {/* Bento grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* Document mockup — large card */}
          <ScrollReveal className="lg:col-span-7">
            <motion.div
              className="relative rounded-3xl bg-white dark:bg-neutral-900 p-7 lg:p-10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.4)] ring-1 ring-black/[0.04] dark:ring-white/[0.06] overflow-hidden h-full"
              whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 30 } }}
            >
              {/* Decorative glow */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-velora-green/[0.04] dark:bg-velora-green/[0.08] blur-[60px] pointer-events-none" />

              {/* Toolbar skeleton */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                  <div className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                  <div className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                </div>
                <div className="flex gap-3 ml-4">
                  <div className="h-2 w-14 rounded bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-2 w-20 rounded bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-2 w-16 rounded bg-neutral-200 dark:bg-neutral-700" />
                </div>
              </div>

              {/* Report label */}
              <motion.p
                className="font-sans text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-5"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {t("fromInspiration.reportLabel")}
              </motion.p>

              {/* Text skeleton lines with staggered reveal */}
              <div className="space-y-3 mb-7">
                {[100, 88, 94].map((w, i) => (
                  <motion.div
                    key={i}
                    className="h-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800"
                    style={{ width: `${w}%` }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                  />
                ))}
              </div>

              {/* Charts */}
              <div className="flex gap-5 mb-5">
                {[0, 1].map((i) => (
                  <motion.div
                    key={i}
                    className="flex-1 h-24 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 overflow-hidden flex items-center justify-center ring-1 ring-black/[0.03] dark:ring-white/[0.04]"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 260, damping: 24 }}
                  >
                    {LOTTIE_REPORT_CHART ? (
                      <LottiePlayer src={LOTTIE_REPORT_CHART} className="w-full h-24" loop />
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Bottom bar */}
              <motion.div
                className="h-14 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 ring-1 ring-black/[0.03] dark:ring-white/[0.04]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.4 }}
              />

              {/* Chat overlay — floating */}
              <motion.div
                className="absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 w-56 sm:w-64 lg:w-72 rounded-2xl bg-white dark:bg-neutral-800 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.5)] ring-1 ring-black/[0.06] dark:ring-white/[0.08] p-5 backdrop-blur-sm"
                variants={floatVariants}
                animate="float"
              >
                <div className="space-y-3.5">
                  <div>
                    <p className="font-sans text-[10px] text-neutral-400 dark:text-neutral-500 mb-1">
                      24/08/2024, 14h
                    </p>
                    <p className="font-sans text-xs font-semibold text-black dark:text-white">
                      Marie D.
                    </p>
                    <p className="font-sans text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      Le devis pour la toiture semble bon, on en parle en AG ?
                    </p>
                  </div>
                  <div className="h-px bg-neutral-100 dark:bg-neutral-700" />
                  <div>
                    <p className="font-sans text-[10px] text-neutral-400 dark:text-neutral-500 mb-1">
                      24/08/2024, 15h
                    </p>
                    <p className="font-sans text-xs font-semibold text-black dark:text-white">
                      Pierre M.
                    </p>
                    <p className="font-sans text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      Oui, j&apos;ai vérifié les trois soumissions.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <LottiePlayer src={LOTTIE_CHAT_TYPING} className="h-4 w-14" loop />
                    <span className="font-sans text-[10px] text-neutral-400 dark:text-neutral-500">
                      {t("fromInspiration.marieWriting")}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="font-sans text-xs font-medium text-waabi-pink hover:text-waabi-pink/80 transition-colors"
                  >
                    {t("fromInspiration.reply")} →
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          {/* Portfolio dashboard — right card */}
          <ScrollReveal delay={0.15} className="lg:col-span-5">
            <motion.div
              whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 30 } }}
              className="h-full"
            >
              <PropertyToolsBottomRight />
            </motion.div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
