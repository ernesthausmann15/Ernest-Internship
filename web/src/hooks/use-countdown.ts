"use client"

/**
 * useCountdown
 *
 * What: A clock that re-renders every second until an auction ends.
 * Why: `expiryDate` is a fixed timestamp. The label has to change as
 *      real time passes, which only the browser can do.
 * How: We store `now` in state and refresh it with setInterval.
 *      The cleanup function clears the interval when the card unmounts
 *      so we do not leak timers. No expiry means we skip the interval.
 */

import { useEffect, useState } from "react"
import { getCountdownParts } from "@/lib/format"

export function useCountdown(expiryDate: number | null) {
  // Start as null so the server render and the first client render match.
  // Date.now() during render would differ by a second and break hydration.
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    if (!expiryDate) return

    setNow(Date.now())
    const timer = window.setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [expiryDate])

  if (now === null) {
    return expiryDate ? { expired: false as const, label: "Live auction" } : null
  }

  return getCountdownParts(expiryDate, now)
}
