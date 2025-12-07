import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '@/services/post.service';
import { toast } from 'sonner';
import { clearPost, setPost } from '@/store/slices/post-slice';
import { useAppDispatch } from '@/store/hooks';

interface AddPostRequest {
  image: File;
  caption?: string;
}

export const useAddPost = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (req: AddPostRequest) => postService.add(req),

    onMutate: (variables) => {
      const imageUrl = URL.createObjectURL(variables.image);

      dispatch(
        setPost({
          post: {
            imageUrl,
            caption: variables.caption,
          },
          isLoading: true,
        })
      );
    },

    onError: (err) => {
      dispatch(clearPost());
      toast.error('Failed to create post. Please try again.');
      console.error('Error creating post:', err);
    },

    onSuccess: () => {
      dispatch(clearPost());
      toast.success('Post created successfully!');

      queryClient.invalidateQueries({ queryKey: ['feeds'] });
      queryClient.invalidateQueries({ queryKey: ['me-posts'] });
      queryClient.invalidateQueries({ queryKey: ['me-saved', 'posts'] });
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'posts'] });
    },
  });
};
