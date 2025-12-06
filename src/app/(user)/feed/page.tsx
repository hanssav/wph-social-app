'use client';
import { FeedCardItem, FeedCards } from '@/components/pages/feed/card';
import Spin from '@/components/ui/spin';
import { useInfiniteFeeds } from '@/hooks';
import React from 'react';
import { useInView } from 'react-intersection-observer';

const FeedPage = () => {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteFeeds({ limit: 20 });
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const feeds = data?.pages.flatMap((feed) => feed.data?.items ?? []) ?? [];

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <div className='container-600'>
      <FeedCards>
        {feeds?.map((feed) => (
          <FeedCardItem key={feed?.id} post={feed} />
        ))}
        <div ref={ref} className='h-20 flex-center'>
          {isFetchingNextPage && <Spin />}
        </div>
      </FeedCards>
    </div>
  );
};

export default FeedPage;
