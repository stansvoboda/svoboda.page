import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Intro } from "@/components/intro"
import type { Content } from "@/content"

export function HomePage({ content }: Readonly<{ content: Content }>) {
  return (
    <main className="flex flex-col gap-24">
      <Intro intro={content.intro} />
      <About about={content.about} />
      <Contact contact={content.contact} />
    </main>
  )
}
