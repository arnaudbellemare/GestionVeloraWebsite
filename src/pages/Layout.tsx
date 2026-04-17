import { useLocation, useOutlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FooterSection } from "../FooterSection";
import { HeaderSection } from "../HeaderSection";
import { CanonicalUrl } from "../components/CanonicalUrl";
import { GtagPageView } from "../components/GtagPageView";
import { PageMeta } from "../components/PageMeta";
import { HreflangLinks } from "../components/HreflangLinks";
import { SchemaOrg } from "../components/SchemaOrg";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const pageVariants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.28,
      ease: EASE,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.22,
      ease: EASE,
    },
  },
};

export function Layout() {
  const location = useLocation();
  const currentOutlet = useOutlet();

  return (
    <div className="min-h-screen bg-nd-canvas text-nd-primary overflow-hidden">
      <PageMeta />
      <GtagPageView />
      <CanonicalUrl />
      <HreflangLinks />
      <SchemaOrg />

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
