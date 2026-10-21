import { useEffect, useRef, useState } from "react"
import { getFavorites, getWatchList } from "../utils/api"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router";

import "../css/slider.css"
import 'swiper/css';
import "swiper/css/navigation";

function Slider({ userId, name, path }) {
  const [movies, setMovies] = useState([])
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
    if (name === "watchlist") {
      const res = await getWatchList(userId)
      setMovies(res)
    } else if (name === "favorites") {
      const res = await getFavorites(userId)
      setMovies(res)
    }
  }

  loadMovies()
}, [userId, name])


  return (
    <div className="movie-slider">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <p>{name === "watchlist" ? "Watchlist" : name === "favorites" ? "Favorites" : ""}</p>
          <span>({movies.length})</span>
        </div>
        <NavLink to={path} className="flex items-center text-[11px] text-[#b588fd]">
          <p>View all</p>
          <ChevronRight size={16} color="#b588fd" />
        </NavLink>
      </div>
      {movies.length !== 0 && (
      <div className="container">
        <Swiper
          modules={[Navigation]}
          slidesPerView="auto"
          spaceBetween={20}
          centeredSlides={false}
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
          navigation
          grabCursor
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <NavLink
                to={
                  name === "watchlist"
                    ? `/watchlist/${movie.imdbID}`
                    : `/favorites/${movie.imdbID}`
                }
                className="movie-card"
              >
                <img src={movie.Poster} alt={movie.Title} />

                <div className="movie-info">
                  <p>{movie.Title}</p>
                  <span>{movie.Year}</span>
                </div>
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )}
    </div>
  )
}

export default Slider