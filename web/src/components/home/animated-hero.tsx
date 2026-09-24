/**
 * AnimatedHero
 *
 * What: The opening band on the home page, with a headline, two actions,
 *       and a featured NFT card.
 * Why: Visitors should understand the marketplace and have a way into
 *      Explore before the live lists finish loading.
 * How: This is a Server Component. Motion is CSS only, so the first paint
 *      does not wait on JavaScript. Orbs drift behind the type. The card
 *      floats on an outer wrapper, and the inner card still lifts on hover.
 */

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"

export function AnimatedHero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="hero-orb absolute -top-28 -left-20 size-[28rem] rounded-full bg-violet-600/45 blur-3xl" />
        <div className="hero-orb hero-orb-slow absolute top-1/4 -right-24 size-[24rem] rounded-full bg-cyan-400/30 blur-3xl" />
        <div className="hero-orb absolute bottom-[-6rem] left-1/3 size-80 rounded-full bg-fuchsia-500/25 blur-3xl" />
      </div>

      <div className="page-wrap relative grid items-center gap-14 py-16 md:min-h-[calc(100vh-4rem)] md:grid-cols-[1.15fr_0.85fr] md:py-24">
        <div>
          <p className="text-xs font-medium tracking-[0.28em] text-violet-300 uppercase">
            Ultraverse Market
          </p>
          <h1 className="font-heading mt-5 max-w-xl text-5xl leading-[0.95] font-semibold tracking-tight sm:text-7xl">
            Create, sell, or collect digital items.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-300">
            A dark room for live drops. Browse verified creators, timed
            auctions, and collections pulled from the marketplace.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/explore"
              className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
            >
              Explore drops
              <ArrowRight />
            </Link>
            <Link
              href="#top-sellers"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 border-white/15 bg-white/5 px-5 text-white hover:bg-white/10 hover:text-white"
              )}
            >
              Meet sellers
            </Link>
          </div>
        </div>

        <div className="hero-float relative mx-auto w-full max-w-sm">
          <div
            className="absolute -inset-8 rounded-[2.5rem] bg-violet-500/25 blur-3xl"
            aria-hidden="true"
          />
          <article className="glow-card relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/75 shadow-2xl shadow-violet-950/40 backdrop-blur-md">
            <div className="relative h-64">
              <div className="absolute inset-0 bg-[conic-gradient(from_140deg_at_30%_40%,#fb7185,#7c3aed_38%,#22d3ee_72%,#facc15)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,white,transparent_32%)] opacity-35" />
              <p className="absolute top-4 left-4 rounded-full bg-slate-950/70 px-3 py-1 text-xs tracking-[0.16em] uppercase backdrop-blur">
                Featured
              </p>
            </div>
            <div className="space-y-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-heading text-2xl">Aurora Marble</h2>
                  <p className="mt-1 text-sm text-slate-400">by Ultraverse</p>
                </div>
                <p className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-slate-200">
                  ERC-192
                </p>
              </div>
              <div className="flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                <div>
                  <p className="text-xs tracking-[0.14em] text-slate-400 uppercase">
                    Current bid
                  </p>
                  <p className="mt-1 text-xl text-violet-200">2.48 ETH</p>
                </div>
                <Link
                  href="/explore"
                  className={cn(buttonVariants({ size: "sm" }), "h-8 px-3")}
                >
                  View drop
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
