import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://www.gestionvelora.com";

export function CanonicalUrl() {
  const location = useLocation();

  useEffect(() => {
    const path = SITE_URL + (location.pathname === "/" ? "/" : location.pathname);

    let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!el) {
      el = document.createElement("link");
      el.rel = "canonical";
      document.head.appendChild(el);
    }
    el.href = path;
  }, [location.pathname]);

  return null;
}
