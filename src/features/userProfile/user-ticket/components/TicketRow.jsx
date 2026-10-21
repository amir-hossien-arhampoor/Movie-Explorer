import { Bug, Film, Lightbulb, LockKeyhole, Crown, Settings, Star, Eye } from "lucide-react";
import TicketStatusBadge from "./TicketStatusBadge";
import TicketPriorityBadge from "./TicketPriorityBadge";

const categoryIcons = {
  Movies: Film,
  Authentication: LockKeyhole,
  Subscription: Crown,
  "Feature Request": Star,
  "UI/UX": Settings,
  Bug,
  "Suggest an Improvement": Lightbulb,
};

function formatTicketDate(date) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function TicketRow({ ticket, onView }) {
  const CategoryIcon = categoryIcons[ticket.category] || Bug;

  return (
    <div className="grid grid-cols-1 gap-4 border-b border-slate-200 px-5 py-5 transition last:border-b-0 hover:bg-slate-50 sm:px-6 dark:border-[#1c2d45] dark:hover:bg-[#101c2d]/70 lg:grid-cols-[minmax(220px,2fr)_minmax(125px,1fr)_minmax(125px,1fr)_minmax(100px,0.8fr)_minmax(145px,1fr)_auto] lg:items-center lg:gap-5">
      {/* Subject */}
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-[#857adc]/15 dark:text-[#a49aff]">
          <CategoryIcon size={23} />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
            {ticket.subject}
          </h3>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
            ID: TCK-{ticket.id}
          </p>
        </div>
      </div>

      {/* Category */}
      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <CategoryIcon
          size={18}
          className="shrink-0 text-slate-400 dark:text-slate-400"
        />
        <span>{ticket.category}</span>
      </div>

      {/* Status */}
      <TicketStatusBadge status={ticket.status} />

      {/* Priority */}
      <TicketPriorityBadge priority={ticket.priority} />

      {/* Date */}
      <time
        dateTime={ticket.createdAt}
        className="text-sm leading-6 text-slate-600 dark:text-slate-300"
      >
        {formatTicketDate(ticket.createdAt)}
      </time>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onView(ticket)}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-violet-300 px-3 py-2 text-[12px] font-medium text-violet-700 transition hover:bg-violet-50 dark:border-[#6554f0] dark:text-[#a49aff] dark:hover:bg-[#6554f0]/15"
        >
          <Eye size={15} />
          View
        </button>
      </div>
    </div>
  );
}
