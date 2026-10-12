import { useId } from "react"

import { ProjectCard } from "@/components/project-card"
import { SectionHeading } from "@/components/section-heading"
import type { Content, Locale } from "@/content"
import { bandPadClass, cn, shellClass } from "@/lib/utils"

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
    <section id="projects" aria-labelledby={headingId}>
      <div className={cn(shellClass, bandPadClass, "flex flex-col gap-10")}>
        <SectionHeading id={headingId}>{featuredProjects.heading}</SectionHeading>
        {/* One to three tickets share the row evenly, so two never leave a hole. */}
        <ul className="grid gap-6 sm:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]">
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
      </div>
    </section>
  )
}
