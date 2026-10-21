export default function StatCard({ title, value, icon: Icon, iconClass,}) {
  return (
<div className="rounded-[8px] border border-slate-200 bg-white p-4 transition-colors duration-300 dark:border-[#142d4c] dark:bg-[#07162b]">
  <div className="flex items-start gap-4">
    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] ${iconClass}`}>
      <Icon size={21} strokeWidth={2} />
    </div>

    <div className="min-w-0">
      <p className="text-[11px] text-slate-500 dark:text-[#8795aa]">{title}</p>
      <h2 className="mt-1 text-[23px] font-semibold tracking-wide text-slate-900 dark:text-[#edf2fa]">{value}</h2>
    </div>
  </div>
</div>
  );
}