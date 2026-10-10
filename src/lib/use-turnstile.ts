import { useCallback, useEffect, useRef, useState } from "react"

// Explicit rendering: the script waits for us to place the widget, instead
// of scanning the page for it on load.
const scriptUrl =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"

let loading: Promise<NonNullable<Window["turnstile"]>> | undefined

// Loads Cloudflare's script once, the first time a widget needs it.
function loadTurnstile() {
  if (window.turnstile) {
    return Promise.resolve(window.turnstile)
  }
  loading ??= new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = scriptUrl
    script.async = true
    script.onload = () => resolve(window.turnstile!)
    script.onerror = () => {
      loading = undefined
      reject(new Error("Turnstile script failed to load"))
    }
    document.head.append(script)
  })
  return loading
}

// Shows the Turnstile widget in the element `ref` points to. Turnstile
// checks in the background that the visitor is human and hands over a
// token, which the server verifies. A token works only once, so after a
// failed send, `reset` gets a fresh one.
export function useTurnstile(siteKey: string, language: string) {
  const ref = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | undefined>(undefined)
  const [token, setToken] = useState<string>()

  // Runs only in the browser, so prerendered HTML has just the empty element.
  useEffect(() => {
    let cancelled = false
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !ref.current) {
          return
        }
        widgetId.current = turnstile.render(ref.current, {
          sitekey: siteKey,
          language,
          callback: setToken,
          "expired-callback": () => setToken(undefined),
          "error-callback": () => setToken(undefined),
        })
      })
      // Without the widget there is no token; the server rejects the send
      // and the form offers the direct contact links.
      .catch((error: unknown) => console.error(error))
    return () => {
      cancelled = true
      if (widgetId.current) {
        window.turnstile?.remove(widgetId.current)
        widgetId.current = undefined
      }
    }
  }, [siteKey, language])

  const reset = useCallback(() => {
    setToken(undefined)
    if (widgetId.current) {
      window.turnstile?.reset(widgetId.current)
    }
  }, [])

  return { ref, token, reset }
}
