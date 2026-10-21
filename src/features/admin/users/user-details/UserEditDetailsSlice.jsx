import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DB_USERS, getUser, simulateApiDelay } from "@/utils/api";
import toast from "react-hot-toast";

const initialState = {
  fullname: "",
  email: "",
  dateOfBirth: "",
  location: "",
  bio: "",
  role: "user",
  subscription: "free",
  status: false,
  preferredLanguage: "English",
  addToWatchlistNotification: false,
  addToFavoritesNotification: false,
  NewMovieNotification: false,
  profileImage: "",
  errors: {},
  isLoading: false,
  isSaving: false,
};

const userEditDetailsSlice = createSlice({
  name: "userEditDetails",
  initialState,
  reducers: {
    getFullname: (state, action) => {
      state.fullname = action.payload;
    },
    getEmail: (state, action) => {
      state.email = action.payload;
    },
    getDateOfBirth: (state, action) => {
      state.dateOfBirth = action.payload;
    },
    getLocation: (state, action) => {
      state.location = action.payload;
    },
    getBio: (state, action) => {
      state.bio = action.payload;
    },
    getRole: (state, action) => {
      state.role = action.payload;
    },
    getSubscription: (state, action) => {
      state.subscription = action.payload;
    },
    getStatus: (state, action) => {
      state.status = action.payload;
    },
    getPreferredLanguage: (state, action) => {
      state.preferredLanguage = action.payload;
    },
    getAddToWatchlistNotification: (state, action) => {
      state.addToWatchlistNotification = action.payload;
    },
    getAddToFavoritesNotification: (state, action) => {
      state.addToFavoritesNotification = action.payload;
    },
    getNewMovieNotification: (state, action) => {
      state.NewMovieNotification = action.payload;
    },
    getImage: (state, action) => {
      state.profileImage = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    resetEditUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder

      // GET USER
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;

        const user = action.payload;

        state.fullname = user.fullname || "";
        state.email = user.email || "";
        state.dateOfBirth = user.dateOfBirth || "";
        state.location = user.location || "";
        state.bio = user.bio || "";
        state.role = user.role || "User";
        state.subscription = user.subscription?.plan || "Free";
        state.status = user.status === "active";
        state.preferredLanguage = user.preferredLanguage || "English";
        state.addToWatchlistNotification = user.addToWatchlistNotification ?? true;
        state.addToFavoritesNotification = user.addToFavoritesNotification ?? true;
        state.NewMovieNotification = user.NewMovieNotification ?? true;
        state.profileImage = user.profileImg || "";
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.isLoading = false;
      })

      // UPDATE USER
      .addCase(updateUserInfo.pending, (state) => {
        state.isSaving = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isSaving = false;

        const user = action.payload;

        state.fullname = user.fullname || "";
        state.email = user.email || "";
        state.dateOfBirth = user.dateOfBirth || "";
        state.location = user.location || "";
        state.bio = user.bio || "";
        state.role = user.role || "User";
        state.subscription = user.subscription?.plan || "Free";
        state.status = user.status === "active";
        state.preferredLanguage = user.preferredLanguage || "English";
        state.addToWatchlistNotification = user.addToWatchlistNotification ?? true;
        state.addToFavoritesNotification = user.addToFavoritesNotification ?? true;
        state.NewMovieNotification = user.NewMovieNotification ?? true;
        state.profileImage = user.profileImg || "";
        state.errors = {};
      })
      .addCase(updateUserInfo.rejected, (state) => {
        state.isSaving = false;
      });
  },
});


export const getUserInfo = createAsyncThunk(
  "getUserInfo",

  async (id, { rejectWithValue }) => {
    try {
      await simulateApiDelay();

      const users = await getUser(id);
      if (!users.length) {
        return rejectWithValue("User not found");
      }

      return users[0];

    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to get user"
      );
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "updateUserInfo",

  async ({ id, newData }, { rejectWithValue }) => {
    try {
      await simulateApiDelay();

      const response = await fetch(`${DB_USERS}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: newData.fullname,
          email: newData.email,
          dateOfBirth: newData.dateOfBirth,
          location: newData.location,
          bio: newData.bio,
          role: newData.role,
          subscription: newData.subscription,
          status: newData.status ? "active" : "inactive",
          preferredLanguage: newData.preferredLanguage,
          watchlistUpdateNotification: newData.addToWatchlistNotification,
          favoritesUpdateNotification: newData.addToFavoritesNotification,
          newMovieReleaseNotification: newData.NewMovieNotification,
          profileImg: newData.profileImage || null,
        }),
      });

      if (!response.ok) { throw new Error("Failed to update user"); }

      const user = await response.json();
      return user;

    } catch (error) {
      toast.error("Failed to update user.");
      return rejectWithValue(error.message || "Failed to update user");
    }
  }
);


export const {
  getFullname,
  getEmail,
  getDateOfBirth,
  getLocation,
  getBio,
  getRole,
  getSubscription,
  getStatus,
  getPreferredLanguage,
  getAddToWatchlistNotification,
  getAddToFavoritesNotification,
  getNewMovieNotification,
  getImage,
  setErrors,
  clearErrors,
  resetEditUser,
} = userEditDetailsSlice.actions;


export default userEditDetailsSlice.reducer;