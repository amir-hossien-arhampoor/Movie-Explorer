import { Search } from "lucide-react";

export default function EmptySearch() {
  return (
<div
  className="
    flex
    h-full
    min-h-70
    flex-col
    items-center
    justify-center
    text-center
  "
>
  <div
    className="
      flex
      h-14
      w-14
      items-center
      justify-center
      rounded-full
      bg-slate-100
      text-slate-500
      dark:bg-[#0d2034]
      dark:text-[#58718c]
    "
  >
    <Search size={23} />
  </div>

  <h3 className="mt-4 text-sm font-medium text-slate-700 dark:text-[#aebdcd]">
    Search for a movie
  </h3>

  <p
    className="
      mt-1
      max-w-65
      text-[11px]
      leading-5
      text-slate-500
      dark:text-[#5f758c]
    "
  >
    Search by movie title to find a movie
    you want to add to this section.
  </p>
</div>
  );
}