# svoboda.page

Personal presentation site of Stanislav Svoboda, a junior frontend developer
(React, TypeScript) who works with AI agents. It tells his path from land
surveying to code as a Timeline of Milestones, with a Case Study page for every
Project he built, a Skills section backed by those Projects, and a contact form.
Everything is in English and Czech.

Live at [svoboda.page](https://svoboda.page).

## Stack

- [TanStack Start](https://tanstack.com/start): React and TypeScript on Vite,
  with file-based routes in [`src/routes`](src/routes). Every page is
  prerendered to static HTML at build time, in both languages.
- [Cloudflare Workers](https://developers.cloudflare.com/workers/): serves the
  prerendered pages and runs the contact form's server function.
- [Tailwind CSS](https://tailwindcss.com) with
  [shadcn/ui](https://ui.shadcn.com) components.
- [Zod](https://zod.dev) validates all content at build time;
  [TanStack Form](https://tanstack.com/form) runs the contact form with the same
  Zod schema the server checks.
- [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) keeps spam
  out of the contact form without puzzles, and Cloudflare Email Routing delivers
  the messages.
- [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/)
  counts visits without cookies, so there is no cookie banner.
- [Vitest](https://vitest.dev) and Testing Library for tests.

## Design docs

- [`GLOSSARY.md`](GLOSSARY.md): the words this project uses (Project, Case
  Study, Milestone, Timeline, Skill…) and what they mean. Code and content use
  the same words.
- [`docs/adr`](docs/adr): the architecture decisions and why they were made:
  - [0001 TanStack Start on Cloudflare Workers](docs/adr/0001-tanstack-start-on-cloudflare.md)
  - [0002 Content in the repo, both languages required](docs/adr/0002-content-in-repo-both-languages-required.md)

## How to run locally

You need Node.js 24.

```bash
npm install
npm run dev        # start the dev server; open the URL it prints
```

For the contact form to work in `npm run dev`, copy `.dev.vars.example` to
`.dev.vars`. It holds Cloudflare's public Turnstile test secret; sent emails
aren't delivered, Wrangler prints them to the terminal instead.

Other commands:

```bash
npm test           # run the Vitest tests once
npm run typecheck  # check types
npm run lint       # run ESLint
npm run build      # production build, prerenders pages to static HTML
npm run preview    # serve the production build in a local Cloudflare Worker
```

CI runs typecheck, lint, test and build on every push and pull request.

## Editing content

All site text lives in [`src/content/data`](src/content/data), with every
value in both English (`en`) and Czech (`cs`). Pages never read these files
directly; they get the text through the content module (`@/content`), which
validates it and assembles it for one language.

The validation catches mistakes before they ship. `npm test` and `npm run build`
fail with a message naming the field when:

- a text is missing in one language,
- a Project points to a Milestone that doesn't exist,
- two Projects share a slug,
- a Project lists a technology that isn't a defined Skill,
- more than three Projects are Featured.

Run `npm test` after every content change.

### Add a Milestone

A Milestone is a dated chapter of the path: a job, a course or a learning
period.

1. Open [`src/content/data/timeline.ts`](src/content/data/timeline.ts).
2. Add an entry to `milestones`:

   ```ts
   {
     id: "acme",                 // a unique id; Projects refer to it
     kind: "job",                // "job", "course" or "learning"
     title: { en: "Junior frontend developer", cs: "Junior frontend vývojář" },
     organisation: "Acme",       // optional
     description: { en: "…", cs: "…" },
     start: "2026-11",           // YYYY-MM
     // end: "2027-06",          // leave out while it is ongoing
   },
   ```

   The order doesn't matter: the Timeline sorts Milestones by date.

### Add a Project and its Case Study

1. Copy a file in
   [`src/content/data/projects`](src/content/data/projects), for example
   `svoboda-page.ts`, to `src/content/data/projects/<slug>.ts`. The slug is
   lowercase words joined by dashes, like `weather-app`; it becomes the Case
   Study's address, `/en/projects/weather-app`.
2. Rename the exported constant (`weatherApp`) and fill in:
   - `slug`: the same slug as the file name.
   - `milestone`: the `id` of the Milestone the Project was made during.
   - `name` and `summary`: the name and one sentence, in both languages. The
     summary is also the page's description in search results and link
     previews.
   - `technologies`: ids of Skills from
     [`src/content/data/skills.ts`](src/content/data/skills.ts). To list a
     technology that isn't there yet, add it as a Skill first.
   - `featured`: `true` for at most three Projects.
   - `demo` and `repo`: links to the live demo and the GitHub repository. Leave
     out the one the Project doesn't have.
   - `thumbnail`: put an image in `public/projects/` and write its path, like
     `/projects/weather-app.png`.
   - `screenshots`: images in `public/projects/`, each with an `alt` text in
     both languages, or `[]`.
   - `caseStudy`: the story in both languages, one text per section: `context`
     (the problem), `role` (your role and stack), `decisions`, `challenge` (a
     problem you hit and how you solved it), `result`, `ai` (how you used AI)
     and `differently` (what you'd do differently). For a small Project a
     section can be one sentence, but every section is required.
3. In [`src/content/data/timeline.ts`](src/content/data/timeline.ts), import
   the constant and add it to `projects`. Projects show under their Milestone
   in the order of this list.
4. Run `npm test`, then `npm run dev` and open the Case Study.

An AI agent can draft steps 1–3 from your notes: give it the notes and point it
to this section.

### Add a Skill

Add it to `items` in
[`src/content/data/skills.ts`](src/content/data/skills.ts) with a new `id`, its
`name` and a `level`: `"daily"`, `"experienced"` or `"learning"`. The Skills
section finds the Projects that use it from their `technologies`.

## Search engines and link previews

Every page has its own title, description, canonical address, links to the
same page in the other language (`hreflang`), and Open Graph and Twitter card
tags for link previews, built in
[`src/lib/page-head.ts`](src/lib/page-head.ts). The home page's text and the
site's address are under `meta` in
[`src/content/data/site.ts`](src/content/data/site.ts); a Case Study uses its
Project's name and summary.

To check a preview, paste a page's address into LinkedIn's
[Post Inspector](https://www.linkedin.com/post-inspector/).

### Link preview image

Every page shares one preview image, [`public/og.png`](public/og.png)
(1200 × 630). LinkedIn doesn't show SVG, so it is a PNG rendered from
[`scripts/og-image.svg`](scripts/og-image.svg). After editing the SVG, render
it again:

```bash
npx sharp-cli@5.1.0 -i scripts/og-image.svg -o public/og.png
```

## Deployment

Cloudflare Workers Builds deploys every push to `master` to
`https://svoboda.page` and gives every pull request a preview URL. Its build
command runs the same checks as CI before building, so a push that fails
typecheck, lint or tests never deploys:

```bash
npm run typecheck && npm run lint && npm test && npm run build
```

The one-time Cloudflare setup (Worker, domain, Email Routing, Turnstile, Web
Analytics) is a step-by-step wizard, in Czech:

```bash
./scripts/setup-cloudflare.sh
```

Secrets (`TURNSTILE_SECRET_KEY`, `CONTACT_TO`) live only on the Worker, set by
the wizard through `wrangler secret put`. The public Turnstile site key and the
public Web Analytics token are in `.env.production`. The analytics script is
only added to production builds, so visits during development aren't counted.

## Adding shadcn/ui components

```bash
npx shadcn@latest add <component>
```
