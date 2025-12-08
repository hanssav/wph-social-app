import { cn } from '@/lib/utils';
import {
  UserInfo,
  UserInfoAvatar,
  UserInfoContent,
  UserInfoTitle,
  UserInfoSubTitle,
} from '@/components/container/user-info';
import { FollowUser } from '@/types';

export type UserFollowItemProps = {
  user: FollowUser;
  className?: string;
};

export const UserFollowItem = ({ user, className }: UserFollowItemProps) => {
  const { name, username, avatarUrl } = user;

  return (
    <div className={cn('flex-between', className)}>
      <UserInfo>
        <UserInfoAvatar className='size-12' src={avatarUrl ?? ''} alt={name} />

        <UserInfoContent>
          <UserInfoTitle>{name}</UserInfoTitle>
          <UserInfoSubTitle>{username}</UserInfoSubTitle>
        </UserInfoContent>
      </UserInfo>
    </div>
  );
};
