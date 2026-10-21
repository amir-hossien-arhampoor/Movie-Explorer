import {
  Zap,
  PlusCircle,
  UserPlus,
  Tags,
  Settings,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { NavLink } from "react-router";

const actions = [
  {
    label: "Add New Movie",
    icon: PlusCircle,
    to: "manage-movies"
  },
  {
    label: "Add New User",
    icon: UserPlus,
    to: "users"
  },
  {
    label: "Manage Genres",
    icon: Tags,
    to: "manage-genre"
  },
  {
    label: "Manage Site Settings",
    icon: Settings,
    to: "/admin-setting"
  }
];

export default function QuickActions() {
  return (
    <section className="rounded-[8px] border border-slate-200 bg-white p-3 transition-colors duration-300 sm:p-4 dark:border-[#142d4c] dark:bg-[#07162b]">
      <div className="mb-3 flex items-center gap-3">
        <Zap size={20} className="shrink-0 text-violet-600 dark:text-[#a16cff]" />
        <h2 className="text-[15px] font-medium text-slate-900 dark:text-white">Quick Actions</h2>
      </div>

      <div className="space-y-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <NavLink
              to={action.to}
              key={action.label}
              className="flex min-h-10.25 w-full items-center justify-between gap-3 rounded-[8px] border border-slate-200 bg-slate-50 px-3 py-2 text-left transition-colors hover:border-violet-300 hover:bg-violet-50 dark:border-[#1b3556] dark:bg-[#0d1d35] dark:hover:border-[#4c3c85] dark:hover:bg-[#102440]"
              onClick={(e) => {
                if (action.to === "manage-genre") {
                  e.preventDefault();
                  toast.success("This section will be available soon...");
                }
              }}
            >
              <div className="flex min-w-0 items-center gap-3">
                <Icon size={17} className="shrink-0 text-slate-500 dark:text-[#a9b7cc]" />
                <span className="text-[12px] text-slate-700 dark:text-[#c2ccdb]">{action.label}</span>
              </div>

              <ChevronRight size={16} className="shrink-0 text-slate-400 dark:text-[#8795aa]" />
            </NavLink>
          );
        })}
      </div>
    </section>
  );
}