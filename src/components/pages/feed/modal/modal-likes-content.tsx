import { Button } from '@/components/ui/button';
import {
  UserInfo,
  UserInfoAvatar,
  UserInfoContent,
  UserInfoTitle,
  UserInfoSubTitle,
} from '../../../container/user-info';
import { useGetLikesByPost, useFollowAct } from '@/hooks';
import { CircleCheck } from 'lucide-react';

type ModalLikesContentProps = {
  postId: number;
};

export const ModalLikesContent = ({ postId }: ModalLikesContentProps) => {
  const { data, isLoading } = useGetLikesByPost(postId);
  const likes = data?.pages.flatMap((page) => page.data?.users ?? []) ?? [];

  const { getFollowState, handleFollowAct } = useFollowAct(postId);

  if (isLoading) {
    return (
      <div className='py-10 text-center text-muted-foreground'>Loading...</div>
    );
  }

  if (!likes || likes.length === 0) {
    return (
      <div className='py-10 text-center text-muted-foreground'>
        No likes yet.
      </div>
    );
  }

  return (
    <div className='space-y-5'>
      {likes.map((like) => {
        const isFollowed = getFollowState(like);

        return (
          <div className='flex-between' key={like.id}>
            <UserInfo username={like.username}>
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
            <Button
              variant={isFollowed || like.isMe ? 'outline' : 'default'}
              onClick={() => handleFollowAct(like)}
              disabled={like.isMe}
              className='min-w-[127px]'
            >
              {like.isMe ? (
                'You'
              ) : isFollowed ? (
                <span className='flex-start gap-1.5'>
                  <CircleCheck className='h-4 w-4' />
                  <p>Following</p>
                </span>
              ) : (
                'Follow'
              )}
            </Button>
          </div>
        );
      })}
    </div>
  );
};
