import { getUsers } from "@/utils/api";
import { UsersRound, } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

export default function RecentUsers() {
  const [users, setUsers] = useState([])

  const recentUsers = users.sort((a, b) => {
    return new Date(b.joined) - new Date(a.joined)
  })

  useEffect(() => {
    async function getUsersData() {
      const res = await getUsers()
      setUsers(res)
    }
    getUsersData()
  }, [])

  return (
    <section className="rounded-[8px] border border-slate-200 bg-white p-3 transition-colors duration-300 sm:p-4 dark:border-[#142d4c] dark:bg-[#07162b]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <UsersRound size={19} className="shrink-0 text-violet-600 dark:text-[#a16cff]" />
          <h2 className="text-[15px] font-medium text-slate-900 dark:text-white">Recent Users</h2>
        </div>
        <NavLink to="users" className="shrink-0 text-[12px] text-violet-600 hover:text-violet-700 dark:text-[#9d76ff] dark:hover:text-[#b39aff]">View All</NavLink>
      </div>

      <div className="overflow-x-auto rounded-[6px] border border-slate-200 dark:border-[#162d4b]">
        <div className="min-w-140">
          {/* Header */}
          <div className="grid grid-cols-[1.2fr_1.6fr_.8fr_.8fr] bg-slate-100 px-3 py-2 text-[12px] text-slate-500 dark:bg-[#10233d] dark:text-[#93a0b4]">
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
            <span>Joined</span>
          </div>

          {recentUsers.slice(0, 5).map((user, index) => (
            <div key={user.id ?? user.fullname} className={`grid grid-cols-[1.2fr_1.6fr_.8fr_.8fr] items-center px-3 transition-colors hover:bg-slate-50 dark:hover:bg-[#0b1d33] ${index !== Math.min(recentUsers.length, 5) - 1 ? "border-b border-slate-200 dark:border-[#122841]" : ""}`}>
              {/* User */}
              <div className="flex min-w-0 items-center gap-2 py-3.5 pr-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[10px] font-medium text-violet-700 dark:bg-[#7358cf] dark:text-white">
                  {user.fullname.slice(0, 1).toUpperCase()}
                </div>
                <p className="truncate text-[12px] font-medium text-slate-800 dark:text-[#e1e8f2]">{user.fullname}</p>
              </div>

              {/* Email */}
              <div className="min-w-0 py-3.5 pr-3">
                <span className="block truncate text-[11px] text-slate-500 dark:text-[#91a2b9]" title={user.email}>{user.email}</span>
              </div>

              {/* Role */}
              <div className="min-w-0 py-3.5 pr-2">
                <span className={`inline-flex max-w-full truncate rounded-full px-2 py-1 text-[10px] font-medium ${user.role === "admin" ? "bg-amber-100 text-amber-700 dark:bg-[#735b17]/40 dark:text-[#e7ba45]" : user.role === "Moderator" ? "bg-sky-100 text-sky-700 dark:bg-[#075c91]/40 dark:text-[#51b8ff]" : "bg-violet-100 text-violet-700 dark:bg-[#3027a1]/40 dark:text-[#938aff]"}`}>
                  {user.role}
                </span>
              </div>

              {/* Joined */}
              <div className="min-w-0 py-3.5">
                <span className="block truncate text-[11px] text-slate-500 dark:text-[#899bb2]">{user.joined}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}