import { getUsersStatistics } from "@/utils/api";
import { Crown, UserCheck, Users, UserX } from "lucide-react";
import { useEffect, useState } from "react";



function Statistics() {
  const [stats, setStats] = useState([])

  useEffect(() => {
    async function getStats() {
      const data = await getUsersStatistics()
      setStats(data)
    }
    getStats()

  }, [])

  const statistics = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      iconClass: "bg-[#243da8]/30 text-[#7187ff]",
      changeClass: "text-[#38e6a1]",
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: UserCheck,
      iconClass: "bg-[#0c8069]/30 text-[#43dfad]",
      changeClass: "text-[#38e6a1]",
    },
    {
      title: "Premium Users",
      value: stats.premiumUsers,
      icon: Crown,
      iconClass: "bg-[#856515]/30 text-[#e9bc4a]",
      changeClass: "text-[#38e6a1]",
    },
    {
      title: "Inactive Users",
      value: stats.inactiveUsers,
      icon: UserX,
      iconClass: "bg-[#812b4a]/30 text-[#f06086]",
      changeClass: "text-[#f06086]",
    },
  ];
  return (
    <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statistics.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="
          flex items-center gap-5 rounded-[10px]
          border border-slate-200 bg-white px-5 py-2
          transition-colors
          dark:border-[#102744] dark:bg-[#081625]
        "
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full ${stat.iconClass}`}
              >
                <Icon size={21} />
              </div>
            </div>

            <div className="mt-4">
              <p className="text-[12px] text-slate-500 dark:text-[#8b9bb1]">
                {stat.title}
              </p>

              <div className="mt-1 flex items-end justify-between">
                <span className="text-[25px] font-semibold text-slate-900 dark:text-[#e7edf8]">
                  {stat.value}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Statistics