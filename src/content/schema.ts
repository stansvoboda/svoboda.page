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

// A path of an image in public/, like "/projects/<slug>.svg".
const image = z.string().startsWith("/")

// The story of a Project, problem → decisions → result. Every Project has
// one with all its sections; for a small Project a section can be short.
const caseStudy = z.strictObject({
  // The context and the problem the Project solves.
  context: localized,
  // The owner's role and the stack used.
  role: localized,
  decisions: localized,
  // A problem the owner hit and how they solved it.
  challenge: localized,
  result: localized,
  // How AI was used.
  ai: localized,
  // What the owner would do differently next time.
  differently: localized,
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
  thumbnail: image,
  screenshots: z.array(z.strictObject({ src: image, alt: localized })),
  caseStudy,
})

// The owner's self-assessment, in the order the Skills section shows it.
export const skillLevels = ["daily", "experienced", "learning"] as const

const skill = z.strictObject({
  id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    error: "expected lowercase words joined by dashes",
  }),
  // A technology's own name reads the same in both languages: "React".
  name: z.string().trim().min(1),
  level: z.enum(skillLevels),
})

// The home page highlights two or three Featured Projects.
const maxFeatured = 3

export const contentSchema = z
  .strictObject({
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
    contact: z.strictObject({
      heading: localized,
      text: localized,
      // Shown under the form, and again if a message can't be sent.
      email: z.email(),
      linkedin: z.url(),
      github: z.url(),
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
    skills: z.strictObject({
      heading: localized,
      // The heading of each level's group.
      levels: z.strictObject({
        daily: localized,
        experienced: localized,
        learning: localized,
      }),
      items: z.array(skill).superRefine((items, ctx) => {
        const ids = new Set<string>()
        items.forEach((skill, i) => {
          if (ids.has(skill.id)) {
            ctx.addIssue({
              code: "custom",
              path: [i, "id"],
              message: `id "${skill.id}" is already used by another Skill`,
            })
          }
          ids.add(skill.id)
        })
      }),
    }),
    // Strings of the site's own interface (buttons, labels), not the owner's
    // story. They follow the same both-languages rule.
    ui: z.strictObject({
      toggleTheme: localized,
      // Text of the link to the other language, written in that language.
      switchLanguage: localized,
      // End of a Milestone that is still going on: "March 2024 – present".
      ongoing: localized,
      // Under each Skill: "Projects: 2", or a note that none uses it yet.
      skills: z.strictObject({
        projects: localized,
        noProjects: localized,
      }),
      // Headings and links of a Case Study page.
      caseStudy: z.strictObject({
        context: localized,
        role: localized,
        decisions: localized,
        challenge: localized,
        result: localized,
        ai: localized,
        differently: localized,
        screenshots: localized,
        demo: localized,
        repo: localized,
        // Introduces the Milestone the Project belongs to: "Part of: …".
        partOf: localized,
        backToTimeline: localized,
      }),
      // Labels and messages of the contact form.
      contactForm: z.strictObject({
        name: localized,
        email: localized,
        message: localized,
        send: localized,
        sending: localized,
        // What is wrong with a field, one per code of the contact schema.
        errors: z.strictObject({
          required: localized,
          invalidEmail: localized,
          tooLong: localized,
        }),
        // Sending before Turnstile has decided the visitor is human.
        verifying: localized,
        sent: localized,
        spam: localized,
        failed: localized,
        // Introduces the email, LinkedIn and GitHub links after a failure.
        fallback: localized,
      }),
      // The page for a URL with nothing behind it.
      notFound: z.strictObject({
        title: localized,
        text: localized,
        backHome: localized,
      }),
    }),
  })
  // A Project's technologies are ids of Skills, so the Skills section can
  // show the Projects behind each Skill.
  .superRefine(({ timeline, skills }, ctx) => {
    const skillIds = new Set(skills.items.map((s) => s.id))
    timeline.projects.forEach((project, i) => {
      project.technologies.forEach((technology, j) => {
        if (!skillIds.has(technology)) {
          ctx.addIssue({
            code: "custom",
            path: ["timeline", "projects", i, "technologies", j],
            message: `no Skill with id "${technology}"`,
          })
        }
      })
    })
  })

export type RawContent = z.input<typeof contentSchema>
export type RawProject = RawContent["timeline"]["projects"][number]
