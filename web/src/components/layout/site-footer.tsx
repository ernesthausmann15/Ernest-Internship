/**
 * SiteFooter
 *
 * What: Closing links and the newsletter field.
 * Why: Marketplace, resource, and community links match the original
 *      information architecture without the old Bootstrap grid.
 * How: The columns are static. Only the email form is interactive,
 *      and it is isolated in `NewsletterForm`. Column links open Explore.
 */

import Link from "next/link"
import { NewsletterForm } from "@/components/layout/newsletter-form"

const columns = [
  {
    title: "Marketplace",
    links: ["All NFTs", "Art", "Music", "Domain Names", "Virtual World", "Collectibles"],
  },
  {
    title: "Resources",
    links: ["Help Center", "Partners", "Suggestions", "Discord", "Docs", "Newsletter"],
  },
  {
    title: "Community",
    links: ["Community", "Documentation", "Brand Assets", "Blog", "Forum", "Mailing List"],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="page-wrap grid gap-10 py-14 md:grid-cols-4">
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="font-heading text-sm tracking-wide">{column.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {column.links.map((label) => (
                <li key={label}>
                  <Link href="/explore" className="hover:text-foreground">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="font-heading text-sm tracking-wide">Newsletter</h2>
          <p className="mt-4 mb-4 text-sm text-muted-foreground">
            New drops and collector notes. No spam.
          </p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="page-wrap flex items-center justify-between py-5 text-sm text-muted-foreground">
          <Link href="/" className="font-heading tracking-[0.16em] text-foreground">
            ULTRAVERSE
          </Link>
          <p>© {new Date().getFullYear()} Ultraverse</p>
        </div>
      </div>
    </footer>
  )
}
