import { AlertTriangle, X } from "lucide-react";

function ConfirmActionModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading = false,
  btnText = ["delete", "deleting..."]
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-9999 flex min-h-screen w-screen items-center justify-center overflow-y-auto bg-black/70 px-4 py-6 backdrop-blur-[5px]"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-140 rounded-[18px] border border-slate-200 bg-white px-5 py-7 shadow-2xl transition-colors duration-300 sm:px-8 sm:py-9 dark:border-[#112a46] dark:bg-[#061426]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 sm:right-5 sm:top-5 dark:text-[#718096] dark:hover:bg-[#0e1c2e] dark:hover:text-white"
        >
          <X size={22} />
        </button>

        {/* Warning icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/30 bg-red-50 sm:mb-6 sm:h-20 sm:w-20 dark:border-red-500/50 dark:bg-red-500/10">
          <AlertTriangle
            size={38}
            strokeWidth={1.8}
            className="text-red-500 dark:text-red-400"
          />
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-[26px] dark:text-white">
            {title}
          </h2>

          <p className="mx-auto mt-3 max-w-107.5 text-sm leading-6 text-slate-500 sm:text-[15px] dark:text-[#808797]">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-7 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="h-11 cursor-pointer rounded-[10px] border border-slate-200 bg-transparent text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:text-[15px] dark:border-[#29415f] dark:text-[#aebbd0] dark:hover:border-[#3b5575] dark:hover:bg-[#0a1828] dark:hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="h-11 cursor-pointer rounded-[10px] bg-red-500 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60 sm:h-12 sm:text-[15px]"
          >
            {isLoading ? btnText[1] : btnText[0]}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmActionModal;