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
    ui: {
      toggleTheme: { en: "Toggle theme", cs: "Přepnout motiv" },
      switchLanguage: { en: "Čeština", cs: "English" },
    },
  }
}
