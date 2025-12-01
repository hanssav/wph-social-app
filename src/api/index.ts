import axios, { AxiosError } from 'axios';
import { APIConfiguration } from './api-config';

export const apiInstance = axios.create({
  baseURL: APIConfiguration.baseUrl,
  headers: {
    accept: 'application/json',
  },
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }

    // Return error message from API or default
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
  // Handle Axios errors
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError<ErrorResponse>;

    // Priority: response.data.message > response.data.error > err.message
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.data?.error ??
      axiosError.message;

    return message || 'An error occurred';
  }

  // Handle standard Error objects
  if (err instanceof Error) {
    return err.message;
  }

  // Handle string errors
  if (typeof err === 'string') {
    return err;
  }

  // Handle object with message property
  if (err && typeof err === 'object' && 'message' in err) {
    return String(err.message);
  }

  return 'Unknown error';
}

export function isAuthError(err: unknown): boolean {
  return axios.isAxiosError(err) && err.response?.status === 401;
}
