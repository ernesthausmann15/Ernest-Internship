"use client"

/**
 * useLikes
 *
 * What: Local like toggle for a single NFT.
 * Why: The explore API is read-only. It gives us a starting count, but
 *      there is no endpoint to save a like. We keep the user's choice in
 *      localStorage so a refresh does not forget it.
 * How: On mount we read the saved id list. `toggle` flips membership and
 *      writes the list back. The displayed count is the API number plus
 *      one when this browser has liked the piece.
 */

import { useEffect, useState } from "react"

const STORAGE_KEY = "ultraverse-liked-nfts"

function readIds(): number[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed)
      ? parsed.filter((id) => typeof id === "number")
      : []
  } catch {
    return []
  }
}

function writeIds(ids: number[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

export function useLikes(nftId: number, initialLikes: number) {
  const [liked, setLiked] = useState(false)
  // Stay false until localStorage is read, so server HTML and the first
  // client render agree (both show the API count, not the saved like).
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setLiked(readIds().includes(nftId))
    setHydrated(true)
  }, [nftId])

  function toggle() {
    setLiked((current) => {
      const next = !current
      const ids = readIds()
      writeIds(
        next ? Array.from(new Set([...ids, nftId])) : ids.filter((id) => id !== nftId)
      )
      return next
    })
  }

  const likes = initialLikes + (hydrated && liked ? 1 : 0)

  return { liked: hydrated && liked, likes, toggle }
}
