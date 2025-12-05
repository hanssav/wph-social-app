import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '@/services/post.service';
import { toast } from 'sonner';

interface AddPostRequest {
  image: File;
  caption?: string;
}

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: AddPostRequest) => postService.add(req),

    onError: (err) => {
      toast.error('Failed to create post. Please try again.');
      console.error('Error creating post:', err);
    },

    onSuccess: () => {
      toast.success('Post created successfully!');

      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'posts'] });
    },
  });
};
