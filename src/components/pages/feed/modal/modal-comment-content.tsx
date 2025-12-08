import dayjs from 'dayjs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Smile } from 'lucide-react';
import Image from 'next/image';
import { Post } from '@/types';
import Spin from '@/components/ui/spin';
import {
  DropdownMenu,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { EMOJIS } from '@/constants/emojis.constants';
import { useCommentWithActions } from '../hooks/use-comment-with-Actions';
import { useInputWithEmoji } from '../hooks/use-input-with-emoji';
import { FeedCardActions, FeedCardActionsItem } from '../card/feed-card.-icons';
import { useFeedActions } from '@/hooks';
import {
  UserInfo,
  UserInfoAvatar,
  UserInfoContent,
  UserInfoTitle,
  UserInfoSubTitle,
} from '@/components/container/user-info';

type Props = {
  post: Post;
};

export const ModalCommentContent = ({ post }: Props) => {
  const {
    commentText,
    handleCursorChange,
    handleInputChange,
    inputRef,
    insertEmoji,
    setCommentText,
  } = useInputWithEmoji();

  const { addCommentMutation, comments, handleAddComment, isLoading } =
    useCommentWithActions({ post: post, setCommentText, commentText });

  const lastCreatedTIme = dayjs(post.createdAt).fromNow();

  const { iconActions } = useFeedActions({ post });

  return (
    <div className='flex flex-col md:flex-row md:max-h-[768px]'>
      {/* IMAGES */}
      <div className='hidden md:block md:flex-3 relative max-h-[768px] aspect-square overflow-hidden'>
        <Image
          fill
          src={post.imageUrl}
          alt={post.caption || `Post ${post.id} by ${post.author.username}`}
          loading='eager'
          sizes='100vh'
          className='object-cover'
        />
      </div>

      <div className='md:flex-2 md:space-y-4 relative'>
        <div className='hidden md:block space-y-2 md:space-y-4 px-8 py-4'>
          <UserInfo username={post.author.username}>
            <UserInfoAvatar
              className='size-10'
              src={post.author.avatarUrl ?? ''}
              alt={post.author.name}
            />
            <UserInfoContent>
              <UserInfoTitle>{post.author.name}</UserInfoTitle>
              <UserInfoSubTitle>{lastCreatedTIme}</UserInfoSubTitle>
            </UserInfoContent>
          </UserInfo>
          <p className='text-xs-regular md:text-sm-regular text-[#FDFDFD]'>
            {post.caption}
          </p>
        </div>

        <div className='space-y-3 py-4'>
          <h1 className='md:hidden text-md-bold px-8'>Comments</h1>

          <div className='space-y-3 px-8 pb-[96px] md:flex-1 overflow-y-auto max-h-[600px]'>
            {isLoading ? (
              <div className='flex-center min-h-56'>
                <Spin />
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
                    <UserInfo username={comment.author.username}>
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
        </div>

        <div className='absolute bottom-0 space-y-2 w-full mx-0 px-8 backdrop-blur-lg py-2'>
          <div className='flex-between px-1.5'>
            <FeedCardActions className='invisible md:visible'>
              {iconActions.map(
                (icon, idx) =>
                  idx < 3 && <FeedCardActionsItem data={icon} key={idx} />
              )}
            </FeedCardActions>

            <FeedCardActionsItem data={iconActions[3]} />
          </div>
          <div className='flex-center gap-2 w-full'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  size='icon-lg'
                  className='rounded-md border-neutral-900 size-12'
                >
                  <Smile />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='grid grid-cols-6 gap-[10px] p-4'
                side='top'
                align='start'
                sideOffset={10}
              >
                {EMOJIS.map((emoji, idx) => (
                  <Button
                    key={idx}
                    size={'ghost'}
                    variant={'ghost'}
                    className='size-6 text-2xl p-0 hover:scale-125 transition-transform'
                    onClick={() => insertEmoji(emoji)}
                  >
                    {emoji}
                  </Button>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className='relative flex-1'>
              <Input
                ref={inputRef}
                value={commentText}
                onChange={handleInputChange}
                onClick={handleCursorChange}
                onKeyUp={handleCursorChange}
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
                className='text-primary-200 hover:text-primary-200/80 absolute right-0 -translate-y-1/2 top-1/2 h-12 rounded-md disabled:opacity-50'
              >
                {addCommentMutation.isPending ? 'Posting...' : 'Post'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
