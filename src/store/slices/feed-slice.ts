import { Post } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FeedState = {
  post: Post | null;
};

const initialState: FeedState = {
  post: null,
};
export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post>) => {
      state.post = action.payload;
    },

    clearPost: (state) => {
      state.post = null;
    },
  },
});

export const { clearPost, setPost } = feedSlice.actions;
const feedReducer = feedSlice.reducer;

export default feedReducer;
