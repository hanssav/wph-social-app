'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IMAGES } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

const AuthCCard = ({ children, title }: Props) => {
  return (
    <div className='w-full mx-6'>
      <Card
        className={cn(
          'backdrop-blur-[100px] bg-black/30 border-neutral-900',
          'py-8 md:py-10 space-y-4 md:space-y-6'
        )}
      >
        <CardHeader className='flex-center'>
          <div className='relative overflow-hidden w-[137px] h-9 mx-auto'>
            <Image
              alt='logo'
              src={IMAGES.LOGO}
              loading='eager'
              className='object-cover'
              sizes='(max-width: 768px) 120px, 137px'
              fill
            />
          </div>
          <CardTitle className='text-xl-bold md:text-display-xs-bold text-center'>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

type AuthCardBtnActionProps = {
  q: string;
  a: string;
  src: string;
};

const AuthCardBtnAction = ({ a, q, src }: AuthCardBtnActionProps) => (
  <div className='flex-center gap-1'>
    <p className='text-center  flex text-sm-semibold md:text-md-semibold'>
      {q}
    </p>
    <Link
      href={src}
      className='text-primary-300 hover:underline text-sm-semibold md:text-md-semibold'
    >
      {a}
    </Link>
  </div>
);

export { AuthCCard, AuthCardBtnAction };
