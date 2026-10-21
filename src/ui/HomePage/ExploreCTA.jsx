
import { ArrowRight, Clapperboard, Search } from "lucide-react";
import { NavLink } from "react-router";

export default function ExploreCTA() {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl border border-[#dbdfe2] bg-[#f7f9fc] dark:border-[#292D35] dark:bg-[#040b14]">
      <div className="absolute -right-20 -top-32 -z-10 size-72 rounded-full bg-[#5144c8]/20 blur-3xl" />

      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:p-10">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#182e70] text-[#b7b0ff] sm:size-16">
            <Clapperboard size={28} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-black dark:text-white sm:text-2xl">
              Ready to Find Your Next Favorite Movie?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Start exploring and build your personal movie collection.
            </p>
          </div>
        </div>

        <NavLink
          to="/explore"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#857adc] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7567ce] hover:shadow-lg hover:shadow-[#857adc]/20"
        >
          <Search size={17} />
          Start Exploring
          <ArrowRight size={17} />
        </NavLink>
      </div>
    </section>
  );
}
