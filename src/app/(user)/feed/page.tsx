'use client';

import { FeedCardItem, FeedCards } from '@/components/pages/feed/card';
import Spin from '@/components/ui/spin';
import { useInfiniteFeeds } from '@/hooks';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';

import { motion } from 'motion/react';
import Image from 'next/image';

const FeedPage = () => {
  const { post, isLoading: isPostLoading } = useAppSelector(
    (state: RootState) => state.post
  );

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteFeeds({ limit: 20 });

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const feeds = data?.pages.flatMap((page) => page.data?.items ?? []) ?? [];

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className='container-600'>
      <FeedCards>
        {post && isPostLoading && (
          <div className='bg-neutral-950 rounded-lg border border-neutral-900 p-4'>
            <div className='flex items-center gap-3'>
              {post.imageUrl && (
                <div className='size-16 relative rounded overflow-hidden flex-shrink-0 bg-neutral-950'>
                  <Image
                    src={post.imageUrl}
                    alt='Preview'
                    fill
                    className='object-cover opacity-70'
                  />
                </div>
              )}

              <div className='flex-1 space-y-2'>
                <p className='text-sm text-neutral-300'>
                  Uploading your post...
                </p>
                <div className='h-1.5 bg-neutral-950 rounded-full overflow-hidden mb-10'>
                  <motion.div
                    className='h-full bg-primary-200 rounded-full'
                    initial={{ width: '0%' }}
                    animate={{ width: '95%' }}
                    transition={{
                      duration: 1.5,
                      ease: 'easeOut',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {feeds.length > 0 ? (
          <>
            {feeds.map((feed) => (
              <FeedCardItem key={feed.id} post={feed} />
            ))}

            <div ref={ref} className='h-20 flex-center'>
              {(isFetchingNextPage || isLoading) && <Spin />}
              {!hasNextPage && feeds.length > 0 && (
                <p className='text-neutral-600 text-sm'>
                  You&apos;re all caught up!
                </p>
              )}
            </div>
          </>
        ) : !post ? (
          <div className='py-20 px-6 text-center'>
            <div className='mx-auto w-32 h-32 mb-6 opacity-50'></div>
            <h3 className='text-xl font-semibold text-neutral-25 mb-2'>
              No posts yet
            </h3>
            <p className='text-neutral-600'>
              Follow someone or create your first post
            </p>
          </div>
        ) : null}
      </FeedCards>
    </div>
  );
};

export default FeedPage;
