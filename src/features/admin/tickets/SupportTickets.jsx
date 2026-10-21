import { useEffect, useMemo, useState } from "react";
import { Search, Headset } from "lucide-react";
import TicketStats from "./components/TicketStats";
import TicketList from "./components/TicketList";
import TicketDetails from "./components/TicketDetails";
import { useDispatch, useSelector } from "react-redux";
import { getUsersTickets } from "@/features/admin/tickets/SupportTicketSlice";



export default function SupportTickets() {
  const { tickets } = useSelector(state => state.supportTicket)
  const [selectedId, setSelectedId] = useState(tickets[0]?.id);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const dispatch = useDispatch()
  const filteredTickets = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.subject.toLowerCase().includes(query) ||
        String(ticket.id).toLowerCase().includes(query) 
        ticket.user.name.toLowerCase().includes(query) ||
        ticket.user.email.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" || ticket.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [tickets, search, statusFilter]);

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedId) ?? null;


  useEffect(() => {
    async function getTickets() {
      await dispatch(getUsersTickets())
    }
    getTickets()
  }, [dispatch])

  return (
    <div className="min-h-screen bg-[#f5f8fc] p-4 text-slate-800 dark:bg-[#020c16] dark:text-slate-100 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">

        {/* Page heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl border border-[#edf3f8] bg-white p-3 text-blue-600 dark:border-[#123052] dark:bg-[#03111f] dark:text-blue-400">
              <Headset size={25} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Support Tickets
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Manage requests, respond to users, and resolve issues.
              </p>
            </div>
          </div>

          <div className="relative w-full sm:max-w-sm">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tickets or users..."
              className="w-full rounded-xl border border-[#edf3f8] bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 dark:border-[#123052] dark:bg-[#03111f] dark:focus:border-blue-500"
            />
          </div>
        </div>

        <TicketStats tickets={tickets} />

        {/* Main workspace */}
        <div className="grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(340px,0.85fr)_minmax(0,1.45fr)]">

          <TicketList
            tickets={filteredTickets}
            selectedId={selectedId}
            onSelect={setSelectedId}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />

          <TicketDetails
            ticket={selectedTicket}
          />

        </div>
      </div>
    </div>
  );
}
