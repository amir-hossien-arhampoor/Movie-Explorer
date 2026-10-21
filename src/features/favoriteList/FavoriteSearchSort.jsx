import { Search, SlidersHorizontal } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getMovieAndContentSettings } from "@/features/admin/setting/AdminSettingSlice"

function FavoriteSearchSort({ inputValue, setInputValue }) {
  const { sortValue } = useSelector(state => state.favorite)
  const { movieAndContentSettings } = useSelector(state => state.siteSettings)
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: "favorite/searchFavorite",
        payload: inputValue
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [inputValue, dispatch, movieAndContentSettings.defaultsortorder])

  useEffect(() => {
    async function getData() {
      await dispatch(getMovieAndContentSettings())
      dispatch({ type: "favorite/setSortValue", payload: movieAndContentSettings.defaultsortorder })
    }
    getData()

  }, [dispatch, movieAndContentSettings.defaultsortorder])

  return (
    <div>
      <div className="flex flex-col mt-5 gap-3">

        {/* Search */}
        <div className="dark:bg-[#0a1522] bg-zinc-200 flex items-center rounded-xl pl-2 border-2 dark:border-[#0e1c2e] lg:w-[50%]">

          <Search color="#546077" />

          <input
            type="text"
            className="bg-inherit! flex-1 h-10 rounded-xl outline-none p-3 dark:text-white text-[13px]"
            placeholder="Search your watchlist..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />

        </div>

        {/* Sort */}
        <div className="
          flex items-center h-10 rounded-lg
          border-2 dark:border-[#0e1c2e]! border-[#c7c9ca]!
          bg-white dark:bg-[#070f1b]
          px-3.5 text-[10px] dark:text-white
          self-start
        ">
          <div className="flex items-center gap-1">
            <SlidersHorizontal size={14} />
            <p className="text-[11px]">Sort by:</p>
          </div>

          <select
            className="text-[11px]! dark:bg-[#070f1b] outline-none ml-1"
            value={sortValue}
            onChange={e => dispatch({ type: "favorite/setSortValue", payload: e.target.value })}
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest </option>
            <option value="Title A–Z">Title A–Z</option>
            <option value="Title Z–A">Title Z–A</option>
            <option value="Highest Rated">Highest Rated</option>
            <option value="Lowest Rated">Lowest Rated</option>
            <option value="Year">Year</option>
          </select>
        </div>

      </div>
    </div>
  )
}

export default FavoriteSearchSort