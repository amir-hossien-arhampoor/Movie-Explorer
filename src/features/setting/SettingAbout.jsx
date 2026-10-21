import SettingAboutItem from "@/features/setting/SettingAboutItem";
import { Info, FileText, Shield, Code, GitBranch, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logOutUser } from "@/features/auth/AuthSlice";
import toast from "react-hot-toast";

function SettingAbout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleUserLogOut() {
    const res = await dispatch(logOutUser())

    if (logOutUser.fulfilled.match(res)) {
      toast.success("You have logged out successfully!")
      navigate("/")
    }
  }
  return (

    <section className="rounded-[9px] border border-slate-200 bg-white p-3 text-slate-900 transition-colors dark:border-[#112a46] dark:bg-[#03111f] dark:text-white">
      {/* Header */}
      <div className="mb-3 flex items-center gap-1">
        <div className="flex h-9 w-9 items-center justify-center rounded-[8px]">
          <Info size={19} className="text-violet-600 dark:text-[#6d3eec]" />
        </div>

        <div>
          <h2 className="font-bold">About</h2>
          <p className="text-[11px] text-slate-500 dark:text-[#6f8196]">
            Information about Movie Explorer.
          </p>
        </div>
      </div>

      {/* Links */}
      <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <SettingAboutItem
          icon={FileText}
          title="Terms of Service"
          description="Read our terms and conditions."
          onClick={""}
        />

        <SettingAboutItem
          icon={Shield}
          title="Privacy Policy"
          description="Learn how your data is handled."
          onClick={""}
        />

        <SettingAboutItem
          icon={Code}
          title="GitHub Repository"
          description="View the project source code."
          onClick={""}
        />

        <SettingAboutItem
          icon={Info}
          title="Credits"
          description="APIs, libraries and resources used."
          onClick={""}
        />
      </div>

      {/* Footer */}
      <div className="mt-11 flex items-center justify-between rounded-[9px] border border-slate-200 p-2 dark:border-[#112a46]">
        <div className="flex items-center gap-3">
          <GitBranch
            size={18}
            className="text-slate-500 dark:text-slate-400"
          />
          <p className="text-[13px]">Version 1.2.0</p>
        </div>

        <button
          type="button"
          className="mt-auto flex cursor-pointer items-center gap-2 rounded-[7px] border-2 border-red-500 px-4 py-2 text-[14px] text-red-600 transition-all duration-300 ease-in-out hover:bg-red-50 dark:border-red-600 dark:text-red-500 dark:hover:bg-[#ee24241e] sm:px-7"
          onClick={handleUserLogOut}
        >
          <LogOut size={17} />
          Log out
        </button>
      </div>
    </section>

  );
};

export default SettingAbout;