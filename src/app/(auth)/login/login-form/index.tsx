'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { useAppDispatch } from '@/store/hooks';
import { toast } from 'sonner';
import { authServices, meServices } from '@/services';
import { setToken } from '@/store/slices/auth-slice';
import { LoginRequest, LoginSchema } from '@/schema/auth.schema';

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: authServices.login,
    onSuccess: async (data) => {
      dispatch(setToken(data.data.token));

      try {
        const userData = await meServices.me();

        queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
        toast('Login berhasil');
        router.push('/feed');
      } catch (error) {}
    },
    onError: (error: any) => {
      toast.error('Login gagal');
    },
  });

  const onSubmit = (data: LoginRequest) => {
    loginMutation.mutate(data);
  };

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Masuk ke akun Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='nama@email.com'
              {...register('email')}
              disabled={loginMutation.isPending}
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              placeholder='••••••••'
              {...register('password')}
              disabled={loginMutation.isPending}
            />
            {errors.password && (
              <p className='text-sm text-red-500'>{errors.password.message}</p>
            )}
          </div>

          <Button
            type='submit'
            className='w-full'
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Memproses...' : 'Login'}
          </Button>

          <p className='text-center text-sm text-gray-600'>
            Belum punya akun?{' '}
            <Link href='/register' className='text-blue-600 hover:underline'>
              Daftar di sini
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
