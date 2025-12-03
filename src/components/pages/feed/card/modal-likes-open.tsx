import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { UserLike } from '@/types';
import { ComponentProps } from 'react';
import {
  UserInfo,
  UserInfoAvatar,
  UserInfoContent,
  UserInfoTitle,
  UserInfoSubTitle,
} from './feed-card-user-info';

export const ModalLikesContent = ({ likes }: { likes: UserLike[] }) => {
  if (!likes || likes.length === 0) {
    return (
      <div className='py-10 text-center text-muted-foreground'>
        No likes yet.
      </div>
    );
  }

  return (
    <div className='space-y-5'>
      {likes.map((like) => (
        <div className='flex-between' key={like.id}>
          <UserInfo>
            <UserInfoAvatar
              className='size-12'
              src={like.avatarUrl ?? ''}
              alt={like.name}
            />
            <UserInfoContent>
              <UserInfoTitle>{like.name}</UserInfoTitle>
              <UserInfoSubTitle>{like.username}</UserInfoSubTitle>
            </UserInfoContent>
          </UserInfo>
          <Button>Follow</Button>
        </div>
      ))}
    </div>
  );
};
