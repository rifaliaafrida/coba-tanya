import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import threadReducer from './slices/threadSlice';
import commentReducer from './slices/commentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadReducer,
    comments: commentReducer,
  },
});

export default store;
