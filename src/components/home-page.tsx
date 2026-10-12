import { About } from "@/components/about"
import { AiWorkflow } from "@/components/ai-workflow"
import { Contact } from "@/components/contact"
import type { SendContactMessage } from "@/components/contact"
import { FeaturedProjects } from "@/components/featured-projects"
import { Intro } from "@/components/intro"
import { Skills } from "@/components/skills"
import { Timeline } from "@/components/timeline"
import type { Content, Locale } from "@/content"

export function HomePage({
  content,
  locale,
  sendContactMessage,
}: Readonly<{
  content: Content
  locale: Locale
  // The server function in the app; a fake in tests.
  sendContactMessage: SendContactMessage
}>) {
  return (
    // Content sliding in from the right must not widen the page. `clip`
    // rather than `hidden`, so nothing inside becomes a scroll container.
    <main className="overflow-x-clip">
      <Intro
        intro={content.intro}
        locale={locale}
        cvLabel={content.ui.cv.open}
        milestones={content.timeline.milestones}
        ongoingLabel={content.ui.ongoing}
      />
      <FeaturedProjects
        featuredProjects={content.featuredProjects}
        locale={locale}
      />
      <About about={content.about} />
      <AiWorkflow aiWorkflow={content.aiWorkflow} />
      <Timeline
        timeline={content.timeline}
        locale={locale}
        ongoingLabel={content.ui.ongoing}
      />
      <Skills
        skills={content.skills}
        locale={locale}
        labels={content.ui.skills}
      />
      <Contact
        contact={content.contact}
        labels={content.ui.contactForm}
        locale={locale}
        sendContactMessage={sendContactMessage}
      />
    </main>
  )
}
