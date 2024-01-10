interface ImportMetaEnv {
  readonly VITE_BACKEND_API_ADDRESS: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
