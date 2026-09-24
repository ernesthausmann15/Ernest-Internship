"use client"

/**
 * HotCollections
 *
 * What: Draggable carousel of trending collections.
 * Why: A slider shows more collections than a single row, and keen-slider
 *      handles mouse and touch dragging without a heavy carousel framework.
 * How: The home page fetches `/hotCollections` on the server and passes the
 *      array in. `useKeenSlider` measures the slides in the browser.
 *      Breakpoints change how many cards are visible as the window grows.
 *      Cover art links to the featured item. The avatar and title link to the author.
 */

import Link from "next/link"
import { useKeenSlider } from "keen-slider/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "keen-slider/keen-slider.min.css"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NftImage } from "@/components/media/nft-image"
import { VerifiedAvatar } from "@/components/nft/verified-avatar"
import { SectionHeading } from "@/components/layout/section-heading"
import { formatCollectionCode } from "@/lib/format"
import type { HotCollection } from "@/lib/types"

export function HotCollections({ collections }: { collections: HotCollection[] }) {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: collections.length > 1,
    slides: { perView: 1.15, spacing: 16 },
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 2.1, spacing: 18 } },
      "(min-width: 1024px)": { slides: { perView: 3.15, spacing: 20 } },
      "(min-width: 1280px)": { slides: { perView: 4, spacing: 22 } },
    },
  })

  return (
    <section id="collections" className="page-wrap py-16">
      <SectionHeading eyebrow="Trending" title="Hot Collections" />

      {collections.length === 0 ? (
        <p className="text-muted-foreground">Collections are unavailable right now.</p>
      ) : (
        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {collections.map((collection) => (
              <div key={collection.id} className="keen-slider__slide">
                <Card className="glow-card gap-0 overflow-hidden border-0 bg-card/80 py-0">
                  <Link
                    href={`/item/${collection.nftId}`}
                    className="relative block aspect-[4/3] overflow-hidden"
                  >
                    <NftImage
                      src={collection.nftImage}
                      alt={collection.title}
                      className="transition duration-700 hover:scale-105"
                    />
                  </Link>
                  <CardContent className="relative px-4 pt-8 pb-4">
                    <div className="absolute -top-5 left-4">
                      <VerifiedAvatar
                        src={collection.authorImage}
                        name={collection.title}
                        href={`/author/${collection.authorId}`}
                        className="size-12 ring-2 ring-background"
                      />
                    </div>
                    <Link
                      href={`/author/${collection.authorId}`}
                      className="font-heading text-lg hover:text-primary"
                    >
                      {collection.title}
                    </Link>
                    <Badge variant="secondary" className="mt-2">
                      {formatCollectionCode(collection.code)}
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Previous collections"
              onClick={() => slider.current?.prev()}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Next collections"
              onClick={() => slider.current?.next()}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}
