export interface HeaderMenuItem {
  readonly label: string;
  readonly route: string;
  readonly exact?: boolean;
}

export interface SidebarChildItem {
  readonly label: string;
  readonly route: string;
}

export interface SidebarGroupItem {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly route?: string;
  readonly children?: readonly SidebarChildItem[];
}

/*
 * Main header navigation only.
 */
export const USER_HEADER_MENU: readonly HeaderMenuItem[] = [
  {
    label: 'Home',
    route: '/home',
    exact: true,
  },
  {
    label: 'HTML',
    route: '/docs/html/introduction',
  },
  {
    label: 'JavaScript',
    route: '/docs/javascript/introduction',
  },
  {
    label: 'Angular',
    route: '/docs/angular/components',
  },
  {
    label: 'Node',
    route: '/docs/node/introduction',
  },
  {
    label: 'MongoDB',
    route: '/docs/mongodb/introduction',
  },
];

/*
 * Angular sidebar only.
 *
 * These items appear only while the user is inside /docs/angular.
 */
export const ANGULAR_SIDEBAR_MENU: readonly SidebarGroupItem[] = [
  {
    id: 'components',
    label: 'Components',
    icon: 'widgets',
    route: '/docs/angular/components',
  },
  {
    id: 'directives',
    label: 'Directives',
    icon: 'rule',
    route: '/docs/angular/directives',
  },
  {
    id: 'forms',
    label: 'Forms',
    icon: 'dynamic_form',
    route: '/docs/angular/forms',
  },
  {
    id: 'guards',
    label: 'Guards',
    icon: 'security',
    route: '/docs/angular/guards',
  },
  {
    id: 'lifecycle',
    label: 'Lifecycle',
    icon: 'sync',
    route: '/docs/angular/lifecycle',
  },
  {
    id: 'pipes',
    label: 'Pipes',
    icon: 'filter_alt',
    route: '/docs/angular/pipes',
  },
  {
    id: 'routing',
    label: 'Routing',
    icon: 'route',
    route: '/docs/angular/routing',
  },
  {
    id: 'services',
    label: 'Services',
    icon: 'design_services',
    route: '/docs/angular/services',
  },
  {
    id: 'signals',
    label: 'Signals',
    icon: 'sensors',
    route: '/docs/angular/signals',
  },
  {
    id: 'rxjs',
    label: 'RxJS',
    icon: 'swap_horiz',

    children: [
      {
        label: 'Introduction',
        route: '/docs/angular/rxjs/introduction',
      },
      {
        label: 'Observable',
        route: '/docs/angular/rxjs/observable',
      },
      {
        label: 'Subject',
        route: '/docs/angular/rxjs/subject',
      },
      {
        label: 'Operators',
        route: '/docs/angular/rxjs/operators',
      },
      {
        label: 'switchMap',
        route: '/docs/angular/rxjs/switch-map',
      },
      {
        label: 'mergeMap',
        route: '/docs/angular/rxjs/merge-map',
      },
      {
        label: 'concatMap',
        route: '/docs/angular/rxjs/concat-map',
      },
      {
        label: 'Error Handling',
        route: '/docs/angular/rxjs/error-handling',
      },
    ],
  },
];
