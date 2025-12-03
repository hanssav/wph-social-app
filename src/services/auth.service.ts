import { apiInstance } from '@/api';
import { LoginRequest, RegisterRequest } from '@/schema/auth.schema';
import { AuthResponse } from '@/types';

export const authServices = {
  login: async (req: LoginRequest): Promise<AuthResponse> => {
    const { data } = await apiInstance.post<AuthResponse>('/auth/login', req);
    return data;
  },

  register: async (req: RegisterRequest): Promise<AuthResponse> => {
    const { data } = await apiInstance.post<AuthResponse>(
      '/auth/register',
      req
    );
    return data;
  },
};
