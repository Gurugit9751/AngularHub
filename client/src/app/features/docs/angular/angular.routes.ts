import { Routes } from '@angular/router';

export const ANGULAR_ROUTES: Routes = [
  /*
   * /docs/angular
   *
   * Default Angular topic
   */
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'components',
  },

  /*
   * /docs/angular/components
   */
  {
    path: 'components',

    loadComponent: () =>
      import('./components/components.component').then(
        (component) => component.ComponentsComponent,
      ),
  },

  /*
   * /docs/angular/directives
   */
  {
    path: 'directives',

    loadComponent: () =>
      import('./directives/directives.component').then(
        (component) => component.DirectivesComponent,
      ),
  },

  /*
   * /docs/angular/forms
   */
  {
    path: 'forms',

    loadComponent: () =>
      import('./forms/forms.component').then((component) => component.FormsComponent),
  },

  /*
   * /docs/angular/guards
   */
  {
    path: 'guards',

    loadComponent: () =>
      import('./guards/guards.component').then((component) => component.GuardsComponent),
  },

  /*
   * /docs/angular/lifecycle
   */
  {
    path: 'lifecycle',

    loadComponent: () =>
      import('./lifecycle/lifecycle.component').then((component) => component.LifecycleComponent),
  },

  /*
   * /docs/angular/pipes
   */
  {
    path: 'pipes',

    loadComponent: () =>
      import('./pipes/pipes.component').then((component) => component.PipesComponent),
  },

  /*
   * /docs/angular/routing
   */
  {
    path: 'routing',

    loadComponent: () =>
      import('./routing/routing.component').then((component) => component.RoutingComponent),
  },

  /*
   * /docs/angular/services
   */
  {
    path: 'services',

    loadComponent: () =>
      import('./services/services.component').then((component) => component.ServicesComponent),
  },

  /*
   * /docs/angular/signals
   */
  {
    path: 'signals',

    loadComponent: () =>
      import('./signals/signals.component').then((component) => component.SignalsComponent),
  },

  /*
   * Unknown Angular topic
   */
  {
    path: '**',
    redirectTo: 'components',
  },
];
