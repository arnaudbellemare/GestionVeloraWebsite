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
    y: 10,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.34,
      ease: EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.2,
      ease: EASE,
    },
  },
};

export function Layout() {
  const location = useLocation();
  const currentOutlet = useOutlet();

  return (
    <div className="min-h-screen bg-nd-canvas text-nd-primary flex flex-col overflow-x-hidden">
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
          className="flex-1 flex flex-col w-full min-w-0 min-h-0"
        >
          <main className="flex-1 w-full min-w-0">{currentOutlet}</main>
        </motion.div>
      </AnimatePresence>
      <FooterSection />
    </div>
  );
}
