import { apiInstance } from '@/api';
import { GetPostMeResponse, MeResponse, Pagination } from '@/types';

export const meServices = {
  me: async (): Promise<MeResponse> => {
    const { data } = await apiInstance.get<MeResponse>('/me');
    return data;
  },
  mePost: async (params?: Partial<Pagination>): Promise<GetPostMeResponse> => {
    const { data } = await apiInstance.get<GetPostMeResponse>(`/me/posts`, {
      params,
    });
    return data;
  },
};
