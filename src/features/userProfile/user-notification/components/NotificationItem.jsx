import { markNotificationAsRead, removeUserNotification } from "@/features/userProfile/user-notification/NotificationSlice";
import { timeAgo } from "@/utils/date";
import { Ticket, Film, Heart, UserRound, Star, Crown, Settings, Circle, Trash2, Loader2, CheckCheck, } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const notificationConfig = {
  ticket: {
    Icon: Ticket,
    style: "bg-indigo-600/30 text-indigo-600",
  },
  watchlist: {
    Icon: Film,
    style: "bg-teal-500/25 text-teal-600",
  },
  favorite: {
    Icon: Heart,
    style: "bg-pink-600/30 text-pink-700",
  },
  account: {
    Icon: UserRound,
    style: "bg-blue-600/30 text-blue-600",
  },
  movie: {
    Icon: Star,
    style: "bg-amber-500/25 text-amber-600",
  },
  subscription: {
    Icon: Crown,
    style: "bg-violet-600/30 text-violet-600",
  },
  system: {
    Icon: Settings,
    style: "bg-slate-500/30 text-slate-600",
  },
};

export default function NotificationItem({ notification }) {
  const [isUpdating,setIsUpdating] = useState(false)
  const [isRemoving,setIsRemoving] = useState(false)
  const config = notificationConfig[notification.type] || notificationConfig.system;
  const dispatch = useDispatch()
  const { Icon } = config;

  async function handleNotificationMark() {
    if (notification.isRead) {
      toast.error("You have already read this notification.")
      return
    }
    setIsUpdating(true)
    const markAsReadRes = await dispatch(markNotificationAsRead({ notificationId: notification.id }))

    if (markNotificationAsRead.fulfilled.match(markAsReadRes)) {
      toast.success("Notification marked as read successfully.")
    } else {
      toast.error(markAsReadRes.payload || "Failed to mark notification as read.")
    }
    setIsUpdating(false)
  }

  async function removeNotification() {
    setIsRemoving(true)
    const removeRes = await dispatch(removeUserNotification({ notificationId: notification.id }))

    if (removeUserNotification.fulfilled.match(removeRes)) {
      toast.success("Notification removed successfully.")
    } else {
      toast.error(removeRes.payload || "Failed to remove this notification.")
    }
    setIsRemoving(false)
  }

  return (
    <div
      className={`group flex w-full items-center justify-between gap-4 border-b border-slate-200 px-5 py-5 text-left transition-colors duration-200 last:border-b-0 hover:bg-slate-50 dark:border-[#172c46] dark:hover:bg-[#101e32] sm:px-7 ${!notification.isRead
          ? "bg-violet-50/70 dark:bg-[#0c1a2d]/70"
          : "bg-white dark:bg-transparent"
        }`}
    >
      <div
        className="flex min-w-0 flex-1 cursor-pointer gap-3"
        onClick={handleNotificationMark}
      >
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${config.style}`}
        >
          <Icon size={20}  className="text-[]"/>
        </div>

        <div className="min-w-0 flex-1">
          <h3
            className={`text-sm ${notification.isRead
                ? "font-medium text-slate-600 dark:text-slate-300"
                : "font-semibold text-slate-900 dark:text-slate-100"
              }`}
          >
            {notification.title}
          </h3>

          <p className="mt-0.5 text-[12px] leading-6 text-slate-500 dark:text-slate-400">
            {notification.description}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <p className="whitespace-nowrap text-xs text-slate-500 dark:text-slate-500">
          {timeAgo(notification.createdAt)}
        </p>

        {!notification.isRead && (
          <Circle
            size={9}
            fill="currentColor"
            className="shrink-0 text-violet-600 dark:text-[#7565ff]"
          />
        )}

        <button
          type="button"
          aria-label="Delete notification"
          onClick={removeNotification}
          disabled={isRemoving}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-rose-600 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-[#f05c79] dark:hover:bg-[#321725]"
        >
          {isRemoving ? (
            <Loader2 className="animate-spin" size={14} />
          ) : (
            <Trash2 size={14} />
          )}
        </button>

        {!notification.isRead && (
          <button
            type="button"
            aria-label="Mark notification as read"
            onClick={handleNotificationMark}
            disabled={isUpdating}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-violet-600 transition-colors hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-[#a49aff] dark:hover:bg-[#201c40]"
          >
            {isUpdating ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <CheckCheck size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
