import { ApiSuccess } from './api.types';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  avatarUrl: string | null;
};

export type JwtToken = string;

export type AuthPayload = {
  token: JwtToken;
  user: User;
};

export type RegisterRequest = {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

// SAME response Register & Login
export type AuthResponse = ApiSuccess<AuthPayload>;
