// Values Vite puts into the client bundle at build time. Only VITE_ ones,
// so they must be public: never put a secret here.
interface ImportMetaEnv {
  // Public by design; .env.production for builds, .env.development for dev.
  readonly VITE_TURNSTILE_SITE_KEY: string
  // Cloudflare Web Analytics; set only in .env.production, so development
  // visits aren't counted.
  readonly VITE_CF_WEB_ANALYTICS_TOKEN?: string
}
