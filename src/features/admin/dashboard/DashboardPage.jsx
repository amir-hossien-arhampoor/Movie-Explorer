import StatCard from "./components/StatCard";
import PlatformOverview from "./components/PlatformOverview";
import QuickActions from "./components/QuickActions";
import RecentUsers from "./components/RecentUsers";
import SiteActivity from "./components/SiteActivity";
import { Users, Heart, Eye, Bookmark, } from "lucide-react";
import Clock from "@/components/Clock";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDashboardStats } from "@/features/admin/dashboard/DashBoardSlice";


export default function DashboardPage() {
  const { stats } = useSelector(state => state.dashboard)
  const dispatch = useDispatch()


  useEffect(() => {
    async function getStats() {
      await dispatch(getDashboardStats())
    }
    getStats()
  }, [dispatch])
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#030d1d] dark:text-white">
      <div className="min-h-screen">
        <main className="px-4 py-5 sm:px-6 sm:py-6 lg:px-7">
          {/* Page heading */}
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-[22px] font-semibold tracking-tight text-slate-900 sm:text-[26px] dark:text-white">Admin Dashboard</h1>
              <p className="mt-1 text-[12px] leading-5 text-slate-500 sm:text-[14px] dark:text-[#8290a8]">Manage your movie platform, users, content and more.</p>
            </div>

            <div className="flex items-center gap-2 pt-1 text-[13px] text-slate-600 sm:pt-2 sm:text-[14px] dark:text-[#bac6db]">
              <Clock size={18} />
            </div>
          </div>

          {/* Statistics */}
          <div className="mb-5 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 lg:gap-5">
            <StatCard title="Total Users" value={stats.users || 0} icon={Users} iconClass="bg-violet-100 text-violet-600 dark:bg-[#32256f] dark:text-[#9b7cff]" />
            <StatCard title="Total Watchlist" value={stats.watchlist || 0} icon={Bookmark} iconClass="bg-blue-100 text-blue-600 dark:bg-[#17336c] dark:text-[#5795ff]" />
            <StatCard title="Total Favorites" value={stats.favorites || 0} icon={Heart} iconClass="bg-amber-100 text-amber-600 dark:bg-[#51451e] dark:text-[#ffd32a]" />
            <StatCard title="Total Watched" value={stats.watched || 0} icon={Eye} iconClass="bg-pink-100 text-pink-600 dark:bg-[#4b214e] dark:text-[#ff3d91]" />
          </div>

          {/* Overview */}
          <div className="mb-5 min-w-0">
            <PlatformOverview />
          </div>

          {/* Recent Users */}
          <div className="mb-5 min-w-0">
            <RecentUsers />
          </div>

          {/* Quick Actions + Site Activity */}
          <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] xl:gap-5">
            <div className="min-w-0">
              <QuickActions />
            </div>
            <div className="min-w-0">
              <SiteActivity />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}