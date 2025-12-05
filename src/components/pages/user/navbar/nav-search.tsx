import React from 'react';
import { Search, X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useNavSearch } from '@/hooks';
import type { ComponentProps } from 'react';
import type { User } from '@/types';
import {
  UserInfo,
  UserInfoAvatar,
  UserInfoContent,
  UserInfoTitle,
  UserInfoSubTitle,
} from '@/components/pages/feed/card/feed-card-user-info';
import Spin from '@/components/ui/spin';

type NavSearchBarProps = {
  isLoggedIn?: boolean;
  isSearchOpen?: boolean;
  setIsSearchOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectUser?: (user: User) => void;
} & ComponentProps<'input'>;

export const NavSearchBar: React.FC<NavSearchBarProps> = ({
  isLoggedIn,
  isSearchOpen = false,
  setIsSearchOpen,
  onSelectUser,
  ...props
}) => {
  const {
    search,
    users,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isMobile,
    loadMoreRef,
    onChange,
    onClear,
    onSelect,
  } = useNavSearch({
    isSearchOpen,
    setIsSearchOpen,
    onSelectUser,
  });

  if (!isLoggedIn && !isSearchOpen) return null;

  return (
    <div
      className={cn(
        'flex-1 md:max-w-[500px]',
        !isSearchOpen && 'hidden md:block'
      )}
    >
      <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen} modal={false}>
        <PopoverTrigger asChild>
          <div className='relative flex-1 flex-center'>
            <Search
              className='absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600'
              size={15}
            />
            <Input
              value={search}
              onChange={onChange}
              onFocus={() => {
                if (!isMobile && search.length >= 2) {
                  setIsSearchOpen?.(true);
                }
              }}
              onClick={(e) => {
                if (isMobile && isSearchOpen) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              placeholder='Search User'
              className='rounded-full h-10 md:h-11 pl-10 pr-10'
              {...props}
            />
            {search && (
              <button
                onClick={onClear}
                className='absolute right-3 top-1/2 -translate-y-1/2'
              >
                <X size={15} />
              </button>
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent
          className={cn(
            'w-screen md:w-[var(--radix-popover-trigger-width)]',
            'h-[100vh] md:h-auto md:max-h-[60vh]',
            'p-0 rounded-t-3xl md:rounded-[20px]',
            'border-0 border-neutral-900 md:border',
            'bg-neutral-950'
          )}
          align='start'
          side='bottom'
          onOpenAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => {
            const target = e.target as HTMLElement;
            if (isMobile && target.tagName === 'INPUT') {
              e.preventDefault();
            }
          }}
          sideOffset={16}
        >
          <div className='h-full max-h-[90vh] md:max-h-[60vh] overflow-y-auto '>
            {isLoading ? (
              <div className='flex-center py-12'>
                <Spin className='h-8 w-8' />
              </div>
            ) : search.length < 2 ? (
              <div className='py-12 text-center text-sm text-neutral-600'>
                Type at least 2 characters
              </div>
            ) : users.length === 0 ? (
              <div className='py-12 text-center text-sm text-neutral-600'>
                No users found
              </div>
            ) : (
              <div className='p-2'>
                {users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => onSelect(user)}
                    className='cursor-pointer hover:bg-accent rounded-md p-2 transition-colors'
                  >
                    <UserInfo className='w-full'>
                      <UserInfoAvatar
                        src={user.avatarUrl ?? ''}
                        alt={user.name}
                        className='size-10'
                      />
                      <UserInfoContent>
                        <UserInfoTitle className='truncate'>
                          {user.name}
                        </UserInfoTitle>
                        <UserInfoSubTitle className='truncate'>
                          @{user.username}
                        </UserInfoSubTitle>
                      </UserInfoContent>
                    </UserInfo>
                  </div>
                ))}

                {hasNextPage && (
                  <div
                    ref={loadMoreRef}
                    className='h-10 flex items-center justify-center'
                  >
                    {isFetchingNextPage && <Spin className='h-5 w-5' />}
                  </div>
                )}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
