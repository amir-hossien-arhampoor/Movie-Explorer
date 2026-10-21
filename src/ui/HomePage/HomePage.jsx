import Hero from "./Hero";
import FeatureBar from "./FeatureBar";
import FeaturedMovies from "./FeaturedMovies";
import PopularMovies from "./PopularMovies";
import WhyMovieExplorer from "./WhyMovieExplorer";
import Team from "./Team";
import OurImpact from "./OurImpact";
import ExploreCTA from "./ExploreCTA";
import SectionTitle from "./SectionTitle";
import TopRatedMovies from "@/ui/HomePage/TopRatedMovies";

export default function HomePage() {
  return (
    <main className="min-h-screen border-[#edf3f8] bg-[#f7f9fc] dark:border-[#292D35] dark:bg-[#040b14] text-white">
      <div className="mx-auto max-w-375 space-y-10 px-4 py-6 sm:px-6 lg:space-y-14 lg:px-10">
        <Hero />

        <FeatureBar />

        <section>
          <SectionTitle
            to="/admin-dashboard/manage-movies/featured-movies"
          >
            Featured Movie
          </SectionTitle>
          <FeaturedMovies />
        </section>

        <section>
          <SectionTitle
            to="/admin-dashboard/manage-movies/popular-movies"
          >
            Popular Movies
          </SectionTitle>
          <PopularMovies />
        </section>

        <section>
          <SectionTitle
            to="/admin-dashboard/manage-movies/toprated-movies"
          >
            Top rated Movies
          </SectionTitle>
          <TopRatedMovies />
        </section>

        <section className="border-t border-[#112a46] pt-10 lg:pt-14">
          <WhyMovieExplorer />
        </section>


        <section className="grid gap-10 border-t border-[#112a46] pt-10 lg:grid-cols-2 lg:gap-12 lg:pt-14">
          <Team />
          <OurImpact />
        </section>

        <ExploreCTA />
      </div>
    </main>
  );
}
