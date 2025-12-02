import Image from 'next/image';

export const FeedCardImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div
      className='
        relative overflow-hidden 
        max-w-[600px] max-h-[600px] 
        aspect-square
        w-full h-auto 
        rounded-md
      '
    >
      <Image
        fill
        src={src}
        alt={alt}
        sizes='(max-width: 768px) 361px, 600px'
        className='object-cover'
      />
    </div>
  );
};
