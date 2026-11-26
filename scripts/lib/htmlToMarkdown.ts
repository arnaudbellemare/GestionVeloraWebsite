/**
 * Converts the prerendered <main> HTML (scripts/prerender.ts) to Markdown for
 * the per-page .md copies that AI agents can fetch. The input is our own
 * generated markup, so a small tag-by-tag conversion is enough: headings,
 * paragraphs, lists, definition lists (FAQs), tables, links and emphasis.
 * Images are dropped (figure captions kept); relative links become absolute.
 */

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

function decode(text: string): string {
  return text.replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (m) => ENTITIES[m] ?? m);
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}

function inline(html: string, siteUrl: string): string {
  return html
    .replace(/<a\s[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_m, href: string, text: string) => {
      const label = stripTags(text).trim();
      const url = decode(href);
      const abs = url.startsWith("/") ? `${siteUrl}${url}` : url;
      return label ? `[${label}](${abs})` : "";
    })
    .replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, "**$2**")
    .replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, "*$2*")
    .replace(/<br\s*\/?>/gi, "\n");
}

function cell(html: string, siteUrl: string): string {
  return decode(stripTags(inline(html, siteUrl))).replace(/\s+/g, " ").replace(/\|/g, "\\|").trim();
}

function table(html: string, siteUrl: string): string {
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) =>
    [...r[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((c) => cell(c[1], siteUrl)),
  );
  if (!rows.length) return "";
  const width = Math.max(...rows.map((r) => r.length));
  const pad = (r: string[]) => [...r, ...Array(width - r.length).fill("")];
  const caption = html.match(/<caption[^>]*>([\s\S]*?)<\/caption>/i);
  const lines = [
    `| ${pad(rows[0]).join(" | ")} |`,
    `| ${Array(width).fill("---").join(" | ")} |`,
    ...rows.slice(1).map((r) => `| ${pad(r).join(" | ")} |`),
  ];
  return `\n\n${caption ? `${cell(caption[1], siteUrl)}\n\n` : ""}${lines.join("\n")}\n\n`;
}

function nextNonEmpty(lines: string[], from: number): string {
  for (let i = from + 1; i < lines.length; i++) if (lines[i] !== "") return lines[i];
  return "";
}

export function htmlToMarkdown(html: string, siteUrl: string): string {
  // Tables first (data studies wrap them in <figure>), then keep figure captions
  // as text and drop only the images.
  let md = html
    .replace(/<(script|style|noscript)[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<table[^>]*>[\s\S]*?<\/table>/gi, (t) => table(t, siteUrl))
    .replace(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/gi, "<p><strong>$1</strong></p>")
    .replace(/<\/?figure[^>]*>/gi, "")
    .replace(/<img[^>]*>/gi, "");

  md = inline(md, siteUrl)
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_m, t: string) => `\n\n# ${stripTags(t).trim()}\n\n`)
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_m, t: string) => `\n\n## ${stripTags(t).trim()}\n\n`)
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_m, t: string) => `\n\n### ${stripTags(t).trim()}\n\n`)
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_m, t: string) => `\n- ${stripTags(t).replace(/\s+/g, " ").trim()}`)
    .replace(/<dt[^>]*>([\s\S]*?)<\/dt>/gi, (_m, t: string) => `\n\n**${stripTags(t).trim()}**\n`)
    .replace(/<dd[^>]*>([\s\S]*?)<\/dd>/gi, (_m, t: string) => `\n${stripTags(t).trim()}\n`)
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_m, t: string) => `\n\n${stripTags(t).replace(/[ \t]+/g, " ").trim()}\n\n`)
    .replace(/<\/(ul|ol|dl)>/gi, "\n\n");

  const lines = decode(stripTags(md))
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""));
  // Keep list items together: drop blank lines that sit between two "- " items.
  const tight = lines.filter((line, i) => !(line === "" && /^- /.test(lines[i - 1] ?? "") && /^- /.test(nextNonEmpty(lines, i))));
  return tight.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
