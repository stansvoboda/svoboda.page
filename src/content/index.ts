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

type ContentInLocale = InLocale<ReturnType<typeof contentSchema.parse>>

export type Project = ContentInLocale["timeline"]["projects"][number]
export type Milestone = ContentInLocale["timeline"]["milestones"][number] & {
  projects: Project[]
}

// The content of one locale as pages read it. Milestones and Projects are
// written as two flat lists; pages get them joined into the Timeline.
export type Content = Omit<ContentInLocale, "timeline"> & {
  timeline: { heading: string; milestones: Milestone[] }
}

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
  if (Array.isArray(value)) {
    return value.map((item) => pickLocale(item, locale))
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
  const inLocale = pickLocale(result.data, locale) as ContentInLocale
  return { ...inLocale, timeline: buildTimeline(inLocale.timeline) }
}

// An ongoing Milestone has no end; it sorts as if it ended in the future.
const ongoing = "9999-12"

// Milestones from oldest to newest, each holding its Projects in the order
// they were written.
function buildTimeline({
  heading,
  milestones,
  projects,
}: ContentInLocale["timeline"]): Content["timeline"] {
  const sorted = milestones.toSorted(
    (a, b) =>
      a.start.localeCompare(b.start) ||
      (a.end ?? ongoing).localeCompare(b.end ?? ongoing)
  )
  return {
    heading,
    milestones: sorted.map((milestone) => ({
      ...milestone,
      projects: projects.filter((p) => p.milestone === milestone.id),
    })),
  }
}

// A Project's own page: the Project with the Milestone it belongs to.
export type CaseStudy = { project: Project; milestone: Milestone }

// The Case Study of the Project with this slug, or undefined if there is none.
export function findCaseStudy(
  content: Content,
  slug: string
): CaseStudy | undefined {
  for (const milestone of content.timeline.milestones) {
    const project = milestone.projects.find((p) => p.slug === slug)
    if (project) {
      return { project, milestone }
    }
  }
  return undefined
}

// Every Project's slug, for prerendering a Case Study page per Project.
export function listCaseStudySlugs(content: Content): string[] {
  return content.timeline.milestones.flatMap((m) =>
    m.projects.map((p) => p.slug)
  )
}

// The real content in the repo, in one locale. Throws ContentError if any
// translation is missing, which fails the prerender and so the build.
export function getContent(locale: Locale): Content {
  return assembleContent(site, locale)
}

// The Case Study with this slug from the real content, or undefined.
export function getCaseStudy(
  locale: Locale,
  slug: string
): CaseStudy | undefined {
  return findCaseStudy(getContent(locale), slug)
}
