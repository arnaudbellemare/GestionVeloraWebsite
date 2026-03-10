import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  getLocaleFromPath,
  addLocaleToPath,
  removeLocaleFromPath,
  type Locale,
} from "../i18n";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  localePath: (path: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const locale = useMemo(() => getLocaleFromPath(pathname), [pathname]);

  useEffect(() => {
    i18n.changeLanguage(locale);
    document.documentElement.lang = locale === "en" ? "en-CA" : "fr-CA";
  }, [locale, i18n]);

  const setLocale = useCallback(
    (newLocale: Locale) => {
      const pathWithoutLocale = removeLocaleFromPath(pathname);
      const newPath = addLocaleToPath(pathWithoutLocale, newLocale);
      navigate(newPath);
    },
    [pathname, navigate]
  );

  const localePath = useCallback(
    (path: string) => addLocaleToPath(path, locale),
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, localePath }),
    [locale, setLocale, localePath]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
