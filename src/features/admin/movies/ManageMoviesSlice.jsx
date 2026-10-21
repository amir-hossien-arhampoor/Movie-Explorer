import { DB_FEATUREDMOVIES, DB_POPULARMOVIES, DB_TOPRATEDMOVIES, getFeaturedMovies, getPopularMovies, getTopRatedMovies, simulateApiDelay } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const initialState = {
  popularMovies: [],
  featuredMovies: [],
  topRatedMovies: [],
  isLoading: false

};

const manageMoviesSlice = createSlice({
  name: "manageMovies",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMoviesData.fulfilled, (state, action) => {
        state.isLoading = false
        state.popularMovies = action.payload.popularMovies
        state.featuredMovies = action.payload.featuredMovies
        state.topRatedMovies = action.payload.topRatedMovies
      })
      .addCase(getMoviesData.rejected, (state) => {
        state.isLoading = false
      })

      .addCase(removeFromSelectedSection.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeFromSelectedSection.fulfilled, (state, action) => {
        const removedMovie = action.payload.data;


        if (action.payload.name === "popular") {
          state.popularMovies = state.popularMovies.filter(
          movie => movie.id !== removedMovie.id
        );
        } else if (action.payload.name === "featured") {
          state.featuredMovies = state.featuredMovies.filter(
          movie => movie.id !== removedMovie.id
        );
        } else if (action.payload.name === "topRated") {
          state.topRatedMovies = state.topRatedMovies.filter(
          movie => movie.id !== removedMovie.id
        );
        }

      })
      .addCase(removeFromSelectedSection.rejected, (state) => {
        state.isLoading = false
      })

      .addCase(addToSelectedSection.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToSelectedSection.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload.name === "popular") {
          state.popularMovies.push(action.payload.data)
        } else if (action.payload.name === "featured") {
          state.featuredMovies.push(action.payload.data)
        } else if (action.payload.name === "topRated") {
          state.topRatedMovies.push(action.payload.data)
        }
      })
      .addCase(addToSelectedSection.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const getMoviesData = createAsyncThunk(
  "getMoviesData",
  async (_, { rejectWithValue }) => {
    await simulateApiDelay()

    const [popularMovies, featuredMovies, topRatedMovies] = await Promise.all([
      getPopularMovies(),
      getFeaturedMovies(),
      getTopRatedMovies()
    ])

    if (
      !popularMovies ||
      !featuredMovies ||
      !topRatedMovies
    ) {
      return rejectWithValue("Failed to fetch dashboard statistics");
    }

    return {
      popularMovies,
      featuredMovies,
      topRatedMovies
    }
  }
)

export const removeFromSelectedSection = createAsyncThunk(
  "removeFromSelectedSection",
  async ({ imdbID, section }, { rejectWithValue }) => {
    try {
      await simulateApiDelay();

      const selectedSectionURL =
        section === "popular" ? DB_POPULARMOVIES :
          section === "featured" ? DB_FEATUREDMOVIES :
            section === "topRated" ? DB_TOPRATEDMOVIES : ""
      const res = await fetch(
        `${selectedSectionURL}/?imdbID=${imdbID}`
      );

      if (!res.ok) {
        return rejectWithValue("Failed to find the movie")
      }

      const movies = await res.json()
      const movie = movies[0]

      if (!movie) {
        return rejectWithValue("Movie is not in popular movies")
      }

      const removeMovie = await fetch(`${selectedSectionURL}/${movie.id}`, {
        method: "DELETE",
      });

      if (!removeMovie.ok) {

        return toast.error("Failed to remove movie from popular movies")
      }


      return {
        name: section,
        data: await removeMovie.json()
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const addToSelectedSection = createAsyncThunk(
  "addToSelectedSection",
  async ({ movie, section }, { rejectWithValue }) => {
    await simulateApiDelay()

    const selectedSectionURL =
      section === "popular" ? DB_POPULARMOVIES :
        section === "featured" ? DB_FEATUREDMOVIES :
          section === "topRated" ? DB_TOPRATEDMOVIES : ""


    const movieExisted = await fetch(`${selectedSectionURL}?imdbID=${movie.imdbID}`)
    const movieExistResult = await movieExisted.json()


    if (movieExistResult && movieExistResult.length > 0) {
      toast.error(`Movie already included in ${section} movies!`)
      return rejectWithValue(`Movie already included in ${section} movies!`)

    } else {
      const res = await fetch(selectedSectionURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...movie,
        })
      })

      if (!res.ok) {
        toast.error(`Failed to add movie to ${section} movies!`)
        return
      }

      return {
        name: section,
        data: await res.json()
      }
    }
  }
)

export default manageMoviesSlice.reducer;