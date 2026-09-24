/**
 * Home page.
 *
 * What: The marketplace landing route at `/`.
 * Why: Hot Collections is the first visual section. Seller and item
 *      titles stay as a plain readout until their own branches.
 * How: The page itself is synchronous. The carousel fetch sits in Suspense,
 *      so the seller and item lists can paint while collections are loading.
 *      A failed collections request renders an empty carousel instead of
 *      crashing the rest of the page.
 */

import { Suspense } from "react"
import { HotCollections } from "@/components/home/hot-collections"
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

async function CatalogReadout() {
  let sellers: Awaited<ReturnType<typeof getTopSellers>> = []
  let items: Awaited<ReturnType<typeof getExploreItems>> = []
  let errorMessage: string | null = null

  try {
    ;[sellers, items] = await Promise.all([getTopSellers(), getExploreItems()])
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "The NFT API could not be reached."
  }

  if (errorMessage) {
    return (
      <div className="page-wrap pb-16">
        <p className="text-destructive">{errorMessage}</p>
      </div>
    )
  }

  return (
    <div className="page-wrap grid gap-8 pb-16 md:grid-cols-2">
      <section>
        <h2 className="font-heading text-lg">Top sellers ({sellers.length})</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {sellers.map((seller) => (
            <li key={seller.id}>
              {seller.authorName} · {formatEth(seller.price)}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="font-heading text-lg">Explore items ({items.length})</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {items.map((item) => (
            <li key={item.id}>
              {item.title} · {formatEth(item.price)}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<SectionSkeleton title="Hot Collections" />}>
        <HotCollectionsSection />
      </Suspense>
      <Suspense fallback={null}>
        <CatalogReadout />
      </Suspense>
    </>
  )
}
