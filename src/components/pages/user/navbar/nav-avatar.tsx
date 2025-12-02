import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { getImage } from '@/lib/utils';
import { User } from '@/types';
import React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

type Props = {
  name?: User['name'];
  avatarUrl?: User['avatarUrl'];
} & React.ComponentProps<typeof AvatarPrimitive.Image>;

const NavProfileAvatar = ({ name, avatarUrl, ...props }: Props) => {
  return (
    <Avatar className='size-10 md:size-12 cursor-pointer'>
      <AvatarImage
        src={getImage(avatarUrl ?? '', 'avatar')}
        alt={`@${name ?? avatarUrl}`}
        {...props}
      />
    </Avatar>
  );
};

export default NavProfileAvatar;
