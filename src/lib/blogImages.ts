/**
 * Blog cover helpers. Kept dependency-free (no `../config` import) so the
 * Node-based prerender step can import blog data without pulling in
 * `import.meta.env`, which is undefined outside Vite.
 */
const SITE_ORIGIN = "https://www.gestionvelora.com";

export const BLOG_IMAGE_DIR = "/images/blog";

/** Card and in-app cover path (same-origin, works in dev and production). */
export function blogCoverPath(filename: string): string {
  const name = filename.startsWith("/") ? filename.replace(/^\/images\/blog\//, "") : filename;
  return `${BLOG_IMAGE_DIR}/${name}`;
}

/** Absolute URL for Open Graph, Twitter, and JSON-LD. */
export function blogCoverUrl(pathOrFilename: string): string {
  if (pathOrFilename.startsWith("http://") || pathOrFilename.startsWith("https://")) {
    return pathOrFilename;
  }
  const path = pathOrFilename.startsWith("/") ? pathOrFilename : blogCoverPath(pathOrFilename);
  return `${SITE_ORIGIN}${path}`;
}
