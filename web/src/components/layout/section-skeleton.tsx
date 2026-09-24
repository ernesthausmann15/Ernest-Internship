/**
 * SectionSkeleton
 *
 * What: Placeholder blocks shown while a section is still fetching.
 * Why: The home page streams each API call on its own. Visitors should
 *      see the shape of the content immediately instead of a blank gap.
 * How: shadcn Skeleton is a pulsing div. We repeat it to mimic cards.
 */

import { Skeleton } from "@/components/ui/skeleton"

export function SectionSkeleton({
  title,
  count = 4,
}: {
  title: string
  count?: number
}) {
  return (
    <section className="page-wrap py-16" aria-busy="true" aria-label={`Loading ${title}`}>
      <Skeleton className="mb-8 h-10 w-56" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: count }, (_, index) => (
          <Skeleton key={index} className="aspect-[3/4] rounded-xl" />
        ))}
      </div>
    </section>
  )
}
