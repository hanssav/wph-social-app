'use client';
import { useRef, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { ArrowUpToLine, Trash2, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';

type DropzoneProps = {
  onChange: (file: File | null) => void;
  className?: string;
  file?: File | null;
  err?: string;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

export function Dropzone({
  onChange,
  className,
  file,
  err,
  setFile,
}: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const preview = useMemo(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      return objectUrl;
    }
    return null;
  }, [file]);

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;
    onChange(selectedFile);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);
    onChange(null);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files?.[0] ?? null);
      }}
      className={cn('cursor-pointer', className)}
    >
      {preview ? (
        <div className='space-y-2'>
          <div className='relative overflow-hidden w-full aspect-square'>
            <Image
              src={preview}
              alt='preview image'
              fill
              className='object-cover rounded-md'
            />
          </div>
          <div className='flex-center max-w-full gap-3'>
            <Button
              type='button'
              variant='ghost'
              className='flex-center gap-1 bg-neutral-900 rounded-md'
            >
              <ArrowUpToLine className='size-5 stroke-neutral-25' />
              <span className='text-sm-medium text-neutral-25'>
                Change Image
              </span>
            </Button>
            <Button
              type='button'
              variant='ghost'
              className='flex-center gap-1 bg-neutral-900 rounded-md'
              onClick={handleDelete}
            >
              <Trash2 className='size-5 stroke-destructive' />
              <span className='text-sm-medium text-destructive'>
                Delete Image
              </span>
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            'flex-col-center gap-3 border-dashed border rounded-md p-4',
            err ? 'border-red-500' : 'border-neutral-800'
          )}
        >
          <div className='border border-neutral-800 p-2.5 aspect-square size-10 rounded-md'>
            <UploadCloud className='size-5' />
          </div>
          <p className='text-sm-bold text-neutral-600 text-center'>
            <span className='text-primary-200'>Click to upload </span>
            or drag and drop
            <span className='block'>PNG or JPG (max. 5MB)</span>
          </p>
        </div>
      )}
      <Input
        ref={inputRef}
        type='file'
        accept='image/jpeg,image/png,image/webp'
        hidden
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
