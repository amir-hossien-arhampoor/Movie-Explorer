import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TMDB_TOKEN } from "@/utils/api";

const initialState = {
  isLoading: false,
  actors: []
}

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMovieActors.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMovieActors.fulfilled, (state, action) => {
        state.actors = action.payload
      })
  }
})


export const getMovieActors = createAsyncThunk(
  "getMovieActors",
  async ({actors}) => {
    const results = await Promise.all(
      actors.map(async (actor) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(actor)}`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_TOKEN}`,
              accept: "application/json",
            },
          }
        );

        const data = await response.json();

        const person = data.results?.[0];

        return {
          name: actor,
          image: person?.profile_path
            ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
            : null
        };
      })
    );

    return results;
  }
)
export default movieDetailsSlice.reducer