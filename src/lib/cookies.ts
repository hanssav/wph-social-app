const COOKIE_NAME = 'auth_token';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

export const cookieHelpers = {
  set: (token: string) => {
    if (typeof document !== 'undefined') {
      document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
        token
      )}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    }
  },

  get: (): string | null => {
    if (typeof document === 'undefined') return null;

    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((row) => row.startsWith(`${COOKIE_NAME}=`));

    if (!cookie) return null;

    const value = cookie.split('=')[1];
    return value ? decodeURIComponent(value) : null;
  },

  remove: () => {
    if (typeof document !== 'undefined') {
      // Delete cookie with multiple variations to ensure it's removed
      // Standard deletion with all attributes matching the set
      document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; SameSite=Lax`;

      // Delete without SameSite (in case it was set without it)
      document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0`;

      // Delete with empty path (edge case)
      document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0`;

      // Verify removal
      if (process.env.NODE_ENV === 'development') {
        console.log(
          'Cookie removal attempted. Current cookies:',
          document.cookie
        );
      }
    }
  },
};
