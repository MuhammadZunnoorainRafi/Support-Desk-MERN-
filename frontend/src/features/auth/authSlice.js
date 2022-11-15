import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils';
import authService from './authService';

//Get user form localStorage
const user = JSON.parse(localStorage.getItem('user'));
const initialState = {
  user: user ? user : null,

  isLoading: false,
};

//Register new user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user); // payload
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error)); // payload
    }
  }
);

//Login new user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user); // payload
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error)); // payload
  }
});

//Logout user
export const logout = createAction('auth/logout', () => {
  authService.logout();

  return {};
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //Register States
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
       
        state.user = action.payload;
     
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
       
      })

      //Login states
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
       
        state.user = action.payload;

      })
      .addCase(login.rejected, (state) => {
       
        state.isLoading = false;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
