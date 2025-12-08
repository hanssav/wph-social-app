export const PATH = {
  REGISTER: '/register',
  LOGIN: '/login',
  FEED: '/feed',
  PROFILE: '/profile',
  FRIEND: '/friend',
  SETTINGS: '/settings',
  FORM: {
    BASE: '/form',
    ADD_POST: '/form/add-post',
    UPDATE_PROFILE: '/form/update-profile',
  },
};

export const protectedRoutes = [PATH.PROFILE, PATH.SETTINGS];
export const authRoutes = [PATH.LOGIN, PATH.REGISTER];
export const publicRoutes = [PATH.FEED];
