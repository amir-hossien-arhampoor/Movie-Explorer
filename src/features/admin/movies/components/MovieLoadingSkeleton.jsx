function MovieSkeleton() {
  return (
    <div className="min-w-0 animate-pulse">
      {/* Movie poster */}
      <div className="aspect-2/3 w-full rounded-lg bg-linear-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-[#26364d] dark:via-[#1c2b40] dark:to-[#172438]" />

      {/* Movie title */}
      <div className="mt-3 h-4 w-4/5 rounded-full bg-slate-200 dark:bg-[#293a53]" />

      {/* Metadata */}
      <div className="mt-3 flex items-center gap-2">
        <div className="h-3.5 w-1/2 rounded-full bg-slate-200 dark:bg-[#293a53]" />
        <div className="h-3.5 w-3.5 rounded-full bg-slate-200 dark:bg-[#293a53]" />
      </div>
    </div>
  );
}

export default function MovieSkeletonGrid({ count = 12 }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }, (_, index) => (
        <MovieSkeleton key={index} />
      ))}
    </div>
  );
}