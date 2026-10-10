import { z } from "zod"

// What can be wrong with a field. The schema reports these codes instead of
// sentences, so the form can show them in the visitor's language.
export type ContactErrorCode = "required" | "invalidEmail" | "tooLong"

function text(maxLength: number) {
  return z
    .string({ error: "required" })
    .trim()
    .min(1, { error: "required" })
    .max(maxLength, { error: "tooLong" })
}

// The contact form's fields. The form validates with it in the browser and
// the server validates with it again, because a request can skip the form.
export const contactMessageSchema = z.object({
  name: text(200),
  email: z
    .string({ error: "required" })
    .trim()
    .min(1, { error: "required" })
    .pipe(z.email({ error: "invalidEmail" })),
  message: text(5000),
})

export type ContactMessage = z.infer<typeof contactMessageSchema>
export type ContactField = keyof ContactMessage
export type ContactFieldErrors = Partial<Record<ContactField, ContactErrorCode>>
