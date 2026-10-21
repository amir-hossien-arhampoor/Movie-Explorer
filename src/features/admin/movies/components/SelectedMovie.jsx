import MovieInfoRow from "@/features/admin/movies/components/MovieInfoRow";
import { Check, Clock3, Globe, Languages, Loader2, Plus, Star, Tag, UserRound } from "lucide-react";

export default function SelectedMovie({ movie, isAdding, alreadyAdded, onAdd }) {

  const genres = movie.Genre && movie.Genre !== "N/A"
    ? movie.Genre.split(",").map((item) => item.trim())
    : [];

  return (
    <div className="p-5">
      {/* Main Information */}
      <div className="flex gap-5">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="h-52 w-35 shrink-0 rounded-[8px] border border-slate-200 object-cover dark:border-[#244968]"
          onError={(e) => (e.currentTarget.src = "/images/movie-placeholder.png")}
        />

        <div className="min-w-0">
          <h2 className="text-xl font-semibold leading-6 text-slate-900 dark:text-white">
            {movie.Title}
          </h2>

          <p className="mt-2 text-xs text-slate-500 dark:text-[#7590a8]">
            {movie.Year}
            {movie.Genre && movie.Genre !== "N/A" && (
              <>
                <span className="mx-1.5">•</span>
                {movie.Genre}
              </>
            )}
          </p>

          {/* Rating */}
          {movie.imdbRating && movie.imdbRating !== "N/A" && (
            <div className="mt-4 flex items-center gap-2">
              <Star size={17} fill="#f6bd35" color="#f6bd35" />

              <span className="text-base font-semibold text-slate-900 dark:text-white">
                {movie.imdbRating}
              </span>

              {movie.imdbVotes && movie.imdbVotes !== "N/A" && (
                <span className="text-[11px] text-slate-500 dark:text-[#617b94]">
                  ({movie.imdbVotes} votes)
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Plot */}
      {movie.Plot && movie.Plot !== "N/A" && (
        <p className="mt-6 text-xs leading-[1.8] text-slate-600 dark:text-[#8ca0b4]">
          {movie.Plot}
        </p>
      )}

      {/* Details */}
      <div className="mt-6 overflow-hidden rounded-[8px] border border-slate-200 bg-slate-50 dark:border-[#173453] dark:bg-[#081a2b]">
        <MovieInfoRow icon={UserRound} label="Director" value={movie.Director} />
        <MovieInfoRow icon={Clock3} label="Runtime" value={movie.Runtime} />
        <MovieInfoRow icon={Languages} label="Language" value={movie.Language} />
        <MovieInfoRow icon={Globe} label="Country" value={movie.Country} />
        <MovieInfoRow icon={Tag} label="Genre" value={movie.Genre} />
      </div>

      {/* Genre Tags */}
      {genres.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {genres.map((genre) => (
            <span
              key={genre}
              className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[10px] text-violet-700 dark:border-[#41368e] dark:bg-[#211b4f] dark:text-[#aa9cf4]"
            >
              {genre}
            </span>
          ))}
        </div>
      )}

      {/* Add Button */}
      <button
        type="button"
        disabled={isAdding || alreadyAdded}
        onClick={onAdd}
        className="mt-7 flex h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-violet-600 text-xs font-medium text-white transition hover:bg-violet-700 dark:bg-[#5d4be8] dark:hover:bg-[#6c59f2] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isAdding ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Adding...
          </>
        ) : alreadyAdded ? (
          <>
            <Check size={16} />
            Already Added
          </>
        ) : (
          <>
            <Plus size={17} />
            Add to Section
          </>
        )}
      </button>
    </div>
  );
}