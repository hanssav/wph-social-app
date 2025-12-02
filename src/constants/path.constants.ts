export const PATH = {
  REGISTER: '/register',
  LOGIN: '/login',
  FEED: '/feed',
  PROFILE: '/profile',
  FRIEND: '/friend',
  SETTINGS: '/settings',
};

export const protectedRoutes = [PATH.PROFILE, PATH.SETTINGS];
export const authRoutes = [PATH.LOGIN, PATH.REGISTER];
export const publicRoutes = [PATH.FEED];
