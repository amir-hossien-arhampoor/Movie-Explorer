import useMediaQuery from "@/hooks/useMediaQuery"
import { ChevronRight, Settings, TableOfContents, UsersRound } from "lucide-react"
import { useDispatch } from "react-redux"


const AdminsideBarBtn = [
  {
    id: 1,
    name: "General Setting",
    icon: Settings
  },
  {
    id: 2,
    name: "Movie & Content",
    icon: TableOfContents
  },
  {
    id: 3,
    name: "User & Account",
    icon: UsersRound
  }
]

function AdminSettingSideBar({activeSection}) {
  const mediaQuery = useMediaQuery("(min-width: 1024px)")
  const dispatch = useDispatch()

  return (
<div className={`relative min-w-14 rounded-[9px] border border-slate-200 bg-white p-1 transition-colors duration-200 dark:border-[#112a46] dark:bg-[#03111f] lg:w-[18%] ${!mediaQuery ? "w-fit" : ""}`}>
  <div className="sticky top-22 flex flex-col gap-2">
    {AdminsideBarBtn.map((btn) => {
      const isActive = activeSection === btn.name;

      return (
        <div
          key={btn.id}
          role="button"
          tabIndex={0}
          onClick={() => dispatch({ type: "setting/setSection", payload: btn.name })}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              dispatch({ type: "setting/setSection", payload: btn.name });
            }
          }}
          className={`flex cursor-pointer items-center justify-between rounded-[7px] px-3 py-2 transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${isActive ? "bg-[#6d3eec] text-white shadow-sm shadow-violet-500/20" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-[#0c2035] dark:hover:text-white"}`}
        >
          <div className="flex items-center gap-3">
            <btn.icon size={20} />
            {mediaQuery && <p className="text-[12px] font-medium">{btn.name}</p>}
          </div>

          {mediaQuery && <ChevronRight size={16} className={isActive ? "text-white" : "text-slate-400 dark:text-slate-500"} />}
        </div>
      );
    })}
  </div>
</div>
  )
}

export default AdminSettingSideBar