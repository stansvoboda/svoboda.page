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

## Adding shadcn/ui components

```bash
npx shadcn@latest add <component>
```
