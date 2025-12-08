import { IMAGES } from '@/constants';
import Image from 'next/image';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative min-h-screen w-full'>
      <div className='fixed inset-0 -z-10'>
        <Image
          src={IMAGES.BG_AUTH}
          alt='bg-gradient'
          fill
          priority
          loading='eager'
          className='object-cover'
        />
      </div>

      <div className='flex justify-center items-center min-h-screen w-full'>
        <div className='w-full max-w-[490px] py-10'>{children}</div>
      </div>
    </div>
  );
};

export default layout;
