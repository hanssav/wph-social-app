import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const NavDropdownMenu = ({ open, setOpen }: Props) => {
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <Menu className='size-6' />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-screen bg-transparent border-none px-4'
        sideOffset={16}
      >
        <div className='flex w-full gap-4'>
          <Button size='lg' variant={'outline'} className='flex-1'>
            Login
          </Button>
          <Button size='lg' className='flex-1'>
            Register
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavDropdownMenu;
