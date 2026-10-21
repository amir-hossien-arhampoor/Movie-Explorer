import { useDispatch, useSelector } from "react-redux"
import MovieItem from "../../components/MovieItem"
import SkeletonLoading from "@/components/SkeletonLoading"


function SearchResult({isActiveSort}) {
  const { searchResults = [], isLoading, error, query } = useSelector(state => state.search)
  const dispatch = useDispatch()

    const sortedMovies = [...searchResults].sort((a, b) => {
    if (isActiveSort === "Newest") {
      return Number(b.Year.slice(0, 4)) - Number(a.Year.slice(0, 4))
    }

    if (isActiveSort === "Oldest") {
      return Number(a.Year.slice(0, 4)) - Number(b.Year.slice(0, 4))
    }

    if (isActiveSort === "Title A–Z") {
      return a.Title.localeCompare(b.Title)
    }

  })

  return (
    <div className="flex flex-col border-t w-full min-h-100 mt-7 ">

      {/* Result info */}
      {searchResults.length > 0 && <div className="flex items-center gap-2 mt-2">
        <p>Search result for "<span className="text-[#a358f8] text-[20px] font-bold">{query}</span>"</p>
      </div>}

      {/* Movies container */}
      <div className="flex flex-wrap max-lg:justify-center gap-7 mt-5">
        {sortedMovies.map(movie =>
          <MovieItem
            movie={movie}
            key={movie.imdbID}
          />)}
      </div>

      { isLoading && <div className="flex flex-wrap gap-2 justify-between mt-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonLoading key={index} />
        ))}
      </div> }

      { error &&
        <div className="flex flex-col items-center text-center mt-10 relative w-full">
          <img src="public/Nomoviefound.png" alt="" className="" />

          <button
            className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#5438cc] text-[14px] py-2 px-8 rounded-[9px] text-[#e5e6eb] hover:bg-[#6750ce] transition-all duration-200 gap-2 cursor-pointer"
            onClick={() => dispatch({type : "search/clearSearch"})}
          >
            Clear search
          </button>
        </div>
      }

    </div>
  )
}

export default SearchResult