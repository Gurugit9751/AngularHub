import { DocumentationSidebarItem } from './angular-navigation.data';

export const API_NAVIGATION: readonly DocumentationSidebarItem[] = [
  {
    label: 'Authentication',
    icon: 'lock',
    route: '/docs/api/auth',
  },
  {
    label: 'Carts',
    icon: 'shopping_cart',
    route: '/docs/api/carts',
  },
  {
    label: 'Posts',
    icon: 'article',
    route: '/docs/api/posts',
  },
  {
    label: 'Products',
    icon: 'inventory_2',
    route: '/docs/api/products',
  },
  {
    label: 'Users',
    icon: 'group',
    route: '/docs/api/users',
  },
];
