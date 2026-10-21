export default function ToggleWithText({
  label,
  enabled,
  onClick,

}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-slate-600 dark:text-[#9aabc1]">
        {label}
      </span>

      <div
        onClick={onClick}
        className="flex shrink-0 items-center gap-2"
      >
        <button
          type="button"
          aria-pressed={enabled}
          className={`
        relative h-4 w-9 shrink-0 rounded-full
        transition-all duration-200
        ${enabled
              ? "bg-violet-600 dark:bg-[#7040e8]"
              : "bg-slate-300 dark:bg-[#17283b]"
            }
      `}
        >
          <span
            className={`
          absolute top-0.5 h-3 w-3 rounded-full bg-white
          transition-all duration-200
          ${enabled ? "left-5.5" : "left-0.5"}
        `}
          />
        </button>
      </div>
    </div>
  );
}