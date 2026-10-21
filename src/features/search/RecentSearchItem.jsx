import { removeRecentSearch } from "@/features/search/SearchSlice"
import { Loader2, Search, X } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function RecentSearchItem({ text }) {
  const { currentUser } = useSelector(state => state.auth)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  async function handleRemove() {
    setIsLoading(true)
    await dispatch(removeRecentSearch({ userId: currentUser.userId, query: text }))
    setIsLoading(false)
  }
  return (
    <div className="flex cursor-pointer items-center justify-between rounded-[10px] px-2 py-1 text-[13px] text-slate-700 transition-all duration-150 ease-in-out hover:bg-slate-300 dark:text-slate-300 dark:hover:bg-[#173a64]">
      <div
        className="flex flex-1 items-center gap-3"
        onClick={() =>
          dispatch({ type: "search/setQuery", payload: text })
        }
      >
        {isLoading ? (
          <Loader2 size={14} className="animate-spin text-violet-600 dark:text-[#9588ff]" />
        ) : (
          <Search size={14} className="text-slate-500 dark:text-slate-400" />
        )}

        <p>{text}</p>
      </div>

      {isLoading ? <Loader2 size={12} className="animate-spin"/> :
      <X
        size={12}
        onClick={handleRemove}
        className="shrink-0 text-slate-500 transition-colors hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400"
      />}
    </div>
  )
}

export default RecentSearchItem