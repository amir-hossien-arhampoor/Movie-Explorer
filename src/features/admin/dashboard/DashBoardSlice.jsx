import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DB_FAVORITES, DB_WATCHLIST, DB_USERS, DB_WATCHEDMOVIES } from "@/utils/api";
import toast from "react-hot-toast";


const initialState = {
  stats: {
    users: 0,
    watchlist: 0,
    favorites: 0,
    watched: 0,
  },
  isLoading: false,
};


const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardStats.pending, (state) => {
        state.isLoading = true
      })

      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false
        state.stats.users = action.payload.users
        state.stats.watchlist = action.payload.watchlist
        state.stats.favorites = action.payload.favorites
        state.stats.watched = action.payload.watched
      })

      .addCase(getDashboardStats.rejected, (state) => {
        state.isLoading = false
      })
  },
})


export const getDashboardStats = createAsyncThunk(
  "getDashboardStats",
  async (_, { rejectWithValue }) => {

    const [
      usersResponse,
      watchlistResponse,
      favoritesResponse,
      watchedResponse,
    ] = await Promise.all([
      fetch(DB_USERS),
      fetch(DB_WATCHLIST),
      fetch(DB_FAVORITES),
      fetch(DB_WATCHEDMOVIES),
    ]);

    // Check all responses
    if (
      !usersResponse.ok ||
      !watchlistResponse.ok ||
      !favoritesResponse.ok ||
      !watchedResponse.ok
    ) {
      rejectWithValue(toast.error("Failed to fetch dashboard statistics"));
    }

    const [users, watchlist, favorites, watched] = await Promise.all([
      usersResponse.json(),
      watchlistResponse.json(),
      favoritesResponse.json(),
      watchedResponse.json(),
    ]);

    return {
      users: users.length,
      watchlist: watchlist.length,
      favorites: favorites.length,
      watched: watched.length,
    };

  }
)

export default dashboardSlice.reducer