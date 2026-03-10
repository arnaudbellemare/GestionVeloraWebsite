import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export function PropertyToolsBottomRight() {
  const { t } = useTranslation();
  const [occupancy, setOccupancy] = useState(0);
  const [tasks, setTasks] = useState(0);
  const [budgetVisible, setBudgetVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 400);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let o = 0;
    let tk = 0;
    const iv = setInterval(() => {
      o = Math.min(o + 2, 98);
      tk = Math.min(tk + 1, 3);
      setOccupancy(o);
      setTasks(tk);
      if (o >= 98) setBudgetVisible(true);
      if (o >= 98 && tk >= 3) clearInterval(iv);
    }, 50);
    return () => clearInterval(iv);
  }, [mounted]);

  return (
    <motion.div
      className="relative rounded-2xl bg-white dark:bg-neutral-900 p-5 lg:p-6 shadow-xl ring-1 ring-black/5 dark:ring-white/5 overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* Animated shimmer accent */}
      <motion.div
        className="absolute top-0 right-0 w-40 h-40 -translate-y-1/2 translate-x-1/2 rounded-full bg-velora-green/10 dark:bg-velora-green/15 blur-3xl"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative">
        {/* Header with live indicator */}
        <div className="flex items-center gap-2 mb-4">
          <p className="font-sans text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            {t("propertyTools.livePortfolio")}
          </p>
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-emerald-500"
            animate={{ opacity: [1, 0.4, 1], scale: [1, 0.8, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { labelKey: "propertyTools.occupancy", value: occupancy, suffix: "%", color: "text-blue-600 dark:text-blue-400", delay: 0.1 },
            { labelKey: "propertyTools.budgetOnTrack", value: 1, suffix: "/1", color: "text-emerald-600 dark:text-emerald-400", delay: 0.18, useVisible: budgetVisible },
            { labelKey: "propertyTools.tasksDue", value: tasks, suffix: "", color: "text-amber-600 dark:text-amber-400", delay: 0.26, useVisible: undefined },
          ].map((m) => (
            <motion.div
              key={m.labelKey}
              className="rounded-xl bg-neutral-50 dark:bg-neutral-800/80 p-3 cursor-default"
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{
                opacity: mounted && (m.useVisible === undefined || m.useVisible) ? 1 : 0,
                scale: mounted && (m.useVisible === undefined || m.useVisible) ? 1 : 0.9,
                y: mounted && (m.useVisible === undefined || m.useVisible) ? 0 : 8,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 22, delay: m.delay }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <p className="font-sans text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                {t(m.labelKey)}
              </p>
              <motion.p
                key={`${m.labelKey}-${m.value}`}
                className={`font-sans text-lg font-bold ${m.color}`}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {m.value}
                {m.suffix}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Building rows with status pills */}
        <div className="space-y-2">
          {[
            { key: "propertyTools.buildingOk", statusKey: "propertyTools.statusOk", ok: true },
            { key: "propertyTools.buildingPending", statusKey: "propertyTools.statusPending", ok: false },
          ].map((row, i) => (
            <motion.div
              key={row.key}
              className="flex items-center justify-between gap-2 py-2 px-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 cursor-default"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -12 }}
              transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.35 + i * 0.1 }}
              whileHover={{ x: 4, scale: 1.01 }}
            >
              <span className="font-sans text-sm text-neutral-800 dark:text-neutral-200 truncate">
                {t(row.key)}
              </span>
              <motion.span
                className={`shrink-0 px-2.5 py-0.5 rounded-full font-sans text-[10px] font-semibold ${
                  row.ok
                    ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400"
                    : "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400"
                }`}
                animate={
                  row.ok
                    ? {}
                    : {
                        opacity: [1, 0.65, 1],
                        scale: [1, 1.05, 1],
                      }
                }
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                {t(row.statusKey)}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Animated pulse line with sweep */}
        <div className="mt-4 relative h-0.5 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-velora-green/30 via-velora-green to-velora-green/30"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: mounted ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.5 }}
            style={{ originX: 0 }}
          />
          <motion.div
            className="absolute top-0 h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
            animate={{ left: ["-33%", "133%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
