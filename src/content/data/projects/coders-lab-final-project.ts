import type { RawProject } from "../../schema"

// Placeholder until the owner writes the real Case Study.
export const codersLabFinalProject = {
  slug: "coders-lab-final-project",
  milestone: "coders-lab",
  name: { en: "Final project", cs: "Závěrečný projekt" },
  summary: {
    en: "Placeholder for the course's final project.",
    cs: "Zástupný text pro závěrečný projekt kurzu.",
  },
  technologies: ["react", "javascript", "scss"],
  featured: false,
  thumbnail: "/projects/placeholder.svg",
  screenshots: [],
  caseStudy: {
    context: {
      en: "Placeholder: what the final project was for and which problem it solved.",
      cs: "Zástupný text: k čemu závěrečný projekt sloužil a jaký problém řešil.",
    },
    role: {
      en: "Placeholder: what I did myself and which technologies I used.",
      cs: "Zástupný text: co jsem dělal sám a jaké technologie jsem použil.",
    },
    decisions: {
      en: "Placeholder: the main choices I made and why.",
      cs: "Zástupný text: hlavní rozhodnutí, která jsem udělal, a proč.",
    },
    challenge: {
      en: "Placeholder: a problem I ran into and how I got past it.",
      cs: "Zástupný text: problém, na který jsem narazil, a jak jsem ho překonal.",
    },
    result: {
      en: "Placeholder: what came out of it.",
      cs: "Zástupný text: co z toho vzešlo.",
    },
    ai: {
      en: "Placeholder: whether and how I used AI.",
      cs: "Zástupný text: zda a jak jsem využil AI.",
    },
    differently: {
      en: "Placeholder: what I would change today.",
      cs: "Zástupný text: co bych dnes udělal jinak.",
    },
  },
} satisfies RawProject
