'use client';
import Spin from '@/components/ui/spin';
import { authRoutes, PATH, protectedRoutes, publicRoutes } from '@/constants';
import { useAuth } from '@/hooks/use-auth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { hydrateToken } from '@/store/slices/auth-slice';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    dispatch(hydrateToken());
    setIsHydrated(true);
  }, [dispatch]);

  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isHydrated || isLoading) return;

    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    const isPublicRoute = publicRoutes.some((route) => pathname === route);

    if (isProtectedRoute && !isAuthenticated) {
      router.push(`/login?redirect=${pathname}`);
      return;
    }

    if (isPublicRoute) return;

    if (isAuthRoute && isAuthenticated) {
      router.push(PATH.FEED);
      return;
    }
  }, [isHydrated, isLoading, isAuthenticated, pathname, router]);

  if (!isHydrated || isLoading) {
    return <Spin />;
  }

  return <>{children}</>;
}
