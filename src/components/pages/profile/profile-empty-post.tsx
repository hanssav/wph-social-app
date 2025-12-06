import { Button } from '@/components/ui/button';
import { EmptyPostState } from '@/constants/profile.constants';
import { useRouter } from 'next/navigation';

export const ProfileEmptyPost = ({
  title,
  desc,
  action,
  label,
}: EmptyPostState) => {
  const router = useRouter();
  return (
    <div className='flex-1 flex-col flex-center gap-6 h-full w-full max-w-md text-center py-10 mx-auto'>
      <h4 className='text-lg-bold text-neutral-25'>{title}</h4>
      <p className='text-md-regular text-neutral-400'>{desc}</p>
      <Button onClick={() => router.push(action)} className='px-6'>
        {label}
      </Button>
    </div>
  );
};
