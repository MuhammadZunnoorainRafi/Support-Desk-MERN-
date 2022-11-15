import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils';
import ticketService from './ticketService';

const initialState = {
  tickets: null,
  ticket: null,
};

// Create Ticket
export const createTicket = createAsyncThunk(
  'ticket/authCreateTicket',
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.createTicket(ticketData, token); //payload
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error)); // payload
    }
  }
);

// Get tickets
export const getTickets = createAsyncThunk(
  'ticket/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTickets(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error)); // payload
    }
  }
);

// Get Ticket
export const getTicket = createAsyncThunk(
  'tickets/get',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTicket(ticketId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error)); // payload
    }
  }
);

// Close Ticket
export const closeTicket = createAsyncThunk(
  'tickets/close',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.closeTicket(ticketId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error)); // payload
    }
  }
);

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,

  extraReducers: (builder) => {
    builder

      .addCase(getTickets.pending, (state) => {
        state.ticket = null;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.tickets = action.payload;
      })

      .addCase(getTicket.fulfilled, (state, action) => {
        state.ticket = action.payload;
      })

      .addCase(closeTicket.fulfilled, (state, action) => {
        state.ticket = action.payload;

        state.tickets = state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? (ticket.status = action.payload)
            : ticket
        );
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
