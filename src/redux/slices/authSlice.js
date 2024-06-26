import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialToken = localStorage.getItem('access_token');

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const token = await api.login(credentials);
      api.putAccessToken(token);
      const user = await api.getOwnProfile();
      return { token, user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      await api.register(userData);
      const registerToken = await api.login({
        email: userData.email,
        password: userData.password,
      });
      api.putAccessToken(registerToken);
      const user = await api.getOwnProfile();
      return { registerToken, user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (userId, { rejectWithValue }) => {
    try {
      const user = await api.getUser(userId);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: initialToken || null,
    isLoggedIn: !!initialToken,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => ({
      ...state,
      user: null,
      token: null,
      isLoggedIn: false,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null,
      }))
      .addCase(loginUser.fulfilled, (state, action) => ({
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
        status: 'succeeded',
      }))
      .addCase(loginUser.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.payload,
      }))
      .addCase(registerUser.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null,
      }))
      .addCase(registerUser.fulfilled, (state, action) => ({
        ...state,
        user: action.payload.user,
        token: action.payload.registerToken,
        isLoggedIn: true,
        status: 'succeeded',
      }))
      .addCase(registerUser.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.payload,
      }))
      .addCase(fetchUser.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null,
      }))
      .addCase(fetchUser.fulfilled, (state, action) => ({
        ...state,
        user: action.payload,
        status: 'succeeded',
      }))
      .addCase(fetchUser.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.payload,
      }));
  },
});

export const { logout } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
