'use client';
import { PATH } from '@/constants';
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/auth-slice';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    router.push(PATH.LOGIN);
    dispatch(logout());
    queryClient.clear();
  };

  return { logout: handleLogout };
};
