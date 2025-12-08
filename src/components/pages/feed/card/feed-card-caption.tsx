import { ExpandableText } from '@/components/container';
import { useFeedCardContext } from './feed-card-context';

export const FeedCardCaption = () => {
  const { post } = useFeedCardContext();

  return (
    <div className='md:space-y-1'>
      <h3 className='text-sm-bold md:text-md-bold'>{post.author.name}</h3>
      <ExpandableText text={post.caption ?? ''} />
    </div>
  );
};
