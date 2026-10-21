import ConfirmActionModal from "@/components/ConfirmActionModal"
import { addActionToActivities } from "@/features/admin/dashboard/SiteActivitySlice"
import { getuserAndAccountSettings } from "@/features/admin/setting/AdminSettingSlice"
import { deleteUserAccount } from "@/features/setting/SettingSlice"
import SettingUserChangePassword from "@/features/setting/SettingUserChangePassword"
import SettingUserEditProfile from "@/features/setting/SettingUserEditProfile"
import { ChevronRight, LockKeyhole, Pencil, Trash2, User } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"

function SettingAccount() {
  const { currentUser } = useSelector(state => state.auth)
  const { userAndAccountSettings } = useSelector(state => state.siteSettings)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    setIsDeleting(true)

    const deleteRes = await dispatch(deleteUserAccount({ id: currentUser?.id }))
    if (deleteUserAccount.fulfilled.match(deleteRes)) {
      await dispatch(addActionToActivities({ email: currentUser?.email, type: "remove-user" }))

      navigate("/")

      toast.success("Account deleted successfully.")
      setIsConfirmOpen(false)
      setIsDeleting(false)
    }
  }

  useEffect(() => {
    async function getData() {
      await dispatch(getuserAndAccountSettings())
    }

    getData()
  }, [dispatch, currentUser?.userId])

  return (
    <>

      <div className="rounded-[9px] border border-slate-200 bg-white px-2 py-2 pb-5 text-slate-900 transition-colors dark:border-[#112a46] dark:bg-[#03111f] dark:text-white">
        <div className="flex items-center gap-3">
          <User size={25} className="text-violet-600 dark:text-[#6d3eec]" />
          <div>
            <h1 className="font-bold">Account</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6f8196]">
              Manage your profile.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5">
          {/* Edit profile */}
          <div
            className={`overflow-hidden rounded-[9px] border border-slate-200 bg-slate-50 px-2 transition-all duration-300 ease-in-out dark:border-[#112a46] dark:bg-[#020a13] ${isEditOpen ? "py-3" : "h-16.5 py-3"
              }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={currentUser?.profileImg || "/Default_pfp.svg.webp"}
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover"
                />

                <div>
                  <h1 className="text-[13px]">
                    {currentUser?.fullname}
                  </h1>
                  <p className="text-[11px] text-slate-500 dark:text-[#6f8196]">
                    {currentUser?.email}
                  </p>
                </div>
              </div>

              {!isEditOpen && (
                <button
                  className="flex cursor-pointer items-center gap-1 rounded-[8px] border border-violet-500 px-3 py-2 text-violet-700 transition-all duration-200 hover:bg-violet-50 dark:border-[#6c3cec] dark:text-[#baa4f5] dark:hover:bg-[#5112ff]"
                  onClick={() => setIsEditOpen(true)}
                >
                  <Pencil size={13} />
                  <p className="text-[11px]">Edit Profile</p>
                </button>
              )}
            </div>

            <div
              className={`transition-all duration-300 ease-in-out ${isEditOpen
                  ? "mt-3 translate-y-0 opacity-100"
                  : "pointer-events-none mt-0 -translate-y-3 opacity-0"
                }`}
            >
              <SettingUserEditProfile setIsEditOpen={setIsEditOpen} />
            </div>
          </div>

          {/* Change password */}
          <div
            className={`overflow-hidden rounded-[9px] border border-slate-200 bg-slate-50 px-2 transition-all duration-300 ease-in-out dark:border-[#112a46] dark:bg-[#061c35] ${isChangePasswordOpen ? "py-1" : "h-12 py-1"
              }`}
          >
            <div className="flex cursor-pointer items-center">
              <div className="flex flex-1 items-center gap-2">
                <LockKeyhole
                  size={22}
                  className="text-violet-600 dark:text-[#8661ef]"
                />
                <div>
                  <h1 className="text-[13px]">Change Password</h1>
                  <p className="text-[11px] text-slate-500 dark:text-[#6f8196]">
                    Update your password for better security.
                  </p>
                </div>
              </div>

              {!isChangePasswordOpen && (
                <button
                  type="button"
                  aria-label="Open change password form"
                  className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-[#102a45]"
                  onClick={() => setIsChangePasswordOpen(true)}
                >
                  <ChevronRight size={20} />
                </button>
              )}
            </div>

            <div
              className={`transition-all duration-300 ease-in-out ${isChangePasswordOpen
                  ? "mt-3 translate-y-0 opacity-100"
                  : "pointer-events-none mt-0 -translate-y-3 opacity-0"
                }`}
            >
              <SettingUserChangePassword
                setIsChangePasswordOpen={setIsChangePasswordOpen}
              />
            </div>
          </div>

          {/* Delete account */}
          <button
            className="mt-auto flex cursor-pointer self-end items-center gap-2 rounded-[7px] border-2 border-red-500 px-7 py-2 text-[14px] text-red-600 transition-all duration-300 ease-in-out hover:bg-red-50 dark:border-red-600 dark:text-red-500 dark:hover:bg-[#ee24241e]"
            onClick={() => {
              if (!userAndAccountSettings.allowdeleteaccount) {
                toast.error("Deleting account is disabled by admin!");
                return;
              }

              setIsConfirmOpen(true);
            }}
          >
            <Trash2 size={17} />
            Delete account
          </button>
        </div>
      </div>

      <ConfirmActionModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Delete the account?"
        message="This action will permanently delete your account!"
        isLoading={isDeleting}
        btnText={["delete", "deleting..."]}
      />
    </>

  )
}

export default SettingAccount