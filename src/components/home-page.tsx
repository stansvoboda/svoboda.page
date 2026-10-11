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
    <main className="flex flex-col gap-24">
      <Intro
        intro={content.intro}
        locale={locale}
        cvLabel={content.ui.cv.open}
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
