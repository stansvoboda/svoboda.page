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
          technologies: ["React", "CSS"],
          featured: true,
          repo: "https://github.com/example/todo-app",
          thumbnail: "/projects/todo-app.svg",
        },
        {
          slug: "shop",
          milestone: "freelance",
          name: { en: "Shop", cs: "Obchod" },
          summary: { en: "Sells bread.", cs: "Prodává chleba." },
          technologies: ["TypeScript"],
          featured: false,
          demo: "https://shop.example.com",
          thumbnail: "/projects/shop.svg",
        },
      ],
    },
    ui: {
      toggleTheme: { en: "Toggle theme", cs: "Přepnout motiv" },
      switchLanguage: { en: "Čeština", cs: "English" },
      ongoing: { en: "present", cs: "dosud" },
    },
  }
}
