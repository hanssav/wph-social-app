'use client';

import { Post } from '@/types';
import { createContext, useContext, ReactNode } from 'react';
import { FeedIconAction } from '@/hooks/use-feed-action';

type FeedCardContextType = {
  post: Post;
  iconActions: FeedIconAction[];
  dayAgo: string;
};

const FeedCardContext = createContext<FeedCardContextType | undefined>(
  undefined
);

export const useFeedCardContext = () => {
  const context = useContext(FeedCardContext);
  if (!context) {
    throw new Error('useFeedCardContext must be used within FeedCardProvider');
  }
  return context;
};

type FeedCardProviderProps = {
  children: ReactNode;
  value: FeedCardContextType;
};

export const FeedCardProvider = ({
  children,
  value,
}: FeedCardProviderProps) => {
  return (
    <FeedCardContext.Provider value={value}>
      {children}
    </FeedCardContext.Provider>
  );
};
