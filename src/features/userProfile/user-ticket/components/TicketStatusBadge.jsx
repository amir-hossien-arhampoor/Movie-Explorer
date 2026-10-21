

const statusStyles = {
  "not reviewed": "bg-blue-500/15 text-blue-400",
  reviewing: "bg-amber-500/15 text-amber-400",
  resolved: "bg-emerald-500/15 text-emerald-400",
  closed: "bg-slate-500/20 text-slate-300",
};

const statusLabels = {
  "not reviewed": "Not reviewed",
  reviewing: "Reviewing",
  resolved: "Resolved",
  closed: "Closed",
};

export default function TicketStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${ statusStyles[status] }`}
    >
      {statusLabels[status] || status}
    </span>
  );
}
