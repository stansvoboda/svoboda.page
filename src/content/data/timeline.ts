import type { RawContent } from "../schema"
import { parkHriste } from "./projects/park-hriste"
import { codersLabPortfolio } from "./projects/coders-lab-portfolio"
import { svobodaPage } from "./projects/svoboda-page"

// The owner's path. Dates are years where only the year matters, months
// otherwise.
//
// To add a Project: copy a file in ./projects/, change it (the id of its
// Milestone, its technologies as ids of Skills from ./skills.ts, its Case
// Study), add it to `projects` below and put its thumbnail in
// public/projects/<slug>.svg.
export const timeline = {
  heading: { en: "My path", cs: "Moje cesta" },
  milestones: [
    {
      id: "surveying-school",
      kind: "course",
      title: {
        en: "Secondary school of surveying",
        cs: "Střední škola, obor geodézie",
      },
      organisation: "Střední průmyslová škola zeměměřická",
      description: {
        en: "Four years of studying surveying: measuring in the field, maps and geodetic calculations.",
        cs: "Čtyřleté studium geodézie: měření v terénu, mapy a geodetické výpočty.",
      },
      start: "2002",
      end: "2006",
    },
    {
      id: "geoservis",
      kind: "job",
      title: { en: "Surveyor", cs: "Geodet" },
      organisation: "Geoservis Praha s.r.o.",
      description: {
        en: "Surveying in the field and drawing maps and plans from the measurements.",
        cs: "Měření v terénu a zpracování map a plánů z naměřených dat.",
      },
      start: "2007",
      end: "2017",
    },
    {
      id: "self-employed-surveyor",
      kind: "job",
      title: { en: "Self-employed surveyor", cs: "Geodet na volné noze" },
      description: {
        en: "My own surveying business: surveying buildings, streets and bridges including 3D models, documenting sewers and water mains to the Prague water utility's (PVK) standard, setting out buildings and tram tracks, and surveying on motorway, bridge and tunnel construction.",
        cs: "Vlastní geodetická živnost: zaměřování budov, ulic a mostů včetně 3D modelů, dokumentace kanalizací a vodovodů podle směrnice PVK, vytyčování staveb a tramvajových tratí a měření při stavbě dálnic, mostů a tunelů.",
      },
      start: "2017",
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
      start: "2025-03",
      end: "2025-08",
    },
    {
      id: "ai-coding-course",
      kind: "course",
      title: {
        en: "AI Coding Crash Course workshop",
        cs: "Workshop AI Coding Crash Course",
      },
      organisation: "AI Hero",
      description: {
        en: "Planning, building and reviewing software together with AI agents.",
        cs: "Plánování, stavění a kontrola softwaru společně s AI agenty.",
      },
      start: "2026-09",
      end: "2026-09",
    },
  ],
  // In the order they appear under their Milestone.
  projects: [parkHriste, codersLabPortfolio, svobodaPage],
} satisfies RawContent["timeline"]
