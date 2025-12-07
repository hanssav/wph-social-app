import { LucideIcon, House, Plus, User, LogOut } from 'lucide-react';
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
    label: 'Add Post',
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

export const LOGOUT_MENU: FooterTabsType = {
  icon: LogOut,
  id: 'logout-menu',
  type: 'item',
  label: 'Logout',
  action: 'logout',
};
