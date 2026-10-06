# TanStack Start on Cloudflare Workers

The site is built with TanStack Start (React + TypeScript on Vite) and deployed to Cloudflare Workers from GitHub. Pages are prerendered to static HTML so search engines and link previews (LinkedIn) see the content. The contact form needs a server anyway, and Start's server functions give us one in the same typed project on the same Worker. Cloudflare was chosen because the domain already lives there.

## Considered Options

- **Vite + React SPA**: simplest, but no server for the contact form and weaker SEO without extra prerender tooling.
- **Astro with React islands**: excellent static output, but the owner wants to present React itself.
- **Next.js**: heavier and less straightforward to host on Cloudflare for a mostly static site.
