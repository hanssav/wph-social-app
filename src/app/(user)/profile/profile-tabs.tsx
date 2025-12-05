import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { LucideIcon } from 'lucide-react';

export const ProfileTabList = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsList
    className={cn('w-full h-auto flex bg-transparent', className)}
    {...props}
  />
);

interface ProfileTabsTriggerProps
  extends React.ComponentProps<typeof TabsTrigger> {
  icon?: LucideIcon;
  iconClassName?: string;
}

export const ProfileTabsTrigger = ({
  className,
  icon: Icon,
  iconClassName,
  children,
  ...props
}: ProfileTabsTriggerProps) => (
  <TabsTrigger
    className={cn(
      // Reset all border, then set bottom border
      '[&]:border-0 [&]:border-b [&]:border-b-border',
      '[&]:rounded-none',
      '[&]:!py-3',
      '[&]:gap-2',
      // Default text color
      '[&]:text-muted-foreground',
      // Active state - border bottom lebih tebal
      '[&[data-state=active]]:bg-transparent',
      '[&[data-state=active]]:shadow-none',
      '[&[data-state=active]]:border-b-2',
      '[&[data-state=active]]:border-b-neutral-25',
      '[&[data-state=active]]:text-foreground',
      // Icon fill saat active (selector dari parent ke svg child)
      '[&[data-state=active]_svg]:text-neutral-25',
      '[&[data-state=active]_svg]:fill-neutral-25',
      // Dark mode
      'dark:[&[data-state=active]]:bg-transparent',
      'dark:[&[data-state=active]]:border-b-neutral-25',
      'dark:[&[data-state=active]]:text-foreground',
      'dark:[&[data-state=active]_svg]:text-neutral-25',
      'dark:[&[data-state=active]_svg]:fill-neutral-25',
      className
    )}
    {...props}
  >
    {Icon && (
      <Icon
        className={cn(
          'size-4',
          'text-muted-foreground fill-transparent',
          iconClassName
        )}
      />
    )}
    {children}
  </TabsTrigger>
);
