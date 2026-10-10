import { describe, expect, it } from "vitest"

import {
  ContentError,
  assembleContent,
  findCaseStudy,
  listCaseStudySlugs,
} from "@/content"
import { validContent } from "@/test/content-fixture"

describe("assembleContent", () => {
  it("returns the content in the requested locale", () => {
    const content = assembleContent(validContent(), "cs")

    expect(content.intro.positioning).toBe("Staví věci.")
    expect(content.about.heading).toBe("O mně")
    expect(content.ui.toggleTheme).toBe("Přepnout motiv")
  })

  it("keeps values that are not localised, like the owner's name", () => {
    expect(assembleContent(validContent(), "en").intro.name).toBe("Jane Doe")
    expect(assembleContent(validContent(), "cs").intro.name).toBe("Jane Doe")
  })

  it("rejects content missing a Czech translation, naming the field", () => {
    const raw = validContent()
    // @ts-expect-error simulating an author forgetting a translation
    delete raw.about.text.cs

    expect(() => assembleContent(raw, "en")).toThrow(ContentError)
    expect(() => assembleContent(raw, "en")).toThrow(
      "about.text.cs: missing Czech (cs) text"
    )
  })

  it("rejects a missing English translation of a UI string", () => {
    const raw = validContent()
    // @ts-expect-error simulating an author forgetting a translation
    delete raw.ui.toggleTheme.en

    expect(() => assembleContent(raw, "cs")).toThrow(
      "ui.toggleTheme.en: missing English (en) text"
    )
  })

  it("rejects a translation left blank", () => {
    const raw = validContent()
    raw.intro.positioning.cs = "  "

    expect(() => assembleContent(raw, "en")).toThrow(
      "intro.positioning.cs: missing Czech (cs) text"
    )
  })

  it("rejects a misspelled locale instead of ignoring it", () => {
    const raw = validContent()
    raw.intro.contactCta = { en: "Contact me", cz: "Napište mi" } as never

    expect(() => assembleContent(raw, "en")).toThrow(
      /intro\.contactCta\.cs: missing Czech/
    )
  })
})

describe("assembleContent: Timeline", () => {
  it("lists Milestones from oldest to newest, each with its Projects", () => {
    const { timeline } = assembleContent(validContent(), "en")

    expect(timeline.heading).toBe("My path")
    expect(timeline.milestones.map((m) => m.id)).toEqual([
      "bakery",
      "bootcamp",
      "freelance",
    ])
    expect(timeline.milestones[1].projects.map((p) => p.slug)).toEqual([
      "todo-app",
    ])
    expect(timeline.milestones[2].projects.map((p) => p.slug)).toEqual(["shop"])
  })

  it("puts an ongoing Milestone after a finished one that started the same month", () => {
    const raw = validContent()
    // "freelance" is ongoing; give it the bootcamp's start and list it first.
    raw.timeline.milestones[1].start = "2023-09"
    raw.timeline.milestones.reverse()

    const { timeline } = assembleContent(raw, "en")

    expect(timeline.milestones.map((m) => m.id)).toEqual([
      "bakery",
      "bootcamp",
      "freelance",
    ])
    expect(timeline.milestones[2].end).toBeUndefined()
  })

  it("keeps a Milestone with no Projects, with an empty list", () => {
    const { timeline } = assembleContent(validContent(), "cs")

    expect(timeline.milestones[0].title).toBe("Pekařka")
    expect(timeline.milestones[0].projects).toEqual([])
  })

  it("rejects a Project referencing an unknown Milestone", () => {
    const raw = validContent()
    raw.timeline.projects[1].milestone = "frelance"

    expect(() => assembleContent(raw, "en")).toThrow(
      'timeline.projects.1.milestone: no Milestone with id "frelance"'
    )
  })

  it("rejects two Projects with the same slug", () => {
    const raw = validContent()
    raw.timeline.projects[1].slug = "todo-app"

    expect(() => assembleContent(raw, "en")).toThrow(
      'timeline.projects.1.slug: slug "todo-app" is already used by another Project'
    )
  })

  it("accepts three Featured Projects but rejects a fourth", () => {
    const raw = validContent()
    const [todo] = raw.timeline.projects
    for (const slug of ["second", "third"]) {
      raw.timeline.projects.push({ ...todo, slug })
    }
    raw.timeline.projects[1].featured = false

    expect(() => assembleContent(raw, "en")).not.toThrow()

    raw.timeline.projects[1].featured = true

    expect(() => assembleContent(raw, "en")).toThrow(
      "timeline.projects: 4 Projects are featured, at most 3 may be"
    )
  })
})

describe("findCaseStudy", () => {
  it("finds a Project by slug, together with its Milestone", () => {
    const content = assembleContent(validContent(), "cs")

    const caseStudy = findCaseStudy(content, "shop")

    expect(caseStudy?.project.name).toBe("Obchod")
    expect(caseStudy?.milestone.id).toBe("freelance")
    expect(caseStudy?.milestone.title).toBe("Na volné noze")
  })

  it("returns the Case Study's sections and screenshots in the requested locale", () => {
    const content = assembleContent(validContent(), "cs")

    const { project } = findCaseStudy(content, "todo-app")!

    expect(project.caseStudy.decisions).toBe("Jen lokálně.")
    expect(project.caseStudy.ai).toBe("AI psala testy.")
    expect(project.screenshots).toEqual([
      { src: "/projects/todo-app-list.png", alt: "Seznam úkolů" },
    ])
  })

  it("rejects a Case Study section missing a translation, naming the field", () => {
    const raw = validContent()
    // @ts-expect-error simulating an author forgetting a translation
    delete raw.timeline.projects[1].caseStudy.challenge.cs

    expect(() => assembleContent(raw, "en")).toThrow(
      "timeline.projects.1.caseStudy.challenge.cs: missing Czech (cs) text"
    )
  })

  it("rejects a Project without a Case Study", () => {
    const raw = validContent()
    // @ts-expect-error simulating an author leaving out the Case Study
    delete raw.timeline.projects[0].caseStudy

    expect(() => assembleContent(raw, "en")).toThrow(
      /timeline\.projects\.0\.caseStudy: /
    )
  })

  it("returns nothing for an unknown slug", () => {
    const content = assembleContent(validContent(), "en")

    expect(findCaseStudy(content, "no-such-project")).toBeUndefined()
  })
})

describe("listCaseStudySlugs", () => {
  it("lists the slug of every Project, in Timeline order", () => {
    const content = assembleContent(validContent(), "en")

    expect(listCaseStudySlugs(content)).toEqual(["todo-app", "shop"])
  })
})
