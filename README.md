# svoboda.page

Personal presentation site of Stanislav Svoboda. Built with TanStack Start
(React + TypeScript on Vite) and deployed to Cloudflare Workers; see
[`docs/adr`](docs/adr) for why.

## How to run locally

You need Node.js 24.

```bash
npm install
npm run dev        # start the dev server; open the URL it prints
```

Other commands:

```bash
npm test           # run the Vitest tests once
npm run typecheck  # check types
npm run lint       # run ESLint
npm run build      # production build, prerenders pages to static HTML
npm run preview    # serve the production build in a local Cloudflare Worker
```

CI runs typecheck, lint, test and build on every push and pull request.

## Deployment

Cloudflare Workers Builds deploys every push to `master` to
`https://svoboda.page` and gives every pull request a preview URL. The
one-time Cloudflare setup (Worker, domain, Email Routing, Turnstile, Web
Analytics) is a step-by-step wizard, in Czech:

```bash
./scripts/setup-cloudflare.sh
```

Secrets (`TURNSTILE_SECRET_KEY`, `CONTACT_TO`) live only on the Worker, set by
the wizard through `wrangler secret put`. The public Turnstile site key is in
`.env.production`.

## Adding shadcn/ui components

```bash
npx shadcn@latest add <component>
```

## Editing content

All site text lives in [`src/content/data`](src/content/data), with every
value in both English (`en`) and Czech (`cs`). Pages get it through the content
module (`@/content`), which validates it. A missing translation fails
`npm test` and `npm run build` with a message naming the field.
