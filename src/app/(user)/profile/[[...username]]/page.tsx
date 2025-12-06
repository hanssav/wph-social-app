'use client';
import {
  UserInfo,
  UserInfoAvatar,
  UserInfoContent,
  UserInfoTitle,
  UserInfoSubTitle,
} from '@/components/container/user-info';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import {
  Bookmark,
  CircleCheck,
  Heart,
  LayoutDashboardIcon,
  Send,
} from 'lucide-react';
import { ProfileStats, ProfileStatsItem } from './profile-stats';
import Spin from '@/components/ui/spin';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { ProfileTabList, ProfileTabsTrigger } from './profile-tabs';
import {
  useGetUserByUsername,
  useInfiniteLikedPostsByUsername,
  useInfiniteMePosts,
  useInfinitePostsByUsername,
  useInfiniteSavedPosts,
} from '@/hooks/use-profile-post';
import { ProfileImages, ProfileImagesItem } from './profile-images-galery';
import { ProfileEmptyPost } from './profile-empty-post';
import {
  EMPTY_OTHERS_POST,
  EMPTY_POST_STATE,
  EMPTY_SAVED_STATE,
} from '@/constants/profile.constants';
import { useParams, useRouter } from 'next/navigation';
import { PATH } from '@/constants';
import { useFollowAct } from '@/hooks';

const Profile = () => {
  const router = useRouter();
  const params = useParams();
  const username = params.username?.[0] ?? '';
  const isOwnProfile = !username;

  // =============================
  // NOTE: USER PROFILE
  // =============================
  const { user, isLoading } = useAppSelector((state: RootState) => state.auth);
  const { profile: profileMe, stats: profileStats } = user ?? {};

  const { data: profileUsername } = useGetUserByUsername({ username });
  const othersProfile = profileUsername?.data;
  const othersStats = othersProfile?.counts;

  // =============================
  // NOTE: USER POSTS BY USERNAME
  // =============================

  const { data: usernamePostsDatas } = useInfinitePostsByUsername({ username });
  const postsUsername = usernamePostsDatas?.pages.flatMap(
    (page) => page.data?.posts
  );

  const { data: usernameLikedPostsDatas } = useInfiniteLikedPostsByUsername({
    username,
  });

  const likedPostsByUsername = usernameLikedPostsDatas?.pages.flatMap(
    (page) => page.data?.posts
  );

  // =================================
  // NOTE: NEED TO ADD INFINITE SCROLL
  // =================================
  const {
    data: postsMeDatas,
    fetchNextPage: fetchNextPosts,
    hasNextPage: hasNextPosts,
    isFetchingNextPage: isFetchingNextPosts,
    isLoading: postsLoading,
    isError: postsError,
    error: postsErrObject,
  } = useInfiniteMePosts({ limit: 10 });

  const postsMe = postsMeDatas?.pages.flatMap((page) => page.data?.items);

  const {
    data: savedMeDatas,
    fetchNextPage: fetchNextSaved,
    hasNextPage: hasNextSaved,
    isFetchingNextPage: isFetchingNextSaved,
    isLoading: savedLoading,
    isError: savedError,
    error: savedErrObject,
  } = useInfiniteSavedPosts({ limit: 10 });

  const savedMe = savedMeDatas?.pages.flatMap((page) => page.data?.posts);

  // =================================
  // NOTE: RESULTS
  // =================================
  const profile = isOwnProfile ? profileMe : othersProfile;
  const posts = isOwnProfile ? postsMe : postsUsername;
  const saved = isOwnProfile ? savedMe : likedPostsByUsername;
  const stats = isOwnProfile ? profileStats : othersStats;
  const postFallback = isOwnProfile ? EMPTY_POST_STATE : EMPTY_OTHERS_POST;
  const savedFallback = isOwnProfile ? EMPTY_SAVED_STATE : EMPTY_OTHERS_POST;

  const { handleFollowAct, getFollowState } = useFollowAct();
  const isFollowed = getFollowState(othersProfile);

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
          {Object.entries(stats ?? {}).map(([key, value]) => (
            <ProfileStatsItem key={key} k={key} value={value} />
          ))}
        </ProfileStats>
      </section>

      {/* SECTION TAB AND POST LIST */}

      <Tabs defaultValue='gallery' className='gap-6'>
        <ProfileTabList>
          <ProfileTabsTrigger value='gallery' icon={LayoutDashboardIcon}>
            Galery
          </ProfileTabsTrigger>
          <ProfileTabsTrigger
            value={isOwnProfile ? 'saved' : 'liked'}
            icon={isOwnProfile ? Bookmark : Heart}
          >
            {isOwnProfile ? 'Saved' : 'Liked'}
          </ProfileTabsTrigger>
        </ProfileTabList>

        <TabsContent value='gallery'>
          <TabsContent value='gallery'>
            {posts && posts.length > 0 ? (
              <ProfileImages>
                {posts.map((post) => (
                  <ProfileImagesItem
                    key={post?.id}
                    src={post?.imageUrl ?? ''}
                    alt={post?.caption ?? ''}
                  />
                ))}
              </ProfileImages>
            ) : (
              <ProfileEmptyPost {...postFallback} />
            )}
          </TabsContent>
        </TabsContent>

        <TabsContent value={isOwnProfile ? 'saved' : 'liked'}>
          {saved && saved.length > 0 ? (
            <ProfileImages>
              {saved.map((save) => (
                <ProfileImagesItem
                  key={save?.id}
                  src={save?.imageUrl ?? ''}
                  alt={save?.caption ?? ''}
                />
              ))}
            </ProfileImages>
          ) : (
            <ProfileEmptyPost {...savedFallback} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
