import type { RawContent } from "../schema"
import { codersLabFinalProject } from "./projects/coders-lab-final-project"
import { codersLabPortfolio } from "./projects/coders-lab-portfolio"
import { svobodaPage } from "./projects/svoboda-page"

// The owner's path. Dates are placeholders until the owner confirms them, and
// the Projects are placeholders except this site itself.
//
// To add a Project: copy a file in ./projects/, change it (the id of its
// Milestone, its technologies as ids of Skills from ./skills.ts, its Case
// Study), add it to `projects` below and put its thumbnail in
// public/projects/<slug>.svg.
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
  // In the order they appear under their Milestone.
  projects: [codersLabFinalProject, codersLabPortfolio, svobodaPage],
} satisfies RawContent["timeline"]
