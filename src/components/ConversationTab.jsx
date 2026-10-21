import EmptyConversation from "@/components/EmptyConversation";
import { Clock3, Loader2, Send } from "lucide-react";
import { useEffect, useRef } from "react";

function ConversationTab({ ticket, onSubmit, reply = "", setReply, isReplying }) {
  const conversationRef = useRef(null);

  useEffect(() => {
    const container = conversationRef.current;
    if (!container) return;

    container.scrollTo({
    top: container.scrollHeight,
    behavior: "smooth",
  });
  }, [ticket.messages]);
  return (
    <div className="rounded-xl border border-[#edf3f8] p-4 dark:border-[#123052] sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold">Conversation</h3>

      </div>

      {ticket.messages.length === 0 ?
        <EmptyConversation />
        :
        <div
          className="mt-5 p-4 max-h-80 overflow-y-scroll space-y-5 border border-[#edf3f8] rounded-xl min-h-50 dark:border-[#123052]"
          ref={conversationRef}
        >
          {ticket.messages.map((message) => {
            const isAdmin = message.sender === "admin";

            return (
              <div
                key={message.id}
                className={`flex min-w-0 items-start gap-3 ${isAdmin ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${isAdmin ? "bg-slate-600" : "bg-indigo-500"}`}
                >
                  {isAdmin ? "AD" : ticket.user.initials}
                </div>

                <div
                  className={`flex min-w-0 max-w-[90%] flex-col ${isAdmin ? "items-end" : "items-start"}`}
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold">{message.name}</span>
                  </div>

                  <div
                    className={`whitespace-pre-wrap flex flex-col min-w-20 wrap-break-word rounded-xl  text-sm leading-6 ${isAdmin
                      ? "bg-blue-50 text-slate-700 dark:bg-[#0b2948] dark:text-slate-200"
                      : "bg-slate-100 text-slate-700 dark:bg-[#0a1c2d] dark:text-slate-300"
                      }`}
                  >
                    <div className="px-4 mt-1">
                      {message.text}
                    </div>
                    <span className="text-slate-400 text-[10px] self-end pr-2">{message.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>}

      {/* Reply to user/admin */}
      <form onSubmit={onSubmit}>
        <div className="flex items-center mt-3 w-full resize-y rounded-lg p-1 border border-[#edf3f8] bg-white pl-4  text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-blue-400 dark:border-[#123052] dark:bg-[#03111f] dark:focus:border-blue-500">
          <input
            id="ticket-reply"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write your response here..."
            rows={5}
            className=" w-full resize-y rounded-xl  bg-white   text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-blue-400 dark:border-[#123052] dark:bg-[#03111f] dark:focus:border-blue-500"
          />

          <div className="">
            <button
              type="submit"
              disabled={!reply.trim()}
              className=" rounded-[7px] bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isReplying ? <Loader2 className="animate-spin" size={15} /> : <Send size={15} />}
            </button>
          </div>
        </div>

        {ticket.status === "resolved" && (
          <p className="mt-3 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
            <Clock3 size={14} />
            This ticket is resolved. Sending a reply will keep it resolved.
          </p>
        )}
      </form>
    </div>
  )
}

export default ConversationTab