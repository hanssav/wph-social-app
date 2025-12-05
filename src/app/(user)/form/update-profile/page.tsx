'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  UpdateProfileRequest,
  UpdateProfileSchema,
} from '@/schema/porfile.schema';
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import {
  useUpdateProfile,
  useAvatarUpload,
  useUpdateProfileForm,
} from '@/hooks';
import { PageHeader } from '@/components/container/form-page-header';
import { AvatarUploadSection } from '@/components/pages/profile/avatar-upload-section';
import { ProfileFormSection } from '@/components/pages/profile/profile-form-section';

const UpdateProfile = () => {
  const router = useRouter();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { profile } = user ?? {};

  const updateProfileMutation = useUpdateProfile();
  const { getDefaultValues, resetFormWithProfile } = useUpdateProfileForm({
    profile,
  });

  const form = useForm<UpdateProfileRequest>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: getDefaultValues(),
  });

  const {
    fileInputRef,
    currentAvatarUrl,
    handleFileChange,
    handleChangePhotoClick,
    resetPreview,
  } = useAvatarUpload({
    form,
    initialAvatarUrl: profile?.avatarUrl,
  });

  React.useEffect(() => {
    resetFormWithProfile(form);
    resetPreview();
  }, [profile, resetFormWithProfile, form, resetPreview]);

  const handleSubmit = (data: UpdateProfileRequest) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <div className='container-800 space-y-12'>
      <PageHeader onBack={router.back} title='Edit Profile' />

      <section className='flex flex-col gap-4 md:flex-row md:gap-12'>
        <AvatarUploadSection
          avatarUrl={currentAvatarUrl}
          avatarAlt={profile?.name ?? ''}
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
          onChangePhotoClick={handleChangePhotoClick}
        />

        <ProfileFormSection
          form={form}
          control={form.control}
          onSubmit={handleSubmit}
          isSubmitting={updateProfileMutation.isPending}
        />
      </section>
    </div>
  );
};

export default UpdateProfile;
