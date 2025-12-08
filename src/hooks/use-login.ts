'use client';
import { getErrorMessage } from '@/api';
import { PATH } from '@/constants';
import { LoginRequest, LoginSchema } from '@/schema/auth.schema';
import { authServices } from '@/services';
import { useAppDispatch } from '@/store/hooks';
import { setToken } from '@/store/slices/auth-slice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: authServices.login,
    onSuccess: async (data) => {
      dispatch(setToken(data.data.token));

      try {
        queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });

        // window.location.href = PATH.FEED;
        router.push(PATH.FEED);
        toast.success('Login Successful!');
        // router.refresh();
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const onSubmit = (data: LoginRequest) => {
    loginMutation.mutate(data);
  };

  return { form, onSubmit, loginMutation };
};
