import { Bell, Ticket, Film, Heart, Settings, UserRound, Star, Crown } from "lucide-react";

const filterItems = [
  { label: "All Notifications", value: "all", Icon: Bell },
  { label: "Tickets", value: "ticket", Icon: Ticket },
  { label: "Watchlist", value: "watchlist", Icon: Film },
  { label: "Favorites", value: "favorite", Icon: Heart },
  { label: "Account", value: "account", Icon: UserRound },
  { label: "Movies", value: "movie", Icon: Star },
  { label: "Subscription", value: "subscription", Icon: Crown },
  { label: "System", value: "system", Icon: Settings },
];

export default function QuickFilters({ notifications, activeCategory, onCategoryChange, }) {
  const getCount = (value) =>
    value === "all"
      ? notifications.length
      : notifications.filter(
        (notification) => notification.type === value
      ).length;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-200 dark:border-[#293548] dark:bg-[#081525]">
      <h2 className="mb-5 text-base font-semibold text-slate-900 dark:text-slate-100">
        Quick Filters
      </h2>

      <div className="space-y-1.5">
        {filterItems.map(({ label, value, Icon }) => {
          const active = activeCategory === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => onCategoryChange(value)}
              aria-pressed={active}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm transition-colors duration-200 ${active
                  ? "border-violet-200 bg-violet-50 text-violet-700 dark:border-[#6554f0]/30 dark:bg-[#6554f0]/20 dark:text-[#b8adff]"
                  : "border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-[#13243a] dark:hover:text-white"
                }`}
            >
              <Icon size={20} className="shrink-0" />

              <span className="min-w-0 flex-1">
                {label}
              </span>

              <span
                className={`min-w-8 rounded-full px-2 py-1 text-center text-xs font-medium ${active
                    ? "bg-violet-600 text-white dark:bg-[#6554f0] dark:text-white"
                    : "bg-slate-100 text-slate-600 dark:bg-[#172b46] dark:text-slate-300"
                  }`}
              >
                {getCount(value)}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
