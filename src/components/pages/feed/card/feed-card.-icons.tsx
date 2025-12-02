import { cn } from '@/lib/utils';
import { Post } from '@/types';
import { Heart, MessageCircleMore, Send, Bookmark } from 'lucide-react';
import { ComponentProps } from 'react';

export const FEED_CARD_ICONS = (post: Post | undefined) => [
  {
    id: 'like',
    icon: Heart,
    value: post?.likeCount,
  },
  {
    id: 'comment',
    icon: MessageCircleMore,
    value: post?.commentCount,
  },
  { id: 'share', icon: Send, value: post?.shareCount ?? 0 },
  {
    id: 'save',
    icon: Bookmark,
    value: false,
  },
];

export type FeedCardIconType = ReturnType<typeof FEED_CARD_ICONS>[number];

export const FeedCardActions = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div className={cn('flex-start gap-3 md:gap-4', className)} {...props} />
);

export const FeedCardActionsItem = ({
  data,
  className,
  ...props
}: { data: FeedCardIconType } & ComponentProps<'div'>) => {
  const Icon = data.icon;

  return (
    <div className={cn('flex-center gap-1.5', className)} {...props}>
      <Icon className='size-5' />
      <p className='text-sm-semibold md:text-md-semibold'>{data.value}</p>
    </div>
  );
};
