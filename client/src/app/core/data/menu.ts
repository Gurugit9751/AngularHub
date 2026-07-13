export interface HeaderMenuItem {
  readonly label: string;
  readonly route: string;
  readonly exact?: boolean;
  readonly icon?: string;
}

export interface SidebarChildItem {
  readonly id: string;
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

export interface DocumentationMenu {
  readonly section: string;
  readonly title: string;
  readonly items: readonly SidebarGroupItem[];
}

/*
 * User portal top navigation.
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
    route: '/docs/angular/introduction',
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
 * Existing admin navigation.
 */
export const ADMIN_HEADER_MENU: readonly HeaderMenuItem[] = [
  {
    label: 'Dashboard',
    route: '/dashboard',
    icon: 'dashboard',
  },
  {
    label: 'Profile',
    route: '/profile',
    icon: 'person',
  },
  {
    label: 'Users',
    route: '/users',
    icon: 'group',
  },
  {
    label: 'Settings',
    route: '/settings',
    icon: 'settings',
  },
];

export const ADMIN_SIDEBAR_MENU = ADMIN_HEADER_MENU;

/*
 * HTML documentation sidebar.
 */
export const HTML_SIDEBAR_MENU: readonly SidebarGroupItem[] = [
  {
    id: 'introduction',
    label: 'Introduction',
    icon: 'article',
    route: '/docs/html/introduction',
  },
  {
    id: 'elements',
    label: 'Elements',
    icon: 'code',
    route: '/docs/html/elements',
  },
  {
    id: 'forms',
    label: 'Forms',
    icon: 'dynamic_form',
    route: '/docs/html/forms',
  },
  {
    id: 'tables',
    label: 'Tables',
    icon: 'table_chart',
    route: '/docs/html/tables',
  },
  {
    id: 'lists',
    label: 'Lists',
    icon: 'format_list_bulleted',
    route: '/docs/html/lists',
  },
  {
    id: 'semantic-tags',
    label: 'Semantic Tags',
    icon: 'account_tree',
    route: '/docs/html/semantic-tags',
  },
  {
    id: 'media',
    label: 'Media',
    icon: 'perm_media',
    route: '/docs/html/media',
  },
  {
    id: 'canvas',
    label: 'Canvas',
    icon: 'draw',
    route: '/docs/html/canvas',
  },
  {
    id: 'svg',
    label: 'SVG',
    icon: 'image',
    route: '/docs/html/svg',
  },
];

/*
 * JavaScript documentation sidebar.
 */
export const JAVASCRIPT_SIDEBAR_MENU: readonly SidebarGroupItem[] = [
  {
    id: 'introduction',
    label: 'Introduction',
    icon: 'article',
    route: '/docs/javascript/introduction',
  },
  {
    id: 'variables',
    label: 'Variables',
    icon: 'data_object',
    route: '/docs/javascript/variables',
  },
  {
    id: 'functions',
    label: 'Functions',
    icon: 'functions',
    route: '/docs/javascript/functions',
  },
  {
    id: 'arrays',
    label: 'Arrays',
    icon: 'data_array',
    route: '/docs/javascript/arrays',
  },
  {
    id: 'objects',
    label: 'Objects',
    icon: 'category',
    route: '/docs/javascript/objects',
  },
  {
    id: 'promises',
    label: 'Promises',
    icon: 'schedule',
    route: '/docs/javascript/promises',
  },
  {
    id: 'async-await',
    label: 'Async/Await',
    icon: 'sync',
    route: '/docs/javascript/async-await',
  },
  {
    id: 'closures',
    label: 'Closures',
    icon: 'lock',
    route: '/docs/javascript/closures',
  },
  {
    id: 'prototype',
    label: 'Prototype',
    icon: 'account_tree',
    route: '/docs/javascript/prototype',
  },
  {
    id: 'es6',
    label: 'ES6 Features',
    icon: 'auto_awesome',
    route: '/docs/javascript/es6',
  },
];

/*
 * Angular documentation sidebar.
 */
export const ANGULAR_SIDEBAR_MENU: readonly SidebarGroupItem[] = [
  {
    id: 'introduction',
    label: 'Introduction',
    icon: 'article',
    route: '/docs/angular/introduction',
  },
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
        id: 'observable',
        label: 'Observable',
        route: '/docs/angular/rxjs/observable',
      },
      {
        id: 'subject',
        label: 'Subject',
        route: '/docs/angular/rxjs/subject',
      },
      {
        id: 'operators',
        label: 'Operators',
        route: '/docs/angular/rxjs/operators',
      },
      {
        id: 'switch-map',
        label: 'switchMap',
        route: '/docs/angular/rxjs/switch-map',
      },
      {
        id: 'merge-map',
        label: 'mergeMap',
        route: '/docs/angular/rxjs/merge-map',
      },
      {
        id: 'concat-map',
        label: 'concatMap',
        route: '/docs/angular/rxjs/concat-map',
      },
      {
        id: 'error-handling',
        label: 'Error Handling',
        route: '/docs/angular/rxjs/error-handling',
      },
    ],
  },
];

/*
 * Node documentation sidebar.
 */
export const NODE_SIDEBAR_MENU: readonly SidebarGroupItem[] = [
  {
    id: 'introduction',
    label: 'Introduction',
    icon: 'article',
    route: '/docs/node/introduction',
  },
  {
    id: 'modules',
    label: 'Modules',
    icon: 'view_module',
    route: '/docs/node/modules',
  },
  {
    id: 'express',
    label: 'Express',
    icon: 'api',
    route: '/docs/node/express',
  },
  {
    id: 'middleware',
    label: 'Middleware',
    icon: 'layers',
    route: '/docs/node/middleware',
  },
  {
    id: 'authentication',
    label: 'Authentication',
    icon: 'verified_user',
    route: '/docs/node/authentication',
  },
  {
    id: 'rest-api',
    label: 'REST API',
    icon: 'http',
    route: '/docs/node/rest-api',
  },
  {
    id: 'streams',
    label: 'Streams',
    icon: 'water',
    route: '/docs/node/streams',
  },
  {
    id: 'events',
    label: 'Events',
    icon: 'bolt',
    route: '/docs/node/events',
  },
  {
    id: 'file-system',
    label: 'File System',
    icon: 'folder',
    route: '/docs/node/file-system',
  },
];

/*
 * MongoDB documentation sidebar.
 */
export const MONGODB_SIDEBAR_MENU: readonly SidebarGroupItem[] = [
  {
    id: 'introduction',
    label: 'Introduction',
    icon: 'article',
    route: '/docs/mongodb/introduction',
  },
  {
    id: 'collections',
    label: 'Collections',
    icon: 'inventory_2',
    route: '/docs/mongodb/collections',
  },
  {
    id: 'crud',
    label: 'CRUD Operations',
    icon: 'edit_note',
    route: '/docs/mongodb/crud',
  },
  {
    id: 'aggregation',
    label: 'Aggregation',
    icon: 'account_tree',
    route: '/docs/mongodb/aggregation',
  },
  {
    id: 'indexes',
    label: 'Indexes',
    icon: 'speed',
    route: '/docs/mongodb/indexes',
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: 'sync_alt',
    route: '/docs/mongodb/transactions',
  },
  {
    id: 'mongoose',
    label: 'Mongoose',
    icon: 'hub',
    route: '/docs/mongodb/mongoose',
  },
];

export const DOCUMENTATION_MENUS: readonly DocumentationMenu[] = [
  {
    section: 'html',
    title: 'HTML',
    items: HTML_SIDEBAR_MENU,
  },
  {
    section: 'javascript',
    title: 'JavaScript',
    items: JAVASCRIPT_SIDEBAR_MENU,
  },
  {
    section: 'angular',
    title: 'Angular',
    items: ANGULAR_SIDEBAR_MENU,
  },
  {
    section: 'node',
    title: 'Node',
    items: NODE_SIDEBAR_MENU,
  },
  {
    section: 'mongodb',
    title: 'MongoDB',
    items: MONGODB_SIDEBAR_MENU,
  },
];
