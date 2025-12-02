import React from 'react';
import { ImageLogo } from '@/components/container';
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import ProfileAvatar from './nav-avatar';
import { NavSearchBar } from './nav-search';
import { Search, X } from 'lucide-react';
import NavDropdownMenu from './nav-dropdown-menu';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import NavContainer from './nav-container';

const Navbar = () => {
  const { user, token } = useAppSelector((state: RootState) => state.auth);

  const [menu, setMenu] = React.useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false);
  const isLoggedIn = Boolean(token);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const q = searchParams.get('q') ?? '';

  const updateSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <NavContainer>
      <ImageLogo className={cn(isSearchOpen && 'hidden')} />

      <NavSearchBar
        isLoggedIn={isLoggedIn}
        isSearchOpen={isSearchOpen}
        value={q}
        onChange={(e) => updateSearch(e.target.value)}
      />

      <span>
        <div className={cn(!isSearchOpen && 'hidden')}>
          <X onClick={() => setIsSearchOpen(false)} />
        </div>

        <span className={cn('flex-center gap-4', isSearchOpen && 'hidden')}>
          <Search
            className='md:hidden size-6 '
            onClick={() => setIsSearchOpen(true)}
          />

          {isLoggedIn ? (
            <ProfileAvatar avatarUrl={user?.profile.avatarUrl} />
          ) : (
            <NavDropdownMenu open={menu} setOpen={setMenu} />
          )}
        </span>
      </span>
    </NavContainer>
  );
};

export default Navbar;
