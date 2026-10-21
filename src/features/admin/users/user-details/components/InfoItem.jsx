function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon
        size={18}
        className="text-violet-600 dark:text-[#8e88e8]"
      />
      <div>
        <p className="text-[11px] text-slate-500 dark:text-[#6e8198]">
          {label}
        </p>

        <p className="text-sm text-slate-700 dark:text-[#c7d4e6]">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

export default InfoItem;