import { useId } from "react"

import { ProjectCard } from "@/components/project-card"
import type { Content, Locale } from "@/content"

export function FeaturedProjects({
  featuredProjects,
  locale,
}: Readonly<{
  featuredProjects: Content["featuredProjects"]
  locale: Locale
}>) {
  const headingId = useId()

  if (featuredProjects.projects.length === 0) {
    return null
  }

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-8">
      <h2 id={headingId} className="font-heading text-2xl font-semibold">
        {featuredProjects.heading}
      </h2>
      <ul className="grid gap-4 sm:grid-cols-3">
        {featuredProjects.projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard
              project={project}
              locale={locale}
              headingLevel={3}
              vertical
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
