import { Bookmark, Heart } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getfavoriteWatchlistMovies, getWatchlist } from "@/features/watchlist/WatchListSlice"

function WatchListStats() {
  const { currentUser } = useSelector(state => state.auth)
  const { watchListMovies, favoriteWatchlistMovies} = useSelector(state => state.watchList)
  const userId = currentUser?.userId
  const dispatch = useDispatch()

  useEffect(() => {
    async function getfavorties() {
      await dispatch(getWatchlist({userId}))
      await dispatch(getfavoriteWatchlistMovies({userId}))

    }
    getfavorties()
  }, [dispatch, userId])

  return (
    <div className="mt-3 flex items-center gap-3 lg:w-[60%]">
      <div className="flex flex-1 items-center gap-4 rounded-[9px] border-2 border-slate-200 bg-white p-3 text-slate-900 transition-colors dark:border-[#0d1828] dark:bg-[#09121e] dark:text-white">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 dark:bg-[#1f1c5a]">
          <Heart
            size={20}
            fill="#8563fa"
            color="#8563fa"
          />
        </div>

        <div>
          <span className="text-[17px] font-bold">
            {watchListMovies?.length || 0}
          </span>
          <p className="text-[12px] text-slate-500 dark:text-[#767f94]">
            Total Favorites
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center gap-4 rounded-[9px] border-2 border-slate-200 bg-white p-3 text-slate-900 transition-colors dark:border-[#0d1828] dark:bg-[#09121e] dark:text-white">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 dark:bg-[#1f1c5a]">
          <Bookmark size={20} color="#8563fa" />
        </div>

        <div>
          <span className="text-[17px] font-bold">
            {favoriteWatchlistMovies?.length || 0}
          </span>
          <p className="text-[12px] text-slate-500 dark:text-[#767f94]">
            Watched
          </p>
        </div>
      </div>
    </div>
  )
}

export default WatchListStats