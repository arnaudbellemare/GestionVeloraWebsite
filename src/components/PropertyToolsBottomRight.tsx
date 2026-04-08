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
      className="group relative rounded-2xl bg-white dark:bg-neutral-900 p-6 lg:p-7 border border-neutral-200 dark:border-neutral-700 overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ ...spring, delay: 0.08 }}
    >
      <div className="relative">
        {/* Header with live indicator */}
        <motion.div
          className="flex items-center gap-2 mb-5"
          initial={{ opacity: 0, y: 8 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ ...spring, delay: 0.12 }}
        >
          <p className="font-sans text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
            {t("propertyTools.livePortfolio")}
          </p>
          <motion.span
            className="relative w-1.5 h-1.5 rounded-full bg-emerald-500"
            animate={{ opacity: [1, 0.6, 1], scale: [1, 0.9, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
          />
        </motion.div>

        {/* Metric cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { labelKey: "propertyTools.occupancy", value: occupancy, suffix: "%", color: "text-neutral-800 dark:text-white", delay: 0.18, useVisible: undefined },
            { labelKey: "propertyTools.budgetOnTrack", value: 1, suffix: "/1", color: "text-neutral-800 dark:text-white", delay: 0.3, useVisible: budgetVisible },
            { labelKey: "propertyTools.tasksDue", value: tasks, suffix: "", color: "text-neutral-800 dark:text-white", delay: 0.24, useVisible: undefined },
          ].map((m) => (
            <motion.div
              key={m.labelKey}
              className="relative rounded-2xl bg-neutral-100/80 dark:bg-white/[0.06] p-4 cursor-default overflow-hidden"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{
                opacity: show && (m.useVisible === undefined || m.useVisible) ? 1 : 0,
                scale: show && (m.useVisible === undefined || m.useVisible) ? 1 : 0.96,
                y: show && (m.useVisible === undefined || m.useVisible) ? 0 : 8,
              }}
              transition={{ ...spring, delay: m.delay }}
            >
              <p className="font-sans text-[11px] text-neutral-500 dark:text-neutral-400 truncate mb-1">
                {t(m.labelKey)}
              </p>
              <motion.p
                className={`font-sans text-[17px] font-semibold tabular-nums tracking-[-0.02em] ${m.color}`}
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
              className="flex items-center justify-between gap-3 py-3 px-4 rounded-2xl bg-neutral-100/60 dark:bg-white/[0.04]"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: show ? 1 : 0, x: show ? 0 : -12 }}
              transition={{ ...spring, delay: 0.36 + i * 0.08 }}
            >
              <span className="font-sans text-[13px] font-medium text-neutral-800 dark:text-neutral-100 truncate">
                {t(row.key)}
              </span>
              <motion.span
                className={`shrink-0 px-2.5 py-1 rounded-full font-sans text-[11px] font-medium ${
                  row.ok
                    ? "bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                    : "bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400"
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

        {/* Progress indicator */}
        <motion.div
          className="mt-6 relative h-[2px] rounded-full overflow-hidden bg-neutral-200/80 dark:bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ ...spring, delay: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-neutral-800 dark:bg-neutral-200"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: show ? 1 : 0 }}
            transition={{ ...spring, delay: 0.7 }}
            style={{ originX: 0 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
