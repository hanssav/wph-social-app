import { ApiSuccess, Pagination } from './api.types';
import { User } from './auth.types';

export type SearchUserParams = {
  q: string; // keyword (required)
  page?: number; // optional
  limit?: number; // optional
};

export type SearchUserResponse = ApiSuccess<{
  users: User[];
  pagination: Pagination;
}>;
