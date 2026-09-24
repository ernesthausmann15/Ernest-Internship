"use client"

/**
 * Route error boundary.
 *
 * What: Shown when a page throws while loading data.
 * Why: A failed fetch should offer a retry instead of a blank screen.
 * How: Next.js passes `reset`, which re-renders the route segment.
 */

import { Button } from "@/components/ui/button"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="page-wrap flex min-h-[50vh] flex-col items-start justify-center py-24">
      <h1 className="font-heading text-4xl font-semibold">The marketplace did not respond.</h1>
      <p className="mt-3 text-muted-foreground">Try the request again in a moment.</p>
      <Button className="mt-6 h-9" onClick={() => reset()}>
        Retry
      </Button>
    </div>
  )
}
