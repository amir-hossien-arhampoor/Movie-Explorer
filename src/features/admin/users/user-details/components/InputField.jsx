export default function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  error
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-slate-600 dark:text-[#9aabc1]">
        {label}

        {required && (
          <span className="ml-1 text-rose-600 dark:text-[#ff526b]">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`h-10 w-full rounded-lg border bg-white pl-4 pr-4 text-[12px] text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 dark:bg-[#0d1d32] dark:text-white dark:placeholder:text-[#71839d] dark:focus:border-[#857adc] dark:focus:ring-[#857adc]/30 ${error
            ? "border-red-500/70 dark:border-red-500/70"
            : "border-slate-300 dark:border-[#1b3653]"
          }`}
      />

      {error && (
        <p className="mt-1 text-[12px] text-red-600 dark:text-red-500">
          {error[0]}
        </p>
      )}
    </div>
  );
}
