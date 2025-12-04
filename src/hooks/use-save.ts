import { savedService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSaveMutation = () => {
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: savedService.add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const remove = useMutation({
    mutationFn: savedService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  return { add, remove };
};
