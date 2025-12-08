'use client';
import * as React from 'react';
import {
  UserInfo,
  UserInfoAvatar,
  UserInfoContent,
  UserInfoTitle,
  UserInfoSubTitle,
} from '@/components/container/user-info';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Bookmark,
  CircleCheck,
  Heart,
  LayoutDashboardIcon,
  Send,
} from 'lucide-react';
import {
  ProfileStats,
  ProfileStatsItem,
} from '@/components/pages/profile/profile-stats';
import Spin from '@/components/ui/spin';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import {
  ProfileTabList,
  ProfileTabsTrigger,
} from '@/components/pages/profile/profile-tabs';
import {
  ProfileImages,
  ProfileImagesItem,
} from '@/components/pages/profile/profile-images-galery';
import { ProfileEmptyPost } from '@/components/pages/profile/profile-empty-post';
import { PATH } from '@/constants';
import { ProfileActions, useProfileData, useProfilePosts } from '@/hooks';
import { useDialog } from '@/lib/dialog-context';
import { useParams } from 'next/navigation';
import { ProfilieModalFollowContent } from '@/components/pages/profile/profile-modal-follow';

const Profile = () => {
  const params = useParams();
  const username = params.username?.[0] ?? '';
  const isOwnProfile = !username;
  const { openDialog } = useDialog();

  const dialogHandlerRef = React.useRef<
    (key: 'followers' | 'following') => void
  >(() => {});

  const profileActions: ProfileActions = {
    onFollowers: () => dialogHandlerRef.current?.('followers'),
    onFollowing: () => dialogHandlerRef.current?.('following'),
  };

  const {
    profile,
    statsEntries,
    isLoading,
    othersProfile,
    isFollowed,
    handleFollowAct,
    router,
  } = useProfileData(profileActions, {
    isOwnProfile,
    username: username,
  });

  const actualUsername = React.useMemo(() => {
    return username || profile?.username || '';
  }, [username, profile?.username]);

  const handleOpenDialog = React.useCallback(
    (key: 'followers' | 'following') => {
      openDialog({
        content: (
          <ProfilieModalFollowContent
            username={actualUsername}
            defaultTab={key}
          />
        ),
        className: 'max-w-md',
      });
    },
    [actualUsername, openDialog]
  );

  dialogHandlerRef.current = handleOpenDialog;

  const {
    posts,
    saved,
    postFallback,
    savedFallback,
    isFetchingGallery,
    isFetchingSaved,
    postsRef,
    savedRef,
  } = useProfilePosts({
    username: profile?.username ?? '',
    isOwnProfile,
  });

  if (isLoading) {
    return (
      <div className='flex-1 h-full w-full'>
        <Spin />
      </div>
    );
  }

  return (
    <div className='container-812 space-y-4'>
      {/* SECTION USER INFORMATION */}
      <section className='space-y-4'>
        <div
          className={cn(
            'flex flex-col gap-3',
            'md:flex-row md:flex-between md:gap-4'
          )}
        >
          <UserInfo>
            <UserInfoAvatar
              className='size-16'
              src={profile?.avatarUrl ?? ''}
              alt={profile?.name ?? 'user'}
            />
            <UserInfoContent>
              <UserInfoTitle>{profile?.name}</UserInfoTitle>
              <UserInfoSubTitle>{profile?.username}</UserInfoSubTitle>
            </UserInfoContent>
          </UserInfo>
          <div className='flex-center gap-3'>
            {isOwnProfile ? (
              <Button
                onClick={() => router.push(PATH.FORM.UPDATE_PROFILE)}
                variant='outline'
                className='flex-1'
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                variant={isFollowed ? 'outline' : 'default'}
                onClick={() => handleFollowAct(othersProfile)}
                className='min-w-[127px]'
              >
                {isFollowed ? (
                  <span className='flex-start gap-1.5'>
                    <CircleCheck className='h-4 w-4' />
                    <p>Following</p>
                  </span>
                ) : (
                  'Follow'
                )}
              </Button>
            )}
            <Button variant={'outline'}>
              <Send />
            </Button>
          </div>
        </div>
        <p className='text-sm-regular md:text-md-regular'>
          {profile?.bio ?? ''}
        </p>

        <ProfileStats>
          {statsEntries.map((item) => (
            <ProfileStatsItem
              key={item.key}
              k={item.key}
              value={item.value}
              onClick={item.onClick}
            />
          ))}
        </ProfileStats>
      </section>

      {/* SECTION TAB AND POST LIST */}
      <Tabs defaultValue='gallery' className='gap-6'>
        <ProfileTabList>
          <ProfileTabsTrigger value='gallery' icon={LayoutDashboardIcon}>
            Gallery
          </ProfileTabsTrigger>
          <ProfileTabsTrigger
            value={isOwnProfile ? 'saved' : 'liked'}
            icon={isOwnProfile ? Bookmark : Heart}
          >
            {isOwnProfile ? 'Saved' : 'Liked'}
          </ProfileTabsTrigger>
        </ProfileTabList>

        {/* GALLERY TAB */}
        <TabsContent value='gallery'>
          {posts && posts.length > 0 ? (
            <>
              <ProfileImages>
                {posts.map((post) => (
                  <ProfileImagesItem
                    key={post?.id}
                    src={post?.imageUrl ?? ''}
                    alt={post?.caption ?? `Post by ${profile?.username}`}
                  />
                ))}
              </ProfileImages>

              <div ref={postsRef} className='h-20 flex-center'>
                {isFetchingGallery && <Spin />}
              </div>
            </>
          ) : (
            <ProfileEmptyPost {...postFallback} />
          )}
        </TabsContent>

        {/* SAVED/LIKED TAB */}
        <TabsContent value={isOwnProfile ? 'saved' : 'liked'}>
          {saved && saved.length > 0 ? (
            <>
              <ProfileImages>
                {saved.map((save) => (
                  <ProfileImagesItem
                    key={save?.id}
                    src={save?.imageUrl ?? ''}
                    alt={save?.caption ?? `Post by ${profile?.username}`}
                  />
                ))}
              </ProfileImages>

              <div ref={savedRef} className='h-20 flex-center'>
                {isFetchingSaved && <Spin />}
              </div>
            </>
          ) : (
            <ProfileEmptyPost {...savedFallback} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
