
import { Skeleton } from "@/components/skeleton";

function MovieDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-[#020b16] text-white">
      {/* Back button */}
      <Skeleton className="mx-6 my-3 h-9 w-20 rounded-[8px] bg-[#071728]" />

      {/* ================= HERO ================= */}
      <section className="border-b border-[#142a47]">
        <div className="mx-auto grid max-w-300 grid-cols-1 gap-8 px-6 py-9 lg:grid-cols-[245px_1fr_275px]">

          {/* Poster */}
          <div className="relative h-100 overflow-hidden rounded-[6px] border border-[#193858] bg-[#071728]">
            <Skeleton className="h-full w-full rounded-none bg-[#0b1c31]" />

            <Skeleton className="absolute bottom-3 left-3 h-6 w-9 rounded-[5px] bg-[#142a47]" />
          </div>

          {/* Main movie information */}
          <div className="pt-1">

            {/* Title */}
            <Skeleton className="h-9 w-75 rounded-[5px] bg-[#142a47]" />

            {/* Metadata */}
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
              <Skeleton className="h-4 w-14 rounded bg-[#142a47]" />
              <Skeleton className="h-3 w-20 rounded bg-[#0d1d32]" />

              <span className="h-4 w-px bg-[#253652]" />

              <Skeleton className="h-3 w-10 rounded bg-[#142a47]" />

              <span className="h-4 w-px bg-[#253652]" />

              <Skeleton className="h-6 w-10 rounded bg-[#101d31]" />

              <span className="h-4 w-px bg-[#253652]" />

              <Skeleton className="h-3 w-12 rounded bg-[#142a47]" />

              <span className="h-4 w-px bg-[#253652]" />

              <Skeleton className="h-3 w-32 rounded bg-[#142a47]" />
            </div>

            {/* Plot */}
            <div className="mt-5 max-w-162 space-y-2">
              <Skeleton className="h-4 w-full rounded bg-[#102238]" />
              <Skeleton className="h-4 w-[92%] rounded bg-[#102238]" />
              <Skeleton className="h-4 w-[68%] rounded bg-[#102238]" />
            </div>

            {/* Buttons */}
            <div className="mt-5 flex flex-wrap gap-3">
              <Skeleton className="h-11.75 w-37.5 rounded-[8px] bg-[#7951df]/50" />

              <Skeleton className="h-11.75 w-42.5 rounded-[8px] border border-[#3b4c80] bg-[#071426]" />

              <Skeleton className="h-11.75 w-41.25 rounded-[8px] border border-[#3b4c80] bg-[#071426]" />

              <Skeleton className="h-11.75 w-36.25 rounded-[8px] border border-[#3b4c80] bg-[#071426]" />
            </div>

            {/* Movie metadata */}
            <div className="mt-9 grid grid-cols-2 gap-y-5 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 shrink-0 rounded-full bg-[#101d35]" />

                  <div className="space-y-2">
                    <Skeleton className="h-3 w-14 rounded bg-[#142a47]" />
                    <Skeleton className="h-3 w-24 rounded bg-[#102238]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT STATS ================= */}
          <div className="rounded-[7px] border border-[#193454] bg-[#061425] p-5">

            {/* Rating */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-11 w-11 rounded-[10px] bg-[#063e32]" />

              <div className="space-y-2">
                <Skeleton className="h-3 w-24 rounded bg-[#142a47]" />
                <Skeleton className="h-3 w-16 rounded bg-[#102238]" />
              </div>
            </div>

            <div className="my-4 h-px bg-[#19314e]" />

            {/* Popularity */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-11 w-11 rounded-[9px] bg-[#101d35]" />

              <div className="space-y-2">
                <Skeleton className="h-3 w-20 rounded bg-[#142a47]" />

                <div className="flex gap-3">
                  <Skeleton className="h-4 w-8 rounded bg-[#142a47]" />
                  <Skeleton className="h-3 w-24 rounded bg-[#102238]" />
                </div>
              </div>
            </div>

            <div className="my-4 h-px bg-[#19314e]" />

            {/* Streaming */}
            <Skeleton className="h-4 w-28 rounded bg-[#142a47]" />

            <div className="mt-4 flex gap-7">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-[8px] bg-[#101d35]" />
                  <Skeleton className="h-2.5 w-12 rounded bg-[#102238]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= TABS ================= */}
      <div className="border-b border-[#142a47]">
        <div className="mx-auto flex max-w-300 gap-8 px-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className={`my-5 h-4 rounded ${
                index === 0
                  ? "w-20 bg-[#9b68ff]/40"
                  : "w-24 bg-[#142a47]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <main className="mx-auto max-w-300 px-6 py-7">
        <div className="grid grid-cols-1 gap-9 lg:grid-cols-[1fr_380px]">

          {/* ================= LEFT COLUMN ================= */}
          <div>

            {/* Overview */}
            <section>
              <Skeleton className="h-6 w-24 rounded bg-[#142a47]" />

              <div className="mt-4 max-w-175 space-y-2">
                <Skeleton className="h-3.5 w-full rounded bg-[#102238]" />
                <Skeleton className="h-3.5 w-[95%] rounded bg-[#102238]" />
                <Skeleton className="h-3.5 w-[75%] rounded bg-[#102238]" />
              </div>
            </section>

            <div className="my-7 h-px bg-[#162d4a]" />

            {/* Main Cast */}
            <section>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-28 rounded bg-[#142a47]" />
                <Skeleton className="h-3 w-14 rounded bg-[#142a47]" />
              </div>

              <div className="mt-5 flex gap-4 overflow-hidden">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-31.25 shrink-0 overflow-hidden rounded-[7px] border border-[#193454] bg-[#061425]"
                  >
                    <Skeleton className="h-38.75 w-full rounded-none bg-[#0b1c31]" />

                    <div className="space-y-2 p-3">
                      <Skeleton className="h-3 w-[85%] rounded bg-[#142a47]" />
                      <Skeleton className="h-2.5 w-[55%] rounded bg-[#102238]" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <aside>

            {/* Key Facts */}
            <div className="rounded-[7px] border border-[#193454] bg-[#061425] p-5">
              <Skeleton className="h-5 w-24 rounded bg-[#142a47]" />

              <div className="mt-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1fr_1.2fr] border-b border-[#152b47] py-3 last:border-0"
                  >
                    <Skeleton className="h-3 w-20 rounded bg-[#102238]" />
                    <Skeleton className="h-3 w-24 rounded bg-[#142a47]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Movies */}
            <section className="mt-7">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-32 rounded bg-[#142a47]" />
                <Skeleton className="h-3 w-14 rounded bg-[#142a47]" />
              </div>

              <div className="mt-5 grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index}>
                    <Skeleton className="h-41.25 w-full rounded-[6px] bg-[#0b1c31]" />

                    <div className="mt-3 space-y-2">
                      <Skeleton className="h-3 w-full rounded bg-[#142a47]" />
                      <Skeleton className="h-2.5 w-[60%] rounded bg-[#102238]" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default MovieDetailsSkeleton;

