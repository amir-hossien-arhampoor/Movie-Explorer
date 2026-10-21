function StreamingService({ children, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-slate-200 bg-slate-100 text-sm font-bold text-slate-800 dark:border-[#26385d] dark:bg-[#071426] dark:text-white">
        {children}
      </div>

      <span className="text-[11px] text-slate-500 dark:text-[#9ba5ba]">{label}</span>
    </div>
  );
}

export default StreamingService