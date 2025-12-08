'use client';

import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ComponentProps } from 'react';
import { PATH } from '@/constants';
import { userKeys } from '@/hooks';
import { userService } from '@/services/user.service';
import router from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

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

export const UserInfo = ({
  className,
  username,
  ...props
}: { username: string } & ComponentProps<'div'>) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleHoverAvatar = async (username: string) => {
    await queryClient.prefetchQuery({
      queryKey: userKeys.getUserByUsername({ username }),
      queryFn: () => userService.getUser({ username }),
    });

    await queryClient.prefetchInfiniteQuery({
      queryKey: userKeys.inifiniteUseranmePosts({ username }),
      initialPageParam: 1,
      queryFn: () => userService.getPostByUsername({ username }),
    });
  };

  const handleClickAvatar = (username: string) => {
    router.push(`${PATH.PROFILE}/${username}`);
  };
  return (
    <div
      className={cn('flex-start gap-2 md:gap-3 cursor-pointer', className)}
      onClick={() => handleClickAvatar(username)}
      onMouseEnter={() => handleHoverAvatar(username)}
      {...props}
    />
  );
};
