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
import { Bookmark, LayoutDashboardIcon, Send } from 'lucide-react';
import { ProfileStats, ProfileStatsItem } from './profile-stats';
import Spin from '@/components/ui/spin';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { ProfileTabList, ProfileTabsTrigger } from './profile-tabs';
import {
  useInfiniteMePosts,
  useInfiniteSavedPosts,
} from '@/hooks/use-profile-post';
import { ProfileImages, ProfileImagesItem } from './profile-images-galery';
import { ProfileEmptyPost } from './profile-empty-post';
import {
  EMPTY_POST_STATE,
  EMPTY_SAVED_STATE,
} from '@/constants/profile.constants';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants';

const Profile = () => {
  const router = useRouter();
  const { user, isLoading } = useAppSelector((state: RootState) => state.auth);
  const { profile, stats } = user ?? {};

  // =============================
  // NOTE: NEED TO ADD INFINITE SCROLL
  // =============================
  const {
    data: postDatas,
    fetchNextPage: fetchNextPosts,
    hasNextPage: hasNextPosts,
    isFetchingNextPage: isFetchingNextPosts,
    isLoading: postsLoading,
    isError: postsError,
    error: postsErrObject,
  } = useInfiniteMePosts({ limit: 10 });

  const posts = postDatas?.pages.flatMap((page) => page.data?.items);

  const {
    data: saveDatas,
    fetchNextPage: fetchNextSaved,
    hasNextPage: hasNextSaved,
    isFetchingNextPage: isFetchingNextSaved,
    isLoading: savedLoading,
    isError: savedError,
    error: savedErrObject,
  } = useInfiniteSavedPosts({ limit: 10 });

  const saved = saveDatas?.pages.flatMap((page) => page.data?.posts);

  if (isLoading) {
    return (
      <div className='flex-1 h-full w-full'>
        <Spin></Spin>
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
            <Button
              onClick={() => router.push(PATH.FORM.UPDATE_PROFILE)}
              variant='outline'
              className='flex-1'
            >
              Edit Profile
            </Button>
            <Button className='' variant={'outline'}>
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
          <ProfileTabsTrigger value='saved' icon={Bookmark}>
            Saved
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
              <ProfileEmptyPost {...EMPTY_POST_STATE} />
            )}
          </TabsContent>
        </TabsContent>

        <TabsContent value='saved'>
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
            <ProfileEmptyPost {...EMPTY_SAVED_STATE} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
