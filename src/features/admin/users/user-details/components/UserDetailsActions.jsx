import { Ban, Edit } from "lucide-react";

function UserDetailsActions({ user, setOpenEdit, setIsConfirmOpen }) {
  const isActive = user?.status === "active";

  return (
    <div className="relative mt-7 flex flex-wrap gap-3 border-t border-slate-200 pt-6 dark:border-[#112a46]">
      <ActionButton
        icon={Edit}
        variant="primary"
        onClick={() => setOpenEdit(true)}
      >
        Edit User
      </ActionButton>

      <ActionButton
        icon={Ban}
        variant="danger"
        disabled={!isActive}
        onClick={() => setIsConfirmOpen(true)}
      >
        Deactivate
      </ActionButton>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  children,
  variant = "default",
  disabled = false,
  onClick,
}) {
  const styles = {
    default:
      "border-slate-300 bg-transparent text-slate-700 hover:border-violet-500 hover:text-slate-900 dark:border-[#294563] dark:text-[#b7c9df] dark:hover:border-[#857adc] dark:hover:text-white",

    primary:
      "border-violet-600 bg-violet-600 text-white hover:bg-violet-700 dark:border-[#6c3cec] dark:bg-[#6c3cec] dark:hover:bg-[#5112ff]",

    danger:
      "border-red-300 bg-transparent text-red-600 hover:bg-red-50 dark:border-[#d73551] dark:text-[#ff657c] dark:hover:bg-[#401722]",
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex h-11 cursor-pointer items-center gap-2 rounded-[8px] border px-3 text-[13px] font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${styles[variant]}`}
    >
      <Icon size={17} />
      {children}
    </button>
  );
}

export default UserDetailsActions;