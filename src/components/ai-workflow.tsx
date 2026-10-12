import { IconArrowUpRight } from "@tabler/icons-react"
import { useId } from "react"
import type { CSSProperties } from "react"

import { SectionHeading } from "@/components/section-heading"
import type { Content } from "@/content"
import { bandPadClass, cn, shellClass, textLinkClass } from "@/lib/utils"

export function AiWorkflow({
  aiWorkflow,
}: Readonly<{ aiWorkflow: Content["aiWorkflow"] }>) {
  const headingId = useId()

  return (
    <section id="ai" aria-labelledby={headingId} className="band-poster">
      <div className={cn(shellClass, bandPadClass, "flex flex-col gap-14")}>
        <SectionHeading id={headingId}>{aiWorkflow.heading}</SectionHeading>
        {/* A line with four stops. The numbers carry the order, so they stay. */}
        <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
          {/* The steps are a fixed, ordered list with no ids of their own. */}
          {aiWorkflow.steps.map((step, i) => (
            <li
              key={i}
              style={{ "--i": i } as CSSProperties}
              className="relative flex flex-col gap-3 pl-16 lg:pt-16 lg:pl-0"
            >
              {/* The list already tells screen readers the order. */}
              <span
                aria-hidden
                className="station-dot route-dot absolute top-0 left-0 z-10 grid size-12 place-items-center rounded-full border-4 border-foreground font-heading text-2xl font-extrabold"
              >
                {i + 1}
              </span>
              {i < aiWorkflow.steps.length - 1 && (
                <span
                  aria-hidden
                  className="station-seg route-seg absolute top-12 bottom-[-2.5rem] left-[1.375rem] w-1 bg-foreground lg:top-[1.375rem] lg:right-[-1.5rem] lg:bottom-auto lg:left-12 lg:h-1 lg:w-auto"
                />
              )}
              <h3 className="font-heading text-3xl leading-none font-bold tracking-tight uppercase">
                {step.title}
              </h3>
              <p className="max-w-prose">{step.text}</p>
              <a
                href={step.evidence.url}
                className={cn(
                  "inline-flex w-fit items-center gap-1 py-1 font-semibold",
                  textLinkClass
                )}
              >
                {step.evidence.label}
                <IconArrowUpRight aria-hidden className="size-5" />
              </a>
            </li>
          ))}
        </ol>
        {/* The limit is the honest half of the claim, so it gets a notice of
            its own, framed like a warning sign. */}
        <div className="border-4 border-foreground bg-card text-card-foreground">
          <div
            aria-hidden
            className="h-3 bg-[repeating-linear-gradient(135deg,var(--foreground)_0_14px,transparent_14px_28px)]"
          />
          <p className="max-w-[44ch] p-5 font-heading text-3xl leading-tight font-bold sm:p-8 sm:text-4xl">
            {aiWorkflow.limits}
          </p>
        </div>
      </div>
    </section>
  )
}
