function StatusBadge({ active, children }) {
  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${active
          ? "bg-emerald-100 text-emerald-700 dark:bg-[#063b2c] dark:text-[#32e6a1]"
          : "bg-rose-100 text-rose-700 dark:bg-[#3b1720] dark:text-[#ff6b81]"
        }`}
    >
      {children}
    </span>
  );
}

export default StatusBadge;