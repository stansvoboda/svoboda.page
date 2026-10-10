import type { RawContent } from "../schema"

// The owner's Skills and their levels, a first draft the owner may adjust.
// The Projects behind each Skill are found from the Projects' technologies.
//
// To add a Skill: add it to `items` with a new id. To show it on a Project,
// put that id in the Project's `technologies`.
export const skills = {
  heading: { en: "Skills", cs: "Dovednosti" },
  levels: {
    daily: { en: "Use daily", cs: "Používám denně" },
    experienced: { en: "Have experience with", cs: "Mám zkušenosti s" },
    learning: { en: "Learning", cs: "Učím se" },
  },
  items: [
    { id: "react", name: "React", level: "daily" },
    { id: "typescript", name: "TypeScript", level: "daily" },
    { id: "javascript", name: "JavaScript", level: "daily" },
    { id: "html", name: "HTML", level: "daily" },
    { id: "css", name: "CSS", level: "daily" },
    { id: "tailwind-css", name: "Tailwind CSS", level: "experienced" },
    { id: "scss", name: "SCSS", level: "experienced" },
    { id: "git", name: "Git", level: "experienced" },
    { id: "tanstack-start", name: "TanStack Start", level: "learning" },
    { id: "vitest", name: "Vitest", level: "learning" },
  ],
} satisfies RawContent["skills"]
