/**
 * Portal URLs for ManagerSyndicat and ServiceSyndicat.
 * In production, set via VITE_MANAGER_URL and VITE_SERVICE_URL.
 */
export const PORTAL_URLS = {
  manager: import.meta.env.VITE_MANAGER_URL ?? (import.meta.env.PROD ? "https://nestreva.com" : "http://localhost:5175"),
  service: import.meta.env.VITE_SERVICE_URL ?? (import.meta.env.PROD ? "https://nestreva.com" : "http://localhost:5173"),
} as const;

/**
 * Software marketing site (ManagerSyndicat + ServiceSyndicat).
 * Set VITE_SOFTWARE_SITE_URL in production.
 */
export const SOFTWARE_SITE_URL =
  import.meta.env.VITE_SOFTWARE_SITE_URL ?? "http://localhost:5181";
