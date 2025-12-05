import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserInfoAvatar } from '@/components/container/user-info';

interface AvatarUploadSectionProps {
  avatarUrl: string;
  avatarAlt: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePhotoClick: () => void;
}

export const AvatarUploadSection: React.FC<AvatarUploadSectionProps> = ({
  avatarUrl,
  avatarAlt,
  fileInputRef,
  onFileChange,
  onChangePhotoClick,
}) => {
  return (
    <div className='flex-col-start gap-4 w-full md:w-auto md:shrink-0'>
      <UserInfoAvatar
        src={avatarUrl}
        alt={avatarAlt}
        className='size-[130px]!'
      />

      <Input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={onFileChange}
        className='hidden'
      />

      <Button type='button' variant='outline' onClick={onChangePhotoClick}>
        Change Photo
      </Button>
    </div>
  );
};
