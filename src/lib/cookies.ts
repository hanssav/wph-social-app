const COOKIE_NAME = 'auth_token';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

export const cookieHelpers = {
  set: (token: string) => {
    if (typeof document !== 'undefined') {
      document.cookie = `${COOKIE_NAME}=${token}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    }
  },
  get: (): string | null => {
    if (typeof document === 'undefined') return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${COOKIE_NAME}=`);

    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }

    return null;
  },
  remove: () => {
    if (typeof document !== 'undefined') {
      document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
    }
  },
};
