import { useState } from "react";
import { Search, X, Plus, Loader2, Film, ChevronLeft, ChevronRight, } from "lucide-react";
import SearchLoading from "@/features/admin/movies/components/SearchLoading";
import EmptySearch from "@/features/admin/movies/components/EmptySearch";
import MovieSearchResult from "@/features/admin/movies/components/MovieSearchResult";
import PaginationButton from "@/features/admin/movies/components/PaginationButton";
import NoMovieSelected from "@/features/admin/movies/components/NoMovieSelected";
import SelectedMovie from "@/features/admin/movies/components/SelectedMovie";
import { API_KEY } from "@/utils/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToSelectedSection } from "@/features/admin/movies/ManageMoviesSlice";
import { addNewNotification } from "@/features/userProfile/user-notification/NotificationSlice";



export default function AddNewMovie({ onClose, sectionName = "popular", existingMovies = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const dispatch = useDispatch()

  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);


  async function handleSearch(e) {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      setSearchResults([]);
      setSelectedMovie(null);
      setTotalResults(0);
      return;
    }

    try {
      setIsSearching(true);
      setCurrentPage(1);

      const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
      const data = await response.json();

      if (data.Response === "True") {
        setSearchResults(data.Search);
        setTotalResults(Number(data.totalResults) || 0);

        if (data.Search?.length > 0) {
          const firstMovie = await getMovieDetails(
            data.Search[0].imdbID
          );

          setSelectedMovie(firstMovie);
        }
      } else {
        setSearchResults([]);
        setSelectedMovie(null);
        setTotalResults(0);
      }
    } catch {
      toast.error("Failed to search movies. Try again.");
      setSearchResults([]);
      setSelectedMovie(null);
    } finally {
      setIsSearching(false);
    }
  }

  async function getMovieDetails(imdbID) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`);
    const data = await response.json();

    if (data.Response === "True") return data;

    return null;

  }

  async function handleSelectMovie(movie) {
    try {
      const fullMovie = await getMovieDetails(movie.imdbID);

      if (fullMovie) setSelectedMovie(fullMovie);

    } catch {
      toast.error("Failed to load movie details.");
    }
  }

  function isMovieAlreadyAdded(imdbID) {
    return existingMovies.some(
      (movie) => movie.imdbID === imdbID
    );
  }

  async function handleAddMovie() {
    if (!selectedMovie || isAdding) return;

    try {
      setIsAdding(true);

      const res = await dispatch(addToSelectedSection({ movie: selectedMovie, section: sectionName }));

      if (addToSelectedSection.fulfilled.match(res)) {
        const newNotification = {
          type: "movie",
          title: "New Movie Added",
          description: `"${selectedMovie.Title}" has been added to ${sectionName} movies. Check it out now!`,
          userId: "admin",
        };

        await dispatch(addNewNotification({ newNotification }));
        toast.success(`"${selectedMovie.Title}" added to ${sectionName} movies.`);
        setSelectedMovie(null);
      }

    } catch (error) {

      toast.error(error?.message || "Failed to add movie to the section.");
    } finally {
      setIsAdding(false);
    }
  }


  async function handlePageChange(page) {
    if (page < 1) return;

    const maxPage = Math.ceil(
      totalResults / 10
    );

    if (page > maxPage) return;

    try {
      setIsSearching(true);
      setCurrentPage(page);

      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
          searchQuery
        )}&page=${page}`
      );

      const data = await response.json();

      if (data.Response === "True") {
        setSearchResults(data.Search || []);
      }
    } catch {

      toast.error("Failed to load movies.");
    } finally {
      setIsSearching(false);
    }
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm dark:bg-black/70">
      <div className="flex h-[92vh] w-full max-w-375 flex-col overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-2xl dark:border-[#173453] dark:bg-[#061321]">
        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-5 dark:border-[#173453] dark:bg-[#071725]">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white dark:bg-[#5d4be8]">
              <Plus size={25} />
            </div>

            <div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                Add New Movie
              </h1>

              <p className="mt-1 text-xs text-slate-500 dark:text-[#7890a8]">
                Search for a movie and add it to{" "}
                <span className="text-violet-600 dark:text-[#a895ff]">
                  {sectionName}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-[7px] text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 dark:text-[#71869c] dark:hover:bg-[#10243a] dark:hover:text-white"
          >
            <X size={21} />
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
          {/* LEFT SIDE */}
          <section className="flex min-h-0 min-w-0 flex-col border-b border-slate-200 xl:border-b-0 xl:border-r dark:border-[#173453]">
            {/* Search */}
            <div className="shrink-0 p-6 pb-4">
              <form onSubmit={handleSearch}>
                <div className="flex h-12 items-center rounded-[9px] border border-violet-300 bg-white px-4 shadow-[0_0_0_1px_rgba(107,85,239,0.08)] focus-within:border-violet-500 dark:border-[#6b55ef] dark:bg-[#081725] dark:focus-within:border-[#8674f4]">
                  <Search
                    size={20}
                    className="shrink-0 text-slate-500 dark:text-[#7f9ab4]"
                  />

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies..."
                    className="ml-3 min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-[#536a82]"
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setSearchResults([]);
                        setSelectedMovie(null);
                        setTotalResults(0);
                      }}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:text-slate-900 dark:bg-[#1b3048] dark:text-[#70869d] dark:hover:text-white"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Results Header */}
            <div className="flex shrink-0 items-center justify-between px-6 pb-3">
              <p className="text-sm text-slate-700 dark:text-[#b4c2d1]">
                Search results
                {totalResults > 0 && (
                  <span className="ml-1 text-slate-500 dark:text-[#637b93]">
                    ({totalResults})
                  </span>
                )}
              </p>

              {isSearching && (
                <Loader2
                  size={16}
                  className="animate-spin text-violet-600 dark:text-[#8674f4]"
                />
              )}
            </div>

            {/* Results */}
            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300 dark:scrollbar-thumb-[#203b58]">
              {isSearching && searchResults.length === 0 ? (
                <SearchLoading />
              ) : searchResults.length === 0 ? (
                <EmptySearch />
              ) : (
                <div className="space-y-2">
                  {searchResults.map((movie) => (
                    <MovieSearchResult
                      key={movie.imdbID}
                      movie={movie}
                      selected={selectedMovie?.imdbID === movie.imdbID}
                      alreadyAdded={isMovieAlreadyAdded(movie.imdbID)}
                      onSelect={() => handleSelectMovie(movie)}
                      onAdd={() => handleAddMovie()}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalResults > 10 && (
              <div className="flex shrink-0 items-center gap-2 border-t border-slate-200 px-6 py-4 dark:border-[#173453]">
                <PaginationButton
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <ChevronLeft size={15} />
                </PaginationButton>

                {[1, 2, 3].map((page) => (
                  <PaginationButton
                    key={page}
                    active={currentPage === page}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationButton>
                ))}

                <PaginationButton
                  disabled={currentPage >= Math.ceil(totalResults / 10)}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <ChevronRight size={15} />
                </PaginationButton>
              </div>
            )}
          </section>

          {/* RIGHT SIDE */}
          <section className="min-h-0 min-w-0 overflow-y-auto bg-slate-50 p-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300 dark:bg-[#061522] dark:scrollbar-thumb-[#203b58]">
            <div className="overflow-hidden rounded-[10px] border border-slate-200 bg-white dark:border-[#173453] dark:bg-[#071725]">
              {/* Details Header */}
              <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 dark:border-[#173453]">
                <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-violet-100 text-violet-600 dark:bg-[#241b5a] dark:text-[#8d7bff]">
                  <Film size={16} />
                </div>

                <h2 className="text-sm font-medium text-slate-800 dark:text-[#e0e6ee]">
                  Selected Movie
                </h2>
              </div>

              {!selectedMovie ? (
                <NoMovieSelected />
              ) : (
                <SelectedMovie
                  movie={selectedMovie}
                  isAdding={isAdding}
                  alreadyAdded={isMovieAlreadyAdded(selectedMovie.imdbID)}
                  onAdd={handleAddMovie}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

