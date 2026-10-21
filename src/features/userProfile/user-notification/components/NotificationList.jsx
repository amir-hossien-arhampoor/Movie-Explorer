import { BellOff } from "lucide-react";
import NotificationItem from "./NotificationItem";

export default function NotificationList({ notifications }) {
  
  if (notifications.length === 0) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-[#1b304b] bg-[#081525] px-6 text-center">
        <BellOff size={34} className="text-slate-500" />

        <h3 className="mt-4 text-base font-semibold text-slate-200">
          No notifications found
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          You're all caught up in this category.
          Check back later for updates.
        </p>
      </div>
    );
  }

  return (
<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors duration-200 dark:border-[#293548] dark:bg-[#081525]">
  {notifications.map((notification) => (
    <NotificationItem
      key={notification.id}
      notification={notification}
    />
  ))}
</div>
  );
}
