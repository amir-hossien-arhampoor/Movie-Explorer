import { useState } from "react";
import { ArrowLeft, CalendarDays, CheckCheck, CircleUserRound, Flag, Ticket } from "lucide-react";
import ConversationTab from "@/components/ConversationTab";
import { formatDate } from "@/utils/date";
import generateUniqueId from "generate-unique-id";
import { useDispatch, useSelector } from "react-redux";
import { addNewReply } from "@/features/userProfile/user-ticket/userTicketSlice";
import toast from "react-hot-toast";
import { changeTicketStatus, getUsersTickets } from "@/features/admin/tickets/SupportTicketSlice";
import { addNewNotification } from "@/features/userProfile/user-notification/NotificationSlice";

const priorityStyles = {
  high: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  medium:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  low: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

const statusStyles = {
  "not reviewed": "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  "reviewing":
    "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  resolved:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
};

export default function TicketDetails({ ticket }) {
  const { isReplying } = useSelector(state => state.userTicket)
  const [reply, setReply] = useState("");
  const [showActions, setShowActions] = useState(false);
  const dispatch = useDispatch()


  async function handleSendReply(e) {
    e.preventDefault();

    const text = reply.trim();

    if (!text || isReplying) return;

    const newReply = {
      id: generateUniqueId(),
      sender: "admin",
      name: "Admin",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      text,
    };

    const result = await dispatch(addNewReply({ ticket, newReply, }));

    if (addNewReply.fulfilled.match(result)) {
      const newNotification = {
        type: "ticket",
        title: "New Reply to Your Support Ticket",
        description: `An admin has replied to your ticket (TCK-${ticket.id}). View the conversation to read the response.`,
        userId: ticket.userId,
      };
      await dispatch(addNewNotification({ newNotification }))

      toast.success("Reply sent successfully.");
      setReply("");

      // Refresh the admin ticket list from the server.
      await dispatch(getUsersTickets());
    } else {
      toast.error(result.payload || "Failed to send reply.");
      console.error("Failed to send reply:", result);
    }
  }

  async function handleStatus(status) {
    const result = await dispatch(
      changeTicketStatus({
        ticketId: ticket.id,
        status,
      })
    );

    if (changeTicketStatus.fulfilled.match(result)) {
      const newNotification = {
        type: "ticket",
        title: "Ticket updated",
        description: `Your ticket (TCK-${ticket.id}) has been updated. The current status is "${status}".`,
        userId: ticket.userId,
      }
      await dispatch(addNewNotification({ newNotification }))

      toast.success("Ticket status updated successfully.");
    } else {
      toast.error(result.payload || "Failed to update ticket status.");
    }
  }
  if (!ticket) {
    return (
      <section className="flex min-h-100 items-center justify-center rounded-xl border border-[#edf3f8] bg-white p-6 text-center dark:border-[#123052] dark:bg-[#03111f]">
        <div>
          <Ticket
            size={36}
            className="mx-auto text-slate-300 dark:text-slate-600"
          />
          <h2 className="mt-4 font-semibold">Select a support ticket</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Choose a ticket from the list to view its details.
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-[#edf3f8] bg-white dark:border-[#123052] dark:bg-[#03111f]">

      {/* Ticket heading */}
      <div className="border-b border-[#edf3f8] p-4 dark:border-[#123052] sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setShowActions((previous) => !previous)}
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowActions((previous) => !previous)}
              className="rounded-lg cursor-pointer border border-[#edf3f8] px-3 py-2 text-sm hover:bg-slate-50 dark:border-[#123052] dark:hover:bg-[#0a2035]"
            >
              Manage ticket
            </button>

            {showActions && (
              <div className="absolute right-0 z-10 mt-2 w-48 rounded-xl border border-[#edf3f8] bg-white p-2 shadow-lg dark:border-[#123052] dark:bg-[#03111f]">
                {["not reviewed", "reviewing", "resolved"].map((status) => (
                  <button
                    type="button"
                    key={status}
                    onClick={() => {
                      handleStatus(status);
                      setShowActions(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-[#0a2035]"
                  >
                    {status}
                    {ticket.status === status && (
                      <CheckCheck size={15} className="text-blue-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
              {ticket.user.initials}
            </div>

            <div className="min-w-0">
              <h2 className="wrap-break-word text-lg font-bold">
                {ticket.subject}
              </h2>
              <p className="mt-1 text-[12px] text-slate-500 dark:text-slate-400">
                TCK-{ticket.id}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <CircleUserRound size={14} />
                <span>{ticket.user.name}</span>
                <span className="break-all">({ticket.user.email})</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <CalendarDays size={14} />
                <span>{formatDate(ticket.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[ticket.status]
                }`}
            >
              {ticket.status}
            </span>

            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ${priorityStyles[ticket.priority]
                }`}
            >
              <Flag size={12} />
              {ticket.priority}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-4 sm:p-5">
        {/* Request details */}
        <div className="rounded-xl border border-[#edf3f8] p-4 dark:border-[#123052]">
          <h3 className="text-sm font-semibold">Ticket Details</h3>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Category
              </p>
              <p className="mt-1 text-sm font-medium">{ticket.category}</p>

              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                Priority
              </p>
              <span
                className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyles[ticket.priority]
                  }`}
              >
                {ticket.priority}
              </span>
            </div>

            <div className="border-t border-[#edf3f8] pt-4 dark:border-[#123052] sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Subject
              </p>
              <p className="mt-1 wrap-break-word text-sm font-medium">
                {ticket.subject}
              </p>

              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                Description
              </p>
              <p className="mt-2 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-slate-600 dark:text-slate-300">
                {ticket.description}
              </p>
            </div>
          </div>
        </div>

        {/* Conversation */}
        <ConversationTab
          ticket={ticket}
          reply={reply}
          setReply={setReply}
          onSubmit={handleSendReply}
          isReplying={isReplying}
        />

      </div>
    </section>
  );
}
