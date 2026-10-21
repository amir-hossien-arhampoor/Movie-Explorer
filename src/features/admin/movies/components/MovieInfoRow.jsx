export default function MovieInfoRow({ icon: Icon, label, value}) {
  
  if (!value || value === "N/A") {
    return null;
  }

  return (
    <div
      className="
        flex
        items-center
        gap-3
        border-b
        border-[#173453]
        px-4
        py-3
        last:border-b-0
      "
    >
      <Icon
        size={15}
        className="shrink-0 text-[#7195bd]"
      />

      <span
        className=" w-20 shrink-0 text-[11px] text-[#66839f]"
      >
        {label}
      </span>

      <span
        className=" min-w-0 truncate text-[11px] text-[#c1cfdd] "
      >
        {value}
      </span>
    </div>
  );
}