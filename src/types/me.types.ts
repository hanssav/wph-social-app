import { User } from './auth.types';

export type UserProfile = User & {
  bio: string | null;
  createdAt: string; // ISO date string
};

export type UserStats = {
  posts: number;
  followers: number;
  following: number;
  likes: number;
};

export type MePayload = {
  profile: UserProfile;
  stats: UserStats;
};

export type MeResponse = ApiSuccess<MePayload>;
