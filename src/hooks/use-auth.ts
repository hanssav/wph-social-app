import { meServices } from '@/services';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout, setLoading, setUser } from '@/store/slices/auth-slice';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

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
    queryKey: ['auth', 'me'],
    queryFn: meServices.me,
    enabled: !!token && !user,
    retry: false,
    staleTime: Infinity,
  });

  // Update Redux when user data is fetched
  React.useEffect(() => {
    if (data?.data) {
      dispatch(setUser(data.data));
    }
  }, [data, dispatch]);

  // Handle fetch error (invalid token)
  React.useEffect(() => {
    if (error) {
      dispatch(logout());
    }
  }, [error, dispatch]);

  // Update loading state
  React.useEffect(() => {
    if (!token) {
      dispatch(setLoading(false));
    } else if (isFetching) {
      dispatch(setLoading(true));
    }
  }, [token, isFetching, dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || isFetching,
  };
};
