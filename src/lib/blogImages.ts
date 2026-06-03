import { SITE_URL } from "../config";

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
  return `${SITE_URL}${path}`;
}
