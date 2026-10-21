import generateUniqueId from "generate-unique-id";
import { X, CalendarDays, Hash, MessageSquareText } from "lucide-react";
import TicketStatusBadge from "./TicketStatusBadge";
import TicketPriorityBadge from "./TicketPriorityBadge";
import ConversationTab from "@/components/ConversationTab";
import { useState } from "react";
import DetailField from "@/features/userProfile/user-ticket/components/DetailField";
import { useDispatch, useSelector } from "react-redux";
import { addNewReply } from "@/features/userProfile/user-ticket/userTicketSlice";
import toast from "react-hot-toast";


export default function TicketDetailsModal({ ticket, onClose, }) {
  const { isReplying } = useSelector(state => state.userTicket)
  const [reply, setReply] = useState("");
  const dispatch = useDispatch()


  async function handleSendReply(e) {
    e.preventDefault()

    const newReply = {
      id: generateUniqueId(),
      sender: "user",
      name: ticket.user.name,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      text: reply,
    }

    const addReplyRes = await dispatch(addNewReply({ ticket: ticket, newReply: newReply }))

    if (addNewReply.fulfilled.match(addReplyRes)) {
      toast.success("New Reply added successfully.")
      setReply("")
    }
  }



  if (!ticket) return null
  return (
    <div
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm dark:bg-black/70"
  onMouseDown={(event) => {
    if (event.target === event.currentTarget) onClose();
  }}
>
  <section
    role="dialog"
    aria-modal="true"
    aria-labelledby="ticket-modal-title"
    className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-[#263751] dark:bg-[#0b1626]"
  >
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-6 dark:border-[#20314b]">
      <div className="min-w-0">
        <div className="mb-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Hash size={14} />
          {ticket.id}
        </div>

        <h2
          id="ticket-modal-title"
          className="text-xl font-bold text-slate-900 dark:text-white"
        >
          {ticket.subject}
        </h2>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close ticket details"
        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-[#1b2b42] dark:hover:text-white"
      >
        <X size={20} />
      </button>
    </div>

    <div className="space-y-6 p-6">
      <div className="flex flex-wrap gap-3">
        <TicketStatusBadge status={ticket.status} />
        <TicketPriorityBadge priority={ticket.priority} />

        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-600 dark:bg-[#17263d] dark:text-slate-300">
          {ticket.category}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <CalendarDays size={17} />
        Submitted on{" "}
        {new Date(ticket.createdAt).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-[#20314b] dark:bg-[#0e1b2e]">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
          <MessageSquareText
            size={17}
            className="text-violet-600 dark:text-[#a49aff]"
          />
          Description
        </div>

        <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600 dark:text-slate-300">
          {ticket.description}
        </p>
      </div>

      <DetailField
        label="Steps to reproduce"
        value={ticket.stepsToReproduce}
      />

      <DetailField
        label="Expected behavior"
        value={ticket.expectedBehavior}
      />

      <DetailField
        label="Actual behavior"
        value={ticket.actualBehavior}
      />

      {/* Conversation */}
      <ConversationTab
        ticket={ticket}
        reply={reply}
        setReply={setReply}
        onSubmit={handleSendReply}
        isReplying={isReplying}
      />

      <div className="border-t border-slate-200 pt-5 dark:border-[#20314b]">
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-[#33445e] dark:text-slate-200 dark:hover:bg-[#17263d] sm:w-auto"
        >
          Close
        </button>
      </div>
    </div>
  </section>
</div>
  );
}
