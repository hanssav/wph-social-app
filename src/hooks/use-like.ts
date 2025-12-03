import { likeService } from '@/services';
import { LikeListPostParams, LikesPostApiResponse } from '@/types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useGetLikesByPost = (postId?: number) => {
  return useInfiniteQuery({
    queryKey: ['likes', 'post', postId],
    queryFn: ({ pageParam = 1 }) => {
      if (!postId) return Promise.reject('no postId');
      return likeService.getByPostId({
        postId,
        page: pageParam,
        limit: 20,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.success || !lastPage.data?.pagination) {
        return undefined;
      }

      const { page, totalPages } = lastPage.data?.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!postId,
    staleTime: 5 * 60 * 1000,
  });
};
