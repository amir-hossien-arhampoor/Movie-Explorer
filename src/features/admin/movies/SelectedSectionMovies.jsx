import Pagination from "@/components/Pagination";
import AddNewMovie from "@/features/admin/movies/components/AddNewMovie";
import MovieDetails from "@/features/admin/movies/components/MovieDetails";
import MovieRow from "@/features/admin/movies/components/MovieRow";
import MovieRowSkeletonList from "@/features/admin/movies/components/MovieRowSkeleton";
import { ArrowLeft, Save, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";


export default function SelectedSectionMovies({
  title,
  description,
  sectionMovies = [],
  sectionName,
  isLoading
}) {
  const [searchInput, setSearchInput] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddNewOpen, setIsAddNewOpen] = useState(false)

  const [selectedMovie, setSelectedMovie] = useState(sectionMovies[0]);

  const navigate = useNavigate()
  const searchedMovie = sectionMovies.filter(movie => movie.Title.toLowerCase().includes(searchInput))

  const moviesPerPage = 8
  const totalPages = Math.ceil(searchedMovie.length / moviesPerPage)
  const startIndex = (currentPage - 1) * moviesPerPage
  const endIndex = startIndex + moviesPerPage
  const paginatedMovies = searchedMovie.slice(startIndex, endIndex)




  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#061321] dark:text-white">
        {/* Page Header */}
        <div className="flex min-h-23.5 items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 lg:px-7 dark:border-[#173453]">
          <div className="flex items-center gap-4">
            <button
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-[7px] border border-slate-200 bg-white text-slate-600 transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700 dark:border-[#214363] dark:bg-[#091a2b] dark:text-[#9eb0c4] dark:hover:border-[#7655ff] dark:hover:bg-[#171443] dark:hover:text-white"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {title}
              </h1>

              <p className="mt-1 text-xs text-slate-500 dark:text-[#657b92]">
                {description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="flex h-10 cursor-pointer items-center gap-2 rounded-[7px] bg-violet-600 px-4 text-[14px] font-semibold text-white shadow-[0_5px_20px_rgba(128,100,237,0.18)] transition hover:bg-violet-700 dark:bg-[#8064ed] dark:hover:bg-[#7155da]"
              onClick={() => setIsAddNewOpen(true)}
            >
              <Save size={15} />
              Add movie
            </button>
          </div>
        </div>

        {/* Main */}
        <div>
          {/* Content */}
          <div className="p-4 lg:p-5 xl:p-6">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
              {/* Movie list */}
              <div className="flex-1 overflow-hidden rounded-[9px] border border-slate-200 bg-white dark:border-[#173453] dark:bg-[#071725]">
                {/* Toolbar */}
                <div className="flex flex-col gap-3 border-b border-slate-200 p-3 sm:flex-row dark:border-[#173453]">
                  <div className="relative flex-1">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#60758c]"
                    />

                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Search movies..."
                      className="h-10 w-full rounded-[7px] border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500 dark:border-[#203f5e] dark:bg-[#081a2b] dark:text-white dark:placeholder:text-[#596e84] dark:focus:border-[#7655ff]"
                    />
                  </div>
                </div>

                {/* Table header */}
                <div className="flex items-center border-b border-slate-200 bg-slate-50 px-4 py-3 text-[10px] font-medium uppercase text-slate-500 md:justify-between dark:border-[#173453] dark:bg-[#081a2b] dark:text-[#60758c]">
                  <span className="ml-10 w-74">Movie</span>
                  <span className="w-20">Year</span>
                  <span className="w-36">Rating</span>
                </div>

                {/* Rows */}
                <div>
                  {isLoading && <MovieRowSkeletonList count={10} />}

                  {paginatedMovies.map((movie, index) => (
                    <MovieRow
                      key={movie.id}
                      movie={movie}
                      index={index}
                      sectionName={sectionName}
                      selected={selectedMovie?.id === movie.id}
                      onSelect={setSelectedMovie}
                      onMovieRemoved={() => setSelectedMovie(null)}
                    />
                  ))}
                </div>
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                users={sectionMovies}
                startIndex={startIndex}
                endIndex={endIndex}
              />

              {/* Details */}
              <MovieDetails
                movie={selectedMovie}
                onMovieRemoved={() => setSelectedMovie(null)}
                sectionName={sectionName}
              />
            </div>
          </div>
        </div>
      </div>
      {isAddNewOpen && <AddNewMovie
        onClose={() => setIsAddNewOpen(false)}
        sectionName={sectionName}
        existingMovies={sectionMovies}
      />}
    </>
  );
}