import { Skeleton } from "@/components/skeleton"
function SkeletonLoading() {
  return (
    <div className="w-52 dark:bg-[#08121e] p-2 rounded-[10px] border-2 dark:border-[#0e1c2e] self-start">

      {/* Poster */}
      <div className="w-full h-51 relative">
        <Skeleton className="w-full h-[95%] rounded-[10px] dark:bg-[#0f2238]" />

        {/* Favorite button */}
        <Skeleton className="absolute top-2 right-2 w-8 h-8 rounded-2xl dark:bg-[#0f2238]" />
      </div>

      {/* Movie information */}
      <div>
        {/* Title */}
        <Skeleton className="h-4 w-[85%] rounded-md mb-2 dark:bg-[#0f2238]" />

        {/* Year + Runtime */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-8 rounded-md dark:bg-[#0f2238]" />
          <Skeleton className="w-1 h-1 rounded-full dark:bg-[#0f2238]" />
          <Skeleton className="h-3 w-12 rounded-md dark:bg-[#0f2238]" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <Skeleton className="w-3.25 h-3.25 rounded-full dark:bg-[#0f2238]" />
          <Skeleton className="h-3 w-7 rounded-md dark:bg-[#0f2238]" />
        </div>

        {/* Genres */}
        <div className="flex gap-1 mt-2">
          <Skeleton className="h-5 w-14 rounded-[11px] dark:bg-[#0f2238]" />
          <Skeleton className="h-5 w-16 rounded-[11px] dark:bg-[#0f2238]" />
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="mt-3">
        <div className="flex gap-1">
          {/* View Details */}
          <Skeleton className="flex-1 h-8 rounded-[9px] dark:bg-[#0f2238]" />

          {/* More button */}
          <Skeleton className="w-8 h-8 rounded-[7px] dark:bg-[#0f2238]" />
        </div>
      </div>

    </div>
  )
}

export default SkeletonLoading