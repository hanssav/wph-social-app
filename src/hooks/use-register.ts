import { RegisterSchema } from '@/schema/auth.schema';
import { authServices } from '@/services';
import { RegisterRequest } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const useRegister = () => {
  const form = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      phone: '',
      username: '',
    },
  });

  const registerMutation = useMutation({
    mutationFn: authServices.register,
    onSuccess() {
      toast.success('Registration successful!');
    },
  });

  const onSubmit = (data: RegisterRequest) => {
    registerMutation.mutate(data);
  };

  return { form, onSubmit, registerMutation };
};
