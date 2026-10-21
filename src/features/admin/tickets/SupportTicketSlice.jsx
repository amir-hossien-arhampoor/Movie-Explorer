import { DB_USERS_TICKET, getUsersTicket, simulateApiDelay } from "@/utils/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
  tickets: [],
  isLoading: false,
  isStatusChanging : false
}

const supportTicketSlice = createSlice({
  name: "supportTicket",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersTickets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUsersTickets.fulfilled, (state, action) => {
        state.isLoading = false
        state.tickets = action.payload
      })
      .addCase(getUsersTickets.rejected, (state) => {
        state.isLoading = false
      })

      .addCase(changeTicketStatus.pending, (state) => {
        state.isStatusChanging = true;
      })
      .addCase(changeTicketStatus.fulfilled, (state, action) => {
        state.isStatusChanging = false;

        const updatedTicket = action.payload;

        state.tickets = state.tickets.map((ticket) =>
          ticket.id === updatedTicket.id ? updatedTicket : ticket
        );
      })
      .addCase(changeTicketStatus.rejected, (state) => {
        state.isStatusChanging = false;
      });
  }
})

export const getUsersTickets = createAsyncThunk(
  "getUsersTickets",
  async (_, { rejectWithValue }) => {
    try {
      await simulateApiDelay()
      const ticketsRes = await getUsersTicket()

      if (!ticketsRes) {
        return rejectWithValue("Failed to load tickets.")
      }
      return await ticketsRes
    } catch (e) {
      return rejectWithValue(e.message || "Failed to load tickets.")
    }
  }
)

export const changeTicketStatus = createAsyncThunk(
  "changeTicketStatus",
  async ({ ticketId, status }, { rejectWithValue }) => {
    try {
      await simulateApiDelay();

      const response = await fetch(
        `${DB_USERS_TICKET}/${ticketId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        return rejectWithValue("Failed to update ticket status.");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to update ticket status."
      );
    }
  }
);
export default supportTicketSlice.reducer

