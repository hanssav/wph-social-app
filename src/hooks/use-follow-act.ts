import { UserLike, UserWithStats } from '@/types';
import React from 'react';
import { useFollowMutation, useUnfollowMutation } from './use-follow';

export const useFollowAct = (postId?: number) => {
  const followMutation = useFollowMutation();
  const unfollowMutation = useUnfollowMutation();
  const [followStates, setFollowStates] = React.useState<
    Record<string, boolean>
  >({});

  const getInitialState = (data: UserLike | UserWithStats) => {
    if ('isFollowedByMe' in data) {
      return data.isFollowedByMe;
    }
    return data.isFollowing;
  };

  const handleFollowAct = (
    data: UserLike | UserWithStats | null | undefined
  ) => {
    if (!data) return;

    const initialState = getInitialState(data);
    const currentState = followStates[data.username] ?? initialState;

    setFollowStates((prev) => ({
      ...prev,
      [data.username]: !currentState,
    }));

    if (currentState) {
      unfollowMutation.mutate(
        { username: data.username, postId },
        {
          onError: () => {
            setFollowStates((prev) => ({
              ...prev,
              [data.username]: initialState,
            }));
          },
        }
      );
    } else {
      followMutation.mutate(
        { username: data.username, postId },
        {
          onError: () => {
            setFollowStates((prev) => ({
              ...prev,
              [data.username]: initialState,
            }));
          },
        }
      );
    }
  };

  const getFollowState = (
    data: UserLike | UserWithStats | null | undefined
  ) => {
    if (!data) return;
    const initialState = getInitialState(data);
    return followStates[data.username] ?? initialState;
  };

  return { getFollowState, handleFollowAct };
};
