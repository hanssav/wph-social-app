import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  onBack: () => void;
  title: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ onBack, title }) => {
  return (
    <section className='hidden md:block'>
      <Button
        onClick={onBack}
        variant='ghost'
        size='ghost'
        className='flex-center gap-3'
      >
        <ArrowLeft />
        <h4 className='text-display-xs-bold'>{title}</h4>
      </Button>
    </section>
  );
};
