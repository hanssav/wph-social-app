const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const APIConfiguration = {
  baseUrl: API_BASE_URL,
  mockToken: '',
};
