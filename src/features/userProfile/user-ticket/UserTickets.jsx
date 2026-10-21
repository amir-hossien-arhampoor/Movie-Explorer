import { useEffect, useMemo, useState } from "react";
import TicketsHeader from "./components/TicketsHeader";
import TicketFilters from "./components/TicketFilters";
import TicketList from "./components/TicketList";
import TicketDetailsModal from "./components/TicketDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import { getUserTickets } from "@/features/userProfile/user-ticket/userTicketSlice";
import MyTicketsSkeleton from "@/features/userProfile/user-ticket/components/MyTicketsSkeleton";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";


export default function UserTickets({ onCreateTicket }) {
  const { currentUser } = useSelector(state => state.auth)
  const { tickets, isLoading } = useSelector(state => state.userTicket)
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId) ?? null;
  const filteredTickets = useMemo(() => {
    if (activeFilter === "all") {
      return tickets
    }

    return tickets.filter((ticket) => ticket.status === activeFilter)
  }, [tickets, activeFilter])

  useEffect(() => {
    async function getTickets() {
      await dispatch(getUserTickets({ userId: currentUser.userId }))
    }
    getTickets()
  }, [dispatch, currentUser?.userId])

  if (isLoading) {
    return <MyTicketsSkeleton rows={5} />;
  }


  return (
    <section className="min-h-screen w-full bg-[#f7f9fc] dark:border-[#292D35] dark:bg-[#040b14] px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 text-sm text-[#8494a9] transition hover:text-white cursor-pointer"
      >
        <ArrowLeft size={16} />
        Back to profile
      </button>
        {/* Page header */}
        <TicketsHeader
          onCreateTicket={onCreateTicket}
        />

        {/* Filters */}
        <TicketFilters
          tickets={tickets}
          activeFilter={activeFilter}
          onChange={setActiveFilter}
        />

        {/* Tickets */}
        <TicketList
          tickets={filteredTickets}
          onViewTicket={(ticket) => setSelectedTicketId(ticket.id)}
        />
      </div>

      {/* Ticket details */}
      <TicketDetailsModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicketId(null)}
      />
    </section>
  );
}
