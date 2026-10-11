import { useId } from "react"

import { ProjectCard } from "@/components/project-card"
import type { Content, Locale, Milestone } from "@/content"
import { formatMilestoneDates } from "@/lib/milestone-dates"

export function Timeline({
  timeline,
  locale,
  ongoingLabel,
}: Readonly<{
  timeline: Content["timeline"]
  locale: Locale
  ongoingLabel: string
}>) {
  const headingId = useId()

  return (
    <section
      id="timeline"
      aria-labelledby={headingId}
      className="flex flex-col gap-8"
    >
      <h2 id={headingId} className="font-heading text-2xl font-semibold">
        {timeline.heading}
      </h2>
      <ol className="flex flex-col gap-10 border-l pl-6">
        {timeline.milestones.map((milestone) => (
          <MilestoneItem
            key={milestone.id}
            milestone={milestone}
            locale={locale}
            ongoingLabel={ongoingLabel}
          />
        ))}
      </ol>
    </section>
  )
}

function MilestoneItem({
  milestone,
  locale,
  ongoingLabel,
}: Readonly<{ milestone: Milestone; locale: Locale; ongoingLabel: string }>) {
  const titleId = useId()
  const dates = formatMilestoneDates(milestone, locale, ongoingLabel)

  return (
    <li aria-labelledby={titleId} className="relative flex flex-col gap-2">
      {/* The dot on the Timeline's line. */}
      <span
        aria-hidden
        className="absolute top-2 -left-[calc(1.5rem+4.5px)] size-2 rounded-full bg-primary"
      />
      <p className="text-sm text-muted-foreground">{dates}</p>
      <h3 id={titleId} className="font-heading text-lg font-semibold">
        {milestone.title}
      </h3>
      {milestone.organisation && (
        <p className="text-sm font-medium">{milestone.organisation}</p>
      )}
      <p className="max-w-prose text-muted-foreground">
        {milestone.description}
      </p>
      {milestone.projects.length > 0 && (
        <ul className="mt-2 flex flex-col gap-3">
          {milestone.projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} locale={locale} />
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}
