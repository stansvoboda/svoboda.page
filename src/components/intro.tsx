import { buttonVariants } from "@/components/ui/button"

// Hard-coded English for the walking skeleton; it moves into typed content
// files once the content schema exists (ADR 0002).
export function Intro() {
  return (
    <section className="flex flex-col items-start gap-6">
      <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
        Stanislav Svoboda
      </h1>
      <p className="max-w-prose text-lg text-muted-foreground">
        Frontend developer (React, TypeScript) who works effectively with AI
        agents.
      </p>
      <a href="#contact" className={buttonVariants({ size: "lg" })}>
        Contact me
      </a>
    </section>
  )
}
