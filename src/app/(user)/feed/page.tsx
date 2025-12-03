'use client';
import { FeedCardItem, FeedCards } from '@/components/pages/feed/card';
import { useInfiniteFeeds } from '@/hooks/use-infinite-feeds';

const FeedPage = () => {
  const { data } = useInfiniteFeeds();

  const feeds = data?.pages.flatMap((feed) => feed.data?.items ?? []) ?? [];

  return (
    <div className='container-600'>
      <FeedCards>
        {feeds?.map((feed) => (
          <FeedCardItem key={feed?.id} post={feed} />
        ))}
      </FeedCards>
    </div>
  );
};

export default FeedPage;
