import axios, { AxiosError } from 'axios';
import { APIConfiguration } from './api-config';
import { cookieHelpers } from '@/lib/cookies';

export const apiInstance = axios.create({
  baseURL: APIConfiguration.baseUrl,
  headers: {
    accept: 'application/json',
  },
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = cookieHelpers.get();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      cookieHelpers.remove();
      window.location.href = '/login';
    }

    const message =
      error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

interface ErrorResponse {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError<ErrorResponse>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.data?.error ??
      axiosError.message;
    return message || 'An error occurred';
  }

  if (err instanceof Error) {
    return err.message;
  }

  if (typeof err === 'string') {
    return err;
  }

  if (err && typeof err === 'object' && 'message' in err) {
    return String(err.message);
  }

  return 'Unknown error';
}

export function isAuthError(err: unknown): boolean {
  return axios.isAxiosError(err) && err.response?.status === 401;
}
