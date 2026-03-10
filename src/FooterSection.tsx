import { motion } from "framer-motion";
import { useState } from "react";
import { InternalLink } from "./components/InternalLink";
import { PORTAL_URLS } from "./config";

export const FooterSection = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const navigationLinks = [
    { label: "Accueil", to: "/" },
    { label: "Nos standards", to: "/#standards" },
    { label: "FAQ", to: "/#faq" },
    { label: "Insights", to: "/blog" },
    { label: "Contact", to: "/#contact" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative bg-[#1C1C1C] overflow-hidden"
    >
      <div className="max-w-[90rem] mx-auto relative z-10 px-6 lg:px-16 pt-16 lg:pt-20 pb-8">
        {/* Top: Contact, Connect, Subscribe columns */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16 mb-8 lg:mb-12">
          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <h4 className="font-sans text-xs uppercase tracking-widest text-white/70 mb-4">
              Contact
            </h4>
            <a
              href="tel:+15147771731"
              className="font-sans text-white/90 hover:text-white transition-colors duration-300 block mb-2"
            >
              (514) 777-1731
            </a>
            <a
              href="mailto:info@gestionvelora.com"
              className="font-sans text-white/90 hover:text-white transition-colors duration-300 block mb-4"
            >
              info@gestionvelora.com
            </a>
            <p className="font-sans text-sm text-white/60 leading-relaxed">
              Montréal, QC
            </p>
          </motion.div>

          {/* Connect - Portal access */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-sans text-xs uppercase tracking-widest text-white/70 mb-4">
              Portails
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href={PORTAL_URLS.manager}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-white/90 hover:text-white transition-colors duration-300"
              >
                Espace syndic
              </a>
              <a
                href={PORTAL_URLS.service}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-white/90 hover:text-white transition-colors duration-300"
              >
                Espace copropriétaire
              </a>
            </div>
          </motion.div>

          {/* Nav */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-sans text-xs uppercase tracking-widest text-white/70 mb-4">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {navigationLinks.map((link) => (
                <InternalLink
                  key={link.to}
                  to={link.to}
                  className="font-sans text-white/90 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </InternalLink>
              ))}
            </nav>
          </motion.div>

          {/* Subscribe */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:ml-auto"
          >
            <h4 className="font-sans text-xs uppercase tracking-widest text-white/70 mb-4">
              Infolettre
            </h4>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 border-b border-white/30 pb-2"
            >
              <input
                type="email"
                placeholder="Courriel"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 bg-transparent text-white placeholder-white/50 font-sans text-sm focus:outline-none transition-colors duration-300"
              />
              <button
                type="submit"
                aria-label="S'inscrire"
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </motion.div>
        </div>

        {/* Brand and logo */}
        <div className="mb-12 flex items-end min-h-[7rem] lg:min-h-[9rem]">
          <span className="font-sans font-bold text-6xl lg:text-8xl text-white/20">
            Gestion Velora
          </span>
          <motion.img
            src="/logo.png"
            alt="Gestion Velora"
            initial={{ opacity: 0, x: 24, scale: 0.94 }}
            whileInView={{ opacity: 0.9, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 28,
              delay: 0.35,
            }}
            whileHover={{ scale: 1.05, opacity: 1, y: -4 }}
            whileTap={{ scale: 1.02 }}
            style={{ transformOrigin: "right bottom" }}
            className="h-36 w-auto sm:h-44 lg:h-56 xl:h-64 flex-shrink-0 -translate-y-8 lg:-translate-y-10 ml-auto"
          />
        </div>
      </div>

      {/* Bottom bar: copyright, privacy, etc. */}
      <div className="border-t border-white/10">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <span>©{new Date().getFullYear()} Gestion Velora</span>
          <InternalLink to="/privacy" className="hover:text-white transition-colors duration-300">
            Politique de confidentialité
          </InternalLink>
          <a href="#" className="hover:text-white transition-colors duration-300">
            Conçu avec soin →
          </a>
        </div>
      </div>
    </motion.footer>
  );
};
