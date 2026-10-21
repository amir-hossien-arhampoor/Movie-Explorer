function CastCard({ member }) {
  return (
    <div className="min-w-0 max-sm:w-30 overflow-hidden rounded-[5px] border border-slate-200 bg-white dark:border-[#142c4c] dark:bg-[#071527]">
      <div className="h-40 overflow-hidden bg-slate-100 dark:bg-[#111e31]">
        <img
          src={`https://image.tmdb.org/t/p/w500${member.image}`}
          alt={member.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-2.5">
        <p className="truncate text-[12px] font-semibold text-slate-800 dark:text-[#edf0fa]">
          {member.name}
        </p>

        <p className="mt-1 text-[11px] text-slate-500 dark:text-[#7e899f]">{member.character}</p>
      </div>
    </div>
  );
}
export default CastCard