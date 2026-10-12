import type { CSSProperties } from "react"

import { buttonVariants } from "@/components/ui/button"
import type { Content, Locale, Milestone } from "@/content"
import { cn, shellClass } from "@/lib/utils"

// The order the Intro's parts settle in; see `.rise` in index.css.
const step = (i: number) => ({ "--i": i }) as CSSProperties

export function Intro({
  intro,
  locale,
  cvLabel,
  milestones,
  ongoingLabel,
}: Readonly<{
  intro: Content["intro"]
  locale: Locale
  cvLabel: string
  milestones: Milestone[]
  ongoingLabel: string
}>) {
  return (
    <section className="band-poster">
      <div className={cn(shellClass, "flex flex-col gap-8 pt-12 pb-14 sm:pt-16 sm:pb-20")}>
        <div className="flex flex-col gap-5">
          <h1
            style={step(0)}
            className="rise font-heading text-[clamp(3.25rem,10.5vw,6rem)] leading-[0.88] font-extrabold tracking-tight uppercase"
          >
            {intro.name}
          </h1>
          <p
            style={step(1)}
            className="rise max-w-[36ch] text-xl leading-snug font-medium sm:text-2xl"
          >
            {intro.positioning}
          </p>
        </div>
        <div style={step(2)} className="rise flex flex-wrap gap-3">
          <a href="#contact" className={buttonVariants({ size: "lg" })}>
            {intro.contactCta}
          </a>
          <a
            href={`/${locale}/cv`}
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            {cvLabel}
          </a>
        </div>
        <DepartureBoard milestones={milestones} ongoingLabel={ongoingLabel} />
      </div>
    </section>
  )
}

// The path as a departures board: a year, a stop and where it was. The My path
// section below tells it in full, so the board is a summary for the eye.
function DepartureBoard({
  milestones,
  ongoingLabel,
}: Readonly<{ milestones: Milestone[]; ongoingLabel: string }>) {
  return (
    <ol aria-hidden className="border-t-4 border-foreground">
      {milestones.map((milestone, i) => {
        const latest = i === milestones.length - 1
        return (
          <li
            key={milestone.id}
            style={step(i + 3)}
            className={cn(
              "rise grid grid-cols-[4rem_1fr] items-baseline gap-x-4 border-b-2 border-foreground px-3 py-2.5 sm:grid-cols-[6rem_1fr_auto] sm:gap-x-6",
              latest && "bg-foreground text-background"
            )}
          >
            <span className="font-heading text-2xl font-bold tabular-nums">
              {milestone.start.slice(0, 4)}
            </span>
            <span className="font-heading text-xl font-semibold tracking-wide uppercase">
              {milestone.title}
            </span>
            <span className="col-start-2 text-base font-medium sm:col-start-3">
              {milestone.organisation ?? (milestone.end ? "" : ongoingLabel)}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
