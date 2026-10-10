import { createFileRoute, getRouteApi } from "@tanstack/react-router"
import { useServerFn } from "@tanstack/react-start"

import { HomePage } from "@/components/home-page"
import { sendContactMessage } from "@/contact/server"

const localeRoute = getRouteApi("/$locale")

export const Route = createFileRoute("/$locale/")({
  component: Home,
})

function Home() {
  const { locale, content } = localeRoute.useLoaderData()
  const send = useServerFn(sendContactMessage)

  return (
    <HomePage
      locale={locale}
      content={content}
      sendContactMessage={(input) => send({ data: input })}
    />
  )
}
