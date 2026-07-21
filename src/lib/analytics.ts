type AnalyticsItem = {
  item_id: string;
  item_name: string;
  item_category: string;
  index?: number;
};

type DataLayerPayload = Record<string, unknown>;

let analyticsBooted = false;
let webVitalsBooted = false;

const GTM_ID = import.meta.env.VITE_GTM_ID?.trim();
const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim();

const AI_REFERRERS = [
  { host: "perplexity.ai", platform: "perplexity" },
  { host: "chatgpt.com", platform: "chatgpt" },
  { host: "gemini.google.com", platform: "gemini" },
  { host: "copilot.microsoft.com", platform: "copilot" },
  { host: "claude.ai", platform: "claude" },
] as const;

type WebVitalName = "FCP" | "LCP" | "CLS" | "INP" | "TTFB";

type WebVitalPayload = {
  name: WebVitalName;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  page_path: string;
};

type LayoutShiftEntry = PerformanceEntry & {
  value: number;
  hadRecentInput: boolean;
};

type LargestContentfulPaintEntry = PerformanceEntry & {
  renderTime: number;
  loadTime: number;
};

type PerformanceEventTimingEntry = PerformanceEntry & {
  duration: number;
  interactionId?: number;
};

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

export function initAnalytics() {
  if (typeof window === "undefined" || typeof document === "undefined" || analyticsBooted) return;
  analyticsBooted = true;
  ensureDataLayer();
  loadGoogleAnalytics();
  trackAIReferralVisit();
  initWebVitalsTracking();
}

export function trackPageView(pagePath: string, pageTitle = document.title) {
  if (typeof window === "undefined") return;
  ensureDataLayer().push({
    event: "page_view",
    page_path: pagePath,
    page_title: pageTitle,
  });
}

function pushDataLayer(payload: DataLayerPayload) {
  if (typeof window === "undefined") return;
  ensureDataLayer().push(payload);

  // GTM consumes object pushes directly. When only the direct GA4 fallback is
  // configured, mirror custom events through gtag so they reach GA4 as well.
  if (!GTM_ID && GA4_MEASUREMENT_ID && window.gtag && typeof payload.event === "string") {
    const { event, ...parameters } = payload;
    window.gtag("event", event, parameters);
  }
}

function loadGoogleAnalytics() {
  if (GTM_ID) {
    ensureDataLayer().push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
    script.dataset.analyticsLoader = "gtm";
    document.head.appendChild(script);
    return;
  }

  if (!GA4_MEASUREMENT_ID) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_MEASUREMENT_ID)}`;
  script.dataset.analyticsLoader = "ga4";
  document.head.appendChild(script);

  window.gtag = (...args: unknown[]) => ensureDataLayer().push(args);
  window.gtag("js", new Date());
  window.gtag("config", GA4_MEASUREMENT_ID, { send_page_view: false });
}

function trackAIReferralVisit() {
  if (!document.referrer) return;

  try {
    const referrer = new URL(document.referrer);
    if (referrer.origin === window.location.origin) return;
    const match = AI_REFERRERS.find(
      ({ host }) => referrer.hostname === host || referrer.hostname.endsWith(`.${host}`)
    );
    if (!match) return;

    pushDataLayer({
      event: "ai_referral_visit",
      ai_platform: match.platform,
      referral_host: referrer.hostname,
      landing_page: window.location.pathname + window.location.search,
    });
  } catch {
    // Ignore malformed or privacy-reduced referrers.
  }
}

function rateWebVital(name: WebVitalName, value: number): WebVitalPayload["rating"] {
  const thresholds: Record<WebVitalName, [number, number]> = {
    FCP: [1800, 3000],
    LCP: [2500, 4000],
    CLS: [0.1, 0.25],
    INP: [200, 500],
    TTFB: [800, 1800],
  };
  const [good, poor] = thresholds[name];
  if (value <= good) return "good";
  if (value <= poor) return "needs-improvement";
  return "poor";
}

function trackWebVital({ name, value, rating, page_path }: WebVitalPayload) {
  pushDataLayer({
    event: "web_vital",
    web_vital_name: name,
    web_vital_value: Math.round(value * 1000) / 1000,
    web_vital_rating: rating,
    page_path,
  });
}

function reportWebVital(name: WebVitalName, value: number) {
  trackWebVital({
    name,
    value,
    rating: rateWebVital(name, value),
    page_path: window.location.pathname + window.location.search,
  });
}

function observePerformanceEntries(
  type: string,
  callback: (entry: PerformanceEntry) => void,
  buffered = true
) {
  if (!("PerformanceObserver" in window)) return undefined;

  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(callback);
    });
    observer.observe({ type, buffered });
    return observer;
  } catch {
    return undefined;
  }
}

function initWebVitalsTracking() {
  if (webVitalsBooted || typeof window === "undefined" || typeof performance === "undefined") return;
  webVitalsBooted = true;

  const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  if (navigation?.responseStart) {
    reportWebVital("TTFB", navigation.responseStart);
  }

  let fcpReported = false;
  observePerformanceEntries("paint", (entry) => {
    if (entry.name !== "first-contentful-paint" || fcpReported) return;
    fcpReported = true;
    reportWebVital("FCP", entry.startTime);
  });

  let lcpValue = 0;
  const lcpObserver = observePerformanceEntries("largest-contentful-paint", (entry) => {
    const lcpEntry = entry as LargestContentfulPaintEntry;
    lcpValue = lcpEntry.renderTime || lcpEntry.loadTime || lcpEntry.startTime;
  });

  let clsValue = 0;
  observePerformanceEntries("layout-shift", (entry) => {
    const layoutShift = entry as LayoutShiftEntry;
    if (!layoutShift.hadRecentInput) clsValue += layoutShift.value;
  });

  let inpValue = 0;
  observePerformanceEntries("event", (entry) => {
    const eventEntry = entry as PerformanceEventTimingEntry;
    if (eventEntry.interactionId && eventEntry.duration > inpValue) {
      inpValue = eventEntry.duration;
    }
  });

  let finalMetricsSent = false;
  const sendFinalMetrics = () => {
    if (finalMetricsSent) return;
    finalMetricsSent = true;
    lcpObserver?.disconnect();
    if (lcpValue > 0) reportWebVital("LCP", lcpValue);
    reportWebVital("CLS", clsValue);
    if (inpValue > 0) reportWebVital("INP", inpValue);
  };

  window.addEventListener("pagehide", sendFinalMetrics, { once: true });
  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.visibilityState === "hidden") sendFinalMetrics();
    },
    { once: true }
  );
}

export function trackServiceListView(
  services: Array<{ slug: string; title: string }>,
  listName: string
) {
  const items: AnalyticsItem[] = services.map((service, index) => ({
    item_id: service.slug,
    item_name: service.title,
    item_category: "service",
    index: index + 1,
  }));

  pushDataLayer({
    event: "view_item_list",
    ecommerce: {
      item_list_name: listName,
      items,
    },
  });
}

export function trackServiceSelect(
  service: { slug: string; title: string },
  listName: string,
  index: number
) {
  pushDataLayer({
    event: "select_item",
    ecommerce: {
      item_list_name: listName,
      items: [
        {
          item_id: service.slug,
          item_name: service.title,
          item_category: "service",
          index: index + 1,
        },
      ],
    },
  });
}

export function trackBlogListView(
  posts: Array<{ slug: string; title: string }>,
  listName: string
) {
  const items: AnalyticsItem[] = posts.map((post, index) => ({
    item_id: post.slug,
    item_name: post.title,
    item_category: "blog_post",
    index: index + 1,
  }));

  pushDataLayer({
    event: "view_item_list",
    ecommerce: {
      item_list_name: listName,
      items,
    },
  });
}

export function trackBlogSelect(post: { slug: string; title: string }, listName: string, index: number) {
  pushDataLayer({
    event: "select_item",
    ecommerce: {
      item_list_name: listName,
      items: [
        {
          item_id: post.slug,
          item_name: post.title,
          item_category: "blog_post",
          index: index + 1,
        },
      ],
    },
  });
}

export function trackGenerateLead(data: {
  topic: string;
  inquiry: string;
  submit_method: "api" | "mailto";
}) {
  pushDataLayer({
    event: "generate_lead",
    lead_type: "contact_form",
    topic: data.topic,
    inquiry: data.inquiry || "unspecified",
    submit_method: data.submit_method,
  });
}

export function trackAiSearch(data: {
  search_query: string;
  provider?: "vertex_ai" | "other";
  source?: string;
}) {
  pushDataLayer({
    event: "ai_search",
    search_query: data.search_query,
    ai_provider: data.provider ?? "vertex_ai",
    source: data.source ?? "site_search",
  });
}

export function trackAiSearchResultClick(data: {
  search_query: string;
  result_url: string;
  result_position: number;
  provider?: "vertex_ai" | "other";
}) {
  pushDataLayer({
    event: "ai_search_result_click",
    search_query: data.search_query,
    result_url: data.result_url,
    result_position: data.result_position,
    ai_provider: data.provider ?? "vertex_ai",
  });
}

export function trackAiChatMessage(data: {
  message_length: number;
  provider?: "vertex_ai" | "other";
}) {
  pushDataLayer({
    event: "ai_chat_message",
    message_length: data.message_length,
    ai_provider: data.provider ?? "vertex_ai",
  });
}

export function trackAiResponseView(data: {
  search_query?: string;
  response_length?: number;
  provider?: "vertex_ai" | "other";
}) {
  pushDataLayer({
    event: "ai_response_view",
    search_query: data.search_query ?? "",
    ai_response_length: data.response_length ?? 0,
    ai_provider: data.provider ?? "vertex_ai",
  });
}
