import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchThreads = createAsyncThunk(
  "threads/fetchThreads",
  async (_, { rejectWithValue }) => {
    try {
      const threads = await api.getAllThreads();
      return threads;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchThreadDetail = createAsyncThunk(
  "threads/fetchThreadDetail",
  async (id, { rejectWithValue }) => {
    try {
      const detailThread = await api.getDetailThread(id);
      return detailThread;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const createNewThread = createAsyncThunk(
  "threads/createNewThread",
  async (threadData, { rejectWithValue }) => {
    try {
      const newThread = await api.createThread(threadData);
      return newThread;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const threadSlice = createSlice({
  name: "threads",
  initialState: {
    data: [],
    detail: {
      thread: null,
      loading: false,
      error: null,
      status: null,
    },
    creating: {
      loading: false,
      error: null,
    },
    loading: false,
    error: null,
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchThreadDetail.pending, (state) => {
        state.detail.loading = true;
        state.detail.status = "loading";
        state.detail.error = null;
      })
      .addCase(fetchThreadDetail.rejected, (state, action) => {
        state.detail.loading = false;
        state.detail.status = "failed";
        state.detail.error = "Failed to fetch thread detail.";
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.detail.loading = false;
        state.detail.status = "success";
        state.detail.thread = action.payload;
      })

      .addCase(createNewThread.pending, (state) => {
        state.creating.loading = true;
        state.creating.error = null;
      })
      .addCase(createNewThread.fulfilled, (state, action) => {
        state.creating.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createNewThread.rejected, (state, action) => {
        state.creating.loading = false;
        state.creating.error = action.payload;
      });
  },
});

export const selectThreads = (state) => state.threads.data;
export const selectThreadDetail = (state) => state.threads.detail;
export const selectCreatingThreadLoading = (state) =>
  state.threads.creating.loading;
export const selectCreatingThreadError = (state) =>
  state.threads.creating.error;
export const selectThreadsLoading = (state) => state.threads.loading;
export const selectThreadsError = (state) => state.threads.error;

export default threadSlice.reducer;
