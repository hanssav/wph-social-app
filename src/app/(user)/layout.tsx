'use client';

import FooterTabs from '@/components/pages/user/footer-tabs';
import Navbar from '@/components/pages/user/navbar';
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
    <div className='relative min-h-screen'>
      <Navbar />
      <main className='relative top-[64px] base-container-y'>{children}</main>
      <FooterTabs />
    </div>
  );
}
