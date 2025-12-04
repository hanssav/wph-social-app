import { apiInstance } from '@/api';
import { SaveMutationResponse } from '@/types';

export const savedService = {
  add: async (postId: number): Promise<SaveMutationResponse> => {
    const { data } = await apiInstance.post(`/posts/${postId}/save`);
    return data;
  },
  remove: async (postId: number): Promise<SaveMutationResponse> => {
    const { data } = await apiInstance.delete(`/posts/${postId}/save`);
    return data;
  },
};
