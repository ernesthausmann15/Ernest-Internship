import { SectionSkeleton } from "@/components/layout/section-skeleton"

export default function Loading() {
  return (
    <div className="py-8">
      <SectionSkeleton title="Explore" count={8} />
    </div>
  )
}
