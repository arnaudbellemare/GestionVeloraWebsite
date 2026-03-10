import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const BARS = [
  { label: "Mois", value: 72, color: "rgb(59, 130, 246)" },
  { label: "Trim.", value: 85, color: "rgb(34, 197, 94)" },
  { label: "Année", value: 62, color: "rgb(236, 72, 153)" },
  { label: "Budg.", value: 90, color: "rgb(168, 85, 247)" },
  { label: "Prév.", value: 55, color: "rgb(34, 211, 238)" },
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
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
        <p className="font-sans text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate">
          {t("fromInspiration.reportLabel")}
        </p>
      </div>

      {/* Chart area */}
      <div className="px-4 py-2 space-y-1">
        <div className="flex items-end gap-1.5 h-14">
          {BARS.map((bar, i) => (
            <motion.div
              key={bar.label}
              className="flex-1 flex flex-col items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: chartMounted ? 1 : 0 }}
              transition={{ duration: 0.2, delay: i * 0.08 }}
            >
              <motion.div
                className="w-full rounded-t min-h-[4px]"
                style={{ backgroundColor: bar.color }}
                initial={{ height: 0 }}
                animate={chartMounted ? { height: bar.value + "%", opacity: 1 } : { height: 0, opacity: 0.5 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  delay: 0.2 + i * 0.06,
                }}
              />
              <span className="text-[10px] font-sans text-neutral-500 dark:text-neutral-400">
                {bar.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Activity feed */}
      <div className="px-4 pb-2 space-y-1.5">
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: msg1Visible ? 1 : 0, x: msg1Visible ? 0 : -8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-6 w-6 rounded-full bg-blue-500/80 shrink-0 flex items-center justify-center text-white text-[10px] font-sans font-medium">
            M
          </div>
          <div>
            <p className="font-sans text-[10px] text-neutral-500 dark:text-neutral-400">
              24/08/2024, 14h · {t("fromInspiration.msg1Author")}
            </p>
            <p className="font-sans text-xs text-neutral-800 dark:text-neutral-200">
              {t("fromInspiration.msg1Text")}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: msg2Visible ? 1 : 0, x: msg2Visible ? 0 : -8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-6 w-6 rounded-full bg-emerald-500/80 shrink-0 flex items-center justify-center text-white text-[10px] font-sans font-medium">
            P
          </div>
          <div>
            <p className="font-sans text-[10px] text-neutral-500 dark:text-neutral-400">
              24/08/2024, 15h · {t("fromInspiration.msg2Author")}
            </p>
            <p className="font-sans text-xs text-neutral-800 dark:text-neutral-200">
              {t("fromInspiration.msg2Text")}
            </p>
          </div>
        </motion.div>

        {/* Typing indicator */}
        <motion.div
          className="flex gap-2 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: typingVisible ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500"
                animate={{
                  y: [0, -4, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
          <span className="font-sans text-[10px] text-neutral-500 dark:text-neutral-400">
            {t("fromInspiration.marieWriting")}
          </span>
        </motion.div>

        {/* Reply button */}
        <motion.button
          whileHover={{ scale: 1.02, x: 2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-1.5 py-1.5 rounded-lg bg-velora-green/15 dark:bg-velora-green/25 text-velora-green font-sans text-xs font-semibold hover:bg-velora-green/25 dark:hover:bg-velora-green/35 transition-colors"
        >
          {t("fromInspiration.reply")}
        </motion.button>
      </div>
    </div>
  );
}
