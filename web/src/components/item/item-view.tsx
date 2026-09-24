"use client"

/**
 * ItemView
 *
 * What: The detail layout for one NFT.
 * Why: Collectors need the image, story, price, and the people attached
 *      to the piece. The list cards are too small for that.
 * How: The server fetches `/itemDetails?nftId=` and passes the object here.
 *      Likes reuse the same hook as the grid, so a heart tap on the card
 *      and on this page stay in agreement through localStorage.
 *      Owner and creator link to their author routes.
 */

import Link from "next/link"
import { Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { NftImage } from "@/components/media/nft-image"
import { VerifiedAvatar } from "@/components/nft/verified-avatar"
import { LikeButton } from "@/components/nft/like-button"
import { formatEth } from "@/lib/format"
import type { ItemDetails } from "@/lib/types"

function PersonRow({
  label,
  name,
  image,
  authorId,
}: {
  label: string
  name: string
  image: string
  authorId: number
}) {
  return (
    <div>
      <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">{label}</p>
      <Link href={`/author/${authorId}`} className="mt-2 flex items-center gap-3 hover:text-primary">
        <VerifiedAvatar src={image} name={name} size="lg" />
        <span className="font-medium">{name}</span>
      </Link>
    </div>
  )
}

export function ItemView({ item }: { item: ItemDetails }) {
  return (
    <article className="page-wrap grid items-start gap-10 py-12 lg:grid-cols-2">
      <div className="glow-card relative aspect-square overflow-hidden rounded-[2rem] bg-card ring-1 ring-foreground/10">
        <NftImage
          src={item.nftImage}
          alt={item.title}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div>
        <Badge variant="secondary">#{item.tag}</Badge>
        <h1 className="font-heading mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {item.title}
        </h1>

        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Eye className="size-4" />
            {item.views} views
          </span>
          <LikeButton nftId={item.nftId} initialLikes={item.likes} />
        </div>

        <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">{item.description}</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <PersonRow
            label="Owner"
            name={item.ownerName}
            image={item.ownerImage}
            authorId={item.ownerId}
          />
          <PersonRow
            label="Creator"
            name={item.creatorName}
            image={item.creatorImage}
            authorId={item.creatorId}
          />
        </div>

        <Separator className="my-8" />

        <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Price</p>
        <p className="font-heading mt-2 text-4xl text-primary">{formatEth(item.price)}</p>
      </div>
    </article>
  )
}
