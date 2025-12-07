import {
  UserInfo,
  UserInfoAvatar,
  UserInfoContent,
  UserInfoTitle,
  UserInfoSubTitle,
} from '@/components/container/user-info';
import { useFeedCardContext } from './feed-card-context';

export const FeedCardHeader = () => {
  const { post, dayAgo } = useFeedCardContext();

  return (
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
  );
};
