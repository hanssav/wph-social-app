import { apiInstance } from '@/api';
import { UpdateProfileRequest } from '@/schema/porfile.schema';
import { GetPostMeResponse, MeResponse, Pagination } from '@/types';

export const meServices = {
  me: async (): Promise<MeResponse> => {
    const { data } = await apiInstance.get<MeResponse>('/me');
    return data;
  },
  mePost: async (params?: Partial<Pagination>): Promise<GetPostMeResponse> => {
    const { data } = await apiInstance.get<GetPostMeResponse>(`/me/posts`, {
      params,
    });
    return data;
  },
  updateProfile: async (req: UpdateProfileRequest): Promise<MeResponse> => {
    const formData = new FormData();

    if (req.name) formData.append('name', req.name);
    if (req.username) formData.append('username', req.username);
    if (req.phone) formData.append('phone', req.phone);
    if (req.bio) formData.append('bio', req.bio);
    if (req.avatarUrl) formData.append('avatarUrl', req.avatarUrl);

    if (req.avatar) {
      formData.append('avatar', req.avatar);
    }

    const { data } = await apiInstance.patch<MeResponse>('/me', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
};
