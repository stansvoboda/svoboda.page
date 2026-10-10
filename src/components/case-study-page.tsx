import { useId } from "react"

import { buttonVariants } from "@/components/ui/button"
import type { CaseStudy, Content, Locale } from "@/content"
import { cn, textLinkClass } from "@/lib/utils"

type Sections = CaseStudy["project"]["caseStudy"]

// The order a Case Study is told in: problem → decisions → result.
const sectionOrder: (keyof Sections)[] = [
  "context",
  "role",
  "decisions",
  "challenge",
  "result",
  "ai",
  "differently",
]

export function CaseStudyPage({
  caseStudy,
  ui,
  locale,
}: Readonly<{ caseStudy: CaseStudy; ui: Content["ui"]; locale: Locale }>) {
  const { project, milestone } = caseStudy

  return (
    <main className="flex flex-col gap-12">
      <header className="flex flex-col gap-4">
        <a
          href={`/${locale}#timeline`}
          className={cn("text-sm", textLinkClass)}
        >
          <span aria-hidden>← </span>
          {ui.caseStudy.backToTimeline}
        </a>
        <p className="text-sm text-muted-foreground">
          <span>{ui.caseStudy.partOf}:</span> {milestone.title}
          {milestone.organisation && ` · ${milestone.organisation}`}
        </p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight">
          {project.name}
        </h1>
        <p className="max-w-prose text-lg text-muted-foreground">
          {project.summary}
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {project.technologies.map((technology) => (
            <li
              key={technology.id}
              className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs"
            >
              {technology.name}
            </li>
          ))}
        </ul>
        {/* Only the links the Project has, so there is never a dead one. */}
        {(project.demo || project.repo) && (
          <div className="flex flex-wrap gap-2">
            {project.demo && (
              <a href={project.demo} className={buttonVariants()}>
                {ui.caseStudy.demo}
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                className={buttonVariants({ variant: "outline" })}
              >
                {ui.caseStudy.repo}
              </a>
            )}
          </div>
        )}
      </header>
      {project.screenshots.length > 0 && (
        <Section heading={ui.caseStudy.screenshots}>
          <ul className="flex flex-col gap-4">
            {project.screenshots.map((screenshot) => (
              <li key={screenshot.src}>
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  loading="lazy"
                  className="w-full rounded-lg border bg-muted"
                />
              </li>
            ))}
          </ul>
        </Section>
      )}
      {sectionOrder.map((key) => (
        <Section key={key} heading={ui.caseStudy[key]}>
          <p className="max-w-prose text-muted-foreground">
            {project.caseStudy[key]}
          </p>
        </Section>
      ))}
    </main>
  )
}

function Section({
  heading,
  children,
}: Readonly<{ heading: string; children: React.ReactNode }>) {
  const headingId = useId()

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-3">
      <h2 id={headingId} className="font-heading text-2xl font-semibold">
        {heading}
      </h2>
      {children}
    </section>
  )
}
