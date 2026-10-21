import { DB_USERS, getUsers, simulateApiDelay } from "@/utils/api"
import getCurrentDate from "@/utils/date"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import generateUniqueId from "generate-unique-id"
import toast from "react-hot-toast"

const initialState = {
  users: [],
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "user",
  status: "active",
  subscription: "free",
  errors: {
    fullname: [],
    email: [],
    password: [],
    confirmPassword: []
  },
  showPassword: false,
  showConfirmPassword: false,
  isLoading: false
}

const usersManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    getFullName: (state, action) => {
      state.fullname = action.payload
    },
    getEmail: (state, action) => {
      state.email = action.payload
    },
    getPassword: (state, action) => {
      state.password = action.payload
    },
    getConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload
    },
    getUserRole: (state, action) => {
      state.role = action.payload
    },
    getUserStatus: (state, action) => {
      state.status = action.payload
    },
    getUserSubscription: (state, action) => {
      state.subscription = action.payload
    },
    setFormErrors: (state, action) => {
      state.errors = action.payload
    },
    toggleShowPassword: (state) => {
      state.showPassword = !state.showPassword
    },
    toggleShowConfirmPassword: (state) => {
      state.showConfirmPassword = !state.showConfirmPassword
    },
    clearInputs: (state) => {
      state.fullname = ""
      state.email = ""
      state.password = ""
      state.confirmPassword = ""
      state.errors = {}
    }

  },
  extraReducers: (builder) => {
    builder

      .addCase(getUsersData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUsersData.fulfilled, (state,action) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(getUsersData.rejected, (state) => {
        state.isLoading = false
      })


      .addCase(addNewUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewUser.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(addNewUser.rejected, (state) => {
        state.isLoading = false
      })


      .addCase(removeUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeUser.fulfilled, (state,action) => {
        state.isLoading = false
        state.users = state.users.filter(user => user.id !== action.payload.id)
      })
      .addCase(removeUser.rejected, (state) => {
        state.isLoading = false
      })


  }
})

export const getUsersData = createAsyncThunk(
  "getUsersData",
  async () => {
    await simulateApiDelay()

    const data = await getUsers()

    if (data.length === 0) toast.error("failed to load users!")

    return data
  }
)

export const addNewUser = createAsyncThunk(
  "addNewUser",
  async (newUser, { rejectWithValue }) => {
    await simulateApiDelay()

    const normalUserFeatures = newUser.role !== "admin" && {
      newMovieReleaseNotification: false,
      watchlistUpdateNotification: false,
      favoritesUpdateNotification: false,
    }
    const res = await fetch(DB_USERS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...newUser,
        joined: getCurrentDate(),
        userId: generateUniqueId({ length: 10 }),
        profileImg: "",
        bio: "",
        language: "english",
        normalUserFeatures
      })
    })

    if (!res.ok) return rejectWithValue(toast.error("Failed to sign up , try again!"))

    toast.success("New user added successfully!")
    const data = await res.json()
    return data

  }
)

export const removeUser = createAsyncThunk(
  "removeUser",
  async ({ user }, { rejectWithValue }) => {
    try {
      await simulateApiDelay();


      if (!user) {
        return rejectWithValue("user is not in database");
      }

      const removeMovie = await fetch(`${DB_USERS}/${user.id}`, {
        method: "DELETE",
      });

      if (!removeMovie.ok) {

        return rejectWithValue("Failed to remove user");
      }

      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export default usersManagementSlice.reducer

export const {
  getFullName,
  getEmail,
  getPassword,
  getConfirmPassword,
  getUserRole,
  getUserStatus,
  getUserSubscription,
  toggleShowPassword,
  toggleShowConfirmPassword,
  clearInputs,
  setFormErrors
} = usersManagementSlice.actions