import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  useInfiniteLikedPostsByUsername,
  useInfiniteMePosts,
  useInfinitePostsByUsername,
  useInfiniteSavedPosts,
} from '@/hooks/use-profile-post';
import {
  EMPTY_OTHERS_POST,
  EMPTY_POST_STATE,
  EMPTY_SAVED_STATE,
} from '@/constants/profile.constants';

interface UseProfilePostsProps {
  username: string;
  isOwnProfile: boolean;
}

export const useProfilePosts = ({
  username,
  isOwnProfile,
}: UseProfilePostsProps) => {
  // =============================
  // INTERSECTION OBSERVER
  // =============================
  const { ref: postsRef, inView: postsInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const { ref: savedRef, inView: savedInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // =============================
  // USER POSTS BY USERNAME
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

  // =============================
  // OWN PROFILE POSTS
  // =============================
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
  } = useInfiniteSavedPosts({ limit: 12, enabled: isOwnProfile });

  const savedMe = savedMeDatas?.pages.flatMap((page) => page.data?.posts);

  // =============================
  // COMPUTED VALUES
  // =============================
  const posts = isOwnProfile ? postsMe : postsUsername;
  const saved = isOwnProfile ? savedMe : likedPostsByUsername;
  const postFallback = isOwnProfile ? EMPTY_POST_STATE : EMPTY_OTHERS_POST;
  const savedFallback = isOwnProfile ? EMPTY_SAVED_STATE : EMPTY_OTHERS_POST;

  const isFetchingGallery = isOwnProfile
    ? isFetchingNextPosts
    : isFetchingNextUsernamePost;
  const isFetchingSaved = isOwnProfile
    ? isFetchingNextSaved
    : isFetchingNextUsernameLiked;

  // =============================
  // AUTO FETCH WHEN IN VIEW
  // =============================
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

  useEffect(() => {
    if (!savedInView) return;

    if (isOwnProfile) {
      if (hasNextSaved && !isFetchingNextSaved && fetchNextSaved) {
        fetchNextSaved();
      }
    } else {
      if (hasNextUsernameLiked && !isFetchingNextUsernameLiked) {
        fetchNextUsernameLiked();
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

  return {
    // Posts data
    posts,
    saved,
    postFallback,
    savedFallback,

    // Loading states
    isFetchingGallery,
    isFetchingSaved,

    // Refs for infinite scroll
    postsRef,
    savedRef,
  };
};
