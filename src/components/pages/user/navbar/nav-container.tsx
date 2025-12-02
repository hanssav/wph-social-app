import { cn } from '@/lib/utils';
import React, { ComponentProps } from 'react';

const NavContainer = ({
  className,
  children,
  ...props
}: ComponentProps<'nav'>) => {
  return (
    <header className='fixed top-0 w-full z-50 backdrop-blur-md'>
      <nav
        className={cn('base-container-x flex-between py-4 gap-6', className)}
        {...props}
      >
        {children}
      </nav>
    </header>
  );
};

export default NavContainer;
