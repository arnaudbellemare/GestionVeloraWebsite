/** Google Analytics 4 measurement ID (must match gtag snippet in index.html). */
export const GA_MEASUREMENT_ID = "G-NMSB2ZT1EZ";

/** Canonical site origin (metadata, JSON-LD, Article author URL). */
export const SITE_URL = "https://www.gestionvelora.com";

export const ORGANIZATION_SCHEMA_ID = `${SITE_URL}/#organization` as const;

/** Matches Organization logo in index.html JSON-LD. */
export const PUBLISHER_LOGO_URL = `${SITE_URL}/logo.png?v=10` as const;

/** Article `author` in JSON-LD (Person). */
export const ARTICLE_AUTHOR_NAME = "Arnaud Bellemare";
export const ARTICLE_AUTHOR_URL = SITE_URL;

/** Brand entity URLs used in JSON-LD `sameAs`. */
export const ORGANIZATION_SAME_AS = [
  SITE_URL,
  `${SITE_URL}/en/`,
  "https://ca.linkedin.com/in/gestion-velora-48684b399",
  "https://www.registreentreprises.gouv.qc.ca/",
] as const;

export const ARTICLE_AUTHOR_SAME_AS = [
  "https://ca.linkedin.com/in/arnaud-bellemare-125934372",
  SITE_URL,
] as const;

/** Default social cards for pages without dedicated assets. */
export const DEFAULT_OG_IMAGE: string = `${SITE_URL}/og-image.png`;
export const DEFAULT_TWITTER_IMAGE: string = `${SITE_URL}/twitter-card.png`;

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

/**
 * https://web3forms.com - set `VITE_WEB3FORMS_ACCESS_KEY` for server-side email delivery; otherwise contact falls back to mailto.
 * In the Web3Forms dashboard, set the form’s destination inbox to info@gestionvelora.com so demo/communication requests land there.
 */
export const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() ?? "";

export const CONTACT_FORM_USE_API = WEB3FORMS_ACCESS_KEY.length > 0;
