import { formatDate } from "@/utils/date";
import { ChevronRight, SlidersHorizontal } from "lucide-react";

const statusStyles = {
  "not reviewed": "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  "reviewing":
    "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  resolved:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
};

const avatarColors = [
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-purple-500",
  "bg-cyan-600",
  "bg-pink-500",
];

export default function TicketList({
  tickets,
  selectedId,
  onSelect,
  statusFilter,
  onStatusFilterChange,
}) {
  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-[#edf3f8] bg-white dark:border-[#123052] dark:bg-[#03111f]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf3f8] p-4 dark:border-[#123052] sm:p-5">
        <div>
          <h2 className="font-semibold">All Tickets</h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {tickets.length} requests found
          </p>
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={15}
            className="text-slate-400"
          />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="max-w-33.75 rounded-lg border border-[#edf3f8] bg-white px-2 py-2 text-xs outline-none dark:border-[#123052] dark:bg-[#03111f] sm:text-sm"
          >
            <option value="all">All statuses</option>
            <option value="not reviewed">Not reviewed</option>
            <option value="reviewing">Reviewing</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="max-h-195 overflow-y-auto p-2">
        {tickets.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <p className="font-medium">No tickets found</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          tickets.map((ticket, index) => {
            const selected = selectedId === ticket.id;

            return (
              <button
                type="button"
                key={ticket.id}
                onClick={() => onSelect(ticket.id)}
                className={`mb-1 flex w-full min-w-0 items-start gap-3 rounded-lg border p-3 text-left transition sm:p-4 ${selected
                    ? "border-blue-200 bg-blue-50/80 dark:border-[#1b4b78] dark:bg-[#0b2340]"
                    : "border-transparent hover:bg-slate-50 dark:hover:bg-[#091d30]"
                  }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${avatarColors[index % avatarColors.length]
                    }`}
                >
                  {ticket.user.initials}
                </div>

                <div className="min-w-0 flex-1 ">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="min-w-0 wrap-break-word text-sm font-semibold">
                      {ticket.subject}
                    </p>

                    <div className="flex flex-col items-center gap-2">
                      <span
                        className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${statusStyles[ticket.status]
                          }`}
                      >
                        {ticket.status}
                      </span>
                      <p className="text-[10px]">{formatDate(ticket.createdAt)}</p>
                    </div>
                  </div>

                  <div className=" flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <span>{ticket.user.name}</span>
                    <span>·</span>
                    <span>TKC-{ticket.id}</span>
                  </div>

                  <p className="mt-2 line-clamp-2 wrap-break-word text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {ticket.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400">
                      {ticket.category}
                    </span>

                    <ChevronRight
                      size={16}
                      className="shrink-0 text-slate-400"
                    />
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </section>
  );
}
