import { createFileRoute, notFound } from "@tanstack/react-router"
import { useServerFn } from "@tanstack/react-start"

import { HomePage } from "@/components/home-page"
import { sendContactMessage } from "@/contact/server"
import { getContent, isLocale } from "@/content"
import { pageHead } from "@/lib/page-head"

export const Route = createFileRoute("/$locale/")({
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
          path: "",
          title: loaderData.content.meta.title,
          description: loaderData.content.meta.description,
          type: "website",
        })
      : {},
  component: Home,
})

function Home() {
  const { locale, content } = Route.useLoaderData()
  const send = useServerFn(sendContactMessage)

  return (
    <HomePage
      locale={locale}
      content={content}
      sendContactMessage={(input) => send({ data: input })}
    />
  )
}
