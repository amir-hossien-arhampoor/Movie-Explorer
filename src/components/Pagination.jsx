import { ChevronLeft, ChevronRight } from "lucide-react"

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  users,
  startIndex,
  endIndex
}) {

  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
      return pages
    }
    pages.push(1)

    if (currentPage > 4) {
      pages.push("...")
    }

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (currentPage < totalPages - 3) {
      pages.push("...")
    }

    pages.push(totalPages)

    return pages
  }
  return (
    <>
      <div className="flex items-center justify-between px-3">
        <div className="text-[12px] text-slate-500 dark:text-[#808797]">
          <p>
            Showing ({startIndex + 1}-{endIndex}) of {users.length} users
          </p>
        </div>

        <div className="my-4 flex items-center gap-1">
          {/* Previous */}
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="
        flex h-7 w-7 items-center justify-center rounded-md
        border border-slate-300 bg-white text-slate-500
        transition hover:bg-slate-100
        disabled:cursor-not-allowed disabled:opacity-40
        dark:border-[#1b3556] dark:bg-[#0d1d35]
        dark:text-[#808797] dark:hover:bg-[#122845]
      "
          >
            <ChevronLeft size={17} />
          </button>

          {/* Pages */}
          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`dots-${index}`}
                  className="flex h-7 w-7 items-center justify-center text-slate-400 dark:text-[#546077]"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={`h-7 min-w-7 rounded-md border px-2 text-sm transition ${currentPage === page
                    ? "border-violet-600 bg-violet-600 text-white dark:border-[#6c3cec] dark:bg-[#6c3cec]"
                    : "border-slate-300 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-[#1b3556] dark:bg-[#0d1d35] dark:text-[#808797] dark:hover:bg-[#122845] dark:hover:text-white"
                  }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next */}
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="
        flex h-7 w-7 items-center justify-center rounded-md
        border border-slate-300 bg-white text-slate-500
        transition hover:bg-slate-100
        disabled:cursor-not-allowed disabled:opacity-40
        dark:border-[#1b3556] dark:bg-[#0d1d35]
        dark:text-[#808797] dark:hover:bg-[#122845]
      "
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </>
  );

}

export default Pagination