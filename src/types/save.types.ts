import { ApiResponse } from './api.types';
import { Post } from './post.types';

export type SaveMutationResponse = ApiResponse<{ saved: boolean }>;

export type GetSavedResponse = ApiResponse<{ posts: Partial<Post>[] }>;
