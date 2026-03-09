import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
];

export function ContactSection() {
  const [hovered, setHovered] = useState(false);

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
      className="pt-28 pb-24 lg:pt-32 lg:pb-32 px-6 lg:px-16 bg-white dark:bg-velora-charcoal overflow-hidden scroll-mt-24"
    >
      <div className="max-w-[90rem] mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-20">
          {/* Left: Heading + CTA */}
          <div className="lg:flex-1 lg:max-w-xl">
            <ScrollReveal scale>
              <h2 className="font-playfair font-bold text-4xl lg:text-5xl text-black dark:text-white leading-tight mb-6">
                Gérez quelque chose d&apos;extraordinaire.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <motion.a
                href="#contact-form"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex px-8 py-4 rounded-full bg-waabi-pink text-white font-sans font-bold text-sm hover:bg-waabi-pink/90 transition-colors duration-300"
              >
                Planifiez un appel
              </motion.a>
            </ScrollReveal>

            {/* Contact form below CTA */}
            <ScrollReveal delay={0.2}>
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                className="mt-12 max-w-md scroll-mt-24"
              >
                <div className="space-y-4">
                  <motion.input
                    type="text"
                    placeholder="Votre nom"
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
                    placeholder="Votre courriel"
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
                    placeholder="Votre message"
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
                  Envoyer
                </motion.button>
              </form>
            </ScrollReveal>
          </div>

          {/* Right: Overlapping stacked images - fan out on hover (simple grid on mobile) */}
          <div
            className="relative w-full lg:w-1/2 flex-shrink-0"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Mobile: simple 2-col grid */}
            <div className="lg:hidden grid grid-cols-2 gap-3 sm:gap-4">
              {GALLERY_IMAGES.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`rounded-xl overflow-hidden shadow-lg aspect-[4/3] ${
                    i === 0 ? "col-span-2" : ""
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
            {/* Desktop: overlapping collage */}
            <div className="hidden lg:block relative h-[480px]">
              {GALLERY_IMAGES.map((src, i) => {
                const spread = hovered ? (i + 1) * 12 : 0;
                const lift = hovered ? -i * 4 : 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    animate={{
                      x: spread,
                      y: lift,
                      rotate: (i - 2) * 3,
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute rounded-xl overflow-hidden shadow-xl"
                    style={{
                      left: `${i * 8}%`,
                      top: `${i % 2 === 0 ? 0 : 12}%`,
                      width: i === 2 ? "38%" : "32%",
                      zIndex: GALLERY_IMAGES.length - i,
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover min-h-[280px]"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
