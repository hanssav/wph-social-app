import React from 'react';
import { useSearchUsers } from './use-search-users';
import type { User } from '@/types';

type UseNavSearchProps = {
  setIsSearchOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectUser?: (user: User) => void;
};

export const useNavSearch = ({
  setIsSearchOpen,
  onSelectUser,
}: UseNavSearchProps) => {
  const [search, setSearch] = React.useState('');
  const [debounced, setDebounced] = React.useState('');
  const [isMobile, setIsMobile] = React.useState(false);

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch users
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useSearchUsers({ q: debounced, limit: 10 });

  const users = data?.pages.flatMap((p) => p.data.users) || [];

  // Debug logging
  // React.useEffect(() => {
  //   console.log('Search data:', {
  //     totalUsers: users.length,
  //     pages: data?.pages.length,
  //     hasNextPage,
  //     isFetchingNextPage,
  //     isLoading,
  //   });
  // }, [
  //   users.length,
  //   data?.pages.length,
  //   hasNextPage,
  //   isFetchingNextPage,
  //   isLoading,
  // ]);

  // Infinite scroll with Intersection Observer
  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Detect mobile
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handlers
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.length >= 2) setIsSearchOpen?.(true);
  };

  const onClear = () => {
    setSearch('');
    setIsSearchOpen?.(false);
  };

  const onSelect = (user: User) => {
    onSelectUser?.(user);
    setIsSearchOpen?.(false);
    setSearch('');
  };

  return {
    // State
    search,
    users,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isMobile,

    // Refs
    loadMoreRef,

    // Handlers
    onChange,
    onClear,
    onSelect,
  };
};
