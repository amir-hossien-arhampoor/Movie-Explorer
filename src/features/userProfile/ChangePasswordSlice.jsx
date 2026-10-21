import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { DB_USERS, getUser, simulateApiDelay } from "../../utils/api"
import toast from "react-hot-toast"


const initialState = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
  showCurrentPassword: false,
  showNewPassword: false,
  showConfirmPassword: false,
  isLoading: false,
  errors: {},
  newPasswordRules: {
    IsLong: false,
    IsIncludeNumber: false
  }
}

const editPasswordSlice = createSlice({
  name: "editPassword",
  initialState,
  reducers: {
    getCurrentPassword: (state, action) => {
      state.currentPassword = action.payload
    },
    getNewPassword: (state, action) => {
      state.newPassword = action.payload
    },
    getConfirmNewPassword: (state, action) => {
      state.confirmNewPassword = action.payload
    },
    showCurrentPassword: (state) => {
      state.showCurrentPassword = !state.showCurrentPassword
    },
    showNewPassword: (state) => {
      state.showNewPassword = !state.showNewPassword
    },
    showConfirmPassword: (state) => {
      state.showConfirmPassword = !state.showConfirmPassword
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    setNewPasswordRules: (state, action) => {
      const errors = action.payload.newPassword || [];

      state.newPasswordRules = {
        IsLong: !errors.some(error =>
          error.includes("8 characters")
        ) || false,

        IsIncludeNumber: !errors.some(error =>
          error.includes("number")
        ) || false,
      };
    },
    clearInputs: (state) => {
      state.currentPassword = ""
        state.newPassword = ""
        state.confirmNewPassword = ""
        state.errors = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkCurrentPassword.pending,(state) => {
        state.isLoading = true
        state.errors.currentPassword = ""
      })
      .addCase(checkCurrentPassword.fulfilled,(state) => {
        state.isLoading = false
      })
      .addCase(checkCurrentPassword.rejected,(state,action) => {
        state.isLoading = false
        state.errors.currentPassword = action.payload
      })
  }
})

export const checkCurrentPassword = createAsyncThunk(
  "checkCurrentPassword",
  async ({ id, currentPassword },{rejectWithValue}) => {
    try {
      await simulateApiDelay()

      const user = await getUser(id)
      console.log(user[0].password)
      if (user[0].password !== currentPassword) throw new Error("Current password is wrong!")
      
      return 

    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const updateUserPassword = createAsyncThunk(
  "updateUserPassword",
  async ({id, newPassword}) => {
      await simulateApiDelay()

      const data = await fetch(`${DB_USERS}/${id}`,{
        method : "PATCH",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          password : newPassword
        })
      })
      console.log(data)
      if (!data.ok) {
        toast.error("Failed to update your password!")
        return
      }
      
      toast.success("Password updated successfully!")  
  }
)
export default editPasswordSlice.reducer