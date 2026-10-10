import type { RawContent } from "../schema"

// The owner's path. Dates are placeholders until the owner confirms them, and
// the Projects are placeholders except this site itself.
//
// To add a Project: append it to `projects` with the id of its Milestone and
// put its thumbnail in public/projects/<slug>.svg.
export const timeline = {
  heading: { en: "My path", cs: "Moje cesta" },
  milestones: [
    {
      id: "geoservis",
      kind: "job",
      title: { en: "Surveyor", cs: "Geodet" },
      organisation: "Geoservis Praha",
      description: {
        en: "Surveying in the field and drawing maps and plans from the measurements.",
        cs: "Měření v terénu a zpracování map a plánů z naměřených dat.",
      },
      start: "2012-09",
      end: "2018-12",
    },
    {
      id: "self-employed-surveyor",
      kind: "job",
      title: { en: "Self-employed surveyor", cs: "Geodet na volné noze" },
      description: {
        en: "Running my own surveying business: clients, measurements and deliverables end to end.",
        cs: "Vlastní geodetická živnost: klienti, měření i výstupy od začátku do konce.",
      },
      start: "2019-01",
      end: "2024-08",
    },
    {
      id: "coders-lab",
      kind: "course",
      title: { en: "Frontend developer course", cs: "Kurz frontend vývojáře" },
      organisation: "Coders Lab",
      description: {
        en: "An intensive course in HTML, CSS, JavaScript and React, finished with a final project.",
        cs: "Intenzivní kurz HTML, CSS, JavaScriptu a Reactu zakončený závěrečným projektem.",
      },
      start: "2024-09",
      end: "2025-03",
    },
    {
      id: "ai-coding-course",
      kind: "course",
      title: {
        en: "AI coding crash course",
        cs: "Rychlokurz programování s AI",
      },
      organisation: "Matt Pocock",
      description: {
        en: "Planning, building and reviewing software together with AI agents.",
        cs: "Plánování, stavění a kontrola softwaru společně s AI agenty.",
      },
      start: "2026-09",
    },
  ],
  projects: [
    {
      slug: "coders-lab-final-project",
      milestone: "coders-lab",
      name: { en: "Final project", cs: "Závěrečný projekt" },
      summary: {
        en: "Placeholder for the course's final project.",
        cs: "Zástupný text pro závěrečný projekt kurzu.",
      },
      technologies: ["React", "JavaScript", "SCSS"],
      featured: false,
      thumbnail: "/projects/placeholder.svg",
    },
    {
      slug: "coders-lab-portfolio",
      milestone: "coders-lab",
      name: { en: "First portfolio", cs: "První portfolio" },
      summary: {
        en: "Placeholder for a static portfolio page from the course.",
        cs: "Zástupný text pro statickou stránku portfolia z kurzu.",
      },
      technologies: ["HTML", "CSS"],
      featured: false,
      thumbnail: "/projects/placeholder.svg",
    },
    {
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
    },
  ],
} satisfies RawContent["timeline"]
