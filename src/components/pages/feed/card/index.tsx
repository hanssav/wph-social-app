import { cn } from '@/lib/utils';
import { Post } from '@/types';
import { ComponentProps, useMemo } from 'react';
import { useDialog } from '@/lib/dialog-context';
import { useFeedActions } from '@/hooks';
import { ModalCommentContent } from '../modal/modal-comment-content';
import { ModalLikesContent } from '../modal/modal-likes-content';
import { FeedCardProvider } from './feed-card-context';
import { FeedCardHeader } from './feed-card-header';
import { FeedCardContent } from './feed-card-content';
import { FeedCardActionsBar } from './feed-card-actions-bar';
import { FeedCardCaption } from './feed-card-caption';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const FeedCards = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn('grid grid-cols-1 gap-4 md:gap-6', className)}
      {...props}
    />
  );
};

type FeedCardItemProps = {
  post: Post;
};

export const FeedCardItem = ({ post }: FeedCardItemProps) => {
  const dayAgo = dayjs(post.createdAt).fromNow();
  const { openDialog } = useDialog();

  const { iconActions } = useFeedActions({
    post,
    onShowLikes: () => {
      openDialog({
        title: 'Likes',
        content: <ModalLikesContent postId={post.id} />,
      });
    },
    onShowComments: () => {
      openDialog({
        content: <ModalCommentContent post={post} />,
        className: 'md:max-w-[1200px] p-0!',
      });
    },
    onShowShare: () => {},
  });

  const providerValue = useMemo(
    () => ({ post, iconActions, dayAgo }),
    [post, iconActions, dayAgo]
  );

  return (
    <FeedCardProvider value={providerValue}>
      <div className='space-y-2 md:space-y-3'>
        <div className='space-y-2 md:space-y-3'>
          <FeedCardHeader />
          <FeedCardContent />
        </div>
        <FeedCardActionsBar />
        <FeedCardCaption />
      </div>
    </FeedCardProvider>
  );
};
