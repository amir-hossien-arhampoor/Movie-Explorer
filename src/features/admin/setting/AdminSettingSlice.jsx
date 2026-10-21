import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DB_SITE_SETTINGS, simulateApiDelay } from "@/utils/api";
import toast from "react-hot-toast";



const initialState = {
  generalSettings: {
    sitename: "",
    sitedescription: "",
    logo: "",
    favicon: "",
    maintenancemode: false,
    adminEmail: "",
    websiteURL: "",
    facebookURL: "",
    twitterURL: "",
    instagramURL: ""
  },
  movieAndContentSettings: {
    moviesearch: true,
    addtowatchlist: true,
    addtofavorites: true,
    markaswatched: true,
    movierating: true,
    maxrating: 1,
    showmovierating: true,
    showreleasedate: true,
    defaultsortorder: "Newest",
  },
  userAndAccountSettings: {
    allownewuser: true,
    requireemailverfication: true,
    allowuserschangeemail: true,
    allowprofile: true,
    allowdeleteaccount: true,
    requirestrongpassword : true,
    passwordminimumlength: 8,
    allowpasswordreset: true,
  },
  isLoading: false,
  isUpdating: {
    general: false,
    movieAndContent: false,
    userAndAccount: false,
  },

};

const siteSettingsSlice = createSlice({
  name: "siteSettings",
  initialState,
  reducers: {
    setSiteName: (state, action) => {
      state.generalSettings.sitename = action.payload;
    },
    setDescription: (state, action) => {
      state.generalSettings.sitedescription = action.payload;
    },
    setLogo: (state, action) => {
      state.generalSettings.logo = action.payload;
    },
    setFavicon: (state, action) => {
      state.generalSettings.favicon = action.payload;
    },
    setIsMaintenance: (state,) => {
      state.generalSettings.maintenancemode = !state.generalSettings.maintenancemode;
    },
    setAdminEmail: (state, action) => {
      state.generalSettings.adminEmail = action.payload;
    },
    setSiteURL: (state, action) => {
      state.generalSettings.websiteURL = action.payload;
    },
    setFacebookURL: (state, action) => {
      state.generalSettings.facebookURL = action.payload;
    },
    setTwitterURL: (state, action) => {
      state.generalSettings.twitterURL = action.payload;
    },
    setInstagramURL: (state, action) => {
      state.generalSettings.instagramURL = action.payload;
    },


    enableMovieSearch: (state) => {
      state.movieAndContentSettings.moviesearch = !state.movieAndContentSettings.moviesearch;
    },
    enableAddToWatchlist: (state) => {
      state.movieAndContentSettings.addtowatchlist = !state.movieAndContentSettings.addtowatchlist;
    },
    enableAddToFavorites: (state) => {
      state.movieAndContentSettings.addtofavorites = !state.movieAndContentSettings.addtofavorites;
    },
    enableMarkAsWatched: (state) => {
      state.movieAndContentSettings.markaswatched = !state.movieAndContentSettings.markaswatched;
    },
    enableMovieRating: (state) => {
      state.movieAndContentSettings.movierating = !state.movieAndContentSettings.movierating;
    },
    setMaxRating: (state, action) => {
      state.movieAndContentSettings.maxrating = action.payload;
    },
    ShowMovieRating: (state) => {
      state.movieAndContentSettings.showmovierating = !state.movieAndContentSettings.showmovierating;
    },
    ShowReleaseDate: (state) => {
      state.movieAndContentSettings.showreleasedate = !state.movieAndContentSettings.showreleasedate;
    },
    setDefaultSortOrder: (state, action) => {
      state.movieAndContentSettings.defaultsortorder = action.payload;
    },


    AllowNewUser: (state) => {
      state.userAndAccountSettings.allownewuser = !state.userAndAccountSettings.allownewuser;
    },
    RequireEmailVerification: (state) => {
      state.userAndAccountSettings.requireemailverfication = !state.userAndAccountSettings.requireemailverfication;
    },
    AllowUsersChangeEmail: (state) => {
      state.userAndAccountSettings.allowuserschangeemail = !state.userAndAccountSettings.allowuserschangeemail;
    },
    AllowProfile: (state) => {
      state.userAndAccountSettings.allowprofile = !state.userAndAccountSettings.allowprofile;
    },
    AllowDeleteAccount: (state) => {
      state.userAndAccountSettings.allowdeleteaccount = !state.userAndAccountSettings.allowdeleteaccount;
    },
    RequireStrongPassword : (state) => {
      state.userAndAccountSettings.requirestrongpassword = !state.userAndAccountSettings.requirestrongpassword;
    },
    AllowPasswordReset: (state) => {
      state.userAndAccountSettings.allowpasswordreset = !state.userAndAccountSettings.allowpasswordreset;
    },
    setPasswordMinimumLength: (state, action) => {
      state.userAndAccountSettings.passwordminimumlength = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGeneralSettings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGeneralSettings.fulfilled, (state, action) => {
        state.isLoading = false

        if (action.payload) {
          state.generalSettings = {
            ...state.generalSettings,
            ...action.payload,


            maintenancemode:
              action.payload.maintenancemode ??
              action.payload.maintenanacemode ??
              false,
          }
        }
      })
      .addCase(getGeneralSettings.rejected, (state) => {
        state.isLoading = false
      })


      .addCase(updateGeneralSettings.pending, (state) => {
        state.isUpdating.general = true
      })
      .addCase(updateGeneralSettings.fulfilled, (state, action) => {
        state.isUpdating.general = false

        state.generalSettings = {
          ...state.generalSettings,
          ...action.payload,

          maintenancemode:
            action.payload.maintenancemode ??
            action.payload.maintenanacemode ??
            state.generalSettings.maintenancemode,
        }
      })
      .addCase(updateGeneralSettings.rejected, (state) => {
        state.isUpdating.general = false
      })



      .addCase(getMovieAndContentSettings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMovieAndContentSettings.fulfilled, (state, action) => {
        state.isLoading = false

        if (action.payload) {
          state.movieAndContentSettings = {
            ...state.movieAndContentSettings,
            ...action.payload,

          }
        }
      })
      .addCase(getMovieAndContentSettings.rejected, (state) => {
        state.isLoading = false
      })


      .addCase(updateMovieAndContentSettings.pending, (state) => {
        state.isUpdating.movieAndContent = true
      })
      .addCase(updateMovieAndContentSettings.fulfilled, (state, action) => {
        state.isUpdating.movieAndContent = false

        state.movieAndContentSettings = {
          ...state.movieAndContentSettings,
          ...action.payload,

        }
      })
      .addCase(updateMovieAndContentSettings.rejected, (state) => {
        state.isUpdating.movieAndContent = false
      })



      .addCase(getuserAndAccountSettings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getuserAndAccountSettings.fulfilled, (state, action) => {
        state.isLoading = false

        if (action.payload) {
          state.userAndAccountSettings = {
            ...state.userAndAccountSettings,
            ...action.payload,

          }
        }
      })
      .addCase(getuserAndAccountSettings.rejected, (state) => {
        state.isLoading = false
      })


      .addCase(updateuserAndAccountSettings.pending, (state) => {
        state.isUpdating.userAndAccount = true
      })
      .addCase(updateuserAndAccountSettings.fulfilled, (state, action) => {
        state.isUpdating.userAndAccount = false

        state.userAndAccountSettings = {
          ...state.userAndAccountSettings,
          ...action.payload,

        }
      })
      .addCase(updateuserAndAccountSettings.rejected, (state) => {
        state.isUpdating.userAndAccount = false
      })

  },
})

export const getGeneralSettings = createAsyncThunk(
  "getGeneralSettings",
  async (_, { rejectWithValue }) => {
    await simulateApiDelay()
    const response = await fetch(`${DB_SITE_SETTINGS}/?type=general`)

    if (!response.ok) {
      rejectWithValue(toast.error("Failed to fetch site generalSettings"))
    }

    const data = await response.json()
    return data[0] || null

  }
)
export const updateGeneralSettings = createAsyncThunk(
  "siteSettings/updateGeneralSettings",
  async ({ generalSettings }, { rejectWithValue }) => {
    await simulateApiDelay()

    const getResponse = await fetch(`${DB_SITE_SETTINGS}?type=general`)
    if (!getResponse.ok) rejectWithValue(toast.error("Failed to find general site settings"))

    const settings = await getResponse.json()
    if (!settings.length) rejectWithValue(toast.error("General site settings not found"))

    const generalSetting = settings[0]

    const response = await fetch(
      `${DB_SITE_SETTINGS}/${generalSetting.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sitename: generalSettings.sitename,
          sitedescription: generalSettings.sitedescription,
          logo: generalSettings.logo,
          favicon: generalSettings.favicon,
          maintenancemode: generalSettings.maintenancemode,
          supportemail: generalSettings.supportemail,
          websiteURL: generalSettings.websiteURL,
          facebookURL: generalSettings.facebookURL,
          twitterURL: generalSettings.twitterURL,
          instagramURL: generalSettings.instagramURL
        }),
      }
    )

    if (!response.ok) rejectWithValue(toast.error("Failed to update site general settings"))

    const data = await response.json()
    return data

  }
);


export const getMovieAndContentSettings = createAsyncThunk(
  "getMovieAndContentSettings",
  async (_, { rejectWithValue }) => {
    await simulateApiDelay()
    const response = await fetch(`${DB_SITE_SETTINGS}/?type=movieAndContent`)

    if (!response.ok) {
      rejectWithValue(toast.error("Failed to fetch site movie And content Settings"))
    }

    const data = await response.json()
    return data[0] || null

  }
)
export const updateMovieAndContentSettings = createAsyncThunk(
  "updateMovieAndContentSettings",
  async ({ movieAndContentSettings }, { rejectWithValue }) => {
    await simulateApiDelay()
    console.log(movieAndContentSettings)
    const getResponse = await fetch(`${DB_SITE_SETTINGS}?type=movieAndContent`)
    if (!getResponse.ok) rejectWithValue(toast.error("Failed to find movie And content settings"))

    const settings = await getResponse.json()
    if (!settings.length) rejectWithValue(toast.error("movie And content settings not found"))

    const movieAndContentSetting = settings[0]

    const response = await fetch(
      `${DB_SITE_SETTINGS}/${movieAndContentSetting.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moviesearch: movieAndContentSettings.moviesearch,
          addtowatchlist: movieAndContentSettings.addtowatchlist,
          addtofavorites: movieAndContentSettings.addtofavorites,
          markaswatched: movieAndContentSettings.markaswatched,
          movierating: movieAndContentSettings.movierating,
          maxrating: movieAndContentSettings.maxrating,
          showmovierating: movieAndContentSettings.showmovierating,
          showreleasedate: movieAndContentSettings.showreleasedate,
          defaultsortorder: movieAndContentSettings.defaultsortorder
        }),
      }
    )

    if (!response.ok) rejectWithValue(toast.error("Failed to update site movie And content settings"))

    const data = await response.json()
    return data

  }
);


export const getuserAndAccountSettings = createAsyncThunk(
  "getuserAndAccountSettings",
  async (_, { rejectWithValue }) => {
    await simulateApiDelay()
    const response = await fetch(`${DB_SITE_SETTINGS}/?type=userAndAccount`)

    if (!response.ok) {
      rejectWithValue(toast.error("Failed to fetch user And account Settings"))
    }

    const data = await response.json()
    return data[0] || null

  }
)
export const updateuserAndAccountSettings = createAsyncThunk(
  "updateuserAndAccountSettings",
  async ({ userAndAccountSettings }, { rejectWithValue }) => {
    await simulateApiDelay()

    const getResponse = await fetch(`${DB_SITE_SETTINGS}?type=userAndAccount`)
    if (!getResponse.ok) rejectWithValue(toast.error("Failed to find user And account settings"))

    const settings = await getResponse.json()
    if (!settings.length) rejectWithValue(toast.error("user And account settings not found"))

    const userAndAccountSetting = settings[0]

    const response = await fetch(
      `${DB_SITE_SETTINGS}/${userAndAccountSetting.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          allownewuser: userAndAccountSettings.allownewuser,
          requireemailverfication: userAndAccountSettings.requireemailverfication,
          allowuserschangeemail: userAndAccountSettings.allowuserschangeemail,
          allowuserschangeusername: userAndAccountSettings.allowuserschangeusername,
          allowprofile: userAndAccountSettings.allowprofile,
          allowdeleteaccount: userAndAccountSettings.allowdeleteaccount,
          requirestrongpassword: userAndAccountSettings.requirestrongpassword,
          passwordminimumlength: userAndAccountSettings.passwordminimumlength,
          allowpasswordreset: userAndAccountSettings.allowpasswordreset,
        }),
      }
    )

    if (!response.ok) rejectWithValue(toast.error("Failed to update user And account settings"))

    const data = await response.json()
    return data

  }
);

export const {
  setSiteName,
  setDescription,
  setLogo,
  setFavicon,
  setIsMaintenance,
  setAdminEmail,
  setSiteURL,
  setFacebookURL,
  setTwitterURL,
  setInstagramURL,
  enableMovieSearch,
  enableAddToWatchlist,
  enableAddToFavorites,
  enableMarkAsWatched,
  enableMovieRating,
  setMaxRating,
  ShowMovieRating,
  ShowReleaseDate,
  setDefaultSortOrder,
  AllowNewUser,
  RequireEmailVerification,
  AllowUsersChangeEmail,
  AllowProfile,
  AllowDeleteAccount,
  RequireStrongPassword,
  AllowPasswordReset,
  setPasswordMinimumLength,
} = siteSettingsSlice.actions;

export default siteSettingsSlice.reducer;