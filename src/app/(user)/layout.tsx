'use client';

import FooterTabs from '@/components/pages/user/footer-tabs';
import Navbar from '@/components/pages/user/navbar';
import Spin from '@/components/ui/spin';
import { PATH } from '@/constants';
import { useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useAuth();
  const pathname = usePathname();

  const isUseFooter = !pathname.includes(PATH.FORM.BASE);

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spin />
      </div>
    );
  }

  return (
    <div className='relative min-h-screen'>
      <Navbar />
      <main className='relative top-[64px] base-container-y'>{children}</main>
      {isUseFooter && <FooterTabs />}
    </div>
  );
}
