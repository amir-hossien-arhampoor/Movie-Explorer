import LogInForm from "@/features/auth/LogInForm";
import SocialAuth from "./SocialAuth";
import SignUpForm from "@/features/auth/SignUpForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getuserAndAccountSettings } from "@/features/admin/setting/AdminSettingSlice";
import toast from "react-hot-toast";

function AuthForm({ isLogin, setIsLogin }) {
  const { userAndAccountSettings } = useSelector(state => state.siteSettings)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getData() {
      await dispatch(getuserAndAccountSettings())
    }

    getData()

  }, [dispatch]);
  return (
    <div className="w-full max-w-137.5 rounded-[18px] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-colors duration-200 dark:border-[#293548] dark:bg-[#03101e]/95 dark:shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:p-9">
      {/* Header */}
      <div className="mb-7">
        <h2 className="text-[30px] font-bold tracking-tight text-slate-900 dark:text-white">
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </h2>

        <p className="mt-2 text-[14px] leading-6 text-slate-600 dark:text-[#9aaac0]">
          {isLogin
            ? "Log in to your account to continue exploring amazing movies and TV shows."
            : "Create your account and start exploring the world of movies."}
        </p>
      </div>

      {/* Login / Signup tabs */}
      <div className="mb-7 flex gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-[#1a3049] dark:bg-[#071525]">
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          aria-pressed={isLogin}
          className={`h-12 flex-1 cursor-pointer rounded-[9px] text-sm font-semibold transition-all duration-300 ${isLogin
              ? "bg-violet-600 text-white shadow-sm dark:bg-[#8B5CF6]"
              : "text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:text-[#8191aa] dark:hover:bg-[#13243a] dark:hover:text-white"
            }`}
        >
          Log In
        </button>

        <button
          type="button"
          onClick={() => {
            if (!userAndAccountSettings.allownewuser) {
              toast.error("Registering new user is disabled by site admin!");
              return;
            }
            setIsLogin(false);
          }}
          aria-pressed={!isLogin}
          className={`h-12 flex-1 cursor-pointer rounded-[9px] text-sm font-semibold transition-all duration-300 ${!isLogin
              ? "bg-violet-600 text-white shadow-sm dark:bg-[#8B5CF6]"
              : "text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:text-[#8191aa] dark:hover:bg-[#13243a] dark:hover:text-white"
            }`}
        >
          Sign Up
        </button>
      </div>

      {/* Form */}
      <div>
        {isLogin ? <LogInForm /> : <SignUpForm />}
      </div>

      {/* Divider */}
      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200 dark:bg-[#1a3048]" />

        <span className="text-[12px] text-slate-500 dark:text-[#8191aa]">
          or
        </span>

        <div className="h-px flex-1 bg-slate-200 dark:bg-[#1a3048]" />
      </div>

      <SocialAuth />

      {/* Bottom switch */}
      <p className="mt-7 text-center text-[13px] text-slate-600 dark:text-[#9aaac0]">
        {isLogin
          ? "Don't have an account?"
          : "Already have an account?"}

        <button
          type="button"
          onClick={() => setIsLogin((prev) => !prev)}
          className="ml-2 cursor-pointer font-semibold text-violet-700 transition-colors hover:text-violet-900 dark:text-[#a99af8] dark:hover:text-[#c4b5fd]"
        >
          {isLogin ? "Sign up" : "Log in"}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;