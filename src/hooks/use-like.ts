import { likeService } from '@/services';
import { useInfiniteQuery } from '@tanstack/react-query';

export const likeKeys = {
  getLikes: (postId: number) => ['likes', 'post', postId],
  all: ['likes'],
};

export const useGetLikesByPost = (postId: number) => {
  return useInfiniteQuery({
    queryKey: likeKeys.getLikes(postId),
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
    refetchOnMount: true,
    staleTime: 0,
  });
};
