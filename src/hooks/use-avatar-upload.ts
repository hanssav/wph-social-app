'use client';
import React from 'react';
import { FieldErrors, UseFormReturn } from 'react-hook-form';
import { UpdateProfileRequest } from '@/schema/porfile.schema';
import { toast } from 'sonner';

interface UseAvatarUploadProps {
  form: UseFormReturn<UpdateProfileRequest>;
  initialAvatarUrl?: string | null;
}

export const useAvatarUpload = ({
  form,
  initialAvatarUrl,
}: UseAvatarUploadProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);

  const handleFileChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      form.setValue('avatar', file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [form]
  );

  const handleChangePhotoClick = React.useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const resetPreview = React.useCallback(() => {
    setAvatarPreview(null);
  }, []);

  const currentAvatarUrl = avatarPreview ?? initialAvatarUrl ?? '';

  const handleAvatarError = (errors: FieldErrors<UpdateProfileRequest>) => {
    if (errors.avatar?.message) {
      toast.error(errors.avatar.message);
      return;
    }

    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      toast.error(firstError.message);
    }
  };

  return {
    fileInputRef,
    avatarPreview,
    currentAvatarUrl,
    handleFileChange,
    handleChangePhotoClick,
    resetPreview,
    handleAvatarError,
  };
};
