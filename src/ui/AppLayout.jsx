import { Outlet, useLocation } from "react-router"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import useMediaQuery from "../hooks/useMediaQuery"
import { Toaster } from "react-hot-toast"
import Footer from "@/components/Footer"
import UpgradeModal from "@/features/subscription/UpgradeModal"
import MaintenancePage from "@/ui/MaintenancePage"


function AppLayout() {
  const { isSubscriptionOpen } = useSelector(state => state.auth)
  const { generalSettings } = useSelector(state => state.siteSettings)
  const { currentUser } = useSelector(state => state.auth)
  const { isDark } = useSelector(state => state.theme)
  const mediaQuery = useMediaQuery("(max-width: 699px)")
  const location = useLocation()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)

    localStorage.setItem("theme", isDark ? "dark" : "light")

    if (!generalSettings) return;

    if (generalSettings.sitename) {
      document.title = generalSettings.sitename;
    }
  }, [isDark,generalSettings])

  if (currentUser?.role === "user" && generalSettings.maintenancemode) {
    return <MaintenancePage />
  }
  return (
    <div
      className={`
        ${isDark ? "dark" : ""}
        flex min-h-screen
        bg-[#f5f5f5] text-black
        dark:bg-[#040b14] dark:text-white
        transition-all duration-300 ease-in-out
      `}
    >
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            style: {
              borderColor: "#39b500",
              backgroundColor: "#246e03",
            },
          },
          error: {
            style: {
              borderColor: "#fa0202",
              backgroundColor: "#ba0202",
            },
          },
          style: {
            border: "2px solid",
            borderRadius: "7px",
            color: "white",
            padding: "11px 10px",
            fontSize: "15px",
            whiteSpace: "nowrap",
            width: "max-content",
            maxWidth: "none",
          },
        }}
      />

      {!mediaQuery && <SideBar />}

      <div className=" relative min-w-0 flex-1">
        {isSubscriptionOpen && <UpgradeModal />}
        <Header />

        <Outlet />

        {location.pathname !== "/auth" && <Footer />}
      </div>
    </div>
  )
}

export default AppLayout