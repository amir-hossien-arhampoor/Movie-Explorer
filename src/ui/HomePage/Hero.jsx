import { Search, ArrowRight } from "lucide-react";
import { NavLink } from "react-router";


export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl border border-[#112a46] bg-[#f7f9fc] dark:border-[#292D35] dark:bg-[#040b14]">
      <div className="absolute inset-0 -z-10">
        <img src="public/3d-cinema-movie-projector.jpg" alt="" />
      </div>

      <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#020b16] via-[#020b16]/90 to-[#020b16]/15" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#020b16]/80 via-transparent to-[#020b16]/10" />

      <div className="flex min-h-115 items-center px-6 py-16 sm:px-10 lg:min-h-125 lg:px-14">
        <div className="max-w-xl">
          <span className="mb-5 inline-flex rounded-full border border-[#857adc]/30 bg-[#857adc]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#aaa0ff]">
            Your next favorite movie
          </span>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Explore the World of{" "}
            <span className="bg-linear-to-r from-[#a69bff] to-[#7561ff] bg-clip-text text-transparent">
              Movies
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
            Discover new releases, timeless classics, and hidden gems.
            Search, build your watchlist, mark your favorites, and keep
            track of what you have watched — all in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <NavLink
              to="/explore"
              className="inline-flex items-center gap-2 rounded-xl bg-[#857adc] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7567ce] hover:shadow-lg hover:shadow-[#857adc]/20"
            >
              <Search size={18} />
              Start Exploring
            </NavLink>

            <a
              href="#why-movie-explorer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#365071] px-5 py-3 text-sm font-medium text-white transition hover:border-[#857adc] hover:bg-[#857adc]/10"
            >
              Learn More
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
