import { getImage } from '@/lib/utils';
import { FeedCardImage } from './feed-card-image';
import { useFeedCardContext } from './feed-card-context';

export const FeedCardContent = () => {
  const { post } = useFeedCardContext();

  return (
    <FeedCardImage
      src={getImage(post.imageUrl)}
      alt={post.caption ?? 'post image'}
    />
  );
};
