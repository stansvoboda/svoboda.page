import { useId } from "react"

import { SectionHeading } from "@/components/section-heading"
import type { Content, Locale, Skill } from "@/content"
import { bandPadClass, cn, shellClass, textLinkClass } from "@/lib/utils"

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
      className="band-tint border-t-2 border-foreground"
    >
      <div className={cn(shellClass, bandPadClass, "flex flex-col gap-12")}>
        <SectionHeading id={headingId}>{skills.heading}</SectionHeading>
        {skills.groups.map(
          (group) =>
            // A level the owner has no Skills at would be an empty heading.
            group.skills.length > 0 && (
              <div
                key={group.level}
                className="slide-from-right grid gap-6 border-t-4 border-foreground pt-4 lg:grid-cols-[13rem_1fr] lg:gap-10"
              >
                <h3 className="font-heading text-3xl leading-none font-bold tracking-tight uppercase">
                  {group.heading}
                </h3>
                <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
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
      </div>
    </section>
  )
}

// A Skill is a station sign. Filled when a Project proves it, hollow when
// none does yet.
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
  const proven = skill.projects.length > 0

  return (
    <li aria-labelledby={nameId} className="flex flex-col items-start gap-2">
      <p
        id={nameId}
        className={cn(
          "sign font-heading text-xl font-bold tracking-wide uppercase",
          !proven && "sign-hollow"
        )}
      >
        {skill.name}
      </p>
      {proven ? (
        <>
          <p className="text-muted-foreground">
            {labels.projects}: {skill.projects.length}
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {skill.projects.map((project) => (
              <li key={project.slug}>
                <a
                  href={`/${locale}/projects/${project.slug}`}
                  className={cn("font-semibold", textLinkClass)}
                >
                  {project.name}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-muted-foreground">{labels.noProjects}</p>
      )}
    </li>
  )
}
