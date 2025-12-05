'use client';
import { getErrorMessage } from '@/api';
import { PATH } from '@/constants';
import { UpdateProfileRequest } from '@/schema/porfile.schema';
import { meServices } from '@/services';
import { useAppDispatch } from '@/store/hooks';
import { setUser, updateUser } from '@/store/slices/auth-slice';
import { MeResponse, UserProfile } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { meKeys } from './use-auth';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: meServices.updateProfile,

    onMutate: async (newProfile: UpdateProfileRequest) => {
      await queryClient.cancelQueries({ queryKey: meKeys.me });

      const previousData = queryClient.getQueryData<MeResponse>(meKeys.me);

      if (previousData) {
        const profile: Partial<UserProfile> = {
          ...previousData.data.profile,
          name: newProfile.name || previousData.data.profile.name,
          username: newProfile.username || previousData.data.profile.username,
          phone: newProfile.phone || previousData.data.profile.phone,
          bio: newProfile.bio || previousData.data.profile.bio,
        };

        queryClient.setQueryData<MeResponse>(meKeys.me, {
          ...previousData,
          data: {
            ...previousData.data,
            profile: profile as UserProfile,
          },
        });

        dispatch(
          updateUser({
            profile: profile as UserProfile,
          })
        );
      }

      return { previousData };
    },

    onSuccess: async (data) => {
      const userData = data.data as any;

      let mePayload;
      if (userData.profile && userData.stats) {
        mePayload = userData;
      } else {
        const currentUser = queryClient.getQueryData<MeResponse>(meKeys.me);
        const currentStats = currentUser?.data?.stats || {
          posts: 0,
          followers: 0,
          following: 0,
          likes: 0,
        };

        mePayload = {
          profile: userData,
          stats: currentStats,
        };
      }

      const updatedMeResponse: MeResponse = {
        success: true,
        message: 'Profile updated',
        data: mePayload,
      };

      queryClient.setQueryData<MeResponse>(meKeys.me, updatedMeResponse);
      dispatch(setUser(mePayload));

      toast.success('Profile updated successfully!');

      queryClient.invalidateQueries({ queryKey: ['feeds'] });
      queryClient.invalidateQueries({ queryKey: meKeys.posts() });

      await new Promise((resolve) => setTimeout(resolve, 100));

      router.push(PATH.PROFILE);
      router.refresh();
    },

    onError: (error, _newProfile, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<MeResponse>(meKeys.me, context.previousData);

        dispatch(
          updateUser({
            profile: context.previousData.data.profile,
          })
        );
      }

      toast.error(getErrorMessage(error));
    },
  });
};
