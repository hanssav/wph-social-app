import { ApiSuccess, Pagination } from './api.types';
import { Author } from './post.types';

export type Comment = {
  id: number;
  text: string;
  createdAt: string;
  author: Author;
  isMine: boolean;
};

export type CreateCommentResponse = ApiSuccess<{ text: string }>;

export type CommentListParams = {
  id: number;
  page?: number;
  limit?: number;
};

export type CommentListResponse = ApiSuccess<{
  comments: Comment[];
  pagination: Pagination;
}>;
