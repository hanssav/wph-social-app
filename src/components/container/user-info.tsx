import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ComponentProps } from 'react';

type UserAvatarProps = {
  src: string;
  alt: string;
  className?: string;
};

export function UserInfoAvatar({ src, alt, className }: UserAvatarProps) {
  return (
    <Avatar className={cn('size-11 md:size-16', className)}>
      <AvatarImage src={src} alt={alt} className='object-cover' />

      <AvatarFallback className='bg-muted text-muted-foreground font-medium'>
        {alt?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}

export const UserInfoContent = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  return <div className={cn('space-y-0.5', className)} {...props} />;
};

export const UserInfoTitle = ({
  className,
  ...props
}: ComponentProps<'h4'>) => {
  return (
    <h4 className={cn('text-sm-bold md:text-md-bold', className)} {...props} />
  );
};

export const UserInfoSubTitle = ({
  className,
  ...props
}: ComponentProps<'p'>) => {
  return (
    <p
      className={cn('text-xs-regular md:text-sm-regular', className)}
      {...props}
    />
  );
};

export const UserInfo = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={cn('flex-start gap-2 md:gap-3', className)} {...props} />
  );
};
