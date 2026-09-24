/**
 * SectionHeading
 *
 * What: The title row above each home and explore block.
 * Why: Every section needs the same eyebrow, heading, and optional action
 *      so the page rhythm stays consistent.
 * How: Callers pass text and, when useful, a link such as "View all".
 */

import type { ReactNode } from "react"

export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string
  title: string
  action?: ReactNode
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="mb-2 text-xs font-medium tracking-[0.22em] text-primary uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
      {action}
    </div>
  )
}
