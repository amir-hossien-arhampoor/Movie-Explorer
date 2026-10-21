import { useDispatch, useSelector } from "react-redux"
import { getZodErrors, signUpSchema } from "../../utils/validators"
import { Eye, EyeOff, Loader2, Mail, LockKeyhole, ArrowRight } from "lucide-react"
import { checkNewUser, signUpNewUser } from "./AuthSlice"
import { useNavigate } from "react-router"
import toast from "react-hot-toast"
import { addActionToActivities } from "@/features/admin/dashboard/SiteActivitySlice"
import { getuserAndAccountSettings } from "@/features/admin/setting/AdminSettingSlice"
import { useEffect } from "react"


function SignUpForm() {
  const {
    fullname,
    email,
    password,
    confirmPassword,
    isPolicyAccepted,
    errors,
    showPassword
  } = useSelector(state => state.signUp)
  const { userAndAccountSettings } = useSelector(state => state.siteSettings)
  const { isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function validate() {

    const data = getZodErrors(signUpSchema(userAndAccountSettings.passwordminimumlength), {
      fullname,
      email,
      password,
      confirmPassword,
      isPolicyAccepted
    })
    dispatch({ type: "signUp/setFormErrors", payload: data })

    return Object.values(data).every(errors => errors.length === 0);
  }

  async function handleSubmit(e) {
    e.preventDefault()


    if (!validate()) return

    const result = await dispatch(checkNewUser({
      fullname: fullname.trim(),
      email: email.trim(),
      password
    }))

    if (checkNewUser.fulfilled.match(result)) {
      await dispatch(signUpNewUser(result.payload))

      await dispatch(addActionToActivities({ email: email, type: "new-user" }))

      toast.success("You have sign up successfully!")
      navigate("/")
    }
    await dispatch({ type: "signUp/clearInputs" })
  }

  useEffect(() => {
    async function getData() {
      await dispatch(getuserAndAccountSettings())
    }

    getData()

  }, [dispatch])

  return (

    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5 px-7 py-4 sm:px-9">
      {/* Full Name */}
      <div>
        <label htmlFor="signup-fullname" className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-[#c8d2e2]">
          Full Name
        </label>

        <div className={`flex h-13 items-center rounded-xl border bg-white px-4 transition-all duration-200 dark:bg-[#071525] ${errors.fullname ? "border-red-500/70" : "border-slate-300 dark:border-[#1b3653]"} focus-within:border-[#857adc] focus-within:shadow-[0_0_20px_rgba(133,122,220,0.08)]`}>
          <input id="signup-fullname" type="text" value={fullname} onChange={(e) => dispatch({ type: "signUp/getFullName", payload: e.target.value })} placeholder="e.g. Amirhossein Arhampoor" className="w-full bg-transparent text-[14px] text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-[#62738c]" />
        </div>

        {errors.fullname && <p className="mt-1.5 text-[12px] text-red-500 dark:text-red-400">{errors.fullname}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="signup-email" className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-[#c8d2e2]">
          Email Address
        </label>

        <div className={`flex h-13 items-center gap-3 rounded-xl border bg-white px-4 transition-all duration-200 dark:bg-[#071525] ${errors.email ? "border-red-500/70" : "border-slate-300 dark:border-[#1b3653]"} focus-within:border-[#857adc] focus-within:shadow-[0_0_20px_rgba(133,122,220,0.08)]`}>
          <Mail size={19} className="shrink-0 text-slate-400 dark:text-[#72839d]" />

          <input id="signup-email" type="email" value={email} onChange={(e) => dispatch({ type: "signUp/getEmail", payload: e.target.value })} placeholder="name@email.com" className="w-full bg-transparent text-[14px] text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-[#62738c]" />
        </div>

        {errors.email && <p className="mt-1.5 text-[12px] text-red-500 dark:text-red-400">{errors.email[0]}</p>}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="signup-password" className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-[#c8d2e2]">
          Password
        </label>

        <div className={`flex h-13 items-center gap-3 rounded-xl border bg-white px-4 transition-all duration-200 dark:bg-[#071525] ${errors.password ? "border-red-500/70" : "border-slate-300 dark:border-[#1b3653]"} focus-within:border-[#857adc] focus-within:shadow-[0_0_20px_rgba(133,122,220,0.08)]`}>
          <LockKeyhole size={19} className="shrink-0 text-slate-400 dark:text-[#72839d]" />

          <input id="signup-password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => dispatch({ type: "signUp/getPassword", payload: e.target.value })} placeholder="At least 8 characters" className="w-full bg-transparent text-[14px] text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-[#62738c]" />

          <button type="button" onClick={() => dispatch({ type: "signUp/toggleShowPassword" })} aria-label={showPassword ? "Hide password" : "Show password"} className="shrink-0 cursor-pointer text-slate-400 transition-colors hover:text-violet-600 dark:text-[#667992] dark:hover:text-white">
            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        </div>

        {errors.password && <p className="mt-1.5 text-[12px] text-red-500 dark:text-red-400">{errors.password[0]}</p>}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="signup-confirm-password" className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-[#c8d2e2]">
          Confirm Password
        </label>

        <div className={`flex h-13 items-center gap-3 rounded-xl border bg-white px-4 transition-all duration-200 dark:bg-[#071525] ${errors.confirmPassword ? "border-red-500/70" : "border-slate-300 dark:border-[#1b3653]"} focus-within:border-[#857adc] focus-within:shadow-[0_0_20px_rgba(133,122,220,0.08)]`}>
          <LockKeyhole size={19} className="shrink-0 text-slate-400 dark:text-[#72839d]" />

          <input id="signup-confirm-password" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => dispatch({ type: "signUp/getConfirmPassword", payload: e.target.value })} placeholder="Confirm your password" className="w-full bg-transparent text-[14px] text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-[#62738c]" />
        </div>

        {errors.confirmPassword && <p className="mt-1.5 text-[12px] text-red-500 dark:text-red-400">{errors.confirmPassword}</p>}
      </div>

      {/* Terms */}
      <div className="mt-2">
        <label className="flex cursor-pointer items-start gap-2 text-[12px] leading-5 text-slate-600 dark:text-[#8191aa]">
          <input type="checkbox" checked={isPolicyAccepted} onChange={(e) => dispatch({ type: "signUp/getIsPolicyAccepted", payload: e.target.checked })} className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#857adc]" />

          <span>
            I accept the{" "}
            <button type="button" className="text-violet-600 transition-colors hover:text-violet-800 dark:text-[#9b8cff] dark:hover:text-[#b8adff]">
              Terms of Use
            </button>{" "}
            &{" "}
            <button type="button" className="text-violet-600 transition-colors hover:text-violet-800 dark:text-[#9b8cff] dark:hover:text-[#b8adff]">
              Privacy Policy
            </button>
          </span>
        </label>

        {errors.isPolicyAccepted && <p className="mt-1.5 text-[12px] text-red-500 dark:text-red-400">{errors.isPolicyAccepted}</p>}
      </div>

      {/* Submit */}
      <button type="submit" disabled={isLoading} className="group mt-2 flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#8B5CF6] text-[14px] font-semibold text-white shadow-[0_8px_25px_rgba(133,122,220,0.20)] transition-all duration-300 hover:bg-[#7569d1] hover:shadow-[0_8px_30px_rgba(133,122,220,0.35)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#857adc] disabled:hover:shadow-none">
        {isLoading && <Loader2 size={18} className="animate-spin" />}
        {isLoading ? "Signing up..." : "Create Account"}
        {!isLoading && <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />}
      </button>
    </form>

  )
}

export default SignUpForm