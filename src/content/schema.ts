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

// A calendar month, "2024-03". Months sort correctly as plain strings.
const month = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, { error: "expected a month as YYYY-MM" })

export const milestoneKinds = ["job", "course", "learning"] as const

const milestone = z.strictObject({
  id: z.string().trim().min(1),
  kind: z.enum(milestoneKinds),
  title: localized,
  // Missing for work without one, like self-employment.
  organisation: z.string().trim().min(1).optional(),
  description: localized,
  start: month,
  // No end means the Milestone is ongoing.
  end: month.optional(),
})

const project = z.strictObject({
  // Part of the Case Study URL: /en/projects/<slug>.
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    error: "expected lowercase words joined by dashes",
  }),
  // The id of the Milestone the Project belongs to.
  milestone: z.string(),
  name: localized,
  summary: localized,
  technologies: z.array(z.string().trim().min(1)).min(1),
  featured: z.boolean(),
  demo: z.url().optional(),
  repo: z.url().optional(),
  // Path of an image in public/, like "/projects/<slug>.svg".
  thumbnail: z.string().startsWith("/"),
})

// The home page highlights two or three Featured Projects.
const maxFeatured = 3

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
  timeline: z
    .strictObject({
      heading: localized,
      milestones: z.array(milestone),
      projects: z.array(project),
    })
    .superRefine(({ milestones, projects }, ctx) => {
      const milestoneIds = new Set(milestones.map((m) => m.id))
      const slugs = new Set<string>()
      projects.forEach((project, i) => {
        if (slugs.has(project.slug)) {
          ctx.addIssue({
            code: "custom",
            path: ["projects", i, "slug"],
            message: `slug "${project.slug}" is already used by another Project`,
          })
        }
        slugs.add(project.slug)
        if (!milestoneIds.has(project.milestone)) {
          ctx.addIssue({
            code: "custom",
            path: ["projects", i, "milestone"],
            message: `no Milestone with id "${project.milestone}"`,
          })
        }
      })
      const featured = projects.filter((p) => p.featured).length
      if (featured > maxFeatured) {
        ctx.addIssue({
          code: "custom",
          path: ["projects"],
          message: `${featured} Projects are featured, at most ${maxFeatured} may be`,
        })
      }
    }),
  // Strings of the site's own interface (buttons, labels), not the owner's
  // story. They follow the same both-languages rule.
  ui: z.strictObject({
    toggleTheme: localized,
    // Text of the link to the other language, written in that language.
    switchLanguage: localized,
    // End of a Milestone that is still going on: "March 2024 – present".
    ongoing: localized,
  }),
})

export type RawContent = z.input<typeof contentSchema>
