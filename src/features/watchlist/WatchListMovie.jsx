import { useEffect, useState } from "react"
import { DB_FAVORITES, DB_WATCHLIST, getFavorites } from "../../utils/api"
import { NavLink } from "react-router"
import { Star, EllipsisVertical, Play, Check, Trash, X, Heart, Loader2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { simulateApiDelay } from "../../utils/api"
import { removeFromWatchlist } from "./WatchListSlice"
import { addToFavorites, removeFromFavorites } from "@/features/favoriteList/FavoriteSlice"
import { addToWatchedMovies } from "../watchedmovies/watchedMoviesSlice"
import toast from "react-hot-toast"
import ConfirmActionModal from "@/components/ConfirmActionModal"
import { addActionToActivities } from "@/features/admin/dashboard/SiteActivitySlice"
import { addNewNotification } from "@/features/userProfile/user-notification/NotificationSlice"
import { getMovieAndContentSettings } from "@/features/admin/setting/AdminSettingSlice"


function WatchListMovie({ movie }) {
  const {
    Title,
    Year,
    Poster,
    id,
    imdbID,
    Runtime,
    imdbRating,
    Genre
  } = movie

  const { currentUser } = useSelector(state => state.auth)
  const { movieAndContentSettings } = useSelector(state => state.siteSettings)
  const userId = currentUser?.userId
  const [isFavoriteStat, setIsFavoriteStat] = useState(false)
  const [addingWatched, setAddingWatched] = useState(false)
  const [favoriteIsLoading, setFavoriteIsLoading] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const dispatch = useDispatch()

  async function handleIsFavorite() {
    if (!movieAndContentSettings.addtofavorites) {
      toast.error("Adding movie to favorites is disabled by admin!")
      return
    }

    setFavoriteIsLoading(true)
    await simulateApiDelay()

    const favoritesMovies = await getFavorites(userId)
    const isSelectedMovieAsFavorites = favoritesMovies.some(movie => movie.imdbID === imdbID && movie.userId === userId)


    if (!isSelectedMovieAsFavorites) {
      const res = await dispatch(addToFavorites({ movie: movie, userId }))

      if (addToFavorites.fulfilled.match(res)) {
        if (currentUser?.favoritesUpdateNotification) {
          const newNotification = {
            type: "favorite",
            title: "Movie Added to Favorites",
            description: `You've added "${Title}" to your favorites.`,
            userId: currentUser.userId,
          }

          await dispatch(addNewNotification({ newNotification }))

        }


        await dispatch(addActionToActivities({ name: currentUser?.fullname, movie: Title, type: "favorite-add" }))
        setIsFavoriteStat(true)
      }

    } else {
      await dispatch(removeFromFavorites({ imdbID, userId }))
      await dispatch(addActionToActivities({ name: currentUser?.fullname, movie: Title, type: "favorite-remove" }))
      setIsFavoriteStat(false)

    }
    setFavoriteIsLoading(false)
  }

  async function handleRemove() {
    setIsRemoving(true)

    try {
      const result = await dispatch(
        removeFromWatchlist({
          imdbID,
          userId,
        })
      )

      if (removeFromWatchlist.fulfilled.match(result)) {
        await dispatch(addActionToActivities({ name: currentUser?.fullname, movie: Title, type: "watchlist-remove" }))
        setIsConfirmOpen(false)
        setIsOpen(false)
      }
    } finally {
      setIsRemoving(false)
    }
  }

  async function handleWatched() {
    if (!movieAndContentSettings.markaswatched) {
      toast.error("Marking movie as watched is disabled by admin!")
      return
    }

    setAddingWatched(true)

    const result = await dispatch(
      addToWatchedMovies({
        userId: currentUser.userId,
        imdbID,
        Title,
      })
    )

    if (addToWatchedMovies.rejected.match(result)) {
      setAddingWatched(false)
      return
    }


    await simulateApiDelay()

    const res = await fetch(`${DB_WATCHLIST}/?imdbID=${imdbID}&userId=${currentUser.userId}`)

    if (!res.ok) {
      toast.error("Failed to check watchlist!")
      return
    }

    const movies = await res.json()
    const movie = movies[0]


    if (!movie) return


    const removeMovie = await dispatch(removeFromWatchlist({ movieId: id, userId }))

    if (!removeFromWatchlist.fulfilled.match(removeMovie)) {
      toast.error("Failed to remove movie from watchlist!")
      setAddingWatched(false)
      return
    }

    toast.success("Movie marked as watched successfully!")
    setAddingWatched(false)
  }

  useEffect(() => {
    async function getData() {
      await dispatch(getMovieAndContentSettings())
    }

    async function getFavoriteStatus() {
      const response = await fetch(`${DB_FAVORITES}/?imdbID=${imdbID}&userId=${userId}`);
      const movieIsFavorite = await response.json();

      setIsFavoriteStat(movieIsFavorite[0] ? true : false);
    }
    getData()
    getFavoriteStatus();
  }, [userId, imdbID, dispatch]);

  return (
    <div key={id} className="w-54 dark:bg-[#08121e] p-2 rounded-[10px] border-2 dark:border-[#0e1c2e] self-start">
      <div className="w-full h-51 relative">
        <img src={Poster} className=" w-full h-[95%] rounded-[10px]" />

        <div className="absolute top-2 right-2 backdrop-blur-[7px] rounded-2xl w-8 h-8 flex items-center justify-center cursor-pointer" onClick={handleIsFavorite}>
          {favoriteIsLoading ? <Loader2 className="animate-spin" /> : isFavoriteStat ? <Heart fill="#ff0000" color="#ff0000" /> : <Heart />}
        </div>
      </div>
      <div className="">
        <h1 className="text-[15px] ">
          {Title.length > 20
            ? Title.slice(0, 20) + "..."
            : Title}
        </h1>
        <div className="flex items-center gap-3 text-[#808797] text-[12px]">
          <p>{Year}</p>
          <span className="w-1 h-1 block dark:bg-[#525c75] rounded-[100%]"></span>
          <p>{Runtime}</p>
        </div>
        {movieAndContentSettings.showmovierating && <div className="flex items-center gap-2 mt-1">
          <Star size={14} fill="#fbbf24" className="text-[#fbbf24]" />
          <span className="font-semibold text-[12px] text-[#edf0f8]">{imdbRating}/10</span>
        </div>}
        <div className="flex gap-1 mt-1">
          {Genre.split(",").map((genre, index) => {
            return <span key={index} className="dark:bg-[#171c2c] text-[11px] px-2 py-0.75  rounded-[11px]">{genre}</span>
          })}
        </div>
      </div>
      <div className="mt-3">
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-2">

              <NavLink
                to={`${imdbID}`}
                className="flex items-center justify-center bg-[#5438cc] text-[11px] py-2 rounded-[9px] text-[#e5e6eb] hover:bg-[#6750ce] transition-all duration-200 gap-2"
              >
                <Play size={14} />
                <p>View Details</p>
              </NavLink>

              <button
                className="flex justify-center dark:bg-[#0f1a31] border-2 dark:border-[#172538] text-[11px] py-2 rounded-[9px] hover:bg-[#1c263d] text-[#e5e6eb] transition-all duration-200 cursor-pointer gap-2"
                onClick={handleWatched}
              >
                {addingWatched ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                <p>Mark Watched</p>
              </button>

              <div className="flex gap-1">
                <button
                  className="flex-1 flex justify-center dark:bg-[#0f1a31] border-2 dark:border-[#172538] text-[11px] py-2 rounded-[9px] hover:bg-[#1c263d] text-[#e5e6eb] transition-all duration-200 cursor-pointer gap-2"
                  onClick={async () => {
                    setIsConfirmOpen(true)
                    setIsOpen(false)
                  }}
                >
                  {isRemoving ? <Loader2 size={15} className="animate-spin" /> : <Trash size={14} />}
                  <p>Remove</p>
                </button>

                <button
                  className="flex items-center justify-center w-9 dark:bg-[#0f1a31] border-2 dark:border-[#172538] rounded-[7px] hover:bg-[#1c263d] transition-all duration-200 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={14} />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Closed state */}
        <div
          className={`transition-all duration-300 ease-in-out ${isOpen
            ? "opacity-0 max-h-0 overflow-hidden"
            : "opacity-100 max-h-20"
            }`}
        >
          <div className="flex gap-1">
            <NavLink
              to={`${imdbID}`}
              className="flex-1 flex justify-center bg-[#5438cc] text-[11px] py-2 rounded-[9px] text-[#e5e6eb] hover:bg-[#6750ce] transition-all duration-200"
            >
              View Details
            </NavLink>

            <span
              className="flex items-center justify-center w-8 dark:bg-[#0f1a31] border-2 dark:border-[#172538] rounded-[7px] hover:bg-[#1c263d] transition-all duration-200 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <EllipsisVertical size={15} />
            </span>
          </div>
        </div>
      </div>
      <ConfirmActionModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleRemove}
        isLoading={isRemoving}
        title="Remove from watchlist?"
        message="This movie will be permanently removed from your watchlist."
      />
    </div>
  )
}

export default WatchListMovie
