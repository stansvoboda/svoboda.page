import { useId } from "react"

import type { Locale, Project } from "@/content"
import { cn } from "@/lib/utils"

// A Project as a ticket: hard edge, the picture as its stub, and the whole
// ticket lights up yellow when pointed at.
export function ProjectCard({
  project,
  locale,
  headingLevel = 4,
  vertical = false,
}: Readonly<{
  project: Project
  locale: Locale
  // The level of the name's heading, one below the section holding the card.
  headingLevel?: 3 | 4
  // The thumbnail above the text at every width, for a narrow card.
  vertical?: boolean
}>) {
  const nameId = useId()
  const Heading = `h${headingLevel}` as const

  return (
    <article
      aria-labelledby={nameId}
      className={cn(
        // The link inside carries the keyboard focus, so the ticket shows it
        // as an outline around the whole card.
        "group relative flex h-full flex-col overflow-hidden border-2 border-foreground bg-card transition-colors duration-150 hover:bg-signal hover:text-on-signal has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-ring motion-reduce:transition-none",
        !vertical && "sm:flex-row"
      )}
    >
      {/* Decorative: the name next to it already says what it shows. */}
      <img
        src={project.thumbnail}
        alt=""
        className={cn(
          "aspect-video w-full border-b-2 border-foreground bg-muted object-cover",
          !vertical && "sm:w-56 sm:shrink-0 sm:border-r-2 sm:border-b-0"
        )}
      />
      <div className="flex flex-col gap-2 p-4">
        <Heading
          id={nameId}
          className="font-heading text-2xl leading-none font-bold tracking-tight uppercase"
        >
          {/* The whole card is clickable through this link's ::after. */}
          <a
            href={`/${locale}/projects/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.name}
          </a>
        </Heading>
        <p className="text-muted-foreground group-hover:text-on-signal">
          {project.summary}
        </p>
        <ul className="mt-1 flex flex-wrap gap-1.5">
          {project.technologies.map((technology) => (
            <li
              key={technology.id}
              className="border-2 border-current px-1.5 font-heading text-sm font-semibold tracking-wide uppercase"
            >
              {technology.name}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
