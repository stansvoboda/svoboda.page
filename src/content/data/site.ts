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
    lookingFor: {
      en: "Looking for a full-time junior frontend job in Prague or remote.",
      cs: "Hledám práci junior frontend vývojáře na plný úvazek, v Praze nebo na dálku.",
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
      en: "Looking for a junior frontend developer? Write to me.",
      cs: "Hledáte junior frontend vývojáře? Napište mi.",
    },
    email: "standa@svoboda.page",
    linkedin: "https://www.linkedin.com/in/svoboda-stanislav",
    github: "https://github.com/stansvoboda",
  },
  featuredProjects: {
    heading: { en: "Featured projects", cs: "Vybrané projekty" },
  },
  aiWorkflow: {
    heading: { en: "How I work with AI", cs: "Jak pracuji s AI" },
    steps: [
      {
        title: { en: "Clarify", cs: "Ujasnit" },
        text: {
          en: "An AI agent grills me with questions until a rough idea becomes a clear spec.",
          cs: "AI agent mě zasypává otázkami, dokud se z hrubého nápadu nestane jasné zadání.",
        },
        evidence: {
          label: { en: "The spec of this site", cs: "Zadání tohoto webu" },
          url: "https://github.com/stansvoboda/svoboda.page/issues/1",
        },
      },
      {
        title: { en: "Split", cs: "Rozdělit" },
        text: {
          en: "The spec becomes small, labelled issues, each one a change that can ship on its own.",
          cs: "Zadání rozdělím na malé issues se štítky; každé je samostatná změna, kterou jde nasadit zvlášť.",
        },
        evidence: {
          label: { en: "The issue list", cs: "Seznam issues" },
          url: "https://github.com/stansvoboda/svoboda.page/issues?q=is%3Aissue",
        },
      },
      {
        title: { en: "Implement", cs: "Implementovat" },
        text: {
          en: "An agent builds each issue test-first, one pull request per change.",
          cs: "Agent naprogramuje každé issue metodou test-first, jeden pull request na každou změnu.",
        },
        evidence: {
          label: { en: "A pull request", cs: "Ukázkový pull request" },
          url: "https://github.com/stansvoboda/svoboda.page/pull/30",
        },
      },
      {
        title: { en: "Review", cs: "Zkontrolovat" },
        text: {
          en: "I review the code, fix what I don't like and keep the decisions in my hands.",
          cs: "Kód zkontroluji, opravím, co se mi nelíbí, a rozhodnutí si nechávám ve svých rukou.",
        },
        evidence: {
          label: {
            en: "A commit of review fixes",
            cs: "Commit s opravami po review",
          },
          url: "https://github.com/stansvoboda/svoboda.page/commit/96350b7d1ccfb4e85b82ebbcc08a72dd166c2699",
        },
      },
    ],
    limits: {
      en: "AI makes me faster, but it doesn't think for me: I understand every line before it ships.",
      cs: "AI mě zrychluje, ale nemyslí za mě: každému řádku rozumím dřív, než ho pustím ven.",
    },
  },
  timeline,
  skills,
  cv: {
    languages: [
      {
        name: { en: "Czech", cs: "Čeština" },
        level: { en: "Native", cs: "Rodilý jazyk" },
      },
      {
        name: { en: "English", cs: "Angličtina" },
        level: { en: "Pre-intermediate", cs: "Mírně pokročilý" },
      },
    ],
  },
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
    cv: {
      title: { en: "CV", cs: "CV" },
      open: { en: "View my CV", cs: "Zobrazit CV" },
      download: { en: "Download PDF", cs: "Stáhnout PDF" },
      backHome: { en: "Back to the home page", cs: "Zpět na úvodní stránku" },
      contact: { en: "Contact", cs: "Kontakt" },
      jobs: { en: "Experience", cs: "Praxe" },
      education: { en: "Education and courses", cs: "Vzdělání a kurzy" },
      languages: { en: "Languages", cs: "Jazyky" },
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
