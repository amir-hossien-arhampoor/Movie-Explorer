import { useEffect, useState } from "react"
import { useLocation,NavLink } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { Sun, Moon, Menu } from "lucide-react"
import Title from "./Title"
import PhoneSideBar from "./PhoneSideBar"
import useMediaQuery from "../hooks/useMediaQuery"


function Header() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const mediaQuery = useMediaQuery("(max-width: 699px)")
  const { isDark } = useSelector(state => state.theme)
  const {currentUser} = useSelector(state => state.auth)
  const url = useLocation()
  const dispatch = useDispatch()
  const handleClick = () => setIsSideBarOpen(prev => !prev)

  useEffect(() => {
    async function autoClose() {
      setIsSideBarOpen(false)
    }
    autoClose()
  }, [url.pathname])

  useEffect(() => {
    function handleOutSideClick() {
      if (isSideBarOpen ) {
        setIsSideBarOpen(false)
      }
    }

    document.addEventListener("mousedown",handleOutSideClick)

    return () => {
      document.removeEventListener("mousedown",handleOutSideClick)
    }
  },[isSideBarOpen])

  return (
    <header className={`sticky top-0 flex items-center ${mediaQuery ?"justify-between" :"justify-end"} px-3 py-4 pr-3 border-b-2 border-[#d2d6da] bg-[#f7f9fc] dark:bg-[#040b14] dark:border-[#292D35] dark:text-yellow-500 z-11 `} >

      {mediaQuery && <Title />}

      <div className="flex items-center gap-4">

        {url.pathname !== "/profile" && currentUser && <NavLink to="/profile">
          <div className="relative cursor-pointer">
              {/* <Bell /> */}
              {/* <span className="absolute -top-2 -right-1 rounded-[100%] flex justify-center items-center h-4 w-4 bg-[#6D28D9] text-[11px] ">3</span> */}
            </div>
            <img src={currentUser?.profileImg || "./public/Default_pfp.svg.webp"} alt="" className="w-8 h-8 rounded-[100%]" />
        </NavLink>}

        <div className="cursor-pointer text-white" onClick={() => dispatch({ type: "theme/darkModeToggle" })}>
          {isDark ? (
            <Sun />
          ) : (
            <Moon color="black" />
          )}
        </div>

        {!mediaQuery ? "":
          <div className="" onClick={handleClick} >
            <Menu className="dark:text-white cursor-pointer" />
          </div>}

        <PhoneSideBar
          handleOpen={handleClick}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      </div>
    </header>
  )
}

export default Header

