import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { checkMovieAsWatched, DB_WATCHEDMOVIES ,simulateApiDelay} from "../../utils/api"
import { getFavoritesWatchedMovie } from "@/features/favoriteList/FavoriteSlice"
import toast from "react-hot-toast"


const initialState = {
  isLoading: false,
  currentWatchedMovie: {}
}

const watchedMovie = createSlice({
  name: "watchedMovie",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getWatchedMovie.pending, state => {
        state.isLoading = true
      })
      .addCase(getWatchedMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentWatchedMovie = action.payload
      })

      .addCase(addToWatchedMovies.pending, state => {
        state.isLoading = true
      })
      .addCase(addToWatchedMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentWatchedMovie = action.payload
      })
  }
})

export const addToWatchedMovies = createAsyncThunk(
  "addToWatchedMovies",
  async ({ userId, imdbID, Title }, { rejectWithValue, dispatch }) => {
    await simulateApiDelay()

    const movieExisted = await fetch(
      `${DB_WATCHEDMOVIES}?imdbID=${imdbID}&userId=${userId}`
    )

    const movieExistResult = await movieExisted.json()

    if (movieExistResult.length > 0) {
      
      return rejectWithValue(toast.error("Movie already marked as watched!"))
    }

    const res = await fetch(DB_WATCHEDMOVIES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Title,
        imdbID,
        userId,
      }),
    })

    if (!res.ok) {
      
      return rejectWithValue(toast.error("Failed to mark movie as watched!"))
    }

    const data = await res.json()

    await dispatch(
      getFavoritesWatchedMovie({
        userId,
      })
    )

    return data
  }
)

export const getWatchedMovie = createAsyncThunk(
  "getWatchedMovie",
  async ({ userId, imdbID }) => {
    const res = await checkMovieAsWatched({ userId: userId, imdbID: imdbID })

    if (res.length > 0) return res[0]
    return
  }
)

export const removeAllFromWatched = createAsyncThunk(
  "removeAllFromWatched",
  async ({userId}) => {
    await simulateApiDelay()
    const res = await fetch(`${DB_WATCHEDMOVIES}/?&userId=${userId}`)
    const movies = await res.json()

    if (movies.length === 0) {
      toast.error("No movies found to remove from Watched movies!")
      return
    }
    const removeRes = await Promise.all(
      movies.map(movie => fetch(`${DB_WATCHEDMOVIES}/${movie.id}`, {
      method: "DELETE",
    }))
    )
    const removeStat = removeRes.every(movie => movie.ok === false)

    if (removeStat) {
      toast.error("Failed to remove watched movies")
      return
    }

    toast.success("All watched movies removed successfully!")

  }
)
export default watchedMovie.reducer