/// <reference types="vite/client" />
/// <reference types="@webgpu/types" />

interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}

interface ImportMetaEnv {
  readonly VITE_MANAGER_URL?: string;
  readonly VITE_SERVICE_URL?: string;
  readonly VITE_SOFTWARE_SITE_URL?: string;
  /** Web3Forms access key (https://web3forms.com) for contact form POST */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  /** Google Tag Manager container ID, for example GTM-XXXXXXX. */
  readonly VITE_GTM_ID?: string;
  /** Optional direct GA4 fallback when GTM is not configured, for example G-XXXXXXXXXX. */
  readonly VITE_GA4_MEASUREMENT_ID?: string;
}
