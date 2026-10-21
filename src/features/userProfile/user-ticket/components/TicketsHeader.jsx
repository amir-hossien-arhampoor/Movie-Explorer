import { Plus, Ticket } from "lucide-react";
import { NavLink } from "react-router";


export default function TicketsHeader() {
  return (
<div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
  <div className="flex items-center gap-4">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-200 bg-violet-50 text-violet-600 dark:border-[#5541e7]/20 dark:bg-[#857adc]/10 dark:text-[#857adc]">
      <Ticket size={24} />
    </div>

    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        My Tickets
      </h1>

      <p className="mt-1 w-90 text-[13px] text-slate-500 dark:text-[#8190a5]">
        View and manage your submitted support tickets.
        Track their status and get updates from our team.
      </p>
    </div>
  </div>

  <NavLink
    to="/profile/create-ticket"
    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 p-3 text-[13px] font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500/50 dark:bg-[#6554f0] dark:hover:bg-[#7565ff] dark:focus:ring-[#857adc]/50"
  >
    <Plus size={19} />
    Create New Ticket
  </NavLink>
</div>
  );
}
