import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"

export default function NotFound() {
  return (
    <div className="page-wrap flex min-h-[50vh] flex-col items-start justify-center py-24">
      <p className="text-xs tracking-[0.22em] text-primary uppercase">404</p>
      <h1 className="font-heading mt-3 text-4xl font-semibold">That page is not in the catalog.</h1>
      <p className="mt-3 text-muted-foreground">The item or creator id did not match a live record.</p>
      <Link href="/explore" className={cn(buttonVariants(), "mt-6 h-9 px-4")}>
        Back to explore
      </Link>
    </div>
  )
}
