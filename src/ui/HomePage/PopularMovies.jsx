import { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { NavLink } from "react-router";
import { getPopularMovies } from "@/utils/api";
import { Film, Star } from "lucide-react";

import "../../css/popularMoviesSlider.css"
import 'swiper/css';
import "swiper/css/navigation";

function Slider() {
  const [popularMovies, setPopularMovies] = useState([])
  const swiperWrapperRef = useRef(null)

  function adjustMargin() {
    const screenWidth = window.innerWidth

    if (swiperWrapperRef.current) {
      swiperWrapperRef.current.style.marginLeft =
        screenWidth <= 520
          ? "0px"
          : screenWidth <= 650
            ? "-50px"
            : screenWidth <= 800
              ? "-100px"
              : "-150px"
    }
  }

  useEffect(() => {
    adjustMargin()
    window.addEventListener("resize", adjustMargin)
    return () => {
      window.removeEventListener("resize", adjustMargin)
    }
  }, [])

  useEffect(() => {
    async function loadMovies() {
      const data = await getPopularMovies()
      setPopularMovies(data)
    }
    loadMovies()
  }, [])


  return (
    <div className="popular-slider">
      {popularMovies.length > 0 ? (
        <div className="container">
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView="auto"
            spaceBetween={20}
            centeredSlides={false}
            slidesOffsetBefore={0}
            slidesOffsetAfter={0}
            navigation
            grabCursor
            loop
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            {popularMovies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <NavLink
                  to={
                    name === "watchlist"
                      ? `/watchlist/${movie.imdbID}`
                      : `/favorites/${movie.imdbID}`
                  }
                  className="popular-card"
                >
                  <img src={movie.Poster} alt={movie.Title} />

                  <div className="popular-info">
                    <p className="text-[13px]!">{movie.Title}</p>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">
                      {movie.Year}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="text-[#fdd007]" fill="#fdd007" size={14} />
                      <span className="text-[11px]! text-gray-600 dark:text-[#adaeaf]!">
                        {movie.imdbRating}
                      </span>
                    </div>
                  </div>
                </NavLink>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center dark:border-[#173453] dark:bg-[#071725]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-[#0d2034] dark:text-[#58718c]">
            <Film size={22} />
          </div>

          <h3 className="mt-3 text-sm font-semibold text-slate-800 dark:text-[#dce5ef]">
            No popular movies Yet
          </h3>

          <p className="mt-1 max-w-65 text-xs leading-5 text-slate-500 dark:text-[#7f91a7]">
              "admins haven't added any popular movies yet."
          </p>
        </div>
      )}
    </div>
  )
}

export default Slider