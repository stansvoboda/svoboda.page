import type { RawProject } from "../../schema"

// Placeholder until the owner writes the real Case Study.
export const codersLabPortfolio = {
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
  screenshots: [],
  caseStudy: {
    context: {
      en: "Placeholder: what the portfolio was for and which problem it solved.",
      cs: "Zástupný text: k čemu portfolio sloužilo a jaký problém řešilo.",
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
