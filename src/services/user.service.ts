import { apiInstance } from '@/api';
import {
  GetFollowParams,
  GetFollowResponse,
  GetPostsByUsernameParams,
  GetPostsByUsernameResponse,
  GetUsernameParams,
  GetUsernameResponse,
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

  getFollowers: async (
    params?: GetFollowParams
  ): Promise<GetFollowResponse> => {
    const { data } = await apiInstance.get(
      `/users/${params?.username}/followers`,
      { params }
    );

    return data;
  },

  getFollowing: async (
    params?: GetFollowParams
  ): Promise<GetFollowResponse> => {
    const { data } = await apiInstance.get(
      `/users/${params?.username}/following`,
      { params }
    );

    return data;
  },
};
