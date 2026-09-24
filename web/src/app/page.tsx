/**
 * Home page.
 *
 * What: The marketplace landing route at `/`.
 * Why: Collections, new listings, and the seller ranking are separate
 *      requests. Each one should be able to finish on its own.
 * How: The page itself is synchronous. Each async child fetches inside
 *      Suspense, so one slow request does not blank the other section.
 *      A failed request renders an empty section instead of crashing the page.
 *      `dynamic` keeps the lists live on Vercel instead of freezing them
 *      at build time.
 */

import { Suspense } from "react"
import { HotCollections } from "@/components/home/hot-collections"
import { NewItems } from "@/components/home/new-items"
import { TopSellers } from "@/components/home/top-sellers"
import { SectionSkeleton } from "@/components/layout/section-skeleton"
import { getExploreItems, getHotCollections, getTopSellers } from "@/lib/api"

export const dynamic = "force-dynamic"

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

async function TopSellersSection() {
  try {
    const sellers = await getTopSellers()
    return <TopSellers sellers={sellers} />
  } catch {
    return <TopSellers sellers={[]} />
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
      <Suspense fallback={<SectionSkeleton title="Top Sellers" count={6} />}>
        <TopSellersSection />
      </Suspense>
    </>
  )
}
