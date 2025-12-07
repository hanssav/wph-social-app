'use client';
import { PageHeader } from '@/components/container';
import { Dropzone } from '@/components/container/dropzone';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAddPost } from '@/hooks';
import { PATH } from '@/constants';
import { useAddFormPost } from '@/hooks/use-form-add-post';

const AddPost = () => {
  const router = useRouter();

  const { mutate: addPost, isPending } = useAddPost();
  const { caption, file, handleSelect, setCaption, setFile, err, setErr } =
    useAddFormPost();

  const handleSubmit = () => {
    if (!file) {
      setErr('Please select an image');
      return;
    }
    const newPost = {
      image: file,
      caption: caption.trim() || undefined,
    };

    router.push(PATH.FEED);

    addPost(newPost, {
      onSuccess: () => {
        setFile(null);
        setCaption('');
      },
    });
  };

  return (
    <div className='container-452 space-y-12'>
      <PageHeader onBack={router.back} title='Add Post' />

      <div className='space-y-0.5'>
        <p className='text-sm-bold'>Photo</p>
        <Dropzone
          onChange={handleSelect}
          file={file}
          setFile={setFile}
          err={err}
        />
        {err && <p className='text-destructive text-sm'>{err}</p>}
      </div>

      <div className='space-y-0.5'>
        <p className='text-sm-bold'>Caption</p>
        <Textarea
          placeholder='Create your caption'
          className='min-h-[100px]'
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          disabled={isPending}
        />
      </div>

      <Button
        className='w-full'
        onClick={handleSubmit}
        disabled={isPending || !file}
      >
        {isPending ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Sharing...
          </>
        ) : (
          'Share'
        )}
      </Button>
    </div>
  );
};

export default AddPost;
