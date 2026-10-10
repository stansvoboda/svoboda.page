import type { RawContent } from "../schema"
import { timeline } from "./timeline"

// The site's own text. Pages never import this file; they get it assembled
// for one locale from the content module (`getContent`).
export const site = {
  meta: {
    title: {
      en: "Stanislav Svoboda · Frontend developer",
      cs: "Stanislav Svoboda · Frontend vývojář",
    },
  },
  intro: {
    name: "Stanislav Svoboda",
    positioning: {
      en: "Frontend developer (React, TypeScript) who works effectively with AI agents.",
      cs: "Frontend vývojář (React, TypeScript), který efektivně pracuje s AI agenty.",
    },
    contactCta: { en: "Contact me", cs: "Napište mi" },
  },
  about: {
    heading: { en: "About me", cs: "O mně" },
    text: {
      en: "I build web interfaces in React and TypeScript. I plan my work with AI agents, review what they write and keep the result simple, tested and readable. This site shows the path that got me here and the projects I built along the way.",
      cs: "Stavím webová rozhraní v Reactu a TypeScriptu. Práci plánuji s AI agenty, kontroluji, co napíšou, a výsledek držím jednoduchý, otestovaný a čitelný. Tento web ukazuje cestu, která mě sem dovedla, a projekty, které jsem po cestě postavil.",
    },
  },
  contact: {
    heading: { en: "Contact", cs: "Kontakt" },
    comingSoon: {
      en: "A contact form is on its way. Until then, find me on",
      cs: "Kontaktní formulář je na cestě. Do té doby mě najdete na",
    },
    githubLink: { en: "GitHub", cs: "GitHubu" },
  },
  timeline,
  ui: {
    toggleTheme: { en: "Toggle theme", cs: "Přepnout motiv" },
    switchLanguage: { en: "Čeština", cs: "English" },
    ongoing: { en: "present", cs: "dosud" },
  },
} satisfies RawContent
