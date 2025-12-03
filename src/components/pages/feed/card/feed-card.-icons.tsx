import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';
import { FeedIconAction } from '../../../../hooks/use-feed-action';
import { Button } from '@/components/ui/button';

export const FeedCardActions = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div className={cn('flex-start gap-3 md:gap-4', className)} {...props} />
);

export const FeedCardActionsItem = ({
  data,
  className,
  ...props
}: { data: FeedIconAction } & ComponentProps<'div'>) => {
  const Icon = data.icon;

  return (
    <div className={cn('flex-center gap-1.5', className)} {...props}>
      <Button
        size={'ghost'}
        variant={'ghost'}
        onClick={data.onIconAction}
        disabled={data.isLoading}
      >
        <Icon
          className={cn(
            'size-5',
            data.iconValue &&
              data.id === 'like' &&
              'fill-accent-red stroke-accent-red'
          )}
        />
      </Button>
      <Button
        variant={'ghost'}
        size={'ghost'}
        className='text-sm-semibold md:text-md-semibold'
        onClick={data.onLabelAction}
      >
        {data.labelValue}
      </Button>
    </div>
  );
};
