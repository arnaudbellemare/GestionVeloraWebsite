import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../context/LocaleContext";
import {
  getCalculatorPage,
  REFERENCE_PATHS,
  type PlexLocale,
} from "../data/plex-calculator";
import "../components/plex/plex-calculator.css";

// The analyzer pulls in the whole engine; keep it out of the initial bundle so
// it never affects any other route's load.
const DealAnalyzer = lazy(() =>
  import("../components/plex/DealAnalyzer").then((m) => ({ default: m.DealAnalyzer })),
);

export default function PlexCalculatorPage() {
  const { locale, localePath } = useLocale();
  const l = (locale === "en" ? "en" : "fr") as PlexLocale;
  const page = getCalculatorPage(l);

  return (
    <main className="mx-auto w-full max-w-[1180px] px-5 pb-24 pt-28 sm:px-8">
      <header className="mb-10 max-w-3xl">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500">
          {l === "fr" ? "Outil gratuit · Québec" : "Free tool · Quebec"}
        </p>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
          {page.intro}
        </p>
        {/*
          A short factual summary in plain prose, ahead of the interactive tool.
          Answer engines lift text, not widgets: this is the paragraph most
          likely to be quoted, so it states the scope and the hard numbers.
        */}
        <p className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm leading-relaxed text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
          {page.summary}
        </p>
      </header>

      {/* ── The tool ── */}
      {/*
        The analyzer's card titles are h3. Without an h2 above them the outline
        jumps h1 → h3, which breaks heading order for screen readers and muddies
        the document structure answer engines parse. Visually hidden because the
        h1 already names the page.
      */}
      <h2 id="outil" className="sr-only">
        {l === "fr" ? "L'outil de calcul" : "The calculator"}
      </h2>
      <Suspense
        fallback={
          <div className="py-24 text-center text-sm text-neutral-500">
            {l === "fr" ? "Chargement du calculateur…" : "Loading the calculator…"}
          </div>
        }
      >
        <DealAnalyzer locale={l} />
      </Suspense>

      {/* ── Explanatory content ── */}
      <div className="mx-auto mt-20 max-w-3xl">
        {page.sections.map((section) => (
          <section key={section.id} className="mb-12">
            {/* id on the heading so answer engines can cite this section directly */}
            <h2 id={section.id} className="mb-4 text-2xl font-semibold tracking-tight">
              {section.heading}
            </h2>
            {section.body.map((p, i) => (
              <p key={i} className="mb-3 leading-relaxed text-neutral-600 dark:text-neutral-300">
                {p}
              </p>
            ))}
          </section>
        ))}

        <section className="mb-12">
          <h2 id="faq" className="mb-6 text-2xl font-semibold tracking-tight">
            {l === "fr" ? "Questions fréquentes" : "Frequently asked questions"}
          </h2>
          {page.faq.map((entry) => (
            <div key={entry.id} className="mb-7 border-b border-neutral-200 pb-6 last:border-0 dark:border-neutral-800">
              <h3 id={entry.id} className="mb-2 text-lg font-medium">
                {entry.q}
              </h3>
              <p className="leading-relaxed text-neutral-600 dark:text-neutral-300">{entry.a}</p>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <h2 id="reference" className="mb-3 text-2xl font-semibold tracking-tight">
            {l === "fr" ? "Sources et barèmes détaillés" : "Sources and full schedules"}
          </h2>
          <p className="mb-4 leading-relaxed text-neutral-600 dark:text-neutral-300">
            {l === "fr"
              ? "Chaque règle utilisée par le calculateur est publiée avec sa source dans le guide de l'acheteur."
              : "Every rule the calculator applies is published with its source in the buyer's guide."}
          </p>
          <Link
            to={l === "fr" ? REFERENCE_PATHS.fr : REFERENCE_PATHS.en}
            className="inline-block rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium transition hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            {l === "fr" ? "Voir le guide et les chiffres 2026" : "See the guide and 2026 figures"}
          </Link>
        </section>

        <aside className="rounded-xl border border-neutral-200 bg-neutral-50 p-7 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 id="cta" className="mb-3 text-xl font-semibold tracking-tight">
            {page.ctaHeading}
          </h2>
          <p className="mb-5 leading-relaxed text-neutral-600 dark:text-neutral-300">
            {page.ctaBody}
          </p>
          <Link
            to={localePath("/#contact")}
            className="inline-block rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-900"
          >
            {page.ctaButton}
          </Link>
        </aside>
      </div>
    </main>
  );
}
