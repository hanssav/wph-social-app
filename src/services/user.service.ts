import { apiInstance } from '@/api';
import {
  GetPostsByUsernameParams,
  GetPostsByUsernameResponse,
  SearchUserParams,
  SearchUserResponse,
} from '@/types';

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

  getPostByUsername: async (
    params: GetPostsByUsernameParams
  ): Promise<GetPostsByUsernameResponse> => {
    const { data } = await apiInstance.get(`/users/${params.username}/posts`, {
      params,
    });
    return data;
  },
};
