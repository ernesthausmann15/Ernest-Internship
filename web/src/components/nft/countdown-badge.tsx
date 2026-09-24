"use client"

/**
 * CountdownBadge
 *
 * What: A small pill that counts down to `expiryDate`.
 * Why: Auctions are time-sensitive. A static "5h 30m" label would lie
 *      after the first second.
 * How: `useCountdown` owns the timer. This component only decides
 *      whether to render, and what color to use once the auction ends.
 */

import { Timer } from "lucide-react"
import { useCountdown } from "@/hooks/use-countdown"
import { cn } from "cn"

export function CountdownBadge({
  expiryDate,
  className,
}: {
  expiryDate: number | null
  className?: string
}) {
  const countdown = useCountdown(expiryDate)
  if (!countdown) return null

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md",
        countdown.expired && "bg-destructive/90",
        className
      )}
    >
      <Timer className="size-3" />
      {countdown.label}
    </span>
  )
}
