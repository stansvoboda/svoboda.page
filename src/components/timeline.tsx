import { useId } from "react"

import { ProjectCard } from "@/components/project-card"
import { SectionHeading } from "@/components/section-heading"
import type { Content, Locale, Milestone } from "@/content"
import { formatMilestoneDates } from "@/lib/milestone-dates"
import { bandPadClass, cn, shellClass } from "@/lib/utils"

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
    <section id="timeline" aria-labelledby={headingId}>
      <div className={cn(shellClass, bandPadClass, "flex flex-col gap-14")}>
        <SectionHeading id={headingId}>{timeline.heading}</SectionHeading>
        <ol className="flex flex-col">
          {timeline.milestones.map((milestone, i) => (
            <MilestoneItem
              key={milestone.id}
              milestone={milestone}
              locale={locale}
              ongoingLabel={ongoingLabel}
              last={i === timeline.milestones.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}

// One stop on the route. Dates stand in the first column, the line with its
// lamp in the second, the story in the third; on a phone the dates move above
// the story and the line keeps the left edge.
function MilestoneItem({
  milestone,
  locale,
  ongoingLabel,
  last,
}: Readonly<{
  milestone: Milestone
  locale: Locale
  ongoingLabel: string
  last: boolean
}>) {
  const titleId = useId()
  const dates = formatMilestoneDates(milestone, locale, ongoingLabel)

  return (
    <li
      aria-labelledby={titleId}
      className="grid grid-cols-[2.75rem_1fr] gap-x-4 pb-14 last:pb-0 sm:grid-cols-[10rem_2.75rem_1fr] sm:gap-x-6"
    >
      {/* The line and its lamp. The grey line is the whole route; the dark one
          is drawn over it as the page scrolls to this stop. */}
      <div
        aria-hidden
        className="relative col-start-1 row-span-2 row-start-1 sm:col-start-2 sm:row-span-1"
      >
        {!last && (
          <>
            <span className="absolute top-4 bottom-[-4rem] left-1/2 w-1.5 -translate-x-1/2 bg-border" />
            <span className="station-seg absolute top-4 bottom-[-4rem] left-1/2 w-1.5 -translate-x-1/2 bg-foreground" />
          </>
        )}
        <span className="station-dot absolute top-1 left-1/2 z-10 size-7 -translate-x-1/2 rounded-full border-4 border-foreground" />
      </div>
      <p className="col-start-2 row-start-1 font-heading text-xl leading-tight font-bold tracking-wide text-balance uppercase tabular-nums sm:col-start-1 sm:text-right">
        {dates}
      </p>
      <div className="col-start-2 row-start-2 mt-2 flex flex-col gap-2 sm:col-start-3 sm:row-start-1 sm:mt-0">
        <h3
          id={titleId}
          className="font-heading text-3xl leading-none font-bold tracking-tight uppercase"
        >
          {milestone.title}
        </h3>
        {milestone.organisation && (
          <p className="text-lg font-semibold">{milestone.organisation}</p>
        )}
        <p className="max-w-prose text-muted-foreground">
          {milestone.description}
        </p>
        {milestone.projects.length > 0 && (
          <ul className="mt-3 flex flex-col gap-4">
            {milestone.projects.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} locale={locale} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}
