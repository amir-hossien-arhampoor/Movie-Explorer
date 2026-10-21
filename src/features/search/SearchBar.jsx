import { useEffect, useRef } from "react"
import { addToRecentSearch, searchResult } from "./SearchSlice"
import { useSelector, useDispatch } from "react-redux"
import { AlertCircle, Search, X } from "lucide-react"
import { getMovieAndContentSettings } from "@/features/admin/setting/AdminSettingSlice"
function SearchBar() {
  const { isLoading, query } = useSelector(state => state.search)
  const { currentUser } = useSelector(state => state.auth)
  const { movieAndContentSettings } = useSelector(state => state.siteSettings)
  const isFirstender = useRef(true)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getData() {
      await dispatch(getMovieAndContentSettings())
    }
    getData()
    
    if (isFirstender.current) {
      isFirstender.current = false
      return
    }


    async function searchMovie() {
      dispatch(searchResult(query))

      if (query.trim() === "") return
      await dispatch(addToRecentSearch({ userId: currentUser?.userId, query: query }))

    }
    const timer = setTimeout(searchMovie, 500)
    return () => clearTimeout(timer)
  }, [query, dispatch, currentUser?.userId])


  return (
    <div>
      <div className="">
        <h1 className="text-[26px] font-bold">Search Movies</h1>
        <p className="text-[#5a647a] text-[13px]">Find your next favorite movie here</p>
      </div>

      <div className={`dark:border-[#123052] dark:bg-[#03111f] border-2 bg-zinc-200 w flex transition-all lg:w-[50%] duration-300 ease-in-out items-center rounded-[8px] mt-6 px-3 ${isLoading ? "dark:bg-zinc-950! bg-zinc-400" : ""} ${!movieAndContentSettings.moviesearch && "dark:bg-zinc-950! bg-zinc-400"}`}>
        <Search size={20} className={`cursor-pointer ${!movieAndContentSettings.moviesearch && "dark:text-zinc-850! text-zinc-400"}`} />
        <input
          type="text"
          className="bg-inherit! flex-1 h-10 rounded-xl outline-none p-3 dark:text-white text-[14px]"
          placeholder="Search something"
          disabled={!movieAndContentSettings.moviesearch}
          value={query}
          onChange={(e) => dispatch({ type: "search/setQuery", payload: e.target.value })}
        />

        <X size={14} className="cursor-pointer" onClick={() => dispatch({ type: "search/clearSearch" })} />
      </div>

      {!movieAndContentSettings.moviesearch && <p className="flex items-center gap-1 text-[13px] mt-2 text-red-600">
        <AlertCircle size={16} />
        Searching movie turned off by admin!
      </p>}
    </div>
  )
}

export default SearchBar