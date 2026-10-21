import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  email: "",
  password: "",
  errors: {},
  showPassword: false
}

const logInSlice = createSlice({
  name: "login",
  initialState,
  reducers: {

    getEmail: (state, action) => {
      state.email = action.payload
    },
    getPassword: (state, action) => {
      state.password = action.payload
    },
    setFormErrors: (state, action) => {
      state.errors = action.payload
    },
    toggleShowPassword: (state) => {
      state.showPassword = !state.showPassword
    },
    clearInputs: (state) => {
      state.email = ""
      state.password = ""
      state.errors = {}
    }

  }
})

export default logInSlice.reducer