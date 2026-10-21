import { Film } from "lucide-react";

export default function NoMovieSelected() {
  return (
   <div className="flex min-h-100 flex-col items-center justify-center p-8 text-center">
  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-[#0d2034] dark:text-[#596f87]">
    <Film size={26} />
  </div>

  <h3 className="mt-4 text-sm font-medium text-slate-700 dark:text-[#aebdcd]">
    No movie selected
  </h3>

  <p className="mt-1 max-w-65 text-[11px] leading-5 text-slate-500 dark:text-[#5f758c]">
    Search for a movie and select it from the results to view its details.
  </p>
</div>
  );
}