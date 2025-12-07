import { IMAGES } from '@/constants';
import Image from 'next/image';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative h-screen w-screen'>
      <Image
        src={IMAGES.BG_AUTH}
        alt='bg-gradient'
        fill
        priority
        loading='eager'
      />
      <div className='relative flex min-h-screen flex-center max-w-[490px] mx-auto'>
        {children}
      </div>
    </div>
  );
};

export default layout;
