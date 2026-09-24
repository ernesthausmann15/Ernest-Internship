"use client"

/**
 * ExploreBrowser
 *
 * What: Filterable, searchable grid of marketplace listings.
 * Why: Explore is where visitors sort and page through the full catalog.
 * How: The server already fetched and filtered the list (API sort + title
 *      search). This component keeps two pieces of browser state:
 *      1. The sort control navigates to a new URL so the server refetches.
 *      2. "Load more" reveals the next 8 cards without another request,
 *         because the API returns the full page at once.
 *      Likes and countdowns live inside each NftCard.
 */

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NftCard } from "@/components/nft/nft-card"
import { EXPLORE_FILTERS } from "@/lib/api"
import type { ExploreFilter, ExploreItem } from "@/lib/types"

const PAGE_SIZE = 8

export function ExploreBrowser({
  items,
  filter,
  query,
}: {
  items: ExploreItem[]
  filter: "default" | ExploreFilter
  query: string
}) {
  const router = useRouter()
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const visibleItems = items.slice(0, visibleCount)

  function onFilterChange(value: string | null) {
    if (!value) return
    const params = new URLSearchParams()
    if (value !== "default") params.set("filter", value)
    if (query) params.set("q", query)
    const next = params.size ? `/explore?${params.toString()}` : "/explore"
    router.push(next)
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"}
          {query ? ` matching “${query}”` : ""}
        </p>
        <Select value={filter} onValueChange={onFilterChange}>
          <SelectTrigger className="h-9 w-56" aria-label="Sort items">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            {EXPLORE_FILTERS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {visibleItems.length === 0 ? (
        <p className="text-muted-foreground">No items match that search.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleItems.map((item) => (
            <NftCard
              key={item.nftId}
              item={{
                nftId: item.nftId,
                title: item.title,
                nftImage: item.nftImage,
                price: item.price,
                likes: item.likes,
                authorId: item.authorId,
                authorImage: item.authorImage,
                expiryDate: item.expiryDate,
              }}
            />
          ))}
        </div>
      )}

      {visibleCount < items.length ? (
        <div className="mt-10 text-center">
          <Button className="h-10 px-6" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
            Load more
          </Button>
        </div>
      ) : null}
    </div>
  )
}
