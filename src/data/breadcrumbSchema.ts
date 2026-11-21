/**
 * Gives the last BreadcrumbList entry an `item` (the current page URL) when it
 * has none. Search Console reports a last ListItem with a name but no URL as an
 * "unnamed item". Builders across the site omit it for the current page, so the
 * fix is applied once where JSON-LD is serialized: scripts/prerender.ts for the
 * static HTML and SchemaOrg.tsx after hydration.
 *
 * Walks plain objects, arrays and `@graph` containers. Returns new objects and
 * never mutates its input. Must not import src/config.ts (prerender runs under
 * tsx, where import.meta.env is undefined): the caller passes the URL.
 */
export function withCurrentPageBreadcrumbItem<T>(schema: T, currentUrl: string): T {
  return complete(schema, currentUrl) as T;
}

function complete(node: unknown, currentUrl: string): unknown {
  if (Array.isArray(node)) return node.map((child) => complete(child, currentUrl));
  if (!node || typeof node !== "object") return node;

  const obj = node as Record<string, unknown>;
  const out: Record<string, unknown> = { ...obj };

  if (Array.isArray(obj["@graph"])) {
    out["@graph"] = (obj["@graph"] as unknown[]).map((child) => complete(child, currentUrl));
  }

  if (obj["@type"] === "BreadcrumbList" && Array.isArray(obj.itemListElement) && obj.itemListElement.length > 0) {
    const items = obj.itemListElement as Record<string, unknown>[];
    const last = items[items.length - 1];
    if (last && typeof last === "object" && !last.item) {
      out.itemListElement = [...items.slice(0, -1), { ...last, item: currentUrl }];
    }
  }

  return out;
}
