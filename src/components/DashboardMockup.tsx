import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const TABS = [
  { label: "Mois" },
  { label: "Trim." },
  { label: "Année" },
  { label: "Budg." },
  { label: "Prév." },
];

export function DashboardMockup() {
  const { t } = useTranslation();
  const [chartMounted, setChartMounted] = useState(false);
  const [msg1Visible, setMsg1Visible] = useState(false);
  const [msg2Visible, setMsg2Visible] = useState(false);
  const [typingVisible, setTypingVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setChartMounted(true), 300);
    const t2 = setTimeout(() => setMsg1Visible(true), 600);
    const t3 = setTimeout(() => setMsg2Visible(true), 1200);
    const t4 = setTimeout(() => setTypingVisible(true), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="rounded-xl bg-white dark:bg-neutral-900 shadow-lg border border-neutral-200/80 dark:border-neutral-700/80 overflow-hidden w-full max-w-[340px] mx-auto">
      {/* Header */}
      <div className="px-4 py-3 border-b border-neutral-100 dark:border-white/[0.06]">
        <p className="font-sans text-xs font-medium text-neutral-600 dark:text-neutral-300 truncate">
          {t("fromInspiration.reportLabel")}
        </p>
      </div>

      {/* Filter tabs */}
      <div className="px-4 py-3 border-b border-neutral-100 dark:border-white/[0.06]">
        <div className="flex items-end justify-between gap-1">
          {TABS.map((tab, i) => (
            <motion.button
              key={tab.label}
              type="button"
              className="flex flex-col items-center gap-1.5 shrink-0"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: chartMounted ? 1 : 0, y: chartMounted ? 0 : 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 30, delay: i * 0.04 }}
            >
              <span className={`text-[11px] font-sans font-medium ${i === 1 ? "text-velora-charcoal dark:text-white" : "text-neutral-400 dark:text-neutral-500"}`}>
                {tab.label}
              </span>
              <motion.span
                className={`block h-[2px] rounded-full min-w-[20px] ${i === 1 ? "bg-velora-green" : "bg-neutral-200 dark:bg-white/10"}`}
                style={{ transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                animate={chartMounted ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.15 + i * 0.05 }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Activity feed */}
      <div className="px-4 py-3 space-y-3">
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: msg1Visible ? 1 : 0, x: msg1Visible ? 0 : -8 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        >
          <div className="h-7 w-7 rounded-full bg-velora-green/80 dark:bg-velora-green shrink-0 flex items-center justify-center text-white text-[10px] font-sans font-semibold">
            M
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-sans text-[10px] text-neutral-500 dark:text-neutral-400 mb-0.5">
              24/08/2024, 14h · {t("fromInspiration.msg1Author")}
            </p>
            <p className="font-sans text-xs font-medium text-neutral-800 dark:text-neutral-100 leading-snug">
              {t("fromInspiration.msg1Text")}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: msg2Visible ? 1 : 0, x: msg2Visible ? 0 : -8 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        >
          <div className="h-7 w-7 rounded-full bg-neutral-600 dark:bg-neutral-500 shrink-0 flex items-center justify-center text-white text-[10px] font-sans font-semibold">
            P
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-sans text-[10px] text-neutral-500 dark:text-neutral-400 mb-0.5">
              24/08/2024, 15h · {t("fromInspiration.msg2Author")}
            </p>
            <p className="font-sans text-xs text-neutral-600 dark:text-neutral-300 leading-snug">
              {t("fromInspiration.msg2Text")}
            </p>
          </div>
        </motion.div>

        {/* Typing indicator */}
        <motion.div
          className="flex gap-2 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: typingVisible ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-velora-green/70 dark:bg-velora-green"
                animate={{
                  y: [0, -3, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.12,
                }}
              />
            ))}
          </div>
          <span className="font-sans text-xs text-neutral-500 dark:text-neutral-400">
            {t("fromInspiration.marieWriting")}
          </span>
        </motion.div>

        {/* Reply button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-3 py-2.5 rounded-lg bg-velora-green/15 dark:bg-velora-green/20 text-velora-charcoal dark:text-white font-sans text-xs font-semibold hover:bg-velora-green/25 dark:hover:bg-velora-green/30 transition-colors duration-200"
        >
          {t("fromInspiration.reply")}
        </motion.button>
      </div>
    </div>
  );
}
