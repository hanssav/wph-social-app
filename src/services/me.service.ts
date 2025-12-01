import { apiInstance } from '@/api';
import { MeResponse } from '@/types';

export const meServices = {
  me: async (): Promise<MeResponse> => {
    const { data } = await apiInstance.get<MeResponse>('/me');
    return data;
  },
};
