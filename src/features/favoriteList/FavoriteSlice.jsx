import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DB_WATCHLIST, simulateApiDelay, API_KEY, DB_FAVORITES, getUser, getFavorites, getWatched } from "../../utils/api";
import toast from "react-hot-toast";
import { SUBSCRIPTION_LIMITS } from "@/utils/UsersRoles";



const initialState = {
  favoritesMovies: [],
  favoritesWatchedMovie: [],
  currentMovie: {},
  favoriteIsLoading: false,
  isPageLoading: false,
  searchQuery: "",
  sortValue: ""
}

const favoritesSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    popUpStart: (state) => {
      state.popUpStatus = true
    },
    popUpEnd: (state) => {
      state.popUpStatus = false
    },
    searchFavorite: (state, action) => {
      state.searchQuery = action.payload
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload
    },
    clearFilter: (state) => {
      state.searchQuery = ""
    }


  },
  extraReducers: (builder) => {
    builder
      // fetchMovieById
      .addCase(fetchMovieById.pending, (state) => {
        state.isPageLoading = true
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.isPageLoading = false
        state.currentMovie = action.payload

      })
      .addCase(fetchMovieById.rejected, (state) => {
        state.isPageLoading = false
      })

      // addToFavorites
      .addCase(addToFavorites.pending, (state) => {
        state.favoriteIsLoading = true
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.favoriteIsLoading = false

        if (!action.payload) return

        const exists = state.favoritesMovies.some(
          movie => movie.imdbID === action.payload.imdbID
        )

        if (!exists) {
          state.favoritesMovies.push(action.payload)
        }
      })
      .addCase(addToFavorites.rejected, (state) => {
        state.favoriteIsLoading = false
      })

      // removeFromFavorites
      .addCase(removeFromFavorites.pending, (state) => {
        state.favoriteIsLoading = true
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.favoriteIsLoading = false
        state.favoritesMovies = state.favoritesMovies.filter(
          movie => movie.imdbID !== action.payload.imdbID
        );
        state.favoritesWatchedMovie = state.favoritesWatchedMovie.filter(
          movie => movie.imdbID !== action.payload.imdbID
        );
      })
      .addCase(removeFromFavorites.rejected, (state) => {
        state.favoriteIsLoading = false
      })

      // getFavorite
      .addCase(getFavorite.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFavorite.fulfilled, (state, action) => {
        state.isLoading = false
        state.favoritesMovies = action.payload
      })

      // getFavoritesWatchedMovie
      .addCase(getFavoritesWatchedMovie.pending, (state) => {
        state.ratingIsLoading = true
      })
      .addCase(getFavoritesWatchedMovie.fulfilled, (state, action) => {
        state.ratingIsLoading = false
        state.favoritesWatchedMovie = action.payload

      })
      .addCase(getFavoritesWatchedMovie.rejected, (state) => {
        state.ratingIsLoading = false
      })

      .addCase(removeAllFromFavorites.fulfilled, (state) => {
        state.favoritesMovies = []
        state.favoritesWatchedMovie = []
      })

  }
})

export const fetchMovieById = createAsyncThunk(
  "getMovieId",
  async ({ movieId, userId }) => {
    const [omdbRes, watchedRes] = await Promise.all([
      fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`),

      fetch(
        `${DB_WATCHLIST}?imdbID=${movieId}&userId=${userId}`
      )
    ]);

    if (!omdbRes.ok) {
      throw new Error("Failed to fetch the movie!");
    }

    const movie = await omdbRes.json();
    const watchedMovies = await watchedRes.json();

    const watchedMovie = watchedMovies[0];

    return {
      ...movie,
      ratingNumber: watchedMovie?.ratingNumber ?? 0
    };
  }
);

export const addToFavorites = createAsyncThunk(
  "addToFavorites",
  async ({ movie, userId, id }, { dispatch }) => {
    await simulateApiDelay()

    const user = await getUser(id)
    const userFavorites = await getFavorites(userId)

    const plan = user[0]?.subscription?.plan ?? "free";

    const limit = SUBSCRIPTION_LIMITS[plan].favorites ?? 15

    if (userFavorites.length >= limit) {
      dispatch({ type: "auth/openSubscription" })
      throw new Error
    }
    const movieExisted = await fetch(`${DB_FAVORITES}/?imdbID=${movie.imdbID}&userId=${userId}`)
    const movieExistResult = await movieExisted.json()


    if (movieExistResult && movieExistResult.length > 0) {
      toast.error("Movie already included in favorites!")
      return

    } else {
      const res = await fetch(DB_FAVORITES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...movie, userId: userId })
      })

      if (!res.ok) {
        toast.error("Failed to add movie to favorites!")
        return
      }

      toast.success("Movie added to favorites successfully!")
      return await res.json()
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  "removeFromFavorites",
  async ({ imdbID, userId }, { rejectWithValue }) => {
    try {
      await simulateApiDelay();

      const res = await fetch(
        `${DB_FAVORITES}/?imdbID=${imdbID}&userId=${userId}`
      );

      if (!res.ok) {
        
        return rejectWithValue(toast.error("Failed to find favorite movie"));
      }

      const movies = await res.json();
      const movie = movies[0];

      if (!movie) {
        
        return rejectWithValue(toast.error("Movie is not in favorites"));
      }

      const removeMovie = await fetch(`${DB_FAVORITES}/${movie.id}`, {
        method: "DELETE",
      });

      if (!removeMovie.ok) {
        
        return rejectWithValue(toast.error("Failed to remove movie from favorites"));
      }

      toast.success("Movie removed from favorites successfully!");

      return movie;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getFavorite = createAsyncThunk(
  "getFavorite",
  async ({ userId }) => {
    const res = await fetch(`${DB_FAVORITES}/?userId=${userId}`)
    const data = await res.json()
    return data
  }
)

export const getFavoritesWatchedMovie = createAsyncThunk(
  "getFavoritesWatchedMovie",
  async ({ userId }) => {
    const watchedMovies = await getWatched(userId)
    const res = await fetch(`${DB_FAVORITES}/?userId=${userId}`)
    const data = await res.json()
    const movies = data.filter(movie =>
      watchedMovies.some(favorite => favorite.imdbID === movie.imdbID)
    )
    return movies
  }
)

export const removeAllFromFavorites = createAsyncThunk(
  "removeAllFromFavorites",
  async ({ userId }) => {
    await simulateApiDelay()
    const res = await fetch(`${DB_FAVORITES}/?&userId=${userId}`)
    const movies = await res.json()

    if (movies.length === 0) {
      toast.error("No movies found to remove from favorites!")
      return
    }
    const removeRes = await Promise.all(
      movies.map(movie => fetch(`${DB_FAVORITES}/${movie.id}`, {
        method: "DELETE",
      }))
    )
    const removeStat = removeRes.every(movie => movie.ok === false)

    if (removeStat) {
      toast.error("Failed to remove movie from favorites")
      return
    }

    toast.success("All movies removed from favorites successfully!")

  }
)
export default favoritesSlice.reducer