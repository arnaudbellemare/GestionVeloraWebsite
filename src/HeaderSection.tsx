import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { InternalLink } from "./components/InternalLink";
import { ThemeToggle } from "./components/ThemeToggle";
import { PORTAL_URLS } from "./config";

const serviceLinks = [
  { to: "/services/syndicat-copropriete", label: "Syndicat de copropriété", desc: "Administration complète et transparence pour chaque copropriété." },
  { to: "/services/airbnb", label: "Airbnb", desc: "Gestion des réservations et maximisation des revenus en toute sérénité." },
  { to: "/services/location", label: "Location", desc: "Sélection des locataires, baux et suivi professionnel." },
];

export const HeaderSection = (): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = () => {
    closeTimerRef.current = setTimeout(() => setServicesOpen(false), 150);
  };
  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-2 sm:pt-4"
    >
      {/* Thin dark strip at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-900 dark:bg-black" aria-hidden />

      <div className="max-w-[90rem] mx-auto flex items-center justify-between gap-4">
        {/* Left pill: logo + nav */}
        <div className="flex items-center gap-1 px-4 py-2.5 rounded-2xl bg-neutral-600/95 dark:bg-neutral-700/95 backdrop-blur-sm shadow-lg">
          <InternalLink to="/" className="flex items-center gap-1 shrink-0 -m-1 p-1 rounded-lg">
            <img src="/logo.png" alt="Gestion Velora" className="h-8 w-auto" />
            <span className="font-sans font-bold text-white text-base hidden sm:inline">Gestion Velora</span>
          </InternalLink>
          <nav className="hidden md:flex items-center gap-0.5 ml-2 pl-2 border-l border-white/20">
            <InternalLink to="/" className="font-sans text-sm text-white/90 hover:text-white px-2.5 py-1.5 rounded-lg transition-colors duration-300">
              Accueil
            </InternalLink>
            <div
              className="relative"
              onMouseEnter={() => { cancelClose(); setServicesOpen(true); }}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className="font-sans text-sm text-white/90 hover:text-white px-2.5 py-1.5 rounded-lg transition-colors duration-300 inline-flex items-center gap-1"
              >
                Services
                <svg className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-0.5 py-3 min-w-[280px] rounded-xl bg-neutral-900 text-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)]"
                >
                  {serviceLinks.map((s) => (
                    <InternalLink
                      key={s.to}
                      to={s.to}
                      className="block px-4 py-3 hover:bg-white/5 transition-colors duration-300 first:rounded-t-lg last:rounded-b-lg"
                      onClick={() => setServicesOpen(false)}
                    >
                      <span className="font-sans font-semibold text-white block">{s.label}</span>
                      <span className="font-sans text-xs text-white/60 mt-0.5 block">{s.desc}</span>
                    </InternalLink>
                  ))}
                </motion.div>
              )}
            </div>
            <InternalLink to="/blog" className="font-sans text-sm text-white/90 hover:text-white px-2.5 py-1.5 rounded-lg transition-colors duration-300">
              Insights
            </InternalLink>
          </nav>
          <button
            type="button"
            aria-label="Menu"
            className="md:hidden p-2 -mr-1 text-white rounded-lg hover:bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16h16" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Right pill: actions */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-neutral-600/95 dark:bg-neutral-700/95 backdrop-blur-sm shadow-lg">
          <ThemeToggle lightModeOverWhite={false} />
          <a
            href={PORTAL_URLS.service}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-white text-neutral-800 font-sans font-semibold text-sm hover:bg-white/95 transition-colors duration-300"
          >
            Connexion
          </a>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 ml-4 py-4 px-4 rounded-2xl bg-neutral-600/95 dark:bg-neutral-700/95 backdrop-blur-sm shadow-lg w-[calc(100%-2rem)] max-w-sm flex flex-col gap-1"
        >
          <InternalLink to="/" className="font-sans text-white py-2" onClick={() => setMobileOpen(false)}>Accueil</InternalLink>
          <div className="py-2">
            <span className="font-sans text-white/70 text-sm block mb-2">Services</span>
            <div className="flex flex-col gap-1 pl-3">
              {serviceLinks.map((s) => (
                <InternalLink key={s.to} to={s.to} className="font-sans text-white/90 py-1.5 text-sm" onClick={() => setMobileOpen(false)}>
                  {s.label}
                </InternalLink>
              ))}
            </div>
          </div>
          <InternalLink to="/blog" className="font-sans text-white py-2" onClick={() => setMobileOpen(false)}>Insights</InternalLink>
          <a href={PORTAL_URLS.service} target="_blank" rel="noopener noreferrer" className="font-sans text-white py-2" onClick={() => setMobileOpen(false)}>Connexion</a>
        </motion.div>
      )}
    </motion.header>
  );
};
