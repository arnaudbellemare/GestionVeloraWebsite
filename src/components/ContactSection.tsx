import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

export function ContactSection() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:info@gestionvelora.com?subject=Contact depuis le site&body=${encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailto;
  };

  return (
    <section
      id="contact"
      className="relative pt-16 pb-24 lg:pt-20 lg:pb-32 px-6 lg:px-16 bg-white dark:bg-[#1C1C1C] overflow-hidden scroll-mt-24"
    >
      <div className="max-w-[90rem] mx-auto relative z-10">
        <div className="max-w-2xl">
          <ScrollReveal scale>
            <h2 className="font-playfair font-bold text-4xl lg:text-5xl text-black dark:text-white leading-tight mb-6">
              {t("contact.title")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <motion.a
              href="#contact-form"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex px-8 py-4 rounded-full bg-waabi-pink text-white font-sans font-bold text-sm hover:bg-waabi-pink/90 transition-colors duration-300"
            >
              {t("contact.cta")}
            </motion.a>
          </ScrollReveal>

          {/* Contact form */}
          <ScrollReveal delay={0.2}>
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="mt-12 max-w-md scroll-mt-24"
            >
              <div className="space-y-4">
                <motion.input
                  type="text"
                  placeholder={t("contact.namePlaceholder")}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="w-full px-6 py-4 rounded-full bg-transparent border-2 border-black/15 dark:border-white/20 text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 font-sans text-base focus:border-waabi-pink focus:outline-none transition-colors duration-300"
                />
                <motion.input
                  type="email"
                  placeholder={t("contact.emailPlaceholder")}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="w-full px-6 py-4 rounded-full bg-transparent border-2 border-black/15 dark:border-white/20 text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 font-sans text-base focus:border-waabi-pink focus:outline-none transition-colors duration-300"
                />
                <motion.textarea
                  placeholder={t("contact.messagePlaceholder")}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, message: e.target.value }))
                  }
                  rows={3}
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="w-full px-6 py-4 rounded-2xl bg-transparent border-2 border-black/15 dark:border-white/20 text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 font-sans text-base focus:border-waabi-pink focus:outline-none resize-none transition-colors duration-300"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 px-8 py-4 rounded-full border-2 border-black/20 dark:border-white/30 text-black dark:text-white font-sans font-semibold text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300"
              >
                {t("contact.send")}
              </motion.button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
