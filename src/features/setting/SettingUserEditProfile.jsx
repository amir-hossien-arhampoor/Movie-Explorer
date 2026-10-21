import { Camera, UserRound, Mail, Globe, Pencil, Save, X, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getZodErrors, profileEditSchema } from "../../utils/validators";
import { useEffect } from "react";
import { getUserInfo, updateUserInfo } from "../userProfile/EditProfileSlice";
import toast from "react-hot-toast";

function SettingUserEditProfile({setIsEditOpen}) {
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
    console.log("g")
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
    <section className="w-full rounded-xl border border-[#edf3f8] dark:border-[#123052] bg-white dark:bg-[#03111f] p-2 sm:p-6 mt-5 ">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3 border-b border-neutral-800 pb-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-[#4725b8] to-[#7c4dff] shadow-lg shadow-purple-900/20">
          <Pencil size={20} className="text-[#d8c5ff]" />
        </div>
        <div>
          <h2 className="text-[14px] font-semibold">
            Edit Profile
          </h2>

          <p className="text-[11px] text-neutral-400">
            Update your personal information and preferences.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[170px_1fr]">

        {/* Avatar */}
        <div className="flex flex-col items-center justify-start">
          <div className="relative cursor-pointer">
            <img
              src={currentUser?.profileImg || "../../../public/Default_pfp.svg.webp"}
              className="size-16 rounded-full object-cover cursor-pointer"
            />
            <input
              type="file"
              accept="image/*"
              // onChange={handleImageChange}
              className="w-9 h-9 rounded-[100%] opacity-0 z-100 absolute bottom-0 right-0 cursor-pointer"
            />
            <button
              type="button"
              className="
                absolute -bottom-1 right-0
                flex size-6 items-center justify-center
                rounded-full
                border border-neutral-700
                bg-neutral-900
                text-white
                transition
                hover:bg-neutral-800
                cursor-pointer
              "
            >
              <Camera className="size-4 " />
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-2 md:grid-cols-2"
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullname"
              className="mb-1 flex items-center gap-1 text-sm"
            >
              <UserRound className="size-4" />
              <p className="text-[12px]">Full Name</p>
            </label>

            <input
              id="fullname"
              type="text"
              value={fullname}
              onChange={(e) => dispatch({ type: "editProfile/getFullname", payload: e.target.value })}
              className={`
                h-8 w-full rounded-lg border dark:border-[#1a416b]! border-[#c7c9ca]! bg-white dark:bg-[#061a30] pl-3.5 pr-4 text-[12px] dark:text-white outline-none placeholder:text-[#7791b3] transition focus:border-[#7445ff] focus:ring-1 focus:ring-[#7445ff]
                 
                ${!errors.fullname ? "border-green-600" : "border-red-600!"}
              `}
            />
            {errors.fullname && <p className="text-red-500 text-[12px]">{errors.fullname}</p>}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 flex items-center gap-1 text-sm"
            >
              <Mail className="size-4" />
              <p className="text-[12px]">Email</p>
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => dispatch({ type: "editProfile/getEmail", payload: e.target.value })}
              className={`
                h-8 w-full rounded-lg border dark:border-[#1a416b]! border-[#c7c9ca]! bg-white dark:bg-[#061a30] pl-3.5 pr-4 text-[12px] dark:text-white outline-none placeholder:text-[#7791b3] transition focus:border-[#7445ff] focus:ring-1 focus:ring-[#7445ff]
                ${!errors.email ? "border-green-600" : "border-red-600!"}
              `}
            />
            {errors.email && <p className="text-red-500 text-[12px]">{errors.email[0]}</p>}
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label
              htmlFor="bio"
              className="mb-1 flex items-center gap-1 text-sm"
            >
              <Pencil className="size-4" />
             <p className="text-[12px]">Bio</p>
            </label>

            <textarea
              id="bio"
              rows="3"
              maxLength="200"
              value={bio}
              onChange={(e) => dispatch({ type: "editProfile/getBio", payload: e.target.value })}
              className={`
                 w-full rounded-lg border dark:border-[#1a416b]! border-[#c7c9ca]! bg-white dark:bg-[#061a30] pl-3.5 pr-4 text-[12px] dark:text-white outline-none placeholder:text-[#7791b3] transition focus:border-[#7445ff] focus:ring-1 focus:ring-[#7445ff]
                ${!errors.bio ? "border-green-600" : "border-red-600!"}
              `}
            />
            {errors.bio && <p className="text-red-500 text-[12px]">{errors.bio[0]}</p>}
          </div>

          {/* Language */}
          <div>
            <label
              htmlFor="language"
              className="mb-1 flex items-center gap-1 text-sm"
            >
              <Globe className="size-4" />
              <p className="text-[12px]">Language</p>
            </label>

            <select
              id="language"
              value={language}
              onChange={(e) => dispatch({ type: "editProfile/getLanguage", payload: e.target.value })}
              className="
                h-8 w-full rounded-lg border dark:border-[#1a416b]! border-[#c7c9ca]! bg-white dark:bg-[#061a30] pl-3.5 pr-11 text-[12px] dark:text-white outline-none placeholder:text-[#7791b3] transition focus:border-[#7445ff] focus:ring-1 focus:ring-[#7445ff]
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
          <div className="flex justify-end mt-2 gap-2 md:col-span-2">
            <button
              type="button"
              className="
                flex items-center gap-2
                rounded-lg
                border dark:border-[#1a416b]!
                dark:bg-[#061a30]
                border-[#c7c9ca]!
                px-2 py-1
                text-[12px]
                transition
                cursor-pointer
              "
              onClick={() => setIsEditOpen(false)}
            >
              <X className="size-4" />
              Cancel
            </button>

            <button
              type="submit"
              className="
                flex h-8 px-5 items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#6030e8] to-[#7040ed] text-[12px] font-medium text-white shadow-lg shadow-purple-900/20 transition hover:from-[#7040ed] hover:to-[#8050ff] active:scale-[0.99] cursor-pointer
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

export default SettingUserEditProfile;