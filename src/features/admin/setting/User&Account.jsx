import SettingRow from "@/features/admin/setting/components/SettingRow"
import SectionCard from "@/features/admin/setting/components/SectionCard ";
import { ChevronDown, Image, Mail, RotateCcw, ShieldCheck, Users, UserX } from "lucide-react"
import SaveButton from "@/features/admin/setting/components/SaveButton "
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  AllowNewUser,
  RequireEmailVerification,
  AllowUsersChangeEmail,

  AllowProfile,
  AllowDeleteAccount,
  RequireStrongPassword,
  AllowPasswordReset,
  setPasswordMinimumLength
} from "@/features/admin/setting/AdminSettingSlice"
import { getuserAndAccountSettings, updateuserAndAccountSettings } from "@/features/admin/setting/AdminSettingSlice";



function UserAndAccount() {
  const [originalSettings, setOriginalSettings] = useState(null);
  const { userAndAccountSettings } = useSelector(state => state.siteSettings)
  const dispatch = useDispatch()

  async function handleSubmit(e) {
    e.preventDefault()

    if (!originalSettings) return

    const hasChanges = JSON.stringify(userAndAccountSettings) !== JSON.stringify(originalSettings)

    if (!hasChanges) {
      toast.error("No changes to save.")
      return
    }

    const updateRes = await dispatch(updateuserAndAccountSettings({ userAndAccountSettings: userAndAccountSettings }))

    if (updateuserAndAccountSettings.fulfilled.match(updateRes)) {
      setOriginalSettings(userAndAccountSettings)

      toast.success("user And account Settings updated successfully!")
    }
  }

  useEffect(() => {
    async function getSetting() {
      const result = await dispatch(getuserAndAccountSettings());

      if (getuserAndAccountSettings.fulfilled.match(result)) {
        setOriginalSettings(result.payload);
      }
    }

    getSetting();
  }, [dispatch]);


  return (
   <form onSubmit={handleSubmit} className="flex flex-col gap-3">
  <div className="space-y-3">
    <div>
      <h1 className="text-[18px] font-semibold text-slate-900 dark:text-white">User & Account Settings</h1>
      <p className="mt-1 text-[10px] text-slate-500 dark:text-[#718096]">Manage user registration, accounts and profile options.</p>
    </div>

    <SectionCard title="Account Registration">
      <SettingRow
        icon={Users}
        title="Allow New User Registration"
        description="Let users create new accounts."
        enabled={userAndAccountSettings?.allownewuser}
        onChange={() => dispatch(AllowNewUser())}
      />

      <SettingRow
        icon={Mail}
        title="Require Email Verification"
        description="Users must verify their email address."
        enabled={userAndAccountSettings?.requireemailverfication}
        onChange={() => dispatch(RequireEmailVerification())}
      />

      <SettingRow
        icon={Mail}
        title="Allow Users to Change Email"
        description="Let users update their email address."
        enabled={userAndAccountSettings?.allowuserschangeemail}
        onChange={() => dispatch(AllowUsersChangeEmail())}
      />

      <SettingRow
        icon={Image}
        title="Allow Profile Pictures"
        description="Let users upload profile pictures."
        enabled={userAndAccountSettings?.allowprofile}
        onChange={() => dispatch(AllowProfile())}
      />

      <SettingRow
        icon={UserX}
        title="Allow Account Deletion"
        description="Let users delete their accounts."
        enabled={userAndAccountSettings?.allowdeleteaccount}
        onChange={() => dispatch(AllowDeleteAccount())}
      />
    </SectionCard>

    <SectionCard title="Password Settings">
      <SettingRow
        icon={ShieldCheck}
        title="Require Strong Passwords"
        description="Enforce password complexity rules."
        enabled={userAndAccountSettings?.requirestrongpassword}
        onChange={() => dispatch(RequireStrongPassword())}
      />

      <div className="flex items-center justify-between gap-5 py-3">
        <div>
          <p className="text-[14px] font-medium text-slate-900 dark:text-white">Minimum Password Length</p>
          <p className="mt-0.5 text-[11px] text-slate-500 dark:text-[#64738b]">Minimum number of characters.</p>
        </div>

        <div className="relative">
          <select
            onChange={(e) => dispatch(setPasswordMinimumLength(Number(e.target.value)))}
            value={userAndAccountSettings?.passwordminimumlength}
            className="h-8 w-full appearance-none rounded-md border border-slate-300 bg-white px-3 pr-8 text-[12px] text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-[#12365b] dark:bg-[#071a2d] dark:text-[#d8e0eb]"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-[#74839a]" />
        </div>
      </div>

      {/* <SettingRow
        icon={KeyRound}
        title="Require Numbers"
        description="Password must contain numbers."
        enabled={userAndAccountSettings?.moviesearch}
        onChange={() => dispatch(enableMovieSearch())}
      />

      <SettingRow
        icon={Lock}
        title="Require Special Characters"
        description="Password must contain special characters."
        enabled={userAndAccountSettings?.moviesearch}
        onChange={() => dispatch(enableMovieSearch())}
      /> */}

      <SettingRow
        icon={RotateCcw}
        title="Allow Password Reset"
        description="Let users reset their password."
        enabled={userAndAccountSettings?.allowpasswordreset}
        onChange={() => dispatch(AllowPasswordReset())}
      />
    </SectionCard>

    <div className="flex justify-end">
      <SaveButton section="userAndAccount" />
    </div>
  </div>
</form>
  )
}

export default UserAndAccount