import { coverImage, avatarImage } from '@/constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImage = (
  url: string | null,
  variant: 'cover' | 'avatar' = 'cover'
) => {
  const img = variant === 'cover' ? coverImage : avatarImage;

  if (!url) return img;
  try {
    new URL(url);
    return url;
  } catch {
    return img;
  }
};
