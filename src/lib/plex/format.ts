/**
 * Locale-aware formatters for the plex calculator.
 *
 * French Quebec writes currency as "877 500 $": trailing symbol, space as the
 * group separator: where English Canada writes "$877,500". Getting that wrong
 * is immediately obvious to a Montreal reader, so every figure goes through a
 * formatter bound to the page locale rather than a hardcoded one.
 */

export type PlexFormatLocale = "fr" | "en";

const INTL_LOCALE: Record<PlexFormatLocale, string> = {
  fr: "fr-CA",
  en: "en-CA",
};

export interface PlexFormatters {
  currency: (v: number) => string;
  currencyDetailed: (v: number) => string;
  percent: (v: number) => string;
  percent2: (v: number) => string;
  number: (v: number, decimals?: number) => string;
  multiple: (v: number) => string;
  /** Accounting style: negatives in parentheses, as a statement reads. */
  accounting: (v: number) => string;
  sqft: (v: number) => string;
}

export function makeFormatters(locale: PlexFormatLocale): PlexFormatters {
  const l = INTL_LOCALE[locale];
  const areaUnit = locale === "fr" ? "pi²" : "ft²";

  const currency = (v: number) =>
    new Intl.NumberFormat(l, {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(v);

  const number = (v: number, decimals = 0) =>
    new Intl.NumberFormat(l, { maximumFractionDigits: decimals }).format(v);

  return {
    currency,
    number,
    currencyDetailed: (v) =>
      new Intl.NumberFormat(l, {
        style: "currency",
        currency: "CAD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(v),
    percent: (v) =>
      new Intl.NumberFormat(l, {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(v),
    percent2: (v) =>
      new Intl.NumberFormat(l, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(v),
    multiple: (v) => (isFinite(v) ? `${number(v, 2)}×` : "∞"),
    accounting: (v) => (v < 0 ? `(${currency(Math.abs(v))})` : currency(v)),
    sqft: (v) => `${number(v)} ${areaUnit}`,
  };
}
