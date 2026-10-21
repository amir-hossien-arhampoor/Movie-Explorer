import { DB_USERS, simulateApiDelay } from "@/utils/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
  currentSection: "",
  newMovies: false,
  watchlistUpdates: false,
  favoriteUpdates: false,
  isLoading: false
}

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSection: (state, action) => {
      state.currentSection = action.payload
    },

  },
  extraReducers: (builder) => {
    builder

      .addCase(userNotificationUpdate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(userNotificationUpdate.fulfilled, (state, action) => {
        state.isLoading = false

        const { actionType, value } = action.payload

        if (actionType === "newMovies") {
          state.newMovies = value
        }

        if (actionType === "watchlistUpdates") {
          state.watchlistUpdates = value
        }

        if (actionType === "favoriteUpdates") {
          state.favoriteUpdates = value
        }
      })
      .addCase(userNotificationUpdate.rejected, (state) => {
        state.isLoading = false
      })

      .addCase(getUserNotificationStats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserNotificationStats.fulfilled, (state, action) => {
        state.isLoading = false
        state.newMovies = action.payload.newMovies
        state.watchlistUpdates = action.payload.watchlistUpdates
        state.favoriteUpdates = action.payload.favoriteUpdates
  
      })
      .addCase(getUserNotificationStats.rejected, (state) => {
        state.isLoading = false
      })

      .addCase(deleteUserAccount.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.isLoading = false
        localStorage.removeItem("user")
      })
      .addCase(deleteUserAccount.rejected, (state) => {
        state.isLoading = false
      })
    }
})

export const userNotificationUpdate = createAsyncThunk(
  "userNotificationUpdate",
  async ({ userId, actionType }, { rejectWithValue }) => {
    try {
      const usersRes = await fetch(`${DB_USERS}/?userId=${userId}`)

      if (!usersRes.ok) {
        throw new Error("Failed to fetch user")
      }

      const users = await usersRes.json()

      if (!users.length) {
        throw new Error("User not found")
      }

      const user = users[0]

      const notificationMap = {
        newMovies: "newMovieReleaseNotification",
        watchlistUpdates: "watchlistUpdateNotification",
        favoriteUpdates: "favoritesUpdateNotification",
      }

      const field = notificationMap[actionType]

      if (!field) {
        throw new Error("Invalid notification type")
      }

      const newValue = !user[field]

      const response = await fetch(`${DB_USERS}/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [field]: newValue,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update notification")
      }

      return {
        actionType,
        value: newValue,
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const getUserNotificationStats = createAsyncThunk(
  "getUserNotificationStats",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const usersRes = await fetch(`${DB_USERS}/?userId=${userId}`)

      if (!usersRes.ok) {
        throw new Error("Failed to fetch user notifications")
      }

      const users = await usersRes.json()

      if (!users.length) {
        throw new Error("User not found")
      }

      const user = users[0]

      return {
        newMovies: user.newMovieReleaseNotification,
        watchlistUpdates: user.watchlistUpdateNotification,
        favoriteUpdates: user.favoritesUpdateNotification,
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteUserAccount = createAsyncThunk(
  "deleteUserAccount",
  async ({ id }, { rejectWithValue }) => {
    
    try {
      await simulateApiDelay()
      const removeRes = await fetch(`${DB_USERS}/${id}`, {
        method: "DELETE",
      })

      if (!removeRes.ok) return rejectWithValue("Failed to delete your account.")
      return {id}
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred."
      )
    }
  }
)
export default settingSlice.reducer