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

export type UserStats = {
  posts: number;
  followers: number;
  following: number;
  likes: number;
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

type Username = string;

// ==================================
// GET USER BY USERNAME
// ==================================
export type GetUsernameParams = { username: Username };

export type UserWithStats = {
  counts: UserStats;
  bio: string;
  isFollowing: boolean;
  isMe: boolean;
} & User;

export type GetUsernameResponse = ApiResponse<UserWithStats>;

// ============================================================================
// GET POST FROM OTHERS BY USERNAME || GET LIKED POST FROM OTHERS BY USERNAME
// ============================================================================

export type GetPostsByUsernameParams = {
  username?: Username;
} & Partial<Pagination>;

export type GetPostsByUsernameResponse = ApiResponse<{
  posts: Post[];
  pagination: Pagination;
}>;

// ====================================================================
// GET FOLLOWERS | GET FOLLOWING BY USERNAME
// ====================================================================

export type GetFollowParams = Partial<Pick<Pagination, 'page' | 'limit'>> & {
  username: string;
};

export type GetFollowResponse = ApiResponse<{
  users: { isFollowedByMe: boolean } & Pick<
    User,
    'id' | 'name' | 'avatarUrl' | 'username'
  >[];
  pagination: Pagination;
}>;

type FollowData = NonNullable<GetFollowResponse['data']>;
export type FollowUser = FollowData['users'][number];
