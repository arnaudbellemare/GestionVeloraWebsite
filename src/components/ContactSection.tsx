import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { ContactCustomSelect } from "./ContactCustomSelect";
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
              className="inline-flex px-8 py-4 rounded-full bg-neutral-950 text-white font-sans font-bold text-sm tracking-wide hover:bg-black transition-colors duration-300 shadow-md shadow-neutral-950/15 dark:bg-[#ebe8e3] dark:text-[#1C1C1C] dark:hover:bg-[#f5f3f0] dark:shadow-lg dark:shadow-black/35"
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
                    <div className="space-y-5">
                      <div>
                        <label
                          id="contact-topic-label"
                          htmlFor="contact-topic"
                          className="mb-2 block font-sans text-xs font-medium uppercase tracking-wider text-black/60 dark:text-white/55"
                        >
                          {t("contact.topicLabel")}
                        </label>
                        <ContactCustomSelect
                          id="contact-topic"
                          labelId="contact-topic-label"
                          value={formData.topic}
                          onChange={(v) =>
                            setFormData((p) => ({ ...p, topic: v as Topic }))
                          }
                          options={[
                            { value: "general", label: t("contact.topicGeneral") },
                            { value: "demo", label: t("contact.topicDemo") },
                            {
                              value: "communication",
                              label: t("contact.topicCommunication"),
                            },
                          ]}
                        />
                      </div>
                      <div>
                        <label
                          id="contact-inquiry-label"
                          htmlFor="contact-inquiry"
                          className="mb-2 block font-sans text-xs font-medium uppercase tracking-wider text-black/60 dark:text-white/55"
                        >
                          {t("contact.inquiryLabel")}
                        </label>
                        <ContactCustomSelect
                          id="contact-inquiry"
                          labelId="contact-inquiry-label"
                          value={formData.inquiry}
                          onChange={(v) =>
                            setFormData((p) => ({ ...p, inquiry: v as Inquiry }))
                          }
                          placeholder={t("contact.inquiryPlaceholder")}
                          options={[
                            { value: "", label: t("contact.inquiryPlaceholder") },
                            { value: "syndic", label: t("contact.inquirySyndic") },
                            { value: "landlord", label: t("contact.inquiryLandlord") },
                            { value: "airbnb", label: t("contact.inquiryAirbnb") },
                            { value: "other", label: t("contact.inquiryOther") },
                          ]}
                        />
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
                        className="w-full rounded-xl border border-black/20 bg-white px-4 py-3.5 font-sans text-base text-black placeholder:text-black/45 transition-shadow transition-colors focus:border-velora-ocean focus:outline-none focus:ring-2 focus:ring-velora-ocean/25 dark:border-white/25 dark:bg-[#252525] dark:text-white dark:placeholder:text-white/45 dark:focus:border-sky-400 dark:focus:ring-sky-400/20"
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
                        className="w-full rounded-xl border border-black/20 bg-white px-4 py-3.5 font-sans text-base text-black placeholder:text-black/45 transition-shadow transition-colors focus:border-velora-ocean focus:outline-none focus:ring-2 focus:ring-velora-ocean/25 dark:border-white/25 dark:bg-[#252525] dark:text-white dark:placeholder:text-white/45 dark:focus:border-sky-400 dark:focus:ring-sky-400/20"
                      />
                      <motion.textarea
                        placeholder={t("contact.messagePlaceholder")}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, message: e.target.value }))
                        }
                        rows={5}
                        required
                        className="min-h-[8.5rem] w-full resize-none rounded-xl border border-black/20 bg-white px-4 py-3.5 font-sans text-base text-black placeholder:text-black/45 transition-shadow transition-colors focus:border-velora-ocean focus:outline-none focus:ring-2 focus:ring-velora-ocean/25 dark:border-white/25 dark:bg-[#252525] dark:text-white dark:placeholder:text-white/45 dark:focus:border-sky-400 dark:focus:ring-sky-400/20"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={status === "submitting"}
                      whileHover={status === "submitting" ? undefined : { scale: 1.01 }}
                      whileTap={status === "submitting" ? undefined : { scale: 0.99 }}
                      className="mt-8 w-full min-h-[48px] rounded-xl bg-neutral-950 px-6 py-3.5 font-sans text-base font-semibold text-white shadow-md shadow-neutral-950/20 transition-colors hover:bg-black disabled:pointer-events-none disabled:opacity-55 dark:bg-[#ebe8e3] dark:text-[#1C1C1C] dark:shadow-lg dark:shadow-black/30 dark:hover:bg-[#f5f3f0]"
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
