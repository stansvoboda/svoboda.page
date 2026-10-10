import { createFileRoute, getRouteApi, notFound } from "@tanstack/react-router"

import { CaseStudyPage } from "@/components/case-study-page"
import { LocaleNotFoundPage } from "@/components/not-found-page"
import { getCaseStudy, getContent, isLocale } from "@/content"

const localeRoute = getRouteApi("/$locale")

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
    // The site's title, so the page title reads "<Project> · <site>".
    return { caseStudy, siteTitle: getContent(locale).meta.title }
  },
  head: ({ loaderData }) => ({
    meta: loaderData && [
      {
        title: `${loaderData.caseStudy.project.name} · ${loaderData.siteTitle}`,
      },
      { name: "description", content: loaderData.caseStudy.project.summary },
    ],
  }),
  component: CaseStudy,
  // Its own 404, so an unknown slug keeps the locale's layout around it: a
  // notFound() thrown here is shown by the nearest route that has one.
  notFoundComponent: LocaleNotFoundPage,
})

function CaseStudy() {
  const { caseStudy } = Route.useLoaderData()
  const { locale, content } = localeRoute.useLoaderData()

  return <CaseStudyPage caseStudy={caseStudy} ui={content.ui} locale={locale} />
}
