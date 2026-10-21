import { ClipboardList } from "lucide-react";
import TicketRow from "./TicketRow";

export default function TicketList({ tickets, onViewTicket}) {
  if (tickets.length === 0) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-[#20314b] bg-[#0b1626] px-6 text-center">
        <div className="mb-4 rounded-2xl bg-[#857adc]/10 p-4 text-[#a49aff]">
          <ClipboardList size={30} />
        </div>

        <h3 className="text-lg font-semibold text-slate-100">
          No tickets found
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
          There are no tickets in this category yet.
          Your submitted tickets will appear here.
        </p>
      </div>
    );
  }

  return (
<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-[#20314b] dark:bg-[#0b1626]">
  {/* Column headings: desktop only */}
  <div className="hidden gap-5 border-b border-slate-200 bg-slate-50 px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:border-[#20314b] dark:bg-[#101d30] dark:text-slate-400 lg:flex">
    <span className="w-90">Subject</span>
    <span className="w-44">Category</span>
    <span className="w-44">Status</span>
    <span className="w-35">Priority</span>
    <span className="w-44">Date</span>
    <span>Actions</span>
  </div>

  {tickets.map((ticket) => (
    <TicketRow
      key={ticket.id}
      ticket={ticket}
      onView={onViewTicket}
    />
  ))}

  <div className="border-t border-slate-200 px-6 py-4 text-sm text-slate-500 dark:border-[#20314b] dark:text-slate-400">
    Showing {tickets.length} of {tickets.length} tickets
  </div>
</div>
  );
}
