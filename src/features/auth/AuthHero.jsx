
import {
  Clapperboard,
  Search,
  Bookmark,
  Heart,
  Eye,
} from "lucide-react";

function AuthHero() {
  return (
    <section className="relative hidden min-h-screen w-1/2 overflow-hidden bg-[#f7f8fc] transition-colors duration-300 dark:bg-[#040b14] lg:flex">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-white via-[#f5f3ff] to-[#eef2ff] transition-colors duration-300 dark:from-[#040b14] dark:via-[#0b1020] dark:to-[#17112b]" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-white/20 via-transparent to-[#e9e7ff]/30 dark:from-black/10 dark:via-transparent dark:to-[#080b18]/50" />

      {/* Purple glow */}
      <div className="pointer-events-none absolute -bottom-24 -left-40 h-112.5 w-112.5 rounded-full bg-violet-400/15 blur-[130px] dark:bg-violet-500/15" />

      {/* Blue glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-87.5 w-87.5 rounded-full bg-blue-400/15 blur-[120px] dark:bg-blue-500/10" />

      <div className="relative z-10 flex w-full flex-col px-[9%] py-12">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-200 bg-violet-100/80 shadow-sm shadow-violet-200/40 transition-colors dark:border-violet-400/20 dark:bg-violet-400/10 dark:shadow-violet-950/20">
            <Clapperboard
              size={26}
              className="text-[#7563d9] dark:text-[#a99af8]"
            />
          </div>

          <h1 className="text-[25px] font-bold tracking-tight text-slate-900 dark:text-white">
            Movie{" "}
            <span className="text-[#7563d9] dark:text-[#a99af8]">
              Explorer
            </span>
          </h1>
        </div>

        {/* Hero content */}
        <div className="max-w-155 pt-24">
          <h2 className="text-5xl font-bold leading-[1.15] tracking-[-1.5px] text-slate-900 dark:text-white xl:text-[54px]">
            Discover Movies.
            <br />
            Explore Stories.
            <br />
            <span className="bg-linear-to-r from-[#8575e8] to-[#6554c8] bg-clip-text text-transparent dark:from-[#c4b5fd] dark:to-[#818cf8]">
              Create Your Watchlist.
            </span>
          </h2>

          <p className="mt-7 max-w-127.5 text-[16px] leading-7 text-slate-600 dark:text-slate-300">
            Track your favorite movies and TV shows,
            get personalized recommendations, and never
            miss out on what's next.
          </p>

          {/* Features */}
          <div className="mt-10 space-y-6">
            <Feature
              icon={<Search size={23} />}
              title="Search & Discover"
              description="Find your next favorite movie or TV show."
            />

            <Feature
              icon={<Bookmark size={22} />}
              title="Save to Watchlist"
              description="Keep track of what you want to watch."
            />

            <Feature
              icon={<Heart size={22} />}
              title="Add to Favorites"
              description="Remember the movies and shows you love."
            />

            <Feature
              icon={<Eye size={22} />}
              title="Mark as Watched"
              description="Keep track of everything you've watched."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-12">
          <div className="h-px w-full bg-linear-to-r from-violet-300 via-slate-200 to-transparent dark:from-violet-400/30 dark:via-white/10 dark:to-transparent" />
          <p className="mt-4 text-xs tracking-wide text-slate-500 dark:text-slate-400">
            Your next favorite story starts here.
          </p>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div className="group flex items-center gap-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-100 bg-white/80 text-[#7563d9] shadow-sm transition-all duration-200 group-hover:border-violet-200 group-hover:bg-violet-50 dark:border-white/10 dark:bg-white/4 dark:text-[#b8adff] dark:group-hover:border-violet-400/30 dark:group-hover:bg-violet-400/10">
        {icon}
      </div>

      <div>
        <h3 className="text-[15px] font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </h3>

        <p className="mt-1 text-[13px] leading-5 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

export default AuthHero;
