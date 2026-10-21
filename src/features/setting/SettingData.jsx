import { Database, Search, Bookmark, Heart, Eye, } from "lucide-react";
import SettingDataItem from "@/features/setting/SettingDataItem";
import { useDispatch, useSelector } from "react-redux";
import { removeAllRecentSearch } from "@/features/search/SearchSlice";
import { removeAllFromWatchlist } from "@/features/watchlist/WatchListSlice";
import { removeAllFromFavorites } from "@/features/favoriteList/FavoriteSlice";
import { removeAllFromWatched } from "@/features/watchedmovies/watchedMoviesSlice";

function SettingData() {
  const { currentUser } = useSelector(state => state.auth)
  const dispatch = useDispatch()


  async function handleClearSearchHistory() {
    await dispatch(removeAllRecentSearch({ userId: currentUser.userId }))
  };

  async function handleClearWatchlist() {
    await dispatch(removeAllFromWatchlist({ userId: currentUser.userId }))
  };

  async function handleClearFavorites() {
    await dispatch(removeAllFromFavorites({ userId: currentUser.userId }))
  };

  async function handleClearWatched() {
    await dispatch(removeAllFromWatched({ userId: currentUser.userId }))
  };

  return (

    <section className="rounded-[9px] border border-slate-200 bg-white p-2 text-slate-900 transition-colors dark:border-[#112a46] dark:bg-[#03111f] dark:text-white">
      {/* Header */}
      <div className="mb-3 flex items-center gap-1">
        <div className="flex h-9 w-9 items-center justify-center rounded-[8px]">
          <Database
            size={20}
            className="text-violet-600 dark:text-[#6d3eec]"
          />
        </div>

        <div>
          <h2 className="font-bold">Data</h2>
          <p className="text-[11px] text-slate-500 dark:text-[#6f8196]">
            Manage your data and clear your history.
          </p>
        </div>
      </div>

      {/* Data Actions */}
      <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2">
        <SettingDataItem
          icon={Search}
          title="Clear Search History"
          description="Remove your search history."
          onClick={handleClearSearchHistory}
        />

        <SettingDataItem
          icon={Bookmark}
          title="Clear Watchlist"
          description="Remove all movies from your watchlist."
          onClick={handleClearWatchlist}
        />

        <SettingDataItem
          icon={Heart}
          title="Clear Favorites"
          description="Remove all your favorite movies."
          onClick={handleClearFavorites}
        />

        <SettingDataItem
          icon={Eye}
          title="Clear Watched Movies"
          description="Remove your watched movies history."
          onClick={handleClearWatched}
        />
      </div>
    </section>

  );
};

export default SettingData;