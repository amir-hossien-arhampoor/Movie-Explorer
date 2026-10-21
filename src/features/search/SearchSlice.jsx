import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY, DB_RECENTSEARCH, getRecentSearch, simulateApiDelay } from "../../utils/api";
import toast from "react-hot-toast";



const initialState = {
  searchResults: [],
  similarMovies : [],
  recentSearches: [],
  isLoading: false,
  error: null,
  isAllowToAdd: null,
  query: ""
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    },
    allowDenied: (state) => {
      state.isAllowToAdd = false
    },
    clearSearch: (state) => {
      state.query = ""
    },
    setSearches: (state, action) => {
      state.recentSearches = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchResult.pending, (state) => {
        state.error = null
        state.isLoading = true
      })
      .addCase(searchResult.fulfilled, (state, action) => {
        state.isLoading = false
        state.searchResults = action.payload
      })
      .addCase(searchResult.rejected, (state, action) => {
        state.isLoading = false
        state.searchResults = []
        state.error = action.error.message
      })

      .addCase(getSimilarMovies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSimilarMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.similarMovies = action.payload
      })
      .addCase(getSimilarMovies.rejected, (state) => {
        state.isLoading = false
      })

      .addCase(addToRecentSearch.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToRecentSearch.fulfilled, (state, action) => {
        state.isLoading = false
        state.recentSearches = action.payload.searches
      })
      .addCase(addToRecentSearch.rejected, (state) => {
        state.isLoading = false
      })

      .addCase(removeRecentSearch.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeRecentSearch.fulfilled, (state, action) => {
        state.isLoading = false
        state.recentSearches = action.payload.searches
      })
      .addCase(removeRecentSearch.rejected, (state) => {
        state.isLoading = false
      })

      .addCase(removeAllRecentSearch.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeAllRecentSearch.fulfilled, (state) => {
        state.isLoading = false
        state.recentSearches = []
      })
      .addCase(removeAllRecentSearch.rejected, (state) => {
        state.isLoading = false
      })

      .addCase(getRecentSearches.fulfilled, (state, action) => {
        state.isLoading = false
        state.recentSearches = action.payload
      })

  }
})

export const searchResult = createAsyncThunk(
  "searchResult",
  async (query,{rejectWithValue}) => {
    if (query === "") return

    const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
    if (!res.ok) {
      return rejectWithValue(toast.error("Failed to fetch movies!"))
    }

    const data = await res.json()

    if (data.Response === "False") throw new Error(data.Error)
    return data.Search

  }
)

export const addToRecentSearch = createAsyncThunk(
  "addToRecentSearch",
  async ({ userId, query }) => {
    await simulateApiDelay()

    const res = await getRecentSearch(userId)
    const userInfo = res[0]
    const userSearches = userInfo?.searches

    if (!userInfo) {
      await fetch(DB_RECENTSEARCH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userId,
          searches: []
        })
      })

    }

    if (userSearches.includes(query)) {
      return userInfo
    } else {

      const updatedSearches = [
        query,
        ...userSearches
      ]

      const updateRes = await fetch(`${DB_RECENTSEARCH}/${userInfo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          searches: updatedSearches
        })

      })

      return await updateRes.json()
    }

  }
)

export const getRecentSearches = createAsyncThunk(
  "getRecentSearches",
  async (userId) => {
    const res = await getRecentSearch(userId)

    return res[0].searches
  }
)

export const removeRecentSearch = createAsyncThunk(
  "removeRecentSearch",
  async ({ userId, query },{rejectWithValue}) => {
    await simulateApiDelay()

    const res = await getRecentSearch(userId)
    const userInfo = res[0]


    if (!userInfo) {
      return null
    }

    const userSearches = userInfo.searches ?? []

    if (!userSearches.includes(query)) {
      return userInfo
    }

    const updatedSearches = userSearches.filter(
      search => search !== query
    )

    const updateRes = await fetch(
      `${DB_RECENTSEARCH}/${userInfo.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          searches: updatedSearches
        })
      }
    )

    if (!updateRes.ok) {
      return rejectWithValue(toast.error("Failed to remove recent search"))
    }
    toast.success(`"${query}" removed from recent searches successfully!`)
    return await updateRes.json()
  }
)

export const removeAllRecentSearch = createAsyncThunk(
  "removeAllRecentSearch",
  async ({ userId }) => {
    await simulateApiDelay()

    const res = await getRecentSearch(userId)
    const userInfo = res[0]
    console.log(res)

    if (!userInfo) {
      return null
    }

    if (userInfo.searches.length === 0) {
      toast.error("There are no recent searches to clear!")
      return
    }
    await fetch(
      `${DB_RECENTSEARCH}/${userInfo.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          searches: []
        })
      }
    )


    toast.success("Recent searches cleared successfully!")
  }
)

export const getSimilarMovies = createAsyncThunk(
  "getSimilarMovies",
  async ({query,imdbID},{dispatch}) => {
    const result = await dispatch(searchResult(query))
    const similarMovie = result.payload.filter(movie => movie.imdbID !== imdbID)

    return similarMovie
  }
)
export default searchSlice.reducer