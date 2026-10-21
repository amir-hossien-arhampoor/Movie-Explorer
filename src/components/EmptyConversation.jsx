
import { MessageCircleMore } from "lucide-react";

export default function EmptyConversation() {
  return (
    <div className="flex min-h-75 mt-5 flex-col items-center justify-center rounded-xl border border-[#edf3f8] bg-white px-5 py-10 text-center dark:border-[#123052] dark:bg-[#03111f] sm:min-h-85">
      {/* Icon */}
      <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 dark:bg-[#0b2340]">
        <MessageCircleMore
          size={42}
          strokeWidth={1.5}
          className="text-blue-500 dark:text-blue-400"
        />

        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-indigo-400 dark:border-[#03111f]" />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
        No messages yet
      </h3>

      {/* Description */}
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
        Start the conversation by sending a reply to the user.
        Your response will appear here.
      </p>
    </div>
  );
}
