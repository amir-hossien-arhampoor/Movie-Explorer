import { useDispatch, useSelector } from "react-redux"
import { Pen, Mail, Calendar, Palette, Globe, Bell, TicketMinus, ChevronRight } from "lucide-react"
import UserStats from "./UserStats";
import Slider from "../../components/Slider";
import UserEditProfile from "./UserEditProfile";
import UserChangePassword from "./UserChangePassword";
import AuthRequired from "@/components/AuthRequired";
import { NavLink } from "react-router";
import { useEffect } from "react";
import { getUserNotifications } from "@/features/userProfile/user-notification/NotificationSlice";
import { getuserAndAccountSettings } from "@/features/admin/setting/AdminSettingSlice";

function UserProfile() {
  const { currentUser } = useSelector(state => state.auth)
  const { isDark } = useSelector(state => state.theme)
  const { language } = useSelector(state => state.editProfile)
  const { notifications } = useSelector(state => state.notifications)
  const { userAndAccountSettings } = useSelector(state => state.siteSettings)
  const upperCasedName = currentUser?.fullname.charAt(0).toUpperCase() + currentUser?.fullname.slice(1);
  const unreadNotifications = notifications.filter(notification => {
    return notification.isRead !== true ? notification : null
  })

  const dispatch = useDispatch()

  const scrollToProfileEdit = () => {
    document
      .getElementById("user-edit-profile")
      .scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
  }
  const scrollToTop = () => {
    document
      .getElementById("profile-header")
      .scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
  }

  useEffect(() => {
    async function getData() {
      await dispatch(getuserAndAccountSettings())
    }
    async function getNotifications() {
      await dispatch(getUserNotifications({ userId: currentUser.userId }))
    }
    getData()
    getNotifications()
  }, [dispatch, currentUser?.userId])

  return (
    <>
      <div className="px-4 min-w-0 mb-10">

        {/* User profile header */}
        <div className="mt-4 flex items-center justify-between" id="profile-header">

          <h1 className="font-bold text-[#0e224d] dark:text-white">User Profile</h1>
          <div className="flex items-center gap-4">

            <NavLink to="create-ticket" className="flex h-9 self-start px-4 items-center justify-center gap-1 rounded-lg bg-linear-to-r from-[#6030e8] to-[#7040ed] text-sm font-medium text-white shadow-lg shadow-purple-900/20 transition hover:from-[#7040ed] hover:to-[#8050ff] ">
              <TicketMinus size={13} />
              <p
                className="text-[12px] cursor-pointer"
              >Create ticket
              </p>
            </NavLink>

            <NavLink to="notifications" className="relative cursor-pointer">
              <Bell />
              {unreadNotifications.length !== 0 && <span className="absolute -top-2 -right-1 rounded-[100%] flex justify-center items-center h-4 w-4 bg-red-500 text-white text-[11px] ">
                {unreadNotifications.length}
              </span>}
            </NavLink>

            <img src={currentUser?.profileImg || "./public/Default_pfp.svg.webp"} alt="" className="w-8 h-8 rounded-[100%]" />
          </div>
        </div>

        {/* User details */}
        <div className="flex flex-col ">
          <div className="dark:bg-[#03111f] border-[#edf3f8] bg-white border dark:border-[#123052] rounded-[13px] mt-3 p-4 flex flex-col gap-6 md:flex-row lg:w-[50%] lg:h-48">
            <div className="flex items-center gap-7 h-full">
              <div className="">
                <div className="relative flex-1 w-30 h-30">
                  <img src={currentUser?.profileImg || "../../../public/Default_pfp.svg.webp"} alt="" className="w-full h-full rounded-[100%]" />

                </div>

              </div>
              <div className="flex flex-col items-baseline ">
                <p className="text-[20px] font-bold ">{upperCasedName}</p>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-[13px] dark:text-zinc-400">
                    <Mail size={15} />
                    <p className="">{currentUser?.email}</p>
                  </div>
                  <p className="text-[12px] dark:text-zinc-400 mt-2">{currentUser?.bio || "Write something about yourself..."}</p>

                  <div className="flex h-7 self-start px-4 items-center justify-center gap-1 rounded-lg bg-linear-to-r from-[#6030e8] to-[#7040ed] text-sm font-medium text-white shadow-lg shadow-purple-900/20 transition hover:from-[#7040ed] hover:to-[#8050ff] ">
                    <Pen size={13} />
                    <button
                      className="text-[12px] cursor-pointer"
                      onClick={() => {
                        scrollToProfileEdit()
                      }}
                    >Edit Profile</button>
                  </div>
                </div>
              </div>
            </div>

            <span className="w-full h-0.5 block bg-[#edf3f8] dark:bg-[#292D35] md:w-0.5 md:block md:h-35"></span>

            <div className="flex items-center justify-between md:flex-col md:items-baseline">
              <div className="flex items-center gap-3">
                <Calendar color="#8B5CF6" size={16} />
                <div className="text-[12px]">
                  <p className="text-gray-400 ">Joined</p>
                  <span>{currentUser?.joined}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Palette color="#8B5CF6" size={16} />
                <div className="text-[12px]">
                  <p className="text-gray-400 ">Theme</p>
                  <span>{isDark ? "Dark" : "Light"}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe color="#8B5CF6" size={16} />
                <div className="text-[12px]">
                  <p className="text-gray-400 ">Language</p>
                  <span>{language}</span>
                </div>
              </div>
            </div>
          </div>

          {/* User Stats */}
          <UserStats />
        </div>

        {/* User details about movies */}
        <div className="">
          <div className="w-full rounded-xl border border-[#edf3f8] bg-white dark:border-[#123052] dark:bg-[#03111f] p-5 sm:p-6 mt-10 ">
            <Slider userId={currentUser?.userId} name="watchlist" path="/watchlist" />
          </div>

          <div className="w-full rounded-xl border border-[#edf3f8] bg-white dark:border-[#123052] dark:bg-[#03111f] p-5 sm:p-6 mt-1">

            <Slider userId={currentUser?.userId} name="favorites" path="/favorites" />
          </div>
        </div>

        {/* User tickets */}
        <div className="w-full rounded-xl border border-[#edf3f8] bg-white dark:border-[#123052] dark:bg-[#03111f] p-2 sm:p-3 mt-10 ">
          <div className="flex items-center justify-between">
            <div className="">
              <h1 className="text-[13px] font-bold">My tickets</h1>
              <p className="text-gray-400 text-[12px] lg:text-[11px] md:text-[10px]">View your latest tickets</p>
            </div>
            <NavLink to={"user-tickets"} className="flex items-center text-[11px] text-[#b588fd]">
              <p>View all</p>
              <ChevronRight size={16} color="#b588fd" />
            </NavLink>
          </div>
          <div className="">

          </div>
        </div>

        <div className="lg:flex lg:justify-between gap-5">
          {/* User Password Change */}
          <UserChangePassword
            scrollToTop={scrollToTop}
            allowPasswordReset={userAndAccountSettings.allowpasswordreset}
          />

          {/* User edit profile */}
          <div id="user-edit-profile">
            <UserEditProfile
              scrollToTop={scrollToTop}
              allowChangeEmail={userAndAccountSettings.allowuserschangeemail}
              allowProfile={userAndAccountSettings.allowprofile}
            />
          </div>
        </div>

      </div>
      {!currentUser && <AuthRequired />}
    </>
  )
}

export default UserProfile
