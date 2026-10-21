import { Camera, Image, Save, Shield, SlidersHorizontal, Trash2, Upload, UserPen, UserRound, X, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionCard from "@/features/admin/users/user-details/components/SectionCard";
import InputField from "@/features/admin/users/user-details/components/InputField";
import SelectField from "@/features/admin/users/user-details/components/SelectField";
import ToggleWithText from "@/features/admin/users/user-details/components/ToggleWithText";
import {
  getUserInfo,
  updateUserInfo,
  getFullname,
  getEmail,
  getDateOfBirth,
  getLocation,
  getBio,
  getRole,
  getSubscription,
  getStatus,
  getPreferredLanguage,
  getAddToWatchlistNotification,
  getAddToFavoritesNotification,
  getNewMovieNotification,
  getImage,
  resetEditUser,
  setErrors
} from "./UserEditDetailsSlice";
import toast from "react-hot-toast";
import { editUserInformation, getZodErrors } from "@/utils/validators";
import { addNewNotification } from "@/features/userProfile/user-notification/NotificationSlice";


function UserEditDetails({ user, onClose, onSave }) {
  const dispatch = useDispatch();
  const {
    fullname,
    email,
    dateOfBirth,
    location,
    bio,
    role,
    subscription,
    status,
    preferredLanguage,
    addToWatchlistNotification,
    addToFavoritesNotification,
    NewMovieNotification,
    profileImage,
    errors,
    isLoading,
    isSaving,
  } = useSelector(state => state.userEditDetails);

  useEffect(() => {
    if (!user?.id) return;

    dispatch(getUserInfo(user.id));
  }, [user?.id, dispatch]);

  useEffect(() => {
    return () => dispatch(resetEditUser());
  }, [dispatch]);

  // function handleImageChange(e) {

  //   const file = e.target.files?.[0];

  //   if (!file) return;

  //   // 2MB limit
  //   if (file.size > 2 * 1024 * 1024) {
  //     toast.error("Image must be smaller than 2MB.");
  //     return;
  //   }

  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     dispatch(getImage(reader.result));
  //   };

  //   reader.readAsDataURL(file);
  // }


  function handleRemovePhoto() {
    dispatch(getImage(""));
  }

  function validate() {
    const data = getZodErrors(editUserInformation, {
      fullname: fullname.trim(),
      email: email.trim(),

    })
    dispatch(setErrors(data))

    return Object.values(data).every(errors => errors.length === 0);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return
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

    const newData = {
      fullname,
      email,
      dateOfBirth,
      location,
      bio,
      role,
      subscription: isAdminSubscription,
      status,
      preferredLanguage,
      addToWatchlistNotification,
      addToFavoritesNotification,
      NewMovieNotification,
      profileImage,
    };

    const result = await dispatch(updateUserInfo({ id: user?.id, newData, }))

    if (updateUserInfo.fulfilled.match(result)) {
      if (user?.subscription?.plan !== newData.subscription.plan &&
        newData.subscription.plan === "premium") {
        const newNotification = {
          type: "subscription",
          title: "Subscription Upgraded",
          description: "Your subscription has been upgraded successfully. Enjoy your premium benefits!",
          userId: user?.userId,
        };

        await dispatch(addNewNotification({ newNotification }));
      }
      toast.success("User updated successfully.");
      onSave?.(result.payload)
      onClose?.();
    }

  }

  const initials = fullname
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();


  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <Loader2 size={30} className="animate-spin text-[#857adc]" />
      </div>
    );

  }


  return (
    <div className="w-full text-slate-700 dark:text-[#dce6f5]">
      <form onSubmit={handleSubmit}>
        {/* HEADER */}
        <section className="rounded-[10px] border border-slate-200 bg-white p-5 dark:border-[#112a46] dark:bg-[#081827]">
          <div className="flex items-center gap-3">
            <UserPen
              size={30}
              className="text-violet-600 dark:text-[#9187f2]"
            />

            <div>
              <h2 className="text-[24px] font-semibold text-slate-900 dark:text-white">
                Edit User
              </h2>
              <p className="text-[12px] text-slate-500 dark:text-[#7f91a7]">
                Update user information and account settings
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_480px]">
          {/* LEFT COLUMN */}
          <div className="space-y-5">
            {/* PERSONAL INFORMATION */}
            <SectionCard icon={UserRound} title="Personal Information">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <InputField
                  label="Full Name"
                  name="fullname"
                  value={fullname}
                  onChange={(e) => dispatch(getFullname(e.target.value))}
                  error={errors.fullname}
                />

                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => dispatch(getEmail(e.target.value))}
                  error={errors.email}
                />

                <InputField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => dispatch(getDateOfBirth(e.target.value))}
                />

                <InputField
                  label="Location"
                  name="location"
                  value={location}
                  onChange={(e) => dispatch(getLocation(e.target.value))}
                />

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm text-slate-600 dark:text-[#9aabc1]">
                    Bio
                  </label>

                  <textarea
                    name="bio"
                    value={bio}
                    onChange={(e) => dispatch(getBio(e.target.value))}
                    maxLength={500}
                    rows={4}
                    className="w-full resize-none rounded-[8px] border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-[#1b3b5e] dark:bg-[#071a2c] dark:text-white dark:placeholder:text-[#54677e] dark:focus:border-[#857adc] dark:focus:ring-[#857adc]"
                  />

                  <div className="mt-1 text-right text-[11px] text-slate-500 dark:text-[#667b94]">
                    {bio.length}/500
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* ACCOUNT DETAILS */}
            <SectionCard icon={Shield} title="Account Details">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <SelectField
                  label="User Role"
                  name="role"
                  value={role}
                  onChange={(e) => dispatch(getRole(e.target.value))}
                  options={["User", "Admin"]}
                />

                <SelectField
                  label="Subscription Plan"
                  name="subscription"
                  value={subscription}
                  onChange={(e) => dispatch(getSubscription(e.target.value))}
                  options={["Free", "Premium"]}
                />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <ToggleWithText
                  label="Account Status"
                  enabled={status}
                  onClick={() => dispatch(getStatus(!status))}
                />
              </div>
            </SectionCard>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-5">
            {/* PROFILE IMAGE */}
            <SectionCard icon={Image} title="Profile Picture">
              <div className="flex flex-col items-center gap-5 sm:flex-row">
                <div className="relative shrink-0">
                  <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-violet-500 to-violet-800 text-3xl font-semibold text-white dark:from-[#857adc] dark:to-[#5112ff]">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt={fullname}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>

                  <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-violet-600 text-white dark:border-[#061426] dark:bg-[#857adc]">
                    <Camera size={15} />
                  </div>
                </div>

                <div className="flex w-full flex-col gap-3">
                  <label className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-violet-300 px-4 text-sm font-medium text-violet-700 transition hover:bg-violet-50 dark:border-[#6c3cec] dark:text-[#baa4f5] dark:hover:bg-[#241750]">
                    <Upload size={16} />
                    Change Photo

                    <input
                      // type="file"
                      accept="image/png,image/jpeg"
                      onClick={() =>
                        toast.success("this feature will be available soon")
                      }
                      // onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="flex h-10 items-center justify-center gap-2 rounded-[8px] border border-slate-300 px-4 text-sm text-slate-600 transition hover:border-rose-400 hover:text-rose-600 dark:border-[#294563] dark:text-[#b7c9df] dark:hover:border-[#d73551] dark:hover:text-[#ff667d]"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>

                  <p className="text-[11px] text-slate-500 dark:text-[#667b94]">
                    JPG or PNG. Maximum file size: 2MB
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* PREFERENCES */}
            <SectionCard icon={SlidersHorizontal} title="Preferences">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <SelectField
                  label="Preferred Language"
                  name="preferredLanguage"
                  value={preferredLanguage}
                  onChange={(e) =>
                    dispatch(getPreferredLanguage(e.target.value))
                  }
                  options={["English", "Azerbaijani", "Russian", "Turkish"]}
                />

                <div className="space-y-5 md:pt-7">
                  <ToggleWithText
                    label="Add to watchlist notification"
                    enabled={addToWatchlistNotification}
                    onClick={() =>
                      dispatch(
                        getAddToWatchlistNotification(
                          !addToWatchlistNotification
                        )
                      )
                    }
                    activeText="Enabled"
                    inactiveText="Disabled"
                  />

                  <ToggleWithText
                    label="Add to favorites notification"
                    enabled={addToFavoritesNotification}
                    onClick={() =>
                      dispatch(
                        getAddToFavoritesNotification(
                          !addToFavoritesNotification
                        )
                      )
                    }
                    activeText="Enabled"
                    inactiveText="Disabled"
                  />

                  <ToggleWithText
                    label="New movie notification"
                    enabled={NewMovieNotification}
                    onClick={() =>
                      dispatch(getNewMovieNotification(!NewMovieNotification))
                    }
                    activeText="Enabled"
                    inactiveText="Disabled"
                  />
                </div>
              </div>
            </SectionCard>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-5 flex w-full gap-3 border-t border-slate-200 p-5 justify-end dark:border-[#112a46]">
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 px-6 text-sm font-medium text-slate-600 transition hover:border-violet-400 hover:text-violet-700 dark:border-[#294563] dark:text-[#b7c9df] dark:hover:border-[#857adc] dark:hover:text-white cursor-pointer"
          >
            <X size={17} />
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="flex h-11 items-center justify-center gap-2 rounded-[8px] border border-violet-600 bg-violet-600 px-7 text-sm font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#6c3cec] dark:bg-[#6c3cec] dark:hover:bg-[#5112ff] cursor-pointer"
          >
            {isSaving ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={17} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserEditDetails;