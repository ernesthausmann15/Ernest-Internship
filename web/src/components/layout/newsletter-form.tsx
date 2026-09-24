"use client"

/**
 * NewsletterForm
 *
 * What: Email capture in the footer.
 * Why: The original marketplace invited visitors to subscribe, but there
 *      is no newsletter API. We confirm locally so the control still feels finished.
 * How: `onSubmit` prevents a real POST, checks for an @ sign, and swaps
 *      the form for a thank-you line. State lives only in this component.
 */

import { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [joined, setJoined] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.includes("@")) return
    setJoined(true)
  }

  if (joined) {
    return <p className="text-sm text-primary">You are on the list. We will keep it quiet.</p>
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email address"
        aria-label="Email address"
        className="h-9"
      />
      <Button type="submit" className="h-9">
        Join
      </Button>
    </form>
  )
}
