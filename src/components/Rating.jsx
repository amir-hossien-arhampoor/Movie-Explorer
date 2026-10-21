import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { addRatingToMovie } from "../features/watchlist/WatchListSlice";

function Rating({
  max = 10,
  size = 30,
  onChange,
  ratingNumber = 0,
  imdbID,
}) {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const { currentMovie, ratingIsLoading } = useSelector(
    (state) => state.watchList
  );

  const [selectedRating, setSelectedRating] = useState(ratingNumber);
  const [hoverRating, setHoverRating] = useState(null);


  useEffect(() => {
    if (currentMovie?.imdbID === imdbID) {
      setSelectedRating(currentMovie.ratingNumber ?? 0);
    } else {
      setSelectedRating(ratingNumber ?? 0);
    }
  }, [currentMovie, imdbID, ratingNumber]);

  const displayedRating =
    hoverRating !== null ? hoverRating : selectedRating;

  const stars = (displayedRating / max) * 5;

  function handleMouseMove(e, index) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    const half = mouseX < rect.width / 2 ? 0.5 : 1;

    const value = (index + half) * 2;

    setHoverRating(value);
  }

  function handleClick() {
    if (hoverRating !== null) {
      setSelectedRating(hoverRating);
      onChange?.(hoverRating);
    }
  }

  async function handleRatingSubmit() {
    if (!currentUser?.userId) {
      return;
    }

    if (!selectedRating) {
      return;
    }

    try {
      await dispatch(
        addRatingToMovie({
          movieId: imdbID,
          userId: currentUser.userId,
          rating: selectedRating,
        })
      ).unwrap();
    } catch (error) {
      console.error("Failed to submit rating:", error);
    }
  }

  return (
    <div
      className="flex items-center justify-between gap-2 rounded-[10px] border-2 border-[#8654ed] px-4 py-3"
      onMouseLeave={() => setHoverRating(null)}
    >
      <div>
        <h1 className="text-[15px]">Rate this movie</h1>

        <p className="text-[12px] text-neutral-500">
          Your rating helps others!
        </p>
      </div>

      <div className="flex items-center gap-2">
        {Array.from({ length: max }, (_, index) => {
          const fill = Math.min(
            Math.max(stars - index, 0),
            1
          );

          return (
            <div
              key={index}
              className="relative cursor-pointer"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onClick={handleClick}
            >
              <Star
                size={size}
                strokeWidth={1.5}
                className="text-neutral-500 transition-all duration-150"
              />

              {fill > 0 && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    width: `${fill * 100}%`,
                  }}
                >
                  <Star
                    size={size}
                    strokeWidth={1.5}
                    className="fill-yellow-400 text-yellow-400"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        disabled={ratingIsLoading}
        onClick={handleRatingSubmit}
        className="flex h-10 w-20 cursor-pointer items-center justify-center rounded-[8px] bg-linear-to-r from-[#8654ed] to-[#7951df] text-[13px] font-semibold text-white shadow-[0_8px_25px_rgba(124,76,231,0.18)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {ratingIsLoading ? "Saving..." : "Submit"}
      </button>
    </div>
  );
}

export default Rating;