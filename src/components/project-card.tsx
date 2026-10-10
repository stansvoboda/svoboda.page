import { useId } from "react"

import type { Locale, Project } from "@/content"

export function ProjectCard({
  project,
  locale,
}: Readonly<{ project: Project; locale: Locale }>) {
  const nameId = useId()

  return (
    <article
      aria-labelledby={nameId}
      className="relative flex flex-col gap-3 overflow-hidden rounded-lg border bg-card p-4 transition-colors focus-within:border-primary hover:border-primary sm:flex-row"
    >
      {/* Decorative: the name next to it already says what it shows. */}
      <img
        src={project.thumbnail}
        alt=""
        className="aspect-video w-full rounded-md bg-muted object-cover sm:w-40"
      />
      <div className="flex flex-col gap-2">
        <h4 id={nameId} className="font-heading font-semibold">
          {/* The whole card is clickable through this link's ::after. */}
          <a
            href={`/${locale}/projects/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.name}
          </a>
        </h4>
        <p className="text-sm text-muted-foreground">{project.summary}</p>
        <ul className="flex flex-wrap gap-1.5">
          {project.technologies.map((technology) => (
            <li
              key={technology}
              className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs"
            >
              {technology}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
