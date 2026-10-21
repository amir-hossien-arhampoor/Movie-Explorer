import ConfirmActionModal from "@/components/ConfirmActionModal";
import { removeFromSelectedSection } from "@/features/admin/movies/ManageMoviesSlice";
import { Star, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function MovieRow({
  movie,
  index,
  selected,
  onSelect,
  onMovieRemoved,
  sectionName
}) {

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const dispatch = useDispatch()

  async function handleRemove() {
    if (!movie?.imdbID || isDeleting) return;

    try {
      setIsDeleting(true);

      const result = await dispatch(removeFromSelectedSection({ imdbID: movie.imdbID, section: sectionName }));

      if (removeFromSelectedSection.fulfilled.match(result)) {
        const title = movie.Title.length > 30
          ? `${movie.Title.slice(0, 30)}...`
          : movie.Title;

        toast.success(`Movie "${title}" removed from the section.`);

        setIsConfirmOpen(false);
        onMovieRemoved()
      } else {
        toast.error(result.payload || "Failed to remove movie from the section.");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to remove movie from the section."
      );
    } finally {
      setIsDeleting(false);
    }
  }


  return (
    <>
      <div
        onClick={() => onSelect(movie)}
        className={`flex cursor-pointer items-center gap-3 border-b border-slate-200 px-3 py-2.5 transition md:justify-between sm:px-4 ${selected ? "bg-violet-100 ring-1 ring-inset ring-violet-400 dark:bg-[#171443] dark:ring-[#7655ff]" : "hover:bg-slate-50 dark:hover:bg-[#0c1c2e] dark:border-[#112a46]"}`}
      >
        {/* Movie */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[5px] bg-violet-100 text-[11px] font-semibold text-violet-700 dark:bg-[#1a2452] dark:text-[#c4baff]">
            {index + 1}
          </div>

          <img
            src={movie.Poster}
            alt={movie.Title}
            className="h-10 w-7 shrink-0 rounded-[3px] object-cover"
          />

          <span className="min-w-0 flex-1 truncate text-xs font-medium text-slate-800 dark:text-white sm:flex-none sm:w-67">
            {movie.Title.slice(0, 36)} {movie.Title.length > 30 && "..."}
          </span>
        </div>

        {/* Year */}
        <span className="hidden w-20 shrink-0 text-xs text-slate-500 sm:block dark:text-[#7890a9]">
          {movie.Year.slice(0, 4)}
        </span>

        {/* Rating */}
        <div className="flex shrink-0 items-center gap-1.5">
          <Star size={12} fill="#f6bd35" color="#f6bd35" />

          <span className="text-xs text-slate-600 dark:text-[#c7d0dd]">
            {movie.imdbRating}
          </span>
        </div>

        {/* Actions */}
        <div
          className="flex w-8 shrink-0 items-center justify-end gap-1 sm:w-10 lg:w-40"
          onClick={(e) => {
            e.stopPropagation();
            setIsConfirmOpen(true);
          }}
        >
          <button
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[5px] text-slate-500 transition-all duration-300 hover:bg-red-100 hover:text-red-600 dark:hover:bg-[#ff00002c] dark:hover:text-[#ff2c2c]"
          >
            <Trash size={15} />
          </button>
        </div>
      </div>
      <ConfirmActionModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleRemove}
        title="Remove this movie?"
        message="This action will remove the movie permanently."
        isLoading={isDeleting}
        btnText={["delete", "deleting..."]}
      />
    </>
  );
}