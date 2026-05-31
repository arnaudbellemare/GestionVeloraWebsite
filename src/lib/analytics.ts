import { GA_MEASUREMENT_ID, GTM_CONTAINER_ID } from "../config";

type AnalyticsItem = {
  item_id: string;
  item_name: string;
  item_category: string;
  index?: number;
};

type DataLayerPayload = Record<string, unknown>;

let analyticsBooted = false;
let analyticsLoaded = false;

const INTERACTION_EVENTS = ["pointerdown", "keydown", "touchstart", "scroll"] as const;

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

function ensureGtag() {
  if (typeof window.gtag === "function") return window.gtag;
  window.gtag = (...args: unknown[]) => {
    ensureDataLayer().push(args);
  };
  return window.gtag;
}

function appendScript(src: string) {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export function initAnalytics() {
  if (typeof window === "undefined" || typeof document === "undefined" || analyticsBooted) return;
  analyticsBooted = true;

  ensureDataLayer();
  ensureGtag();

  let idleId: number | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let loadListenerAttached = false;

  const cleanup = () => {
    if (idleId !== undefined && "cancelIdleCallback" in window) {
      window.cancelIdleCallback(idleId);
    }
    if (timeoutId !== undefined) clearTimeout(timeoutId);
    if (loadListenerAttached) window.removeEventListener("load", scheduleLoad);
    INTERACTION_EVENTS.forEach((eventName) => {
      window.removeEventListener(eventName, loadAnalytics);
    });
  };

  const loadAnalytics = () => {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    cleanup();

    const dataLayer = ensureDataLayer();
    dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });
    appendScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`);
    appendScript(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`);

    const gtag = ensureGtag();
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);
  };

  function scheduleLoad() {
    loadListenerAttached = false;
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(loadAnalytics, { timeout: 4200 });
    } else {
      timeoutId = setTimeout(loadAnalytics, 2400);
    }
  }

  INTERACTION_EVENTS.forEach((eventName) => {
    window.addEventListener(eventName, loadAnalytics, { once: true, passive: true });
  });

  if (document.readyState === "complete") {
    scheduleLoad();
  } else {
    loadListenerAttached = true;
    window.addEventListener("load", scheduleLoad, { once: true });
  }
}

export function trackPageView(pagePath: string, pageTitle = document.title) {
  if (typeof window === "undefined") return;
  ensureGtag()("config", GA_MEASUREMENT_ID, {
    page_path: pagePath,
    page_title: pageTitle,
  });
}

function pushDataLayer(payload: DataLayerPayload) {
  if (typeof window === "undefined") return;
  ensureDataLayer().push(payload);
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
