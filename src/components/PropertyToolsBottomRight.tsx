import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";

const spring = { type: "spring" as const, stiffness: 260, damping: 24 };
const springBounce = { type: "spring" as const, stiffness: 400, damping: 28 };

export function PropertyToolsBottomRight() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [occupancy, setOccupancy] = useState(0);
  const [tasks, setTasks] = useState(0);
  const [budgetVisible, setBudgetVisible] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isInView || started) return;
    setStarted(true);
  }, [isInView, started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2400;
    const start = performance.now();
    let rafId: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 2.4);
      const o = Math.round(eased * 98);
      const tk = Math.min(Math.floor(eased * 4), 3);
      setOccupancy(o);
      setTasks(tk);
      if (o >= 35) setBudgetVisible(true);
      if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started]);

  const show = isInView && started;

  return (
    <motion.div
      ref={ref}
      className="group relative rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm p-5 lg:p-6 shadow-xl shadow-black/5 dark:shadow-black/20 ring-1 ring-black/[0.04] dark:ring-white/[0.06] overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ ...spring, delay: 0.1 }}
      whileHover={{ y: -2 }}
      style={{ transition: "box-shadow 0.4s ease" }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-velora-green/8 dark:bg-velora-green/12 blur-3xl"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
      />
      <div className="relative">
        {/* Header with live indicator */}
        <motion.div
          className="flex items-center gap-2 mb-4"
          initial={{ opacity: 0, y: 8 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ ...spring, delay: 0.15 }}
        >
          <p className="font-sans text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            {t("propertyTools.livePortfolio")}
          </p>
          <motion.span
            className="relative w-2 h-2 rounded-full bg-emerald-500"
            animate={{ opacity: [1, 0.5, 1], boxShadow: ["0 0 0 0 rgba(16,185,129,0.4)", "0 0 0 6px rgba(16,185,129,0)", "0 0 0 0 rgba(16,185,129,0.4)"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.div>

        {/* Metric cards */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { labelKey: "propertyTools.occupancy", value: occupancy, suffix: "%", color: "text-blue-600 dark:text-blue-400", delay: 0.2, useVisible: undefined },
            { labelKey: "propertyTools.budgetOnTrack", value: 1, suffix: "/1", color: "text-emerald-600 dark:text-emerald-400", delay: 0.32, useVisible: budgetVisible },
            { labelKey: "propertyTools.tasksDue", value: tasks, suffix: "", color: "text-amber-600 dark:text-amber-400", delay: 0.28, useVisible: undefined },
          ].map((m) => (
            <motion.div
              key={m.labelKey}
              className="relative rounded-xl bg-neutral-50/80 dark:bg-neutral-800/60 p-3 cursor-default overflow-hidden border border-black/[0.03] dark:border-white/[0.04]"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{
                opacity: show && (m.useVisible === undefined || m.useVisible) ? 1 : 0,
                scale: show && (m.useVisible === undefined || m.useVisible) ? 1 : 0.92,
                y: show && (m.useVisible === undefined || m.useVisible) ? 0 : 12,
              }}
              transition={{ ...spring, delay: m.delay }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <p className="font-sans text-[10px] text-neutral-500 dark:text-neutral-400 truncate mb-0.5">
                {t(m.labelKey)}
              </p>
              <motion.p
                className={`font-sans text-lg font-bold tabular-nums ${m.color}`}
                layout
                transition={springBounce}
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
              className="flex items-center justify-between gap-2 py-2.5 px-3 rounded-xl bg-neutral-50/70 dark:bg-neutral-800/40 border border-black/[0.02] dark:border-white/[0.03]"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: show ? 1 : 0, x: show ? 0 : -16 }}
              transition={{ ...spring, delay: 0.4 + i * 0.1 }}
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

        {/* Animated pulse line */}
        <motion.div
          className="mt-5 relative h-1 rounded-full overflow-hidden bg-neutral-100/80 dark:bg-neutral-800/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ ...spring, delay: 0.6 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-velora-green/20 via-velora-green/80 to-velora-green/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: show ? 1 : 0 }}
            transition={{ ...spring, delay: 0.7 }}
            style={{ originX: 0 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent w-1/3 pointer-events-none"
            animate={{ x: ["0%", "200%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: [0.4, 0, 0.6, 1], repeatDelay: 0.8 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
