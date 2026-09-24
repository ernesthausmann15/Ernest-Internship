"use client"

/**
 * AuthorView
 *
 * What: Profile header plus the author's created pieces.
 * Why: A creator page should show who they are and what they published,
 *      using the `/authors` payload rather than hardcoded "Monica Lucas" cards.
 * How: The server page fetches the profile and passes it in. This client
 *      view owns three interactions the API cannot save:
 *      copying the wallet address, toggling Follow, and likes on each card.
 *      Tabs split the collection from a stats summary built only from real fields.
 */

import { useState } from "react"
import { BadgeCheck, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NftImage } from "@/components/media/nft-image"
import { NftCard } from "@/components/nft/nft-card"
import { shortenAddress } from "@/lib/format"
import type { AuthorProfile } from "@/lib/types"

export function AuthorView({ author }: { author: AuthorProfile }) {
  const [copied, setCopied] = useState(false)
  const [following, setFollowing] = useState(false)

  async function copyAddress() {
    await navigator.clipboard.writeText(author.address)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const followerCount = author.followers + (following ? 1 : 0)

  return (
    <div>
      <div className="relative h-48 overflow-hidden bg-linear-to-r from-primary/40 via-fuchsia-500/20 to-cyan-400/30 sm:h-64">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,white,transparent_35%)] opacity-20" />
      </div>

      <div className="page-wrap">
        <div className="-mt-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div className="relative size-28 overflow-hidden rounded-full ring-4 ring-background">
              <NftImage src={author.authorImage} alt={author.authorName} sizes="112px" />
              <BadgeCheck className="absolute right-1 bottom-1 size-6 rounded-full bg-background text-primary" />
            </div>
            <div className="pb-1">
              <h1 className="font-heading text-3xl font-semibold">{author.authorName}</h1>
              <p className="text-primary">@{author.tag}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="font-mono">
                  {shortenAddress(author.address)}
                </Badge>
                <Button variant="ghost" size="sm" onClick={copyAddress}>
                  <Copy />
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pb-1">
            <p className="text-sm text-muted-foreground">{followerCount} followers</p>
            <Button className="h-9 px-4" onClick={() => setFollowing((value) => !value)}>
              {following ? "Following" : "Follow"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="created" className="mt-10">
          <TabsList>
            <TabsTrigger value="created">Created</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="created" className="pt-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {author.nftCollection.map((nft) => (
                <NftCard
                  key={nft.nftId}
                  item={{
                    nftId: nft.nftId,
                    title: nft.title,
                    nftImage: nft.nftImage,
                    price: nft.price,
                    likes: nft.likes,
                    authorId: author.authorId,
                    authorName: author.authorName,
                    authorImage: author.authorImage,
                  }}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="about" className="max-w-2xl pt-6 text-muted-foreground">
            <p>
              {author.authorName} has {author.nftCollection.length} pieces in this
              collection and {author.followers} followers on Ultraverse.
            </p>
            <p className="mt-4 break-all font-mono text-xs text-foreground/80">{author.address}</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
