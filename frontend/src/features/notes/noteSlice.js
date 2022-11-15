import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import noteService from './noteService';
import { extractErrorMessage } from '../../utils';

const initialState = {
  notes: null,
};

// Get ticket Notes
export const getNotes = createAsyncThunk(
  'notes/getAll',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNotes(ticketId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error)); // payload
    }
  }
);

// Create ticket note
export const createNote = createAsyncThunk(
  'notes/create',
  async ({ noteText, ticketId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.createNote(noteText, ticketId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error)); // payload
    }
  }
);

const noteSlice = createSlice({
  name: 'note',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.notes = null;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
      })

      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
