function DetailRow({ label, value }) {
  return (
    <div className="flex gap-4">
      <span className="w-40 shrink-0 text-sm text-slate-500 dark:text-[#8b9cb3]">
        {label}
      </span>

      <span className="min-w-0 wrap-break-word text-sm text-slate-700 dark:text-[#d2dceb]">
        {value}
      </span>
    </div>
  );
}

export default DetailRow;