import { ChevronDown } from "lucide-react";

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-slate-600 dark:text-[#9aabc1]">
        {label}
      </label>

      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="h-11 w-full appearance-none rounded-[8px] border border-slate-300 bg-white px-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-[#1b3b5e] dark:bg-[#071a2c] dark:text-white dark:focus:border-[#857adc] dark:focus:ring-[#857adc]"
        >
          {options.map((option) => (
            <option
              key={option}
              value={option.toLowerCase()}
              className="bg-white text-slate-900 dark:bg-[#081827] dark:text-white"
            >
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={17}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-[#788da7]"
        />
      </div>
    </div>
  );
}