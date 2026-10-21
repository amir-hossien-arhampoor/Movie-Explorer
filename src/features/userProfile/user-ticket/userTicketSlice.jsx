import { DB_USERS_TICKET, getUsersTicket, simulateApiDelay } from "@/utils/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
  tickets: [],
  form: {
    category: "bug",
    subject: "",
    description: "",
    priority: "medium",
    affectedPage: "",
    stepsToReproduce: "",
    expectedBehavior: "",
    actualBehavior: "",
    proposedImprovement: "",
    problemToSolve: "",
    accountIssue: "account_access",
  },
  errors: {},
  isLoading: false,
  isReplying: false,
}

const userTicketSlice = createSlice({
  name: "userTicket",
  initialState,
  reducers: {
    getCategory: (state, action) => {
      state.form.category = action.payload
    },
    getSubject: (state, action) => {
      state.form.subject = action.payload
    },
    getDescription: (state, action) => {
      state.form.description = action.payload
    },
    getPriority: (state, action) => {
      state.form.priority = action.payload
    },
    getAffectedPage: (state, action) => {
      state.form.affectedPage = action.payload
    },
    setStepsToReproduce: (state, action) => {
      state.form.stepsToReproduce = action.payload
    },
    setExpectedBehavior: (state, action) => {
      state.form.expectedBehavior = action.payload
    },
    setActualBehavior: (state, action) => {
      state.form.actualBehavior = action.payload
    },
    setProposedImprovement: (state, action) => {
      state.form.proposedImprovement = action.payload
    },
    setProblemToSolve: (state, action) => {
      state.form.problemToSolve = action.payload
    },
    setAccountIssue: (state, action) => {
      state.form.accountIssue = action.payload
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    clearErrors: (state) => {
      state.errors = {}
    },
    clearInputs: (state) => {
      state.form.category = "bug"
      state.form.subject = ""
      state.form.description = ""
      state.form.priority = "medium"
      state.form.affectedPage = ""
      state.form.stepsToReproduce = ""
      state.form.expectedBehavior = ""
      state.form.actualBehavior = ""
      state.form.proposedImprovement = ""
      state.form.problemToSolve = ""
      state.form.accountIssue = "account_access"
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.tickets.push(action.payload)
      })
      .addCase(addNewTicket.rejected, (state) => {
        state.isLoading = false
      })


      .addCase(getUserTickets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserTickets.fulfilled, (state, action) => {
        state.isLoading = false
        state.tickets = action.payload
      })
      .addCase(getUserTickets.rejected, (state) => {
        state.isLoading = false
      })



      .addCase(addNewReply.pending, (state) => {
        state.isReplying = true;

      })
      .addCase(addNewReply.fulfilled, (state, action) => {
        state.isReplying = false;

        const updatedTicket = action.payload;

        const index = state.tickets.findIndex(
          (ticket) => ticket.id === updatedTicket.id
        );

        if (index !== -1) {
          state.tickets[index] = updatedTicket;
        }
      })
      .addCase(addNewReply.rejected, (state) => {
        state.isReplying = false;
      });

  }
})

export const addNewTicket = createAsyncThunk(
  "addNewTicket",
  async ({ newTicket }, { rejectWithValue }) => {
    try {
      await simulateApiDelay()

      const allTickets = await getUsersTicket()
      if (!allTickets) {
        return rejectWithValue("Failed to fetch tickets")
      }

      const isTicketExisted = allTickets.some(ticket => {
        ticket.subject.trim().toLowerCase() === newTicket.subject.trim().toLowerCase() &&
          ticket.description.trim().toLowerCase() === newTicket.description.trim().toLowerCase()
      })
      if (isTicketExisted) {
        return rejectWithValue("A ticket with the same subject and description already exists.")
      }

      const addTicketRes = await fetch(DB_USERS_TICKET, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTicket)
      })

      if (!addTicketRes.ok) {
        return rejectWithValue("Failed to add new ticket.")
      }

      const data = await addTicketRes.json()

      return data
    } catch (error) {
      return rejectWithValue(
        error.message || "An unexpected error occurred."
      )
    }

  }
)

export const getUserTickets = createAsyncThunk(
  "getUserTickets",
  async ({ userId }, { rejectWithValue }) => {
    await simulateApiDelay()

    const allTickets = await getUsersTicket()
    if (!allTickets) {
      return rejectWithValue("Failed to fetch tickets")
    }

    const userTickets = allTickets.filter(ticket => ticket.userId === userId)

    if (userTickets.length === 0) {
      return rejectWithValue("No tickets found.")
    }

    return userTickets
  }
)

export const addNewReply = createAsyncThunk(
  "addNewReply",
  async ({ ticket, newReply }, { rejectWithValue }) => {
    try {
      await simulateApiDelay()

      if (!ticket.id) {
        return rejectWithValue("Ticket ID required.")
      } else if (!newReply) {
        return rejectWithValue("User information required.")
      }

      const messages = Array.isArray(ticket.messages)
        ? ticket.messages
        : []

      const messageUpdateRes = await fetch(`${DB_USERS_TICKET}/${ticket.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [...messages, newReply],
        })
      })

      if (!messageUpdateRes.ok) {
        return rejectWithValue("Failed to add new Reply to conversation.")
      }

      return await messageUpdateRes.json()
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add new Reply to conversation.")
    }
  }

)
export default userTicketSlice.reducer

export const {
  getCategory,
  getSubject,
  getDescription,
  getPriority,
  getAffectedPage,
  setStepsToReproduce,
  setExpectedBehavior,
  setActualBehavior,
  setProposedImprovement,
  setProblemToSolve,
  setAccountIssue,
  clearErrors,
  setErrors,
  clearInputs
} = userTicketSlice.actions