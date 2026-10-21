import { Calendar, MapPin, UserRound, } from "lucide-react";
import InfoItem from "./InfoItem";
import UserDetailsActions from "@/features/admin/users/user-details/components/UserDetailsActions";

function UserDetailsHeader({ user, setOpenEdit, setIsConfirmOpen }) {
  const isActive = user?.status === "active";

  const initials = user?.fullname
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="rounded-[12px] border border-slate-200 bg-white p-7 transition-colors dark:border-[#112a46] dark:bg-[#08121e]">
  <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex flex-col gap-5 sm:flex-row">
      {/* Avatar */}
      <div className="relative h-28 w-28 shrink-0">
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-[#857adc] to-[#5112ff] text-3xl font-semibold text-white">
          {user?.profileImage ? (
            <img
              src={user.profileImg}
              alt={user.fullname}
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        {isActive && (
          <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-[3px] border-white bg-green-500 dark:border-[#08121e] dark:bg-[#22c55e]" />
        )}
      </div>

      {/* User Info */}
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            {user?.fullname}
          </h1>

          {user?.subscription?.plan === "premium" && (
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-[#252467] dark:text-[#a99fff]">
              Premium User
            </span>
          )}
        </div>

        <p className="mb-5 text-sm text-slate-500 dark:text-[#8c9bb0]">
          {user?.email}
        </p>

        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <InfoItem
            icon={Calendar}
            label="Joined"
            value={user?.joined}
          />

          <InfoItem
            icon={MapPin}
            label="Location"
            value={user?.location}
          />

          <InfoItem
            icon={UserRound}
            label="User ID"
            value={user?.userId}
          />
        </div>
      </div>
    </div>

    {/* Status */}
    <div className="self-start xl:self-center">
      <span
        className={`inline-flex rounded-full px-4 py-2 text-xs font-medium ${
          isActive
            ? "bg-green-100 text-green-700 dark:bg-[#063b2c] dark:text-[#32e6a1]"
            : "bg-red-100 text-red-700 dark:bg-[#3b1720] dark:text-[#ff6b81]"
        }`}
      >
        {isActive ? "Active" : "Inactive"}
      </span>
    </div>
  </div>

  <UserDetailsActions
    user={user}
    setOpenEdit={setOpenEdit}
    setIsConfirmOpen={setIsConfirmOpen}
  />
</section>
  );
}

export default UserDetailsHeader;