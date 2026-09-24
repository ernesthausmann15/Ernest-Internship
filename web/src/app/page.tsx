/**
 * Home page.
 *
 * What: The marketplace landing route at `/`.
 * Why: Collections and new listings are the two visual sections so far.
 *      Seller names stay a plain list until the ranking branch.
 * How: The page itself is synchronous. Each async child fetches inside
 *      Suspense, so one slow request does not blank the other section.
 *      A failed request renders an empty section instead of crashing the page.
 */

import { Suspense } from "react"
import { HotCollections } from "@/components/home/hot-collections"
import { NewItems } from "@/components/home/new-items"
import { SectionSkeleton } from "@/components/layout/section-skeleton"
import { getExploreItems, getHotCollections, getTopSellers } from "@/lib/api"
import { formatEth } from "@/lib/format"

async function HotCollectionsSection() {
  try {
    const collections = await getHotCollections()
    return <HotCollections collections={collections} />
  } catch {
    return <HotCollections collections={[]} />
  }
}

async function NewItemsSection() {
  try {
    const items = await getExploreItems()
    return <NewItems items={items.slice(0, 8)} />
  } catch {
    return <NewItems items={[]} />
  }
}

async function SellersReadout() {
  try {
    const sellers = await getTopSellers()
    return (
      <section className="page-wrap pb-16">
        <h2 className="font-heading text-lg">Top sellers ({sellers.length})</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {sellers.map((seller) => (
            <li key={seller.id}>
              {seller.authorName} · {formatEth(seller.price)}
            </li>
          ))}
        </ul>
      </section>
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : "The NFT API could not be reached."
    return (
      <div className="page-wrap pb-16">
        <p className="text-destructive">{message}</p>
      </div>
    )
  }
}

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<SectionSkeleton title="Hot Collections" />}>
        <HotCollectionsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton title="New Items" count={8} />}>
        <NewItemsSection />
      </Suspense>
      <Suspense fallback={null}>
        <SellersReadout />
      </Suspense>
    </>
  )
}
