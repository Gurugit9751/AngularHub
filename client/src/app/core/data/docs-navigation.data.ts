import { HeaderNavigationItem, TechnologyNavigation } from '../models/docs-navigation.model';

export const USER_HEADER_NAVIGATION: readonly HeaderNavigationItem[] = [
  {
    label: 'Home',
    route: '/home',
    icon: 'home',
  },
  {
    label: 'HTML',
    route: '/docs/html/introduction',
    technology: 'html',
  },
  {
    label: 'CSS',
    route: '/docs/css/introduction',
    technology: 'css',
  },
  {
    label: 'JavaScript',
    route: '/docs/javascript/introduction',
    technology: 'javascript',
  },
  {
    label: 'TypeScript',
    route: '/docs/typescript/introduction',
    technology: 'typescript',
  },
  {
    label: 'Angular',
    route: '/docs/angular/introduction',
    technology: 'angular',
  },
  {
    label: 'RxJS',
    route: '/docs/rxjs/introduction',
    technology: 'rxjs',
  },
  {
    label: 'Material',
    route: '/docs/material/introduction',
    technology: 'material',
  },
  {
    label: 'API',
    route: '/docs/api/introduction',
    technology: 'api',
  },
];

export const TECHNOLOGY_NAVIGATION: readonly TechnologyNavigation[] = [
  {
    technology: 'html',
    title: 'HTML',
    sidebarItems: [
      {
        label: 'Introduction',
        route: '/docs/html/introduction',
        icon: 'article',
      },
      {
        label: 'Elements',
        route: '/docs/html/elements',
        icon: 'code',
      },
      {
        label: 'Forms',
        route: '/docs/html/forms',
        icon: 'description',
      },
      {
        label: 'Tables',
        route: '/docs/html/tables',
        icon: 'table_chart',
      },
      {
        label: 'Semantic HTML',
        route: '/docs/html/semantic-html',
        icon: 'account_tree',
      },
    ],
  },
  {
    technology: 'css',
    title: 'CSS',
    sidebarItems: [
      {
        label: 'Introduction',
        route: '/docs/css/introduction',
        icon: 'article',
      },
      {
        label: 'Selectors',
        route: '/docs/css/selectors',
        icon: 'filter_alt',
      },
      {
        label: 'Box Model',
        route: '/docs/css/box-model',
        icon: 'crop_square',
      },
      {
        label: 'Flexbox',
        route: '/docs/css/flexbox',
        icon: 'view_column',
      },
      {
        label: 'CSS Grid',
        route: '/docs/css/grid',
        icon: 'grid_view',
      },
      {
        label: 'Responsive Design',
        route: '/docs/css/responsive-design',
        icon: 'devices',
      },
    ],
  },
  {
    technology: 'javascript',
    title: 'JavaScript',
    sidebarItems: [
      {
        label: 'Introduction',
        route: '/docs/javascript/introduction',
        icon: 'article',
      },
      {
        label: 'Variables',
        route: '/docs/javascript/variables',
        icon: 'data_object',
      },
      {
        label: 'Functions',
        route: '/docs/javascript/functions',
        icon: 'functions',
      },
      {
        label: 'Arrays',
        route: '/docs/javascript/arrays',
        icon: 'data_array',
      },
      {
        label: 'ES6 Features',
        route: '/docs/javascript/es6',
        icon: 'javascript',
      },
      {
        label: 'Promises',
        route: '/docs/javascript/promises',
        icon: 'schedule',
      },
      {
        label: 'Async/Await',
        route: '/docs/javascript/async-await',
        icon: 'sync',
      },
    ],
  },
  {
    technology: 'typescript',
    title: 'TypeScript',
    sidebarItems: [
      {
        label: 'Introduction',
        route: '/docs/typescript/introduction',
        icon: 'article',
      },
      {
        label: 'Types',
        route: '/docs/typescript/types',
        icon: 'data_object',
      },
      {
        label: 'Interfaces',
        route: '/docs/typescript/interfaces',
        icon: 'account_tree',
      },
      {
        label: 'Generics',
        route: '/docs/typescript/generics',
        icon: 'code',
      },
      {
        label: 'Decorators',
        route: '/docs/typescript/decorators',
        icon: 'alternate_email',
      },
    ],
  },
  {
    technology: 'angular',
    title: 'Angular',
    sidebarItems: [
      {
        label: 'Introduction',
        route: '/docs/angular/introduction',
        icon: 'article',
      },
      {
        label: 'Components',
        route: '/docs/angular/components',
        icon: 'widgets',
      },
      {
        label: 'Data Binding',
        route: '/docs/angular/data-binding',
        icon: 'compare_arrows',
      },
      {
        label: 'Directives',
        route: '/docs/angular/directives',
        icon: 'rule',
      },
      {
        label: 'Services',
        route: '/docs/angular/services',
        icon: 'design_services',
      },
      {
        label: 'Dependency Injection',
        route: '/docs/angular/dependency-injection',
        icon: 'hub',
      },
      {
        label: 'Routing',
        route: '/docs/angular/routing',
        icon: 'route',
      },
      {
        label: 'Reactive Forms',
        route: '/docs/angular/reactive-forms',
        icon: 'dynamic_form',
      },
      {
        label: 'Signals',
        route: '/docs/angular/signals',
        icon: 'sensors',
      },
    ],
  },
  {
    technology: 'rxjs',
    title: 'RxJS',
    sidebarItems: [
      {
        label: 'Introduction',
        route: '/docs/rxjs/introduction',
        icon: 'article',
      },
      {
        label: 'Observable',
        route: '/docs/rxjs/observable',
        icon: 'visibility',
      },
      {
        label: 'Subject',
        route: '/docs/rxjs/subject',
        icon: 'podcasts',
      },
      {
        label: 'Operators',
        route: '/docs/rxjs/operators',
        icon: 'functions',
      },
      {
        label: 'Error Handling',
        route: '/docs/rxjs/error-handling',
        icon: 'error_outline',
      },
    ],
  },
  {
    technology: 'material',
    title: 'Angular Material',
    sidebarItems: [
      {
        label: 'Introduction',
        route: '/docs/material/introduction',
        icon: 'article',
      },
      {
        label: 'Buttons',
        route: '/docs/material/buttons',
        icon: 'smart_button',
      },
      {
        label: 'Forms',
        route: '/docs/material/forms',
        icon: 'dynamic_form',
      },
      {
        label: 'Tables',
        route: '/docs/material/tables',
        icon: 'table_chart',
      },
      {
        label: 'Dialogs',
        route: '/docs/material/dialogs',
        icon: 'open_in_new',
      },
    ],
  },
  {
    technology: 'api',
    title: 'REST API',
    sidebarItems: [
      {
        label: 'Introduction',
        route: '/docs/api/introduction',
        icon: 'article',
      },
      {
        label: 'HTTP Methods',
        route: '/docs/api/http-methods',
        icon: 'http',
      },
      {
        label: 'Status Codes',
        route: '/docs/api/status-codes',
        icon: 'tag',
      },
      {
        label: 'Authentication',
        route: '/docs/api/authentication',
        icon: 'lock',
      },
      {
        label: 'Error Handling',
        route: '/docs/api/error-handling',
        icon: 'error_outline',
      },
    ],
  },
];

export function getTechnologyNavigation(
  technology: string | null,
): TechnologyNavigation | undefined {
  if (!technology) {
    return undefined;
  }

  return TECHNOLOGY_NAVIGATION.find((item) => item.technology === technology.toLowerCase());
}
