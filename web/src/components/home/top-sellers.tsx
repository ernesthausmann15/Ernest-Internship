/**
 * TopSellers
 *
 * What: Ranked list of creators and their ETH volume.
 * Why: Collectors scan people, not only pieces. A numbered list is easier
 *      to read than another card grid.
 * How: The server fetches `/topSellers` already ordered by the API.
 *      `index + 1` is the rank. Each row links to `/author/[authorId]`.
 */

import Link from "next/link"
import { VerifiedAvatar } from "@/components/nft/verified-avatar"
import { SectionHeading } from "@/components/layout/section-heading"
import { formatEth } from "@/lib/format"
import type { TopSeller } from "@/lib/types"
import { cn } from "cn"

export function TopSellers({ sellers }: { sellers: TopSeller[] }) {
  return (
    <section id="top-sellers" className="page-wrap py-16">
      <SectionHeading eyebrow="Leaderboard" title="Top Sellers" />

      {sellers.length === 0 ? (
        <p className="text-muted-foreground">Seller rankings are unavailable right now.</p>
      ) : (
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sellers.map((seller, index) => {
            const rank = index + 1
            return (
              <li key={seller.authorId}>
                <Link
                  href={`/author/${seller.authorId}`}
                  className="glow-card flex items-center gap-4 rounded-xl bg-card/70 px-4 py-3 ring-1 ring-foreground/10"
                >
                  <span
                    className={cn(
                      "w-6 font-heading text-lg text-muted-foreground",
                      rank <= 3 && "text-primary"
                    )}
                  >
                    {rank}
                  </span>
                  <VerifiedAvatar
                    src={seller.authorImage}
                    name={seller.authorName}
                    size="lg"
                  />
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{seller.authorName}</span>
                    <span className="text-sm text-primary">{formatEth(seller.price)}</span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      )}
    </section>
  )
}
