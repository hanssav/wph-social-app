import { apiInstance } from '@/api';
import {
  CommentListParams,
  CommentListResponse,
  CreateCommentResponse,
} from '@/types';

export const commentService = {
  get: async (params: CommentListParams): Promise<CommentListResponse> => {
    const { data } = await apiInstance.get<CommentListResponse>(
      `/posts/${params.id}/comments`,
      { params }
    );
    return data;
  },

  add: async (params: {
    id: number;
    text: string;
  }): Promise<CreateCommentResponse> => {
    const { data } = await apiInstance.post<CreateCommentResponse>(
      `/posts/${params.id}/comments`,
      { text: params.text }
    );
    return data;
  },
};
