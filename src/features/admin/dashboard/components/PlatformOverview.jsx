"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Activity, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { getUsers } from "@/utils/api"


const chartConfig = {
  Users: {
    label: "New User",
    color: "#2563eb",
  }
}

export default function PlatformOverview() {
  const [users, setUsers] = useState([])
  const [selectedYear, setSelectedYear] = useState(2025)


  useEffect(() => {
    async function getUsersAmount() {
      const res = await getUsers()
      setUsers(res)
    }
    getUsersAmount()
  }, [])

  const chartData = Array.from({ length: 12 }, (_, index) => ({
    month: new Date(selectedYear, index, 1).toLocaleString("en-US", {
      month: "long",
    }),
    Users: 0,
  }));

  users.forEach((user) => {
    const [month, day, year] = user.joined.split("/").map(Number);

    if (year === selectedYear) {
      chartData[month - 1].Users += 1;
    }
  });

  return (
    <>
      <div className="rounded-[8px] border border-slate-200 bg-white p-3 transition-colors duration-300 sm:p-4 dark:border-[#142d4c] dark:bg-[#07162b]">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="mt-1 shrink-0 text-violet-600 dark:text-[#a278ff]">
              <Activity size={20} />
            </div>

            <div className="min-w-0">
              <h2 className="text-[15px] font-medium text-slate-900 dark:text-white">Platform Overview</h2>
              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-[#718198]">User growth</p>
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              value={selectedYear}
              className="h-8 w-full appearance-none rounded-md border border-slate-300 bg-white px-3 pr-8 text-[13px] text-slate-800 outline-none transition-colors focus:border-violet-500 focus:ring-1 focus:ring-violet-500 sm:w-auto dark:border-[#12365b] dark:bg-[#071a2d] dark:text-[#d8e0eb]"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
            <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-[#74839a]" />
          </div>
        </div>

        <ChartContainer config={chartConfig} className="mt-5 min-h-50 w-full sm:min-h-62.5">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={true} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="Users" fill="var(--color-Users)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </>
  )
}
