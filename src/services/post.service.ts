import { apiInstance } from '@/api';

export const postService = {
  add: async (req: { image: File; caption?: string }) => {
    const formData = new FormData();
    formData.append('image', req.image);
    if (req.caption) {
      formData.append('caption', req.caption);
    }

    const { data } = await apiInstance.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
};
