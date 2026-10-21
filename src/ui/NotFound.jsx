
import { NavLink } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Clapperboard,
  Film,
  Home,
  Search,
  Ticket,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020b16] px-4 py-12 text-white sm:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5144c8]/10 blur-[130px]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Film className="absolute left-[12%] top-[18%] size-10 rotate-[-18deg] text-[#857adc]/10 sm:size-16" />
        <Clapperboard className="absolute bottom-[18%] right-[12%] size-12 rotate-15 text-[#857adc]/10 sm:size-20" />
        <Ticket className="absolute right-[18%] top-[15%] size-8 rotate-12 text-[#857adc]/10 sm:size-12" />

        <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-[#112a46] to-transparent" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-[#112a46] to-transparent" />
      </div>

      <section className="relative w-full max-w-2xl text-center">
        {/* Brand */}
        <NavLink
          to="/"
          className="mb-12 inline-flex items-center gap-2.5 rounded-full border border-[#112a46] bg-[#061426]/80 px-4 py-2.5 transition hover:border-[#857adc]/50"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-[#857adc]">
            <Clapperboard size={18} className="text-white" />
          </span>

          <span className="text-sm font-bold tracking-[0.16em]">
            MOVIE <span className="text-[#9588ff]">EXPLORER</span>
          </span>
        </NavLink>

        {/* 404 visual */}
        <div className="relative mx-auto mb-5 w-fit">
          <div className="absolute inset-0 rounded-full bg-[#857adc]/10 blur-3xl" />

          <h1 className="relative select-none text-[120px] font-black leading-none tracking-[-0.08em] text-transparent sm:text-[180px]">
            <span className="bg-linear-to-b from-white via-[#c5c0ff] to-[#857adc] bg-clip-text">
              4
            </span>
            <span className="relative inline-block bg-linear-to-b from-[#a99fff] to-[#6253bd] bg-clip-text">
              0
              <Film
                size={44}
                strokeWidth={1.4}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#020b16] sm:size-16"
              />
            </span>
            <span className="bg-linear-to-b from-white via-[#c5c0ff] to-[#857adc] bg-clip-text">
              4
            </span>
          </h1>
        </div>

        {/* Error label */}
        <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-[#857adc]/25 bg-[#857adc]/10 px-3 py-1.5">
          <span className="size-1.5 rounded-full bg-[#9588ff]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b7b0ff]">
            Error 404 · Scene not found
          </span>
        </div>

        <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
          Lost in the Reel?
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
          Looks like this scene isn’t in our collection. The page you’re
          looking for may have moved, disappeared, or never made the final cut.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <NavLink
            to="/"
            className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#857adc] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#857adc]/15 transition hover:-translate-y-0.5 hover:bg-[#7567ce]"
          >
            <Home size={17} />
            Back to Home
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </NavLink>

          <NavLink
            to="/explore"
            className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-[#263c60] bg-[#061426] px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-[#857adc]/60 hover:bg-[#0b1c34] hover:text-white"
          >
            <Search size={17} />
            Explore Movies
          </NavLink>
        </div>

        {/* Bottom detail */}
        <div className="mx-auto mt-12 flex items-center justify-center gap-2 text-xs text-slate-600">
          <ArrowLeft size={13} />
          <span>Sometimes the best stories take a different route.</span>
        </div>
      </section>
    </main>
  );
}
