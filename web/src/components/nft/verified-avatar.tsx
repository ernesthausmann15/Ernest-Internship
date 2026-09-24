/**
 * VerifiedAvatar
 *
 * What: Round author photo with a check badge.
 * Why: Every list in the marketplace repeats this mark. One component
 *      keeps the size and the verified icon consistent.
 * How: shadcn Avatar draws the image. The check sits in AvatarBadge.
 *      Callers pass `href` when the avatar should open a profile.
 */

import Link from "next/link"
import { BadgeCheck } from "lucide-react"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type VerifiedAvatarProps = {
  src: string
  name: string
  href?: string
  className?: string
  size?: "default" | "sm" | "lg"
}

export function VerifiedAvatar({
  src,
  name,
  href,
  className,
  size = "default",
}: VerifiedAvatarProps) {
  const avatar = (
    <Avatar size={size} className={className}>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
      <AvatarBadge className="bg-primary text-primary-foreground">
        <BadgeCheck className="size-2.5" />
      </AvatarBadge>
    </Avatar>
  )

  if (!href) return avatar

  return (
    <Link href={href} aria-label={`View ${name}`} className="rounded-full">
      {avatar}
    </Link>
  )
}
