/**
 * Shared shapes for the Ultraverse NFT API.
 *
 * What: TypeScript types that describe each JSON payload we fetch.
 * Why: The Cloud Functions return plain JSON with no schema. Types let the
 *      editor catch mistakes (for example, treating `price` as a string)
 *      before the page ever runs.
 * How: Each type matches one endpoint. Components import these names instead
 *      of guessing field names from the network tab.
 */

/** One trending collection from `/hotCollections`. */
export type HotCollection = {
  id: number
  title: string
  authorImage: string
  nftImage: string
  nftId: number
  authorId: number
  /** On-chain standard number. The UI prints this as `ERC-192`. */
  code: number
}

/** One ranked creator from `/topSellers`. `price` is their ETH volume. */
export type TopSeller = {
  id: number
  authorName: string
  authorImage: string
  authorId: number
  price: number
}

/**
 * One marketplace listing from `/explore`.
 * `expiryDate` is a unix timestamp in milliseconds, or null when the
 * piece is not on a timed auction.
 */
export type ExploreItem = {
  id: number
  authorId: number
  authorImage: string
  nftImage: string
  nftId: number
  title: string
  price: number
  likes: number
  expiryDate: number | null
}

/** Full metadata for a single piece from `/itemDetails`. */
export type ItemDetails = {
  id: number
  title: string
  tag: number
  description: string
  nftImage: string
  nftId: number
  ownerName: string
  ownerId: number
  ownerImage: string
  creatorName: string
  creatorId: number
  /**
   * Sometimes a normal image URL, sometimes a base64 data URI.
   * The image component has to handle both.
   */
  creatorImage: string
  price: number
  likes: number
  views: number
}

/** A piece inside an author's `nftCollection` array. */
export type AuthorNft = {
  id: number
  nftImage: string
  nftId: number
  title: string
  price: number
  likes: number
}

/** Profile payload from `/authors`. */
export type AuthorProfile = {
  id: number
  authorName: string
  tag: string
  address: string
  authorImage: string
  authorId: number
  followers: number
  nftCollection: AuthorNft[]
}

/** Sort keys the explore endpoint actually understands. */
export type ExploreFilter =
  | "price_low_to_high"
  | "price_high_to_low"
  | "likes_high_to_low"
