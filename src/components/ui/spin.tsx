import { cn } from '@/lib/utils';
import { BaseComponentProps } from '@/types';
import { ComponentProps } from 'react';

const Spin = ({
  className,
  ...props
}: BaseComponentProps & ComponentProps<'div'>) => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div
        className={cn(
          'animate-spin rounded-full h-12 w-12 border-b-2 border-primary-200',
          className
        )}
        {...props}
      />
    </div>
  );
};

export default Spin;
