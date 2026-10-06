import { buttonVariants } from "@/components/ui/button"
import type { Content } from "@/content"

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
}

export function Intro({ intro }: Readonly<{ intro: Content["intro"] }>) {
  return (
    <section className="flex flex-col items-start gap-6">
      {/* Placeholder until the owner's photo is ready; decorative, so screen
          readers skip it rather than announce a photo that isn't there. */}
      <div
        aria-hidden
        className="flex size-24 items-center justify-center rounded-full bg-muted font-heading text-2xl font-semibold text-muted-foreground"
      >
        {initialsOf(intro.name)}
      </div>
      <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
        {intro.name}
      </h1>
      <p className="max-w-prose text-lg text-muted-foreground">
        {intro.positioning}
      </p>
      <a href="#contact" className={buttonVariants({ size: "lg" })}>
        {intro.contactCta}
      </a>
    </section>
  )
}
