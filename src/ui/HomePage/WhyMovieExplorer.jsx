import { Film, Heart, Bookmark, Zap } from "lucide-react";

const benefits = [
  {
    title: "Huge Collection",
    description:
      "Discover movies and TV shows across genres, decades, and countries.",
    icon: Film,
  },
  {
    title: "Personalized Experience",
    description:
      "Keep track of the movies you love and build a collection that feels like yours.",
    icon: Heart,
  },
  {
    title: "Track Your Progress",
    description:
      "Organize your watchlist, save favorites, and keep track of watched movies.",
    icon: Bookmark,
  },
  {
    title: "Fast & Easy",
    description:
      "Find your next movie with a simple, clean, and intuitive experience.",
    icon: Zap,
  },
];

export default function WhyMovieExplorer() {
  return (
    <section id="why-movie-explorer" className="mt-20 scroll-mt-24">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.5fr] lg:gap-12">
        <div className="flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-[#9588ff]">
            Why Movie Explorer?
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:text-4xl">
            More Than Just a{" "}
            <span className="text-violet-600 dark:text-[#9588ff]">
              Movie Website
            </span>
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            We make your movie journey easier, more organized, and more
            enjoyable. Whether you are searching for a new release or
            revisiting a classic, your next discovery starts here.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50 dark:border-[#112a46] dark:bg-[#061426] dark:hover:border-[#857adc]/60 dark:hover:bg-[#081a30] sm:p-6"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-violet-100 text-violet-700 transition group-hover:bg-violet-600 group-hover:text-white dark:bg-[#182e70] dark:text-[#aaa0ff] dark:group-hover:bg-[#857adc] dark:group-hover:text-white">
                <Icon size={23} />
              </div>

              <h3 className="mt-5 font-semibold text-slate-900 dark:text-white">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
