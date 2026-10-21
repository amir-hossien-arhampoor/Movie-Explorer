function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111a3a] text-[#9a72ff]">
        <Icon size={19} />
      </div>

      <div>
        <p className="text-[12px] text-[#78839b]">{label}</p>
        <p className="mt-0.5 text-[13px] font-medium text-[#e7e9f4]">
          {value}
        </p>
      </div>
    </div>
  );
}

export default InfoItem