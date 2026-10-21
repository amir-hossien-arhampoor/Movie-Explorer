

function SimilarMovieCard({ movie }) {

  return (
    <div className="min-w-0">
      <div className="h-30 overflow-hidden rounded-[6px]">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      <p className="mt-2 truncate text-[12px] font-semibold text-[#edf0fa]">
        {movie.Title}
      </p>

      <p className="mt-1 text-[11px] text-[#7e899f]">{movie.Year}</p>

    </div>
  );
}
export default SimilarMovieCard