import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://www.gestionvelora.com";

function canonicalPathFor(pathname: string): string {
  if (pathname === "/") return "/";
  if (pathname === "/en" || pathname === "/en/") return "/en/";
  return pathname;
}

export function CanonicalUrl() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = SITE_URL + canonicalPathFor(pathname);

    let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!el) {
      el = document.createElement("link");
      el.rel = "canonical";
      document.head.appendChild(el);
    }
    el.href = path;
  }, [pathname]);

  return null;
}
