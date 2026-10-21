import { CheckCheck, Loader2 } from "lucide-react";
import QuickFilters from "./QuickFilters";
import { useDispatch, useSelector } from "react-redux";
import { markAllNotificationsAsRead } from "@/features/userProfile/user-notification/NotificationSlice";
import toast from "react-hot-toast";
import { useState } from "react";


export default function NotificationSidebar({ notifications, activeCategory, onCategoryChange }) {
  const { currentUser } = useSelector((state) => state.auth)
  const [isUpdating,setIsUpdating] = useState(false)
  const dispatch = useDispatch()

  async function handleNotificationsMark() {
    const unReadNotifications = notifications.some(notification => !notification.isRead)
    if (!unReadNotifications) {
      toast.error("You have no unread notifications right at this moment.")
      return
    }
    setIsUpdating(true)
    const markAsReadRes = await dispatch(markAllNotificationsAsRead({ userId: currentUser.userId }))

    if (markAllNotificationsAsRead.fulfilled.match(markAsReadRes)) {
      toast.success("All your notifications marked as read successfully.")
    } else {
      toast.error(markAsReadRes.payload || "Failed to mark notifications as read.")
    }
    setIsUpdating(false)
  }

  return (
    <aside className="space-y-5">
      <QuickFilters
        notifications={notifications}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
      />

      <button
        type="button"
        onClick={handleNotificationsMark}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#6554f0] px-4 py-3 text-sm font-medium text-[#a49aff] transition hover:bg-[#6554f0]/15 cursor-pointer"
      >
        {isUpdating ? <Loader2 className="animate-spin" /> : <CheckCheck size={18} />}
        Mark all as read
      </button>
    </aside>
  );
}
