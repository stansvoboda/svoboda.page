import { resolve } from "node:path"
import { cloudflare } from "@cloudflare/vite-plugin"
import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, runnerImport } from "vite"
import type { Plugin } from "vite"

type ContentModule = {
  locales: readonly string[]
  getContent: (locale: string) => unknown
}

// Fails the build up front when a translation is missing (ADR 0002), with the
// content module's message naming the field. Without it the build still
// fails, but only as an opaque error from prerendering the broken page.
function validateContent(): Plugin {
  return {
    name: "validate-content",
    apply: "build",
    async buildStart() {
      const { module } = await runnerImport<ContentModule>(
        "./src/content/index.ts"
      )
      for (const locale of module.locales) {
        module.getContent(locale)
      }
    },
  }
}

// https://tanstack.com/start/latest/docs/framework/react/guide/hosting
export default defineConfig({
  plugins: [
    validateContent(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart({
      // "/" only redirects to "/en", so the Worker serves it instead of a
      // prerendered copy of the English page.
      pages: [
        { path: "/", prerender: { enabled: false } },
        { path: "/en" },
        { path: "/cs" },
      ],
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        // Write en.html rather than en/index.html, so Cloudflare serves /en
        // as is instead of redirecting it to /en/.
        autoSubfolderIndex: false,
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
})
