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
// failed send, `reset` gets a fresh one. `failed` means the widget couldn't
// run (the script was blocked, or the check itself broke), so no token will
// come.
export function useTurnstile(siteKey: string, language: string) {
  const ref = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | undefined>(undefined)
  const [token, setToken] = useState<string>()
  const [failed, setFailed] = useState(false)

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
          callback: (token) => {
            setFailed(false)
            setToken(token)
          },
          "expired-callback": () => setToken(undefined),
          "error-callback": () => {
            setToken(undefined)
            setFailed(true)
          },
        })
      })
      .catch((error: unknown) => {
        console.error(error)
        setFailed(true)
      })
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
    setFailed(false)
    if (widgetId.current) {
      window.turnstile?.reset(widgetId.current)
    }
  }, [])

  return { ref, token, failed, reset }
}
