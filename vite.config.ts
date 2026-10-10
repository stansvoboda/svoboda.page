import { resolve } from "node:path"
import { cloudflare } from "@cloudflare/vite-plugin"
import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, runnerImport } from "vite"

type ContentModule = {
  locales: readonly string[]
  getContent: (locale: string) => unknown
  listCaseStudySlugs: (content: unknown) => string[]
}

// Validates the content in every locale and returns the Case Study page of
// every Project, for prerendering. Validating here fails the build up front
// when a translation is missing (ADR 0002), with the content module's
// message naming the field, instead of an opaque error from prerendering the
// broken page.
async function validateContentAndListCaseStudyPages() {
  const { module } = await runnerImport<ContentModule>("./src/content/index.ts")
  return module.locales.flatMap((locale) =>
    module
      .listCaseStudySlugs(module.getContent(locale))
      .map((slug) => ({ path: `/${locale}/projects/${slug}` }))
  )
}

// https://tanstack.com/start/latest/docs/framework/react/guide/hosting
export default defineConfig(async ({ command }) => ({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart({
      // "/" only redirects to "/en", so the Worker serves it instead of a
      // prerendered copy of the English page.
      pages: [
        { path: "/", prerender: { enabled: false } },
        { path: "/en" },
        { path: "/cs" },
        // Only the build prerenders; dev renders pages on request.
        ...(command === "build"
          ? await validateContentAndListCaseStudyPages()
          : []),
      ],
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        // Write en.html rather than en/index.html, so Cloudflare serves /en
        // as is instead of redirecting it to /en/.
        autoSubfolderIndex: false,
        // A link to a section, like /en#timeline, is a page already crawled.
        filter: ({ path }) => !path.includes("#"),
      },
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
    },
  },
}))
