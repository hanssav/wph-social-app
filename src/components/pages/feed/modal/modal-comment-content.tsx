import { commentService } from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  UserInfo,
  UserInfoAvatar,
  UserInfoContent,
  UserInfoTitle,
  UserInfoSubTitle,
} from '../card/feed-card-user-info';
import dayjs from 'dayjs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Smile } from 'lucide-react';
import Image from 'next/image';
import { CommentListResponse, Post } from '@/types';
import { feedKeys } from '@/hooks';
import React from 'react';

type Props = {
  post: Post;
};
export const ModalCommentContent = ({ post }: Props) => {
  const postId = post.id;
  const [commentText, setCommentText] = React.useState('');

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

  return (
    <div className='flex flex-col md:flex-row md:max-h-[768px]'>
      {/* IMAGES */}
      <div className='hidden md:block md:flex-3 relative max-h-[768px] aspect-square overflow-hidden'>
        <Image
          fill
          src={post.imageUrl}
          alt={post.caption}
          loading='eager'
          sizes='100vh'
          className='object-cover'
        />
      </div>

      <div className='space-y-3 py-4 md:flex-2 relative'>
        <h1 className='md:hidden text-md-bold px-8'>Comments</h1>

        <div className='space-y-3 px-8 pb-[96px] md:flex-1 overflow-y-auto max-h-[600px]'>
          {isLoading ? (
            <div className='py-10 text-center text-muted-foreground'>
              Loading comments...
            </div>
          ) : comments.length === 0 ? (
            <div className='py-10 text-center text-muted-foreground'>
              No comments yet. Be the first to comment!
            </div>
          ) : (
            comments.map((comment) => {
              const dayAgo = dayjs(comment.createdAt).fromNow();

              return (
                <div className='space-y-2 md:space-y-4' key={comment.id}>
                  <UserInfo>
                    <UserInfoAvatar
                      className='size-10'
                      src={comment.author.avatarUrl ?? ''}
                      alt={comment.author.name}
                    />
                    <UserInfoContent>
                      <UserInfoTitle>{comment.author.name}</UserInfoTitle>
                      <UserInfoSubTitle>{dayAgo}</UserInfoSubTitle>
                    </UserInfoContent>
                  </UserInfo>
                  <p className='text-xs-regular md:text-sm-regular text-[#FDFDFD]'>
                    {comment.text}
                  </p>
                </div>
              );
            })
          )}
        </div>

        <div className='absolute bottom-6 flex-center gap-2 w-full mx-0 px-8'>
          <Button
            variant='outline'
            size='icon-lg'
            className='rounded-md border-neutral-900'
          >
            <Smile />
          </Button>
          <div className='relative flex-1'>
            <Input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
              disabled={addCommentMutation.isPending}
              className='flex-1 placeholder:text-neutral-600'
              placeholder='Add Comment'
            />
            <Button
              variant='ghost'
              onClick={handleAddComment}
              disabled={!commentText.trim() || addCommentMutation.isPending}
              className='text-neutral-600 absolute right-0 -translate-y-1/2 top-1/2 h-12 rounded-md disabled:opacity-50'
            >
              {addCommentMutation.isPending ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
