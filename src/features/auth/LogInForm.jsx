import { useDispatch, useSelector } from "react-redux"
import { getZodErrors, loginSchema } from "../../utils/validators"
import { Eye, EyeOff, Loader2 ,Mail,LockKeyhole,ArrowRight} from "lucide-react"
import { checkUser } from "./AuthSlice"
import { useNavigate } from "react-router"
import toast from "react-hot-toast"

function LogInForm() {
  const {
    email,
    password,
    errors,
    showPassword
  } = useSelector(state => state.logIn)
  const { isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function validate() {
    const data = getZodErrors(loginSchema, {
      email,
      password
    })
    dispatch({ type: "login/setFormErrors", payload: data })
    console.log(data)
    return Object.values(data).every(errors => errors.length === 0);

  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    const result = await dispatch(checkUser({
      email: email.trim(),
      password
    }))

    if (checkUser.fulfilled.match(result)) {
      toast.success("You have logged in successfully!")
      navigate("/")
    }
    await dispatch({ type: "login/clearInputs" })

  }



  return (


<form onSubmit={handleSubmit} className="flex w-full flex-col gap-5 px-7 py-4 sm:px-9">
  {/* Email */}
  <div>
    <label htmlFor="login-email" className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-[#c8d2e2]">
      Email Address
    </label>

    <div className={`flex h-13 items-center gap-3 rounded-xl border bg-white px-4 transition-all duration-200 dark:bg-[#071525] ${errors.email?.length > 0 ? "border-red-500/70" : "border-slate-300 dark:border-[#263750]"} focus-within:border-[#857adc] focus-within:shadow-[0_0_20px_rgba(133,122,220,0.08)]`}>
      <Mail size={19} className="shrink-0 text-slate-400 dark:text-[#72839d]" />

      <input id="login-email" type="text" value={email} onChange={(e) => dispatch({ type: "login/getEmail", payload: e.target.value })} placeholder="name@email.com" className="w-full bg-transparent text-[14px] text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-[#62738c]" />
    </div>

    {errors.email && <p className="mt-1.5 text-[12px] text-red-500 dark:text-red-400">{errors.email[0]}</p>}
  </div>

  {/* Password */}
  <div>
    <label htmlFor="login-password" className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-[#c8d2e2]">
      Password
    </label>

    <div className={`flex h-13 items-center gap-3 rounded-xl border bg-white px-4 transition-all duration-200 dark:bg-[#071525] ${errors.password?.length > 0 ? "border-red-500/70" : "border-slate-300 dark:border-[#263750]"} focus-within:border-[#857adc] focus-within:shadow-[0_0_20px_rgba(133,122,220,0.08)]`}>
      <LockKeyhole size={19} className="shrink-0 text-slate-400 dark:text-[#72839d]" />

      <input id="login-password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => dispatch({ type: "login/getPassword", payload: e.target.value })} placeholder="At least 8 characters" className="w-full bg-transparent text-[14px] text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-[#62738c]" />

      <button type="button" onClick={() => dispatch({ type: "login/toggleShowPassword" })} aria-label={showPassword ? "Hide password" : "Show password"} className="shrink-0 cursor-pointer text-slate-400 transition-colors hover:text-violet-600 dark:text-[#667992] dark:hover:text-white">
        {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
      </button>
    </div>

    {errors.password && <p className="mt-1.5 text-[12px] text-red-500 dark:text-red-400">{errors.password[0]}</p>}
  </div>

  {/* Remember / Forgot */}
  <div className="mt-2 flex items-center justify-between gap-3">
    <label className="flex cursor-pointer items-center gap-2 text-[13px] text-slate-600 dark:text-[#8191aa]">
      <input type="checkbox" className="h-4 w-4 cursor-pointer accent-[#857adc]" />
      Remember me
    </label>

    <button type="button" className="cursor-pointer text-[12px] font-medium text-violet-600 transition-colors hover:text-violet-800 dark:text-[#9b8cff] dark:hover:text-[#b8adff]">
      Forgot password?
    </button>
  </div>

  {/* Submit */}
  <button type="submit" disabled={isLoading} className="mt-3 flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#8B5CF6] text-[14px] font-semibold text-white shadow-[0_8px_25px_rgba(133,122,220,0.20)] transition-all duration-300 hover:bg-[#7569d1] hover:shadow-[0_8px_30px_rgba(133,122,220,0.35)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#857adc] disabled:hover:shadow-none">
    {isLoading && <Loader2 size={18} className="animate-spin" />}
    {isLoading ? "Logging in..." : "Log In"}
    {!isLoading && <ArrowRight size={18} className="transition-transform duration-300" />}
  </button>
</form>

  )
}

export default LogInForm