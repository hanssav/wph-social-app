export type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

export type ApiError = {
  success: false;
  message: string;
  data?: undefined | null;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
