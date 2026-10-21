import { Bell } from "lucide-react"

export default function NotificationsHeader({ unreadCount }) {
  return (
    <div className="flex items-center gap-4 sm:gap-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-200 bg-violet-50 text-violet-600 transition-colors duration-200 dark:border-[#5541e7]/30 dark:bg-[#857adc]/15 dark:text-[#b8adff]">
        <Bell size={24} />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-[#f1f5f9] sm:text-3xl">
            Notifications
          </h1>

          {unreadCount > 0 && (
            <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:border-[#6554f0]/30 dark:bg-[#6554f0]/20 dark:text-[#b8adff]">
              {unreadCount} unread
            </span>
          )}
        </div>

        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-[#9aaac0]">
          Stay updated with your tickets, watchlist, favorites and more.
        </p>
      </div>
    </div>
  );
}
