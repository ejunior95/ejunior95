/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CF_ACCOUNT_ID: string;
  readonly VITE_CF_API_TOKEN: string;
  readonly VITE_CF_SITE_TAG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
