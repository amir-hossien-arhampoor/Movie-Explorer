
const filters = [
  { label: "All Tickets", value: "all" },
  { label: "Not reviewed", value: "not-reviewed" },
  { label: "Reviewing", value: "reviewing" },
  { label: "Resolved", value: "resolved" },
  { label: "Closed", value: "closed" },
];

export default function TicketFilters({ tickets, activeFilter, onChange }) {
  const getCount = (value) =>
    value === "all"
      ? tickets.length
      : tickets.filter((ticket) => ticket.status === value).length;

  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {filters.map((filter) => {
        const active = activeFilter === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            className={`inline-flex shrink-0 items-center gap-3 rounded-xl border px-3 py-2 text-[12px] font-medium transition ${active
                ? "border-violet-500 bg-violet-50 text-violet-700 dark:border-[#857adc] dark:bg-[#857adc]/15 dark:text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:bg-slate-50 dark:border-[#20314b] dark:bg-[#0a1524] dark:text-slate-300 dark:hover:border-[#5541e7]/60 dark:hover:bg-[#111e32]"
              }`}
          >
            {filter.label}

            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full px-2 text-xs ${active
                  ? "bg-violet-600 text-white dark:bg-[#6554f0]"
                  : "bg-slate-100 text-slate-600 dark:bg-[#17263d] dark:text-slate-300"
                }`}
            >
              {getCount(filter.value)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
