'use client';

import { ImageLogo } from '@/components/container';
import Navbar from '@/components/psges/user/navbar';
import { useAuth } from '@/hooks/use-auth';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='animate-pulse'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      <Navbar />
      <main className='mx-auto w-full  max-w-7xl px-4 py-8'>{children}</main>
    </div>
  );
}
