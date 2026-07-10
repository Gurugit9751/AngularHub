import { MenuItem } from "../models/menu.model";

export const MENU_DATA: MenuItem[] = [

  {
    title: 'Getting Started',
    icon: 'home',
    children: [
      {
        title: 'Overview',
        route: '/docs/introduction/overview',
        icon: ''
      },
      {
        title: 'Installation',
        route: '/docs/introduction/installation',
        icon: ''
      },
      {
        title: 'Architecture',
        route: '/docs/introduction/architecture',
        icon: ''
      }
    ]
  },

  {
    title: 'Angular',
    icon: 'dashboard',
    children: [
      {
        title: 'Components',
        route: '/docs/angular/components',
        icon: ''
      },
      {
        title: 'Directives',
        route: '/docs/angular/directives',
        icon: ''
      },
      {
        title: 'Services',
        route: '/docs/angular/services',
        icon: ''
      },
      {
        title: 'Routing',
        route: '/docs/angular/routing',
        icon: ''
      },
      {
        title: 'Guards',
        route: '/docs/angular/guards',
        icon: ''
      },
      {
        title: 'Pipes',
        route: '/docs/angular/pipes',
        icon: ''
      },
      {
        title: 'Lifecycle',
        route: '/docs/angular/lifecycle',
        icon: ''
      },
      {
        title: 'Forms',
        route: '/docs/angular/forms',
        icon: ''
      },
      {
        title: 'Signals',
        route: '/docs/angular/signals',
        icon: ''
      }
    ]
  },

  {
    title: 'RxJS',
    icon: 'sync',
    children: [
      {
        title: 'Observable',
        route: '/docs/rxjs/observable',
        icon: ''
      },
      {
        title: 'Subject',
        route: '/docs/rxjs/subject',
        icon: ''
      },
      {
        title: 'BehaviorSubject',
        route: '/docs/rxjs/behaviorsubject',
        icon: ''
      },
      {
        title: 'ReplaySubject',
        route: '/docs/rxjs/replaysubject',
        icon: ''
      },
      {
        title: 'Operators',
        route: '/docs/rxjs/operators',
        icon: ''
      }
    ]
  },

  {
    title: 'Angular Material',
    icon: 'widgets',
    children: [
      {
        title: 'Table',
        route: '/docs/material/table',
        icon: ''
      },
      {
        title: 'Dialog',
        route: '/docs/material/dialog',
        icon: ''
      },
      {
        title: 'Form Field',
        route: '/docs/material/form-field',
        icon: ''
      },
      {
        title: 'Toolbar',
        route: '/docs/material/toolbar',
        icon: ''
      },
      {
        title: 'Sidenav',
        route: '/docs/material/sidenav',
        icon: ''
      }
    ]
  },

  {
    title: 'DummyJSON API',
    icon: 'api',
    children: [
      {
        title: 'Users',
        route: '/docs/api/users',
        icon: ''
      },
      {
        title: 'Products',
        route: '/docs/api/products',
        icon: ''
      },
      {
        title: 'Carts',
        route: '/docs/api/carts',
        icon: ''
      },
      {
        title: 'Posts',
        route: '/docs/api/posts',
        icon: ''
      },
      {
        title: 'Auth',
        route: '/docs/api/auth',
        icon: ''
      }
    ]
  }

];


export const MENU_ITEMS = [
  { label: 'Home', route: '/' },
  { label: 'HTML', route: '/docs/html' },
  { label: 'CSS', route: '/docs/css' },
  { label: 'JavaScript', route: '/docs/javascript' },
  { label: 'TypeScript', route: '/docs/typescript' },
  { label: 'Angular', route: '/docs/angular' },
  { label: 'RxJS', route: '/docs/rxjs' },
  { label: 'Material', route: '/docs/material' },
  { label: 'API', route: '/docs/api' }
];
