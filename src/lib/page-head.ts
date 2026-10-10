import { defaultLocale, locales } from "@/content"
import type { Content, Locale } from "@/content"

// Open Graph names a language with its region.
const ogLocales: Record<Locale, string> = { en: "en_US", cs: "cs_CZ" }

// Every link preview uses the site's image, which is this size.
const imageSize = { width: "1200", height: "630" }

// The <head> of a page: what search engines index and what LinkedIn shows
// when someone pastes the link. `path` is the page's address without the
// locale: "" for the home page, "/projects/<slug>" for a Case Study.
//
// Only a page's own route calls this, never a layout: TanStack keeps the
// deepest route's <meta> of each name, but would repeat <link>s.
export function pageHead({
  content,
  locale,
  path,
  title,
  description,
  type,
}: {
  content: Content
  locale: Locale
  path: string
  title: string
  description: string
  // "article" for a Case Study, "website" for the home page.
  type: "website" | "article"
}) {
  const { url: site, image } = content.meta
  const urlIn = (l: Locale) => `${site}/${l}${path}`
  const url = urlIn(locale)
  const imageUrl = `${site}${image.src}`

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: type },
      { property: "og:site_name", content: content.intro.name },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: ogLocales[locale] },
      // One alternate is all there is with two locales; TanStack would
      // keep only one <meta> per property anyway.
      ...locales
        .filter((l) => l !== locale)
        .map((l) => ({
          property: "og:locale:alternate",
          content: ogLocales[l],
        })),
      { property: "og:image", content: imageUrl },
      { property: "og:image:width", content: imageSize.width },
      { property: "og:image:height", content: imageSize.height },
      { property: "og:image:alt", content: image.alt },
      // X (Twitter) takes the title, description and image from og:*.
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: url },
      ...locales.map((l) => ({
        rel: "alternate",
        hrefLang: l,
        href: urlIn(l),
      })),
      { rel: "alternate", hrefLang: "x-default", href: urlIn(defaultLocale) },
    ],
  }
}
