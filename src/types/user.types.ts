import { ApiResponse, ApiSuccess, Pagination } from './api.types';
import { Post } from './post.types';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  avatarUrl: string | null;
};

export type SearchUserParams = {
  q: string; // keyword (required)
  page?: number; // optional
  limit?: number; // optional
};

export type SearchUserResponse = ApiSuccess<{
  users: User[];
  pagination: Pagination;
}>;

// ==================================
// GET POST FROM OTHERS BY USERNAME
// ==================================

export type GetPostsByUsernameParams = {
  username: string;
} & Partial<Pagination>;

export type GetPostsByUsernameResponse = ApiResponse<{ posts: Post[] }>;
