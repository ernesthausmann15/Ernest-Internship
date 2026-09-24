/**
 * NftImage
 *
 * What: Renders an NFT or avatar picture from the API.
 * Why: Most files are remote JPGs that Next.js can optimize. A few creator
 *      portraits arrive as base64 data URIs, which the optimizer cannot fetch.
 * How: Data URIs use a plain `<img>`. Everything else uses `next/image`
 *      with `fill`, so the parent box decides the size.
 */

import Image from "next/image"
import { cn } from "cn"

type NftImageProps = {
  src: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
}

export function NftImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 25vw",
}: NftImageProps) {
  if (!src) return null

  // Animated WebP and GIF files must skip the optimizer or the motion is stripped.
  const animated = /\.(webp|gif)(\?|$)/i.test(src)

  if (src.startsWith("data:")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={cn("h-full w-full object-cover", className)} />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized={animated}
      priority={priority}
      sizes={sizes}
      className={cn("object-cover", className)}
    />
  )
}
