import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CONTACT_FORM_USE_API, WEB3FORMS_ACCESS_KEY } from "../config";
import { trackGenerateLead } from "../lib/analytics";
import "./CondoGuidePopup.css";

const STORAGE_KEY = "velora-condo-guide-dismissed";
const GUIDE_URL = "/guides/guide-technique-copropriete.pdf";

export function CondoGuidePopup() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith("en");
  const dialog = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    if (!CONTACT_FORM_USE_API) return;
    let dismissed = false;
    try { dismissed = sessionStorage.getItem(STORAGE_KEY) === "1"; } catch { /* Storage can be unavailable. */ }
    if (dismissed) return;
    let ready = false;
    let scrolled = false;
    const open = () => {
      if (!ready || !scrolled || !dialog.current || dialog.current.open) return;
      previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.current.showModal();
      window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= 500 && distance > 0 && window.scrollY / distance >= 0.3) {
        scrolled = true;
        open();
      }
    };
    const timer = window.setTimeout(() => { ready = true; open(); }, 10000);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, []);

  function close() {
    dialog.current?.close();
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch { /* The dialog still closes without storage. */ }
    previousFocus.current?.focus();
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "[Guide copropriété] Nouvelle demande du site web",
          email: email.trim(),
          message: "Cette personne a demandé le guide technique de la gestion de copropriété sur le site web.",
          from_name: "Gestion Velora - Guide copropriété",
        }),
      });
      const result = await response.json() as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("Submission failed");
      trackGenerateLead({ topic: "condo_guide", inquiry: "syndic", submit_method: "api" });
      setStatus("success");
      try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch { /* The request was still received. */ }
    } catch { setStatus("error"); }
  }

  return (
    <dialog ref={dialog} aria-labelledby="guide-popup-title" onCancel={(event) => { event.preventDefault(); close(); }} className="guide-popup fixed m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto rounded-[1.25rem] bg-[#f6f3eb] p-0 text-[#20211e] shadow-2xl backdrop:bg-black/65">
      <div className="relative grid md:grid-cols-[1.15fr_0.85fr]">
        <button type="button" onClick={close} aria-label={isEn ? "Close" : "Fermer"} className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#20211e]/25 bg-[#f6f3eb] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
        <div className="px-7 py-10 sm:px-12 sm:py-14">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#a65b12]">{isEn ? "Free resource · In French" : "Ressource gratuite"}</p>
          <h2 id="guide-popup-title" className="guide-popup-title text-3xl leading-[1.08] tracking-tight sm:text-4xl">{isEn ? "A practical guide to condo management" : "Guide technique de la gestion de copropriété"}</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#55574f]">{isEn ? "A practical starting point for planning maintenance, major work and your reserve fund in Québec." : "Un point de départ pratique pour planifier l’entretien, les travaux majeurs et le fonds de prévoyance au Québec."}</p>
          {status === "success" ? (
            <div className="mt-7" role="status">
              <p className="mb-4 font-semibold">{isEn ? "Your guide is ready." : "Votre guide est prêt."}</p>
              <a href={GUIDE_URL} download className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#20211e] px-6 text-sm font-semibold text-white hover:bg-[#42443b]">{isEn ? "Download the guide (PDF)" : "Télécharger le guide (PDF)"}</a>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-7">
              <label htmlFor="condo-guide-email" className="mb-2 block text-sm font-semibold">{isEn ? "Email address" : "Adresse courriel"}</label>
              <input id="condo-guide-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={isEn ? "you@example.com" : "vous@exemple.com"} className="min-h-12 w-full rounded-md border border-[#92958a] bg-white px-4 text-base outline-offset-2 focus:outline focus:outline-2 focus:outline-[#20211e]" />
              <button disabled={status === "sending"} type="submit" className="mt-3 min-h-12 w-full rounded-full bg-[#20211e] px-6 text-sm font-semibold text-white hover:bg-[#42443b] disabled:opacity-60">{status === "sending" ? (isEn ? "Sending…" : "Envoi en cours…") : (isEn ? "Get the guide" : "Obtenir le guide")}</button>
              {status === "error" && <p role="alert" className="mt-3 text-sm text-[#9b2d1f]">{isEn ? "Something went wrong. Please try again." : "Une erreur est survenue. Veuillez réessayer."}</p>}
              <p className="mt-4 text-xs leading-relaxed text-[#55574f]">{isEn ? "We’ll use your email to process your request and may contact you about it. " : "Nous utiliserons votre courriel pour traiter votre demande et pourrions vous contacter à ce sujet. "}<a className="underline underline-offset-2" href={isEn ? "/en/privacy" : "/privacy"}>{isEn ? "Privacy policy" : "Politique de confidentialité"}</a>.</p>
            </form>
          )}
        </div>
        <div aria-hidden="true" className="hidden items-center justify-center bg-[#e8942f] p-10 md:flex">
          <div className="aspect-[0.72] w-full max-w-[260px] bg-[#f8f7f2] p-4 shadow-[10px_14px_0_rgba(32,33,30,0.16)]">
            <p className="mb-4 text-[9px] font-bold tracking-[0.14em]">GESTION VELORA</p>
            <img src="/guides/copropriete-montreal.jpg" alt="" className="aspect-[1.35] w-full object-cover" />
            <p className="mt-5 text-[9px] font-semibold uppercase tracking-widest text-[#a65b12]">Guide pratique · Québec</p>
            <p className="guide-popup-title mt-3 text-xl leading-tight">Guide technique de la gestion de copropriété</p>
            <p className="mt-5 text-[10px] leading-relaxed text-[#77796f]">Connaître. Planifier. Agir.</p>
          </div>
        </div>
      </div>
    </dialog>
  );
}
