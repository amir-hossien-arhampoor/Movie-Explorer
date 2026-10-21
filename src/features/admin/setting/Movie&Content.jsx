import SettingRow from "@/features/admin/setting/components/SettingRow"
import SectionCard from "@/features/admin/setting/components/SectionCard ";
import { Calendar, Eye, Heart, Bookmark, Search, Star, ChevronDown, } from "lucide-react"
import SaveButton from "@/features/admin/setting/components/SaveButton "
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  enableMovieSearch,
  enableAddToWatchlist,
  enableAddToFavorites,
  enableMarkAsWatched,
  enableMovieRating,
  setMaxRating,
  ShowMovieRating,
  ShowReleaseDate,
  setDefaultSortOrder
} from "@/features/admin/setting/AdminSettingSlice"
import { getMovieAndContentSettings, updateMovieAndContentSettings } from "@/features/admin/setting/AdminSettingSlice";



function MovieAndContent() {
  const [originalSettings, setOriginalSettings] = useState(null);
  const { movieAndContentSettings } = useSelector(state => state.siteSettings)
  const dispatch = useDispatch()

  async function handleSubmit(e) {
    e.preventDefault()

    if (!originalSettings) return

    const hasChanges =
      JSON.stringify(movieAndContentSettings) !== JSON.stringify(originalSettings)

    if (!hasChanges) {
      toast.error("No changes to save.")
      return
    }
    console.log(movieAndContentSettings)
    const updateRes = await dispatch(updateMovieAndContentSettings({ movieAndContentSettings : movieAndContentSettings }))

    if (updateMovieAndContentSettings.fulfilled.match(updateRes)) {
      setOriginalSettings(movieAndContentSettings)

      toast.success("movie And content Settings updated successfully!")
    }
  }

  useEffect(() => {
    async function getSetting() {
      const result = await dispatch(getMovieAndContentSettings());

      if (getMovieAndContentSettings.fulfilled.match(result)) {
        setOriginalSettings(result.payload);
      }
    }

    getSetting();
  }, [dispatch]);

  return (

    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
  <div className="space-y-3">
    <div>
      <h1 className="text-[18px] font-semibold text-slate-900 dark:text-white">Movie & Content Settings</h1>
      <p className="mt-1 text-[12px] text-slate-500 dark:text-[#718096]">Manage movie, TV show and content related features.</p>
    </div>

    <SectionCard title="Movie Features">
      <SettingRow
        icon={Search}
        title="Enable movie search"
        description="Allow users to search for movies and TV shows."
        enabled={movieAndContentSettings?.moviesearch}
        onChange={() => dispatch(enableMovieSearch())}
      />

      <SettingRow
        icon={Bookmark}
        title="Allow adding to watchlist"
        description="Let users add movies to their watchlist."
        enabled={movieAndContentSettings?.addtowatchlist}
        onChange={() => dispatch(enableAddToWatchlist())}
      />

      <SettingRow
        icon={Heart}
        title="Allow adding to favorites"
        description="Let users add movies to their favorites."
        enabled={movieAndContentSettings?.addtofavorites}
        onChange={() => dispatch(enableAddToFavorites())}
      />

      <SettingRow
        icon={Eye}
        title="Allow marking as watched"
        description="Let users mark movies as watched."
        enabled={movieAndContentSettings?.markaswatched}
        onChange={() => dispatch(enableMarkAsWatched())}
      />

      <SettingRow
        icon={Star}
        title="Enable movie ratings"
        description="Allow users to rate movies."
        enabled={movieAndContentSettings?.movierating}
        onChange={() => dispatch(enableMovieRating())}
      />
    </SectionCard>

    <SectionCard title="Movie Display Settings">
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div>
          <label className="mb-1 block text-[12px] text-slate-600 dark:text-[#b5c0d0]">Maximum Rating</label>
          <div className="relative">
            <select
              onChange={(e) => dispatch(setMaxRating(Number(e.target.value)))}
              value={movieAndContentSettings?.maxrating}
              className="h-8 w-full appearance-none rounded-md border border-slate-300 bg-white px-3 pr-8 text-[10px] text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-[#12365b] dark:bg-[#071a2d] dark:text-[#d8e0eb]"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-[#74839a]" />
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-[#718197]">Set the maximum rating value (1-10).</p>
        </div>
      </div>

      <div className="mt-3">
        <SettingRow
          icon={Star}
          title="Show Movie Ratings"
          description="Display ratings on movie cards and details."
          enabled={movieAndContentSettings?.showmovierating}
          onChange={() => dispatch(ShowMovieRating())}
        />

        <SettingRow
          icon={Calendar}
          title="Show Release Dates"
          description="Show release dates on movie cards and details."
          enabled={movieAndContentSettings?.showreleasedate}
          onChange={() => dispatch(ShowReleaseDate())}
        />
      </div>
    </SectionCard>

    <SectionCard title="Content Management">
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div>
          <label className="mb-1 block text-[12px] text-slate-600 dark:text-[#b5c0d0]">Default Movie Sort Order</label>
          <div className="relative">
            <select
              onChange={(e) => dispatch(setDefaultSortOrder(e.target.value))}
              value={movieAndContentSettings?.defaultsortorder}
              className="h-8 w-full appearance-none rounded-md border border-slate-300 bg-white px-3 pr-8 text-[10px] text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-[#12365b] dark:bg-[#071a2d] dark:text-[#d8e0eb]"
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="Title A-Z">Title A-Z</option>
              <option value="Title Z-A">Title Z-A</option>
              <option value="Highest Rated">Highest Rated</option>
              <option value="Lowest Rated">Lowest Rated</option>
            </select>
            <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-[#74839a]" />
          </div>
        </div>

        {/* <div>
          <label className="mb-1 block text-[9px] text-slate-600 dark:text-[#b5c0d0]">Default Genres</label>
          <Select>All Genres</Select>
        </div> */}
      </div>
    </SectionCard>

    <div className="flex justify-end">
      <SaveButton section="movieAndContent" />
    </div>
  </div>
</form>

  )
}

export default MovieAndContent