import { Camera, UserRound, Mail, Globe, Pencil, Save, Loader2, AlertCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getZodErrors, profileEditSchema } from "../../utils/validators";
import { useEffect } from "react";
import { getUserInfo, updateUserInfo } from "./EditProfileSlice";
import toast from "react-hot-toast";
import { addActionToActivities } from "@/features/admin/dashboard/SiteActivitySlice";
import { addNewNotification } from "@/features/userProfile/user-notification/NotificationSlice";

function UserEditProfile({ scrollToTop, allowChangeEmail, allowProfile }) {
  const { currentUser } = useSelector(state => state.auth)
  const {
    fullname,
    email,
    bio,
    language,
    // imageUrl,
    errors,
    isLoading
  } = useSelector(state => state.editProfile)
  const dispatch = useDispatch()

  function validate() {
    const data = getZodErrors(profileEditSchema, {
      fullname: fullname.trim(),
      email: email.trim(),
      bio,
    })
    dispatch({ type: "editProfile/setErrors", payload: data })

    return Object.values(data).every(errors => errors.length === 0);
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!validate()) return

    const userInputs = {
      fullname,
      email,
      bio,
      language,
      // imageUrl
    }
    const result = await dispatch(updateUserInfo({ id: currentUser?.id, newData: userInputs }))
    if (updateUserInfo.fulfilled.match(result)) {
      const newNotification = {
        type: "account",
        title: "Account Updated",
        description: "Your account information has been updated successfully.",
        userId: currentUser.userId,
      };
      await dispatch(addNewNotification({ newNotification }));

      await dispatch(addActionToActivities({ email: email, type: "update-user" }))

      scrollToTop()
      toast.success("Profile updated successfully.")
    }
  }

  //   function handleImageChange(e) {
  //   const file = e.target.files[0];

  //   if (!file) return;

  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     dispatch({
  //       type: "editProfile/getImage",
  //       payload: reader.result
  //     });
  //   };

  //   reader.readAsDataURL(file);
  // }

  useEffect(() => {
    async function getUserDetails() {
      await dispatch(getUserInfo(currentUser?.id))
    }
    getUserDetails()
  }, [currentUser?.id, dispatch])

  return (
    <section className="w-full rounded-xl border border-[#edf3f8] dark:border-[#123052] bg-white dark:bg-[#03111f] p-5 sm:p-6 mt-10 mb-10">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3 border-b border-neutral-800 pb-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-[#4725b8] to-[#7c4dff] shadow-lg shadow-purple-900/20">
          <Pencil size={25} className="text-[#d8c5ff]" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            Edit Profile
          </h2>

          <p className="text-[12px] text-neutral-400">
            Update your personal information and preferences.
          </p>

          {!allowChangeEmail && <p className="text-[11px] text-red-600 flex items-center gap-1 mt-1">
            <AlertCircle size={13} />
            Changing email is disabled by admin!
          </p>}

        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[170px_1fr]">

        {/* Avatar */}
        <div className="flex flex-col items-center justify-start">
          <div
            className="relative cursor-pointer"
            onClick={() => {
              if (!allowProfile) {
                toast.error("Changing profile is disabled by admin!")
                return
              }
            }}
          >
            <img
              src={currentUser?.profileImg || "../../../public/Default_pfp.svg.webp"}
              className="size-32 rounded-full object-cover cursor-pointer"
            />
            <input
              disabled={!allowProfile}
              type="file"
              accept="image/*"
              // onChange={handleImageChange}
              className="w-9 h-9 rounded-[100%] opacity-0 z-100 absolute bottom-0 right-0 cursor-pointer"
            />
            <button
              type="button"
              className="
                absolute bottom-0 right-0
                flex size-9 items-center justify-center
                rounded-full
                border border-neutral-700
                bg-neutral-900
                text-white
                transition
                hover:bg-neutral-800
                cursor-pointer
              "
            >
              <Camera className="size-5 " />
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullname"
              className="mb-2 flex items-center gap-2 text-sm"
            >
              <UserRound className="size-4" />
              Full Name
            </label>

            <input
              id="fullname"
              type="text"
              value={fullname}
              onChange={(e) => dispatch({ type: "editProfile/getFullname", payload: e.target.value })}
              className={`
                h-10 w-full rounded-lg border dark:border-[#1a416b]! border-[#c7c9ca]! bg-white dark:bg-[#061a30] pl-3.5 pr-4 text-sm dark:text-white outline-none placeholder:text-[#7791b3] transition focus:border-[#7445ff] focus:ring-1 focus:ring-[#7445ff]
                 
                ${!errors.fullname ? "border-green-600" : "border-red-600!"}
              `}
            />
            {errors.fullname && <p className="text-red-500 text-[12px]">{errors.fullname}</p>}
          </div>

          {/* Email */}
          {allowChangeEmail && <div>
            <label
              htmlFor="email"
              className="mb-2 flex items-center gap-2 text-sm"
            >
              <Mail className="size-4" />
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => dispatch({ type: "editProfile/getEmail", payload: e.target.value })}
              className={`
                h-10 w-full rounded-lg border dark:border-[#1a416b]! border-[#c7c9ca]! bg-white dark:bg-[#061a30] pl-3.5 pr-4 text-sm dark:text-white outline-none placeholder:text-[#7791b3] transition focus:border-[#7445ff] focus:ring-1 focus:ring-[#7445ff]
                ${!errors.email ? "border-green-600" : "border-red-600!"}
              `}
            />
            {errors.email && <p className="text-red-500 text-[12px]">{errors.email}</p>}
          </div>}

          {/* Bio */}
          <div className="md:col-span-2">
            <label
              htmlFor="bio"
              className="mb-2 flex items-center gap-2 text-sm"
            >
              <Pencil className="size-4" />
              Bio
            </label>

            <textarea
              id="bio"
              rows="3"
              maxLength="200"
              value={bio}
              onChange={(e) => dispatch({ type: "editProfile/getBio", payload: e.target.value })}
              className={`
                 w-full rounded-lg border dark:border-[#1a416b]! border-[#c7c9ca]! bg-white dark:bg-[#061a30] pl-3.5 pr-4 text-sm dark:text-white outline-none placeholder:text-[#7791b3] transition focus:border-[#7445ff] focus:ring-1 focus:ring-[#7445ff]
                ${!errors.bio ? "border-green-600" : "border-red-600!"}
              `}
            />
            {errors.bio && <p className="text-red-500 text-[12px]">{errors.bio}</p>}
          </div>

          {/* Language */}
          <div>
            <label
              htmlFor="language"
              className="mb-2 flex items-center gap-2 text-sm"
            >
              <Globe className="size-4" />
              Language
            </label>

            <select
              id="language"
              value={language}
              onChange={(e) => dispatch({ type: "editProfile/getLanguage", payload: e.target.value })}
              className="
                h-10 w-full rounded-lg border dark:border-[#1a416b]! border-[#c7c9ca]! bg-white dark:bg-[#061a30] pl-3.5 pr-11 text-sm dark:text-white outline-none placeholder:text-[#7791b3] transition focus:border-[#7445ff] focus:ring-1 focus:ring-[#7445ff]
              "
            >
              <option value="english">English</option>
              <option value="persian">Persian</option>
              <option value="azerbaijani">Azerbaijani</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
            </select>
          </div>


          {/* Buttons */}
          <div className="flex justify-end gap-3 md:col-span-2">

            <button
              type="submit"
              className="
                flex h-10 px-7 items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#6030e8] to-[#7040ed] text-sm font-medium text-white shadow-lg shadow-purple-900/20 transition hover:from-[#7040ed] hover:to-[#8050ff] active:scale-[0.99] cursor-pointer
              "
            >
              {isLoading && <Loader2 size={18} className="animate-spin" />}
              {isLoading ? "Saving" : <><Save className="size-4" />Save Changes</>}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default UserEditProfile;