export interface UserHeaderNavigationItem {
  readonly label: string;
  readonly route: string;
  readonly exact: boolean;
}

export const USER_HEADER_NAVIGATION: readonly UserHeaderNavigationItem[] = [
  {
    label: 'Home',
    route: '/home',
    exact: true,
  },
  {
    label: 'Introduction',
    route: '/docs/introduction',
    exact: false,
  },
  {
    label: 'Angular',
    route: '/docs/angular',
    exact: false,
  },
  {
    label: 'RxJS',
    route: '/docs/rxjs',
    exact: false,
  },
  {
    label: 'Material',
    route: '/docs/material',
    exact: false,
  },
  {
    label: 'API',
    route: '/docs/api',
    exact: false,
  },
];
