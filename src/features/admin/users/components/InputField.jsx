function InputField({
  label,
  value,
  onChange,
  icon: Icon,
  placeholder,
  type = "text",
  error
}) {
  return (
<div>
  <label className="mb-2 block text-[12px] font-medium text-slate-700 dark:text-[#b7c6da]">
    {label}
  </label>

  <div className="relative">
    <Icon
      size={17}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#7185a1]"
    />

    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`h-10 w-full rounded-lg border bg-white pl-11 pr-4 text-[12px] text-slate-800 outline-none placeholder:text-slate-400 transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 dark:bg-[#0d1d32] dark:text-white dark:placeholder:text-[#71839d] dark:focus:border-[#857adc] dark:focus:ring-[#857adc]/30 ${
        error
          ? "border-red-500/70 dark:border-red-500/70"
          : "border-slate-300 dark:border-[#1b3653]"
      }`}
    />
  </div>

  {error && (
    <p className="mt-1 text-[12px] text-red-600 dark:text-red-400">
      {error}
    </p>
  )}
</div>
  );
}

export default InputField