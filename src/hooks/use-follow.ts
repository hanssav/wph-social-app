import { followService } from '@/services';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { likeKeys } from './use-like';
import { userKeys } from './use-profile-post';

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
