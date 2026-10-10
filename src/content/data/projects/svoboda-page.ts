import type { RawProject } from "../../schema"

// A first draft written from the repo's spec and ADRs; the owner may reword it.
export const svobodaPage = {
  slug: "svoboda-page",
  milestone: "ai-coding-course",
  name: { en: "svoboda.page", cs: "svoboda.page" },
  summary: {
    en: "This site: a bilingual presentation built test-first with AI agents.",
    cs: "Tento web: dvojjazyčná prezentace postavená s AI agenty a testy napřed.",
  },
  technologies: ["React", "TypeScript", "TanStack Start", "Tailwind CSS"],
  featured: true,
  demo: "https://svoboda.page",
  repo: "https://github.com/stansvoboda/svoboda.page",
  thumbnail: "/projects/placeholder.svg",
  screenshots: [],
  caseStudy: {
    context: {
      en: "Recruiters give a junior candidate only seconds, and a CV alone doesn't show how I think or how I work with AI agents. I wanted one place that tells my path from surveying to frontend and shows what I have built.",
      cs: "Recruiteři věnují juniorovi jen pár vteřin a samotné CV neukáže, jak přemýšlím ani jak pracuji s AI agenty. Chtěl jsem jedno místo, které popíše mou cestu od geodézie k frontendu a ukáže, co jsem postavil.",
    },
    role: {
      en: "Everything, from the spec to the deployment: React, TypeScript, TanStack Start, Tailwind CSS with shadcn/ui, Zod and Vitest, hosted on Cloudflare Workers.",
      cs: "Všechno od zadání po nasazení: React, TypeScript, TanStack Start, Tailwind CSS se shadcn/ui, Zod a Vitest, hostované na Cloudflare Workers.",
    },
    decisions: {
      en: "All content lives as typed files in the repo, checked by a schema, so there is no CMS to maintain. Every page is prerendered to static HTML in both languages. The build fails when a text is missing in one language, so a half-translated site can't ship.",
      cs: "Veškerý obsah je v repozitáři jako typované soubory kontrolované schématem, takže není potřeba spravovat žádný CMS. Každá stránka se předem vygeneruje do statického HTML v obou jazycích. Když v jednom jazyce chybí text, build selže, takže napůl přeložený web nemůže vyjít.",
    },
    challenge: {
      en: "Project cards linked to Case Study pages before those pages existed, which broke the prerender. I excluded those links from prerendering until the pages were built, with a TODO pointing at the ticket that removes the exclusion.",
      cs: "Karty projektů odkazovaly na stránky případových studií dřív, než stránky existovaly, a to rozbilo předgenerování. Tyto odkazy jsem z předgenerování dočasně vyřadil s poznámkou TODO odkazující na úkol, který výjimku odstraní.",
    },
    result: {
      en: "A fast, bilingual site where adding a Project means adding one file. CI checks types, lint, tests and the full build on every push.",
      cs: "Rychlý dvojjazyčný web, kde přidání projektu znamená přidat jeden soubor. CI při každém pushi kontroluje typy, lint, testy i celý build.",
    },
    ai: {
      en: "I planned the site with an AI agent: it questioned my plan, then we wrote a spec, split it into tickets and recorded decisions as ADRs. Agents implemented the tickets test-first, and I reviewed every change before merging.",
      cs: "Web jsem plánoval s AI agentem: nejdřív můj plán podrobil otázkám, pak jsme sepsali zadání, rozdělili ho na úkoly a rozhodnutí zapsali jako ADR. Agenti úkoly implementovali s testy napřed a já každou změnu před sloučením zkontroloval.",
    },
    differently: {
      en: "I would gather the real content earlier, so the design could be shaped around it instead of placeholders.",
      cs: "Skutečný obsah bych sbíral dřív, aby se design mohl přizpůsobit jemu, a ne zástupným textům.",
    },
  },
} satisfies RawProject
