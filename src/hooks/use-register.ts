import { PATH } from '@/constants';
import { RegisterRequest, RegisterSchema } from '@/schema/auth.schema';
import { authServices } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const useRegister = () => {
  const router = useRouter();
  const form = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      phone: '',
      username: '',
    },
  });

  const registerMutation = useMutation({
    mutationFn: authServices.register,
    onSuccess() {
      toast.success('Registration successful!');
      router.push(PATH.LOGIN);
    },
  });

  const onSubmit = (data: RegisterRequest) => {
    registerMutation.mutate(data);
  };

  return { form, onSubmit, registerMutation };
};
