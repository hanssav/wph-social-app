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
  useGetUserByUsername,
  useInfiniteLikedPostsByUsername,
  useInfiniteMePosts,
  useInfinitePostsByUsername,
  useInfiniteSavedPosts,
} from '@/hooks/use-profile-post';
import {
  ProfileImages,
  ProfileImagesItem,
} from '@/components/pages/profile/profile-images-galery';
import { ProfileEmptyPost } from '@/components/pages/profile/profile-empty-post';
import {
  EMPTY_OTHERS_POST,
  EMPTY_POST_STATE,
  EMPTY_SAVED_STATE,
} from '@/constants/profile.constants';
import { useParams, useRouter } from 'next/navigation';
import { PATH } from '@/constants';
import { useFollowAct } from '@/hooks';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const Profile = () => {
  const router = useRouter();
  const params = useParams();
  const username = params.username?.[0] ?? '';
  const isOwnProfile = !username;

  // =============================
  // NOTE: INTERSECTION OBSERVER
  // =============================
  const { ref: postsRef, inView: postsInView } = useInView({
    threshold: 0.1, // Trigger 10% height
    triggerOnce: false,
  });

  const { ref: savedRef, inView: savedInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // =============================
  // NOTE: USER PROFILE
  // =============================
  const { user, isLoading } = useAppSelector((state: RootState) => state.auth);
  const { profile: profileMe, stats: profileStats } = user ?? {};

  const { data: profileUsername } = useGetUserByUsername({
    username,
  });
  const othersProfile = profileUsername?.data;
  const othersStats = othersProfile?.counts;

  // =============================
  // NOTE: USER POSTS BY USERNAME (WITH INFINITE SCROLL)
  // =============================
  const {
    data: usernamePostsDatas,
    fetchNextPage: fetchNextUsernamePost,
    hasNextPage: hasNextUsernamePost,
    isFetchingNextPage: isFetchingNextUsernamePost,
  } = useInfinitePostsByUsername({ username, limit: 12 });

  const postsUsername = usernamePostsDatas?.pages.flatMap(
    (page) => page.data?.posts
  );

  const {
    data: usernameLikedPostsDatas,
    fetchNextPage: fetchNextUsernameLiked,
    hasNextPage: hasNextUsernameLiked,
    isFetchingNextPage: isFetchingNextUsernameLiked,
  } = useInfiniteLikedPostsByUsername({
    username,
    limit: 12,
  });

  const likedPostsByUsername = usernameLikedPostsDatas?.pages.flatMap(
    (page) => page.data?.posts
  );

  // =================================
  // NOTE: OWN PROFILE POSTS (WITH INFINITE SCROLL)
  // =================================
  const {
    data: postsMeDatas,
    fetchNextPage: fetchNextPosts,
    hasNextPage: hasNextPosts,
    isFetchingNextPage: isFetchingNextPosts,
  } = useInfiniteMePosts({ limit: 12 });

  const postsMe = postsMeDatas?.pages.flatMap((page) => page.data?.items);

  const {
    data: savedMeDatas,
    fetchNextPage: fetchNextSaved,
    hasNextPage: hasNextSaved,
    isFetchingNextPage: isFetchingNextSaved,
  } = useInfiniteSavedPosts({ limit: 12 });

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

  // =================================
  // NOTE: AUTO FETCH WHEN IN VIEW
  // =================================

  // Auto fetch posts when postsRef is in view
  useEffect(() => {
    if (postsInView) {
      if (isOwnProfile) {
        if (hasNextPosts && !isFetchingNextPosts) {
          fetchNextPosts();
        }
      } else {
        if (hasNextUsernamePost && !isFetchingNextUsernamePost) {
          fetchNextUsernamePost();
        }
      }
    }
  }, [
    postsInView,
    isOwnProfile,
    hasNextPosts,
    isFetchingNextPosts,
    fetchNextPosts,
    hasNextUsernamePost,
    isFetchingNextUsernamePost,
    fetchNextUsernamePost,
  ]);

  // Auto fetch saved/liked when savedRef is in view
  useEffect(() => {
    if (savedInView) {
      if (isOwnProfile) {
        if (hasNextSaved && !isFetchingNextSaved) {
          fetchNextSaved();
        }
      } else {
        if (hasNextUsernameLiked && !isFetchingNextUsernameLiked) {
          fetchNextUsernameLiked();
        }
      }
    }
  }, [
    savedInView,
    isOwnProfile,
    hasNextSaved,
    isFetchingNextSaved,
    fetchNextSaved,
    hasNextUsernameLiked,
    isFetchingNextUsernameLiked,
    fetchNextUsernameLiked,
  ]);

  const { handleFollowAct, getFollowState } = useFollowAct();
  const isFollowed = getFollowState(othersProfile);

  if (isLoading) {
    return (
      <div className='flex-1 h-full w-full'>
        <Spin />
      </div>
    );
  }

  const isFetchingGallery = isOwnProfile
    ? isFetchingNextPosts
    : isFetchingNextUsernamePost;
  const isFetchingSaved = isOwnProfile
    ? isFetchingNextSaved
    : isFetchingNextUsernameLiked;

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
