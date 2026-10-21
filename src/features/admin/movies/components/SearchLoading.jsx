export default function SearchLoading() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex h-29 animate-pulse items-center gap-4 rounded-[9px] border border-slate-200 bg-white p-2.5 dark:border-[#173453] dark:bg-[#071725]"
        >
          <div className="h-24 w-16 rounded-[6px] bg-slate-200 dark:bg-[#102338]" />

          <div className="flex-1 space-y-3">
            <div className="h-3 w-40 rounded bg-slate-200 dark:bg-[#102338]" />
            <div className="h-2 w-28 rounded bg-slate-200 dark:bg-[#102338]" />
            <div className="h-2 w-20 rounded bg-slate-200 dark:bg-[#102338]" />
          </div>
        </div>
      ))}
    </div>
  );
}