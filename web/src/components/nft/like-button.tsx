"use client"

/**
 * LikeButton
 *
 * What: Heart control that shows a live like count.
 * Why: Liking is an interaction, so it cannot live in a Server Component.
 * How: `useLikes` starts from the API count and adds this browser's like.
 *      `stopPropagation` keeps a click from also opening a parent link.
 */

import { Heart } from "lucide-react"
import { useLikes } from "@/hooks/use-likes"
import { cn } from "cn"

export function LikeButton({
  nftId,
  initialLikes,
  className,
}: {
  nftId: number
  initialLikes: number
  className?: string
}) {
  const { liked, likes, toggle } = useLikes(nftId, initialLikes)

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggle()
      }}
      aria-pressed={liked}
      aria-label={liked ? "Unlike" : "Like"}
      className={cn(
        "inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
        liked && "text-rose-400",
        className
      )}
    >
      <Heart className={cn("size-4", liked && "fill-current")} />
      <span>{likes}</span>
    </button>
  )
}
