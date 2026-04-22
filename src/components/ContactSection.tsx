import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { ContactCustomSelect } from "./ContactCustomSelect";
import { CONTACT_FORM_USE_API, WEB3FORMS_ACCESS_KEY } from "../config";
import { trackGenerateLead } from "../lib/analytics";

const NOTIFICATION_EMAIL = "info@gestionvelora.com";

type Inquiry = "" | "syndic" | "landlord" | "airbnb" | "other";
type Topic = "general" | "demo" | "communication";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

const contactFieldBorder =
  "border border-nd-border-visible focus:border-nd-primary focus:outline-none transition-colors";
const contactInputClass = `w-full min-h-12 h-12 box-border rounded-md bg-nd-canvas px-4 py-0 text-base leading-[3rem] font-nd-grotesk text-nd-primary placeholder:text-nd-secondary/80 ${contactFieldBorder}`;
const contactTextareaClass = `min-h-[8.5rem] w-full resize-none rounded-md bg-nd-canvas px-4 py-3 text-base leading-relaxed font-nd-grotesk text-nd-primary placeholder:text-nd-secondary/80 ${contactFieldBorder}`;

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
      ? `[Demo] Gestion Velora - Website contact`
      : `[Démo] Gestion Velora - Contact site web`;
  }
  if (topic === "communication") {
    return isEn
      ? `[Communication] Gestion Velora - Website contact`
      : `[Communication] Gestion Velora - Contact site web`;
  }
  return isEn
    ? `Gestion Velora - Website contact`
    : `Gestion Velora - Contact site web`;
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
    trackGenerateLead({
      topic: formData.topic,
      inquiry: formData.inquiry,
      submit_method: "mailto",
    });
    const subject = emailSubject(formData.topic, i18n.language);
    const mailto = `mailto:${NOTIFICATION_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(buildMessageBody() + `\n\n-\n${formData.name}\n${formData.email}`)}`;
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
        trackGenerateLead({
          topic: formData.topic,
          inquiry: formData.inquiry,
          submit_method: "api",
        });
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
      className="relative pt-16 pb-24 lg:pt-20 lg:pb-32 px-6 lg:px-16 bg-nd-canvas overflow-x-hidden scroll-mt-24 border-t border-nd-border"
    >
      <div className="max-w-[90rem] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-16">
          <ScrollReveal>
            <div className="max-w-lg">
              <p className="font-nd-mono text-[10px] uppercase tracking-[0.14em] text-nd-secondary mb-5">
                {t("contact.cta")}
              </p>
              <h2 className="font-nd-grotesk font-medium text-4xl lg:text-5xl text-nd-display leading-[1.06] tracking-[-0.02em] mb-5">
                {t("contact.title")}
              </h2>
              <p className="max-w-[64ch] font-nd-grotesk text-sm lg:text-base text-nd-secondary leading-relaxed">
                {t("contact.trustLine")}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="w-full max-w-xl lg:ml-auto scroll-mt-24" id="contact-form">
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
                    className="rounded-lg border border-nd-border-visible bg-nd-surface p-6 lg:p-7"
                  >
                    <p className="font-nd-grotesk font-medium text-xl text-nd-primary mb-2">
                      {t("contact.successTitle")}
                    </p>
                    <p className="font-nd-grotesk text-nd-secondary mb-2">
                      {t("contact.successBody")}
                    </p>
                    <p className="font-nd-grotesk text-sm text-nd-secondary mb-6">
                      {t("contact.successExpectation")}
                    </p>
                    <button
                      type="button"
                      onClick={resetToForm}
                      className="font-nd-mono text-[10px] uppercase tracking-[0.12em] text-nd-primary hover:text-nd-secondary transition-colors"
                    >
                      {t("contact.sendAnother")}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    data-toolname="contact-form-submit"
                    data-tooldescription="Submit a property management contact request"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {status === "error" && (
                      <p
                        role="alert"
                        className="mb-4 font-nd-mono text-[10px] uppercase tracking-[0.12em] text-[#D71921]"
                      >
                        {t("contact.errorBody")}
                      </p>
                    )}
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label
                          id="contact-topic-label"
                          htmlFor="contact-topic"
                          className="block font-nd-mono text-[10px] uppercase tracking-[0.12em] text-nd-secondary"
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
                      <div className="space-y-2">
                        <label
                          id="contact-inquiry-label"
                          htmlFor="contact-inquiry"
                          className="block font-nd-mono text-[10px] uppercase tracking-[0.12em] text-nd-secondary"
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
                      <div className="space-y-2">
                        <label htmlFor="contact-name" className="block font-nd-mono text-[10px] uppercase tracking-[0.12em] text-nd-secondary">
                          {t("contact.namePlaceholder")}
                        </label>
                        <motion.input
                          id="contact-name"
                          type="text"
                          aria-label={t("contact.namePlaceholder")}
                          placeholder={t("contact.namePlaceholder")}
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, name: e.target.value }))
                          }
                          required
                          autoComplete="name"
                          className={contactInputClass}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-email" className="block font-nd-mono text-[10px] uppercase tracking-[0.12em] text-nd-secondary">
                          {t("contact.emailPlaceholder")}
                        </label>
                        <motion.input
                          id="contact-email"
                          type="email"
                          aria-label={t("contact.emailPlaceholder")}
                          placeholder={t("contact.emailPlaceholder")}
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, email: e.target.value }))
                          }
                          required
                          autoComplete="email"
                          className={contactInputClass}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-message" className="block font-nd-mono text-[10px] uppercase tracking-[0.12em] text-nd-secondary">
                          {t("contact.messagePlaceholder")}
                        </label>
                        <motion.textarea
                          id="contact-message"
                          aria-label={t("contact.messagePlaceholder")}
                          placeholder={t("contact.messagePlaceholder")}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, message: e.target.value }))
                          }
                          rows={5}
                          required
                          className={contactTextareaClass}
                        />
                      </div>
                    </div>
                    <motion.button
                      type="submit"
                      data-toolname="send-contact-message"
                      data-tooldescription="Send a message to Gestion Velora"
                      disabled={status === "submitting"}
                      className="mt-7 inline-flex self-start items-center justify-center min-h-[44px] px-5 py-2.5 rounded-md bg-nd-primary text-nd-canvas font-nd-mono text-[11px] tracking-[0.12em] uppercase border border-nd-primary transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-55"
                    >
                      {status === "submitting" ? t("contact.sending") : t("contact.send")}
                    </motion.button>
                    {!CONTACT_FORM_USE_API && import.meta.env.DEV && (
                      <p className="mt-4 font-nd-grotesk text-xs text-black/45 dark:text-white/40">
                        Dev: set <code className="font-nd-mono">VITE_WEB3FORMS_ACCESS_KEY</code> in{" "}
                        <code className="font-nd-mono">.env.local</code> for API submit; otherwise mailto opens to{" "}
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
