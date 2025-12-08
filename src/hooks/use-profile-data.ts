import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { useFollowAct } from '@/hooks';
import { useGetUserByUsername } from '@/hooks/use-profile-post';

export type ProfileActions = {
  onFollowers?: () => void;
  onFollowing?: () => void;
  onPosts?: () => void;
  onLikes?: () => void;
};

export type ProfileActionData = {
  isOwnProfile: boolean;
  username: string;
};

export const useProfileData = (
  actions: ProfileActions,
  datas: ProfileActionData
) => {
  const router = useRouter();

  const { isOwnProfile, username } = datas;

  const { user, isLoading } = useAppSelector((state: RootState) => state.auth);
  const { profile: profileMe, stats: profileStats } = user ?? {};

  const { data: profileUsername } = useGetUserByUsername({ username });
  const othersProfile = profileUsername?.data;
  const othersStats = othersProfile?.counts;

  const profile = useMemo(
    () => (isOwnProfile ? profileMe : othersProfile),
    [isOwnProfile, profileMe, othersProfile]
  );

  const stats = useMemo(
    () => (isOwnProfile ? profileStats : othersStats),
    [isOwnProfile, profileStats, othersStats]
  );

  const { handleFollowAct, getFollowState } = useFollowAct();

  const isFollowed = useMemo(
    () => getFollowState(othersProfile),
    [othersProfile, getFollowState]
  );

  const statsEntries = useMemo(() => {
    if (!stats) return [];

    return Object.entries(stats).map(([key, value]) => {
      const actionMap: Record<string, () => void> = {
        followers: () => actions.onFollowers?.(),
        following: () => actions.onFollowing?.(),
        posts: () => actions.onPosts?.(),
        likes: () => actions.onLikes?.(),
      };

      return {
        key,
        value,
        onClick: actionMap[key] ?? (() => {}),
      };
    });
  }, [stats]);

  return {
    profile,
    statsEntries,
    isLoading,
    othersProfile,
    isFollowed,
    handleFollowAct,
    router,
  };
};
