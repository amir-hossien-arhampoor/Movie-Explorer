import MovieSection from "@/features/admin/movies/components/MovieSection";
import { getMoviesData } from "@/features/admin/movies/ManageMoviesSlice";
import { ArrowLeft, Flame, Star, Trophy, } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";


export default function ManageMovies() {
  const { popularMovies, featuredMovies, topRatedMovies, isLoading } = useSelector(state => state.manageMovies)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    async function getMovies() {
      await dispatch(getMoviesData())
    }
    getMovies()
  }, [dispatch])
  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-900 transition-colors duration-300 sm:p-5 lg:p-6 dark:bg-[#06111d] dark:text-white">
      {/* Back Button */}
      <button
        className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-[7px] border border-slate-200 bg-white text-slate-600 transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700 dark:border-[#214363] dark:bg-[#091a2b] dark:text-[#9eb0c4] dark:hover:border-[#7655ff] dark:hover:bg-[#171443] dark:hover:text-white"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} />
      </button>

      {/* Page Header */}
      <div className="mb-5 mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">Manage Movies</h1>
          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm dark:text-[#65768a]">Organize and manage movies featured on your homepage and site.</p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        <MovieSection
          title="Popular Movies"
          icon={Flame}
          description="The most watched and loved movies by our users."
          section={popularMovies}
          to="popular-movies"
          isLoading={isLoading}
        />

        <MovieSection
          title="Featured Movies"
          icon={Star}
          description="Handpicked movies for your homepage."
          section={featuredMovies}
          to="featured-movies"
          isLoading={isLoading}
        />

        <MovieSection
          title="Top Rated Movies"
          icon={Trophy}
          description="Highly rated by your community."
          section={topRatedMovies}
          to="toprated-movies"
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}