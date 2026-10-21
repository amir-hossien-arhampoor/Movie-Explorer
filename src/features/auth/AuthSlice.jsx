import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { DB_USERS, getUsers } from "../../utils/api"
import getCurrentDate from "../../utils/date"
import generateUniqueId from "generate-unique-id"
import { simulateApiDelay } from "../../utils/api"
import toast from "react-hot-toast"
import { deleteUserAccount } from "@/features/setting/SettingSlice"

const logedInUser = localStorage.getItem("user")

const initialState = {
  currentUser: logedInUser ? JSON.parse(logedInUser) : null,
  isLoading: false,
  isAllowToUse: null,
  isSubscriptionOpen: false,
  isConfirmActionOpen: false,
}

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    allowDenied: (state) => {
      state.isAllowToUse = false
    },
    allowConfirm: (state) => {
      state.isAllowToUse = true
    },
    openSubscription: (state) => {
      state.isSubscriptionOpen = true
    },
    closeSubscription: (state) => {
      state.isSubscriptionOpen = false
    },
    openConfirmation: (state) => {
      state.isConfirmActionOpen = true
    },
    closeConfirmation: (state) => {
      state.isConfirmActionOpen = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkNewUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(checkNewUser.rejected, (state) => {
        state.isLoading = false
      })

      .addCase(signUpNewUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signUpNewUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentUser = action.payload
        localStorage.setItem("user", JSON.stringify(action.payload))
      })
      .addCase(signUpNewUser.rejected, (state) => {
        state.isLoading = false
      })

      .addCase(checkUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentUser = action.payload
        localStorage.setItem("user", JSON.stringify(action.payload))
      })
      .addCase(checkUser.rejected, (state) => {
        state.isLoading = false
      })

      .addCase(logOutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.isLoading = false
        state.currentUser = null
      })



      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.currentUser = null;
        state.isLoading = false;
        localStorage.removeItem("user");
      })

  }
})

export const checkNewUser = createAsyncThunk(
  "checkNewUser",
  async (newUser, { rejectWithValue }) => {
    await simulateApiDelay()

    const users = await getUsers()
    const isExistedUser = users.some(
      user => user.email === newUser.email
    )

    if (isExistedUser) return rejectWithValue(toast.error("An user with same info has already signed up!"))

    return newUser
  }
)

export const signUpNewUser = createAsyncThunk(
  "signInNewUser",
  async (newUser, { rejectWithValue }) => {
    await simulateApiDelay()
    const res = await fetch(DB_USERS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...newUser,
        role: "user",
        joined: getCurrentDate(),
        status: "active",
        userId: generateUniqueId({ length: 10 }),
        profileImg: "",
        bio: "",
        language: "english",
        subscription: {
          plan: "free",
          watchlist: 15,
          favorites: 15,
        },
        newMovieReleaseNotification: false,
        watchlistUpdateNotification: false,
        favoritesUpdateNotification: false,
      })
    })

    if (!res.ok) return rejectWithValue(toast.error("Failed to sign up , try again!"))

    const data = await res.json()
    return data

  }
)

export const checkUser = createAsyncThunk(
  "checkUser",
  async (newUser, { rejectWithValue }) => {
    await simulateApiDelay()
    const users = await getUsers()
    const isExistedUser = users.find(
      user => user.email === newUser.email
    )

    if (!isExistedUser) return rejectWithValue(toast.error("There is no user available with these details!"))

    if (isExistedUser.password !== newUser.password) return rejectWithValue(toast.error("Email or password is wrong!"))

    return isExistedUser

  }
)

export const logOutUser = createAsyncThunk(
  "logOutUser",
  async () => {
    await simulateApiDelay()
    localStorage.removeItem("user")

    return true
  }
)
export default AuthSlice.reducer