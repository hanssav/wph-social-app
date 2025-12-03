// ============================
// ADD FOLLOW / UNFOLLOW BY USERNAME
// ============================

import { ApiResponse } from './api.types';

export type FollowReqParams = {
  username: string;
};

export type FollowApiResponse = ApiResponse<{
  following: boolean;
}>;
