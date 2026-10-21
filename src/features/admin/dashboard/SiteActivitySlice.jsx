import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DB_SITE_ACTIVITY, getSiteActivities, simulateApiDelay } from "@/utils/api";


const initialState = {
  actions: [],
  isLoading: false,
};

export const activities = [
  {
    type: "new-user",
    icon: "UserPlus",
    iconClass: "bg-[#1a356c] text-[#5ca4ff]",
    title: "New user registered"
  },
  {
    type: "update-user",
    icon: "UserPen",
    iconClass: "bg-[#615019] text-[#ffda43]",
    title: "User data updated"
  },
  {
    type: "remove-user",
    icon: "UserMinus",
    iconClass: "bg-[#641d35] text-[#ff617e]",
    title: "User removed"
  },
  {
    type: "watchlist-add",
    icon: "Bookmark",
    iconClass: "bg-[#155642] text-[#4ee5a8]",
    title: "movie added to watchlist"
  },
  {
    type: "watchlist-remove",
    icon: "BookmarkOff",
    iconClass: "bg-[#155642] text-[#4ee5a8]",
    title: "movie removed from watchlist"
  },
  {
    type: "favorite-add",
    icon: "Heart",
    iconClass: "bg-[#155642] text-[#4ee5a8]",
    title: "movie added to favorites"
  },
  {
    type: "favorite-remove",
    icon: "HeartOff",
    iconClass: "bg-[#155642] text-[#4ee5a8]",
    title: "movie removed from favorites"
  }
];
const siteActivitySlice = createSlice({
  name: "siteActivity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getActivities.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getActivities.fulfilled, (state, action) => {
        state.isLoading = false
        state.actions = action.payload
      })
      .addCase(getActivities.rejected, (state) => {
        state.isLoading = false
      })


      .addCase(addActionToActivities.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addActionToActivities.fulfilled, (state, action) => {
        state.isLoading = false
        state.actions.push(action.payload)
      })
      .addCase(addActionToActivities.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const getActivities = createAsyncThunk(
  "getActivities",
  async () => {
    const data = await getSiteActivities()

    return data
  }
)


export const addActionToActivities = createAsyncThunk(
  "addActionToActivities",
  async (
    { email = "", name = "", movie = "", type },
    { rejectWithValue }
  ) => {
    await simulateApiDelay();

    try {
      const activity = activities.find(activity => activity.type === type);

      if (!activity)  return rejectWithValue(`Invalid activity type: ${type}`);
      
      let description = email;

      switch (type) {
        case "new-user":
        case "update-user":
        case "remove-user":
          description = email;
          break;

        case "watchlist-add":
        case "watchlist-remove":
        case "favorite-add":
        case "favorite-remove":
          description = `${movie} by ${name}`;
          break;

        default:
          return rejectWithValue(`Unsupported activity type: ${type}`);
      }

      const newAction = {
        title: activity.title,
        description,
        icon: activity.icon,
        iconClass: activity.iconClass,
        time: Date.now(),
      };

      const actionRes = await fetch(DB_SITE_ACTIVITY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAction),
      });

      if (!actionRes.ok)  return rejectWithValue( "Failed to add activity to database");
      

      return await actionRes.json();
    } catch (error) {
      return rejectWithValue( error.message || "An unexpected error occurred");
    }
  }
);




export default siteActivitySlice.reducer

//     title: "New user registered",
//     description: "john.doe@example.com",
//     time: "2 minutes ago",
//     icon: UserPlus,
//     iconClass: "bg-[#1a356c] text-[#5ca4ff]",