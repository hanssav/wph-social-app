import { apiInstance } from '@/api';
import { FeedResponse, GetFeedParams } from '@/types';

export const feedService = {
  get: async (params?: GetFeedParams): Promise<FeedResponse> => {
    const { data } = await apiInstance.get<FeedResponse>('/feed', { params });
    return data;
  },
};
