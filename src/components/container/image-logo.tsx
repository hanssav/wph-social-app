import { IMAGES } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ComponentProps } from 'react';

export const ImageLogo = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden w-[137px] h-9 cursor-pointer',
        className
      )}
      {...props}
    >
      <Image
        alt='logo'
        src={IMAGES.LOGO}
        loading='eager'
        className='object-cover'
        sizes='(max-width: 768px) 120px, 137px'
        fill
      />
    </div>
  );
};
