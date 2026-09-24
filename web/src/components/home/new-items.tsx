/**
 * NewItems
 *
 * What: A responsive grid of the latest explore listings.
 * Why: The home page should preview fresh pieces with prices, likes, and
 *      auction timers without making the visitor open Explore first.
 * How: The server loads `/explore` and passes the first eight items here.
 *      Each `NftCard` is a client island for the countdown and like button.
 *      "View all" opens the full explore grid, which can re-sort the same API.
 */

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { NftCard } from "@/components/nft/nft-card"
import { SectionHeading } from "@/components/layout/section-heading"
import type { ExploreItem } from "@/lib/types"
import { cn } from "cn"

export function NewItems({ items }: { items: ExploreItem[] }) {
  return (
    <section id="new-items" className="page-wrap py-8">
      <SectionHeading
        eyebrow="Just listed"
        title="New Items"
        action={
          <Link href="/explore" className={cn(buttonVariants({ variant: "outline" }), "h-8")}>
            View all
          </Link>
        }
      />

      {items.length === 0 ? (
        <p className="text-muted-foreground">New items are unavailable right now.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
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
    </section>
  )
}
