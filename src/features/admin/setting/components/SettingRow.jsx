import Toggle from "@/features/admin/setting/components/Toggle";

function SettingRow({ icon: Icon, title, description, enabled = true, children, onChange }) {
  return (
    <div className="flex items-center justify-between gap-5 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-[#7864ee]/20 dark:text-[#9d8cff]">
          <Icon size={20} />
        </div>

        <div className="min-w-0">
          <p className="text-[13px] font-medium text-slate-900 dark:text-white">{title}</p>
          {description && <p className="mt-0.5 text-[11px] text-slate-500 dark:text-[#64738b]">{description}</p>}
        </div>
      </div>

      <div className="shrink-0" onClick={() => onChange?.()}>
        {children || <Toggle enabled={enabled} />}
      </div>
    </div>
  );
}

export default SettingRow;