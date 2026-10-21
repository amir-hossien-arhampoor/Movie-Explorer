import {
  Bell,
  CalendarDays,
  Bookmark,
  Heart,
} from "lucide-react";
import NotificationItem from "./SettingNotificationItem";
import { useDispatch, useSelector } from "react-redux";
import { getUserNotificationStats, userNotificationUpdate } from "@/features/setting/SettingSlice";
import { useEffect } from "react";

function SettingNotification() {
  const { currentUser } = useSelector(state => state.auth)
  const {
    watchlistUpdates,
    newMovies,
    favoriteUpdates
  } = useSelector(state => state.setting)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getNotificationStat() {
      await dispatch(getUserNotificationStats({ userId: currentUser.userId }))
    }
    getNotificationStat()
  }, [currentUser?.userId, dispatch])

  return (
    <section className="rounded-[9px] border border-slate-200 bg-white p-2 text-slate-900 transition-colors dark:border-[#112a46] dark:bg-[#03111f] dark:text-white">
      {/* Header */}
      <div className="mb-3 flex items-center gap-1">
        <div className="flex h-9 w-9 items-center justify-center rounded-[8px]">
          <Bell size={20} className="text-violet-600 dark:text-[#6d3eec]" />
        </div>

        <div>
          <h2 className="font-bold">Notifications</h2>
          <p className="text-[12px] text-slate-500 dark:text-[#6f8196]">
            Choose what kind of updates you want to receive.
          </p>
        </div>
      </div>

      {/* Notification Items */}
      <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2">
        <NotificationItem
          icon={CalendarDays}
          title="New Movie Releases"
          description="Get notified about new releases."
          enabled={newMovies}
          onChange={async () => {
            await dispatch(
              userNotificationUpdate({
                userId: currentUser.userId,
                actionType: "newMovies",
              })
            );
          }}
        />

        <NotificationItem
          icon={Bookmark}
          title="Watchlist Updates"
          description="Be notified about watchlist changes."
          enabled={watchlistUpdates}
          onChange={async () => {
            await dispatch(
              userNotificationUpdate({
                userId: currentUser.userId,
                actionType: "watchlistUpdates",
              })
            );
          }}
        />

        <NotificationItem
          icon={Heart}
          title="Favorite Movie Updates"
          description="Get updates on your favorite movies."
          enabled={favoriteUpdates}
          onChange={async () => {
            await dispatch(
              userNotificationUpdate({
                userId: currentUser.userId,
                actionType: "favoriteUpdates",
              })
            );
          }}
        />
      </div>
    </section>
  );
};

export default SettingNotification;