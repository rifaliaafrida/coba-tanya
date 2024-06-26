import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Define initialState
const initialState = {
  data: [],
  detail: {
    loading: false,
    status: null,
    error: null,
    thread: null,
  },
  creating: {
    loading: false,
    error: null,
  },
  loading: false,
  status: null,
  error: null,
};

export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async (_, { rejectWithValue }) => {
    try {
      const threads = await api.getAllThreads();
      return threads;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const fetchThreadDetail = createAsyncThunk(
  'threads/fetchThreadDetail',
  async (id, { rejectWithValue }) => {
    try {
      const detailThread = await api.getDetailThread(id);
      return detailThread;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const createNewThread = createAsyncThunk(
  'threads/createNewThread',
  async (threadData, { rejectWithValue }) => {
    try {
      const newThread = await api.createThread(threadData);
      return newThread;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

const threadSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => ({
        ...state,
        loading: true,
        status: 'loading',
        error: null,
      }))
      .addCase(fetchThreads.rejected, (state, action) => ({
        ...state,
        loading: false,
        status: 'failed',
        error: action.payload,
      }))
      .addCase(fetchThreads.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        status: 'success',
        data: action.payload,
      }))
      .addCase(fetchThreadDetail.pending, (state) => ({
        ...state,
        detail: {
          ...state.detail,
          loading: true,
          status: 'loading',
          error: null,
        },
      }))
      .addCase(fetchThreadDetail.rejected, (state, action) => ({
        ...state,
        detail: {
          ...state.detail,
          loading: false,
          status: 'failed',
          error: action.payload,
        },
      }))
      .addCase(fetchThreadDetail.fulfilled, (state, action) => ({
        ...state,
        detail: {
          ...state.detail,
          loading: false,
          status: 'success',
          thread: action.payload,
        },
      }))
      .addCase(createNewThread.pending, (state) => ({
        ...state,
        creating: {
          ...state.creating,
          loading: true,
          error: null,
        },
      }))
      .addCase(createNewThread.rejected, (state, action) => ({
        ...state,
        creating: {
          ...state.creating,
          loading: false,
          error: action.payload,
        },
      }))
      .addCase(createNewThread.fulfilled, (state, action) => ({
        ...state,
        creating: {
          ...state.creating,
          loading: false,
        },
        data: [...state.data, action.payload],
      }));
  },
});

// Export the reducer
export default threadSlice.reducer;

// Export the selector function
export const selectThreadDetail = (state) => state.threads.detail.thread;
