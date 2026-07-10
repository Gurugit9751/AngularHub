import { NavigationItem } from '../constants/navigation-item.model';
export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: '/dashboard',
    permission: 'dashboard.view',
  },
  {
    label: 'Profile',
    icon: 'person',
    route: '/profile',
    permission: 'profile.view',
  },
  {
    label: 'Users',
    icon: 'group',
    route: '/users',
    permission: 'users.view',
  },
  {
    label: 'Settings',
    icon: 'settings',
    route: '/settings',
    permission: 'settings.view',
  },
];
