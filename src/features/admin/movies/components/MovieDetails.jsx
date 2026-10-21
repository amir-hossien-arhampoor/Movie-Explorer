import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { formatNumber } from "@/utils/date";
import ConfirmActionModal from "@/components/ConfirmActionModal";
import { removeFromSelectedSection } from "@/features/admin/movies/ManageMoviesSlice";
import { Award, CalendarDays, Clock3, Film, Globe, Languages, Link2, Star, UserRound, UsersRound } from "lucide-react";



function DetailItem({ icon: Icon, label, value }) {
  if (!value || value === "N/A") return null;

  return (
    <div className="flex min-w-0 gap-3">
      <div
        className="
          mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center
          rounded-[6px] bg-violet-100 text-violet-600
          dark:bg-[#0d2034] dark:text-[#8d79f5]
        "
      >
        <Icon size={15} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] text-slate-500 dark:text-[#61768c]">
          {label}
        </p>

        <p className="mt-0.5 text-[11px] leading-4 text-slate-700 dark:text-[#c4cfdb]">
          {value}
        </p>
      </div>
    </div>
  );
}


export default function MovieDetails({ movie, onMovieRemoved ,sectionName}) {
  const dispatch = useDispatch();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function handleRender() {
      if (!movie) {
        setIsConfirmOpen(false);
        setIsDeleting(false);
      }
    }
    handleRender()
  }, [movie]);


  async function handleRemove() {
    if (!movie?.imdbID || isDeleting) return;

    try {
      setIsDeleting(true);

      const result = await dispatch(removeFromSelectedSection({ imdbID: movie.imdbID, section : sectionName}));

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


  if (!movie) return null;


  const votes = Number(
    movie.imdbVotes?.replace(/,/g, "")
  );


  const genres =
    movie.Genre && movie.Genre !== "N/A"
      ? movie.Genre
        .split(",")
        .map((genre) => genre.trim())
      : [];


  const actors =
    movie.Actors && movie.Actors !== "N/A"
      ? movie.Actors
        .split(",")
        .map((actor) => actor.trim())
      : [];


  return (
    <>
      <aside
        className="
          flex h-fit w-full min-w-0 flex-col overflow-hidden
          rounded-[10px] border border-slate-200 bg-white
          dark:border-[#173453] dark:bg-[#071725]
          xl:sticky xl:top-5 xl:w-90
        "
      >
        {/* Header */}
        <div
          className="
            flex h-12 items-center border-b border-slate-200 px-5
            dark:border-[#173453]
          "
        >
          <div className="relative flex h-full items-center">
            <span className="text-xs font-medium text-violet-600 dark:text-[#a998ff]">
              Movie Details
            </span>

            <span
              className="
                absolute bottom-0 left-0 right-0 h-0.5
                rounded-full bg-violet-500 dark:bg-[#8069ff]
              "
            />
          </div>
        </div>

        <div
          className="
            max-h-[calc(100vh-190px)] overflow-y-auto p-5
            scrollbar-thin scrollbar-track-transparent
            scrollbar-thumb-slate-300
            dark:scrollbar-thumb-[#203b58]
          "
        >
          {/* Movie Header */}
          <div className="flex gap-4">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="
                h-40 w-27 shrink-0 rounded-[6px]
                border border-slate-200 object-cover shadow-lg
                dark:border-[#1b3856]
              "
            />

            <div className="min-w-0">
              <h2
                className="
                  text-base font-semibold leading-5 text-slate-900
                  dark:text-white
                "
              >
                {movie.Title}
              </h2>

              <p className="mt-1 text-[11px] text-slate-500 dark:text-[#71859c]">
                {movie.Year}
                {movie.Genre &&
                  movie.Genre !== "N/A" &&
                  ` • ${movie.Genre}`}
              </p>

              {/* IMDb Rating */}
              {movie.imdbRating && movie.imdbRating !== "N/A" && (
                <div className="mt-3 flex items-center gap-2">
                  <Star size={15} fill="#f6bd35" color="#f6bd35" />

                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {movie.imdbRating}
                  </span>

                  {votes > 0 && (
                    <span className="text-[10px] text-slate-500 dark:text-[#687c92]">
                      ({formatNumber(votes)} votes)
                    </span>
                  )}
                </div>
              )}

              {/* Metascore */}
              {movie.Metascore && movie.Metascore !== "N/A" && (
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className="
                      rounded-lg bg-emerald-100 px-1.5 py-0.5
                      text-[9px] font-bold text-emerald-700
                      dark:bg-[#214f35] dark:text-[#72d99b]
                    "
                  >
                    META
                  </span>

                  <span className="text-[11px] text-slate-600 dark:text-[#aab8c7]">
                    {movie.Metascore}/100
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Synopsis */}
          {movie.Plot && movie.Plot !== "N/A" && (
            <div className="mt-6">
              <h3 className="text-xs font-medium text-slate-800 dark:text-[#d0d8e2]">
                Synopsis
              </h3>

              <p
                className="
                  mt-2 text-[11px] leading-[1.7] text-slate-600
                  dark:text-[#8296aa]
                "
              >
                {movie.Plot}
              </p>
            </div>
          )}

          {/* Movie Information */}
          <div className="mt-6 border-t border-slate-200 pt-5 dark:border-[#173453]">
            <div className="mb-4 flex items-center gap-2">
              <Film size={15} className="text-violet-600 dark:text-[#8d79f5]" />

              <h3 className="text-xs font-medium text-slate-800 dark:text-[#d0d8e2]">
                Movie Information
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <DetailItem
                icon={UserRound}
                label="Director"
                value={movie.Director}
              />

              <DetailItem
                icon={CalendarDays}
                label="Release Date"
                value={movie.Released}
              />

              <DetailItem
                icon={Clock3}
                label="Runtime"
                value={movie.Runtime}
              />

              <DetailItem
                icon={Languages}
                label="Language"
                value={movie.Language}
              />

              <DetailItem
                icon={Globe}
                label="Country"
                value={movie.Country}
              />

              <DetailItem
                icon={Film}
                label="Type"
                value={movie.Type}
              />
            </div>
          </div>

          {/* Genres */}
          {genres.length > 0 && (
            <div className="mt-6 border-t border-slate-200 pt-5 dark:border-[#173453]">
              <h3 className="text-xs font-medium text-slate-800 dark:text-[#d0d8e2]">
                Genres
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="
                      rounded-full border border-violet-200
                      bg-violet-50 px-3 py-1 text-[10px]
                      text-violet-700
                      dark:border-[#40368b] dark:bg-[#211b4e]
                      dark:text-[#aa9cf4]
                    "
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Writers */}
          {movie.Writer && movie.Writer !== "N/A" && (
            <div className="mt-6 border-t border-slate-200 pt-5 dark:border-[#173453]">
              <DetailItem
                icon={UsersRound}
                label="Writers"
                value={movie.Writer}
              />
            </div>
          )}

          {/* Cast */}
          {actors.length > 0 && (
            <div className="mt-6 border-t border-slate-200 pt-5 dark:border-[#173453]">
              <div className="flex items-center gap-2">
                <UsersRound
                  size={15}
                  className="text-violet-600 dark:text-[#8d79f5]"
                />

                <h3 className="text-xs font-medium text-slate-800 dark:text-[#d0d8e2]">
                  Cast
                </h3>
              </div>

              <div className="mt-3 space-y-2">
                {actors.slice(0, 5).map((actor) => (
                  <div
                    key={actor}
                    className="
                      flex items-center gap-2 rounded-[6px]
                      bg-slate-50 px-3 py-2
                      dark:bg-[#091a2b]
                    "
                  >
                    <div
                      className="
                        flex h-6 w-6 items-center justify-center
                        rounded-full bg-violet-100 text-violet-600
                        dark:bg-[#172b45] dark:text-[#8d79f5]
                      "
                    >
                      <UserRound size={12} />
                    </div>

                    <span className="truncate text-[11px] text-slate-700 dark:text-[#aab8c7]">
                      {actor}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {movie.Awards && movie.Awards !== "N/A" && (
            <div className="mt-6 border-t border-slate-200 pt-5 dark:border-[#173453]">
              <div className="flex gap-3">
                <div
                  className="
                    flex h-8 w-8 shrink-0 items-center justify-center
                    rounded-[6px] bg-amber-100 text-amber-600
                    dark:bg-[#2b2410] dark:text-[#e4b83e]
                  "
                >
                  <Award size={15} />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] text-slate-500 dark:text-[#61768c]">
                    Awards
                  </p>

                  <p className="mt-0.5 text-[11px] leading-4 text-slate-700 dark:text-[#c4cfdb]">
                    {movie.Awards}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Media */}
          {movie.Website && movie.Website !== "N/A" && (
            <div className="mt-6 border-t border-slate-200 pt-5 dark:border-[#173453]">
              <div className="mb-3 flex items-center gap-2">
                <Link2
                  size={15}
                  className="text-violet-600 dark:text-[#8d79f5]"
                />

                <h3 className="text-xs font-medium text-slate-800 dark:text-[#d0d8e2]">
                  Media
                </h3>
              </div>

              <a
                href={movie.Website}
                target="_blank"
                rel="noreferrer"
                className="
                  flex items-center justify-between rounded-[7px]
                  border border-slate-200 bg-slate-50 px-3 py-2.5
                  transition hover:border-violet-400 hover:bg-violet-50
                  dark:border-[#1d3956] dark:bg-[#091a2b]
                  dark:hover:border-[#6c55d8] dark:hover:bg-[#101d35]
                "
              >
                <span className="text-[11px] text-slate-700 dark:text-[#aab8c7]">
                  Official Website
                </span>

                <Link2
                  size={13}
                  className="text-violet-600 dark:text-[#8d79f5]"
                />
              </a>
            </div>
          )}

          {/* Ratings */}
          <div className="mt-6 border-t border-slate-200 pt-5 dark:border-[#173453]">
            <div className="mb-3 flex items-center gap-2">
              <Star size={15} className="text-amber-500 dark:text-[#f6bd35]" />

              <h3 className="text-xs font-medium text-slate-800 dark:text-[#d0d8e2]">
                Ratings
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {movie.imdbRating && movie.imdbRating !== "N/A" && (
                <div
                  className="
                    rounded-[7px] border border-slate-200
                    bg-slate-50 p-3
                    dark:border-[#1d3956] dark:bg-[#091a2b]
                  "
                >
                  <p className="text-[9px] text-slate-500 dark:text-[#60758c]">
                    IMDb
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <Star size={12} fill="#f6bd35" color="#f6bd35" />

                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {movie.imdbRating}
                    </span>
                  </div>
                </div>
              )}

              {movie.Metascore && movie.Metascore !== "N/A" && (
                <div
                  className="
                    rounded-[7px] border border-slate-200
                    bg-slate-50 p-3
                    dark:border-[#1d3956] dark:bg-[#091a2b]
                  "
                >
                  <p className="text-[9px] text-slate-500 dark:text-[#60758c]">
                    Metascore
                  </p>

                  <span className="mt-1 block text-sm font-semibold text-slate-900 dark:text-white">
                    {movie.Metascore}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Remove from section */}
          <div className="mt-6 border-t border-slate-200 pt-5 dark:border-[#173453]">
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => setIsConfirmOpen(true)}
              className="
                flex h-9 w-full cursor-pointer items-center justify-center
                rounded-[7px] border border-red-300 bg-transparent
                text-[11px] font-medium text-red-600 transition
                hover:border-red-400 hover:bg-red-50
                disabled:cursor-not-allowed disabled:opacity-50
                dark:border-red-500/50 dark:text-red-400
                dark:hover:border-red-500/80 dark:hover:bg-red-500/10
              "
            >
              Remove from section
            </button>
          </div>
        </div>
      </aside>

      <ConfirmActionModal
        isOpen={isConfirmOpen}
        onClose={() => {
          if (!isDeleting) {
            setIsConfirmOpen(false);
          }
        }}
        onConfirm={handleRemove}
        title="Remove this movie?"
        message="This will remove the movie from the current homepage section."
        isLoading={isDeleting}
        btnText={["Remove", "Removing..."]}
      />
    </>
  );
}