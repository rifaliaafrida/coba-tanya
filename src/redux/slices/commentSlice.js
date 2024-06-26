import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ threadId, content }, { rejectWithValue }) => {
    try {
      const comment = await api.createComment({ id: threadId, content });
      return comment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Synchronous reducers can be added here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(createComment.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        data: [...state.data, action.payload],
      }))
      .addCase(createComment.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }));
  },
});

export const selectComments = (state) => state.comments;

export default commentSlice.reducer;
