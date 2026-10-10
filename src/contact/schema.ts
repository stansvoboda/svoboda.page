import { z } from "zod"

// What can be wrong with a field. The schema reports these codes instead of
// sentences, so the form can show them in the visitor's language.
export type ContactErrorCode = "required" | "invalidEmail" | "tooLong"

function requiredText(maxLength: number) {
  return z
    .string({ error: "required" })
    .trim()
    .min(1, { error: "required" })
    .max(maxLength, { error: "tooLong" })
}

// The contact form's fields. The form validates with it in the browser and
// the server validates with it again, because a request can skip the form.
export const contactMessageSchema = z.object({
  name: requiredText(200),
  // 254 characters is the longest address email allows.
  email: requiredText(254).pipe(z.email({ error: "invalidEmail" })),
  message: requiredText(5000),
})

export type ContactMessage = z.infer<typeof contactMessageSchema>
export type ContactField = keyof ContactMessage
// What the visitor sends: the form's fields and the Turnstile token that
// proves a human filled it in. Only the shape: the contact message schema
// checks the content, so the form can show field errors.
export const contactInputSchema = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string(),
  token: z.string(),
})
export type ContactInput = z.infer<typeof contactInputSchema>

export type ContactFieldErrors = Partial<Record<ContactField, ContactErrorCode>>
