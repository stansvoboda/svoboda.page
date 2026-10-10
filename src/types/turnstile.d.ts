// What Cloudflare's Turnstile script puts on window.
// https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/
type TurnstileOptions = {
  sitekey: string
  language?: string
  callback: (token: string) => void
  "expired-callback"?: () => void
  "error-callback"?: () => void
}

interface Window {
  turnstile?: {
    render: (element: HTMLElement, options: TurnstileOptions) => string
    reset: (widgetId: string) => void
    remove: (widgetId: string) => void
  }
}
