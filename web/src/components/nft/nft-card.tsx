"use client"

/**
 * NftCard
 *
 * What: The card used by New Items, Explore, and author collections.
 * Why: Those three screens show the same facts (image, creator, price,
 *      likes, optional auction timer). One card keeps them in sync.
 * How: The server passes a plain object. This file is a Client Component
 *      because the timer and the like button need state. Links go to the
 *      item page and, when we know the author, to their profile.
 */

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { NftImage } from "@/components/media/nft-image"
import { VerifiedAvatar } from "@/components/nft/verified-avatar"
import { CountdownBadge } from "@/components/nft/countdown-badge"
import { LikeButton } from "@/components/nft/like-button"
import { formatEth } from "@/lib/format"

export type NftCardData = {
  nftId: number
  title: string
  nftImage: string
  price: number
  likes: number
  authorId?: number
  authorName?: string
  authorImage?: string
  expiryDate?: number | null
}

export function NftCard({ item }: { item: NftCardData }) {
  const authorHref = item.authorId ? `/author/${item.authorId}` : undefined

  return (
    <Card className="glow-card group gap-0 overflow-hidden border-0 bg-card/80 py-0 ring-foreground/10">
      <div className="relative">
        <Link
          href={`/item/${item.nftId}`}
          className="relative block aspect-square overflow-hidden"
        >
          <NftImage
            src={item.nftImage}
            alt={item.title}
            className="transition duration-700 group-hover:scale-105"
          />
        </Link>

        {item.expiryDate ? (
          <CountdownBadge
            expiryDate={item.expiryDate}
            className="pointer-events-none absolute top-3 right-3"
          />
        ) : null}

        {item.authorImage ? (
          <div className="absolute -bottom-4 left-4">
            <VerifiedAvatar
              src={item.authorImage}
              name={item.authorName ?? "Creator"}
              href={authorHref}
              className="size-12 ring-2 ring-background"
            />
          </div>
        ) : null}
      </div>

      <CardContent className="flex items-end justify-between gap-3 px-4 pt-7 pb-4">
        <div className="min-w-0">
          <Link href={`/item/${item.nftId}`} className="block truncate font-medium hover:text-primary">
            {item.title}
          </Link>
          <p className="mt-1 text-sm text-primary">{formatEth(item.price)}</p>
        </div>
        <LikeButton nftId={item.nftId} initialLikes={item.likes} />
      </CardContent>
    </Card>
  )
}
