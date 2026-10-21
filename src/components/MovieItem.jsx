import { useDispatch, useSelector } from "react-redux"
import { addToWatchlist, fetchMovieById } from "../features/watchlist/WatchListSlice"
import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { Heart, Play, Check, Info, Loader2 } from "lucide-react"
import toast from "react-hot-toast";
import { simulateApiDelay, getFavorites, DB_FAVORITES } from "@/utils/api";
import { addToFavorites, removeFromFavorites } from "../features/favoriteList/FavoriteSlice"
import { addToWatchedMovies } from "../features/watchedmovies/watchedMoviesSlice"
import { getFavoritesWatchedMovie } from "@/features/favoriteList/FavoriteSlice"
import { addActionToActivities } from "@/features/admin/dashboard/SiteActivitySlice";
import { addNewNotification } from "@/features/userProfile/user-notification/NotificationSlice";
import { getMovieAndContentSettings } from "@/features/admin/setting/AdminSettingSlice";

function MovieItem({ movie }) {
  const [isFavoriteStat, setIsFavoriteStat] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [addingWatched, setAddingWatched] = useState(false)
  const [favoriteIsLoading, setFavoriteIsLoading] = useState(false)
  const { currentUser } = useSelector(state => state.auth)
  const { movieAndContentSettings } = useSelector(state => state.siteSettings)
  const userId = currentUser?.userId
  const dispatch = useDispatch()
  const { Title, Year, Poster, id, imdbID } = movie


  async function handleAddingMovie(e) {
    e.preventDefault()

    if (currentUser === null) {
      dispatch({ type: "search/allowDenied" })
      return
    }
    if (!movieAndContentSettings.addtowatchlist) {
      toast.error("Adding movie to watchlist is disabled by admin!")
      return
    }
    setIsLoading(true)

    const apiRes = await dispatch(fetchMovieById({ movieId: imdbID, userId: currentUser.userId }))
    const apiResPayload = apiRes.payload

    if (fetchMovieById.rejected.match(apiRes)) return

    const addRes = await dispatch(addToWatchlist({ movie: apiResPayload, userId, id: currentUser.id }))

    if (addToWatchlist.fulfilled.match(addRes)) {
      if (currentUser?.watchlistUpdateNotification) {
        const newNotification = {
          type: "watchlist",
          title: "Movie Added to Watchlist",
          description: `You've added "${Title}" to your watchlist.`,
          userId: currentUser.userId,
        };
        await dispatch(addNewNotification({ newNotification }))

      }

      await dispatch(addActionToActivities({ name: currentUser?.fullname, movie: Title, type: "watchlist-add" }))
      setIsLoading(false)
    }
    setIsLoading(false)
  }

  async function handleIsFavorite() {
    if (!movieAndContentSettings.addtofavorites) {
      toast.error("Adding movie to favorites is disabled by admin!")
      return
    }

    await simulateApiDelay()

    setFavoriteIsLoading(true)

    const favoritesMovies = await getFavorites(userId)
    const isSelectedMovieAsFavorites = favoritesMovies.some(movie => movie.imdbID === imdbID && movie.userId === userId)


    if (!isSelectedMovieAsFavorites) {
      const res = await dispatch(addToFavorites({ movie: movie, userId: userId }))

      if (addToFavorites.fulfilled.match(res)) {
        if (currentUser.favoritesUpdateNotification) {

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
      const removeRes = await dispatch(removeFromFavorites({ imdbID, userId }))

      if (removeFromFavorites.fulfilled.match(removeRes)) {
        await dispatch(addActionToActivities({ name: currentUser?.fullname, movie: Title, type: "favorite-remove" }))

        setIsFavoriteStat(false)
      }
      setIsFavoriteStat(false)

    }
    setFavoriteIsLoading(false)
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


    await dispatch(
      getFavoritesWatchedMovie({
        userId: currentUser.userId
      })
    )

    const newNotification = {
      type: "watched",
      title: "Movie Marked as Watched",
      description: `You've marked "${Title}" as watched.`,
      userId: currentUser.userId,
    };
    await dispatch(addNewNotification({ newNotification }));

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

    <div
      key={id}
      className="w-52 rounded-[10px] border-2 border-slate-200 bg-white p-2 text-slate-900 transition-colors duration-200 dark:border-[#0e1c2e] dark:bg-[#08121e] dark:text-white"
    >
      <div className="relative h-51 w-full">
        <img
          src={Poster}
          alt={Title}
          className="h-[95%] w-full rounded-[10px] object-cover"
        />

        <div
          className="absolute right-2 top-2 flex size-8 cursor-pointer items-center justify-center rounded-2xl bg-white/70 backdrop-blur-[7px] transition-colors hover:bg-white dark:bg-[#08121e]/70 dark:hover:bg-[#08121e]"
          onClick={handleIsFavorite}
        >
          {favoriteIsLoading ? (
            <Loader2
              className="animate-spin text-violet-600 dark:text-[#9588ff]"
              size={20}
            />
          ) : isFavoriteStat ? (
            <Heart fill="#ff0000" color="#ff0000" />
          ) : (
            <Heart className="text-slate-700 dark:text-white" />
          )}
        </div>
      </div>

      <div>
        <h1 className="text-[15px] font-medium text-slate-900 dark:text-white">
          {Title.length > 20 ? Title.slice(0, 20) + "..." : Title}
        </h1>

        <div className="flex items-center gap-3 text-[12px] text-slate-500 dark:text-[#808797]">
          <p>{Year}</p>
        </div>
      </div>

      <div className="mt-3">
        <div className="grid transition-[grid-template-rows] duration-300 ease-in-out">
          <div className="overflow-hidden">
            <div className="flex flex-col gap-2">
              <button
                className="flex cursor-pointer items-center justify-center gap-2 rounded-[9px] bg-[#5438cc] py-2 text-[11px] text-white transition-all duration-200 hover:bg-[#6750ce]"
                onClick={handleAddingMovie}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <p>Loading</p>
                  </>
                ) : (
                  <>
                    <Play size={14} />
                    <p>Add to watchlist</p>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-[9px] border-2 border-slate-200 bg-slate-100 py-2 text-[11px] text-slate-700 transition-all duration-200 hover:bg-slate-200 dark:border-[#172538] dark:bg-[#0f1a31] dark:text-[#e5e6eb] dark:hover:bg-[#1c263d]"
                  onClick={handleWatched}
                >
                  {addingWatched ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Check size={14} />
                  )}
                  <p>Mark Watched</p>
                </button>

                <NavLink
                  to={`${imdbID}`}
                  aria-label={`View details for ${Title}`}
                  className="flex size-9 cursor-pointer items-center justify-center rounded-[7px] border-2 border-slate-200 bg-slate-100 text-slate-700 transition-all duration-200 hover:bg-slate-200 dark:border-[#172538] dark:bg-[#0f1a31] dark:text-white dark:hover:bg-[#1c263d]"
                >
                  <Info size={20} />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default MovieItem

