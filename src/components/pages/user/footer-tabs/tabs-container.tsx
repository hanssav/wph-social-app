import { FooterTabsType } from '@/constants/footer.constants';
import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

const TabsContainer = ({ className, ...props }: ComponentProps<'footer'>) => {
  return (
    <footer
      className={cn(
        'fixed bottom-12 inset-x-0 container-360 flex-between gap-[45px] rounded-[1000px] bg-neutral-950 border border-neutral-900 py-4 px-6',
        className
      )}
      {...props}
    />
  );
};

type TabContainerItemProps = { activeTabs?: string } & FooterTabsType &
  ComponentProps<'div'>;

const TabContainerItem = ({
  icon,
  className,
  label,
  action,
  id,
  activeTabs,
  type,
}: TabContainerItemProps) => {
  const Icon = icon;
  const isActive = activeTabs === id;
  const isAdd = type === 'add';

  return (
    <div
      className={cn(
        'space-y-1 flex-col-center',
        isAdd &&
          'p-2 size-11 md:12 bg-primary-200 aspect-square rounded-full flex-center',
        className
      )}
    >
      <Icon
        className={cn(
          'size-5 md:size-6',
          isActive ? 'fill-primary-200' : 'fill-neutral-25',
          isAdd && 'fill-neutral-25'
        )}
      />
      <p
        className={cn(
          'text-sm-medium mdtext-md-medium',
          isActive
            ? 'font-bold text-primary-200'
            : 'text-neutral-25 font-medium'
        )}
      >
        {label}
      </p>
    </div>
  );
};

export { TabsContainer, TabContainerItem };
