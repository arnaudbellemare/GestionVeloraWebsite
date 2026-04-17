type AnalyticsItem = {
  item_id: string;
  item_name: string;
  item_category: string;
  index?: number;
};

type DataLayerPayload = Record<string, unknown>;

function pushDataLayer(payload: DataLayerPayload) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
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
