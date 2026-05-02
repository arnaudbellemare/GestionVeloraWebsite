import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { CITIES, LOCATION_SERVICES } from "../src/data/locations.js";

type Locale = "fr" | "en";

interface Intent {
  key: string;
  weight: number;
  keywordFr: string;
  keywordEn: string;
  source: "laucandrique" | "solutioncondo" | "both";
}

interface CityPriority {
  slug: string;
  weight: number;
}

const CITY_WEIGHTS: CityPriority[] = [
  { slug: "montreal", weight: 10 },
  { slug: "laval", weight: 9 },
  { slug: "longueuil", weight: 9 },
  { slug: "brossard", weight: 8 },
  { slug: "terrebonne", weight: 7 },
  { slug: "repentigny", weight: 7 },
  { slug: "boucherville", weight: 7 },
  { slug: "saint-lambert", weight: 7 },
  { slug: "saint-bruno-de-montarville", weight: 7 },
  { slug: "sainte-julie", weight: 6 },
  { slug: "blainville", weight: 6 },
  { slug: "mirabel", weight: 6 },
  { slug: "boisbriand", weight: 6 },
  { slug: "saint-eustache", weight: 6 },
  { slug: "westmount", weight: 6 },
  { slug: "saint-laurent", weight: 6 },
  { slug: "plateau-mont-royal", weight: 6 },
  { slug: "ville-marie", weight: 6 },
  { slug: "verdun", weight: 5 },
  { slug: "lasalle", weight: 5 },
];

const SERVICE_WEIGHTS: Record<string, number> = {
  "syndicat-copropriete": 10,
  "gestion-locative": 9,
  "gestion-airbnb": 8,
  "gestion-immobiliere-commerciale": 6,
};

const INTENTS_BY_SERVICE: Record<string, Intent[]> = {
  "syndicat-copropriete": [
    {
      key: "gestion-complete",
      weight: 10,
      keywordFr: "gestion copropriete complete {city}",
      keywordEn: "full condo management {city}",
      source: "solutioncondo",
    },
    {
      key: "petites-coproprietes",
      weight: 8,
      keywordFr: "gestion petites coproprietes {city}",
      keywordEn: "small condo association management {city}",
      source: "both",
    },
    {
      key: "loi-16-141",
      weight: 9,
      keywordFr: "gestion copropriete loi 16 loi 141 {city}",
      keywordEn: "condo law 16 141 compliance management {city}",
      source: "both",
    },
    {
      key: "urgence-24-7",
      weight: 8,
      keywordFr: "urgence copropriete 24-7 {city}",
      keywordEn: "24-7 condo emergency support {city}",
      source: "laucandrique",
    },
  ],
  "gestion-locative": [
    {
      key: "gestion-locative-complete",
      weight: 9,
      keywordFr: "gestion locative complete {city}",
      keywordEn: "full rental property management {city}",
      source: "solutioncondo",
    },
    {
      key: "programme-harmonie-style",
      weight: 7,
      keywordFr: "programme gestion locative {city}",
      keywordEn: "rental management program {city}",
      source: "solutioncondo",
    },
    {
      key: "transparence-logiciel",
      weight: 6,
      keywordFr: "gestion locative transparente logiciel {city}",
      keywordEn: "transparent rental management software {city}",
      source: "solutioncondo",
    },
  ],
  "gestion-airbnb": [
    {
      key: "location-courte-duree",
      weight: 8,
      keywordFr: "gestion location courte duree {city}",
      keywordEn: "short-term rental management {city}",
      source: "both",
    },
    {
      key: "conformite-reglementaire",
      weight: 8,
      keywordFr: "conformite location courte duree {city}",
      keywordEn: "short-term rental compliance {city}",
      source: "both",
    },
    {
      key: "optimisation-revenus",
      weight: 7,
      keywordFr: "optimisation revenus airbnb {city}",
      keywordEn: "airbnb revenue optimization {city}",
      source: "solutioncondo",
    },
  ],
  "gestion-immobiliere-commerciale": [
    {
      key: "gestion-commerciale-proactive",
      weight: 6,
      keywordFr: "gestion immobiliere commerciale proactive {city}",
      keywordEn: "proactive commercial property management {city}",
      source: "laucandrique",
    },
    {
      key: "gestion-baux-rendement",
      weight: 6,
      keywordFr: "gestion baux commerciaux rendement {city}",
      keywordEn: "commercial lease and yield management {city}",
      source: "both",
    },
  ],
};

function fill(template: string, city: string): string {
  return template.replaceAll("{city}", city);
}

function cityWeight(slug: string): number {
  return CITY_WEIGHTS.find((c) => c.slug === slug)?.weight ?? 4;
}

function bestIntentForService(serviceSlug: string): Intent {
  const intents = INTENTS_BY_SERVICE[serviceSlug] ?? [];
  return intents.slice().sort((a, b) => b.weight - a.weight)[0];
}

function routeFor(locale: Locale, serviceSlug: string, citySlug: string): string {
  const base = `/location/${serviceSlug}-${citySlug}`;
  return locale === "fr" ? base : `/en${base}`;
}

interface Row {
  route: string;
  city: string;
  service: string;
  locale: Locale;
  score: number;
  primaryKeyword: string;
  secondaryKeywords: string[];
  source: Intent["source"];
}

function buildRows(locale: Locale): Row[] {
  const rows: Row[] = [];
  for (const service of LOCATION_SERVICES) {
    const intent = bestIntentForService(service.slug);
    for (const city of CITIES) {
      const score = cityWeight(city.slug) * 10 + (SERVICE_WEIGHTS[service.slug] ?? 5) * 10 + intent.weight * 5;
      const cityName = locale === "fr" ? city.nameFr : city.nameEn;
      const primaryKeyword = fill(locale === "fr" ? intent.keywordFr : intent.keywordEn, cityName);
      const secondaryKeywords = [
        fill(locale === "fr" ? service.keywordFr : service.keywordEn, cityName),
        fill(
          locale === "fr" ? "gestion immobiliere transparente {city}" : "transparent property management {city}",
          cityName
        ),
      ];
      rows.push({
        route: routeFor(locale, service.slug, city.slug),
        city: cityName,
        service: locale === "fr" ? service.nameFr : service.nameEn,
        locale,
        score,
        primaryKeyword,
        secondaryKeywords,
        source: intent.source,
      });
    }
  }
  return rows;
}

function buildKeywordMatrixMarkdown(): string {
  const lines: string[] = [];
  lines.push("# Competitor Keyword Matrix (FR/EN)");
  lines.push("");
  lines.push("Sources used: `laucandrique.ca` and `solutioncondo.com` service/sitemap patterns.");
  lines.push("");

  for (const service of LOCATION_SERVICES) {
    lines.push(`## ${service.nameFr} (${service.slug})`);
    lines.push("");
    lines.push("| Intent | Source | FR keyword pattern | EN keyword pattern |");
    lines.push("|---|---|---|---|");
    for (const intent of INTENTS_BY_SERVICE[service.slug] ?? []) {
      lines.push(`| ${intent.key} | ${intent.source} | \`${intent.keywordFr}\` | \`${intent.keywordEn}\` |`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function buildTop100Markdown(): string {
  const rows = [...buildRows("fr"), ...buildRows("en")].sort((a, b) => b.score - a.score).slice(0, 100);
  const lines: string[] = [];
  lines.push("# SEO Priority Top 100 Pages");
  lines.push("");
  lines.push(`Generated from ${CITIES.length} cities x ${LOCATION_SERVICES.length} services x 2 locales.`);
  lines.push("");
  lines.push("| # | Route | Locale | Service | City | Score | Primary keyword | Secondary keywords | Source |");
  lines.push("|---|---|---|---|---|---:|---|---|---|");

  rows.forEach((row, index) => {
    lines.push(
      `| ${index + 1} | \`${row.route}\` | ${row.locale} | ${row.service} | ${row.city} | ${row.score} | ${row.primaryKeyword} | ${row.secondaryKeywords.join("; ")} | ${row.source} |`
    );
  });
  lines.push("");
  return lines.join("\n");
}

function main() {
  const root = process.cwd();
  const matrixPath = join(root, "claudedocs", "competitor-keyword-matrix.md");
  const top100Path = join(root, "claudedocs", "seo-priority-top100.md");

  writeFileSync(matrixPath, buildKeywordMatrixMarkdown(), "utf-8");
  writeFileSync(top100Path, buildTop100Markdown(), "utf-8");

  console.log(`Wrote ${matrixPath}`);
  console.log(`Wrote ${top100Path}`);
}

main();
