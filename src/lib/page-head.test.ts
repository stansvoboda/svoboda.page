import { describe, expect, it } from "vitest"

import { assembleContent } from "@/content"
import type { Locale } from "@/content"
import { pageHead } from "@/lib/page-head"
import { validContent } from "@/test/content-fixture"

function head(locale: Locale, path: string) {
  return pageHead({
    content: assembleContent(validContent(), locale),
    locale,
    path,
    title: "Todo app",
    description: "Keeps tasks.",
    type: "article",
  })
}

// The value of the <meta> with this name or property.
function meta(tags: ReturnType<typeof head>, key: string) {
  const tag = tags.meta.find(
    (m) =>
      ("name" in m && m.name === key) || ("property" in m && m.property === key)
  )
  return tag && "content" in tag ? tag.content : undefined
}

describe("pageHead", () => {
  it("gives the page its title and description", () => {
    const tags = head("en", "/projects/todo-app")

    expect(tags.meta).toContainEqual({ title: "Todo app" })
    expect(meta(tags, "description")).toBe("Keeps tasks.")
  })

  it("points the canonical URL at the page in its own locale", () => {
    const tags = head("cs", "/projects/todo-app")

    expect(tags.links).toContainEqual({
      rel: "canonical",
      href: "https://jane.example/cs/projects/todo-app",
    })
  })

  it("lists the page in every locale, English as the default", () => {
    const tags = head("cs", "/projects/todo-app")

    const alternates = tags.links
      .filter((l) => l.rel === "alternate")
      .map((l) => [l.hrefLang, l.href])
    expect(alternates).toEqual([
      ["en", "https://jane.example/en/projects/todo-app"],
      ["cs", "https://jane.example/cs/projects/todo-app"],
      ["x-default", "https://jane.example/en/projects/todo-app"],
    ])
  })

  it("addresses the home page without a trailing slash", () => {
    const tags = head("en", "")

    expect(tags.links).toContainEqual({
      rel: "canonical",
      href: "https://jane.example/en",
    })
  })

  it("describes the page for link previews in the page's language", () => {
    const tags = head("cs", "/projects/todo-app")

    expect(meta(tags, "og:type")).toBe("article")
    expect(meta(tags, "og:site_name")).toBe("Jane Doe")
    expect(meta(tags, "og:title")).toBe("Todo app")
    expect(meta(tags, "og:description")).toBe("Keeps tasks.")
    expect(meta(tags, "og:url")).toBe(
      "https://jane.example/cs/projects/todo-app"
    )
    expect(meta(tags, "og:locale")).toBe("cs_CZ")
    expect(meta(tags, "og:locale:alternate")).toBe("en_US")
  })

  it("shows the site's image, as an absolute URL, in link previews", () => {
    const tags = head("cs", "")

    expect(meta(tags, "og:image")).toBe("https://jane.example/og.png")
    expect(meta(tags, "og:image:width")).toBe("1200")
    expect(meta(tags, "og:image:height")).toBe("630")
    expect(meta(tags, "og:image:alt")).toBe("Jane Doe, vývojářka")
  })

  it("asks X (Twitter) for a large image card, which reads the Open Graph tags", () => {
    const tags = head("en", "")

    expect(meta(tags, "twitter:card")).toBe("summary_large_image")
    expect(
      tags.meta.filter((m) => "name" in m && m.name?.startsWith("twitter:"))
    ).toHaveLength(1)
  })
})
