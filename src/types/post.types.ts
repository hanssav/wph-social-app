import { ApiResponse } from './api.types';

export type CreatePostFormData = {
  /** The image file - required, max 5MB, JPG/PNG/WEBP */
  image: File;

  /** Caption - can be empty string */
  caption?: string;
};

export type Author = {
  id: number;
  username: string;
  name: string;
  avatarUrl: string | null;
};

export type Post = {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt: string; // ISO date string
  author: Author;
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
  shareCount: number;
};

export type CreatePostResponse = ApiResponse<Post>;
