import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isDark : localStorage.getItem("theme") === "dark"
}

const themeSlice = createSlice({
  name :"theme",
  initialState,
  reducers : {
    darkModeToggle: (state) => {
      state.isDark = !state.isDark
    }
  }
})

export default themeSlice.reducer