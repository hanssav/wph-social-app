import { cn } from '@/lib/utils';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative flex min-h-screen flex-center max-w-[490px] mx-auto'>
      {/* BACKGROUND */}

      {/* <div
        className={cn(
          'absolute top-1/2 bg-primary-200 w-screen h-screen overflow-hidden',
          'before:absolute before:rounded-[80%] before:top-1/2'
        )}
      ></div> */}
      {/* <div
        className="absolute h-screen border border-black border-t-0 overflow-hidden z-[1]
         before:content-[''] before:absolute before:inset-0 
         before:w-full before:h-full before:rounded-[80%]
         before:border before:border-black
         before:-top-1/2 before:left-0
         before:z-[2]
         before:bg-[linear-gradient(230.59deg,#AC88FF_33.13%,#AD3AE7_63.19%,#5613A3_80%,#522BC8_100%)]
         before:backdrop-blur-[300px]"
      ></div> */}

      {children}
    </div>
  );
};

export default layout;
