import ConfirmActionModal from "@/components/ConfirmActionModal";
import ActionMenu from "@/features/admin/users/components/ActionMenu"
import { removeUser } from "@/features/admin/users/UserManagementSlice";
import { MoreHorizontal } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function UserItem({ user }) {
  const [openActionMenu, setOpenActionMenu] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const dispatch = useDispatch()
  const actionMenuRef = useRef(null);


  async function handleRemove() {
    setIsDeleting(true)

    const res = await dispatch(removeUser({ user: user }))

    if (removeUser.fulfilled.match(res)) {
      toast.success(`User ${user.fullname} removed successfully!`)
      setIsDeleting(false)
      setIsConfirmOpen(false)
      setOpenActionMenu(false)
    }
  }

  useEffect(() => {
    function handleOutsideClick(event) {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)
      ) {
        setOpenActionMenu(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <div
      key={user.id}
      className="
    relative flex items-center justify-between border-b
    border-slate-200 transition hover:bg-slate-50
    dark:border-[#10243d] dark:hover:bg-[#0b1c30]
  "
      ref={actionMenuRef}
    >
      {/* User */}
      <div className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <img
            src={user.profileImg || "./public/Default_pfp.svg.webp"}
            alt={user.fullname}
            className="h-9 w-9 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Name / Email */}
      <div className="mr-8 w-40 py-3.5">
        <p className="text-[12px] font-medium text-slate-800 dark:text-[#e1e8f2]">
          {user.fullname}
        </p>

        <span className="text-[11px] text-slate-500 dark:text-[#91a2b9]">
          {user.email}
        </span>
      </div>

      {/* Role */}
      <div className="w-10 py-3.5">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-[10px] font-medium ${user.role === "admin"
              ? "bg-amber-100 text-amber-700 dark:bg-[#735b17]/40 dark:text-[#e7ba45]"
              : user.role === "Moderator"
                ? "bg-sky-100 text-sky-700 dark:bg-[#075c91]/40 dark:text-[#51b8ff]"
                : "bg-violet-100 text-violet-700 dark:bg-[#3027a1]/40 dark:text-[#938aff]"
            }`}
        >
          {user.role}
        </span>
      </div>

      {/* Plan */}
      <div className="w-20 px-5 py-3.5">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-[10px] font-medium ${user?.subscription.plan === "premium"
              ? "bg-amber-100 text-amber-700 dark:bg-[#a3812571] dark:text-[#ffc98b]"
              : "bg-slate-100 text-slate-600 dark:bg-[#19304d] dark:text-[#9aacbf]"
            }`}
        >
          {user?.subscription.plan}
        </span>
      </div>

      {/* Status */}
      <div className="w-20 px-5 py-3.5">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-[10px] font-medium ${user.status === "active"
              ? "bg-emerald-100 text-emerald-700 dark:bg-[#075e50]/50 dark:text-[#42dcb0]"
              : "bg-rose-100 text-rose-700 dark:bg-[#652441]/50 dark:text-[#ed6b8c]"
            }`}
        >
          {user.status}
        </span>
      </div>

      {/* Joined */}
      <div className="w-20 px-5 py-3.5">
        <span className="text-[11px] text-slate-500 dark:text-[#899bb2]">
          {user.joined}
        </span>
      </div>

      {/* Actions */}
      <div className="px-5 py-3.5">
        <div className="flex justify-end">
          <button
            onClick={() => setOpenActionMenu(true)}
            className="
          flex h-8 w-8 cursor-pointer items-center justify-center
          rounded-[6px] text-slate-500 transition
          hover:bg-slate-100 hover:text-slate-900
          dark:text-[#71839b] dark:hover:bg-[#142b47]
          dark:hover:text-white
        "
          >
            <MoreHorizontal size={17} />
          </button>
        </div>
      </div>

      {/* Action Menu */}
      {openActionMenu && (
        <ActionMenu
          userId={user.id}
          setIsConfirmOpen={setIsConfirmOpen}
        />
      )}

      {/* Action Confirmation */}
      <ConfirmActionModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleRemove}
        isLoading={isDeleting}
        title="Remove this account?"
        message="This action will remove the account permanently."
        btnText={["remove", "removing..."]}
      />
    </div>
  )
}

export default UserItem