
import { Search, Bookmark, Heart, CircleCheck } from "lucide-react";
import { NavLink } from "react-router";

const features = [
  {
    title: "Search",
    description: "Find any movie",
    icon: Search,
    to: "/movies",
  },
  {
    title: "Watchlist",
    description: "Save movies for later",
    icon: Bookmark,
    to: "/watchlist",
  },
  {
    title: "Favorites",
    description: "Keep your favorites close",
    icon: Heart,
    to: "/favorites",
  },
  {
    title: "Watched",
    description: "Track your progress",
    icon: CircleCheck,
    to: "/watched",
  },
];

export default function FeatureBar() {
  return (
    <section
      aria-label="Movie Explorer features"
      className="grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-300 bg-white dark:border-[#292D35] dark:bg-[#040b14] sm:grid-cols-2 lg:grid-cols-4"
    >
      {features.map(({ title, description, icon: Icon, to }, index) => (
        <NavLink
          key={title}
          to={to}
          className="group relative flex items-center gap-4 px-5 py-5 transition-colors duration-300 hover:bg-slate-200 dark:hover:bg-[#0b1c34] sm:px-6"
        >
          {index !== 0 && (
            <span className="absolute bottom-4 left-0 top-4 hidden w-px bg-slate-300 dark:bg-[#292D35] lg:block" />
          )}

          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 transition-colors duration-300 group-hover:bg-violet-600 group-hover:text-white dark:bg-[#182e70] dark:text-[#b7b0ff] dark:group-hover:bg-[#857adc] dark:group-hover:text-white">
            <Icon size={22} />
          </span>

          <span>
            <span className="block text-sm font-semibold text-slate-900 transition-colors group-hover:text-violet-700 dark:text-white dark:group-hover:text-[#b7b0ff]">
              {title}
            </span>

            <span className="mt-1 block text-xs leading-5 text-slate-600 dark:text-slate-400">
              {description}
            </span>
          </span>
        </NavLink>
      ))}
    </section>
  );
}