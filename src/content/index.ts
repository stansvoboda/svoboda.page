import { site } from "./data/site"
import { contentSchema, defaultLocale, locales } from "./schema"
import type { Locale, Localized } from "./schema"

export { defaultLocale, locales }
export type { Locale, RawContent } from "./schema"

// Turns every { en, cs } pair into the plain string for one locale.
type InLocale<T> = T extends Localized
  ? string
  : T extends object
    ? { [K in keyof T]: InLocale<T[K]> }
    : T

export type Content = InLocale<ReturnType<typeof contentSchema.parse>>

export class ContentError extends Error {
  override name = "ContentError"
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

function isLocalized(value: object): value is Localized {
  const keys = Object.keys(value)
  return keys.length === locales.length && locales.every((l) => l in value)
}

function pickLocale(value: unknown, locale: Locale): unknown {
  if (typeof value !== "object" || value === null) {
    return value
  }
  if (isLocalized(value)) {
    return value[locale]
  }
  return Object.fromEntries(
    Object.entries(value).map(([key, inner]) => [
      key,
      pickLocale(inner, locale),
    ])
  )
}

// Validates raw content (both languages at once, so a missing translation
// fails no matter which page is being built) and returns it in one locale.
export function assembleContent(raw: unknown, locale: Locale): Content {
  const result = contentSchema.safeParse(raw)
  if (!result.success) {
    const problems = result.error.issues.map(
      (issue) => `  - ${issue.path.join(".")}: ${issue.message}`
    )
    throw new ContentError(`Content is invalid:\n${problems.join("\n")}`)
  }
  return pickLocale(result.data, locale) as Content
}

// The real content in the repo, in one locale. Throws ContentError if any
// translation is missing, which fails the prerender and so the build.
export function getContent(locale: Locale): Content {
  return assembleContent(site, locale)
}
