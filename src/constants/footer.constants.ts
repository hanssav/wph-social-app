import { LucideIcon, House, Plus, User } from 'lucide-react';
import { PATH } from './path.constants';

export type FooterTabsType = {
  id: string;
  type: 'item' | 'add';
  icon: LucideIcon;
  label?: string;
  action?: string;
};

export const FOOTER_DATA: FooterTabsType[] = [
  {
    icon: House,
    id: 'home-menu',
    type: 'item',
    label: 'Home',
    action: PATH.FEED,
  },
  {
    icon: Plus,
    id: 'plus',
    type: 'add',
    action: PATH.FORM.ADD_POST,
  },
  {
    icon: User,
    id: 'profile-menu',
    type: 'item',
    label: 'Profile',
    action: PATH.PROFILE,
  },
];
