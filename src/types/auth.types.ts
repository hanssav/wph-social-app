import { ApiSuccess } from './api.types';
import { User } from './user.types';

export type JwtToken = string;

export type AuthPayload = {
  token: JwtToken;
  user: User;
};

// SAME response Register & Login
export type AuthResponse = ApiSuccess<AuthPayload>;
