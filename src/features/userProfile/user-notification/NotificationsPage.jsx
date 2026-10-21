import { useEffect, useMemo, useState } from "react";
import NotificationsHeader from "./components/NotificationsHeader";
import NotificationList from "./components/NotificationList";
import NotificationSidebar from "./components/NotificationSidebar";
import { useDispatch, useSelector } from "react-redux";
import NotificationsSkeleton from "@/features/userProfile/user-notification/components/NotificationsSkeleton";
import { getUserNotifications } from "@/features/userProfile/user-notification/NotificationSlice";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";



export default function NotificationsPage() {
  const { notifications, isLoading } = useSelector(state => state.notifications)
  const { currentUser } = useSelector((state) => state.auth)
  const [activeCategory, setActiveCategory] = useState("all")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  const filteredNotifications = useMemo(() => {
    if (activeCategory === "all") {
      return notifications;
    }

    return notifications.filter((notification) => notification.type === activeCategory);
  }, [notifications, activeCategory]);


  useEffect(() => {
    async function getNotifications() {
      await dispatch(getUserNotifications({ userId: currentUser.userId ,newMovieReleaseNotification : currentUser?.newMovieReleaseNotification}))
    }
    getNotifications()
  }, [dispatch, currentUser?.userId,currentUser?.newMovieReleaseNotification])

  if (isLoading) {
    return <NotificationsSkeleton rows={6} />
  }

  return (
<main className="min-h-screen w-full bg-slate-50 px-4 py-8 text-slate-900 transition-colors duration-200 dark:bg-[#040b14] dark:text-slate-100 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-[1600px] space-y-8">
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="mb-4 inline-flex cursor-pointer items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-[#8494a9] dark:hover:text-white"
    >
      <ArrowLeft size={16} />
      Back to profile
    </button>

    <NotificationsHeader unreadCount={unreadCount} />

    <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <section className="min-w-0">
        <NotificationList
          notifications={filteredNotifications}
        />
      </section>

      <NotificationSidebar
        notifications={notifications}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
    </div>
  </div>
</main>
  );
}
