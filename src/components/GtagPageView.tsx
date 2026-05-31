import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageView } from "../lib/analytics";

/**
 * Loads analytics after first paint/idle, then sends GA4 page views on client-side navigations.
 */
export function GtagPageView() {
  const { pathname, search } = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const pagePath = pathname + search;
    trackPageView(pagePath);
  }, [pathname, search]);

  return null;
}
