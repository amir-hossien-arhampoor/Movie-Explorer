import { getFeaturedMovies } from "@/utils/api";
import { formatNumber, formatRuntime } from "@/utils/date";
import { Star, Play, Bookmark, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addToWatchlist, removeFromWatchlist } from "../../features/watchlist/WatchListSlice"
import { simulateApiDelay, getWatchList, DB_WATCHLIST } from "../../utils/api"
import toast from "react-hot-toast";



function FeaturedMovies() {
  const [featuredMovie, setFeaturedMovie] = useState({})
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const { isLoading: watchlistIsLoading } = useSelector(state => state.watchList)
  const { currentUser } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const userId = currentUser?.userId

  async function handleIsInWatchlist() {
    if (!currentUser) {
      toast.error("You need to login before adding movies to watchlist!")
      return
    }

    await simulateApiDelay()

    const watchListMovies = await getWatchList(userId)
    const isSelectedMovieInWatchlist = watchListMovies.some(movie => movie.imdbID === featuredMovie.imdbID && movie.userId === userId)

    if (!isSelectedMovieInWatchlist) {
      const res = await dispatch(addToWatchlist({ movie: featuredMovie, userId: userId }))

      if (addToWatchlist.fulfilled.match(res)) {
        setIsInWatchlist(true)
      }

    } else {
      await dispatch(removeFromWatchlist({ movieId: featuredMovie.imdbID, userId }))
      setIsInWatchlist(false)

    }
  }

  useEffect(() => {
    async function getFeatured() {
      const data = await getFeaturedMovies()
      setFeaturedMovie(data[data.length - 1])
    }
    getFeatured()
  }, [])

  useEffect(() => {
    async function getFavoriteStatus() {
      const watchlistresponse = await fetch(`${DB_WATCHLIST}/?imdbID=${featuredMovie.imdbID}&userId=${userId}`);
      const movieIsInWatchlist = await watchlistresponse.json();

      setIsInWatchlist(movieIsInWatchlist[0] ? true : false);
    }
    getFavoriteStatus();
  }, [userId, featuredMovie.imdbID]);

  return (
    <div className="rounded-[10px] border border-[#cfccd3] bg-[#f7f9fc] dark:border-[#292D35] dark:bg-[#040b14] p-3">
      <div className="flex flex-col gap-5 sm:flex-row">
        <img
          src={featuredMovie.Poster}
          alt="Dune Part Two"
          className="h-61.25 w-full rounded-lg object-cover sm:w-43.75"
        />

        <div className="flex flex-1 flex-col py-1">
          <h3 className="text-[19px] font-semibold dark:text-white text-black">
            {featuredMovie.Title}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-[11px] text-[#7e8da1]">
            <span>{featuredMovie.Year}</span>
            <span>•</span>
            <span>{formatRuntime(featuredMovie.Runtime)}</span>
            <span>•</span>
            <span>{featuredMovie.Rated}</span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Star size={15} fill="#f6bd3c" className="text-[#f6bd3c]" />
            <span className="text-[13px] font-semibold dark:text-white text-black">
              {featuredMovie.imdbRating}/10
            </span>
            <span className="text-[11px] text-[#64758b]">({formatNumber(Number(featuredMovie.imdbVotes?.replace(/,/g, "")))})</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {featuredMovie?.Genre?.split(",").map((genre) => (
              <span
                key={genre}
                className="rounded-full px-3 py-1 text-[9px] dark:bg-[#14243a] dark:text-[#aab6c7] bg-[#c3c7ce7a] dark:border-[#292D35] text-black"
              >
                {genre}
              </span>
            ))}
          </div>

          <p className="mt-4 max-w-120 text-[11px] leading-5 dark:text-[#8594a8] text-gray-700">
            {featuredMovie.Plot}
          </p>

          <div className="mt-auto flex flex-wrap gap-3 pt-5">
            <button className="flex items-center gap-2 rounded-md bg-[#4c37eb] px-4 py-2.5 text-[11px] font-semibold text-white cursor-pointer">
              <Play size={14} fill="currentColor" />
              Watch Trailer
            </button>


            <button className="flex h-11.75 items-center gap-2 rounded-[8px] border dark:border-[#3b4c80] dark:bg-[#071426] px-3 text-[13px] text-black dark:text-[#dce1ed] transition hover:border-[#8063e8] hover:bg-[#8063e82f] cursor-pointer"
              onClick={handleIsInWatchlist}
            >

              {isInWatchlist ?
                <>
                  {watchlistIsLoading ? <Loader2 className="animate-spin" /> : <Bookmark size={18} fill="#a879ff" color="#a879ff" />}
                  Remove from watchlist
                </>
                :
                <>
                  {watchlistIsLoading ? <Loader2 className="animate-spin" /> : <Bookmark size={18} className="text-[#a879ff]" />}
                  Add to watchlist
                </>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedMovies
