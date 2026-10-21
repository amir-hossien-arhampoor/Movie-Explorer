import InputField from "@/features/admin/users/components/InputField";
import SelectField from "@/features/admin/users/components/SelectField";
import PasswordField from "@/features/admin/users/components/PasswordField";
import { UserPlus, User, Mail, Camera, ShieldCheck, Crown, Circle, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addNewUserSchema, getZodErrors } from "@/utils/validators";
import { checkNewUser } from "@/features/auth/AuthSlice";
import {
  addNewUser,
  getConfirmPassword,
  getEmail,
  getFullName,
  getPassword,
  toggleShowConfirmPassword,
  toggleShowPassword,
  getUserRole,
  getUserStatus,
  getUserSubscription
} from "@/features/admin/users/UserManagementSlice";




function CreateUser({ isOpen, setIsOpen }) {
  const {
    fullname,
    email,
    password,
    confirmPassword,
    role,
    status,
    subscription,
    errors,
    showPassword,
    showConfirmPassword,
    isLoading
  } = useSelector(state => state.userManagement)
  const dispatch = useDispatch()

  function validate() {
    const data = getZodErrors(addNewUserSchema, {
      fullname,
      email,
      password,
      confirmPassword,
    })
    dispatch({ type: "userManagement/setFormErrors", payload: data })

    return Object.values(data).every(errors => errors.length === 0);
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!validate()) return

    const result = await dispatch(checkNewUser({
      fullname: fullname.trim(),
      email: email.trim(),
      password
    }))

    const isAdminSubscription = subscription === "premium" ?
      {
        plan: "premium",
      }
      :
      {
        plan: "free",
        watchlist: 15,
        favorites: 15
      }

    const confirmedUser = {
      fullname: fullname,
      email: email,
      password: password,
      role: role,
      status: status,
      subscription: isAdminSubscription
    }

    if (checkNewUser.fulfilled.match(result)) {
      await dispatch(addNewUser(confirmedUser))


      setIsOpen(false)
      window.location.reload()
    }
    await dispatch({ type: "userManagement/clearInputs" })
  }

  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm dark:bg-black/70" >
      <form
        onSubmit={handleSubmit}
        className="
      flex max-h-[90vh] w-full max-w-7xl flex-col overflow-hidden
      rounded-xl border border-slate-200 bg-white shadow-2xl
      sm:w-[80%]
      dark:border-[#28476d] dark:bg-[#081525]
    "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-[#1c3452]">
          <div className="flex items-center gap-4">
            <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-linear-to-br from-[#4035c8] to-[#6c3cec] text-white">
              <UserPlus size={27} strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-[18px] font-semibold text-slate-900 dark:text-white">
                Create New User
              </h2>

              <p className="mt-1 text-[13px] text-slate-500 dark:text-[#8ea0bb]">
                Add a new user to your platform
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-slate-500 transition hover:text-slate-900 dark:text-[#9aabc2] dark:hover:text-white"
          >
            <X size={23} strokeWidth={1.6} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-7">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Profile Information */}
            <section className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-6 dark:border-[#1d3859] dark:bg-[#0b192b]">
              <div className="mb-6">
                <h3 className="text-[17px] font-semibold text-slate-900 dark:text-white">
                  Profile Information
                </h3>

                <p className="mt-1 text-[12px] text-slate-500 dark:text-[#8195b0]">
                  Basic information about the user
                </p>
              </div>

              <div className="flex flex-col gap-5 sm:flex-row">
                {/* Avatar */}
                <div className="flex shrink-0 flex-col items-center">
                  <button
                    type="button"
                    onClick={() =>
                      toast.success("This feature will be available soon!")
                    }
                    className="
                  flex h-30 w-30 cursor-pointer flex-col items-center
                  justify-center rounded-full border border-dashed
                  border-slate-300 bg-white text-slate-500 transition
                  hover:border-violet-400 hover:text-violet-600
                  dark:border-[#7184a0] dark:bg-[#101f34]
                  dark:text-[#8294af] dark:hover:border-[#857adc]
                  dark:hover:text-white
                "
                  >
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-[#182943]">
                      <Camera size={20} />
                    </div>

                    <span className="text-[10px]">Upload Photo</span>
                  </button>
                </div>

                {/* Fields */}
                <div className="min-w-0 flex-1 space-y-5">
                  <InputField
                    label="Full Name"
                    icon={User}
                    value={fullname}
                    onChange={(e) => dispatch(getFullName(e.target.value))}
                    error={errors?.fullname[0]}
                    placeholder="Enter full name"
                  />

                  <InputField
                    label="Email Address"
                    icon={Mail}
                    value={email}
                    onChange={(e) => dispatch(getEmail(e.target.value))}
                    error={errors?.email[0]}
                    placeholder="Enter email address"
                    type="email"
                  />

                  <PasswordField
                    label="Password"
                    value={password}
                    onChange={(e) => dispatch(getPassword(e.target.value))}
                    error={errors?.password[0]}
                    placeholder="Enter password"
                    onClick={() => dispatch(toggleShowPassword())}
                    showPassword={showPassword}
                  />

                  <PasswordField
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) =>
                      dispatch(getConfirmPassword(e.target.value))
                    }
                    error={errors?.confirmPassword[0]}
                    placeholder="Confirm password"
                    onClick={() => dispatch(toggleShowConfirmPassword())}
                    showPassword={showConfirmPassword}
                  />
                </div>
              </div>
            </section>

            {/* Account Settings */}
            <section className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-6 dark:border-[#1d3859] dark:bg-[#0b192b]">
              <div className="mb-6">
                <h3 className="text-[17px] font-semibold text-slate-900 dark:text-white">
                  Account Settings
                </h3>

                <p className="mt-1 text-[12px] text-slate-500 dark:text-[#8195b0]">
                  Set user role, status and subscription
                </p>
              </div>

              <div className="space-y-5">
                <SelectField
                  label="User Role"
                  value={role}
                  onChange={(e) => dispatch(getUserRole(e.target.value))}
                  icon={ShieldCheck}
                  options={["User", "Admin"]}
                />

                <SelectField
                  label="Account Status"
                  value={status}
                  onChange={(e) => dispatch(getUserStatus(e.target.value))}
                  icon={Circle}
                  options={["Active", "Inactive"]}
                />

                <SelectField
                  label="Subscription Plan"
                  value={subscription}
                  onChange={(e) =>
                    dispatch(getUserSubscription(e.target.value))
                  }
                  icon={Crown}
                  options={["Premium", "Free"]}
                />
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-end sm:gap-4 sm:px-7 sm:py-5 dark:border-[#1c3452]">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="
          h-12 cursor-pointer rounded-lg border border-slate-300
          bg-white px-7 text-sm font-semibold text-slate-700
          transition hover:bg-slate-100
          dark:border-[#355376] dark:bg-transparent
          dark:text-[#d1dbea] dark:hover:bg-[#13243a]
        "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="
          flex h-12 cursor-pointer items-center justify-center gap-2
          rounded-lg bg-linear-to-r from-[#633cff] to-[#7147ff]
          px-7 text-sm font-semibold text-white shadow-lg
          shadow-[#633cff]/20 transition
          hover:from-[#7147ff] hover:to-[#805aff]
          disabled:cursor-not-allowed disabled:opacity-60
        "
          >
            {isLoading ? (
              <>
                <Loader2 size={19} className="animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <UserPlus size={19} />
                Create User
              </>
            )}
          </button>
        </div>
      </form>
    </div >
  );
}



export default CreateUser;