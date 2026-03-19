import { useLocation, useOutlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FooterSection } from "../FooterSection";
import { HeaderSection } from "../HeaderSection";
import { CanonicalUrl } from "../components/CanonicalUrl";
import { PageMeta } from "../components/PageMeta";
import { HreflangLinks } from "../components/HreflangLinks";
import { SchemaOrg } from "../components/SchemaOrg";

/*
 * ═══════════════════════════════════════════════════════════
 *  FRAMER-STYLE PAGE TRANSITION
 * ───────────────────────────────────────────────────────────
 *  EXIT  (outgoing):  scale 100→96%, opacity 100→0%, 0.6s
 *  ENTER (incoming):  scale 104→100%, opacity 0→100%, 0.7s
 *  EASE: [0.23, 1, 0.32, 1] — smooth power4-out
 *
 *  Header EXCLUDED — persistent across transitions.
 *  Footer INCLUDED — scales/fades with page content.
 *  mode="wait" — old page fully exits before new page enters.
 *
 *  KEY FIX: useOutlet() captures the route element so
 *  AnimatePresence can properly animate between pages.
 *  <Outlet /> doesn't work inside keyed motion.div because
 *  it relies on router context rather than React tree keys.
 * ═══════════════════════════════════════════════════════════
 */

/* ─── TWEAKABLE ──────────────────────────────────────── */
const EXIT_SCALE = 0.96;
const ENTER_SCALE = 1.04;
const EXIT_DURATION = 0.6;
const ENTER_DURATION = 0.7;
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];
/* ─────────────────────────────────────────────────────── */

const pageVariants = {
  initial: {
    opacity: 0,
    scale: ENTER_SCALE,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: ENTER_DURATION,
      ease: EASE,
    },
  },
  exit: {
    opacity: 0,
    scale: EXIT_SCALE,
    transition: {
      duration: EXIT_DURATION,
      ease: EASE,
    },
  },
};

export function Layout() {
  const location = useLocation();
  const currentOutlet = useOutlet();

  return (
    <div className="min-h-screen bg-[#f9f6f3] dark:bg-velora-charcoal overflow-hidden">
      <PageMeta />
      <CanonicalUrl />
      <HreflangLinks />
      <SchemaOrg />

      {/* Header EXCLUDED from animation — persistent */}
      <HeaderSection />

      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        }}
      >
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="will-change-transform"
        >
          <main>
            {currentOutlet}
          </main>
          <FooterSection />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
