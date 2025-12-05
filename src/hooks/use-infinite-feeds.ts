import { feedService } from '@/services/feed.service';
import { FeedResponse, GetFeedParams } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { undefined } from 'zod';

export const feedKeys = {
  all: (params?: GetFeedParams) => ['feeds', params],
};

export const useInfiniteFeeds = (params?: GetFeedParams) => {
  return useInfiniteQuery<FeedResponse>({
    queryKey: feedKeys.all(params),
    queryFn: async ({ pageParam = 1 }) => {
      const finalParams = { ...params, page: Number(pageParam) };
      const res = await feedService.get(finalParams);

      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.success || !lastPage.data?.pagination) {
        return undefined;
      }

      const { page, totalPages } = lastPage.data?.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};
