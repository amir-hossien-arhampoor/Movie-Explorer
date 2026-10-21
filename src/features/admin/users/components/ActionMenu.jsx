import { Eye, Trash2 } from "lucide-react"
import { NavLink } from "react-router"


function ActionMenu({ userId, setIsConfirmOpen }) {
  return (
    <div className="absolute right-13 z-1000 mt-4 flex justify-end">
      <div
        className="
      w-47.5 rounded-[9px] border border-slate-200
      bg-white p-1.5 shadow-xl
      dark:border-[#1b385b] dark:bg-[#0a1a2d] dark:shadow-2xl
    "
      >
        <NavLink
          to={`${userId}`}
          className="
        flex h-9 w-full cursor-pointer items-center gap-3
        rounded-[6px] px-3 text-left text-[11px]
        text-slate-600 transition hover:bg-slate-100 hover:text-slate-900
        dark:text-[#aab8ca] dark:hover:bg-[#122943]
        dark:hover:text-white
      "
        >
          <Eye size={14} />
          View Profile
        </NavLink>

        <button
          className="
        flex h-9 w-full cursor-pointer items-center gap-3
        rounded-[6px] px-3 text-left text-[11px]
        text-red-600 transition hover:bg-red-50
        dark:text-[#f05c79] dark:hover:bg-[#321725]
      "
          onClick={() => setIsConfirmOpen(true)}
        >
          <Trash2 size={14} />
          Delete User
        </button>
      </div>
    </div>
  )
}

export default ActionMenu