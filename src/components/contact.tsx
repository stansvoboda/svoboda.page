import { useId, useState } from "react"
import { revalidateLogic, useForm } from "@tanstack/react-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { contactMessageSchema } from "@/contact/schema"
import type { ContactErrorCode, ContactField } from "@/contact/schema"
import type { ContactInput, ContactResult } from "@/contact/submit"
import type { Content, Locale } from "@/content"
import { useTurnstile } from "@/lib/use-turnstile"

export type SendContactMessage = (input: ContactInput) => Promise<ContactResult>

type Labels = Content["ui"]["contactForm"]

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
    <section
      id="contact"
      aria-labelledby={headingId}
      className="flex flex-col gap-6"
    >
      <h2 id={headingId} className="font-heading text-2xl font-semibold">
        {contact.heading}
      </h2>
      <p className="max-w-prose text-muted-foreground">{contact.text}</p>
      <ContactForm
        contact={contact}
        labels={labels}
        locale={locale}
        sendContactMessage={sendContactMessage}
      />
      <ContactLinks contact={contact} />
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
        setOutcome("verifying")
        return
      }
      let result: ContactResult
      try {
        result = await sendContactMessage({ ...value, token: token })
      } catch {
        // The Worker didn't answer, for example the visitor is offline.
        result = { status: "failed" }
      }
      setOutcome(result.status)
      if (result.status === "sent") {
        form.reset()
      } else {
        // The token has been used up; the next try needs a new one.
        resetTurnstile()
      }
      if (result.status === "invalid") {
        for (const [field, code] of Object.entries(result.errors)) {
          form.setFieldMeta(field as ContactField, (meta) => ({
            ...meta,
            errorMap: { ...meta.errorMap, onServer: code },
          }))
        }
      }
    },
  })

  return (
    <form
      noValidate
      className="flex max-w-prose flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        void form.handleSubmit()
      }}
    >
      {(["name", "email", "message"] as const).map((name) => (
        <form.Field key={name} name={name}>
          {(field) => {
            const code = errorCode(field.state.meta.errors[0])
            const errorId = `${field.name}-error`
            const Control = name === "message" ? Textarea : Input
            return (
              <div className="flex flex-col gap-2">
                <Label htmlFor={`contact-${name}`}>{labels[name]}</Label>
                <Control
                  id={`contact-${name}`}
                  name={name}
                  type={name === "email" ? "email" : undefined}
                  autoComplete={name === "message" ? undefined : name}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={code ? true : undefined}
                  aria-describedby={code ? errorId : undefined}
                  rows={name === "message" ? 6 : undefined}
                />
                {code && (
                  <p id={errorId} className="text-sm text-destructive">
                    {labels.errors[code]}
                  </p>
                )}
              </div>
            )
          }}
        </form.Field>
      ))}
      <div ref={turnstileRef} />
      <Outcome outcome={outcome} labels={labels} contact={contact} />
      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Button type="submit" disabled={isSubmitting} className="self-start">
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

function Outcome({
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
      return (
        <p role="alert" className="text-destructive">
          {labels.spam}
        </p>
      )
    case "failed":
      return (
        <div role="alert" className="flex flex-col gap-2">
          <p className="text-destructive">{labels.failed}</p>
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

const linkClass = "text-primary underline-offset-4 hover:underline"

function ContactLinks({ contact }: Readonly<{ contact: Content["contact"] }>) {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2">
      <li>
        <a href={`mailto:${contact.email}`} className={linkClass}>
          {contact.email}
        </a>
      </li>
      <li>
        <a href={contact.linkedin} className={linkClass}>
          LinkedIn
        </a>
      </li>
      <li>
        <a href={contact.github} className={linkClass}>
          GitHub
        </a>
      </li>
    </ul>
  )
}
