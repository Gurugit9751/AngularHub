import { Routes } from '@angular/router';

export const ANGULAR_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'introduction',
  },

  /*
   * Angular Introduction temporarily uses the existing
   * documentation overview component.
   */
  {
    path: 'introduction',
    loadComponent: () =>
      import('../introduction/overview/overview.component').then(
        (component) => component.OverviewComponent,
      ),
  },

  {
    path: 'components',
    loadComponent: () =>
      import('./components/components.component').then(
        (component) => component.ComponentsComponent,
      ),
  },

  {
    path: 'directives',
    loadComponent: () =>
      import('./directives/directives.component').then(
        (component) => component.DirectivesComponent,
      ),
  },

  {
    path: 'forms',
    loadComponent: () =>
      import('./forms/forms.component').then((component) => component.FormsComponent),
  },

  {
    path: 'guards',
    loadComponent: () =>
      import('./guards/guards.component').then((component) => component.GuardsComponent),
  },

  {
    path: 'lifecycle',
    loadComponent: () =>
      import('./lifecycle/lifecycle.component').then((component) => component.LifecycleComponent),
  },

  {
    path: 'pipes',
    loadComponent: () =>
      import('./pipes/pipes.component').then((component) => component.PipesComponent),
  },

  {
    path: 'routing',
    loadComponent: () =>
      import('./routing/routing.component').then((component) => component.RoutingComponent),
  },

  {
    path: 'services',
    loadComponent: () =>
      import('./services/services.component').then((component) => component.ServicesComponent),
  },

  {
    path: 'signals',
    loadComponent: () =>
      import('./signals/signals.component').then((component) => component.SignalsComponent),
  },

  /*
   * Reuses the existing RxJS folder.
   *
   * Final URL:
   * /docs/angular/rxjs/observable
   */
  {
    path: 'rxjs',
    loadChildren: () => import('../rxjs/rxjs.routes').then((routes) => routes.RXJS_ROUTES),
  },

  {
    path: '**',
    redirectTo: 'introduction',
  },
];
