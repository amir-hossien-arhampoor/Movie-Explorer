import { Star } from "lucide-react";
import { NavLink } from "react-router";


export default function MovieCard({ movie }) {
  return (
<NavLink
  className="group relative min-w-0 overflow-hidden rounded-[8px] border border-slate-200 bg-white transition duration-200 hover:border-violet-500 hover:shadow-md hover:shadow-violet-500/10 dark:border-[#18304c] dark:bg-[#0a1828] dark:hover:border-[#6c3cec]"
  to={`${movie.imdbID}`}
>
  {/* Poster */}
  <div className="relative aspect-[2/2.85] overflow-hidden bg-slate-100 dark:bg-[#071321]">
    <img
      src={movie.Poster}
      alt={movie.Title}
      loading="lazy"
      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
    />

    <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-80 dark:from-[#071321]" />
  </div>

  {/* Info */}
  <div className="p-2 sm:p-2.5">
    <h3 className="truncate text-[13px] font-semibold text-slate-900 sm:text-[15px] dark:text-white">
      {movie.Title}
    </h3>

    <p className="mt-0.5 text-[11px] text-slate-500 sm:text-[12px] dark:text-[#66778c]">
      {movie.Year}
    </p>

    <div className="mt-1.5 flex items-center gap-1">
      <Star size={15} fill="#f5bd35" color="#f5bd35" />

      <span className="text-[11px] font-semibold text-slate-700 sm:text-[12px] dark:text-[#d8dee8]">
        {movie.imdbRating}
      </span>
    </div>
  </div>
</NavLink>
  );
}