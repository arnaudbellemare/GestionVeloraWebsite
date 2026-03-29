import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { CONTACT_FORM_USE_API, WEB3FORMS_ACCESS_KEY } from "../config";

const NOTIFICATION_EMAIL = "info@gestionvelora.com";

type Inquiry = "" | "syndic" | "landlord" | "airbnb" | "other";
type Topic = "general" | "demo" | "communication";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

function inquiryLabel(t: TFunction, inquiry: Inquiry): string {
  switch (inquiry) {
    case "syndic":
      return t("contact.inquirySyndic");
    case "landlord":
      return t("contact.inquiryLandlord");
    case "airbnb":
      return t("contact.inquiryAirbnb");
    case "other":
      return t("contact.inquiryOther");
    default:
      return "";
  }
}

function topicLine(t: TFunction, topic: Topic): string {
  switch (topic) {
    case "general":
      return t("contact.topicGeneral");
    case "demo":
      return t("contact.topicDemo");
    case "communication":
      return t("contact.topicCommunication");
  }
}

function emailSubject(topic: Topic, lang: string): string {
  const isEn = lang.startsWith("en");
  if (topic === "demo") {
    return isEn
      ? `[Demo] Gestion Velora — Website contact`
      : `[Démo] Gestion Velora — Contact site web`;
  }
  if (topic === "communication") {
    return isEn
      ? `[Communication] Gestion Velora — Website contact`
      : `[Communication] Gestion Velora — Contact site web`;
  }
  return isEn
    ? `Gestion Velora — Website contact`
    : `Gestion Velora — Contact site web`;
}

export function ContactSection() {
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    topic: "general" as Topic,
    name: "",
    email: "",
    message: "",
    inquiry: "" as Inquiry,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const buildMessageBody = (): string => {
    const tl = topicLine(t, formData.topic);
    const il = inquiryLabel(t, formData.inquiry);
    const header = `${t("contact.topicLabel")}: ${tl}`;
    const profile =
      il === "" ? "" : `\n${t("contact.inquiryLabel")}: ${il}`;
    return `${header}${profile}\n\n${formData.message}`;
  };

  const submitMailto = () => {
    const subject = emailSubject(formData.topic, i18n.language);
    const mailto = `mailto:${NOTIFICATION_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(buildMessageBody() + `\n\n—\n${formData.name}\n${formData.email}`)}`;
    window.location.href = mailto;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    if (!CONTACT_FORM_USE_API) {
      submitMailto();
      return;
    }

    setStatus("submitting");
    const messageBody = buildMessageBody();
    const subject = emailSubject(formData.topic, i18n.language);

    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject,
          name: formData.name,
          email: formData.email,
          message: messageBody,
          from_name: formData.name,
          botcheck: "",
        }),
      });
      const data = (await res.json()) as { success?: boolean; message?: string };

      if (data.success) {
        setStatus("success");
        setFormData({
          topic: "general",
          name: "",
          email: "",
          message: "",
          inquiry: "",
        });
      } else {
        setStatus("error");
        if (import.meta.env.DEV && data.message) {
          console.warn("[Web3Forms]", data.message);
        }
      }
    } catch {
      setStatus("error");
    }
  };

  const resetToForm = () => setStatus("idle");

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
              className="inline-flex px-8 py-4 rounded-full bg-velora-ocean text-white font-sans font-bold text-sm hover:bg-velora-ocean-hover transition-colors duration-300 shadow-sm shadow-velora-ocean/25"
            >
              {t("contact.cta")}
            </motion.a>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-12 max-w-md scroll-mt-24" id="contact-form">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl border-2 border-black/10 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.04] p-8"
                  >
                    <p className="font-playfair font-semibold text-xl text-black dark:text-white mb-2">
                      {t("contact.successTitle")}
                    </p>
                    <p className="font-sans text-black/75 dark:text-white/70 mb-6">
                      {t("contact.successBody")}
                    </p>
                    <button
                      type="button"
                      onClick={resetToForm}
                      className="font-sans font-semibold text-sm text-velora-ocean dark:text-sky-400 hover:underline underline-offset-2"
                    >
                      {t("contact.sendAnother")}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {status === "error" && (
                      <p
                        role="alert"
                        className="mb-4 font-sans text-sm text-red-600 dark:text-red-400"
                      >
                        {t("contact.errorBody")}
                      </p>
                    )}
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="contact-topic"
                          className="mb-2 block font-sans text-xs font-medium uppercase tracking-wider text-black/55 dark:text-white/50"
                        >
                          {t("contact.topicLabel")}
                        </label>
                        <select
                          id="contact-topic"
                          value={formData.topic}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              topic: e.target.value as Topic,
                            }))
                          }
                          required
                          className="w-full px-6 py-4 rounded-full bg-transparent border-2 border-black/15 dark:border-white/20 text-black dark:text-white font-sans text-base focus:border-velora-ocean dark:focus:border-sky-400 focus:outline-none transition-colors duration-300 appearance-none cursor-pointer bg-[length:1rem] bg-[right_1.25rem_center] bg-no-repeat dark:bg-[#1C1C1C]"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23717171'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                          }}
                        >
                          <option value="general">{t("contact.topicGeneral")}</option>
                          <option value="demo">{t("contact.topicDemo")}</option>
                          <option value="communication">{t("contact.topicCommunication")}</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="contact-inquiry" className="sr-only">
                          {t("contact.inquiryLabel")}
                        </label>
                        <select
                          id="contact-inquiry"
                          value={formData.inquiry}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              inquiry: e.target.value as Inquiry,
                            }))
                          }
                          className="w-full px-6 py-4 rounded-full bg-transparent border-2 border-black/15 dark:border-white/20 text-black dark:text-white font-sans text-base focus:border-velora-ocean dark:focus:border-sky-400 focus:outline-none transition-colors duration-300 appearance-none cursor-pointer bg-[length:1rem] bg-[right_1.25rem_center] bg-no-repeat dark:bg-[#1C1C1C]"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23717171'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                          }}
                        >
                          <option value="">{t("contact.inquiryPlaceholder")}</option>
                          <option value="syndic">{t("contact.inquirySyndic")}</option>
                          <option value="landlord">{t("contact.inquiryLandlord")}</option>
                          <option value="airbnb">{t("contact.inquiryAirbnb")}</option>
                          <option value="other">{t("contact.inquiryOther")}</option>
                        </select>
                      </div>
                      <motion.input
                        type="text"
                        placeholder={t("contact.namePlaceholder")}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, name: e.target.value }))
                        }
                        required
                        autoComplete="name"
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        className="w-full px-6 py-4 rounded-full bg-transparent border-2 border-black/15 dark:border-white/20 text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 font-sans text-base focus:border-velora-ocean dark:focus:border-sky-400 focus:outline-none transition-colors duration-300"
                      />
                      <motion.input
                        type="email"
                        placeholder={t("contact.emailPlaceholder")}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, email: e.target.value }))
                        }
                        required
                        autoComplete="email"
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        className="w-full px-6 py-4 rounded-full bg-transparent border-2 border-black/15 dark:border-white/20 text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 font-sans text-base focus:border-velora-ocean dark:focus:border-sky-400 focus:outline-none transition-colors duration-300"
                      />
                      <motion.textarea
                        placeholder={t("contact.messagePlaceholder")}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, message: e.target.value }))
                        }
                        rows={4}
                        required
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        className="w-full px-6 py-4 rounded-2xl bg-transparent border-2 border-black/15 dark:border-white/20 text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 font-sans text-base focus:border-velora-ocean dark:focus:border-sky-400 focus:outline-none resize-none transition-colors duration-300"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={status === "submitting"}
                      whileHover={status === "submitting" ? undefined : { scale: 1.02 }}
                      whileTap={status === "submitting" ? undefined : { scale: 0.98 }}
                      className="mt-6 px-8 py-4 rounded-full border-2 border-black/20 dark:border-white/30 text-black dark:text-white font-sans font-semibold text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300 disabled:opacity-60 disabled:pointer-events-none"
                    >
                      {status === "submitting" ? t("contact.sending") : t("contact.send")}
                    </motion.button>
                    {!CONTACT_FORM_USE_API && import.meta.env.DEV && (
                      <p className="mt-4 font-sans text-xs text-black/45 dark:text-white/40">
                        Dev: set <code className="font-mono">VITE_WEB3FORMS_ACCESS_KEY</code> in{" "}
                        <code className="font-mono">.env.local</code> for API submit; otherwise mailto opens to{" "}
                        {NOTIFICATION_EMAIL}.
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
