import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { GA_MEASUREMENT_ID } from "../config";

/**
 * Sends GA4 page views on client-side navigations. Initial load is covered by gtag in index.html.
 */
export function GtagPageView() {
  const { pathname, search } = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const gtag = window.gtag;
    if (typeof gtag !== "function") return;

    const pagePath = pathname + search;
    gtag("config", GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: document.title,
    });
  }, [pathname, search]);

  return null;
}
