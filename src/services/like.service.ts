import { apiInstance } from '@/api';
import {
  AddLikeApiResponse,
  LikesPostApiResponse,
  LikeListPostParams,
} from '@/types/like.types';
import { id } from 'zod/v4/locales';

export const likeService = {
  getByPostId: async (params: {
    postId: number;
    page?: number;
    limit?: number;
  }) => {
    const { postId, page = 1, limit = 20 } = params;
    const { data } = await apiInstance.get<LikesPostApiResponse>(
      `/posts/${postId}/likes`,
      { params: { page, limit } }
    );
    return data;
  },
  add: async (id: number): Promise<AddLikeApiResponse> => {
    const { data } = await apiInstance.post<AddLikeApiResponse>(
      `/posts/${id}/like`
    );
    return data;
  },
  delete: async (id: number): Promise<AddLikeApiResponse> => {
    const { data } = await apiInstance.delete<AddLikeApiResponse>(
      `/posts/${id}/like`
    );
    return data;
  },
};
