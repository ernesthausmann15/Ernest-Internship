/**
 * Small display helpers.
 *
 * What: Turns raw API numbers into the strings people actually read.
 * Why: Formatting belongs next to the data, not copied into every card.
 * How: Pure functions. They do not fetch and they do not touch React state.
 */

/** `5.4` becomes `5.40 ETH`. */
export function formatEth(price: number): string {
  return `${price.toFixed(2)} ETH`
}

/** Collection `code: 192` becomes the label `ERC-192`. */
export function formatCollectionCode(code: number): string {
  return `ERC-${code}`
}

/**
 * Milliseconds remaining until an auction ends, broken into clock parts.
 * Returns null when there is no deadline. Returns `expired` once the
 * timestamp is in the past so the badge can say "Ended".
 */
export function getCountdownParts(expiryDate: number | null, now: number) {
  if (!expiryDate) return null

  const remaining = expiryDate - now
  if (remaining <= 0) {
    return { expired: true as const, label: "Ended" }
  }

  const totalSeconds = Math.floor(remaining / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const pad = (value: number) => String(value).padStart(2, "0")

  return {
    expired: false as const,
    label: `${hours}h ${pad(minutes)}m ${pad(seconds)}s`,
  }
}

/** Shorten a wallet address so the profile header stays on one line. */
export function shortenAddress(address: string): string {
  if (address.length <= 16) return address
  return `${address.slice(0, 8)}…${address.slice(-6)}`
}
