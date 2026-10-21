import { CheckCircle2, Clock3, CircleDot, Tickets } from "lucide-react";


const statConfig = [
  {
    label: "Total Tickets",
    key: "total",
    icon: Tickets,
    color: "text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400",
  },
  {
    label: "Not reviewed",
    key: "not reviewed",
    icon: Clock3,
    color: "text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400",
  },
  {
    label: "Reviewing",
    key: "reviewing",
    icon: CircleDot,
    color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
  {
    label: "Resolved",
    key: "resolved",
    icon: CheckCircle2,
    color: "text-purple-600 bg-purple-50 dark:bg-purple-500/10 dark:text-purple-400",
  },
];

export default function TicketStats({tickets}) {

  const stats = {
    total: tickets.length || 0,
    "not reviewed": tickets.filter((ticket) => ticket.status === "not reviewed").length || 0,
    reviewing: tickets.filter((ticket) => ticket.status === "reviewing").length || 0,
    resolved: tickets.filter((ticket) => ticket.status === "Resolved").length || 0,
  };

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {statConfig.map(({ label, key, icon: Icon, color }) => (
        <div
          key={key}
          className="flex items-center gap-3 rounded-xl border border-[#edf3f8] bg-white p-4 dark:border-[#123052] dark:bg-[#03111f] sm:p-5"
        >
          <div className={`rounded-xl p-3 ${color}`}>
            <Icon size={21} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
              {label}
            </p>
            <p className="mt-1 text-2xl font-bold">{stats[key]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
