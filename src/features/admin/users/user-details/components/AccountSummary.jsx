import { Check, Heart, SlidersHorizontal, User, } from "lucide-react";
import SummaryItem from "./SummaryItem";

function AccountSummary({ userStats, userData }) {

  return (
    <div className="h-fit rounded-[12px] border border-slate-200 bg-white p-5 dark:border-[#112a46] dark:bg-[#08121e]">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-[#171b53] dark:text-[#968cff]">
          <SlidersHorizontal size={18} />
        </div>

        <h2 className="font-semibold text-slate-900 dark:text-white">
          Account Summary
        </h2>
      </div>

      <div className="space-y-3">
        <SummaryItem
          label="Watchlist Movies"
          value={userStats?.watchList?.length ?? 0}
          icon="bookmark"
          iconClass="bg-blue-100 text-blue-600 dark:bg-[#123c61] dark:text-[#59a9ff]"
          valueClass="text-blue-600 dark:text-[#6faeff]"
        />

        <SummaryItem
          label="Favorite Movies"
          value={userStats?.favorites?.length ?? 0}
          icon={Heart}
          iconClass="bg-rose-100 text-rose-600 dark:bg-[#4a1e35] dark:text-[#ff6682]"
          valueClass="text-rose-600 dark:text-[#ff5e7d]"
        />

        <SummaryItem
          label="Watched Movies"
          value={userStats?.watched?.length ?? 0}
          icon={Check}
          iconClass="bg-emerald-100 text-emerald-600 dark:bg-[#073d34] dark:text-[#2ee6a0]"
          valueClass="text-emerald-600 dark:text-[#27e5a0]"
        />

        <SummaryItem
          label="User Role"
          value={userData?.role || "User"}
          icon={User}
          iconClass="bg-violet-100 text-violet-600 dark:bg-[#292052] dark:text-[#a98cff]"
          valueClass="text-violet-600 dark:text-[#a98cff]"
        />
      </div>
    </div>
  );
}

export default AccountSummary;