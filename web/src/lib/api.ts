/**
 * NFT API client.
 *
 * What: The only place that knows the Cloud Function URLs.
 * Why: Pages and components should ask for "hot collections", not assemble
 *      query strings themselves. If an endpoint changes, we edit one file.
 * How: Each function calls `fetch`, checks the HTTP status, and returns
 *      typed JSON. Next.js 16 does not cache `fetch` by default, so every
 *      call reads the live API. Identical URLs in one render are still
 *      memoized, so a page and its `generateMetadata` can share one request.
 */

import type {
  AuthorProfile,
  ExploreFilter,
  ExploreItem,
  HotCollection,
  ItemDetails,
  TopSeller,
} from "@/lib/types"

const API_BASE =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net"

/** Labels for the explore sort control. `default` means "no filter param". */
export const EXPLORE_FILTERS: { value: "default" | ExploreFilter; label: string }[] =
  [
    { value: "default", label: "Default" },
    { value: "price_low_to_high", label: "Price, low to high" },
    { value: "price_high_to_low", label: "Price, high to low" },
    { value: "likes_high_to_low", label: "Most liked" },
  ]

/** Narrow an unknown query-string value to a filter the API accepts. */
export function isExploreFilter(value: string | undefined): value is ExploreFilter {
  return EXPLORE_FILTERS.some(
    (option) => option.value !== "default" && option.value === value
  )
}

/**
 * Shared request helper.
 * `path` is everything after the host, including the query string.
 */
async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}/${path}`)

  if (!response.ok) {
    throw new Error(`NFT API failed (${response.status}) for ${path}`)
  }

  return response.json() as Promise<T>
}

export function getHotCollections(): Promise<HotCollection[]> {
  return getJson<HotCollection[]>("hotCollections")
}

export function getTopSellers(): Promise<TopSeller[]> {
  return getJson<TopSeller[]>("topSellers")
}

/**
 * Explore listings.
 * Passing a filter appends `?filter=` so the API sorts the list.
 * We also coerce a missing `expiryDate` to null so countdown code
 * never has to guess between undefined, "", and a number.
 */
export async function getExploreItems(
  filter?: ExploreFilter
): Promise<ExploreItem[]> {
  const path = filter ? `explore?filter=${filter}` : "explore"
  const items = await getJson<ExploreItem[]>(path)

  return items.map((item) => ({
    ...item,
    expiryDate: typeof item.expiryDate === "number" ? item.expiryDate : null,
  }))
}

/** Returns null when the id is missing or the API rejects it. */
export async function getItemDetails(
  nftId: string
): Promise<ItemDetails | null> {
  try {
    const item = await getJson<ItemDetails>(
      `itemDetails?nftId=${encodeURIComponent(nftId)}`
    )
    if (!item?.nftId) return null
    return item
  } catch {
    return null
  }
}

/** Returns null when the author id does not resolve. */
export async function getAuthor(
  authorId: string
): Promise<AuthorProfile | null> {
  try {
    const author = await getJson<AuthorProfile>(
      `authors?author=${encodeURIComponent(authorId)}`
    )
    if (!author?.authorId) return null
    return author
  } catch {
    return null
  }
}
