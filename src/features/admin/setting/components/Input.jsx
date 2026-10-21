function Input({ value, className = "", onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`h-8 w-full rounded-md border border-slate-300 bg-white px-3 text-[12px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-[#12365b] dark:bg-[#071a2d] dark:text-[#d8e0eb] dark:placeholder:text-[#71839b] dark:focus:border-blue-500 ${className}`}
    />
  );
}

export default Input;