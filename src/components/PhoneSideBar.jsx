import NavBarBtn from "./NavBarBtn"
import { navBtnData ,adminNavBtnData} from "../utils/styles"
import { sidebarBtnStyle } from "../utils/styles"
import { NavLink, useNavigate } from "react-router"
import { ArrowRight, LogOut, UserRoundArrowLeft, User, Crown } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { logOutUser } from "../features/auth/AuthSlice"
import toast from "react-hot-toast"

function PhoneSideBar({ handleOpen, isSideBarOpen, setIsSideBarOpen }) {
  const { currentUser } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleUserLogOut() {
    const res = await dispatch(logOutUser())

    if (logOutUser.fulfilled.match(res)) {
      navigate("/")
      toast.success("You have logged out successfully!")
    }
    setIsSideBarOpen(false)
  }

  return (
    <div className={`fixed w-49 top-0 right-0 z-100 flex h-lvh flex-col gap-3 p-4 bg-white transition-transform duration-300 ease-in-out border-l-2 dark:bg-[#040b14]!
dark:border-[#292D35] border-[#edf3f8] ${!isSideBarOpen ? "translate-x-50" : ""}
  `} >

      <div
        className="self-end bg-inherit! cursor-pointer"
        onClick={handleOpen}
      >
        <ArrowRight className="dark:text-white" />
      </div>


      {currentUser?.role !== "admin" ?
          <nav className="mt-11 flex flex-col gap-2">

            {navBtnData.slice(0, 5).map((btn) => (
              <NavBarBtn
                key={btn.id}
                btnText={btn.text}
                location={btn.to}
                icon={btn.icon}
                style={sidebarBtnStyle}
              />
            ))}

            <span className=" my-1 h-px w-ful bg-[#edf3f8] dark:bg-[#292D35] " />

            {navBtnData.slice(5, 7).map((btn) => (
              <NavBarBtn
                key={btn.id}
                btnText={btn.text}
                location={btn.to}
                icon={btn.icon}
                style={sidebarBtnStyle}
              />
            ))}

            <span className=" my-1 h-px w-full bg-[#edf3f8] dark:bg-[#292D35] " />

            {navBtnData.slice(7, 8).map((btn) => (
              <NavBarBtn
                key={btn.id}
                btnText={btn.text}
                location={btn.to}
                icon={btn.icon}
                style={sidebarBtnStyle}
              />
            ))}

            <NavBarBtn
              btnText="Profile"
              location="/profile"
              icon={User}
              style={sidebarBtnStyle}
            />

            <NavBarBtn
              btnText="Subscription"
              location="/subscription"
              icon={Crown}
              style={sidebarBtnStyle}
            />
          </nav>
          :
          <nav className="mt-11 flex flex-col gap-2">

            {adminNavBtnData.slice(0, 4).map((btn) => (
              <NavBarBtn
                key={btn.id}
                btnText={btn.text}
                location={btn.to}
                icon={btn.icon}
                style={sidebarBtnStyle}
              />
            ))}

          </nav>
        }

      {/* Login/Log out */}
        <div className="mt-auto">
          {currentUser !== null ? (
            <button
              onClick={handleUserLogOut}
              className="
                flex
                w-full
                cursor-pointer
                items-center
                gap-2
                rounded-[7px]
                p-2.5
                text-[14px]
                transition-all
                duration-300

                hover:bg-[#7347eb]
                hover:text-white
                hover:shadow-lg
                hover:shadow-purple-900/20

                dark:text-white
              "
            >
              <LogOut size={17} />

              <span>Log out</span>
            </button>
          ) : (
            <NavLink
              to="/auth"
              className="
                flex
                w-full
                cursor-pointer
                items-center
                gap-2
                rounded-[7px]
                p-2.5
                text-[14px]
                transition-all
                duration-300

                hover:bg-[#7347eb]
                hover:text-white
                hover:shadow-lg
                hover:shadow-purple-900/20

                dark:text-white
              "
            >
              <UserRoundArrowLeft size={18} />

              <div className="flex items-center gap-2">
                <p>Sign up</p>

                <span
                  className="
                    h-5
                    w-px
                    bg-yellow-400
                    dark:bg-white
                  "
                />

                <p>Log in</p>
              </div>
            </NavLink>
          )}
        </div>
    </div>
  )
}

export default PhoneSideBar