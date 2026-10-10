import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Intro } from "@/components/intro"
import { Timeline } from "@/components/timeline"
import type { Content, Locale } from "@/content"

export function HomePage({
  content,
  locale,
}: Readonly<{ content: Content; locale: Locale }>) {
  return (
    <main className="flex flex-col gap-24">
      <Intro intro={content.intro} />
      <About about={content.about} />
      <Timeline
        timeline={content.timeline}
        locale={locale}
        ongoingLabel={content.ui.ongoing}
      />
      <Contact contact={content.contact} />
    </main>
  )
}
