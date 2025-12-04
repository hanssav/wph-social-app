import { feedKeys } from '@/hooks';
import { commentService } from '@/services';
import { CommentListResponse, Post } from '@/types';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

type UseCommentWithActionsArgs = {
  post: Post;
  commentText: string;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
};

export const useCommentWithActions = ({
  post,
  commentText,
  setCommentText,
}: UseCommentWithActionsArgs) => {
  const postId = post.id;
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<CommentListResponse>({
    queryKey: ['comments', postId],
    queryFn: () => commentService.get({ id: postId }),
  });

  const comments = data?.data.comments ?? [];

  const addCommentMutation = useMutation({
    mutationFn: (text: string) => commentService.add({ id: postId, text }),

    onMutate: async (text) => {
      await queryClient.cancelQueries({ queryKey: ['comments', postId] });

      const previous = queryClient.getQueryData<CommentListResponse>([
        'comments',
        postId,
      ]);

      queryClient.setQueryData<CommentListResponse>(
        ['comments', postId],
        (oldData) => {
          if (!oldData) return oldData;

          const currentUser = oldData.data.comments[0]?.author ||
            post.author || {
              id: 0,
              name: 'You',
              avatarUrl: '',
            };

          return {
            ...oldData,
            data: {
              ...oldData.data,
              comments: [
                {
                  id: Date.now(),
                  text: text,
                  author: currentUser,
                  createdAt: new Date().toISOString(),
                  isMine: true,
                },
                ...oldData.data.comments,
              ],
            },
          };
        }
      );

      return { previous };
    },

    onError: (error, _, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['comments', postId], context.previous);
      }

      console.error('Add comment error:', error);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: feedKeys.all() });
      setCommentText('');
    },
  });

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    addCommentMutation.mutate(commentText);
  };

  return { isLoading, comments, handleAddComment, addCommentMutation };
};
