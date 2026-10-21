function SectionCard({ title, children, className = "" }) {
  return (
    <section className={`rounded-md border border-slate-200 bg-white p-3 dark:border-[#10375d] dark:bg-[#06182a] ${className}`}>
      <h3 className="mb-1 font-semibold text-slate-900 dark:text-white">{title}</h3>
      {children}
    </section>
  );
}

export default SectionCard;