import { LockKeyhole, Eye, EyeOff, CheckCircle2, Circle, Loader2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordSchema, getZodErrors } from "../../utils/validators";
import { checkCurrentPassword, updateUserPassword } from "../userProfile/ChangePasswordSlice";

export function SettingUserChangePassword({ setIsChangePasswordOpen }) {
  const { currentUser } = useSelector(state => state.auth)
  const {
    currentPassword,
    newPassword,
    confirmNewPassword,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    isLoading,
    errors,
    newPasswordRules
  } = useSelector(state => state.editPassword)
  const dispatch = useDispatch()

  async function validate() {
    const data = getZodErrors(changePasswordSchema, {
      currentPassword,
      newPassword,
      confirmNewPassword,
    })

    dispatch({ type: "editPassword/setErrors", payload: data })
    dispatch({ type: "editPassword/setNewPasswordRules", payload: data })
    if (currentPassword !== "") {
      await dispatch(checkCurrentPassword({ id: currentUser.id, currentPassword: currentPassword }))
    }

    return Object.values(data).every(errors => errors.length === 0);
  }


  const handleChangePassword = async (e) => {
    e.preventDefault()
    const isValid = await validate()

    if (!isValid) return

    const res = await dispatch(updateUserPassword({ id: currentUser.id, newPassword: newPassword }))

    if (updateUserPassword.fulfilled.match(res)) {
      dispatch({ type: "editPassword/clearInputs" })
    }
  }


  return (
    <div className="w-full rounded-xl border dark:border-[#123052] dark:bg-[#03111f] border-[#edf3f8] bg-white p-2 sm:p-6 mt-8">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-[#4725b8] to-[#7c4dff] shadow-lg shadow-purple-900/20">
          <LockKeyhole size={20} className="text-[#d8c5ff]" />
        </div>

        <div>
          <h2 className="text-[14px] font-semibold dark:text-white">
            Change Password
          </h2>

          <p className="mt-1 text-[11px] text-neutral-400">
            Keep your account secure by using a unique password.
          </p>
        </div>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-4 " onSubmit={handleChangePassword}>
        {/* Current Password */}
        <div>
          <label
            htmlFor="currentPassword"
            className="mb-1 block text-[12px] font-semibold dark:text-white"
          >
            Current Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8da8cb]"
            />

            <input
              id="currentPassword"
              onChange={e => dispatch({ type: "editPassword/getCurrentPassword", payload: e.target.value })}
              value={currentPassword}
              type={!showCurrentPassword ? "text" : "password"}
              placeholder="Enter your current password"
              className="h-8 w-full rounded-lg border dark:border-[#1a416b] border-[#c7c9ca] dark:bg-[#061a30] pl-10 pr-11 text-[12px] dark:text-white outline-none placeholder:text-[#7791b3] transition focus:border-[#7445ff] focus:ring-1 focus:ring-[#7445ff]"
            />

            <button
              type="button"
              onClick={() => dispatch({ type: "editPassword/showCurrentPassword" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8da8cb] transition hover:text-white"
            >
              {showCurrentPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
          {errors.currentPassword && <p className="text-red-500 text-[12px]">{errors.currentPassword}</p>}
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor="newPassword"
            className="mb-1 block text-[12px] font-semibold dark:text-white"
          >
            New Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8da8cb]"
            />

            <input
              id="newPassword"
              value={newPassword}
              type={!showNewPassword ? "text" : "password"}
              onChange={e => dispatch({ type: "editPassword/getNewPassword", payload: e.target.value })}
              placeholder="Enter your new password"
              className="h-8 w-full rounded-lg border dark:border-[#1a416b] border-[#c7c9ca] bg-white dark:bg-[#061a30] pl-10 pr-11 text-[12px] dark:text-white outline-none placeholder:text-[#7791b3] transition focus:border-[#7445ff] focus:ring-1 focus:ring-[#7445ff]"
            />

            <button
              type="button"
              onClick={() => dispatch({ type: "editPassword/showNewPassword" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8da8cb] transition hover:text-white"
            >
              {showNewPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {/* Password Requirements */}
          {errors.newPassword && <div className="mt-1 flex flex-col gap-1  ">
            <PasswordRequirement
              text="At least 8 characters long"
              rule={newPasswordRules.IsLong}
            />
            <PasswordRequirement
              text="Include a number"
              rule={newPasswordRules.IsIncludeNumber}

            />

          </div>}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1 block text-[12px] font-semibold dark:text-white"
          >
            Confirm New Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8da8cb]"
            />

            <input
              id="confirmPassword"
              value={confirmNewPassword}
              onChange={e => dispatch({ type: "editPassword/getConfirmNewPassword", payload: e.target.value })}
              type={!showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your new password"
              className="h-8 w-full rounded-lg border border-[#c7c9ca]  dark:border-[#1a416b] dark:bg-[#061a30] pl-10 pr-11 text-[12px] dark:text-white outline-none placeholder:text-[#7791b3] transition focus:border-[#7445ff] focus:ring-1 focus:ring-[#7445ff]"
            />

            <button
              type="button"
              onClick={() => dispatch({ type: "editPassword/showConfirmPassword" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8da8cb] transition hover:text-white"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
          {errors.confirmNewPassword && <p className="text-red-500 text-[12px]">{errors.confirmNewPassword}</p>}
        </div>

        {/* Submit */}
        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex h-8 w-full  items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#6030e8] to-[#7040ed] text-sm font-medium text-white shadow-lg shadow-purple-900/20 transition hover:from-[#7040ed] hover:to-[#8050ff] active:scale-[0.99] cursor-pointer ${isLoading && "bg-[#2f1572]"}`}
          >
            {
              !isLoading &&
              <>
                <LockKeyhole size={15} />
                <p className="text-[12px]">Update Password</p>
              </>}
            {
              isLoading &&
              <>
                <Loader2 className="animate-spin" />
                <p>Updating Password</p>
              </>
            }

          </button>
          <button
            type="button"
            className="
                flex items-center gap-2
                justify-center
                rounded-lg
                h-8 w-full
                border dark:border-[#1a416b]!
                dark:bg-[#061a30]
                border-[#c7c9ca]!
                px-4 py-1
                text-[12px]
                transition
                hover:bg-neutral-800
                cursor-pointer
                flex-1
              "
            onClick={() => setIsChangePasswordOpen(false)}
          >
            <X className="size-4" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const PasswordRequirement = ({ text, rule }) => {
  console.log(rule)
  return (
    <div className="flex items-center gap-2 transition-all duration-200 ease-in-out">
      {rule ? <CheckCircle2
        size={15}
        fill="#0e8303"
        className="shrink-0 text-[#1ee90c]"

      /> : <Circle size={15} className={` ${!rule ? "text-red-500" : ""}`} />
      }

      <span className={`text-xs text-[#9ab0cf] ${!rule ? "text-red-500" : "text-[#1ee90c]!"}`}>{text}</span>
    </div>
  );
};


export default SettingUserChangePassword;