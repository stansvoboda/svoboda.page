import { createFileRoute, notFound } from "@tanstack/react-router"

import { CaseStudyPage } from "@/components/case-study-page"
import { LocaleNotFoundPage } from "@/components/not-found-page"
import { getCaseStudy, getContent, isLocale } from "@/content"
import { pageHead } from "@/lib/page-head"

// A Project's Case Study: /en/projects/<slug>. An unknown slug is a 404.
export const Route = createFileRoute("/$locale/projects/$slug")({
  loader: ({ params: { locale, slug } }) => {
    if (!isLocale(locale)) {
      throw notFound()
    }
    const caseStudy = getCaseStudy(locale, slug)
    if (!caseStudy) {
      throw notFound()
    }
    return { locale, caseStudy, content: getContent(locale) }
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? pageHead({
          content: loaderData.content,
          locale: loaderData.locale,
          path: `/projects/${params.slug}`,
          // "<Project> · <site>"
          title: `${loaderData.caseStudy.project.name} · ${loaderData.content.meta.title}`,
          description: loaderData.caseStudy.project.summary,
          type: "article",
        })
      : {},
  component: CaseStudyRoute,
  // Its own 404, so an unknown slug keeps the locale's layout around it: a
  // notFound() thrown here is shown by the nearest route that has one.
  notFoundComponent: LocaleNotFoundPage,
})

function CaseStudyRoute() {
  const { locale, caseStudy, content } = Route.useLoaderData()

  return <CaseStudyPage caseStudy={caseStudy} ui={content.ui} locale={locale} />
}
