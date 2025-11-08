"use client"

import { useEffect } from "react"

/**
 * Lightweight Tawk.to loader. Adds the chat widget globally when IDs are present.
 * Configure via env: NEXT_PUBLIC_TAWK_PROPERTY_ID and NEXT_PUBLIC_TAWK_WIDGET_ID
 */
export function TawkWidget({ propertyId, widgetId }: { propertyId?: string; widgetId?: string }) {
  const pid = propertyId || process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID
  const wid = widgetId || process.env.NEXT_PUBLIC_TAWK_WIDGET_ID

  useEffect(() => {
    if (typeof window === "undefined") return

    // Do not load Tawk on mobile viewports (<= 767px)
    const isMobile = window.matchMedia("(max-width: 767px)").matches
    if (isMobile) {
      return
    }

    if (!pid || !wid) {
      if (typeof window !== "undefined") {
        // eslint-disable-next-line no-console
        console.warn("TawkWidget: Missing NEXT_PUBLIC_TAWK_PROPERTY_ID or NEXT_PUBLIC_TAWK_WIDGET_ID. Chat not loaded.")
      }
      return
    }

    // Avoid double-injecting
    const alreadyLoaded = document.querySelector<HTMLScriptElement>(`script[src*="embed.tawk.to/${pid}/${wid}"]`)
    if (alreadyLoaded) return

    ;(window as any).Tawk_API = (window as any).Tawk_API || {}
    ;(window as any).Tawk_LoadStart = new Date()

    const s1 = document.createElement("script")
    s1.async = true
    s1.src = `https://embed.tawk.to/${pid}/${wid}`
    s1.charset = "UTF-8"
    s1.setAttribute("crossorigin", "*")

    const s0 = document.getElementsByTagName("script")[0]
    s0.parentNode?.insertBefore(s1, s0)
  }, [pid, wid])

  return null
}