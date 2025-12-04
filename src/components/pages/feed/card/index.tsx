import { cn, getImage } from '@/lib/utils';
import { Post } from '@/types';
import { ComponentProps } from 'react';
import { FeedCardImage } from './feed-card-image';
import { FeedCardActions, FeedCardActionsItem } from './feed-card.-icons';
import { useDialog } from '@/lib/dialog-context';
import {
  UserInfo,
  UserInfoAvatar,
  UserInfoContent,
  UserInfoSubTitle,
  UserInfoTitle,
} from './feed-card-user-info';
import { useFeedActions } from '@/hooks';
import { ExpandableText } from '@/components/container';
import { ModalCommentContent } from '../modal/modal-comment-content';
import { ModalLikesContent } from '../modal/modal-likes-content';

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
        // className: 'md:max-w-[1200px]',
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

  return (
    <div className='space-y-2 md:space-y-3'>
      <div className='space-y-2 md:space-y-3'>
        <UserInfo>
          <UserInfoAvatar
            src={post.author.avatarUrl ?? ''}
            alt={post.author.name ?? 'user'}
          />
          <UserInfoContent>
            <UserInfoTitle>{post.author.name}</UserInfoTitle>
            <UserInfoSubTitle>{dayAgo}</UserInfoSubTitle>
          </UserInfoContent>
        </UserInfo>
        <FeedCardImage
          src={getImage(post.imageUrl)}
          alt={post.caption ?? 'post image'}
        />
      </div>
      <div className='flex-between'>
        <FeedCardActions>
          {iconActions.map(
            (icon, idx) =>
              idx < 3 && <FeedCardActionsItem data={icon} key={idx} />
          )}
        </FeedCardActions>
        <FeedCardActionsItem data={iconActions[3]} />
      </div>
      <div className='md:space-y-1'>
        <h3 className='text-sm-bold md:text-md-bold'>{post.author.name}</h3>
        <ExpandableText text={post.caption ?? ''} />
      </div>
    </div>
  );
};
