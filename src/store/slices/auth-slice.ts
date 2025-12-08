import { cookieHelpers } from '@/lib/cookies';
import { JwtToken, MePayload } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  user: MePayload | null;
  token: JwtToken | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<JwtToken>) => {
      state.token = action.payload;
      cookieHelpers.set(action.payload);
    },
    setUser: (state, action: PayloadAction<MePayload>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    updateUser: (state, action: PayloadAction<Partial<MePayload>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
          profile: {
            ...state.user.profile,
            ...action.payload.profile,
          },
          stats: action.payload.stats || state.user.stats,
        };
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      cookieHelpers.remove();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    hydrateToken: (state) => {
      const token = cookieHelpers.get();
      if (token) {
        state.token = token;
        state.isLoading = true;
      } else {
        state.isLoading = false;
      }
    },
  },
});

export const { setToken, setUser, updateUser, logout, setLoading, hydrateToken } =
  authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
