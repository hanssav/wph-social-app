import Spin from '@/components/ui/spin';
import { Tabs, TabsContent } from '@radix-ui/react-tabs';
import React from 'react';
import { UserFollowItem } from './profile-info-user-modal-content';
import { ProfileTabList, ProfileTabsTrigger } from './profile-tabs';
import { useInView } from 'react-intersection-observer';
import { useFollowers, useFollowing } from '@/hooks';

type Props = {
  username: string;
  defaultTab?: 'followers' | 'following';
};

export const ProfilieModalFollowContent: React.FC<Props> = ({
  username,
  defaultTab = 'followers',
}) => {
  const {
    data: followerData,
    isLoading: isLoadingFollowers,
    hasNextPage: followerHasNextPage,
    isFetchingNextPage: isFollowerFetchingNextPage,
    fetchNextPage: followerFetchNextPage,
  } = useFollowers({
    username,
    limit: 20,
  });

  const {
    data: followingData,
    isLoading: isLoadingFollowing,
    hasNextPage: followingHasNextPage,
    isFetchingNextPage: isFollowingFetchingNextPage,
    fetchNextPage: followingFetchNextPage,
  } = useFollowing({
    username,
    limit: 20,
  });

  const followers = React.useMemo(
    () => followerData?.pages?.flatMap((page) => page?.data?.users ?? []) ?? [],
    [followerData]
  );

  const following = React.useMemo(
    () =>
      followingData?.pages?.flatMap((page) => page?.data?.users ?? []) ?? [],
    [followingData]
  );

  const { ref: followerRef, inView: followerInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '100px',
  });

  const { ref: followingRef, inView: followingInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '100px',
  });

  React.useEffect(() => {
    if (followerInView && followerHasNextPage && !isFollowerFetchingNextPage) {
      followerFetchNextPage?.();
    }
  }, [followerInView, followerHasNextPage, isFollowerFetchingNextPage]);

  React.useEffect(() => {
    if (
      followingInView &&
      followingHasNextPage &&
      !isFollowingFetchingNextPage
    ) {
      followingFetchNextPage?.();
    }
  }, [followingInView, followingHasNextPage, isFollowingFetchingNextPage]);

  return (
    <Tabs defaultValue={defaultTab} className='w-full'>
      <ProfileTabList className='flex w-full'>
        <ProfileTabsTrigger value='followers'>Followers</ProfileTabsTrigger>
        <ProfileTabsTrigger value='following'>Following</ProfileTabsTrigger>
      </ProfileTabList>

      <TabsContent value='followers' className='mt-6'>
        <div className='space-y-4 min-h-[200px] max-h-[60vh] overflow-y-auto'>
          {isLoadingFollowers ? (
            <div className='flex-center py-8'>
              <Spin />
            </div>
          ) : followers.length > 0 ? (
            <>
              {followers.map((follower) => (
                <UserFollowItem key={follower.id} user={follower} />
              ))}
              <div ref={followerRef} className='h-20 flex-center'>
                {isFollowerFetchingNextPage && <Spin />}
                {!followerHasNextPage &&
                  !isFollowerFetchingNextPage &&
                  followers.length > 0 && (
                    <p className='text-neutral-600 text-sm'>
                      You&apos;re all caught up!
                    </p>
                  )}
              </div>
            </>
          ) : (
            <p className='text-center text-neutral-600 py-8'>
              No followers yet
            </p>
          )}
        </div>
      </TabsContent>

      <TabsContent value='following' className='mt-6'>
        <div className='space-y-4 min-h-[200px] max-h-[60vh] overflow-y-auto'>
          {isLoadingFollowing ? (
            <div className='flex-center py-8'>
              <Spin />
            </div>
          ) : following.length > 0 ? (
            <>
              {following.map((user) => (
                <UserFollowItem key={user.id} user={user} />
              ))}
              <div ref={followingRef} className='h-20 flex-center'>
                {isFollowingFetchingNextPage && <Spin />}
                {!followingHasNextPage &&
                  !isFollowingFetchingNextPage &&
                  following.length > 0 && (
                    <p className='text-neutral-600 text-sm'>
                      You&apos;re all caught up!
                    </p>
                  )}
              </div>
            </>
          ) : (
            <p className='text-center text-neutral-600 py-8'>
              Not following anyone yet
            </p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};
