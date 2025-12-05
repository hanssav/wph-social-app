import React from 'react';
import { ImageLogo } from '@/components/container';
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import ProfileAvatar from './nav-avatar';
import { NavSearchBar } from './nav-search';
import { Search, X } from 'lucide-react';
import NavDropdownMenu from './nav-dropdown-menu';
import { cn } from '@/lib/utils';
import NavContainer from './nav-container';

const Navbar = () => {
  const { user, token } = useAppSelector((state: RootState) => state.auth);

  const [menu, setMenu] = React.useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false);
  const isLoggedIn = Boolean(token);

  React.useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isSearchOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isSearchOpen]);

  return (
    <NavContainer className={cn(isSearchOpen && 'bg-neutral-950')}>
      <ImageLogo className={cn(isSearchOpen && 'hidden md:block')} />

      <NavSearchBar
        isLoggedIn={isLoggedIn}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />

      <span>
        <div className={cn(!isSearchOpen && 'hidden md:block')}>
          <X onClick={() => setIsSearchOpen(false)} className='md:hidden' />
        </div>

        <span
          className={cn('flex-center gap-4', isSearchOpen && 'hidden md:block')}
        >
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
