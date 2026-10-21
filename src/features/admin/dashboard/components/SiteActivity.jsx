import { getActivities } from "@/features/admin/dashboard/SiteActivitySlice";
import { timeAgo } from "@/utils/date";
import { Clock3 } from "lucide-react";
import { UserPlus, UserPen, UserMinus, Bookmark, BookmarkOff, Heart, HeartOff } from "lucide-react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const activityIcons = {
  UserPlus, UserPen, UserMinus, Bookmark, BookmarkOff, Heart, HeartOff
}

function ActivityIcon({ icon, className }) {
  const Icon = activityIcons[icon];

  if (!Icon) return null;

  return <Icon className={className} />;
}


export default function SiteActivity() {
  const { actions } = useSelector(state => state.siteActivity)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getSiteActivitie() {
      await dispatch(getActivities())
    }
    getSiteActivitie()
  }, [dispatch])
  return (

    <section className="rounded-[8px] border border-slate-200 bg-white p-3 transition-colors duration-300 sm:p-4 dark:border-[#142d4c] dark:bg-[#07162b]">
      <div className="mb-3 flex items-center gap-3">
        <Clock3 size={19} className="shrink-0 text-violet-600 dark:text-[#a16cff]" />

        <div className="min-w-0">
          <h2 className="text-[15px] font-medium text-slate-900 dark:text-white">Site Activity</h2>
          <p className="text-[11px] text-slate-500 dark:text-[#718198]">Latest actions on the platform</p>
        </div>
      </div>

      <div>
        {[...actions]
          .sort((a, b) => b.time - a.time)
          .slice(0, 4)
          .map((activity) => {
            return (
              <div key={activity.title + activity.time} className="flex items-start gap-2.5 py-2 sm:items-center sm:gap-3">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] ${activity.iconClass}`}>
                  <ActivityIcon icon={activity.icon} className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="wrap-break-word text-[12px] text-slate-700 dark:text-[#c8d1df]">{activity.title}</p>
                  <p className="wrap-break-word text-[10px] text-slate-500 dark:text-[#728198]">{activity.description}</p>
                </div>

                <span className="shrink-0 whitespace-nowrap pt-0.5 text-[10px] text-slate-500 sm:text-[11px] dark:text-[#8290a6]">{timeAgo(activity.time)}</span>
              </div>
            );
          })}
      </div>
    </section>
  );
}