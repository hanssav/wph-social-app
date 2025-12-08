import { followService } from '@/services';
import {
  useQueryClient,
  useMutation,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { likeKeys } from './use-like';
import { userKeys } from './use-profile-post';
import { GetFollowParams, GetFollowResponse } from '@/types';
import { userService } from '@/services/user.service';

type FollowMutationContext = {
  username: string;
  postId?: number;
};

export const useFollowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ username }: FollowMutationContext) =>
      followService.add(username),
    onSuccess: (_data, { username, postId }) => {
      const encodedUsername = encodeURIComponent(username);
      queryClient.invalidateQueries({
        queryKey: userKeys.getUserByUsername({ username: encodedUsername }),
      });

      queryClient.invalidateQueries({ queryKey: ['feeds'] });
      queryClient.invalidateQueries({
        queryKey: ['user', username],
      });

      if (postId) {
        queryClient.invalidateQueries({
          queryKey: likeKeys.getLikes(postId),
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: likeKeys.all,
        });
      }
    },
  });
};

export const useUnfollowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ username }: FollowMutationContext) =>
      followService.remove(username),
    onSuccess: (_data, { username, postId }) => {
      const encodedUsername = encodeURIComponent(username);
      queryClient.invalidateQueries({
        queryKey: userKeys.getUserByUsername({ username: encodedUsername }),
      });

      queryClient.invalidateQueries({ queryKey: ['feeds'] });
      queryClient.invalidateQueries({
        queryKey: ['user', username],
      });

      if (postId) {
        queryClient.invalidateQueries({
          queryKey: likeKeys.getLikes(postId),
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: likeKeys.all,
        });
      }
    },
  });
};

export const useFollowing = (params: GetFollowParams) => {
  return useInfiniteQuery<GetFollowResponse>({
    queryKey: ['following', 'users', params.username],
    queryFn: ({ pageParam }) => {
      return userService.getFollowing({
        ...params,
        page: Number(pageParam),
        limit: params.limit ?? 20,
      });
    },
    getNextPageParam: (lastPage) => {
      const pagination = lastPage?.data?.pagination;
      if (!pagination) return undefined;

      const { page, totalPages } = pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!params.username,
  });
};

export const useFollowers = (params: GetFollowParams) => {
  return useInfiniteQuery<GetFollowResponse>({
    queryKey: ['followers', 'users', params.username],
    queryFn: ({ pageParam }) => {
      return userService.getFollowers({
        ...params,
        page: Number(pageParam),
        limit: params.limit ?? 20,
      });
    },
    getNextPageParam: (lastPage) => {
      const pagination = lastPage?.data?.pagination;
      if (!pagination) return undefined;

      const { page, totalPages } = pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!params.username,
  });
};
