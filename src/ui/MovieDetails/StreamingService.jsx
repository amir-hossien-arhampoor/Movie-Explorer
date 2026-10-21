function StreamingService({ children, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-[#26385d] bg-[#071426] text-sm font-bold text-white">
        {children}
      </div>

      <span className="text-[11px] text-[#9ba5ba]">{label}</span>
    </div>
  );
}

export default StreamingService