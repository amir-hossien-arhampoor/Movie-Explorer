function CastCard({ member }) {
  return (
    <div className="min-w-0 max-sm:w-30 overflow-hidden rounded-[5px] border border-[#142c4c] bg-[#071527]">
      <div className="h-40 overflow-hidden bg-[#111e31]">
        <img
          src={`https://image.tmdb.org/t/p/w500${member.image}`}
          alt={member.name}
          className="h-full w-full object-cover  "
        />
      </div>

      <div className="p-2.5">
        <p className="truncate text-[12px] font-semibold text-[#edf0fa]">
          {member.name}
        </p>

        <p className="mt-1 text-[11px] text-[#7e899f]">{member.character}</p>
      </div>
    </div>
  );
}
export default CastCard