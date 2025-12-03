import { apiInstance } from '@/api';
import { FollowApiResponse, FollowReqParams } from '@/types';

export const followService = {
  add: async (
    username?: FollowReqParams['username']
  ): Promise<FollowApiResponse> => {
    const { data } = await apiInstance.post<FollowApiResponse>(
      `/follow/${username}`
    );

    return data;
  },

  remove: async (
    username?: FollowReqParams['username']
  ): Promise<FollowApiResponse> => {
    const { data } = await apiInstance.delete<FollowApiResponse>(
      `/follow/${username}`
    );

    return data;
  },
};
