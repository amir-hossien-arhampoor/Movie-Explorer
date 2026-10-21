import MovieCard from "@/features/admin/movies/components/MovieCard";
import MovieSkeletonGrid from "@/features/admin/movies/components/MovieLoadingSkeleton";
import { Settings } from "lucide-react";
import { NavLink } from "react-router";

export default function MovieSection({ title, icon, description, section, to, isLoading }) {
  const Icon = icon;

  return (
    <section className="mt-10 space-y-4 sm:mt-14 lg:mt-20">
      {/* Section Header */}
      <div className="flex flex-col gap-4 rounded-[10px] border border-slate-200 bg-white p-4 transition-colors duration-300 sm:flex-row sm:items-center sm:justify-between dark:border-[#112a46] dark:bg-[#071625]">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-violet-100 text-violet-600 sm:h-11 sm:w-11 dark:bg-[#211d4d] dark:text-[#9b8cff]">
            <Icon size={24} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[15px] font-semibold text-slate-900 sm:text-[17px] dark:text-white">
                {title}
              </h2>

              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500 dark:bg-[#10253d] dark:text-[#73859a]">
                {section.length} movies
              </span>
            </div>

            <p className="mt-0.5 text-[11px] leading-5 text-slate-500 sm:text-[12px] dark:text-[#61738a]">
              {description}
            </p>
          </div>
        </div>

        <NavLink
          className="flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[6px] border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-medium text-slate-600 transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700 sm:w-auto dark:border-[#31517b] dark:bg-[#0a1829] dark:text-[#b5c0ce] dark:hover:border-[#6c3cec] dark:hover:bg-[#17143a] dark:hover:text-white"
          to={to}
        >
          <Settings size={13} />
          Manage
        </NavLink>
      </div>

      {/* Movie Cards */}
      <div className="relative min-w-0 rounded-[10px] border border-slate-200 bg-white p-3 transition-colors duration-300 sm:p-4 dark:border-[#112a46] dark:bg-[#071625]">
        {isLoading && <MovieSkeletonGrid count={12} />}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {section.slice(0, 6).map((movie, index) => (
            <MovieCard
              key={movie.Title}
              movie={movie}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}