import { apiInstance } from '@/api';
import { AddPostReq } from '@/types';

export const postService = {
  add: async (req: AddPostReq) => {
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
