import ConfirmActionModal from "@/components/ConfirmActionModal";
import AccountDetails from "@/features/admin/users/user-details/components/AccountDetails";
import AccountSummary from "@/features/admin/users/user-details/components/AccountSummary";
import PersonalInformation from "@/features/admin/users/user-details/components/PersonalInformation";
import UserDetailsHeader from "@/features/admin/users/user-details/components/UserDetailsHeader";
import UserEditDetails from "@/features/admin/users/user-details/UserEditDetails";
import { getStatus } from "@/features/admin/users/user-details/UserEditDetailsSlice";
import { updateUserInfo } from "@/features/admin/users/user-details/UserEditDetailsSlice";
import { getUser, getUserStats } from "@/utils/api";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router";

function UserDetails() {
  const [userData, setUserData] = useState({})
  const [userStats, setUserStats] = useState({})
  const [openEdit, setOpenEdit] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isDeactivating, setIsDeactivating] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userDetails } = useParams()

  async function handleDeactivate() {
    setIsDeactivating(true)

    dispatch(getStatus(false))
    const newData = {
      status: false,
    };

    const result = await dispatch(updateUserInfo({ id: userData?.id, newData, }))

    if (updateUserInfo.fulfilled.match(result)) {
      toast.success("Account deactivated successfully.");
      setUserData(result.payload)
      setIsConfirmOpen(false)
    }
  }

  useEffect(() => {

    async function getUserData() {
      const data = await getUser(userDetails)
      setUserData(data[0])

      const stats = await getUserStats(userData.userId)
      setUserStats(stats)
    }
    getUserData()
  }, [userData.userId, userDetails])


  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-800 transition-colors dark:bg-[#040b14] dark:text-[#dce6f5]">
      <div
        className={`transition-all duration-300 ease-in-out ${openEdit
            ? "pointer-events-none absolute inset-0 -translate-x-6 opacity-0"
            : "relative translate-x-0 opacity-100"
          }`}
      >
        <div>
          {/* Back */}
          <NavLink
            onClick={() => navigate(-1)}
            className="mb-5 flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900 dark:text-[#9baec8] dark:hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Users
          </NavLink>

          {/* Profile Header */}
          <UserDetailsHeader
            user={userData}
            setOpenEdit={setOpenEdit}
            setIsConfirmOpen={setIsConfirmOpen}
          />

          {/* Main Content */}
          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
            {/* Main Profile Card */}
            <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white dark:border-[#112a46] dark:bg-[#08121e]">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <PersonalInformation user={userData} />

                <AccountDetails user={userData} />
              </div>
            </div>

            {/* Right Side */}
            <AccountSummary userStats={userStats} userData={userData} />
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${openEdit
            ? "relative translate-x-0 opacity-100"
            : "pointer-events-none absolute inset-0 opacity-0"
          }`}
      >
        <UserEditDetails
          onClose={() => setOpenEdit(false)}
          user={userData}
          onSave={(updatedUser) => setUserData(updatedUser)}
        />
      </div>

      <ConfirmActionModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeactivate}
        isLoading={isDeactivating}
        title="Deactivate the account?"
        message="This action will deactivate the account."
        btnText={["deactivate", "deactivating..."]}
      />
    </div>
  );
}


export default UserDetails;