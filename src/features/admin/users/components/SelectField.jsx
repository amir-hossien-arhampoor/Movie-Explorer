import { ChevronDown } from "lucide-react";

export default function SelectField({ label, required, value, options ,onChange}) {

  return (
<div>
  <label className="mb-2 block text-[12px] font-medium text-slate-700 dark:text-[#b7c6da]">
    {label}

    {required && (
      <span className="ml-1 text-red-500 dark:text-red-400">*</span>
    )}
  </label>

  <div className="relative">
    <select
      className="h-10 w-full appearance-none rounded-lg border border-slate-300 bg-white pl-3 pr-4 text-[12px] text-slate-800 outline-none transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 dark:border-[#355376] dark:bg-[#0d1d32] dark:text-white dark:focus:border-[#857adc] dark:focus:ring-[#857adc]/30"
      value={value}
      onChange={onChange}
    >
      {options.map((item, index) => (
        <option
          key={index}
          value={item.slice(0, 1).toLowerCase() + item.slice(1)}
          className="bg-white text-slate-800 dark:bg-[#0d1d32] dark:text-white"
        >
          {item}
        </option>
      ))}
    </select>

    <ChevronDown
      size={15}
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-[#74839a]"
    />
  </div>
</div>

  );
}