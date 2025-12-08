import { meServices } from '@/services';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout, setLoading, setUser } from '@/store/slices/auth-slice';
import { Pagination } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export const meKeys = {
  me: ['auth', 'me'] as const,
  posts: (params?: Partial<Pagination>) => ['me', 'posts', params] as const,
};

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { token, user, isAuthenticated, isLoading } = useAppSelector(
    (state: RootState) => state.auth
  );

  const {
    data,
    isLoading: isFetching,
    error,
  } = useQuery({
    queryKey: meKeys.me,
    queryFn: meServices.me,
    enabled: !!token && !user,
    retry: false,
    staleTime: Infinity,
  });

  React.useEffect(() => {
    if (data?.data) {
      // Only dispatch if data is in correct format (nested with profile and stats)
      if (data.data.profile && data.data.stats) {
        dispatch(setUser(data.data));
      }
    }
  }, [data, dispatch]);

  React.useEffect(() => {
    if (error) {
      dispatch(logout());
    }
  }, [error, dispatch]);

  React.useEffect(() => {
    if (!token) {
      dispatch(setLoading(false));
    } else if (isFetching) {
      dispatch(setLoading(true));
    } else if (user) {
      dispatch(setLoading(false));
    }
  }, [token, isFetching, user, dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || isFetching,
  };
};
