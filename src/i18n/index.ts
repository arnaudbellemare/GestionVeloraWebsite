import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { fr } from "./fr";
import { en } from "./en";

export type Locale = "fr" | "en";

export const SUPPORTED_LOCALES: Locale[] = ["fr", "en"];
export const DEFAULT_LOCALE: Locale = "fr";
export const EN_PREFIX = "/en";

export function isEnPath(pathname: string): boolean {
  return pathname === EN_PREFIX || pathname.startsWith(EN_PREFIX + "/");
}

export function getLocaleFromPath(pathname: string): Locale {
  return isEnPath(pathname) ? "en" : "fr";
}

export function getPathWithoutLocale(pathname: string): string {
  if (pathname.startsWith(EN_PREFIX + "/")) {
    return pathname.slice(EN_PREFIX.length) || "/";
  }
  if (pathname === EN_PREFIX) return "/";
  return pathname;
}

export function addLocaleToPath(path: string, locale: Locale): string {
  if (locale === "fr") return path;
  const base = path === "/" ? "" : path;
  return `${EN_PREFIX}${base}`;
}

export function removeLocaleFromPath(path: string): string {
  return getPathWithoutLocale(path);
}

const resources = {
  fr: { translation: fr },
  en: { translation: en },
};

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
