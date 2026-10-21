function MovieRowSkeleton() {
  return (
    <div className="flex animate-pulse items-center justify-between gap-3 border-b border-slate-200 px-4 py-2.5 dark:border-[#112a46]">
      {/* Movie */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Index */}
        <div className="h-7 w-7 shrink-0 rounded-[5px] bg-violet-100 dark:bg-[#1a2452]" />

        {/* Poster */}
        <div className="h-10 w-7 shrink-0 rounded-[3px] bg-slate-200 dark:bg-[#26364d]" />

        {/* Title */}
        <div className="h-3 w-40 rounded-full bg-slate-200 dark:bg-[#26364d] sm:w-56" />
      </div>

      {/* Year */}
      <div className="hidden w-20 md:block">
        <div className="h-3 w-10 rounded-full bg-slate-200 dark:bg-[#26364d]" />
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1.5">
        <div className="h-3 w-3 rounded-full bg-amber-100 dark:bg-[#3a3b42]" />
        <div className="h-3 w-7 rounded-full bg-slate-200 dark:bg-[#26364d]" />
      </div>

      {/* Actions */}
      <div className="flex w-40 items-center justify-end gap-1">
        <div className="h-7 w-7 rounded-[5px] bg-slate-200 dark:bg-[#26364d]" />
      </div>
    </div>
  );
}

export default function MovieRowSkeletonList({ count = 8 }) {
  return (
    <div>
      {Array.from({ length: count }, (_, index) => (
        <MovieRowSkeleton key={index} />
      ))}
    </div>
  );
}