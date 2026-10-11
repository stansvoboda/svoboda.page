import { useId } from "react"

import { Button } from "@/components/ui/button"
import type { Content, Locale, Milestone } from "@/content"
import { cn, textLinkClass } from "@/lib/utils"
import { formatMilestoneDates } from "@/lib/milestone-dates"

// "https://www.linkedin.com/in/jane" as "linkedin.com/in/jane": short enough
// to read on paper, where the link itself can't be clicked.
function displayUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
}

// The CV: a printable summary of the owner, all of it from the same content
// as the home page. The print stylesheet (index.css) makes it an A4 page.
export function CvPage({
  content,
  locale,
}: Readonly<{ content: Content; locale: Locale }>) {
  const { intro, about, contact, cv, featuredProjects, skills, ui } = content
  const contactLinks = [
    { href: `mailto:${contact.email}`, text: contact.email },
    { href: contact.github, text: displayUrl(contact.github) },
    { href: contact.linkedin, text: displayUrl(contact.linkedin) },
    { href: content.meta.url, text: displayUrl(content.meta.url) },
  ]

  return (
    <main className="flex flex-col gap-10 print:gap-4 print:text-xs">
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <a href={`/${locale}`} className={cn("text-sm", textLinkClass)}>
          <span aria-hidden>← </span>
          {ui.cv.backHome}
        </a>
        <Button onClick={() => window.print()}>{ui.cv.print}</Button>
      </div>
      <header className="flex flex-col gap-3 print:gap-1.5">
        <h1 className="font-heading text-4xl font-semibold tracking-tight print:text-2xl">
          {intro.name}
        </h1>
        <p className="text-lg font-medium print:text-sm">{intro.positioning}</p>
        <p className="max-w-prose text-muted-foreground print:max-w-none">
          {about.text}
        </p>
      </header>
      <CvSection heading={ui.cv.contact}>
        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          {contactLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={textLinkClass}>
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </CvSection>
      <MilestoneSection
        heading={ui.cv.experience}
        milestones={cv.experience}
        locale={locale}
        ongoingLabel={ui.ongoing}
      />
      <MilestoneSection
        heading={ui.cv.education}
        milestones={cv.education}
        locale={locale}
        ongoingLabel={ui.ongoing}
      />
      {featuredProjects.projects.length > 0 && (
        <CvSection heading={featuredProjects.heading}>
          <ul className="flex flex-col gap-3 print:gap-1.5">
            {featuredProjects.projects.map((project) => (
              <CvEntry key={project.slug}>
                {(titleId) => (
                  <>
                    <h3 id={titleId} className="font-semibold">
                      {/* Absolute, so the link works in a saved PDF. */}
                      <a
                        href={`${content.meta.url}/${locale}/projects/${project.slug}`}
                        className={textLinkClass}
                      >
                        {project.name}
                      </a>
                    </h3>
                    <p className="text-muted-foreground">{project.summary}</p>
                    <p className="font-mono text-xs print:text-[10px]">
                      {project.technologies.map((t) => t.name).join(", ")}
                    </p>
                  </>
                )}
              </CvEntry>
            ))}
          </ul>
        </CvSection>
      )}
      <CvSection heading={skills.heading}>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
          {skills.groups.map(
            (group) =>
              // A level the owner has no Skills at would be an empty row.
              group.skills.length > 0 && (
                <div key={group.level} className="contents">
                  <dt className="font-medium">{group.heading}</dt>
                  <dd>{group.skills.map((s) => s.name).join(", ")}</dd>
                </div>
              )
          )}
        </dl>
      </CvSection>
      <CvSection heading={ui.cv.languages}>
        <ul className="flex flex-col gap-1">
          {cv.languages.map((language) => (
            <li key={language.name}>
              <span className="font-medium">{language.name}:</span>{" "}
              {language.level}
            </li>
          ))}
        </ul>
      </CvSection>
    </main>
  )
}

function CvSection({
  heading,
  children,
}: Readonly<{ heading: string; children: React.ReactNode }>) {
  const headingId = useId()

  return (
    <section
      aria-labelledby={headingId}
      className="flex flex-col gap-3 print:gap-1.5"
    >
      <h2
        id={headingId}
        className="border-b pb-1 font-heading text-xl font-semibold print:text-sm"
      >
        {heading}
      </h2>
      {children}
    </section>
  )
}

// One item of a CV list, named by its title for screen readers. On paper an
// item is never split across two pages.
function CvEntry({
  children,
}: Readonly<{ children: (titleId: string) => React.ReactNode }>) {
  const titleId = useId()

  return (
    <li
      aria-labelledby={titleId}
      className="flex break-inside-avoid flex-col gap-0.5"
    >
      {children(titleId)}
    </li>
  )
}

function MilestoneSection({
  heading,
  milestones,
  locale,
  ongoingLabel,
}: Readonly<{
  heading: string
  milestones: Milestone[]
  locale: Locale
  ongoingLabel: string
}>) {
  if (milestones.length === 0) {
    return null
  }

  return (
    <CvSection heading={heading}>
      <ul className="flex flex-col gap-4 print:gap-1.5">
        {milestones.map((milestone) => (
          <CvEntry key={milestone.id}>
            {(titleId) => (
              <>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 id={titleId} className="font-semibold">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-muted-foreground print:text-xs">
                    {formatMilestoneDates(milestone, locale, ongoingLabel)}
                  </p>
                </div>
                {milestone.organisation && (
                  <p className="font-medium">{milestone.organisation}</p>
                )}
                <p className="text-muted-foreground">{milestone.description}</p>
              </>
            )}
          </CvEntry>
        ))}
      </ul>
    </CvSection>
  )
}
