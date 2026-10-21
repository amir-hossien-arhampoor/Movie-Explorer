import { Bell } from "lucide-react";

function SettingNotificationItem({
  icon: Icon = Bell,
  title,
  description,
  enabled,
  onChange,
}) {

  return (

    <div className="flex items-center justify-between gap-3 rounded-[9px] border border-slate-200 bg-slate-50 px-3 py-2.5 transition-colors dark:border-[#112a46] dark:bg-[#061c35]">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] bg-violet-100 dark:bg-[#10144c]">
          <Icon size={16} className="text-violet-600 dark:text-[#857adc]" />
        </div>

        <div className="min-w-0">
          <h3 className="text-[12px] text-slate-900 dark:text-white">
            {title}
          </h3>

          <p className="truncate text-[10px] text-slate-500 dark:text-[#6f8196]">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={title}
        onClick={onChange}
        className={`relative h-4 w-7 shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#061c35] ${enabled
            ? "bg-violet-600 dark:bg-[#7040e8]"
            : "bg-slate-300 dark:bg-[#17283b]"
          }`}
      >
        <span
          className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition-all duration-200 ${enabled ? "left-3.5" : "left-0.5"
            }`}
        />
      </button>
    </div>

  );
};

export default SettingNotificationItem;