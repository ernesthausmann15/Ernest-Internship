/**
 * Item details page.
 *
 * What: Dynamic piece page at `/item/[nftId]`.
 * Why: Cards link here so pricing, views, owner, and creator have room.
 * How: Same pattern as the author route: await the id, fetch details,
 *      render a 404 when the id is unknown.
 */

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ItemView } from "@/components/item/item-view"
import { getItemDetails } from "@/lib/api"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ nftId: string }>
}): Promise<Metadata> {
  const { nftId } = await params
  const item = await getItemDetails(nftId)
  return {
    title: item?.title ?? "Item",
    description: item?.description,
  }
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ nftId: string }>
}) {
  const { nftId } = await params
  const item = await getItemDetails(nftId)
  if (!item) notFound()
  return <ItemView item={item} />
}
