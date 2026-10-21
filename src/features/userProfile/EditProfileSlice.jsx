import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { DB_USERS, getUser, simulateApiDelay } from "../../utils/api"
import toast from "react-hot-toast"


const initialState = {
  fullname: "",
  email: "",
  bio: "",
  language: "",
  imageUrl : "",
  errors: {},
  isLoading: false,
}

const editProfileSlice = createSlice({
  name: "editProfile",
  initialState,
  reducers: {
    getFullname: (state, action) => {
      state.fullname = action.payload
    },
    getEmail: (state, action) => {
      state.email = action.payload
    },
    getBio: (state, action) => {
      state.bio = action.payload
    },
    getLanguage: (state, action) => {
      state.language = action.payload
    },
    getImage: (state, action) => {
      state.imageUrl = action.payload
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false
        state.fullname = action.payload.fullname
        state.email = action.payload.email
        state.bio = action.payload.bio
        state.language = action.payload.language
      })

      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false
        localStorage.setItem("user",JSON.stringify(action.payload))      
      })    
      .addCase(updateUserInfo.rejected, (state) => {
        state.isLoading = false
      })
    }
})

export const getUserInfo = createAsyncThunk(
  "getUserInfo",
  async (id) => {
    await simulateApiDelay()

    const users = await getUser(id)
    if (!users.length) {
      throw new Error("User not found")
    }

    return users[0]
  }
)

export const updateUserInfo = createAsyncThunk(
  "updateUserInfo",
  async ({ id, newData }) => {
    await simulateApiDelay()

    const res =await fetch(`${DB_USERS}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullname: newData.fullname,
        email: newData.email,
        bio: newData.bio,
        language : newData.language,
        // profileImg : newData.imageUrl
      })
    })

    if (!res.ok) {
      toast.error("Failed to update your profile!")
    }

    const user = await res.json()
    return user

  }
)
export default editProfileSlice.reducer