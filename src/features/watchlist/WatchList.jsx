import { useEffect, useState } from "react"
import { NavLink } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import AuthRequired from "../../components/AuthRequired"
import WatchListStats from "./WatchListStats"
import WatchListSearchSort from "./WatchListSearchSort"
import WatchListMovie from "./WatchListMovie"
import { RotateCcw, Search } from "lucide-react"
import SkeletonLoading from "@/components/SkeletonLoading"



function WatchList() {

  const { isLoading, searchQuery, sortValue ,watchListMovies} = useSelector(state => state.watchList)
  const [inputValue, setInputValue] = useState(searchQuery)
  const { currentUser } = useSelector(state => state.auth)
  const userId = currentUser?.userId
  const dispatch = useDispatch()

  const filteredMovies = watchListMovies.filter(movie =>
    movie.Title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  )

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortValue === "Recently Added") {
      return b.addedAt - a.addedAt
    }

    if (sortValue === "Oldest Added") {
      return a.addedAt - b.addedAt
    }

    if (sortValue === "Highest Rated") {
      return Number(b.imdbRating) - Number(a.imdbRating)
    }

    if (sortValue === "Lowest Rated") {
      return Number(a.imdbRating) - Number(b.imdbRating)
    }

    if (sortValue === "Year") {
      return Number(b.Year.slice(0, 4)) - Number(a.Year.slice(0, 4))
    }

    if (sortValue === "Title A–Z") {
      return a.Title.localeCompare(b.Title)
    }

    if (sortValue === "Title Z–A") {
      return b.Title.localeCompare(a.Title)
    }
  })

  useEffect(() => {
    if (currentUser === null) {
      dispatch({ type: "auth/allowDenied" })
    } else {
      dispatch({ type: "auth/allowConfirm" })
    }

    if (!userId) return

  }, [dispatch, userId, currentUser])


  return (
    <>
      <div className="px-4 py-6 relative">

        {/* watchlist header */}
        <div className="">
          <div className="">
            <h1 className="text-[24px] font-bold dark:text-white">My Watchlist</h1>
            <p className="text-[13px] dark:text-[#909ebb]">Keep track of the movies you want to watch.</p>
          </div>
          <WatchListStats />
        </div>

        {/* watchlist main */}
        <div className="">

          {/* Watchlist search & sort */}
          <WatchListSearchSort inputValue={inputValue} setInputValue={setInputValue} />

          {/* Watchlist movies */}
          <div className="mt-5">
            {isLoading ? (
              <div className="flex flex-wrap max-lg:justify-center max-sm:justify-start  gap-7 mt-8">
                {Array.from({ length: 10 }).map((_, index) => (
                  <SkeletonLoading key={index} />
                ))}
              </div>
            ) : watchListMovies.length === 0 ? (
              <div className="flex flex-col items-center">
                <img src="no-watchlist.png" alt="" className="w-130" />

                <NavLink
                  to="/explore"
                  className="flex items-center justify-center bg-[#5438cc] text-[15px] px-10 py-2 rounded-[9px] text-[#e5e6eb] hover:bg-[#6750ce] transition-all duration-200 gap-2"
                >
                  <Search size={20} />
                  <p>Explore Movies</p>
                </NavLink>
              </div>
            ) : filteredMovies.length === 0 ? (
              <button
                className="flex flex-col items-center"

              >
                <img src="Nomoviefound.png" alt="" />

                <div className="flex items-center justify-center bg-[#5438cc] text-[15px] px-10 py-2 rounded-[9px] text-[#e5e6eb] hover:bg-[#6750ce] transition-all duration-200 gap-2 cursor-pointer"
                  onClick={() => {
                    dispatch({ type: "watchlist/clearFilter" })
                    setInputValue("")
                  }}
                >
                  <RotateCcw size={20} />
                  <p>Clear filter</p>
                </div>
              </button>
            ) : (
              <div className="flex flex-wrap max-lg:justify-center max-sm:justify-start  gap-7 mt-8">
                {sortedMovies.map(movie => (
                  <WatchListMovie
                    key={movie.id}
                    movie={movie}
                  />
                ))}
              </div>
            )}
          </div>
        </div>



      </div>
      {!currentUser && <AuthRequired />}
    </>
  )
}

export default WatchList




