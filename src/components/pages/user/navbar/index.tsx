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
import { usePathname, useRouter } from 'next/navigation';
import { PATH } from '@/constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FOOTER_DATA, LOGOUT_MENU } from '@/constants/footer.constants';
import { useLogout } from '@/hooks';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useLogout();
  const { user, token } = useAppSelector((state: RootState) => state.auth);
  const [menu, setMenu] = React.useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false);
  const isLoggedIn = Boolean(token);

  React.useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isSearchOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isSearchOpen]);

  const menuItems = [...FOOTER_DATA, LOGOUT_MENU];

  const handleClick = (action: string | undefined) => {
    if (!action) return;

    if (action === 'logout') {
      logout();
    } else {
      router.push(action);
    }
  };

  return (
    <NavContainer className={cn(isSearchOpen && 'bg-neutral-950')}>
      <ImageLogo
        className={cn(isSearchOpen && 'hidden md:block')}
        onClick={() => router.push(PATH.FEED)}
      />
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
            className='md:hidden size-6'
            onClick={() => setIsSearchOpen(true)}
          />
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  <ProfileAvatar avatarUrl={user?.profile?.avatarUrl} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-56 space-y-1'>
                {menuItems.map((item) => {
                  const isActive = pathname.includes(item?.action ?? '');

                  return (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => handleClick(item.action)}
                      className={cn(
                        'flex items-center gap-3 cursor-pointer px-4 py-3 hover:!bg-primary-300/50',
                        isActive && 'bg-primary-300/50',
                        item.action === 'logout' &&
                          'text-rose-600 hover:!bg-primary-300/50 focus:text-rose-700 focus:bg-rose-100 dark:text-rose-400 dark:hover:text-rose-300dark:focus:text-rose-300 dark:focus:bg-rose-950/40 '
                      )}
                    >
                      <item.icon
                        className={cn(
                          'w-5 h-5',
                          item.action === 'logout' &&
                            'text-rose-600 dark:text-rose-400'
                        )}
                      />
                      <span className='font-medium'>{item.label}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavDropdownMenu open={menu} setOpen={setMenu} />
          )}
        </span>
      </span>
    </NavContainer>
  );
};

export default Navbar;
