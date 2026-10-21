import { Bookmark } from "lucide-react";

function SummaryItem({
  icon,
  label,
  value,
  iconClass,
  valueClass,
}) {
  const Icon = icon === "bookmark" ? Bookmark : icon;

  return (
    <div className="flex items-center justify-between rounded-[10px] bg-slate-50 px-3 py-3 transition-colors dark:bg-[#0c1b2d]">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
        >
          <Icon size={18} />
        </div>

        <span className="truncate text-sm text-slate-600 dark:text-[#9aabc1]">
          {label}
        </span>
      </div>

      <span className={`ml-3 text-lg font-semibold ${valueClass}`}>
        {value}
      </span>
    </div>
  );
}

export default SummaryItem;