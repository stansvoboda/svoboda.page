import type { Content } from "@/content"

export function Contact({
  contact,
}: Readonly<{ contact: Content["contact"] }>) {
  return (
    <section id="contact" className="flex flex-col gap-2">
      <h2 className="font-heading text-2xl font-semibold">{contact.heading}</h2>
      <p className="text-muted-foreground">
        {contact.comingSoon}{" "}
        <a
          href="https://github.com/stansvoboda"
          className="text-primary underline-offset-4 hover:underline"
        >
          {contact.githubLink}
        </a>
        .
      </p>
    </section>
  )
}
