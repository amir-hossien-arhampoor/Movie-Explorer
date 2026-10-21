import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DB_USERS_NOTIFICATIONS, simulateApiDelay } from "@/utils/api";


const initialState = {
  notifications: [],
  isLoading: false,
  isAdding: false,
  isUpdating: false,
  isRemoving : false
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch notifications
      .addCase(getUserNotifications.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserNotifications.fulfilled, (state, action) => {
        state.isLoading = false
        state.notifications = action.payload
      })
      .addCase(getUserNotifications.rejected, (state) => {
        state.isLoading = false
      })


      // Add notification
      .addCase(addNewNotification.pending, (state) => {
        state.isAdding = true
      })
      .addCase(addNewNotification.fulfilled, (state, action) => {
        state.isAdding = false

        const exists = state.notifications.some((notification) => notification.id === action.payload.id)

        if (!exists) {
          state.notifications.unshift(action.payload)
        }
      })
      .addCase(addNewNotification.rejected, (state) => {
        state.isAdding = false
      })


      // Mark one notification as read
      .addCase(markNotificationAsRead.pending, (state) => {
        state.isUpdating = true
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.isUpdating = false

        const updatedNotifications = state.notifications.map(notification => {
          return notification.id === action.payload.id ? 
            {...notification,isRead : true} : notification
        })

        state.notifications = updatedNotifications
      })
      .addCase(markNotificationAsRead.rejected, (state) => {
        state.isUpdating = false
      })


      // Mark all notifications as read
      .addCase(markAllNotificationsAsRead.pending, (state) => {
        state.isUpdating = true
      })
      .addCase(markAllNotificationsAsRead.fulfilled, (state, action) => {
        state.isUpdating = false

        const updatedNotifications = new Map(action.payload.map((notification) => [notification.id, notification]))

        state.notifications = state.notifications.map((notification) => updatedNotifications.get(notification.id) || notification)
      })
      .addCase(markAllNotificationsAsRead.rejected, (state) => {
        state.isUpdating = false
      })


      // Remove notification 
      .addCase(removeUserNotification.pending, (state) => {
        state.isRemoving = true
      })
      .addCase(removeUserNotification.fulfilled, (state, action) => {
        state.isRemoving = false

        state.notifications = state.notifications.filter(notification => notification.id !== action.payload)
      })
      .addCase(removeUserNotification.rejected, (state) => {
        state.isRemoving = false
      })
  },
})

// Get all notifications belonging to one user
export const getUserNotifications = createAsyncThunk(
  "getUserNotifications",
  async ({ userId, newMovieReleaseNotification }, { rejectWithValue }) => {
    try {
      await simulateApiDelay();

      if (!userId) {
        return rejectWithValue("User ID is required.");
      }

      const requests = [ fetch(`${DB_USERS_NOTIFICATIONS}?userId=${userId}`)];

      if (newMovieReleaseNotification) {
        requests.push(
          fetch(`${DB_USERS_NOTIFICATIONS}?userId=admin`)
        );
      }

      const responses = await Promise.all(requests);

      if (responses.some((res) => !res.ok)) {
        return rejectWithValue("Failed to fetch notifications.");
      }

      const [userRes, byAdminRes] = await Promise.all( responses.map((res) => res.json()));

      const allNotifications = [
        ...userRes,
        ...(newMovieReleaseNotification ? byAdminRes : []),
      ].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      return allNotifications;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch notifications."
      );
    }
  }
);

// Add a new notification
export const addNewNotification = createAsyncThunk(
  "addNewNotification",
  async ({newNotification}, { rejectWithValue }) => {
    try {
      await simulateApiDelay()

      if (!newNotification?.userId) {
        return rejectWithValue("User ID is required.")
      }

      const notification = {
        ...newNotification,
        isRead: false,
        createdAt: Date.now(),
      }

      const response = await fetch(DB_USERS_NOTIFICATIONS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notification),
      })

      if (!response.ok) {
        return rejectWithValue("Failed to create notification.")
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to create notification."
      )
    }
  }
)

// Mark one notification as read
export const markNotificationAsRead = createAsyncThunk(
  "markNotificationAsRead",
  async ({ notificationId }, { rejectWithValue }) => {
    try {
      await simulateApiDelay()

      const response = await fetch(
        `${DB_USERS_NOTIFICATIONS}/${notificationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isRead: true }),
        }
      )

      if (!response.ok) {
        return rejectWithValue("Failed to update notification.")
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to update notification."
      )
    }
  }
)

// Mark all notifications belonging to a user as read
export const markAllNotificationsAsRead = createAsyncThunk(
  "markAllNotificationsAsRead",
  async ({ userId }, { rejectWithValue }) => {
    try {
      await simulateApiDelay()

      if (!userId) {
        return rejectWithValue("User ID is required.");
      }

      const response = await fetch(`${DB_USERS_NOTIFICATIONS}?userId=${userId}`)

      if (!response.ok) {
        return rejectWithValue("Failed to fetch notifications.")
      }

      const notifications = await response.json()
      console.log(response)
      const unreadNotifications = notifications.filter((notification) => !notification.isRead)

      const results = await Promise.all(
        unreadNotifications.map(async (notification) => {
          const updateResponse = await fetch(
            `${DB_USERS_NOTIFICATIONS}/${notification.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ isRead: true }),
            }
          )

          if (!updateResponse.ok) {
            throw new Error(
              `Failed to update notification ${notification.id}.`
            )
          }

          return await updateResponse.json();
        })
      )

      return results;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to mark notifications as read."
      )
    }
  }
);

// Remove notification 
export const removeUserNotification = createAsyncThunk(
  "removeUserNotification",
  async ({ notificationId }, { rejectWithValue }) => {
    try {
      await simulateApiDelay()

      if (!notificationId) {
        return rejectWithValue("notification ID required.")
      }

      const removeRes = await fetch(`${DB_USERS_NOTIFICATIONS}/${notificationId}`,{
        method : "DELETE"
      })

      if (!removeRes.ok) {
        return rejectWithValue("Failed to remove this notification.")
      }

      return notificationId
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to remove this notification."
      )
    }
  }
)


export default notificationSlice.reducer
