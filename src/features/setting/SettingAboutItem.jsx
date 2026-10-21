import { ExternalLink } from "lucide-react";

function SettingAboutItem({
  icon: Icon,
  title,
  description,
}) {
  return (

    <button
      type="button"
      // onClick={onClick}
      className="
    flex w-full cursor-pointer items-center justify-between
    gap-2 rounded-[9px] border border-slate-200
    bg-slate-50 px-3 py-2.5 text-left text-slate-900
    transition-all duration-200
    hover:bg-slate-100
    dark:border-[#112a46] dark:bg-[#061c35]
    dark:text-white dark:hover:bg-[#071525]
  "
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] bg-violet-100 dark:bg-[#10144c]">
          <Icon
            size={15}
            className="text-violet-600 dark:text-[#857adc]"
          />
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

      <ExternalLink
        size={14}
        className="shrink-0 text-slate-400 dark:text-[#8b9bb0]"
      />
    </button>

  );
};

export default SettingAboutItem;