"use client"

/**
 * SiteHeader
 *
 * What: Sticky navigation shared by every page.
 * Why: Search, Explore, and the wallet prompt should stay available
 *      without repeating markup in each route.
 * How: The search form submits with GET to `/explore?q=`, so the explore
 *      page can read the query on the server. The wallet dialog is local UI
 *      state because this demo has no wallet provider. The box starts empty;
 *      the explore page reads `q` from the URL after the form submits.
 */

import { useState } from "react"
import Link from "next/link"
import { Menu, Search, Wallet } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "cn"

const links = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <div className="page-wrap flex h-16 items-center gap-4">
        <Link href="/" className="font-heading text-lg font-semibold tracking-[0.18em]">
          ULTRAVERSE
        </Link>

        <form action="/explore" className="relative mx-auto hidden w-full max-w-md md:block">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="q"
            placeholder="Search items"
            aria-label="Search items"
            className="h-9 pl-8"
          />
        </form>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(buttonVariants({ variant: "ghost" }), "h-8 px-3")}
            >
              {link.label}
            </Link>
          ))}
          <WalletDialog />
        </nav>

        <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
          <DialogTrigger
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "ml-auto md:hidden")}
            aria-label="Open menu"
          >
            <Menu />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Menu</DialogTitle>
              <DialogDescription>Jump to a section of the marketplace.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(buttonVariants({ variant: "outline" }), "h-9 justify-start")}
                >
                  {link.label}
                </Link>
              ))}
              <WalletDialog />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}

function WalletDialog() {
  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants({ size: "lg" }), "h-8 px-3")}>
        <Wallet />
        Connect wallet
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Wallet connection is a preview</DialogTitle>
          <DialogDescription>
            Ultraverse reads public marketplace data. Signing in with a wallet
            is not wired up in this demo, so nothing is requested from your browser.
          </DialogDescription>
        </DialogHeader>
        <Button variant="outline" className="h-9" disabled>
          No wallet provider configured
        </Button>
      </DialogContent>
    </Dialog>
  )
}
