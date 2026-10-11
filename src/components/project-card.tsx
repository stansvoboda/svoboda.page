import { useId } from "react"

import type { Locale, Project } from "@/content"
import { cn } from "@/lib/utils"

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
        "relative flex flex-col gap-3 overflow-hidden rounded-lg border bg-card p-4 transition-colors focus-within:border-primary hover:border-primary",
        !vertical && "sm:flex-row"
      )}
    >
      {/* Decorative: the name next to it already says what it shows. */}
      <img
        src={project.thumbnail}
        alt=""
        className={cn(
          "aspect-video w-full rounded-md bg-muted object-cover",
          !vertical && "sm:w-40"
        )}
      />
      <div className="flex flex-col gap-2">
        <Heading id={nameId} className="font-heading font-semibold">
          {/* The whole card is clickable through this link's ::after. */}
          <a
            href={`/${locale}/projects/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.name}
          </a>
        </Heading>
        <p className="text-sm text-muted-foreground">{project.summary}</p>
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
      </div>
    </article>
  )
}
