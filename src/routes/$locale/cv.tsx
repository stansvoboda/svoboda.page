import { createFileRoute, notFound } from "@tanstack/react-router"

import { CvPage } from "@/components/cv-page"
import { getContent, isLocale } from "@/content"
import { pageHead } from "@/lib/page-head"

// The printable CV: /en/cv.
export const Route = createFileRoute("/$locale/cv")({
  loader: ({ params: { locale } }) => {
    if (!isLocale(locale)) {
      throw notFound()
    }
    return { locale, content: getContent(locale) }
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead({
          content: loaderData.content,
          locale: loaderData.locale,
          path: "/cv",
          title: `${loaderData.content.ui.cv.title} · ${loaderData.content.intro.name}`,
          description: loaderData.content.intro.positioning,
          type: "website",
        })
      : {},
  component: CvRoute,
})

function CvRoute() {
  const { locale, content } = Route.useLoaderData()

  return <CvPage content={content} locale={locale} />
}
