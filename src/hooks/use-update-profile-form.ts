'use client';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { UpdateProfileRequest } from '@/schema/porfile.schema';
import { UserProfile } from '@/types';

interface UseUpdateProfileFormProps {
  profile?: UserProfile;
}

export const useUpdateProfileForm = ({ profile }: UseUpdateProfileFormProps) => {
  const getDefaultValues = React.useCallback((): UpdateProfileRequest => {
    return {
      avatar: undefined,
      email: profile?.email ?? '',
      avatarUrl: profile?.avatarUrl ?? '',
      bio: profile?.bio ?? '',
      name: profile?.name ?? '',
      phone: profile?.phone ?? '',
      username: profile?.username ?? '',
    };
  }, [profile]);

  const resetFormWithProfile = React.useCallback(
    (form: UseFormReturn<UpdateProfileRequest>) => {
      if (profile) {
        form.reset(getDefaultValues());
      }
    },
    [profile, getDefaultValues]
  );

  return {
    getDefaultValues,
    resetFormWithProfile,
  };
};
