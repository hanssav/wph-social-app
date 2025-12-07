import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OptimisticPost = {
  imageUrl: string;
  caption?: string;
};

type PostState = {
  post: OptimisticPost | null;
  isLoading: boolean;
};

const initialState: PostState = {
  post: null,
  isLoading: false,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (
      state,
      action: PayloadAction<{ post: OptimisticPost; isLoading: boolean }>
    ) => {
      state.post = action.payload.post;
      state.isLoading = action.payload.isLoading;
    },

    clearPost: (state) => {
      if (state.post?.imageUrl) {
        URL.revokeObjectURL(state.post.imageUrl);
      }
      state.post = null;
      state.isLoading = false;
    },
  },
});

export const { clearPost, setPost } = postSlice.actions;
const postReducer = postSlice.reducer;

export default postReducer;
