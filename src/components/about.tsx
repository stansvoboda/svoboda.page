import type { Content } from "@/content"

export function About({ about }: Readonly<{ about: Content["about"] }>) {
  return (
    <section id="about" className="flex flex-col gap-4">
      <h2 className="font-heading text-2xl font-semibold">{about.heading}</h2>
      <p className="max-w-prose text-muted-foreground">{about.text}</p>
      {/* Reserved for the Intro Video, planned after the first release. It
          stays empty and takes no space until then. */}
      <div data-slot="intro-video" className="empty:hidden" />
    </section>
  )
}
