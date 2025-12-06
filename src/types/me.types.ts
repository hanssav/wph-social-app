import { ApiResponse, ApiSuccess } from './api.types';
import { Post } from './post.types';
import { User, UserStats } from './user.types';

export type UserProfile = User & {
  bio: string | null;
  createdAt: string; // ISO date string
};

export type MePayload = {
  profile: UserProfile;
  stats: UserStats;
};

export type MeResponse = ApiSuccess<MePayload>;

// =============================
// GET POST ME RESPONSE
// =============================

export type GetPostMeResponse = ApiResponse<{ items: Post[] }>;
