import { Check, Plus, Star } from "lucide-react";
import { useEffect } from "react";

export default function MovieSearchResult({ movie, selected, alreadyAdded, onSelect, onAdd }) {
  useEffect(() => {
    alreadyAdded
  }, [alreadyAdded])
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group flex w-full items-center gap-4 rounded-[9px] border p-2.5 text-left transition ${selected
          ? "border-violet-500 bg-violet-50 dark:border-[#6855ee] dark:bg-[#111c3d]"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-[#173453] dark:bg-[#071725] dark:hover:border-[#315176] dark:hover:bg-[#0b1c2d]"
        }`}
    >
      {/* Poster */}
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="h-24 w-16 shrink-0 rounded-[6px] border border-slate-200 object-cover dark:border-[#23425f]"
        onError={(e) => {
          e.currentTarget.src = "/images/movie-placeholder.png";
        }}
      />

      {/* Information */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-medium text-slate-800 dark:text-[#e2e8ef]">
          {movie.Title}
        </h3>

        <p className="mt-1 truncate text-[11px] text-slate-500 dark:text-[#7790a8]">
          {movie.Year}
          <span className="mx-1.5">•</span>
          {movie.Type}
        </p>

        <div className="mt-2 flex items-center gap-1.5">
          <Star size={13} fill="#f6bd35" color="#f6bd35" />
          <span className="text-[11px] text-slate-600 dark:text-[#bdc8d5]">
            {movie.imdbRating || "N/A"}
          </span>
        </div>
      </div>

      {/* Add / Added */}
      <div
        className={`flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-[7px] border px-4 text-[11px] font-medium transition ${alreadyAdded
            ? "border-green-200 bg-green-50 text-green-700 dark:border-[#28583d] dark:bg-[#10271b] dark:text-[#63c889]"
            : selected
              ? "border-violet-500 bg-violet-600 text-white dark:border-[#6b55ef] dark:bg-[#5c4ae7] dark:text-white"
              : "border-slate-200 text-slate-600 group-hover:border-violet-400 group-hover:text-violet-600 dark:border-[#244563] dark:text-[#b6c6d6] dark:group-hover:border-[#6b55ef] dark:group-hover:text-white"
          }`}
        onClick={onAdd}
      >
        {alreadyAdded ? (
          <>
            <Check size={14} />
            Added
          </>
        ) : (
          <>
            <Plus size={15} />
            Add
          </>
        )}
      </div>
    </button>
  );
}