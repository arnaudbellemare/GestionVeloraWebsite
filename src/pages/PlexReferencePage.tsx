import { Link } from "react-router-dom";
import { useLocale } from "../context/LocaleContext";
import {
  REFERENCE_PAGE,
  REFERENCE_FIGURES,
  CALCULATOR_PATHS,
  type PlexLocale,
} from "../data/plex-calculator";

/**
 * The citable companion to the calculator.
 *
 * An answer engine cannot run an interactive tool, but it can quote a sourced
 * figure. This page states each rule as plain text with its primary source and
 * an anchored heading, which is what gets lifted into AI answers and featured
 * snippets.
 */
export default function PlexReferencePage() {
  const { locale } = useLocale();
  const l = (locale === "en" ? "en" : "fr") as PlexLocale;
  const page = REFERENCE_PAGE[l];

  return (
    <main className="mx-auto w-full max-w-3xl px-5 pb-24 pt-28 sm:px-8">
      <header className="mb-12">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500">
          {l === "fr" ? "Référence · Québec 2026" : "Reference · Quebec 2026"}
        </p>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
          {page.intro}
        </p>
      </header>

      <section className="mb-14">
        <h2 id="chiffres" className="mb-2 text-2xl font-semibold tracking-tight">
          {page.figuresHeading}
        </h2>
        <p className="mb-8 text-sm text-neutral-500">{page.figuresNote}</p>

        <dl>
          {REFERENCE_FIGURES.map((fig) => (
            <div
              key={fig.id}
              className="mb-8 border-b border-neutral-200 pb-7 last:border-0 dark:border-neutral-800"
            >
              {/* Anchored so each figure can be cited on its own */}
              <dt id={fig.id} className="mb-2 text-lg font-medium">
                {fig.label[l]}
              </dt>
              <dd className="leading-relaxed text-neutral-700 dark:text-neutral-300">
                {fig.value[l]}
                <span className="mt-2 block text-sm text-neutral-500">
                  {l === "fr" ? "Source : " : "Source: "}
                  <a
                    href={fig.sourceUrl}
                    target="_blank"
                    rel="noopener"
                    className="underline underline-offset-2 hover:text-neutral-900 dark:hover:text-white"
                  >
                    {fig.source}
                  </a>
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <aside className="rounded-xl border border-neutral-200 bg-neutral-50 p-7 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 id="calculateur" className="mb-3 text-xl font-semibold tracking-tight">
          {l === "fr"
            ? "Appliquer ces chiffres à un immeuble précis"
            : "Apply these figures to a specific building"}
        </h2>
        <p className="mb-5 leading-relaxed text-neutral-600 dark:text-neutral-300">
          {l === "fr"
            ? "Le calculateur applique automatiquement l'ensemble de ces règles selon le secteur et le type d'immeuble que vous analysez."
            : "The calculator applies all of these rules automatically, based on the area and property type you are analysing."}
        </p>
        <Link
          to={l === "fr" ? CALCULATOR_PATHS.fr : CALCULATOR_PATHS.en}
          className="inline-block rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-900"
        >
          {l === "fr" ? "Ouvrir le calculateur" : "Open the calculator"}
        </Link>
      </aside>
    </main>
  );
}
