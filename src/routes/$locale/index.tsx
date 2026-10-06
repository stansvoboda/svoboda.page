import { createFileRoute, getRouteApi } from "@tanstack/react-router"

import { HomePage } from "@/components/home-page"

const localeRoute = getRouteApi("/$locale")

export const Route = createFileRoute("/$locale/")({
  component: Home,
})

function Home() {
  const { content } = localeRoute.useLoaderData()

  return <HomePage content={content} />
}
