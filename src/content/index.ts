import { site } from "./data/site"
import { contentSchema, defaultLocale, locales, skillLevels } from "./schema"
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

type WrittenProject = ContentInLocale["timeline"]["projects"][number]
type WrittenSkill = ContentInLocale["skills"]["items"][number]

// A Project's technologies are written as Skill ids; pages get the Skills'
// names to show.
export type Project = Omit<WrittenProject, "technologies"> & {
  technologies: Pick<WrittenSkill, "id" | "name">[]
}
export type Milestone = ContentInLocale["timeline"]["milestones"][number] & {
  projects: Project[]
}

// A Skill with the Projects that prove it. The Projects are derived from the
// Projects' technologies, never written by hand.
export type Skill = WrittenSkill & {
  projects: Project[]
}
export type SkillLevel = Skill["level"]
export type SkillGroup = { level: SkillLevel; heading: string; skills: Skill[] }

// The content of one locale as pages read it. Milestones and Projects are
// written as two flat lists; pages get them joined into the Timeline.
// Skills are written as one list; pages get them grouped by level.
// Featured Projects are marked on each Project; pages get them listed.
// The CV's experience and education are the Milestones, newest first.
export type Content = Omit<
  ContentInLocale,
  "featuredProjects" | "timeline" | "skills" | "cv"
> & {
  featuredProjects: { heading: string; projects: Project[] }
  timeline: { heading: string; milestones: Milestone[] }
  skills: { heading: string; groups: SkillGroup[] }
  cv: ContentInLocale["cv"] & {
    experience: Milestone[]
    education: Milestone[]
  }
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
  const projects = withSkills(inLocale.timeline.projects, inLocale.skills.items)
  const timeline = buildTimeline(inLocale.timeline, projects)
  return {
    ...inLocale,
    featuredProjects: {
      heading: inLocale.featuredProjects.heading,
      projects: projects.filter((p) => p.featured),
    },
    timeline,
    // Skills list their Projects in Timeline order, not as written.
    skills: groupSkills(
      inLocale.skills,
      timeline.milestones.flatMap((m) => m.projects)
    ),
    cv: buildCv(inLocale.cv, timeline.milestones),
  }
}

// An ongoing Milestone has no end; it sorts as if it ended in the future.
const ongoing = "9999-12"

// The Projects in the order they were written, each technology swapped for
// the Skill it refers to.
function withSkills(
  projects: WrittenProject[],
  skills: WrittenSkill[]
): Project[] {
  // Validation has checked that every technology is a Skill's id.
  const skillsById = new Map(skills.map(({ id, name }) => [id, { id, name }]))
  return projects.map((project) => ({
    ...project,
    technologies: project.technologies.map((id) => skillsById.get(id)!),
  }))
}

// Milestones from oldest to newest, each holding its Projects in the order
// they were written.
function buildTimeline(
  { heading, milestones }: ContentInLocale["timeline"],
  projects: Project[]
): Content["timeline"] {
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

// Skills grouped by level, use daily first, each group in the order its
// Skills were written. Each Skill holds the Projects that use it, in
// Timeline order.
function groupSkills(
  { heading, levels, items }: ContentInLocale["skills"],
  projects: Project[]
): Content["skills"] {
  const skills = items.map((skill) => ({
    ...skill,
    projects: projects.filter((p) =>
      p.technologies.some((t) => t.id === skill.id)
    ),
  }))
  return {
    heading,
    groups: skillLevels.map((level) => ({
      level,
      heading: levels[level],
      skills: skills.filter((s) => s.level === level),
    })),
  }
}

// Jobs are the CV's experience; courses and learning periods its education.
// A CV lists both newest first, the reverse of the Timeline.
function buildCv(
  cv: ContentInLocale["cv"],
  milestones: Milestone[]
): Content["cv"] {
  const newestFirst = milestones.toReversed()
  return {
    ...cv,
    experience: newestFirst.filter((m) => m.kind === "job"),
    education: newestFirst.filter(
      (m) => m.kind === "course" || m.kind === "learning"
    ),
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
