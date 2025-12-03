import Image, { ImageProps } from 'next/image';

export const FeedCardImage = ({
  src,
  alt,
  ...props
}: { src: string; alt: string } & ImageProps) => {
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
        loading='eager'
        {...props}
      />
    </div>
  );
};
