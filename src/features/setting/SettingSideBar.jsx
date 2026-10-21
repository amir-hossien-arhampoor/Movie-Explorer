import useMediaQuery from "@/hooks/useMediaQuery"
import { Bell, Database, Info, User } from "lucide-react"
import { useDispatch } from "react-redux"

const sideBarBtn = [
  {
    id: 1,
    name: "Account",
    icon: User
  },
  {
    id: 2,
    name: "Notification",
    icon: Bell
  },
  {
    id: 3,
    name: "Data",
    icon: Database
  },
  {
    id: 4,
    name: "About",
    icon: Info
  }
]

function SettingSideBar({activeSection}) {
  const mediaQuery = useMediaQuery("(min-width: 1024px)")
  const dispatch = useDispatch()

  return (
    <div
  className={`relative min-w-14 rounded-[9px] border border-slate-200 bg-white p-1 text-slate-700 transition-colors dark:border-[#112a46] dark:bg-[#03111f] dark:text-slate-300 lg:w-[15%] ${
    !mediaQuery ? "w-fit" : ""
  }`}
>
  <div className="sticky top-15 flex flex-col gap-2">
    {sideBarBtn.map((btn) => (
      <div
        key={btn.id}
        onClick={() =>
          dispatch({
            type: "setting/setSection",
            payload: btn.name,
          })
        }
        className={`flex items-center justify-between rounded-[7px] px-3 py-2 transition-all duration-200 ease-in-out ${
          activeSection === btn.name
            ? "bg-violet-600 text-white dark:bg-[#6d3eec] dark:text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-[#0d2035] dark:hover:text-white"
        }`}
      >
        <div className="flex items-center gap-3">
          <btn.icon size={20} />
          {mediaQuery && (
            <p className="text-[13px]">{btn.name}</p>
          )}
        </div>
      </div>
    ))}
  </div>
</div>
  )
}

export default SettingSideBar