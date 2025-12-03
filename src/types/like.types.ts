import { ApiResponse, Pagination } from './api.types';
import { User } from './auth.types';

// ============================
// ADD like / DELETE like
// ============================

export type AddLikeApiResponse = ApiResponse<{
  liked: boolean;
  likeCount: number;
}>;

// ============================
// List like by post id
// ============================

export type LikeListPostParams = { page?: number; id?: number; limit?: number };

export type UserLike = {
  isFollowedByMe: boolean;
  isMe: boolean;
  followsMe: boolean;
} & User;

export type LikesPostApiResponse = ApiResponse<{
  users: UserLike[];
  pagination: Pagination;
}>;
