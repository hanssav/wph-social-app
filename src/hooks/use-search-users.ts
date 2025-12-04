import { userService } from '@/services/user.service';
import { SearchUserParams, SearchUserResponse } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';

export const userKeys = {
  all: ['users'],
  search: (params?: SearchUserParams) => [...userKeys.all, 'search', params],
};

export const useSearchUsers = (params: Omit<SearchUserParams, 'page'>) => {
  return useInfiniteQuery<SearchUserResponse>({
    queryKey: userKeys.search(params),
    queryFn: ({ pageParam = 1 }) =>
      userService.search({ ...params, page: Number(pageParam) }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!params.q && params.q.length >= 2,
  });
};
