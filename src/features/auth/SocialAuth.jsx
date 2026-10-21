import { FaChrome, FaGithub } from "react-icons/fa";

function SocialAuth() {
  return (
    <div className="flex flex-col gap-3">
      <button type="button" className=" cursor-pointer flex h-12.5 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 dark:border-[#1b3653] dark:bg-[#071525] dark:text-[#d1d9e6] dark:hover:border-[#314c6d] dark:hover:bg-[#0a1a2c]">
        <FaChrome size={19} className="text-[#ea4335]" />
        Continue with Google
      </button>

      <button type="button" className=" cursor-pointer flex h-12.5 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 dark:border-[#1b3653] dark:bg-[#071525] dark:text-[#d1d9e6] dark:hover:border-[#314c6d] dark:hover:bg-[#0a1a2c]">
        <FaGithub size={19} className="text-slate-900 dark:text-white" />
        Continue with GitHub
      </button>
    </div>
  );
}

export default SocialAuth;