import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPathWithoutLocale, addLocaleToPath } from "../i18n";

const SITE_URL = "https://www.gestionvelora.com";

export function HreflangLinks() {
  const { pathname } = useLocation();

  useEffect(() => {
    const pathWithoutLocale = getPathWithoutLocale(pathname);
    const frUrl = SITE_URL + (pathWithoutLocale === "/" ? "/" : pathWithoutLocale);
    const enPath = addLocaleToPath(pathWithoutLocale, "en");
    const enUrl = SITE_URL + (enPath === "/en" ? "/en/" : enPath);

    const removeExisting = () => {
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    };

    removeExisting();

    const fr = document.createElement("link");
    fr.rel = "alternate";
    fr.hreflang = "fr-CA";
    fr.href = frUrl;
    document.head.appendChild(fr);

    const en = document.createElement("link");
    en.rel = "alternate";
    en.hreflang = "en-CA";
    en.href = enUrl;
    document.head.appendChild(en);

    const xDefault = document.createElement("link");
    xDefault.rel = "alternate";
    xDefault.hreflang = "x-default";
    xDefault.href = frUrl;
    document.head.appendChild(xDefault);

    return removeExisting;
  }, [pathname]);

  return null;
}
