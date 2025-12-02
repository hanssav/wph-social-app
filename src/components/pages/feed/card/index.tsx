import { cn, getImage } from '@/lib/utils';
import { Post } from '@/types';
import { ComponentProps } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FeedUserInfo } from './feed-card-user-info';
import { FeedCardImage } from './feed-card-image';
import {
  FEED_CARD_ICONS,
  FeedCardActions,
  FeedCardActionsItem,
} from './feed-card.-icons';
import ExpandableText from '@/components/container/expandable-text';

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
  post: Post | undefined;
};

export const FeedCardItem = ({ post }: FeedCardItemProps) => {
  return (
    <div className='space-y-2 md:space-y-3'>
      {/* Image and User Information */}
      <div className='space-y-2 md:space-y-3'>
        <FeedUserInfo {...post} />
        <FeedCardImage
          src={getImage(post?.imageUrl)}
          alt={post?.caption ?? 'post image'}
        />
      </div>
      {/* like comment share etc */}
      <div className='flex-between'>
        <FeedCardActions>
          {FEED_CARD_ICONS(post).map(
            (icon, idx) =>
              idx < 3 && <FeedCardActionsItem data={icon} key={idx} />
          )}
        </FeedCardActions>
        <FeedCardActionsItem data={FEED_CARD_ICONS(post)[3]} />
      </div>
      {/* detail, user, show more descripton */}
      <div className='md:space-y-1'>
        <h3 className='text-sm-bold md:text-md-bold'>{post?.author.name}</h3>
        <ExpandableText text={post?.caption ?? ''} />
      </div>
    </div>
  );
};
