import { ApiResponse, Pagination } from './api.types';
import { Post } from './post.types';

export type GetFeedParams = {
  /** Current page (1-based) */
  page?: number;
  /** Number of items per page */
  limit?: number;
};

export type FeedResponse = ApiResponse<{
  items: Post[];
  pagination: Pagination;
}>;
