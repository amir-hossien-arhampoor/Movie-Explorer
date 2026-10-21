export default function PaginationButton({
  children,
  active,
  disabled,
  onClick,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex h-8 min-w-8 items-center justify-center rounded-[6px] border px-2 text-[11px] transition ${active
          ? "border-violet-500 bg-violet-600 text-white dark:border-[#6652ed] dark:bg-[#5c4ae7] dark:text-white"
          : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800 dark:border-[#173453] dark:bg-[#081725] dark:text-[#8498ad] dark:hover:border-[#355476] dark:hover:text-white"
        } disabled:cursor-not-allowed disabled:opacity-40`}
    >
      {children}
    </button>
  );
}