import { cn } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';

export const ProfileImages = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return <div className={cn('grid grid-cols-3 gap-1', className)} {...props} />;
};

export const ProfileImagesItem = ({ className, ...props }: ImageProps) => {
  return (
    <div className='relative w-full aspect-square overflow-hidden rounded-sm'>
      <Image
        {...props}
        loading='eager'
        fill
        className={cn('object-cover', className)}
        sizes='(max-width: 768px) 33vw, 33vw'
      />
    </div>
  );
};
