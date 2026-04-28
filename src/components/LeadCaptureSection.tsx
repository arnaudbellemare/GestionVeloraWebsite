import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "./ScrollReveal";

interface LeadCaptureSectionProps {
  variant?: "homepage" | "blog" | "service";
}

export function LeadCaptureSection({ variant = "homepage" }: LeadCaptureSectionProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");

    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const isBlog = variant === "blog";

  return (
    <ScrollReveal>
      <section
        className={
          isBlog
            ? "my-12 rounded-2xl border border-waabi-pink/20 bg-waabi-pink/[0.04] dark:bg-waabi-pink/[0.07] px-6 py-8 lg:px-8 lg:py-10"
            : "py-16 lg:py-20 bg-nd-surface border-y border-nd-border"
        }
        aria-labelledby="lead-capture-heading"
      >
        <div className={isBlog ? "" : "max-w-[90rem] mx-auto px-6 lg:px-16"}>
          <div className="max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-waabi-pink mb-3">
              {t("leadCapture.eyebrow")}
            </p>
            <h2
              id="lead-capture-heading"
              className="font-sans font-medium text-xl lg:text-2xl text-nd-display mb-2 leading-snug tracking-[-0.02em]"
            >
              {t("leadCapture.title")}
            </h2>
            <p className="font-sans text-sm text-black/65 dark:text-white/65 mb-6">
              {t("leadCapture.subtitle")}
            </p>

            {status === "success" ? (
              <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/40 px-5 py-4">
                <p className="font-sans text-sm font-medium text-green-800 dark:text-green-300">
                  {t("leadCapture.success")}
                </p>
              </div>
            ) : (
              <form
                name="lead-capture"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input type="hidden" name="form-name" value="lead-capture" />
                <input
                  type="text"
                  name="bot-field"
                  aria-hidden="true"
                  tabIndex={-1}
                  className="hidden"
                  readOnly
                />
                <label htmlFor="lead-email" className="sr-only">
                  {t("leadCapture.placeholder")}
                </label>
                <input
                  id="lead-email"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("leadCapture.placeholder")}
                  className="flex-1 min-w-0 rounded-full border border-black/15 dark:border-white/15 bg-white dark:bg-white/5 px-5 py-3 font-sans text-sm text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-waabi-pink/40 focus:border-waabi-pink/60 transition-colors min-h-[44px]"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-full bg-waabi-pink text-white font-sans font-semibold text-sm hover:bg-waabi-pink/90 disabled:opacity-60 transition-colors min-h-[44px]"
                >
                  {status === "submitting" ? "..." : t("leadCapture.cta")}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="mt-3 font-sans text-xs text-red-600 dark:text-red-400">
                {t("leadCapture.error")}
              </p>
            )}

            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-black/35 dark:text-white/30">
              {t("leadCapture.legal")}
            </p>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
