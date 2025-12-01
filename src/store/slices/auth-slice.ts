import { JwtToken, MePayload, User } from '@/types';
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
      localStorage.setItem('auth_token', action.payload);
    },
    setUser: (state, action: PayloadAction<MePayload>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;

      localStorage.removeItem('auth_token');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    hydrateToken: (state) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        state.token = token;
        state.isLoading = true;
      } else {
        state.isLoading = false;
      }
    },
  },
});

export const { setToken, setUser, logout, setLoading, hydrateToken } =
  authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
