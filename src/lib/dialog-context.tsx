import * as React from 'react';
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// example use

//   openDialog({
//     title: 'Hapus Item?',
//     description: 'Tindakan ini tidak bisa dibatalkan.',
//     content: <p className='py-4'>Kamu yakin mau hapus data ini?</p>,
//     footer: (
//       <>
//         <Button variant='outline' onClick={() => closeDialog()}>
//           Batal
//         </Button>
//         <Button
//           variant='destructive'
//           onClick={() => {
//             alert('Terhapus!');
//             closeDialog();
//           }}
//         >
//           Hapus
//         </Button>
//       </>
//     ),
//   });

interface DialogState {
  isOpen: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

const DialogContext = React.createContext<{
  openDialog: (options: Omit<DialogState, 'isOpen'>) => void;
  closeDialog: () => void;
}>({
  openDialog: () => {},
  closeDialog: () => {},
});

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = React.useState<DialogState>({ isOpen: false });

  const openDialog = (options: Omit<DialogState, 'isOpen'>) => {
    setState({ ...options, isOpen: true });
  };

  const closeDialog = () => {
    setState((prev) => ({ ...prev, isOpen: false }));
    setTimeout(() => {
      setState({ isOpen: false });
    }, 300);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog();
      state.onOpenChange?.(false);
    } else {
      state.onOpenChange?.(true);
    }
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Dialog open={state.isOpen} onOpenChange={handleOpenChange}>
        <DialogPortal>
          <DialogOverlay />
          <DialogPrimitive.Content
            className={cn(
              'bg-background fixed z-50 flex flex-col w-full gap-5 border shadow-lg duration-300',

              // --- DESKTOP (md) ---
              // Posisi popup di tengah layar
              'md:top-[50%] md:left-[50%] md:max-w-lg md:translate-x-[-50%] md:translate-y-[-50%] md:rounded-lg md:p-6',

              // Animasi saat modal open/close (desktop)
              'md:data-[state=open]:animate-in md:data-[state=closed]:animate-out',
              'md:data-[state=closed]:fade-out-0 md:data-[state=open]:fade-in-0',
              'md:data-[state=closed]:zoom-out-95 md:data-[state=open]:zoom-in-95',

              // --- MOBILE (max-md) ---
              // Posisi modal di mobile jadi bottom sheet
              'max-md:inset-x-0 max-md:bottom-0 max-md:top-auto',
              'max-md:max-h-[90vh] max-md:overflow-y-auto',
              'max-md:rounded-t-3xl max-md:p-6 max-md:pb-8',
              'max-md:min-h-[60vh]',

              // Animasi: slide dari bawah
              'max-md:data-[state=open]:animate-slide-in-from-bottom',
              'max-md:data-[state=closed]:animate-slide-out-to-bottom'
            )}
          >
            {(state.title || state.description) && (
              <DialogHeader className='text-start'>
                {state.title && <DialogTitle>{state.title}</DialogTitle>}
                <DialogDescription
                  className={cn(!state.description && 'hidden')}
                >
                  {state.description ?? state.title}
                </DialogDescription>
              </DialogHeader>
            )}

            {state.content}

            {state.footer && <DialogFooter>{state.footer}</DialogFooter>}

            <DialogClose className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
              <XIcon className='h-4 w-4' />
              <span className='sr-only'>Close</span>
            </DialogClose>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </DialogContext.Provider>
  );
};

export const useDialog = () => React.useContext(DialogContext);
