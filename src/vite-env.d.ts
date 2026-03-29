/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MANAGER_URL?: string;
  readonly VITE_SERVICE_URL?: string;
  readonly VITE_SOFTWARE_SITE_URL?: string;
  /** Web3Forms access key (https://web3forms.com) for contact form POST */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
}
