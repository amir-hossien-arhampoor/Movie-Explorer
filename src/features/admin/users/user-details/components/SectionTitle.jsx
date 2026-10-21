function SectionTitle({ icon: Icon, title }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <Icon
        size={20}
        className="text-violet-600 dark:text-[#9187f2]"
      />

      <h3 className="text-base font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
    </div>
  );
}

export default SectionTitle;