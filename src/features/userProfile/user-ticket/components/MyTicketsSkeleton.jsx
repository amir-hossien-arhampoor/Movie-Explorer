
function SkeletonBlock({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-[#1b2a40] ${className}`}
    />
  );
}

function TicketRowSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 border-b border-[#1c2d45] px-5 py-5 last:border-b-0 sm:px-6 lg:grid-cols-[minmax(220px,2fr)_minmax(125px,1fr)_minmax(125px,1fr)_minmax(100px,0.8fr)_minmax(145px,1fr)_auto] lg:items-center lg:gap-5">
      {/* Subject */}
      <div className="flex items-start gap-4">
        <SkeletonBlock className="h-12 w-12 shrink-0 rounded-xl" />

        <div className="min-w-0 flex-1 space-y-3 py-1">
          <SkeletonBlock className="h-4 w-3/4" />
          <SkeletonBlock className="h-3 w-2/3" />
        </div>
      </div>

      {/* Category */}
      <div className="flex items-center gap-2">
        <SkeletonBlock className="h-5 w-5 rounded-full" />
        <SkeletonBlock className="h-4 w-24" />
      </div>

      {/* Status */}
      <SkeletonBlock className="h-8 w-24 rounded-full" />

      {/* Priority */}
      <SkeletonBlock className="h-8 w-20 rounded-full" />

      {/* Date */}
      <div className="space-y-2">
        <SkeletonBlock className="h-4 w-24" />

      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <SkeletonBlock className="h-10 w-21.5 rounded-lg" />
      </div>
    </div>
  );
}

export default function MyTicketsSkeleton({ rows = 5 }) {
  return (
    <section
      aria-label="Loading tickets"
      aria-busy="true"
      className="min-h-screen w-full bg-[#08121e] px-4 py-8 text-slate-100 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1600px] space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <SkeletonBlock className="h-12 w-12 shrink-0 rounded-2xl" />

            <div className="space-y-3 pt-1">
              <SkeletonBlock className="h-6 w-43" />
              <SkeletonBlock className="h-4 w-72 max-w-full" />
              <SkeletonBlock className="h-4 w-56 max-w-full" />
            </div>
          </div>

          <SkeletonBlock className="h-12 w-48 rounded-xl" />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-3 overflow-hidden">
          {[1, 2, 3, 4, 5].map((item) => (
            <SkeletonBlock
              key={item}
              className="h-10 w-30 shrink-0 rounded-xl"
            />
          ))}
        </div>

        {/* Ticket table */}
        <div className="overflow-hidden rounded-2xl border border-[#20314b] bg-[#0b1626]">
          {/* Column headings */}
          <div className="hidden grid-cols-[minmax(220px,2fr)_minmax(125px,1fr)_minmax(125px,1fr)_minmax(100px,0.8fr)_minmax(145px,1fr)_auto] gap-5 border-b border-[#20314b] bg-[#101d30] px-6 py-5 lg:grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <SkeletonBlock
                key={item}
                className="h-3 w-16"
              />
            ))}
          </div>

          {Array.from({ length: rows }).map((_, index) => (
            <TicketRowSkeleton key={index} />
          ))}

          {/* Footer */}
          <div className="flex items-center justify-between gap-4 border-t border-[#20314b] px-6 py-4">
            <SkeletonBlock className="h-4 w-36" />

            <div className="flex gap-2">
              {[1, 2, 3].map((item) => (
                <SkeletonBlock
                  key={item}
                  className="h-10 w-10 rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
