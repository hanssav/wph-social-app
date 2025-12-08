import { meServices, savedService } from '@/services';
import { userService } from '@/services/user.service';
import {
  GetPostMeResponse,
  GetPostsByUsernameParams,
  GetPostsByUsernameResponse,
  GetSavedResponse,
  GetUsernameParams,
  Pagination,
} from '@/types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const userKeys = {
  getUserByUsername: (params: { username: string }) =>
    ['users', params] as const,
  inifiniteUseranmePosts: (params: GetPostsByUsernameParams) =>
    ['username-posts', 'posts', params] as const,
  inifiniteUseranmeLikedPosts: (params: GetPostsByUsernameParams) =>
    ['username-liked-posts', 'posts', params] as const,
  mePosts: (initialParams?: Partial<Pagination>) =>
    ['me-posts', initialParams] as const,
  savedPosts: (initialParams?: Partial<Pagination>) =>
    ['me-saved', 'posts', initialParams] as const,
};

export const useInfiniteMePosts = (initialParams?: Partial<Pagination>) => {
  return useInfiniteQuery<GetPostMeResponse>({
    queryKey: userKeys.mePosts(initialParams),
    queryFn: ({ pageParam }) =>
      meServices.mePost({
        ...initialParams,
        page: Number(pageParam),
        limit: initialParams?.limit || 10,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data?.items || lastPage.data.items.length === 0) {
        return undefined;
      }

      const limit = initialParams?.limit || 10;
      if (lastPage.data.items.length < limit) {
        return undefined;
      }

      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
};
export const useInfiniteSavedPosts = (
  initialParams?: Partial<Pagination> & { enabled?: boolean }
) => {
  return useInfiniteQuery<GetSavedResponse>({
    queryKey: userKeys.savedPosts(initialParams),
    queryFn: ({ pageParam = 1 }) =>
      savedService.getSaved({
        ...initialParams,
        page: Number(pageParam),
        limit: initialParams?.limit || 10,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data?.posts || lastPage.data.posts.length === 0) {
        return undefined;
      }

      const limit = initialParams?.limit || 10;
      if (lastPage.data.posts.length < limit) {
        return undefined;
      }

      return allPages.length + 1;
    },
    initialPageParam: 1,
    enabled: initialParams?.enabled ?? true,
  });
};

export const useInfinitePostsByUsername = (
  params: GetPostsByUsernameParams
) => {
  return useInfiniteQuery<GetPostsByUsernameResponse>({
    queryKey: userKeys.inifiniteUseranmePosts(params),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => {
      return userService.getPostByUsername({
        ...params,
        page: Number(pageParam),
        username: params?.username ?? '',
      });
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.success || !lastPage.data?.pagination) {
        return undefined;
      }
      const { page, totalPages } = lastPage.data?.pagination;

      return page < totalPages ? page + 1 : undefined;
    },

    enabled: !!params?.username,
  });
};

export const useInfiniteLikedPostsByUsername = (
  params: GetPostsByUsernameParams
) => {
  return useInfiniteQuery<GetPostsByUsernameResponse>({
    queryKey: userKeys.inifiniteUseranmeLikedPosts(params),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => {
      return userService.getLikedPostByUsername({
        ...params,
        page: Number(pageParam),
        username: params?.username ?? '',
      });
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.success || !lastPage.data?.pagination) {
        return undefined;
      }
      const { page, totalPages } = lastPage.data?.pagination;

      return page < totalPages ? page + 1 : undefined;
    },

    enabled: !!params?.username,
  });
};

export const useGetUserByUsername = (params: GetUsernameParams) => {
  return useQuery({
    queryKey: userKeys.getUserByUsername(params),
    queryFn: () => userService.getUser(params),
    enabled: !!params.username,
  });
};
