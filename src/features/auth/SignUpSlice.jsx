import { createSlice } from "@reduxjs/toolkit"

const signUpState = {
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
  isPolicyAccepted: false,
  errors: {},
  showPassword: false
}

const signUpSlice = createSlice({
  name: "signUp",
  initialState: signUpState,
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
    getIsPolicyAccepted: (state, action) => {
      state.isPolicyAccepted = action.payload
    },
    setFormErrors: (state, action) => {
      state.errors = action.payload
    },
    toggleShowPassword: (state) => {
      state.showPassword = !state.showPassword
    },
    clearInputs: (state) => {
      state.fullname = ""
      state.email = ""
      state.password = ""
      state.confirmPassword = ""
      state.errors = {}
    }

  }
})

export default signUpSlice.reducer