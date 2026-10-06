import { z } from "zod"

export const locales = ["en", "cs"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

const localeNames: Record<Locale, string> = { en: "English", cs: "Czech" }

function requiredText(locale: Locale) {
  const error = `missing ${localeNames[locale]} (${locale}) text`
  return z.string({ error }).trim().min(1, { error })
}

// A value the visitor reads. ADR 0002: every one exists in both languages.
const localized = z.strictObject({
  en: requiredText("en"),
  cs: requiredText("cs"),
})
export type Localized = z.infer<typeof localized>

export const contentSchema = z.strictObject({
  meta: z.strictObject({
    title: localized,
  }),
  intro: z.strictObject({
    name: z.string().trim().min(1),
    positioning: localized,
    contactCta: localized,
  }),
  about: z.strictObject({
    heading: localized,
    text: localized,
  }),
  // Placeholder until the contact form exists: "<comingSoon> <githubLink>."
  contact: z.strictObject({
    heading: localized,
    comingSoon: localized,
    githubLink: localized,
  }),
  // Strings of the site's own interface (buttons, labels), not the owner's
  // story. They follow the same both-languages rule.
  ui: z.strictObject({
    toggleTheme: localized,
    // Text of the link to the other language, written in that language.
    switchLanguage: localized,
  }),
})

export type RawContent = z.input<typeof contentSchema>
