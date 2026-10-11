import { useId } from "react"

import type { Content } from "@/content"

export function AiWorkflow({
  aiWorkflow,
}: Readonly<{ aiWorkflow: Content["aiWorkflow"] }>) {
  const headingId = useId()

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-8">
      <h2 id={headingId} className="font-heading text-2xl font-semibold">
        {aiWorkflow.heading}
      </h2>
      <ol className="grid gap-6 sm:grid-cols-2">
        {aiWorkflow.steps.map((step, i) => (
          <li key={step.evidence.url} className="flex flex-col gap-2">
            {/* The list already tells screen readers the order. */}
            <span
              aria-hidden
              className="font-mono text-sm text-muted-foreground"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
            <p className="max-w-prose text-muted-foreground">{step.text}</p>
            <a
              href={step.evidence.url}
              className="w-fit text-sm font-medium text-primary underline underline-offset-4"
            >
              {step.evidence.label}
            </a>
          </li>
        ))}
      </ol>
      <p className="max-w-prose">{aiWorkflow.limits}</p>
    </section>
  )
}
