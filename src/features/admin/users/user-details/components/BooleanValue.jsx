import { Check, X } from "lucide-react";

function BooleanValue({ value }) {
  if (value) {
    return (
      <span className="flex items-center gap-2 text-emerald-700 dark:text-[#35d99c]">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-[#083d32]">
          <Check size={12} />
        </span>
        Yes
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2 text-rose-700 dark:text-[#ff667d]">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 dark:bg-[#411c27]">
        <X size={12} />
      </span>
      No
    </span>
  );
}

export default BooleanValue;