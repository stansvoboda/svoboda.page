import { useId } from "react"

import type { Content, Locale, Skill } from "@/content"
import { textLinkClass } from "@/lib/utils"

export function Skills({
  skills,
  locale,
  labels,
}: Readonly<{
  skills: Content["skills"]
  locale: Locale
  labels: Content["ui"]["skills"]
}>) {
  const headingId = useId()

  return (
    <section
      id="skills"
      aria-labelledby={headingId}
      className="flex flex-col gap-8"
    >
      <h2 id={headingId} className="font-heading text-2xl font-semibold">
        {skills.heading}
      </h2>
      {skills.groups.map(
        (group) =>
          // A level the owner has no Skills at would be an empty heading.
          group.skills.length > 0 && (
            <div key={group.level} className="flex flex-col gap-3">
              <h3 className="font-heading text-lg font-semibold">
                {group.heading}
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {group.skills.map((skill) => (
                  <SkillItem
                    key={skill.id}
                    skill={skill}
                    locale={locale}
                    labels={labels}
                  />
                ))}
              </ul>
            </div>
          )
      )}
    </section>
  )
}

function SkillItem({
  skill,
  locale,
  labels,
}: Readonly<{
  skill: Skill
  locale: Locale
  labels: Content["ui"]["skills"]
}>) {
  const nameId = useId()

  return (
    <li
      aria-labelledby={nameId}
      className="flex flex-col gap-1 rounded-lg border bg-card p-4"
    >
      <p id={nameId} className="font-medium">
        {skill.name}
      </p>
      {skill.projects.length > 0 ? (
        <>
          <p className="text-sm text-muted-foreground">
            {labels.projects}: {skill.projects.length}
          </p>
          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
            {skill.projects.map((project) => (
              <li key={project.slug}>
                <a
                  href={`/${locale}/projects/${project.slug}`}
                  className={textLinkClass}
                >
                  {project.name}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">{labels.noProjects}</p>
      )}
    </li>
  )
}
