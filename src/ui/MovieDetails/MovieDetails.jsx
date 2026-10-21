import { useNavigate, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import StreamingService from "@/ui/MovieDetails/StreamingService"
import CastCard from "@/ui/MovieDetails/MovieCast"
import SimilarMovieCard from "@/ui/MovieDetails/SimilarMovies"
import InfoItem from "@/ui/MovieDetails/MovieTabs"
import { addToWatchlist, fetchMovieById, removeFromWatchlist } from "../../features/watchlist/WatchListSlice"
import Rating from "../../components/Rating"
import { addToWatchedMovies, getWatchedMovie } from "../../features/watchedmovies/watchedMoviesSlice"
import { addToFavorites, removeFromFavorites } from "../../features/favoriteList/FavoriteSlice"
import { DB_WATCHLIST, simulateApiDelay, getFavorites, DB_FAVORITES, getWatchList } from "../../utils/api"
import toast from "react-hot-toast"
import { AlertCircle, Bookmark, CalendarDays, Clock3, Eye, Flame, Heart, Loader2, Play, Star, UserRound, UsersRound, } from "lucide-react";
import { formatNumber, formatRuntime } from "@/utils/date"
import { getSimilarMovies } from "@/features/search/SearchSlice"
import { getMovieActors } from "@/ui/MovieDetails/MovieDetailsSlice"
import MovieDetailsSkeleton from "@/components/MovieDetailSkeletonLoading"
import { addActionToActivities } from "@/features/admin/dashboard/SiteActivitySlice"
import { getMovieAndContentSettings } from "@/features/admin/setting/AdminSettingSlice"


function MovieDetails() {
  const [isFavoriteStat, setIsFavoriteStat] = useState(false)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const { isPageLoading, isLoading: watchlistIsLoading, currentMovie } = useSelector(state => state.watchList)
  const { similarMovies } = useSelector(state => state.search)
  const { actors } = useSelector(state => state.movieDetail)
  const { currentUser } = useSelector(state => state.auth)
  const { currentWatchedMovie, isLoading: watchedIsLoading } = useSelector(state => state.watchedMovie)
  const { favoriteIsLoading } = useSelector(state => state.favorite)
  const { movieAndContentSettings } = useSelector(state => state.siteSettings)
  const userId = currentUser.userId
  const {
    Actors,
    Awards,
    BoxOffice,
    Director,
    Genre = "",
    Language,
    Plot,
    Poster,
    Released,
    Runtime,
    Title,
    Writer,
    Year,
    imdbRating,
    imdbVotes,
    Rated,
    Metascore,
    ratingNumber,
    imdbID
  } = currentMovie

  const { movieDetails } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()


  async function handleWatched() {

    const result = await dispatch(
      addToWatchedMovies({
        userId: currentUser.userId,
        imdbID,
        Title,
      })
    )

    if (addToWatchedMovies.rejected.match(result)) {
      toast.error("Failed to mark movie as watched!")
      return
    }

    await simulateApiDelay()

    const res = await fetch(
      `${DB_WATCHLIST}/?imdbID=${imdbID}&userId=${currentUser.userId}`
    )

    if (!res.ok) {
      toast.error("Failed to check watchlist!")
      return
    }

    const movies = await res.json()
    const movie = movies[0]


    if (!movie) {
      return
    }

    const removeMovie = await fetch(`${DB_WATCHLIST}/${movie.id}`, {
      method: "DELETE",
    })

    if (!removeMovie.ok) {
      toast.error("Failed to remove movie from watchlist!")
      return
    }

  }

  async function handleIsFavorite() {
    await simulateApiDelay()

    const favoritesMovies = await getFavorites(userId)
    const isSelectedMovieAsFavorites = favoritesMovies.some(movie => movie.imdbID === imdbID && movie.userId === userId)


    if (!isSelectedMovieAsFavorites) {
      const res = await dispatch(addToFavorites({ movie: currentMovie, userId: userId }))

      if (addToFavorites.fulfilled.match(res)) {
        setIsFavoriteStat(true)
        await dispatch(addActionToActivities({ name: currentUser?.fullname, movie: Title, type: "favorite-add" }))
      }

    } else {
      const res = await dispatch(removeFromFavorites({ imdbID, userId }))
      if (removeFromFavorites.fulfilled.match(res)) {
        setIsFavoriteStat(false)
        await dispatch(addActionToActivities({ name: currentUser?.fullname, movie: Title, type: "favorite-remove" }))
      }

    }
  }

  async function handleIsInWatchlist() {
    await simulateApiDelay()

    const watchListMovies = await getWatchList(userId)
    const isSelectedMovieInWatchlist = watchListMovies.some(movie => movie.imdbID === imdbID && movie.userId === userId)

    if (!isSelectedMovieInWatchlist) {
      const res = await dispatch(addToWatchlist({ movie: currentMovie, userId: userId }))

      if (addToWatchlist.fulfilled.match(res)) {
        await dispatch(addActionToActivities({ name: currentUser?.fullname, movie: Title, type: "watchlist-add" }))
        setIsInWatchlist(true)
      }

    } else {
      const removeRes = await dispatch(removeFromWatchlist({ movieId: imdbID, userId }))

      if (removeFromWatchlist.fulfilled.match(removeRes)) {
        await dispatch(addActionToActivities({ name: currentUser?.fullname, movie: Title, type: "watchlist-remove" }))
      }

      setIsInWatchlist(false)

    }
  }

  useEffect(() => {
    dispatch(
      fetchMovieById({
        movieId: movieDetails,
        userId: currentUser.userId
      }),
      dispatch(
        getWatchedMovie({
          userId: currentUser.userId,
          imdbID: imdbID
        })
      )
    );
  }, [dispatch, movieDetails, currentUser.userId, imdbID])

  useEffect(() => {
    async function getData() {
      await dispatch(getMovieAndContentSettings())
    }

    async function getSimilar() {
      await dispatch(getSimilarMovies({ query: Title, imdbID: imdbID }))
      await dispatch(getMovieActors({ actors: Actors?.split(",") }))
    }
    async function getFavoriteStatus() {
      const watchlistresponse = await fetch(`${DB_WATCHLIST}/?imdbID=${imdbID}&userId=${userId}`);
      const movieIsInWatchlist = await watchlistresponse.json();

      const favoriteresponse = await fetch(`${DB_FAVORITES}/?imdbID=${imdbID}&userId=${userId}`);
      const movieIsFavorite = await favoriteresponse.json();

      setIsFavoriteStat(movieIsFavorite[0] ? true : false);
      setIsInWatchlist(movieIsInWatchlist[0] ? true : false);
    }
    getData()
    getSimilar()
    getFavoriteStatus();
  }, [Title, dispatch, imdbID, Actors, userId])


  return (
    <>
      {isPageLoading ? (
        <MovieDetailsSkeleton />
      ) : (
        <div className="min-h-screen bg-white text-slate-900 dark:bg-[#020b16] dark:text-white">
          <button
            onClick={() => navigate(-1)}
            className="mx-6 my-3 flex h-9 w-20 cursor-pointer items-center justify-center gap-3 rounded-[8px] bg-gradient-to-r from-violet-600 to-violet-700 px-8 text-[13px] font-semibold text-white shadow-[0_8px_25px_rgba(124,76,231,0.18)] transition hover:brightness-110 dark:from-[#8654ed] dark:to-[#7951df]"
          >
            Back
          </button>

          {/* ================= HERO ================= */}
          <section className="border-b border-slate-200 dark:border-[#142a47]">
            <div className="mx-auto grid max-w-300 grid-cols-1 gap-8 px-6 py-9 lg:grid-cols-[245px_1fr_275px]">
              {/* Poster */}
              <div className="relative h-100 overflow-hidden rounded-[6px] border border-slate-200 bg-slate-100 dark:border-[#193858] dark:bg-[#071728]">
                <img src={Poster} alt={Title} className="h-full w-full object-fill" />
                <span className="absolute bottom-3 left-3 rounded-[5px] bg-black/80 px-2.5 py-1.5 text-[11px] font-bold text-white">
                  HD
                </span>
              </div>

              {/* Main movie information */}
              <div className="pt-1">
                <h1 className="text-[30px] font-bold tracking-tight text-slate-900 dark:text-[#f2f3fa]">
                  {Title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px]">
                  {movieAndContentSettings.showmovierating && (
                    <div className="flex items-center gap-2">
                      <Star size={17} fill="#fbbf24" className="text-[#fbbf24]" />
                      <span className="font-semibold text-slate-800 dark:text-[#edf0f8]">
                        {imdbRating}/10
                      </span>
                    </div>
                  )}

                  <span className="text-slate-500 dark:text-[#65728a]">
                    ({formatNumber(Number(imdbVotes?.replace(/,/g, "")))} votes)
                  </span>
                  <span className="h-4 w-px bg-slate-300 dark:bg-[#253652]" />
                  <span className="text-slate-600 dark:text-[#aab3c5]">{Year}</span>
                  <span className="h-4 w-px bg-slate-300 dark:bg-[#253652]" />
                  <span className="rounded bg-slate-100 px-2 py-1 text-slate-600 dark:bg-[#101d31] dark:text-[#aab3c5]">
                    {Rated}
                  </span>
                  <span className="h-4 w-px bg-slate-300 dark:bg-[#253652]" />
                  <span className="text-slate-600 dark:text-[#aab3c5]">
                    {formatRuntime(Runtime)}
                  </span>
                  <span className="h-4 w-px bg-slate-300 dark:bg-[#253652]" />
                  <span className="text-slate-600 dark:text-[#aab3c5]">
                    {Genre.replace(/,\s*/g, " · ")}
                  </span>
                </div>

                <p className="mt-5 max-w-162 text-[15px] leading-[1.7] text-slate-600 dark:text-[#d3d9e7]">
                  {Plot}
                </p>

                {/* Buttons */}
                <div className="mt-5 flex flex-col gap-3">
                  <button className="flex h-11.75 w-50 cursor-pointer items-center justify-center gap-3 rounded-[8px] bg-gradient-to-r from-violet-600 to-violet-700 px-8 text-[13px] font-semibold text-white shadow-[0_8px_25px_rgba(124,76,231,0.18)] transition hover:brightness-110 dark:from-[#8654ed] dark:to-[#7951df]">
                    <Play size={17} fill="white" />
                    Watch Trailer
                  </button>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6">
                    <button
                      className="flex h-11.75 items-center gap-2 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-[13px] text-slate-700 transition hover:border-violet-400 dark:border-[#3b4c80] dark:bg-[#071426] dark:text-[#dce1ed] dark:hover:border-[#8063e8]"
                      onClick={handleIsInWatchlist}
                    >
                      {isInWatchlist ? (
                        <>
                          {watchlistIsLoading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <Bookmark size={18} fill="#a879ff" color="#a879ff" />
                          )}
                          Remove from watchlist
                        </>
                      ) : (
                        <>
                          {watchlistIsLoading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <Bookmark size={18} className="text-violet-500 dark:text-[#a879ff]" />
                          )}
                          Add to watchlist
                        </>
                      )}
                    </button>

                    <button
                      className="flex h-11.75 items-center gap-2 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-[13px] text-slate-700 transition hover:border-violet-400 dark:border-[#3b4c80] dark:bg-[#071426] dark:text-[#dce1ed] dark:hover:border-[#8063e8]"
                      onClick={handleIsFavorite}
                    >
                      {isFavoriteStat ? (
                        <>
                          {favoriteIsLoading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <Heart size={18} fill="#a879ff" color="#a879ff" />
                          )}
                          Remove from Favorites
                        </>
                      ) : (
                        <>
                          {favoriteIsLoading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <Heart size={18} className="text-violet-500 dark:text-[#a879ff]" />
                          )}
                          Add to Favorites
                        </>
                      )}
                    </button>

                    <button
                      className="flex h-11.75 items-center gap-2 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-[13px] text-slate-700 transition hover:border-violet-400 dark:border-[#3b4c80] dark:bg-[#071426] dark:text-[#dce1ed] dark:hover:border-[#8063e8]"
                      onClick={handleWatched}
                    >
                      {currentWatchedMovie ? (
                        <>
                          <Eye size={18} className="text-violet-500 dark:text-[#a879ff]" />
                          Watched already
                        </>
                      ) : (
                        <>
                          {watchedIsLoading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <Eye size={18} className="text-violet-500 dark:text-[#a879ff]" />
                          )}
                          Mark as watched
                        </>
                      )}
                    </button>
                  </div>

                  {isInWatchlist && !movieAndContentSettings.movierating && (
                    <p className="mt-2 flex items-center gap-1 text-[13px] text-red-600 dark:text-red-500">
                      <AlertCircle size={16} />
                      Rating movie turned off by admin!
                    </p>
                  )}

                  {isInWatchlist && movieAndContentSettings.movierating && (
                    <div>
                      <Rating
                        ratingNumber={ratingNumber}
                        imdbID={imdbID}
                        max={movieAndContentSettings.maxrating}
                      />
                    </div>
                  )}
                </div>

                {/* Movie metadata */}
                <div className="mt-9 grid grid-cols-2 gap-y-5 sm:grid-cols-4">
                  <InfoItem icon={UserRound} label="Director" value={Director} />
                  <InfoItem icon={UsersRound} label="Writer" value={Writer?.split(",")[0]} />
                  <InfoItem icon={Clock3} label="Runtime" value={formatRuntime(Runtime)} />
                  {movieAndContentSettings.showreleasedate && (
                    <InfoItem icon={CalendarDays} label="Release Date" value={Released} />
                  )}
                </div>
              </div>

              {/* Right stats card */}
              <div className="rounded-[7px] border border-slate-200 bg-slate-50 p-5 dark:border-[#193454] dark:bg-[#061425]">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-emerald-300 bg-emerald-50 text-[18px] font-bold text-emerald-700 dark:border-[#00a86b] dark:bg-[#063e32] dark:text-[#e4fff5]">
                    {imdbRating}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-slate-800 dark:text-[#dce1ec]">
                      IMDb Rating
                    </p>
                    <p className="mt-1 text-[12px] text-slate-500 dark:text-[#7d899e]">
                      {formatNumber(Number(imdbVotes?.replace(/,/g, "")))} votes
                    </p>
                  </div>
                </div>

                <div className="my-4 h-px bg-slate-200 dark:bg-[#19314e]" />

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[9px] border border-slate-200 bg-slate-100 dark:border-[#293d63] dark:bg-[#101d35]">
                    <Flame size={22} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-[13px] text-slate-600 dark:text-[#aab4c8]">
                      Popularity
                    </p>
                    <div className="mt-1 flex items-center gap-3">
                      <span className="text-[14px] font-semibold text-slate-900 dark:text-white">
                        #{Metascore}
                      </span>
                      <span className="text-[12px] text-slate-500 dark:text-[#7c879c]">
                        in Top Rated Movies
                      </span>
                    </div>
                  </div>
                </div>

                <div className="my-4 h-px bg-slate-200 dark:bg-[#19314e]" />

                <h3 className="font-semibold text-slate-800 dark:text-[#edf0f8]">
                  Where to watch
                </h3>

                <div className="mt-4 flex gap-7">
                  <StreamingService label="Netflix">
                    <span className="text-xl text-[#e50914]">N</span>
                  </StreamingService>
                  <StreamingService label="Prime Video">
                    <span className="text-[10px]">prime</span>
                  </StreamingService>
                </div>
              </div>
            </div>
          </section>

          {/* ================= CONTENT ================= */}
          <main className="mx-auto max-w-300 px-6 py-7">
            <div className="grid grid-cols-1 gap-9 lg:grid-cols-[1fr_380px]">
              {/* Left */}
              <div>
                <section>
                  <h2 className="text-[20px] font-bold text-slate-900 dark:text-[#edf0f8]">
                    Overview
                  </h2>
                  <p className="mt-4 max-w-175 text-[13px] leading-[1.8] text-slate-600 dark:text-[#c0c8d8]">
                    {Plot}
                  </p>
                </section>

                <div className="my-7 h-px bg-slate-200 dark:bg-[#162d4a]" />

                {/* Cast */}
                <section>
                  <div className="flex items-center justify-between">
                    <h2 className="text-[19px] font-bold text-slate-900 dark:text-[#edf0f8]">
                      Main Cast
                    </h2>
                  </div>

                  {Array.isArray(actors) && actors.length > 0 ? (
                    <div className="mt-5 flex items-center gap-4">
                      {actors.map((member) => (
                        <CastCard key={member.name} member={member} />
                      ))}
                    </div>
                  ) : (
                    <div className="mt-5 flex min-h-32 flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-5 py-7 text-center dark:border-[#1b2c43] dark:bg-[#0b1727]">
                      <p className="text-sm font-medium text-slate-700 dark:text-[#c3ccda]">
                        Cast information unavailable
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-[#718096]">
                        Actor details are currently unavailable for this movie.
                      </p>
                    </div>
                  )}
                </section>
              </div>

              {/* ================= RIGHT COLUMN ================= */}
              <aside>
                {/* Key Facts */}
                <div className="rounded-[7px] border border-slate-200 bg-slate-50 p-5 dark:border-[#193454] dark:bg-[#061425]">
                  <h2 className="text-[17px] font-bold text-slate-900 dark:text-[#edf0f8]">
                    Key Facts
                  </h2>

                  <div className="mt-4">
                    {[
                      ["Original Title", Title],
                      ["Status", "Released"],
                      ["Language", Language],
                      ["Budget", BoxOffice || "N/A"],
                      ["Awards", Awards],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="grid grid-cols-[1fr_1.2fr] border-b border-slate-200 py-3 last:border-0 dark:border-[#152b47]"
                      >
                        <span className="text-[11px] text-slate-500 dark:text-[#8994a9]">
                          {label}
                        </span>
                        <span className="text-[11px] font-medium text-slate-800 dark:text-[#dfe3ed]">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Similar movies */}
                <section className="mt-7">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[18px] font-bold text-slate-900 dark:text-[#edf0f8]">
                      Similar Movies
                    </h2>
                  </div>

                  <div className="mt-5 grid grid-cols-4 gap-3">
                    {similarMovies.map((movie) => (
                      <SimilarMovieCard key={movie.title} movie={movie} />
                    ))}
                  </div>
                </section>
              </aside>
            </div>
          </main>
        </div>
      )}
    </>
  )

}

export default MovieDetails

