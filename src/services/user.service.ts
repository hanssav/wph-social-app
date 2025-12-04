import { apiInstance } from '@/api';
import { SearchUserParams, SearchUserResponse } from '@/types';

export const userService = {
  search: async (params: SearchUserParams) => {
    const { data } = await apiInstance.get<SearchUserResponse>(
      '/users/search',
      {
        params,
      }
    );

    return data;
  },
};
