import { meServices, savedService } from '@/services';
import { GetPostMeResponse, GetSavedResponse, Pagination } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useInfiniteMePosts = (initialParams?: Partial<Pagination>) => {
  return useInfiniteQuery({
    queryKey: ['me-posts', initialParams],
    queryFn: ({ pageParam }) =>
      meServices.mePost({
        ...initialParams,
        page: pageParam,
        limit: initialParams?.limit || 10,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data?.items || lastPage.data.items.length === 0) {
        return undefined;
      }

      const limit = initialParams?.limit || 10;
      if (lastPage.data.items.length < limit) {
        return undefined;
      }

      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
};

export const useInfiniteSavedPosts = (initialParams?: Partial<Pagination>) => {
  return useInfiniteQuery<GetSavedResponse>({
    queryKey: ['me-saved', 'posts', initialParams],
    queryFn: ({ pageParam = 1 }) =>
      savedService.getSaved({
        ...initialParams,
        page: Number(pageParam),
        limit: initialParams?.limit || 10,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data?.posts || lastPage.data.posts.length === 0) {
        return undefined;
      }

      const limit = initialParams?.limit || 10;
      if (lastPage.data.posts.length < limit) {
        return undefined;
      }

      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
};
