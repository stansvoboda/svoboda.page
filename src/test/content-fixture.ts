// Raw content in both locales, for tests that need a known-good starting
// point. Deliberately different from the real site text.
export function validContent() {
  return {
    meta: {
      title: { en: "Jane Doe · Developer", cs: "Jane Doe · Vývojářka" },
    },
    intro: {
      name: "Jane Doe",
      positioning: { en: "Builds things.", cs: "Staví věci." },
      contactCta: { en: "Contact me", cs: "Napište mi" },
    },
    about: {
      heading: { en: "About", cs: "O mně" },
      text: { en: "I like code.", cs: "Mám ráda kód." },
    },
    contact: {
      heading: { en: "Contact", cs: "Kontakt" },
      comingSoon: { en: "Soon. Meanwhile see", cs: "Brzy. Zatím viz" },
      githubLink: { en: "GitHub", cs: "GitHub" },
    },
    // Milestones are listed out of order on purpose: assembly sorts them.
    timeline: {
      heading: { en: "My path", cs: "Moje cesta" },
      milestones: [
        {
          id: "bootcamp",
          kind: "course" as const,
          title: { en: "Frontend course", cs: "Frontendový kurz" },
          organisation: "Code School",
          description: { en: "Learned React.", cs: "Naučila jsem se React." },
          start: "2023-09",
          end: "2024-02",
        },
        {
          id: "freelance",
          kind: "job" as const,
          title: { en: "Freelancer", cs: "Na volné noze" },
          description: { en: "Built websites.", cs: "Stavěla jsem weby." },
          start: "2024-03",
        },
        {
          id: "bakery",
          kind: "job" as const,
          title: { en: "Baker", cs: "Pekařka" },
          organisation: "Corner Bakery",
          description: { en: "Baked bread.", cs: "Pekla jsem chleba." },
          start: "2015-01",
          end: "2023-08",
        },
      ],
      projects: [
        {
          slug: "todo-app",
          milestone: "bootcamp",
          name: { en: "Todo app", cs: "Úkolníček" },
          summary: { en: "Keeps tasks.", cs: "Drží úkoly." },
          technologies: ["react", "css"],
          featured: true,
          repo: "https://github.com/example/todo-app",
          thumbnail: "/projects/todo-app.svg",
          screenshots: [
            {
              src: "/projects/todo-app-list.png",
              alt: { en: "The task list", cs: "Seznam úkolů" },
            },
          ],
          caseStudy: {
            context: { en: "I forgot tasks.", cs: "Zapomínala jsem úkoly." },
            role: { en: "Everything, in React.", cs: "Všechno, v Reactu." },
            decisions: { en: "Kept it local.", cs: "Jen lokálně." },
            challenge: {
              en: "Lost data on reload; saved it.",
              cs: "Po obnovení zmizela data; ukládám je.",
            },
            result: { en: "I use it daily.", cs: "Používám ho denně." },
            ai: { en: "AI wrote the tests.", cs: "AI psala testy." },
            differently: { en: "Add sync.", cs: "Přidat synchronizaci." },
          },
        },
        {
          slug: "shop",
          milestone: "freelance",
          name: { en: "Shop", cs: "Obchod" },
          summary: { en: "Sells bread.", cs: "Prodává chleba." },
          technologies: ["typescript", "react"],
          featured: false,
          demo: "https://shop.example.com",
          thumbnail: "/projects/shop.svg",
          screenshots: [],
          caseStudy: {
            context: { en: "Bread sold out.", cs: "Chleba došel." },
            role: { en: "Sole developer.", cs: "Jediná vývojářka." },
            decisions: { en: "Static pages.", cs: "Statické stránky." },
            challenge: {
              en: "Slow images; resized.",
              cs: "Pomalé obrázky; zmenšila jsem je.",
            },
            result: {
              en: "Orders doubled.",
              cs: "Objednávky se zdvojnásobily.",
            },
            ai: { en: "No AI.", cs: "Bez AI." },
            differently: { en: "Start sooner.", cs: "Začít dřív." },
          },
        },
      ],
    },
    // Skills are listed out of level order on purpose: assembly groups them.
    skills: {
      heading: { en: "Skills", cs: "Dovednosti" },
      levels: {
        daily: { en: "Use daily", cs: "Používám denně" },
        experienced: { en: "Have experience with", cs: "Mám zkušenost" },
        learning: { en: "Learning", cs: "Učím se" },
      },
      items: [
        { id: "css", name: "CSS", level: "experienced" as const },
        { id: "react", name: "React", level: "daily" as const },
        { id: "rust", name: "Rust", level: "learning" as const },
        { id: "typescript", name: "TypeScript", level: "daily" as const },
      ],
    },
    ui: {
      toggleTheme: { en: "Toggle theme", cs: "Přepnout motiv" },
      switchLanguage: { en: "Čeština", cs: "English" },
      ongoing: { en: "present", cs: "dosud" },
      skills: {
        projects: { en: "Projects", cs: "Projekty" },
        noProjects: { en: "No Project yet", cs: "Zatím bez projektu" },
      },
      caseStudy: {
        context: { en: "Context", cs: "Kontext" },
        role: { en: "Role", cs: "Role" },
        decisions: { en: "Decisions", cs: "Rozhodnutí" },
        challenge: { en: "Challenge", cs: "Výzva" },
        result: { en: "Result", cs: "Výsledek" },
        ai: { en: "AI", cs: "AI" },
        differently: { en: "Next time", cs: "Příště" },
        screenshots: { en: "Screenshots", cs: "Snímky" },
        demo: { en: "Demo", cs: "Ukázka" },
        repo: { en: "Code", cs: "Kód" },
        partOf: { en: "Part of", cs: "Součást" },
        backToTimeline: { en: "Back to my path", cs: "Zpět na cestu" },
      },
      notFound: {
        title: { en: "Not found", cs: "Nenalezeno" },
        text: { en: "Nothing here.", cs: "Nic tu není." },
        backHome: { en: "Home", cs: "Domů" },
      },
    },
  }
}
