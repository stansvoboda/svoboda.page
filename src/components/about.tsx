import { SectionHeading } from "@/components/section-heading"
import type { Content } from "@/content"
import { bandPadClass, cn, shellClass } from "@/lib/utils"

export function About({ about }: Readonly<{ about: Content["about"] }>) {
  return (
    <section id="about" className="border-t-2 border-foreground">
      <div
        className={cn(
          shellClass,
          bandPadClass,
          "grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16"
        )}
      >
        <SectionHeading>{about.heading}</SectionHeading>
        <div className="flex flex-col gap-8">
          <p className="slide-from-right max-w-[34ch] text-2xl leading-snug font-medium sm:text-3xl">
            {about.text}
          </p>
          {/* Reserved for the Intro Video, planned after the first release. It
              stays empty and takes no space until then. */}
          <div data-slot="intro-video" className="empty:hidden" />
        </div>
      </div>
    </section>
  )
}
