import { createFileRoute } from "@tanstack/react-router"

import { Intro } from "@/components/intro"
import { ThemeToggle } from "@/components/theme-toggle"

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-24 px-6 py-8">
      <header className="flex justify-end">
        <ThemeToggle />
      </header>
      <main className="flex flex-col gap-24">
        <Intro />
        <section id="contact" className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl font-semibold">Contact</h2>
          <p className="text-muted-foreground">
            A contact form is on its way. Until then, find me on{" "}
            <a
              href="https://github.com/stansvoboda"
              className="text-primary underline-offset-4 hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  )
}
