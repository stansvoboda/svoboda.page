import { contactMessageSchema } from "@/contact/schema"
import type {
  ContactErrorCode,
  ContactField,
  ContactFieldErrors,
  ContactInput,
} from "@/contact/schema"

// The email that lands in the owner's inbox.
export type ContactEmail = {
  subject: string
  text: string
  // The visitor's address, so the owner can just press Reply.
  replyTo: string
}

// The outside services the operation needs. Production passes Cloudflare's;
// tests pass fakes.
export type ContactServices = {
  // Asks Turnstile whether the token is genuine.
  verify: (token: string) => Promise<boolean>
  // Delivers the email to the owner; throws if it can't.
  send: (email: ContactEmail) => Promise<void>
}

export type ContactResult =
  | { status: "sent" }
  | { status: "invalid"; errors: ContactFieldErrors }
  | { status: "spam" }
  | { status: "failed" }

export async function submitContactMessage(
  input: ContactInput,
  services: ContactServices
): Promise<ContactResult> {
  const parsed = contactMessageSchema.safeParse(input)
  if (!parsed.success) {
    const errors: ContactFieldErrors = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField
      errors[field] ??= issue.message as ContactErrorCode
    }
    return { status: "invalid", errors }
  }
  const { name, email, message } = parsed.data
  try {
    if (!(await services.verify(input.token))) {
      return { status: "spam" }
    }
    await services.send({
      subject: `svoboda.page: message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}\n`,
      replyTo: email,
    })
  } catch (error) {
    // Shows up in the Worker's logs in the Cloudflare dashboard.
    console.error("Contact message could not be sent", error)
    return { status: "failed" }
  }
  return { status: "sent" }
}
