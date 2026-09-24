/**
 * Explore page.
 *
 * What: Full catalog at `/explore`, with optional `filter` and `q` query params.
 * Why: Sorting belongs in the URL so a filtered view can be shared and refreshed.
 * How: `searchParams` is a Promise in this version of Next.js, so we await it.
 *      `filter` is sent to the API. `q` is applied here because the API has no
 *      text search. The grid component handles likes, countdowns, and load-more.
 */

import type { Metadata } from "next"
import { ExploreBrowser } from "@/components/explore/explore-browser"
import { getExploreItems, isExploreFilter } from "@/lib/api"

export const metadata: Metadata = {
  title: "Explore",
  description: "Browse and sort live NFT listings.",
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; q?: string }>
}) {
  const { filter: filterParam, q } = await searchParams
  const filter = isExploreFilter(filterParam) ? filterParam : undefined
  const query = (q ?? "").trim()

  let items = await getExploreItems(filter)
  if (query) {
    const needle = query.toLowerCase()
    items = items.filter((item) => item.title.toLowerCase().includes(needle))
  }

  return (
    <section className="page-wrap py-12">
      <p className="text-xs font-medium tracking-[0.22em] text-primary uppercase">Catalog</p>
      <h1 className="font-heading mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
        Explore
      </h1>
      <p className="mt-3 mb-8 max-w-xl text-muted-foreground">
        Sort by price or likes. Search matches titles in the current results.
      </p>
      <ExploreBrowser items={items} filter={filter ?? "default"} query={query} />
    </section>
  )
}
