export interface DocumentationSidebarItem {
  readonly label: string;
  readonly icon: string;
  readonly route: string;
}

export const ANGULAR_NAVIGATION: readonly DocumentationSidebarItem[] = [
  {
    label: 'Components',
    icon: 'widgets',
    route: '/docs/angular/components',
  },
  {
    label: 'Directives',
    icon: 'rule',
    route: '/docs/angular/directives',
  },
  {
    label: 'Forms',
    icon: 'dynamic_form',
    route: '/docs/angular/forms',
  },
  {
    label: 'Guards',
    icon: 'security',
    route: '/docs/angular/guards',
  },
  {
    label: 'Lifecycle',
    icon: 'sync',
    route: '/docs/angular/lifecycle',
  },
  {
    label: 'Pipes',
    icon: 'filter_alt',
    route: '/docs/angular/pipes',
  },
  {
    label: 'Routing',
    icon: 'route',
    route: '/docs/angular/routing',
  },
  {
    label: 'Services',
    icon: 'design_services',
    route: '/docs/angular/services',
  },
  {
    label: 'Signals',
    icon: 'sensors',
    route: '/docs/angular/signals',
  },
];
