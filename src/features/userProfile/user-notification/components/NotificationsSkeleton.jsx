function SkeletonBlock({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-200 dark:bg-[#1b2a40] ${className}`}
    />
  );
}

function NotificationItemSkeleton() {
  return (
    <div className="flex items-start gap-4 border-b border-slate-200 px-5 py-5 last:border-b-0 dark:border-[#172c46] sm:px-7">
      {/* Icon */}
      <SkeletonBlock className="h-12 w-12 shrink-0 rounded-xl" />

      {/* Notification content */}
      <div className="min-w-0 flex-1 space-y-3 py-1">
        <SkeletonBlock className="h-4 w-40 max-w-full" />
        <SkeletonBlock className="h-3 w-full max-w-lg" />
        <SkeletonBlock className="h-3 w-4/5 max-w-md" />
      </div>

      {/* Unread indicator and arrow */}
      <div className="flex shrink-0 items-center gap-3 self-center">
        <SkeletonBlock className="h-3 w-24" />
        <SkeletonBlock className="h-2.5 w-2.5 rounded-full" />
      </div>
    </div>
  );
}

function QuickFiltersSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-[#1b304b] dark:bg-[#081525]">
      <SkeletonBlock className="mb-6 h-5 w-32" />

      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-xl px-3 py-3"
          >
            <SkeletonBlock className="h-5 w-5 rounded-md" />
            <SkeletonBlock className="h-4 max-w-36 flex-1" />
            <SkeletonBlock className="h-6 w-8 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NotificationsSkeleton({ rows = 6 }) {
  return (
    <main
      aria-label="Loading notifications"
      aria-busy="true"
      className="min-h-screen w-full bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-[#061222] dark:text-slate-100 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1600px] space-y-8">
        {/* Page header */}
        <div className="flex items-center gap-5">
          <SkeletonBlock className="h-12 w-12 shrink-0 rounded-2xl" />

          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <SkeletonBlock className="h-8 w-52 max-w-full" />
              <SkeletonBlock className="h-6 w-20 rounded-full" />
            </div>

            <SkeletonBlock className="h-4 w-full max-w-lg" />
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          {/* Notification list */}
          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-[#1b304b] dark:bg-[#081525]">
            {Array.from({ length: rows }).map((_, index) => (
              <NotificationItemSkeleton key={index} />
            ))}
          </section>

          {/* Sidebar */}
          <aside className="space-y-5">
            <QuickFiltersSkeleton />

            <SkeletonBlock className="h-12 w-full rounded-xl" />
          </aside>
        </div>
      </div>
    </main>
  );
}