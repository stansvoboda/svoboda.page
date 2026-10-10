import type { RawContent } from "../schema"
import { skills } from "./skills"
import { timeline } from "./timeline"

// The site's own text. Pages never import this file; they get it assembled
// for one locale from the content module (`getContent`).
export const site = {
  meta: {
    title: {
      en: "Stanislav Svoboda · Frontend developer",
      cs: "Stanislav Svoboda · Frontend vývojář",
    },
    description: {
      en: "Junior frontend developer (React, TypeScript) who works effectively with AI agents. From land surveying to code: my path, my projects and how I build them.",
      cs: "Junior frontend vývojář (React, TypeScript), který efektivně pracuje s AI agenty. Od geodézie ke kódu: moje cesta, moje projekty a jak je stavím.",
    },
    url: "https://svoboda.page",
    image: {
      src: "/og.png",
      alt: {
        en: "Stanislav Svoboda, frontend developer: React, TypeScript, AI agents",
        cs: "Stanislav Svoboda, frontend vývojář: React, TypeScript, AI agenti",
      },
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
    text: {
      en: "Looking for a junior frontend developer, or want to talk about a project? Write to me.",
      cs: "Hledáte junior frontend vývojáře, nebo chcete probrat projekt? Napište mi.",
    },
    email: "standa@svoboda.page",
    linkedin: "https://www.linkedin.com/in/svoboda-stanislav",
    github: "https://github.com/stansvoboda",
  },
  timeline,
  skills,
  ui: {
    toggleTheme: { en: "Toggle theme", cs: "Přepnout motiv" },
    switchLanguage: { en: "Čeština", cs: "English" },
    ongoing: { en: "present", cs: "dosud" },
    skills: {
      projects: { en: "Projects", cs: "Projekty" },
      noProjects: {
        en: "Not in a Project yet",
        cs: "Zatím v žádném projektu",
      },
    },
    caseStudy: {
      context: { en: "Context and problem", cs: "Kontext a problém" },
      role: { en: "My role and stack", cs: "Moje role a technologie" },
      decisions: { en: "Key decisions", cs: "Klíčová rozhodnutí" },
      challenge: {
        en: "A problem I hit and how I solved it",
        cs: "Problém, na který jsem narazil, a jak jsem ho vyřešil",
      },
      result: { en: "Result", cs: "Výsledek" },
      ai: { en: "How I used AI", cs: "Jak jsem využil AI" },
      differently: {
        en: "What I'd do differently",
        cs: "Co bych příště udělal jinak",
      },
      screenshots: { en: "Screenshots", cs: "Snímky obrazovky" },
      demo: { en: "Live demo", cs: "Živá ukázka" },
      repo: { en: "Code on GitHub", cs: "Kód na GitHubu" },
      partOf: { en: "Part of", cs: "Součást" },
      backToTimeline: { en: "Back to my path", cs: "Zpět na moji cestu" },
    },
    contactForm: {
      name: { en: "Name", cs: "Jméno" },
      email: { en: "Email", cs: "E-mail" },
      message: { en: "Message", cs: "Zpráva" },
      send: { en: "Send message", cs: "Odeslat zprávu" },
      sending: { en: "Sending…", cs: "Odesílám…" },
      errors: {
        required: { en: "Please fill this in.", cs: "Vyplňte prosím." },
        invalidEmail: {
          en: "Please enter a valid email address.",
          cs: "Zadejte prosím platnou e-mailovou adresu.",
        },
        tooLong: { en: "This is too long.", cs: "Text je příliš dlouhý." },
      },
      verifying: {
        en: "One moment, the spam check is still running. Then send again.",
        cs: "Moment, ještě probíhá kontrola proti spamu. Pak odešlete znovu.",
      },
      sent: {
        en: "Thank you, your message is on its way. I'll get back to you soon.",
        cs: "Děkuji, zpráva je na cestě. Brzy se vám ozvu.",
      },
      spam: {
        en: "The spam check didn't pass. Please try sending again.",
        cs: "Kontrola proti spamu neprošla. Zkuste zprávu odeslat znovu.",
      },
      failed: {
        en: "Sorry, the message couldn't be sent.",
        cs: "Omlouvám se, zprávu se nepodařilo odeslat.",
      },
      fallback: {
        en: "You can reach me directly:",
        cs: "Můžete mě kontaktovat přímo:",
      },
    },
    notFound: {
      title: { en: "Page not found", cs: "Stránka nenalezena" },
      text: {
        en: "There is nothing at this address. It may have moved, or the link has a typo.",
        cs: "Na této adrese nic není. Možná se přesunula, nebo je v odkazu překlep.",
      },
      backHome: { en: "Go to the home page", cs: "Přejít na úvodní stránku" },
    },
  },
} satisfies RawContent
