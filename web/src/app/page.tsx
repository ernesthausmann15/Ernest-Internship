/**
 * Home page.
 *
 * What: A plain readout of the three list endpoints.
 * Why: This branch only proves the API client. Carousels, grids, and
 *      profile pages are later commits, so they are not imported here.
 * How: The server calls the three list functions together with
 *      `Promise.all`. Each function returns typed JSON. This page prints
 *      titles and prices. It does not sort, like, or count down.
 */

import { getExploreItems, getHotCollections, getTopSellers } from "@/lib/api"
import { formatEth } from "@/lib/format"

export default async function HomePage() {
  // One failed request should not invent empty data. Show the error instead.
  let collections: Awaited<ReturnType<typeof getHotCollections>> = []
  let sellers: Awaited<ReturnType<typeof getTopSellers>> = []
  let items: Awaited<ReturnType<typeof getExploreItems>> = []
  let errorMessage: string | null = null

  try {
    ;[collections, sellers, items] = await Promise.all([
      getHotCollections(),
      getTopSellers(),
      getExploreItems(),
    ])
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "The NFT API could not be reached."
  }

  return (
    <div className="page-wrap py-16">
      <p className="text-sm tracking-[0.2em] text-primary uppercase">API setup</p>
      <h1 className="font-heading mt-3 text-4xl font-semibold">Live marketplace data</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        These lists come straight from the Cloud Functions. Later parts turn them
        into the carousel, the explore grid, and the seller ranking.
      </p>

      {errorMessage ? (
        <p className="mt-8 text-destructive">{errorMessage}</p>
      ) : (
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <section>
            <h2 className="font-heading text-lg">Hot collections ({collections.length})</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {collections.map((collection) => (
                <li key={collection.id}>{collection.title}</li>
              ))}
            </ul>
          </section>
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
      )}
    </div>
  )
}
