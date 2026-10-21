import { User } from "lucide-react"
import { NavLink } from "react-router"



function AuthRequired() {
  return (
    <div className="fixed flex-col inset-0 z-9999 flex items-center justify-center bg-[#030b1c]/85 backdrop-blur-[10px]">

      <img src="public\AuthenticateFirsticon.png" alt="" />

      <div className="flex flex-col items-center">
        <p className="text-[29px] font-bold">
          <span className="text-[#927ef7]">Sign in </span>
          to continue</p>

        <p className="dark:text-[#97a4c7] text-center mt-2">
          Log in to your account to access movies,<br /> add to watchlist, and enjoy all features
        </p>
      </div>

      <div className="flex flex-col items-center gap-5 mt-6">

        <NavLink to="/auth" className="flex h-12 w-full justify-center items-center dark:text-white gap-2 rounded-lg px-13 text-sm font-medium transition bg-linear-to-r from-[#6030e8] to-[#7040ed] active:scale-[0.99] cursor-pointer">
          <User />
          <p>Sign In</p>
        </NavLink>

        <div className=" flex w-52 items-center gap-4">
          <div className="h-px flex-1 bg-[#7183a2]" />

          <span className="text-[15px] text-[#c4cee0]">or</span>

          <div className="h-px flex-1 bg-[#7183a2]" />
        </div>

        <NavLink 
        to="/auth"
        className="
        flex items-center justify-center
            h-12.5
            w-53
            rounded-[11px]
            border
            border-[#7e94ba]
            bg-transparent
            text-[16px]
            font-medium
            text-[#d8e0ef]
            transition-all
            duration-200
            hover:border-[#8b5cf6]
            hover:bg-[#6d3df5]/10
            hover:text-white
            active:scale-[0.98]
          ">
          <p>Create an Account</p>
        </NavLink>
      </div>
    </div>
  )
}

export default AuthRequired