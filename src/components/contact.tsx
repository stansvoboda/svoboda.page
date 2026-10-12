import { useId, useState } from "react"
import { revalidateLogic, useForm } from "@tanstack/react-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SectionHeading } from "@/components/section-heading"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { contactMessageSchema } from "@/contact/schema"
import type {
  ContactErrorCode,
  ContactField,
  ContactInput,
} from "@/contact/schema"
import type { ContactResult } from "@/contact/submit"
import type { Content, Locale } from "@/content"
import { useTurnstile } from "@/lib/use-turnstile"
import { bandPadClass, cn, shellClass, textLinkClass } from "@/lib/utils"

export type SendContactMessage = (input: ContactInput) => Promise<ContactResult>

type Labels = Content["ui"]["contactForm"]

// The form's fields, in order, with what makes each one different.
const fields = [
  { name: "name", autoComplete: "name" },
  { name: "email", type: "email", autoComplete: "email" },
  { name: "message", multiline: true },
] satisfies {
  name: ContactField
  type?: string
  autoComplete?: string
  multiline?: boolean
}[]

// What the visitor sees above the button after pressing it.
type Outcome = ContactResult["status"] | "verifying"

export function Contact({
  contact,
  labels,
  locale,
  sendContactMessage,
}: Readonly<{
  contact: Content["contact"]
  labels: Labels
  locale: Locale
  sendContactMessage: SendContactMessage
}>) {
  const headingId = useId()

  return (
    <section id="contact" aria-labelledby={headingId} className="band-sign">
      <div
        className={cn(
          shellClass,
          bandPadClass,
          "grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20"
        )}
      >
        <div className="flex flex-col gap-6 lg:pt-1">
          <SectionHeading id={headingId}>{contact.heading}</SectionHeading>
          <p className="max-w-[28ch] text-2xl leading-snug font-medium sm:text-3xl">
            {contact.text}
          </p>
          <ContactLinks contact={contact} />
        </div>
        <ContactForm
          contact={contact}
          labels={labels}
          locale={locale}
          sendContactMessage={sendContactMessage}
        />
      </div>
    </section>
  )
}

function ContactForm({
  contact,
  labels,
  locale,
  sendContactMessage,
}: Readonly<{
  contact: Content["contact"]
  labels: Labels
  locale: Locale
  sendContactMessage: SendContactMessage
}>) {
  const {
    ref: turnstileRef,
    token,
    failed: turnstileFailed,
    reset: resetTurnstile,
  } = useTurnstile(import.meta.env.VITE_TURNSTILE_SITE_KEY, locale)
  const [outcome, setOutcome] = useState<Outcome>()

  const form = useForm({
    defaultValues: { name: "", email: "", message: "" },
    // Checks fields first when the visitor presses Send, then again on every
    // change, so an error disappears as soon as it is fixed.
    validationLogic: revalidateLogic(),
    // The same schema the server checks with.
    validators: { onDynamic: contactMessageSchema },
    onSubmit: async ({ value }) => {
      if (!token) {
        // A broken widget won't produce a token, so waiting won't help.
        setOutcome(turnstileFailed ? "failed" : "verifying")
        return
      }
      let result: ContactResult
      try {
        result = await sendContactMessage({ ...value, token })
      } catch {
        // The Worker didn't answer, for example the visitor is offline.
        result = { status: "failed" }
      }
      setOutcome(result.status)
      if (result.status === "sent") {
        form.reset()
      } else if (result.status === "invalid") {
        // Stored where the schema puts its errors, so the next change
        // re-checks the field and clears the error once it is fixed.
        form.setErrorMap({ onDynamic: { fields: result.errors } })
      } else {
        // Turnstile has used up the token; the next try needs a new one.
        resetTurnstile()
      }
    },
  })

  return (
    <form
      noValidate
      className="flex max-w-xl flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault()
        void form.handleSubmit()
      }}
    >
      {fields.map(({ name, multiline, type, autoComplete }) => (
        <form.Field key={name} name={name}>
          {(field) => {
            const code = errorCode(field.state.meta.errors[0])
            const id = `contact-${name}`
            const Control = multiline ? Textarea : Input
            return (
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor={id}
                  className="font-heading text-lg font-semibold tracking-wider uppercase"
                >
                  {labels[name]}
                </Label>
                <Control
                  id={id}
                  name={name}
                  type={type}
                  autoComplete={autoComplete}
                  rows={multiline ? 6 : undefined}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={code ? true : undefined}
                  aria-describedby={code ? `${id}-error` : undefined}
                />
                {code && (
                  <p id={`${id}-error`} className="text-sm text-destructive">
                    {labels.errors[code]}
                  </p>
                )}
              </div>
            )
          }}
        </form.Field>
      ))}
      <div ref={turnstileRef} />
      <OutcomeMessage outcome={outcome} labels={labels} contact={contact} />
      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="self-start"
          >
            {isSubmitting ? labels.sending : labels.send}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}

// A field error is a code: from the schema as an issue's message, from the
// server as is.
function errorCode(error: unknown): ContactErrorCode | undefined {
  if (typeof error === "string") {
    return error as ContactErrorCode
  }
  if (typeof error === "object" && error !== null && "message" in error) {
    return error.message as ContactErrorCode
  }
  return undefined
}

function OutcomeMessage({
  outcome,
  labels,
  contact,
}: Readonly<{
  outcome: Outcome | undefined
  labels: Labels
  contact: Content["contact"]
}>) {
  switch (outcome) {
    case "sent":
      return <p role="status">{labels.sent}</p>
    case "verifying":
      return <p role="status">{labels.verifying}</p>
    case "spam":
    case "failed":
      return (
        <div role="alert" className="flex flex-col gap-2">
          <p className="text-destructive">{labels[outcome]}</p>
          <p>{labels.fallback}</p>
          <ContactLinks contact={contact} />
        </div>
      )
    // The fields show their own errors.
    case "invalid":
    case undefined:
      return null
  }
}

function ContactLinks({ contact }: Readonly<{ contact: Content["contact"] }>) {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-lg font-semibold">
      <li>
        <a href={`mailto:${contact.email}`} className={textLinkClass}>
          {contact.email}
        </a>
      </li>
      <li>
        <a href={contact.linkedin} className={textLinkClass}>
          LinkedIn
        </a>
      </li>
      <li>
        <a href={contact.github} className={textLinkClass}>
          GitHub
        </a>
      </li>
    </ul>
  )
}
