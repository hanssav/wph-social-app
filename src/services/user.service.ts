import { apiInstance } from '@/api';
import {
  GetPostsByUsernameParams,
  GetPostsByUsernameResponse,
  GetUsernameParams,
  GetUsernameResponse,
  SearchUserParams,
  SearchUserResponse,
} from '@/types';
import { is } from 'zod/v4/locales';

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

  getUser: async (params: GetUsernameParams): Promise<GetUsernameResponse> => {
    const { data } = await apiInstance.get(`/users/${params.username}`, {
      params,
    });

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

  getLikedPostByUsername: async (
    params: GetPostsByUsernameParams
  ): Promise<GetPostsByUsernameResponse> => {
    const { data } = await apiInstance.get(`/users/${params.username}/likes`, {
      params,
    });

    return data;
  },
};
