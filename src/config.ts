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

/** https://web3forms.com — set `VITE_WEB3FORMS_ACCESS_KEY` for server-side email delivery; otherwise contact falls back to mailto. */
export const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() ?? "";

export const CONTACT_FORM_USE_API = WEB3FORMS_ACCESS_KEY.length > 0;
