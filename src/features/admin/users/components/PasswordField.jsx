import { Eye, EyeOff, Lock } from "lucide-react";

export default function PasswordField({
  label,
  required,
  placeholder,
  value,
  onChange,
  error,
  onClick,
  showPassword
}) {
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium text-slate-700 dark:text-[#b7c6da]">
        {label}

        {required && (
          <span className="ml-1 text-red-500 dark:text-red-400">*</span>
        )}
      </label>

      <div className="relative">
        <Lock
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#7185a1]"
        />

        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`h-10 w-full rounded-lg border bg-white pl-11 pr-12 text-[12px] text-slate-800 outline-none placeholder:text-slate-400 transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 dark:bg-[#0d1d32] dark:text-white dark:placeholder:text-[#71839d] dark:focus:border-[#857adc] dark:focus:ring-[#857adc]/30 ${error
              ? "border-red-500/70 dark:border-red-500/70"
              : "border-slate-300 dark:border-[#355376]"
            }`}
        />

        <button
          type="button"
          onClick={onClick}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500 transition hover:text-slate-800 dark:text-[#7185a1] dark:hover:text-white"
        >
          {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
        </button>
      </div>

      {error && (
        <p className="mt-1 text-[12px] text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}