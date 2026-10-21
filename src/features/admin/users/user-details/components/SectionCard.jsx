export default function SectionCard({
  icon: Icon,
  title,
  children,
}) {
  return (
    <section className="rounded-[10px] border border-slate-200 bg-white p-5 transition-colors dark:border-[#112a46] dark:bg-[#081827]">
      <div className="mb-5 flex items-center gap-3">
        <Icon
          size={20}
          className="text-violet-600 dark:text-[#9187f2]"
        />

        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}