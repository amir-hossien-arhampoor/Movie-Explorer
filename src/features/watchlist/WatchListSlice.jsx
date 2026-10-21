import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DB_WATCHLIST, simulateApiDelay, API_KEY, getUser, getWatchList, getFavorites } from "../../utils/api";
import toast from "react-hot-toast";
import { SUBSCRIPTION_LIMITS } from "@/utils/UsersRoles";
import { addToFavorites, removeFromFavorites } from "../favoriteList/FavoriteSlice";

const initialState = {
  watchListMovies: [],
  favoriteWatchlistMovies: [],
  currentMovie: {},
  isLoading: false,
  ratingIsLoading: false,
  isPageLoading: false,
  isInWatchlist: false,
  error: null,
  searchQuery: "",
  sortValue: ""
}

const watchListSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    popUpStart: (state) => {
      state.popUpStatus = true
    },
    popUpEnd: (state) => {
      state.popUpStatus = false
    },
    searchWatchlist: (state, action) => {
      state.searchQuery = action.payload
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload
    },
    clearFilter: (state) => {
      state.searchQuery = ""
    },
  },
  extraReducers: (builder) => {
    builder
      // addToWatchlist
      .addCase(addToWatchlist.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToWatchlist.fulfilled, (state) => {
        state.isLoading = false
        state.isInWatchlist = true
      })
      .addCase(addToWatchlist.rejected, (state) => {
        state.isLoading = false
      })

      // removeFromWatchlist
      .addCase(removeFromWatchlist.pending, () => {
        
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        const removedMovie = action.payload;

        state.watchListMovies = state.watchListMovies.filter(
          movie => movie.id !== removedMovie.id
        );

        state.favoriteWatchlistMovies =
          state.favoriteWatchlistMovies.filter(
            movie => movie.imdbID !== removedMovie.imdbID
          );
      })
      .addCase(removeFromWatchlist.rejected, () => {
        
      })

      // getWatched
      .addCase(getWatchlist.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getWatchlist.fulfilled, (state, action) => {
        state.isLoading = false
        state.watchListMovies = action.payload
      })


      // fetchMovieById
      .addCase(fetchMovieById.pending, (state) => {
        state.isPageLoading = true
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.isPageLoading = false
        state.currentMovie = action.payload
        localStorage.setItem("currentMovie", JSON.stringify(action.payload))
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.isPageLoading = false
        state.error = action.error.message
      })

      // isExistedInWatchList
      .addCase(isExistedInWatchList.pending, (state) => {
        state.isLoading = true
        state.isInWatchlist = false
      })
      .addCase(isExistedInWatchList.fulfilled, (state, action) => {
        state.isLoading = false
        state.isInWatchlist = action.payload
      })

      // addRatingToMovie
      .addCase(addRatingToMovie.pending, (state) => {
        state.ratingIsLoading = true
      })
      .addCase(addRatingToMovie.fulfilled, (state, action) => {
        state.ratingIsLoading = false
        state.currentMovie = action.payload

      })
      .addCase(addRatingToMovie.rejected, (state) => {
        state.ratingIsLoading = false
      })

      // getfavoriteWatchlistMovies
      .addCase(getfavoriteWatchlistMovies.pending, (state) => {
        state.ratingIsLoading = true
      })
      .addCase(getfavoriteWatchlistMovies.fulfilled, (state, action) => {
        state.ratingIsLoading = false
        state.favoriteWatchlistMovies = action.payload

      })
      .addCase(getfavoriteWatchlistMovies.rejected, (state) => {
        state.ratingIsLoading = false
      })

      // addToFavorites
      .addCase(addToFavorites.fulfilled, (state, action) => {
        const movie = action.payload;

        if (!movie) return;

        const isInWatchlist = state.watchListMovies.some(
          item => item.imdbID === movie.imdbID
        );

        if (!isInWatchlist) return;

        const alreadyExists = state.favoriteWatchlistMovies.some(
          item => item.imdbID === movie.imdbID
        );

        if (!alreadyExists) {
          state.favoriteWatchlistMovies = [...state.favoriteWatchlistMovies,movie]
        }
      })

      // removeFromFavorites
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        const { imdbID } = action.payload;

        state.favoriteWatchlistMovies =
          state.favoriteWatchlistMovies.filter(
            movie => movie.imdbID !== imdbID
          );
      })
  }
})

export const addToWatchlist = createAsyncThunk(
  "addToWatchList",
  async ({ movie, userId, id }, { dispatch }) => {
    await simulateApiDelay()

    const user = await getUser(id)
    const userWatchlist = await getWatchList(userId)
    const plan = user[0]?.subscription?.plan ?? "free";

    const limit = SUBSCRIPTION_LIMITS[plan].watchlist ?? 15

    if (userWatchlist.length >= limit) {
      dispatch({ type: "auth/openSubscription" })
      return
    }


    const movieExisted = await fetch(`${DB_WATCHLIST}?imdbID=${movie.imdbID}&userId=${userId}`)
    const movieExistResult = await movieExisted.json()


    if (movieExistResult && movieExistResult.length > 0) {
      toast.error("Movie already included in watchedlist!")
      return
    } else {
      const res = await fetch(DB_WATCHLIST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...movie,
          userId: userId,
          ratingNumber: 0,
          addedAt: Date.now()
        })
      })

      if (!res.ok) {
        toast.error("Failed to add movie to watchlist!")
        return
      }


      return toast.success("Movie added to watchlist successfully!")
    }
  }
)

export const removeFromWatchlist = createAsyncThunk(
  "removeFromWatchList",
  async ({ imdbID, userId }, { rejectWithValue }) => {
    try {
      await simulateApiDelay();

      const res = await fetch(
        `${DB_WATCHLIST}/?imdbID=${imdbID}&userId=${userId}`
      );

      if (!res.ok) {    
        return rejectWithValue(toast.error("Failed to find the movie"));
      }

      const movies = await res.json();
      const movie = movies[0];

      if (!movie) {
        return rejectWithValue(toast.error("Movie is not in watchlist"));
      }

      const removeMovie = await fetch(`${DB_WATCHLIST}/${movie.id}`, {
        method: "DELETE",
      });

      if (!removeMovie.ok) {
        
        return rejectWithValue(toast.error("Failed to remove movie from watchlist"));
      }

      toast.success("Movie removed from watchlist successfully!");

      return movie;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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

export const isExistedInWatchList = createAsyncThunk(
  "isExistedInWatchList",
  async (movie) => {
    const response = await fetch(`${DB_WATCHLIST}?imdbID=${movie.imdbID}`)

    if (!response.ok) {
      throw new Error("Failed to check watchlist")
    }

    const data = await response.json()

    return data.length > 0
  }
)

export const getWatchlist = createAsyncThunk(
  "getWatchlist",
  async ({ userId }) => {
    const res = await fetch(`${DB_WATCHLIST}/?userId=${userId}`)
    const data = await res.json()
    return data
  }
)

export const getfavoriteWatchlistMovies = createAsyncThunk(
  "getfavoriteWatchlistMovies",
  async ({ userId }) => {
    const favoritesMovies = await getFavorites(userId)
    const res = await fetch(`${DB_WATCHLIST}/?userId=${userId}`)
    const data = await res.json()
    const movies = data.filter(movie =>
      favoritesMovies.some(favorite => favorite.imdbID === movie.imdbID)
    )
    return movies
  }
)

export const addRatingToMovie = createAsyncThunk(
  "addRatingToMovie",
  async ({ movieId, userId, rating }) => {
    await simulateApiDelay()

    const response = await fetch(`${DB_WATCHLIST}?imdbID=${movieId}&userId=${userId}`);
    const selectedMovie = await response.json();

    const res = await fetch(`${DB_WATCHLIST}/${selectedMovie[0].id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ratingNumber: rating
        })
      }
    );

    if (!res.ok) {
      toast.error("Failed to add your rating to movie!");
      return
    }

    const data = await res.json();
    toast.success("new Rating added to movie successfully!")
    return data

  }
)

export const removeAllFromWatchlist = createAsyncThunk(
  "removeAllFromWatchlist",
  async ({ userId }) => {
    await simulateApiDelay()
    const res = await fetch(`${DB_WATCHLIST}/?&userId=${userId}`)
    const movies = await res.json()

    if (movies.length === 0) {
      toast.error("No movies found to remove from watchlist!")
      return
    }
    const removeRes = await Promise.all(
      movies.map(movie => fetch(`${DB_WATCHLIST}/${movie.id}`, {
        method: "DELETE",
      }))
    )
    const removeStat = removeRes.every(movie => movie.ok === false)

    if (removeStat) {
      toast.error("Failed to remove movie from watchlist")
      return
    }

    toast.success("All movies removed from watchlist successfully!")

  }
)

export default watchListSlice.reducer