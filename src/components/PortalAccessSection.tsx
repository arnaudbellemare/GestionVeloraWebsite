import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { PORTAL_URLS } from "../config";

export function PortalAccessSection() {
  return (
    <section
      id="portails"
      className="py-24 lg:py-32 px-6 lg:px-16 bg-[#1C1C1C] dark:bg-black overflow-hidden"
    >
      <div className="max-w-[90rem] mx-auto">
        <ScrollReveal>
          <h2 className="font-playfair font-bold text-3xl lg:text-4xl text-white leading-tight mb-4">
            Accédez à vos portails
          </h2>
          <p className="font-sans text-white/70 mb-12 max-w-xl">
            Connectez-vous à l&apos;espace gestionnaire ou copropriétaire selon votre profil.
          </p>
        </ScrollReveal>
        <div className="flex flex-col sm:flex-row gap-6">
          <ScrollReveal delay={0.1}>
            <motion.a
              href={PORTAL_URLS.manager}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className="group block flex-1 p-8 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: -5 }}
                  className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </motion.div>
                <span className="font-sans font-semibold text-xl text-white">Espace syndic / Gestionnaire</span>
              </div>
              <p className="font-sans text-sm text-white/60">
                Comptabilité, documents, demandes, approbations et rapports.
              </p>
              <span className="inline-flex items-center gap-2 mt-4 font-sans text-sm text-white/80 group-hover:text-white transition-colors">
                Accéder au portail
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.span>
              </span>
            </motion.a>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <motion.a
              href={PORTAL_URLS.service}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className="group block flex-1 p-8 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 5 }}
                  className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </motion.div>
                <span className="font-sans font-semibold text-xl text-white">Espace copropriétaire</span>
              </div>
              <p className="font-sans text-sm text-white/60">
                Consultez vos frais, documents, demandes et assemblées.
              </p>
              <span className="inline-flex items-center gap-2 mt-4 font-sans text-sm text-white/80 group-hover:text-white transition-colors">
                Accéder au portail
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.span>
              </span>
            </motion.a>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={0.3}>
          <p className="mt-8 font-sans text-sm text-white/50">
            Apprenez-en plus sur Nestreva, la plateforme de gestion pour gestionnaire ou propriétaire :{" "}
            <a
              href="https://nestreva.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white underline transition-colors"
            >
              en savoir plus
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
