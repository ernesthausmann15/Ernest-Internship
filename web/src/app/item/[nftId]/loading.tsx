import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="page-wrap grid gap-10 py-12 lg:grid-cols-2">
      <Skeleton className="aspect-square rounded-[2rem]" />
      <div className="space-y-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-14 w-3/4" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-16 w-40" />
      </div>
    </div>
  )
}
