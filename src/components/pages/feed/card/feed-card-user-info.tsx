import { getImage } from '@/lib/utils';
import { Post } from '@/types';
import dayjs from 'dayjs';
import Image from 'next/image';

export const FeedUserInfo = (post: Partial<Post>) => {
  const { author } = post;
  const dayAgo = dayjs(post.createdAt).fromNow();

  return (
    <div className='flex-start gap-2 md:gap-3'>
      <div
        className='
          relative overflow-hidden 
          size-11 md:size-[64px] 
          aspect-square
        '
      >
        <Image
          src={getImage(author?.avatarUrl, 'avatar')}
          alt={author?.username ?? 'me'}
          loading='lazy'
          fill
          className='object-cover rounded-full'
          sizes='(max-width: 768px) 44px, 64px'
        />
      </div>

      <div>
        <h4 className='text-sm-bold md:text-md-bold'>{author?.username}</h4>
        <p className='text-xs-regular md:text-sm-regular'>{dayAgo}</p>
      </div>
    </div>
  );
};
