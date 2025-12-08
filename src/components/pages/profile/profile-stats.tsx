import { cn } from '@/lib/utils';
import React, { ComponentProps } from 'react';

export const ProfileStats = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  return <div className={cn('flex-between gap-6', className)} {...props} />;
};

type ProfileStatsItemProps = {
  k: string;
  value: number;
  onClick: () => void;
} & ComponentProps<'div'>;

export const ProfileStatsItem = React.memo(
  ({ k, value, onClick }: ProfileStatsItemProps) => {
    return (
      <div className='flex-col-center gap-0.2 cursor-pointer' onClick={onClick}>
        <h4 className='text-lg-bold md:text-xl-bold'>{value}</h4>
        <p className='text-xs-regular md:text-md-regular text-[#A4A7AE]'>{k}</p>
      </div>
    );
  }
);
